"""
Convert existing data.ts to structured JSON files for the backend.
Run: python -m scraper.convert_data
"""

import json
import os
import re
import sys


def read_data_ts():
    """Read the data.ts file and return its content."""
    path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "src", "lib", "data.ts")
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def extract_array(content: str, var_name: str) -> str:
    """Extract the raw array string for a given variable from data.ts."""
    # Find the start of the array
    patterns = [
        rf"export\s+const\s+{var_name}\s*:\s*\w+(?:\[\])?\s*=\s*\[",
        rf"export\s+const\s+{var_name}\s*=\s*\[",
    ]

    start_idx = -1
    for pattern in patterns:
        match = re.search(pattern, content)
        if match:
            start_idx = match.end() - 1
            break

    if start_idx == -1:
        print(f"WARNING: Could not find array: {var_name}")
        return "[]"

    # Find matching closing bracket
    depth = 0
    for i in range(start_idx, len(content)):
        if content[i] == "[":
            depth += 1
        elif content[i] == "]":
            depth -= 1
            if depth == 0:
                return content[start_idx : i + 1]

    return "[]"


def ts_to_json(ts_str: str) -> list:
    """Convert a TypeScript array literal to a Python list."""
    s = ts_str

    # Remove single-line comments but NOT inside strings
    # We do this carefully: only remove // comments that are outside of strings
    cleaned = []
    i = 0
    in_sq = False  # single quote string
    in_dq = False  # double quote string
    in_bt = False  # backtick string
    while i < len(s):
        ch = s[i]
        # Handle escape sequences inside strings
        if (in_sq or in_dq or in_bt) and ch == "\\" and i + 1 < len(s):
            cleaned.append(ch)
            cleaned.append(s[i + 1])
            i += 2
            continue
        if ch == "'" and not in_dq and not in_bt:
            in_sq = not in_sq
            cleaned.append(ch)
        elif ch == '"' and not in_sq and not in_bt:
            in_dq = not in_dq
            cleaned.append(ch)
        elif ch == '`' and not in_sq and not in_dq:
            in_bt = not in_bt
            cleaned.append(ch)
        elif ch == '/' and i + 1 < len(s) and s[i + 1] == '/' and not in_sq and not in_dq and not in_bt:
            # Skip until end of line
            while i < len(s) and s[i] != '\n':
                i += 1
            continue
        else:
            cleaned.append(ch)
        i += 1
    s = "".join(cleaned)

    # Handle backtick template literals -> double-quoted strings
    def replace_backtick(m):
        inner = m.group(1)
        inner = inner.replace("\\", "\\\\")
        inner = inner.replace('"', '\\"')
        inner = inner.replace("\n", "\\n")
        inner = inner.replace("\r", "")
        inner = inner.replace("\t", "\\t")
        return '"' + inner + '"'

    s = re.sub(r"`((?:[^`\\]|\\[\\`$])*)`", replace_backtick, s, flags=re.DOTALL)

    # Replace single quotes with double quotes, handling content properly
    result = []
    i = 0
    in_double = False
    in_single = False
    while i < len(s):
        ch = s[i]
        if ch == "\\" and i + 1 < len(s):
            if in_single:
                next_ch = s[i + 1]
                if next_ch == "'":
                    # \' in single-quoted string -> just an apostrophe in double-quoted
                    result.append("'")
                    i += 2
                    continue
                elif next_ch == '"':
                    result.append('\\"')
                    i += 2
                    continue
                else:
                    result.append(ch)
                    result.append(next_ch)
                    i += 2
                    continue
            elif in_double:
                result.append(ch)
                result.append(s[i + 1])
                i += 2
                continue
        if ch == '"' and not in_single:
            in_double = not in_double
            result.append(ch)
        elif ch == "'" and not in_double:
            in_single = not in_single
            result.append('"')
        else:
            if in_single and ch == '"':
                result.append('\\"')
            else:
                result.append(ch)
        i += 1
    s = "".join(result)

    # Escape control characters inside strings (tabs, newlines that snuck through)
    def escape_string_content(m):
        inner = m.group(1)
        inner = inner.replace("\t", "\\t")
        inner = inner.replace("\n", "\\n")
        inner = inner.replace("\r", "")
        return '"' + inner + '"'
    s = re.sub(r'"((?:[^"\\]|\\.)*)"', escape_string_content, s)

    # Add quotes around unquoted object keys
    s = re.sub(r"(?<=[{,\n])\s*(\w+)\s*:", r' "\1":', s)

    # Remove trailing commas
    s = re.sub(r",\s*([}\]])", r"\1", s)

    # Handle \u2019 (right single quotation mark) and similar - they're fine in JSON

    try:
        return json.loads(s)
    except json.JSONDecodeError as e:
        # Try to find the error location and show context
        pos = e.pos if hasattr(e, 'pos') and e.pos else 0
        context_start = max(0, pos - 100)
        context_end = min(len(s), pos + 100)
        print(f"JSON parse error for array: {e}")
        print(f"Context around position {pos}:")
        print(s[context_start:context_end])
        print(f"{'':>{pos - context_start}}^")

        # Save debug file
        data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
        os.makedirs(data_dir, exist_ok=True)
        debug_path = os.path.join(data_dir, "_debug_conversion.txt")
        with open(debug_path, "w", encoding="utf-8") as f:
            f.write(s)
        print(f"Full converted string saved to: {debug_path}")
        return []


def main():
    print("Reading data.ts...")
    content = read_data_ts()

    print("Extracting arrays...")
    arrays = {}
    for name in ["subjects", "chapters", "notes", "pastPapers", "mockTests", "questions"]:
        print(f"  Extracting: {name}")
        raw = extract_array(content, name)
        parsed = ts_to_json(raw)
        arrays[name] = parsed
        print(f"    Found {len(parsed)} items")

    # Save combined data
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
    os.makedirs(data_dir, exist_ok=True)

    output = {
        "subjects": arrays["subjects"],
        "chapters": arrays["chapters"],
        "notes": arrays["notes"],
        "pastPapers": arrays["pastPapers"],
        "mockTests": arrays["mockTests"],
        "questions": arrays["questions"],
    }

    output_path = os.path.join(data_dir, "neb_data.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nData saved to: {output_path}")
    print(f"  Subjects: {len(output['subjects'])}")
    print(f"  Chapters: {len(output['chapters'])}")
    print(f"  Notes: {len(output['notes'])}")
    print(f"  Past Papers: {len(output['pastPapers'])}")
    print(f"  Mock Tests: {len(output['mockTests'])}")
    print(f"  Questions: {len(output['questions'])}")


if __name__ == "__main__":
    main()

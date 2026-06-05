import re
from pypdf import PdfReader
import csv

def extract_sat_questions(pdf_path, output_tsv):
    reader = PdfReader(pdf_path)
    full_text = ""

    print("Reading PDF pages...")
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"

    raw_blocks = re.split(r'(?=Question ID:\s*[a-f0-9]{8})', full_text)
    parsed_records = []

    print(f"Found {len(raw_blocks) - 1} potential question blocks. Parsing structural fields...")

    for block in raw_blocks:
        if not block.strip() or "Question ID:" not in block:
            continue

        q_id_match = re.search(r'Question ID:\s*([a-f0-9]{8})', block)
        q_id = q_id_match.group(1) if q_id_match else ""

        metadata = re.findall(r'"([^"\n]+)"', block)
        metadata = [m.strip() for m in metadata if m.strip() not in ["Assessment", "Test", "Domain", "Skill", "Difficulty"]]

        assessment = metadata[0] if len(metadata) > 0 else "SAT"
        test_type = metadata[1] if len(metadata) > 1 else "Reading and Writing"
        domain = metadata[2] if len(metadata) > 2 else ""
        skill = metadata[3] if len(metadata) > 3 else ""
        difficulty = metadata[4] if len(metadata) > 4 else ""

        question_text = ""
        q_match = re.search(r'Question\s*\n+(.*?)(?=Which choice|A\.\s|B\.\s|Answer\s*\n)', block, re.DOTALL)
        if q_match:
            question_text = q_match.group(1).strip()
            question_text = re.sub(r'\s+', ' ', question_text)

        choice_a = re.search(r'A\.\s*(.*?)(?=B\.\s|C\.\s|D\.\s|Answer|Rationale)', block, re.DOTALL)
        choice_b = re.search(r'B\.\s*(.*?)(?=C\.\s|D\.\s|A\.\s|Answer|Rationale)', block, re.DOTALL)
        choice_c = re.search(r'C\.\s*(.*?)(?=D\.\s|A\.\s|B\.\s|Answer|Rationale)', block, re.DOTALL)
        choice_d = re.search(r'D\.\s*(.*?)(?=A\.\s|B\.\s|C\.\s|Answer|Rationale)', block, re.DOTALL)

        cA = re.sub(r'\s+', ' ', choice_a.group(1).strip()) if choice_a else ""
        cB = re.sub(r'\s+', ' ', choice_b.group(1).strip()) if choice_b else ""
        cC = re.sub(r'\s+', ' ', choice_c.group(1).strip()) if choice_c else ""
        cD = re.sub(r'\s+', ' ', choice_d.group(1).strip()) if choice_d else ""

        correct_ans = ""
        ans_match = re.search(r'Correct Answer:\s*([A-D])|Choice\s+([A-D])\s+is\s+the\s+best\s+answer', block, re.IGNORECASE)
        if ans_match:
            correct_ans = ans_match.group(1) or ans_match.group(2)

        explanation = ""
        rational_match = re.search(r'Rationale\s*\n+(.*?)(?=Question ID:|$)', block, re.DOTALL)
        if rational_match:
            explanation = re.sub(r'\s+', ' ', rational_match.group(1).strip())

        parsed_records.append([
            q_id, assessment, test_type, domain, skill, difficulty, 
            question_text, cA, cB, cC, cD, correct_ans, explanation
        ])

    with open(output_tsv, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, delimiter='\t')
        writer.writerow([
            "Question ID", "Assessment", "Test", "Domain", "Skill", "Difficulty", 
            "Question Text", "Choice A", "Choice B", "Choice C", "Choice D", "Correct Answer", "Explanation"
        ])
        writer.writerows(parsed_records)

    print(f"Done! Successfully exported {len(parsed_records)} unique items directly into '{output_tsv}'.")

extract_sat_questions("questionbank-export-2026-6-3 (1).pdf", "final_sat_bank.tsv")

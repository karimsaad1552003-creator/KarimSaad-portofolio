"""
Generate Karim's CV using data/Resume.pdf as the visual/format reference.
Format cues from reference:
- US Letter, Calibri, dark name color
- Contact row under name
- Sections: EDUCATION -> SKILLS -> WORK EXPERIENCE -> CERTIFICATIONS -> PROJECTS
- Section titles uppercase + underline
- Left bold title, right italic location | dates
- Skill categories bold + inline lists
- Project titles with tech stack and -> Here links
"""

from pathlib import Path
from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT_PUBLIC = ROOT / "public" / "assets" / "cv" / "Karim-CV.pdf"
OUT_DATA = ROOT / "data" / "Karim-CV.pdf"
OUT_ATS = ROOT / "data" / "Karim-CV-ats.pdf"
FONT_DIR = Path(r"C:\Windows\Fonts")

# Reference accent (~Calibri-Bold name color from Resume.pdf)
NAME_COLOR = (31, 60, 36)
LINK_COLOR = (89, 89, 89)
TEXT = (0, 0, 0)


class ResumeStyleCV(FPDF):
    def __init__(self):
        super().__init__(format="Letter", unit="pt")
        self.set_auto_page_break(auto=True, margin=36)
        self.set_margins(45, 36, 45)
        self._register_fonts()

    def _register_fonts(self):
        regular = FONT_DIR / "calibri.ttf"
        bold = FONT_DIR / "calibrib.ttf"
        italic = FONT_DIR / "calibrii.ttf"
        if not regular.exists():
            raise FileNotFoundError("Calibri not found in Windows Fonts")
        self.add_font("Calibri", "", str(regular))
        self.add_font("Calibri", "B", str(bold))
        self.add_font("Calibri", "I", str(italic))

    def section_title(self, title: str):
        self.ln(4)
        self.set_font("Calibri", "B", 11)
        self.set_text_color(*NAME_COLOR)
        self.cell(0, 14, title.upper(), new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(0, 0, 0)
        self.set_line_width(0.7)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(4)
        self.set_text_color(*TEXT)

    def left_right(self, left: str, right: str, left_style: str = "B", size: float = 10):
        """Bold/normal left + italic right-aligned meta on one line."""
        usable = self.w - self.l_margin - self.r_margin
        self.set_font("Calibri", "I", size)
        right_w = min(self.get_string_width(right) + 4, usable * 0.42)
        left_w = usable - right_w
        y = self.get_y()

        self.set_xy(self.l_margin, y)
        self.set_font("Calibri", left_style, size)
        self.set_text_color(*TEXT)
        # Keep on one line; shrink left text slightly if needed
        self.set_font("Calibri", left_style, size)
        while self.get_string_width(left) > left_w - 2 and size > 8.5:
            size -= 0.3
            self.set_font("Calibri", left_style, size)
        self.cell(left_w, 12, left)

        self.set_xy(self.l_margin + left_w, y)
        self.set_font("Calibri", "I", size)
        self.set_text_color(40, 40, 40)
        self.cell(right_w, 12, right, align="R")
        self.set_xy(self.l_margin, y + 12)
        self.set_text_color(*TEXT)

    def bullet(self, text: str):
        self.set_font("Calibri", "", 10)
        self.set_text_color(*TEXT)
        # Indent similar to reference (~51pt from left edge; margin is 45)
        indent = 6
        x = self.l_margin + indent
        usable = self.w - self.r_margin - x
        self.set_x(x)
        # Use ASCII-friendly bullet for reliable encoding with embedded TTF
        self.multi_cell(usable, 12, f"• {text}")
        self.set_x(self.l_margin)

    def labeled_line(self, label: str, value: str):
        self.set_font("Calibri", "B", 10)
        self.set_text_color(*TEXT)
        label_txt = f"{label}: "
        self.write(12, label_txt)
        self.set_font("Calibri", "", 10)
        self.write(12, value)
        self.ln(13)


def build():
    pdf = ResumeStyleCV()
    pdf.add_page()
    usable = pdf.w - pdf.l_margin - pdf.r_margin

    # ----- HEADER -----
    pdf.set_font("Calibri", "B", 18)
    pdf.set_text_color(*NAME_COLOR)
    pdf.cell(0, 22, "Karim Mohamed Saad", align="C", new_x="LMARGIN", new_y="NEXT")

    # Contact rows: (text, url) segments, centered; url segments render as links.
    pdf.set_font("Calibri", "", 9)
    contact_rows = [
        [("+20 114 522 2298 | karimsaad1552003@gmail.com | Egypt", None)],
        [
            ("linkedin.com/in/karimmsaad", "https://www.linkedin.com/in/karimmsaad"),
            (" | ", None),
            ("github.com/karimsaad1552003-creator", "https://github.com/karimsaad1552003-creator"),
            (" | Portfolio: ", None),
            ("karim-saad-portofolio.vercel.app", "https://karim-saad-portofolio.vercel.app/"),
        ],
    ]
    for row in contact_rows:
        widths = [pdf.get_string_width(text) for text, _ in row]
        pdf.set_x((pdf.w - sum(widths)) / 2)
        for (text, url), width in zip(row, widths):
            pdf.set_text_color(*(LINK_COLOR if url else TEXT))
            pdf.cell(width, 12, text, link=url or "")
        pdf.set_text_color(*TEXT)
        pdf.ln(12)
    pdf.set_font("Calibri", "", 11)
    pdf.set_text_color(*TEXT)
    pdf.cell(0, 14, "Full Stack Developer", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 14, "Data Analyst", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    # ----- SUMMARY -----
    pdf.section_title("Professional Summary")
    pdf.set_font("Calibri", "", 10)
    pdf.multi_cell(
        0,
        12,
        "Information Systems graduate seeking full-stack developer and data analyst roles. "
        "Full-stack work includes Ascendra, where we build school systems and gate systems, "
        "and Vertex Reviews, where I delivered 20+ websites plus logos, flyers, and printable menus "
        "for business identity. Data analysis work includes Power BI dashboards, machine learning "
        "workflows, and a machine learning internship at Telecom Egypt. Real estate "
        "sales at ElitePlus strengthened client communication and negotiation.",
    )

    # ----- EXPERIENCE -----
    pdf.section_title("Experience")

    pdf.left_right("Full Stack Developer - Ascendra", "Egypt  |  Apr 2026 - Present")
    pdf.bullet("We build school systems and gate systems.")
    pdf.bullet("Live product: https://ascendrasol.com/")
    pdf.ln(2)

    pdf.left_right(
        "Full Stack Developer - Vertex Reviews",
        "New Jersey, USA (remote)  |  Apr 2026 - Present",
    )
    pdf.bullet(
        "Work with Vertex through its collaboration with Ascendra, which runs Vertex's back-end services."
    )
    pdf.bullet(
        "Delivered 20+ websites and business rebranding through logos, flyers, and printable menus."
    )
    pdf.bullet("Live product: https://www.vertexreviews.com")
    pdf.ln(2)

    pdf.left_right("Real Estate Agent (Sales) - ElitePlus", "Egypt  |  Aug 2025 - Oct 2026")
    pdf.bullet(
        "Worked in client-facing sales, building communication, negotiation, "
        "and relationship management."
    )
    pdf.ln(2)

    pdf.left_right(
        "Machine and Deep Learning Developer (Intern) - Telecom Egypt",
        "Egypt  |  Jan 2025 - Feb 2025",
    )
    pdf.bullet(
        "Worked on machine and deep learning tasks, including data preparation and model development."
    )
    pdf.ln(2)

    pdf.left_right("Requirements Analyst (Intern) - AppSoft", "Egypt  |  Jul 2024 - Aug 2024")
    pdf.bullet(
        "Analyzed software requirements and wrote specifications for implementation."
    )
    pdf.ln(1)

    # ----- EDUCATION -----
    pdf.section_title("Education")
    pdf.set_font("Calibri", "B", 10)
    pdf.cell(0, 12, "Bachelor of Information Systems", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Calibri", "", 10)
    pdf.cell(0, 12, "College of Computing and Information Technology", new_x="LMARGIN", new_y="NEXT")
    pdf.left_right(
        "Arab Academy for Science, Technology & Maritime Transport",
        "Egypt  |  2022 - 2026",
    )
    pdf.ln(1)

    # ----- PROJECTS (academic) -----
    pdf.section_title("Academic Projects")

    pdf.set_font("Calibri", "B", 10)
    pdf.set_text_color(*TEXT)
    pdf.multi_cell(0, 12, "VulnGPT - AI-Assisted Web Vulnerability Analysis Engine")
    pdf.bullet(
        "AI-powered web security testing platform using HTTP/HTTPS traffic analysis, controlled security "
        "testing, and evidence-based reporting, with AI-assisted vulnerability analysis, risk prioritization, "
        "false-positive verification, and remediation recommendations."
    )
    pdf.bullet(
        "Nominated for discussion before the College Council for its technical value and potential impact."
    )
    pdf.ln(1)

    projects = [
        (
            "Video Game Sales Analysis  |  Power BI",
            None,
            "Interactive dashboard on 16,000+ sales records across regions, platforms, and genres.",
        ),
        (
            "Machine and Deep Learning Workflows  |  Python, Pandas, Scikit-learn, TensorFlow, PyTorch",
            None,
            "End-to-end workflows: collection, cleaning, transformation, model development, and evaluation.",
        ),
        (
            "Ticketing Management System  |  ERD, data modeling",
            None,
            "ERD, data dictionary, and technical specification for tickets, users, departments, priorities, and status logs.",
        ),
        (
            "Pharmacy Management System  |  Microsoft Project",
            None,
            "Scope, tasks, timelines, resources, Gantt chart, and milestones.",
        ),
    ]

    for title, url, desc in projects:
        pdf.set_font("Calibri", "B", 10)
        pdf.set_text_color(*TEXT)
        if url:
            # Title + link cue like reference "→ Here"
            pdf.write(12, title + "  ")
            pdf.set_text_color(*LINK_COLOR)
            pdf.set_font("Calibri", "I", 10)
            pdf.write(12, "-> Here", link=url)
            pdf.set_text_color(*TEXT)
            pdf.ln(12)
        else:
            pdf.multi_cell(0, 12, title)
        pdf.bullet(desc)
        pdf.ln(1)

    # ----- SKILLS -----
    pdf.section_title("Skills")
    pdf.labeled_line("Programming languages", "Python, Java, C, SQL")
    pdf.labeled_line(
        "Data and AI",
        "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, Power BI, Tableau, Excel",
    )
    pdf.labeled_line(
        "Analysis",
        "Requirements analysis, ERD, technical specifications, Microsoft Project, Git",
    )
    pdf.labeled_line(
        "Professional",
        "Client communication, sales and negotiation, relationship building",
    )
    pdf.labeled_line(
        "Spoken languages",
        "Arabic (Native), English (Fluent), French (DELF B1, Fluent)",
    )

    # ----- CERTIFICATIONS -----
    pdf.section_title("Certifications")
    pdf.bullet("Cisco CyberOps Associate (CBROPS), NTI - Excellent")
    pdf.bullet("Odoo Technical Bootcamp - February 2026, 8-hour course")

    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    tmp = ROOT / "data" / "_cv_build.pdf"
    pdf.output(str(tmp))
    payload = tmp.read_bytes()
    written = []
    for dest in (OUT_ATS, OUT_PUBLIC, OUT_DATA):
        saved = False
        candidates = [dest, dest.with_name(f"{dest.stem}-updated{dest.suffix}")]
        for n in range(2, 6):
            candidates.append(dest.with_name(f"{dest.stem}-v{n}{dest.suffix}"))
        for candidate in candidates:
            try:
                candidate.write_bytes(payload)
                note = "" if candidate == dest else " (original file is open)"
                written.append(f"{candidate}{note}")
                saved = True
                break
            except PermissionError:
                continue
        if not saved:
            written.append(f"FAILED {dest}")
    tmp.unlink(missing_ok=True)
    for path in written:
        print(f"Wrote {path}")
    print(f"pages={pdf.page_no()}")


if __name__ == "__main__":
    build()

"""
Generate Karim's CV using data/Resume.pdf as the visual/format reference.
Format cues from reference:
- US Letter, Calibri, dark name color
- Contact row under name
- Sections: EDUCATION -> SKILLS -> WORK EXPERIENCE & CERTIFICATES -> PROJECTS
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
        self.ln(6)
        self.set_font("Calibri", "B", 11)
        self.set_text_color(*NAME_COLOR)
        self.cell(0, 14, title.upper(), new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(0, 0, 0)
        self.set_line_width(0.7)
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(6)
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

    # Contact row (centered, compact — mirrors reference contact line)
    pdf.set_font("Calibri", "", 9)
    pdf.set_text_color(*TEXT)
    contact = (
        "karimsaad1552003@gmail.com   |   01145222298   |   "
        "github.com/karimsaad1552003-creator   |   Alexandria, Egypt"
    )
    pdf.cell(0, 12, contact, align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    # ----- EDUCATION -----
    pdf.section_title("Education")
    pdf.left_right(
        "Arab Academy for Science, Technology & Maritime Transport",
        "Egypt  |  2022 - 2026",
    )
    pdf.set_font("Calibri", "", 10)
    pdf.multi_cell(
        0,
        12,
        "B.Sc. in Computer Science - Data Analysis & Artificial Intelligence focus",
    )
    pdf.ln(2)
    pdf.left_right("College Saint-Marc", "Alexandria, Egypt")
    pdf.ln(1)

    # ----- SKILLS -----
    pdf.section_title("Skills")
    pdf.labeled_line("Programming Languages", "Python, Java, C, SQL")
    pdf.labeled_line("Languages", "Arabic: Native    English: Fluent    French: DELF B1, Fluent")
    pdf.labeled_line(
        "Frameworks & Tools",
        "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, Power BI, Tableau, Excel, Microsoft Project, Git & GitHub",
    )
    pdf.labeled_line(
        "Domains",
        "Full-Stack Development, Data Analysis, Machine Learning, Deep Learning, Requirements Analysis, Business Intelligence",
    )
    pdf.labeled_line(
        "Professional Skills",
        "Client communication, Sales & negotiation, Relationship building, Stakeholder collaboration",
    )

    # ----- WORK EXPERIENCE & CERTIFICATES -----
    pdf.section_title("Work Experience & Certificates")

    pdf.left_right("Co-founder - Ascendra", "Alexandria, Egypt  |  Present")
    pdf.bullet(
        "Co-founded a technology studio building custom software, conversion-focused websites, "
        "and offline-first IoT systems for clients in Egypt and the United States."
    )
    pdf.bullet(
        "Contribute to full-stack product delivery and support Ascendra as authorized Egypt "
        "operations partner of Vertex Reviews (New Jersey, USA)."
    )
    pdf.ln(2)

    pdf.left_right(
        "Full Stack Developer - Vertex Reviews",
        "New Jersey, USA (remote)  |  Present",
    )
    pdf.bullet(
        "Build and maintain production web experiences for Vertex Reviews, a Google Business "
        "Profile and reputation management company serving US businesses."
    )
    pdf.bullet(
        "Support service storytelling, package presentation, and client conversion flows "
        "across the Ascendra x Vertex partnership."
    )
    pdf.ln(2)

    pdf.left_right("Real Estate Agent (Sales) - ElitePlus", "Egypt  |  2025 - 2026")
    pdf.bullet(
        "Spent one year in client-facing real estate sales, building strong communication, "
        "negotiation, and relationship-management skills."
    )
    pdf.ln(2)

    pdf.left_right(
        "Machine and Deep Learning Developer (Intern) - Telecom Egypt",
        "Egypt  |  Internship",
    )
    pdf.bullet(
        "Worked on machine and deep learning development tasks, including data preparation "
        "and model-oriented problem solving in an enterprise environment."
    )
    pdf.ln(2)

    pdf.left_right("Requirements Analyst (Intern) - AppSoft", "Egypt  |  Internship")
    pdf.bullet(
        "Analyzed software requirements, clarified system expectations, and supported "
        "structured documentation for implementation-ready specifications."
    )
    pdf.ln(3)

    pdf.set_font("Calibri", "B", 10)
    pdf.write(12, "Certificates: ")
    pdf.set_font("Calibri", "", 10)
    pdf.write(
        12,
        "Cisco CyberOps Associate (CBROPS) - NTI (Excellent); CCNA - Cisco; "
        "Odoo Technical Bootcamp - Feb 2026",
    )
    pdf.ln(14)

    # ----- PROJECTS -----
    pdf.section_title("Projects")

    projects = [
        (
            "Vertex Reviews Platform  |  Full-stack web",
            "https://www.vertexreviews.com",
            "Production website and service platform for Google Business Profile optimization, "
            "review monitoring, growth strategy, and service packages for US businesses.",
        ),
        (
            "Ascendra  |  React, Next.js, TypeScript, NestJS, PostgreSQL, Flutter, Python",
            "https://maroweb.net/Ascendra/",
            "Co-founded technology studio shipping custom software, business websites, and "
            "offline-first IoT systems (including Sahel Gate and Full School System) for US and Egypt clients.",
        ),
        (
            "Video Game Sales Analysis  |  Power BI",
            None,
            "Interactive Power BI dashboard analyzing 16,000+ video game sales records across "
            "regions to identify platform, genre, and market trends for forecasting and targeting.",
        ),
        (
            "Machine & Deep Learning Workflows  |  Python, Pandas, Scikit-learn, TensorFlow, PyTorch",
            None,
            "End-to-end ML workflows covering data collection, cleaning, transformation, model "
            "development, and evaluation to support data-driven decisions.",
        ),
        (
            "Ticketing Management System Design  |  ERD, Data modeling",
            None,
            "Designed ERD, data dictionary, and technical specification covering tickets, users, "
            "departments, priorities, and status logs.",
        ),
        (
            "Pharmacy Management System Planning  |  Microsoft Project",
            None,
            "Defined project scope, tasks, timelines, resources, Gantt charts, and milestones "
            "for a Pharmacy Management System using Microsoft Project.",
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

    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT_PUBLIC))
    try:
        pdf.output(str(OUT_DATA))
        print(f"Wrote {OUT_DATA}")
    except PermissionError:
        # data/Karim-CV.pdf may be open in a viewer; public copy is the site source of truth
        alt = ROOT / "data" / "Karim-CV-ats.pdf"
        pdf.output(str(alt))
        print(f"data/Karim-CV.pdf locked; wrote {alt} instead")
    print(f"Wrote {OUT_PUBLIC} ({OUT_PUBLIC.stat().st_size} bytes)")
    print(f"pages={pdf.page_no()}")


if __name__ == "__main__":
    build()

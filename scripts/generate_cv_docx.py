"""
Export Karim's CV as Word (.docx) matching the Resume.pdf format reference.
"""

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor, Twips

ROOT = Path(__file__).resolve().parents[1]
OUT_PUBLIC = ROOT / "public" / "assets" / "cv" / "Karim-Saad-CV.docx"
OUT_DATA = ROOT / "data" / "Karim-Saad-CV.docx"

NAME_COLOR = RGBColor(0x1F, 0x3C, 0x24)
LINK_COLOR = RGBColor(0x59, 0x59, 0x59)


def set_run_font(run, size=10, bold=False, italic=False, color=None, name="Calibri"):
    run.font.name = name
    run._element.rPr.rFonts.set(qn("w:eastAsia"), name)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    if color is not None:
        run.font.color.rgb = color


def set_paragraph_spacing(paragraph, before=0, after=2, line=1.0):
    pf = paragraph.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line
    pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE


def add_bottom_border(paragraph):
    p = paragraph._p
    pPr = p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "12")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), "000000")
    pBdr.append(bottom)
    pPr.append(pBdr)


def section_title(doc, text):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=8, after=4, line=1.0)
    run = p.add_run(text.upper())
    set_run_font(run, size=11, bold=True, color=NAME_COLOR)
    add_bottom_border(p)
    return p


def left_right(doc, left, right, left_bold=True):
    """Left title + right-aligned location/dates via a right tab stop."""
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=4, after=0, line=1.05)
    # usable width ~6.5" with 0.7" margins on Letter
    tab_stops = p.paragraph_format.tab_stops
    tab_stops.add_tab_stop(Inches(7.0), WD_TAB_ALIGNMENT.RIGHT)
    left_run = p.add_run(left)
    set_run_font(left_run, size=10, bold=left_bold)
    p.add_run("\t")
    right_run = p.add_run(right)
    set_run_font(right_run, size=10, italic=True)
    return p


def body(doc, text):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=0, after=2, line=1.05)
    run = p.add_run(text)
    set_run_font(run, size=10)
    return p


def bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    set_paragraph_spacing(p, before=0, after=1, line=1.05)
    # Clear default run and add styled text
    if p.runs:
        p.runs[0].text = text
        set_run_font(p.runs[0], size=10)
    else:
        run = p.add_run(text)
        set_run_font(run, size=10)
    return p


def labeled_line(doc, label, value):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=1, after=1, line=1.05)
    label_run = p.add_run(f"{label}: ")
    set_run_font(label_run, size=10, bold=True)
    value_run = p.add_run(value)
    set_run_font(value_run, size=10)
    return p


def project_line(doc, title, url=None):
    p = doc.add_paragraph()
    set_paragraph_spacing(p, before=4, after=0, line=1.05)
    title_run = p.add_run(title)
    set_run_font(title_run, size=10, bold=True)
    if url:
        p.add_run("  ")
        link_run = p.add_run("-> Here")
        set_run_font(link_run, size=10, italic=True, color=LINK_COLOR)
        # Hyperlink
        part = doc.part
        r_id = part.relate_to(
            url,
            "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
            is_external=True,
        )
        hyperlink = OxmlElement("w:hyperlink")
        hyperlink.set(qn("r:id"), r_id)
        new_run = OxmlElement("w:r")
        rPr = OxmlElement("w:rPr")
        color = OxmlElement("w:color")
        color.set(qn("w:val"), "595959")
        i = OxmlElement("w:i")
        sz = OxmlElement("w:sz")
        sz.set(qn("w:val"), "20")
        rFonts = OxmlElement("w:rFonts")
        rFonts.set(qn("w:ascii"), "Calibri")
        rFonts.set(qn("w:hAnsi"), "Calibri")
        u = OxmlElement("w:u")
        u.set(qn("w:val"), "single")
        rPr.extend([rFonts, color, i, sz, u])
        new_run.append(rPr)
        text = OxmlElement("w:t")
        text.text = "-> Here"
        new_run.append(text)
        hyperlink.append(new_run)
        # Remove plain link run and append real hyperlink
        link_run._element.getparent().remove(link_run._element)
        p._p.append(hyperlink)
    return p


def build():
    doc = Document()

    section = doc.sections[0]
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.left_margin = Inches(0.7)
    section.right_margin = Inches(0.7)
    section.top_margin = Inches(0.5)
    section.bottom_margin = Inches(0.5)

    # Normal style defaults
    style = doc.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(10)

    # Header
    name = doc.add_paragraph()
    name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(name, before=0, after=2, line=1.0)
    name_run = name.add_run("Karim Mohamed Saad")
    set_run_font(name_run, size=18, bold=True, color=NAME_COLOR)

    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_paragraph_spacing(contact, before=0, after=4, line=1.0)
    contact_run = contact.add_run(
        "karimsaad1552003@gmail.com   |   01145222298   |   "
        "github.com/karimsaad1552003-creator   |   Alexandria, Egypt"
    )
    set_run_font(contact_run, size=9)

    # EDUCATION
    section_title(doc, "Education")
    left_right(
        doc,
        "Arab Academy for Science, Technology & Maritime Transport",
        "Egypt  |  2022 - 2026",
    )
    body(doc, "B.Sc. in Computer Science - Data Analysis & Artificial Intelligence focus")
    left_right(doc, "College Saint-Marc", "Alexandria, Egypt")

    # SKILLS
    section_title(doc, "Skills")
    labeled_line(doc, "Programming Languages", "Python, Java, C, SQL")
    labeled_line(
        doc,
        "Languages",
        "Arabic: Native    English: Fluent    French: DELF B1, Fluent",
    )
    labeled_line(
        doc,
        "Frameworks & Tools",
        "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, "
        "Power BI, Tableau, Excel, Microsoft Project, Git & GitHub",
    )
    labeled_line(
        doc,
        "Domains",
        "Full-Stack Development, Data Analysis, Machine Learning, Deep Learning, "
        "Requirements Analysis, Business Intelligence",
    )
    labeled_line(
        doc,
        "Professional Skills",
        "Client communication, Sales & negotiation, Relationship building, "
        "Stakeholder collaboration",
    )

    # WORK EXPERIENCE & CERTIFICATES
    section_title(doc, "Work Experience & Certificates")

    left_right(doc, "Co-founder - Ascendra", "Alexandria, Egypt  |  Present")
    bullet(
        doc,
        "Co-founded a technology studio building custom software, conversion-focused websites, "
        "and offline-first IoT systems for clients in Egypt and the United States.",
    )
    bullet(
        doc,
        "Contribute to full-stack product delivery and support Ascendra as authorized Egypt "
        "operations partner of Vertex Reviews (New Jersey, USA).",
    )

    left_right(
        doc,
        "Full Stack Developer - Vertex Reviews",
        "New Jersey, USA (remote)  |  Present",
    )
    bullet(
        doc,
        "Build and maintain production web experiences for Vertex Reviews, a Google Business "
        "Profile and reputation management company serving US businesses.",
    )
    bullet(
        doc,
        "Support service storytelling, package presentation, and client conversion flows "
        "across the Ascendra x Vertex partnership.",
    )

    left_right(doc, "Real Estate Agent (Sales) - ElitePlus", "Egypt  |  2025 - 2026")
    bullet(
        doc,
        "Spent one year in client-facing real estate sales, building strong communication, "
        "negotiation, and relationship-management skills.",
    )

    left_right(
        doc,
        "Machine and Deep Learning Developer (Intern) - Telecom Egypt",
        "Egypt  |  Internship",
    )
    bullet(
        doc,
        "Worked on machine and deep learning development tasks, including data preparation "
        "and model-oriented problem solving in an enterprise environment.",
    )

    left_right(doc, "Requirements Analyst (Intern) - AppSoft", "Egypt  |  Internship")
    bullet(
        doc,
        "Analyzed software requirements, clarified system expectations, and supported "
        "structured documentation for implementation-ready specifications.",
    )

    certs = doc.add_paragraph()
    set_paragraph_spacing(certs, before=6, after=2, line=1.05)
    cert_label = certs.add_run("Certificates: ")
    set_run_font(cert_label, size=10, bold=True)
    cert_value = certs.add_run(
        "Cisco CyberOps Associate (CBROPS) - NTI (Excellent); CCNA - Cisco; "
        "Odoo Technical Bootcamp - Feb 2026"
    )
    set_run_font(cert_value, size=10)

    # PROJECTS
    section_title(doc, "Projects")

    project_line(doc, "Vertex Reviews Platform  |  Full-stack web", "https://www.vertexreviews.com")
    bullet(
        doc,
        "Production website and service platform for Google Business Profile optimization, "
        "review monitoring, growth strategy, and service packages for US businesses.",
    )

    project_line(
        doc,
        "Ascendra  |  React, Next.js, TypeScript, NestJS, PostgreSQL, Flutter, Python",
        "https://maroweb.net/Ascendra/",
    )
    bullet(
        doc,
        "Co-founded technology studio shipping custom software, business websites, and "
        "offline-first IoT systems (including Sahel Gate and Full School System) for US and Egypt clients.",
    )

    project_line(doc, "Video Game Sales Analysis  |  Power BI")
    bullet(
        doc,
        "Interactive Power BI dashboard analyzing 16,000+ video game sales records across "
        "regions to identify platform, genre, and market trends for forecasting and targeting.",
    )

    project_line(
        doc,
        "Machine & Deep Learning Workflows  |  Python, Pandas, Scikit-learn, TensorFlow, PyTorch",
    )
    bullet(
        doc,
        "End-to-end ML workflows covering data collection, cleaning, transformation, model "
        "development, and evaluation to support data-driven decisions.",
    )

    project_line(doc, "Ticketing Management System Design  |  ERD, Data modeling")
    bullet(
        doc,
        "Designed ERD, data dictionary, and technical specification covering tickets, users, "
        "departments, priorities, and status logs.",
    )

    project_line(doc, "Pharmacy Management System Planning  |  Microsoft Project")
    bullet(
        doc,
        "Defined project scope, tasks, timelines, resources, Gantt charts, and milestones "
        "for a Pharmacy Management System using Microsoft Project.",
    )

    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(OUT_PUBLIC))
    try:
        doc.save(str(OUT_DATA))
        print(f"Wrote {OUT_DATA}")
    except PermissionError:
        alt = ROOT / "data" / "Karim-Saad-CV-export.docx"
        doc.save(str(alt))
        print(f"data path locked; wrote {alt}")
    print(f"Wrote {OUT_PUBLIC} ({OUT_PUBLIC.stat().st_size} bytes)")


if __name__ == "__main__":
    build()

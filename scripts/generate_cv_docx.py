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


def add_hyperlink(paragraph, text, url, size=9):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    run = OxmlElement("w:r")
    r_pr = OxmlElement("w:rPr")
    color = OxmlElement("w:color")
    color.set(qn("w:val"), "595959")
    r_pr.append(color)
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    r_pr.append(underline)
    font_size = OxmlElement("w:sz")
    font_size.set(qn("w:val"), str(int(size * 2)))
    r_pr.append(font_size)
    font = OxmlElement("w:rFonts")
    font.set(qn("w:ascii"), "Calibri")
    font.set(qn("w:hAnsi"), "Calibri")
    r_pr.append(font)
    run.append(r_pr)
    text_el = OxmlElement("w:t")
    text_el.text = text
    run.append(text_el)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


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
    contact_run = contact.add_run("+20 114 522 2298 | karimsaad1552003@gmail.com | Egypt")
    set_run_font(contact_run, size=9)
    contact_run.add_break()
    add_hyperlink(
        contact,
        "linkedin.com/in/karimmsaad",
        "https://www.linkedin.com/in/karimmsaad",
        size=9,
    )
    set_run_font(contact.add_run(" | "), size=9)
    add_hyperlink(
        contact,
        "github.com/karimsaad1552003-creator",
        "https://github.com/karimsaad1552003-creator",
        size=9,
    )
    set_run_font(contact.add_run(" | Portfolio: "), size=9)
    add_hyperlink(
        contact,
        "karim-saad-portofolio.vercel.app",
        "https://karim-saad-portofolio.vercel.app/",
        size=9,
    )

    for line in ("Full Stack Developer", "Data Analyst"):
        title = doc.add_paragraph()
        title.alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_paragraph_spacing(title, before=0, after=0, line=1.0)
        title_run = title.add_run(line)
        set_run_font(title_run, size=11)

    section_title(doc, "Professional Summary")
    body(
        doc,
        "Information Systems graduate seeking full-stack developer and data analyst roles. "
        "Full-stack work includes Ascendra, where we build school systems and gate systems, "
        "and Vertex Reviews, where I delivered 20+ websites plus logos, flyers, and printable menus "
        "for business identity. Data analysis work includes Power BI dashboards, machine learning "
        "workflows, and a machine learning internship at Telecom Egypt. Real estate "
        "sales at ElitePlus strengthened client communication and negotiation.",
    )

    section_title(doc, "Experience")

    left_right(doc, "Full Stack Developer - Ascendra", "Egypt  |  Apr 2026 - Present")
    bullet(doc, "We build school systems and gate systems.")
    bullet(doc, "Live product: https://ascendrasol.com/")

    left_right(
        doc,
        "Full Stack Developer - Vertex Reviews",
        "New Jersey, USA (remote)  |  Apr 2026 - Present",
    )
    bullet(
        doc,
        "Work with Vertex through its collaboration with Ascendra, which runs Vertex's back-end services.",
    )
    bullet(
        doc,
        "Delivered 20+ websites and business rebranding through logos, flyers, and printable menus.",
    )
    bullet(doc, "Live product: https://www.vertexreviews.com")

    left_right(doc, "Real Estate Agent (Sales) - ElitePlus", "Egypt  |  Aug 2025 - Oct 2026")
    bullet(
        doc,
        "Worked in client-facing sales, building communication, negotiation, "
        "and relationship management.",
    )

    left_right(
        doc,
        "Machine and Deep Learning Developer (Intern) - Telecom Egypt",
        "Egypt  |  Jan 2025 - Feb 2025",
    )
    bullet(
        doc,
        "Worked on machine and deep learning tasks, including data preparation and model development.",
    )

    left_right(doc, "Requirements Analyst (Intern) - AppSoft", "Egypt  |  Jul 2024 - Aug 2024")
    bullet(doc, "Analyzed software requirements and wrote specifications for implementation.")

    section_title(doc, "Education")
    degree = doc.add_paragraph()
    set_paragraph_spacing(degree, before=2, after=0, line=1.05)
    degree_run = degree.add_run("Bachelor of Information Systems")
    set_run_font(degree_run, size=10, bold=True)
    body(doc, "College of Computing and Information Technology")
    left_right(
        doc,
        "Arab Academy for Science, Technology & Maritime Transport",
        "Egypt  |  2022 - 2026",
    )

    section_title(doc, "Academic Projects")

    project_line(doc, "VulnGPT - AI-Assisted Web Vulnerability Analysis Engine")
    bullet(
        doc,
        "AI-powered web security testing platform using HTTP/HTTPS traffic analysis, controlled security "
        "testing, and evidence-based reporting, with AI-assisted vulnerability analysis, risk prioritization, "
        "false-positive verification, and remediation recommendations.",
    )
    bullet(
        doc,
        "Nominated for discussion before the College Council for its technical value and potential impact.",
    )

    project_line(doc, "Video Game Sales Analysis  |  Power BI")
    bullet(
        doc,
        "Interactive dashboard on 16,000+ sales records across regions, platforms, and genres.",
    )

    project_line(
        doc,
        "Machine and Deep Learning Workflows  |  Python, Pandas, Scikit-learn, TensorFlow, PyTorch",
    )
    bullet(
        doc,
        "End-to-end workflows: collection, cleaning, transformation, model development, and evaluation.",
    )

    project_line(doc, "Ticketing Management System  |  ERD, data modeling")
    bullet(
        doc,
        "ERD, data dictionary, and technical specification for tickets, users, departments, "
        "priorities, and status logs.",
    )

    project_line(doc, "Pharmacy Management System  |  Microsoft Project")
    bullet(doc, "Scope, tasks, timelines, resources, Gantt chart, and milestones.")

    section_title(doc, "Skills")
    labeled_line(doc, "Programming languages", "Python, Java, C, SQL")
    labeled_line(
        doc,
        "Data and AI",
        "Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, Power BI, Tableau, Excel",
    )
    labeled_line(
        doc,
        "Analysis",
        "Requirements analysis, ERD, technical specifications, Microsoft Project, Git",
    )
    labeled_line(
        doc,
        "Professional",
        "Client communication, sales and negotiation, relationship building",
    )
    labeled_line(
        doc,
        "Spoken languages",
        "Arabic (Native), English (Fluent), French (DELF B1, Fluent)",
    )

    section_title(doc, "Certifications")
    bullet(doc, "Cisco CyberOps Associate (CBROPS), NTI - Excellent")
    bullet(doc, "Odoo Technical Bootcamp - February 2026, 8-hour course")

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

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { ResumeData } from "../components/ResumeContext";

export async function generateDocx(resume: ResumeData) {
  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: resume.name || "",
          bold: true,
          size: 32, // ≈16pt
          font: "Calibri",
        }),
      ],
      spacing: { after: 200 },
      alignment: "center",
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${resume.phone || ""} | ${resume.email || ""} | ${resume.linkedin || ""}`,
          font: "Calibri",
          size: 22, // ≈11pt
        }),
      ],
      alignment: "center",
      spacing: { after: 300 },
    })
  );

  // Professional Summary
  if (resume.summary?.length) {
    children.push(
      new Paragraph({
        text: "Professional Summary",
        heading: "Heading2",
        spacing: { before: 300, after: 100 },
      })
    );
    resume.summary.forEach((s) =>
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "• " + s,
              font: "Calibri",
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    );
  }

  // Technical Skills
  if (resume.skills?.length) {
    children.push(
      new Paragraph({
        text: "Technical Skills",
        heading: "Heading2",
        spacing: { before: 300, after: 100 },
      })
    );
    resume.skills.forEach((cat) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${cat.category}: `,
              bold: true,
              font: "Calibri",
              size: 22,
            }),
            new TextRun({
              text: cat.items.join(", "),
              font: "Calibri",
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Certifications
  if (resume.certifications?.length) {
    children.push(
      new Paragraph({
        text: "Certifications",
        heading: "Heading2",
        spacing: { before: 300, after: 100 },
      })
    );
    resume.certifications.forEach((cert) =>
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "• " + cert,
              font: "Calibri",
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    );
  }

  // Education
  if (resume.education?.length) {
    children.push(
      new Paragraph({
        text: "Education",
        heading: "Heading2",
        spacing: { before: 300, after: 100 },
      })
    );
    resume.education.forEach((edu) =>
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${edu.degree}, ${edu.school} | Graduated: ${edu.year}`,
              font: "Calibri",
              size: 22,
            }),
          ],
          spacing: { after: 100 },
        })
      )
    );
  }

  // Experience
  if (resume.experience?.length) {
    children.push(
      new Paragraph({
        text: "Professional Experience",
        heading: "Heading2",
        spacing: { before: 300, after: 100 },
      })
    );

    resume.experience.forEach((exp) => {
      // Role header
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.client} @ ${exp.company} | ${exp.role} (${exp.duration})`,
              bold: true,
              font: "Calibri",
              size: 22,
            }),
          ],
          spacing: { before: 200, after: 100 },
        })
      );

      // Project Description
      if (exp.projectDescription)
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.projectDescription,
                font: "Calibri",
                size: 22,
              }),
            ],
            spacing: { after: 100 },
          })
        );

      // Responsibilities
      exp.responsibilities?.forEach((r) =>
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "• " + r,
                font: "Calibri",
                size: 22,
              }),
            ],
            spacing: { after: 80 },
          })
        )
      );

      // Environment
      if (exp.environment)
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `Environment: ${exp.environment}`,
                italics: true,
                font: "Calibri",
                size: 20,
              }),
            ],
            spacing: { before: 100, after: 200 },
          })
        );
    });
  }

  // Build final doc
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${resume.name.replace(/\s/g, "_")}_Resume.docx`);
}

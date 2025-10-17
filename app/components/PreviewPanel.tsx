"use client";
import { useResume } from "./ResumeContext";

export default function PreviewPanel() {
  const { resume } = useResume();

  // 🧩 Utility to ensure arrays
  const ensureArray = (val: any) => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  const phones = ensureArray(resume.phone);
  const emails = ensureArray(resume.email);
  const linkedins = ensureArray(resume.linkedin);
  const portfolios = ensureArray(resume.portfolio);

  // 📞 Format phone numbers
  const formatPhone = (num: string) => {
    const digits = num.replace(/\D/g, "");
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    return num; // fallback if non-standard
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50 p-10 text-gray-900 font-sans">
      {/* Header */}
      <div className="text-center border-b pb-3 mb-4">
        <h1 className="text-3xl font-bold">
          {resume.name || "Your Full Name"}
        </h1>

        <p className="text-sm mt-2 flex flex-wrap justify-center items-center gap-x-2 text-gray-800">
          {/* Phones */}
          {phones.length > 0 &&
            phones
              .filter((p) => p.trim() !== "")
              .map((p, i) => (
                <span key={i}>
                  📞 {formatPhone(p)}
                  {i < phones.length - 1 && " | "}
                </span>
              ))}

          {/* Emails */}
          {emails.length > 0 &&
            emails
              .filter((e) => e.trim() !== "")
              .map((e, i) => (
                <span key={i}>
                  {phones.length > 0 && i === 0 && " | "}✉️ {e}
                  {i < emails.length - 1 && " | "}
                </span>
              ))}

          {/* LinkedIn */}
          {linkedins.length > 0 &&
            linkedins
              .filter((l) => l.trim() !== "")
              .map((l, i) => (
                <span key={i}>
                  {(phones.length > 0 || emails.length > 0) && i === 0 && " | "}
                  🔗{" "}
                  <a
                    href={l.startsWith("http") ? l : `https://${l}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {l.replace(/^https?:\/\//, "")}
                  </a>
                  {i < linkedins.length - 1 && " | "}
                </span>
              ))}

          {/* Portfolio */}
          {portfolios.length > 0 &&
            portfolios
              .filter((p) => p.trim() !== "")
              .map((p, i) => (
                <span key={i}>
                  {(phones.length > 0 ||
                    emails.length > 0 ||
                    linkedins.length > 0) &&
                    i === 0 &&
                    " | "}
                  💼{" "}
                  <a
                    href={p.startsWith("http") ? p : `https://${p}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {p.replace(/^https?:\/\//, "")}
                  </a>
                  {i < portfolios.length - 1 && " | "}
                </span>
              ))}
        </p>
      </div>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b mb-2 pb-1">
          Professional Summary
        </h2>
        <ul className="list-disc ml-5 space-y-1">
          {resume.summary.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Technical Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b mb-2 pb-1">
          Technical Skills
        </h2>
        {resume.skills.map((skill, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{skill.category}:</p>
            <p className="text-sm ml-2">{skill.items.join(", ")}</p>
          </div>
        ))}
      </section>

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2 pb-1">
            Certifications
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            {resume.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2 pb-1">Education</h2>
          {resume.education.map((edu, i) => (
            <p key={i} className="text-sm mb-1">
              <span className="font-semibold">{edu.degree}</span>, {edu.school} |{" "}
              Graduated: {edu.year}
            </p>
          ))}
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2 pb-1">
            Professional Experience
          </h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-semibold">
                {exp.client} @{exp.company} | {exp.role}
              </p>
              <p className="text-sm italic mb-2">{exp.duration}</p>
              <p className="text-sm mb-2">{exp.projectDescription}</p>
              {exp.responsibilities?.length > 0 && (
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {exp.responsibilities.map((r: string, idx: number) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              )}
              {exp.environment && (
                <p className="text-xs mt-2 text-gray-600">
                  <strong>Environment:</strong> {exp.environment}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

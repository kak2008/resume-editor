"use client";
import { useResume } from "./ResumeContext";

export default function PreviewPanel() {
  const { resume } = useResume();

  return (
<div className="w-full h-screen overflow-y-auto bg-gray-50 p-10 text-gray-900 font-sans">
      {/* Header */}
      <div className="text-center border-b pb-3 mb-4">
        <h1 className="text-3xl font-bold">{resume.name}</h1>
        <p className="text-sm mt-1">
          📞 {resume.phone} | ✉️ {resume.email} | 🔗 {resume.linkedin}
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
              <span className="font-semibold">{edu.degree}</span>, {edu.school}{" "}
              | Graduated: {edu.year}
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

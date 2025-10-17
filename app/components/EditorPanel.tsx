"use client";
import { useResume } from "./ResumeContext";
import { useState } from "react";

export default function EditorPanel() {
  const { resume, setResume } = useResume();
  const [selectedSection, setSelectedSection] = useState<string>("summary");

  const updateField = (field: string, value: any) => {
    setResume({ ...resume, [field]: value });
  };

  const addSkillCategory = () => {
    setResume({
      ...resume,
      skills: [...resume.skills, { category: "New Category", items: [] }],
    });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          client: "New Client",
          company: "",
          role: "",
          duration: "",
          projectDescription: "",
          responsibilities: [],
          environment: "",
        },
      ],
    });
  };

  const addCertification = () => {
    setResume({
      ...resume,
      certifications: [...resume.certifications, "New Certification"],
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { degree: "", school: "", year: "" }],
    });
  };

  return (
    <div className="p-5 bg-white overflow-y-auto text-gray-900 leading-relaxed">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Resume Editor</h2>

      {/* Basic Info */}
      <div className="mb-4">
        <label className="font-semibold block text-gray-900">Full Name</label>
        <input
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={resume.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <label className="font-semibold block mt-3 text-gray-900">Phone</label>
        <input
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={resume.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />

        <label className="font-semibold block mt-3 text-gray-900">Email</label>
        <input
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={resume.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <label className="font-semibold block mt-3 text-gray-900">LinkedIn</label>
        <input
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={resume.linkedin}
          onChange={(e) => updateField("linkedin", e.target.value)}
        />
      </div>

      {/* Summary */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Professional Summary
      </h3>
      {resume.summary.map((point: string, i: number) => (
        <textarea
          key={i}
          className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={2}
          value={point}
          onChange={(e) => {
            const newSummary = [...resume.summary];
            newSummary[i] = e.target.value;
            updateField("summary", newSummary);
          }}
        />
      ))}

      {/* Skills */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Technical Skills
      </h3>
      {resume.skills.map((skillCat: any, i: number) => (
        <div key={i} className="mb-3 border border-gray-300 p-2 rounded bg-gray-50">
          <input
            className="border border-gray-300 p-1 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={skillCat.category}
            onChange={(e) => {
              const newSkills = [...resume.skills];
              newSkills[i].category = e.target.value;
              updateField("skills", newSkills);
            }}
          />
          <textarea
            className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            value={skillCat.items.join(", ")}
            onChange={(e) => {
              const newSkills = [...resume.skills];
              newSkills[i].items = e.target.value.split(",").map((s) => s.trim());
              updateField("skills", newSkills);
            }}
          />
        </div>
      ))}
      <button
        className="text-blue-600 font-semibold mb-4 hover:underline"
        onClick={addSkillCategory}
      >
        + Add Skill Category
      </button>

      {/* Certifications */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Certifications
      </h3>
      {resume.certifications.map((cert: string, i: number) => (
        <input
          key={i}
          className="border border-gray-300 p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={cert}
          onChange={(e) => {
            const newCerts = [...resume.certifications];
            newCerts[i] = e.target.value;
            updateField("certifications", newCerts);
          }}
        />
      ))}
      <button
        className="text-blue-600 font-semibold mb-4 hover:underline"
        onClick={addCertification}
      >
        + Add Certification
      </button>

      {/* Education */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Education
      </h3>
      {resume.education.map((edu: any, i: number) => (
        <div key={i} className="mb-3">
          <input
            className="border border-gray-300 p-2 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => {
              const newEdu = [...resume.education];
              newEdu[i].degree = e.target.value;
              updateField("education", newEdu);
            }}
          />
          <input
            className="border border-gray-300 p-2 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="School"
            value={edu.school}
            onChange={(e) => {
              const newEdu = [...resume.education];
              newEdu[i].school = e.target.value;
              updateField("education", newEdu);
            }}
          />
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => {
              const newEdu = [...resume.education];
              newEdu[i].year = e.target.value;
              updateField("education", newEdu);
            }}
          />
        </div>
      ))}
      <button
        className="text-blue-600 font-semibold mb-4 hover:underline"
        onClick={addEducation}
      >
        + Add Education
      </button>

      {/* Experience */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Experience
      </h3>
      {resume.experience.map((exp: any, i: number) => (
        <div key={i} className="border border-gray-300 p-2 mb-4 rounded bg-gray-50">
          <input
            className="border border-gray-300 p-1 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Client"
            value={exp.client}
            onChange={(e) => {
              const newExp = [...resume.experience];
              newExp[i].client = e.target.value;
              updateField("experience", newExp);
            }}
          />
          <input
            className="border border-gray-300 p-1 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => {
              const newExp = [...resume.experience];
              newExp[i].company = e.target.value;
              updateField("experience", newExp);
            }}
          />
          <input
            className="border border-gray-300 p-1 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => {
              const newExp = [...resume.experience];
              newExp[i].role = e.target.value;
              updateField("experience", newExp);
            }}
          />
          <input
            className="border border-gray-300 p-1 w-full mb-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) => {
              const newExp = [...resume.experience];
              newExp[i].duration = e.target.value;
              updateField("experience", newExp);
            }}
          />
          <textarea
            className="border border-gray-300 p-1 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="Project Description"
            value={exp.projectDescription}
            onChange={(e) => {
              const newExp = [...resume.experience];
              newExp[i].projectDescription = e.target.value;
              updateField("experience", newExp);
            }}
          />
        </div>
      ))}
      <button
        className="text-blue-600 font-semibold hover:underline"
        onClick={addExperience}
      >
        + Add Experience
      </button>
    </div>
  );
}

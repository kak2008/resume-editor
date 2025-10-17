"use client";
import { useResume } from "./ResumeContext";
import { useState } from "react";
import { ReorderableList } from "./ReorderableList";

export default function EditorPanel() {
  const { resume, setResume } = useResume();

  const updateField = (field: string, value: any) => {
    setResume({ ...resume, [field]: value });
  };

  const addItem = (field: string, newItem: any) => {
    updateField(field, [...(resume[field] || []), newItem]);
  };

  const removeItem = (field: string, index: number) => {
    const updated = [...resume[field]];
    updated.splice(index, 1);
    updateField(field, updated);
  };

  const addSkillCategory = () => addItem("skills", { category: "New Category", items: [] });
  const addExperience = () =>
    addItem("experience", {
      client: "New Client",
      company: "",
      role: "",
      duration: "",
      projectDescription: "",
      responsibilities: [],
      environment: "",
    });
  const addCertification = () => addItem("certifications", "New Certification");
  const addEducation = () =>
    addItem("education", { degree: "", school: "", year: "" });
  const addSummaryPoint = () => addItem("summary", "New summary point...");
  const addPortfolioLink = () => addItem("portfolio", "https://");

  return (
    <div className="p-5 bg-white overflow-y-auto text-gray-900 leading-relaxed">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Resume Editor</h2>

      {/* BASIC INFO */}
      <div className="mb-4">
        <label className="font-semibold block text-gray-900">Full Name</label>
        <input
          className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={resume.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        {/* Phone */}
        <label className="font-semibold block mt-3 text-gray-900">Phone</label>
        {resume.phone?.map((phone: string, i: number) => (
          <div key={i} className="relative group mb-2">
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => {
                const newPhones = [...resume.phone];
                newPhones[i] = e.target.value;
                updateField("phone", newPhones);
              }}
            />
            <button
              onClick={() => removeItem("phone", i)}
              className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="text-blue-600 font-semibold mb-2 hover:underline"
          onClick={() => addItem("phone", "")}
        >
          + Add Phone
        </button>

        {/* Email */}
        <label className="font-semibold block mt-3 text-gray-900">Email</label>
        {resume.email?.map((email: string, i: number) => (
          <div key={i} className="relative group mb-2">
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => {
                const newEmails = [...resume.email];
                newEmails[i] = e.target.value;
                updateField("email", newEmails);
              }}
            />
            <button
              onClick={() => removeItem("email", i)}
              className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="text-blue-600 font-semibold mb-2 hover:underline"
          onClick={() => addItem("email", "")}
        >
          + Add Email
        </button>

        {/* LinkedIn */}
        <label className="font-semibold block mt-3 text-gray-900">LinkedIn</label>
        {resume.linkedin?.map((link: string, i: number) => (
          <div key={i} className="relative group mb-2">
            <input
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={link}
              onChange={(e) => {
                const newLinks = [...resume.linkedin];
                newLinks[i] = e.target.value;
                updateField("linkedin", newLinks);
              }}
            />
            <button
              onClick={() => removeItem("linkedin", i)}
              className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="text-blue-600 font-semibold mb-2 hover:underline"
          onClick={() => addItem("linkedin", "")}
        >
          + Add LinkedIn
        </button>

        {/* Portfolio */}
        <label className="font-semibold block mt-3 text-gray-900">Portfolio Links</label>
        {resume.portfolio?.map((p: string, i: number) => (
          <div key={i} className="relative group mb-2">
            <input
              placeholder="https://github.com/username or website"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={p}
              onChange={(e) => {
                const newP = [...resume.portfolio];
                newP[i] = e.target.value;
                updateField("portfolio", newP);
              }}
            />
            <button
              onClick={() => removeItem("portfolio", i)}
              className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="text-blue-600 font-semibold mb-4 hover:underline"
          onClick={addPortfolioLink}
        >
          + Add Portfolio Link
        </button>
      </div>

      {/* PROFESSIONAL SUMMARY */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Professional Summary
      </h3>
      <ReorderableList
        items={resume.summary}
        onReorder={(newSummary) => updateField("summary", newSummary)}
        renderItem={(point, i) => (
          <div key={i} className="relative group mb-2">
            <textarea
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={2}
              value={point}
              onChange={(e) => {
                const newSummary = [...resume.summary];
                newSummary[i] = e.target.value;
                updateField("summary", newSummary);
              }}
            />
            <button
              data-no-drag
              onClick={() => removeItem("summary", i)}
              className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        )}
      />
      <button
        onClick={addSummaryPoint}
        className="text-blue-600 font-semibold mb-4 hover:underline"
      >
        + Add Summary Point
      </button>

      {/* TECHNICAL SKILLS */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Technical Skills
      </h3>
      {resume.skills.map((skillCat: any, i: number) => (
        <div key={i} className="relative group mb-3 border border-gray-300 p-2 rounded bg-gray-50">
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
          <button
            onClick={() => removeItem("skills", i)}
            className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="text-blue-600 font-semibold mb-4 hover:underline"
        onClick={addSkillCategory}
      >
        + Add Skill Category
      </button>

      {/* CERTIFICATIONS */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Certifications
      </h3>
      {resume.certifications.map((cert: string, i: number) => (
        <div key={i} className="relative group mb-2">
          <input
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={cert}
            onChange={(e) => {
              const newCerts = [...resume.certifications];
              newCerts[i] = e.target.value;
              updateField("certifications", newCerts);
            }}
          />
          <button
            onClick={() => removeItem("certifications", i)}
            className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="text-blue-600 font-semibold mb-4 hover:underline"
        onClick={addCertification}
      >
        + Add Certification
      </button>

      {/* EDUCATION */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Education
      </h3>
      {resume.education.map((edu: any, i: number) => (
        <div key={i} className="relative group mb-3 border border-gray-300 p-2 rounded">
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
          <button
            onClick={() => removeItem("education", i)}
            className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="text-blue-600 font-semibold mb-4 hover:underline"
        onClick={addEducation}
      >
        + Add Education
      </button>

      {/* EXPERIENCE */}
      <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-900">
        Experience
      </h3>
      {resume.experience.map((exp: any, i: number) => (
        <div
          key={i}
          className="relative group border border-gray-300 p-2 mb-4 rounded bg-gray-50"
        >
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
          <button
            onClick={() => removeItem("experience", i)}
            className="absolute top-1 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
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

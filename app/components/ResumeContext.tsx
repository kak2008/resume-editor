"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  client: string;
  company: string;
  role: string;
  duration: string;
  projectDescription: string;
  responsibilities: string[];
  environment: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ResumeData {
  name: string;
  phone: string | string[];      // supports both string and array
  email: string | string[];
  linkedin: string | string[];
  portfolio?: string[];          // optional new field
  summary: string[];
  skills: SkillCategory[];
  certifications: string[];
  education: Education[];
  experience: Experience[];
}

const defaultData: ResumeData = {
  name: "Your Full Name",
  phone: ["123-456-7890"], // converted to array for consistency
  email: ["santhoshmage07@gmail.com"],
  linkedin: ["linkedin.com/in/santhoshkumar-magendran-5b794b170"],
  portfolio: [""], // new optional array field (starts empty)
  summary: [
    "Senior Data Engineer with 9+ years of experience building and optimizing enterprise-scale, cloud-native data platforms on Google Cloud Platform.",
    "Expert in designing AI-ready data ecosystems using BigQuery, Dataflow, Pub/Sub, Dataproc, and Vertex AI.",
    "Experienced in Lakehouse & Data Mesh architectures, Terraform automation, dbt transformations, and CI/CD pipelines.",
    "Proven record of improving performance, data quality, and governance for large-scale analytics and ML pipelines.",
  ],
  skills: [
    {
      category: "Cloud Platforms",
      items: ["GCP (BigQuery, Dataflow, Dataproc, Pub/Sub)", "AWS (Glue, EC2, S3, Redshift)"],
    },
    {
      category: "Big Data Services",
      items: ["Hadoop", "Spark", "Kafka", "Flink", "Hive", "HBase"],
    },
    {
      category: "Programming Languages",
      items: ["Python", "SQL", "Bash"],
    },
    {
      category: "Tools & BI",
      items: ["Terraform", "GitHub Actions", "Power BI", "Jenkins", "Cloud Build"],
    },
  ],
  certifications: [
    "Certified Google Cloud Professional Data Engineer",
    "Oracle Database SQL Certified Associate",
    "Google Cloud Data Engineering Specialization",
  ],
  education: [
    {
      degree: "B.Tech in Information and Technology",
      school: "RMK Engineering College, India",
      year: "2016",
    },
  ],
  experience: [
    {
      client: "British Telecom",
      company: "TCS",
      role: "Senior Data Engineer",
      duration: "Jul 2022 – Jun 2025",
      projectDescription:
        "Migrated critical datasets from Oracle systems to GCP. Designed scalable ELT pipelines ensuring cloud-based analytics and optimized workflows.",
      responsibilities: [
        "Built scalable data pipelines using Dataproc, Pub/Sub, and Dataflow.",
        "Automated infrastructure provisioning using Terraform.",
        "Integrated dbt with GitHub CI for automated testing and modular pipelines.",
        "Implemented OpenLineage and Great Expectations for observability and data quality.",
        "Deployed feature pipelines feeding into Vertex AI Feature Store for ML-driven analytics.",
      ],
      environment:
        "GCP (BigQuery, Dataflow, Dataproc), Python, SQL, dbt, Terraform, Great Expectations",
    },
  ],
};

const ResumeContext = createContext<any>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(defaultData);

  // ✅ Backward compatibility normalization
  if (typeof resume.phone === "string") resume.phone = [resume.phone];
  if (typeof resume.email === "string") resume.email = [resume.email];
  if (typeof resume.linkedin === "string") resume.linkedin = [resume.linkedin];
  if (!resume.portfolio) resume.portfolio = [""];

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);

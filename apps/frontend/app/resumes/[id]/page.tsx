// app/resumes/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getResume } from '@/app/services/resumeService'; // use this!

type Education = {
  institution: string;
  degree: string;
  year: string;
};

type Experience = {
  company: string;
  role: string;
  duration: string;
};

type Resume = {
  id: string;
  fullName: string | null;  
  email: string | null;
  phone: string | null;
  summary: string | null;
  experience: Experience[] | null;
  education: Education[] | null;
  skills: string[] | null;
  projects: string | null;
  linkedin: string | null;
  github: string | null;
};

export default async function ResumePage({ params }: { params: { id: string } }) {
  const {id} = await params;

  if (!id) return notFound();

  const resume: Resume | null = await getResume(id);
  if (!resume) return notFound();

  return (
    <div style={{
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "1rem",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
        {resume.fullName || 'Unnamed'}
      </h1>
      <p><strong>Email:</strong> {resume.email || 'N/A'}</p>
      <p><strong>Phone:</strong> {resume.phone || 'N/A'}</p>

      {resume.linkedin && (
        <p><strong>LinkedIn:</strong> <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">{resume.linkedin}</a></p>
      )}
      {resume.github && (
        <p><strong>GitHub:</strong> <a href={resume.github} target="_blank" rel="noopener noreferrer">{resume.github}</a></p>
      )}

      <hr style={{ margin: "1.5rem 0" }} />

      <h2>Summary</h2>
      <p>{resume.summary || 'No summary provided.'}</p>

      <h2>Education</h2>
      {resume.education?.length ? (
        resume.education.map((edu, index) => (
          <div key={index} style={{ marginBottom: "0.75rem" }}>
            <p><strong>Institution:</strong> {edu.institution}</p>
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>Year:</strong> {edu.year}</p>
          </div>
        ))
      ) : (
        <p>No education data available.</p>
      )}

      <h2>Experience</h2>
      {resume.experience?.length ? (
        resume.experience.map((exp, index) => (
          <div key={index} style={{ marginBottom: "0.75rem" }}>
            <p><strong>Company:</strong> {exp.company}</p>
            <p><strong>Role:</strong> {exp.role}</p>
            <p><strong>Duration:</strong> {exp.duration}</p>
          </div>
        ))
      ) : (
        <p>No experience data available.</p>
      )}

      <h2>Skills</h2>
      {resume.skills?.length ? (
        <ul>
          {resume.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p>No skills listed.</p>
      )}

      <h2>Projects</h2>
      {resume.projects ? (
        <pre style={{
          background: "#f4f4f4",
          padding: "1rem",
          borderRadius: "4px",
          whiteSpace: "pre-wrap"
        }}>
          {resume.projects}
        </pre>
      ) : (
        <p>No projects added.</p>
      )}
    </div>
  );
}

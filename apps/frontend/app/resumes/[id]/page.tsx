
import { notFound } from 'next/navigation';
import { getResume } from '@/app/services/resumeService';
import ResumeViewer from '@/app/components/ResumeViewer';
import '@fontsource/montserrat/700.css'; 
// import '@/styles/globals.css'; 



type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
};

type Project = {
  client: string;
  projectName: string;
  environment: string;
  duration: string;
  role: string;
  responsibilities: string[];
};

type Education = {
  degree: string;
  stream: string;
  institution: string;
  university: string;
  location: string;
  year: string;
  percentage: string;
};

type Resume = {
  id: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  summary: string | null;
  keySkills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  linkedin: string | null;
  github: string | null;
};
// const handleDownload = async () => {
//   const element = document.getElementById('resume-preview');
//   if (!element) return;

//   const html2pdf = (await import('html2pdf.js')).default;

//   const opt = {
//     margin: 0,
//     filename: 'resume.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2, scrollY: 0 },
//     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
//     pagebreak: { mode: ['css', 'legacy'] },
//   };

//   html2pdf().set(opt).from(element).save();
// };


export default async function ResumePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) return notFound();

  const resume: Resume | null = await getResume(id);
  if (!resume) return notFound();

  return (
    <div>
    <ResumeViewer resumeId={resume.id} />
  <div id = "resume-preview" className="resume-preview">
    <div style={{
      position: "relative",
      maxWidth: "900px",
      margin: "1rem auto",
      // padding: "2.5rem",
      fontFamily: "'Calibri', 'Segoe UI', sans-serif",
      fontSize:"11pt",
      backgroundColor: "#fff",
      color: "#000",
      lineHeight: "1.2",
      padding: "2.5rem 2.5rem 4rem 2.5rem",
      paddingRight: "4rem",
      // border: "1px solid #ccc",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    }}>
      {/* <img
    src="/ekip-logo.png"
    alt="EKIP-IT Logo"
    style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "150px",
      height: "auto",
    }}
  /> */}

      {/* Header */}
      {/* Resume Header */}
<div style={{ marginBottom: "0.1rem" }}>
  <h1   style={{fontFamily: "'Montserrat', sans-serif",fontSize: "1.4rem",fontWeight: 700,color: "#0077b6",marginBottom: "0.3rem",textTransform: "uppercase",}} >
    {resume.fullName || "Unnamed"}
  </h1>
  <p style={{ fontStyle: "italic", margin: 0, fontSize: "0.8rem", color: "#000",fontFamily: "Arial, sans-serif",  fontWeight: 700, }}>
    Frontend Developer
  </p>
  <hr style={{ border: "none", borderTop: "2px solid #999", margin: "1rem 0" }} />

  {/* <div style={{ marginTop: "0.3rem" }}>
    {resume.linkedin && (
      <a
        href={resume.linkedin}
        target="_blank"
        style={{ marginRight: "1rem", color: "#0077b6", fontSize: "0.95rem", textDecoration: "none" }}
      >
        LinkedIn
      </a>
    )}
    {resume.github && (
      <a
        href={resume.github}
        target="_blank"
        style={{ color: "#333", fontSize: "0.95rem", textDecoration: "none" }}
      >
        GitHub
      </a>
    )}
  </div> */}
</div>


      {/* Profile Summary */}
      <div className="page">
        <section>
        <h2 style={sectionHeading}>PROFILE SUMMARY</h2>
        <p>{resume.summary || "No summary provided."}</p>
        </section>
        <div className="page-break"></div>
      </div>
      

      {/* Key Skills */}
      <div className="page">
        <section>
  <h2 style={sectionHeading}>KEY SKILLS</h2>
  {resume.keySkills?.length ? (
    <ul style={{ paddingLeft: "1.5rem", listStyleType: 'disc' }}>
      {resume.keySkills.map((skill, index) => (
        <li key={index} style={{ marginBottom: "0.3rem" }}>{skill}</li>
      ))}
    </ul>
  ) : <p>No skills provided.</p>}
</section>
      </div>




       <div className="page-break"></div>

      {/* Experience */}
      <div className='page'>
        <section>
        <h2 style={sectionHeading}>PROFESSIONAL EXPERIENCE</h2>
        {resume.experience?.map((exp, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <strong>{exp.company} | {exp.role}</strong><br />
            <em>From {exp.startDate} to {exp.endDate} | {exp.location}</em>
          </div>
        ))}
      </section>
      </div>
      
      <div className="page-break"></div>

      {/* Projects */}
      <div className='page'>
        <section>
        <h2 style={sectionHeading}>KEY PROJECTS</h2>
        {resume.projects?.map((project, index) => (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <p><strong>Project#{index + 1}</strong></p>
            <p><strong>Client:</strong> {project.client}</p>
            <p><strong>Project:</strong> {project.projectName}</p>
            <p><strong>Environment:</strong> {project.environment}</p>
            <p><strong>Duration:</strong> {project.duration}</p>
            <p><strong>Role:</strong> {project.role}</p>
            <p><strong>Responsibilities:</strong></p>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem',listStyleType: 'disc' }}>
              {project.responsibilities.map((item, i) => (
                <li key={i} style={{ marginBottom: '0.3rem' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      </div>
      
       <div className="page-break"></div>

      {/* Education */}
      <div className='page'>
        <section>
        <h2 style={sectionHeading}>EDUCATION</h2>
        {resume.education?.map((edu, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <strong>{edu.degree} | {edu.stream}</strong><br />
            <em>{edu.institution} / {edu.university} | {edu.location} | {edu.year} | {edu.percentage}%</em>
          </div>
        ))}
      </section>
      </div>
      {/* <footer
  className="pdf-footer"
>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 2rem',
    borderTop: '1px solid #ccc',
    paddingTop: '0.5rem',
  }}>
    <span style={{ color: '#e74c3c' }}>EKIP IT Solutions</span>
    <span>www.ekipit.com</span>
    <span className="page-number">Page | 1</span>
  </div>
</footer> */}
       <div className="page-break"></div>
    </div>
  </div>
  </div>
  );
}

const sectionHeading = {
  fontSize: "1.2rem",
  fontWeight: 600,
  // borderBottom: "2px solid #ccc",
  paddingBottom: "0.2rem",
  marginTop: "0.3rem",
  marginBottom: "1rem",
  color: "#2c3e50"
};

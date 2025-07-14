import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createResume } from '../services/resumeService';

export default function ResumeForm() {
   const router = useRouter();
  const [form, setForm] = useState({
  name: '',
  email: '',
  phone: '',
  summary: '',
  education: [
  {
    degree: '',
    stream: '',
    institution: '',
    university: '',
    location: '',
    year: '',
    percentage: '',
  },
],

  experience: [
  {
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    location: '',
  },
],
  skills: [''],
  projects: [
    {
      client: '',
      projectName: '',
      environment: '',
      duration: '',
      role: '',
      responsibilities: [''],
    },
  ],
  linkedin: '',
  github: '',
});
const updateArrayField = <T extends {}>(
  array: T[],
  index: number,
  field: keyof T,
  value: any
): T[] => {
  const updated = [...array];
  updated[index] = { ...updated[index], [field]: value };
  return updated;
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await createResume({
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      summary: form.summary,
      education: form.education,
      experience: form.experience,
      skills: form.skills,
      projects: form.projects,
      linkedin: form.linkedin,
      github: form.github,
    });
    alert('Resume submitted successfully!');
    console.log(result);
    if (result && result.id) {
        router.push(`/resumes/${result.id}`);
      } else {
        alert('Resume created but no ID returned.');
      }
    
  } catch (error) {
    console.error(error);
    alert('Error submitting resume.');
  }
};



  return (
    
    <form onSubmit={handleSubmit} className="form">
      <h1>Resume-Form</h1>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <textarea name="summary" placeholder="Summary" value={form.summary} onChange={handleChange} required />
      
<h3>Education</h3>
{form.education.map((edu, index) => (
  <div key={index} className="inputGroup">
    <input
      placeholder="Degree (e.g., Bachelor of Engineering)"
      value={edu.degree}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'degree', e.target.value),
        })
      }
    />
    <input
      placeholder="Stream (e.g., Computer Science)"
      value={edu.stream}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'stream', e.target.value),
        })
      }
    />
    <input
      placeholder="Institution (e.g., Sasi Institute of Technology)"
      value={edu.institution}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'institution', e.target.value),
        })
      }
    />
    <input
      placeholder="University (e.g., JNTU)"
      value={edu.university}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'university', e.target.value),
        })
      }
    />
    <input
      placeholder="Location (e.g., Kakinada)"
      value={edu.location}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'location', e.target.value),
        })
      }
    />
    <input
      placeholder="Year of Passing (e.g., 2012)"
      value={edu.year}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'year', e.target.value),
        })
      }
    />
    <input
      placeholder="Percentage (e.g., 74.22)"
      value={edu.percentage}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'percentage', e.target.value),
        })
      }
    />
  </div>
))}

<button
  type="button"
  onClick={() =>
    setForm({
      ...form,
      education: [
        ...form.education,
        {
          degree: '',
          stream: '',
          institution: '',
          university: '',
          location: '',
          year: '',
          percentage: '',
        },
      ],
    })
  }
>
  Add Education
</button>

<h3>Professional Experience</h3>
{form.experience.map((exp, index) => (
  <div key={index} className="inputGroup">
    <input
      placeholder="Company"
      value={exp.company}
      onChange={(e) =>
        setForm({
          ...form,
          experience: updateArrayField(form.experience, index, 'company', e.target.value),
        })
      }
    />
    <input
      placeholder="Role"
      value={exp.role}
      onChange={(e) =>
        setForm({
          ...form,
          experience: updateArrayField(form.experience, index, 'role', e.target.value),
        })
      }
    />
    <input
      placeholder="Start Date (e.g. Feb 2023)"
      value={exp.startDate}
      onChange={(e) =>
        setForm({
          ...form,
          experience: updateArrayField(form.experience, index, 'startDate', e.target.value),
        })
      }
    />
    <input
      placeholder="End Date (e.g. Present or June 2025)"
      value={exp.endDate}
      onChange={(e) =>
        setForm({
          ...form,
          experience: updateArrayField(form.experience, index, 'endDate', e.target.value),
        })
      }
    />
    <input
      placeholder="Location"
      value={exp.location}
      onChange={(e) =>
        setForm({
          ...form,
          experience: updateArrayField(form.experience, index, 'location', e.target.value),
        })
      }
    />
  </div>
))}

<button
  type="button"
  onClick={() =>
    setForm({
      ...form,
      experience: [
        ...form.experience,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          location: '',
        },
      ],
    })
  }
>
  Add Experience
</button>

<h3>Skills</h3>
      {form.skills.map((skill, index) => (
        <input
          key={index}
          placeholder="Skill"
          value={skill}
          onChange={(e) => {
            const updatedSkills = [...form.skills];
            updatedSkills[index] = e.target.value;
            setForm({ ...form, skills: updatedSkills });
          }}
        />
      ))}
      <button type="button" onClick={() => setForm({ ...form, skills: [...form.skills, ''] })}>
        Add Skill
      </button><br></br>
      <h3>Projects</h3>
{form.projects.map((proj, index) => (
  <div key={index} className="projectGroup">
    <input
      placeholder="Client"
      value={proj.client}
      onChange={(e) =>
        setForm({
          ...form,
          projects: updateArrayField(form.projects, index, 'client', e.target.value),
        })
      }
    />
    <input
      placeholder="Project Name"
      value={proj.projectName}
      onChange={(e) =>
        setForm({
          ...form,
          projects: updateArrayField(form.projects, index, 'projectName', e.target.value),
        })
      }
    />
    <input
      placeholder="Environment (Technologies)"
      value={proj.environment}
      onChange={(e) =>
        setForm({
          ...form,
          projects: updateArrayField(form.projects, index, 'environment', e.target.value),
        })
      }
    />
    <input
      placeholder="Duration"
      value={proj.duration}
      onChange={(e) =>
        setForm({
          ...form,
          projects: updateArrayField(form.projects, index, 'duration', e.target.value),
        })
      }
    />
    <input
      placeholder="Role"
      value={proj.role}
      onChange={(e) =>
        setForm({
          ...form,
          projects: updateArrayField(form.projects, index, 'role', e.target.value),
        })
      }
    />
    <br></br>

    <label>Responsibilities:</label>
    {proj.responsibilities.map((res, resIndex) => (
      <textarea
        key={resIndex}
        placeholder={`Responsibility ${resIndex + 1}`}
        value={res}
        onChange={(e) => {
          const updatedProjects = [...form.projects];
          updatedProjects[index].responsibilities[resIndex] = e.target.value;
          setForm({ ...form, projects: updatedProjects });
        }}
      />
    ))}
    <button
      type="button"
      onClick={() => {
        const updatedProjects = [...form.projects];
        updatedProjects[index].responsibilities.push('');
        setForm({ ...form, projects: updatedProjects });
      }}
    >
      Add Responsibility
    </button>
  </div>
))}

<button
  type="button"
  onClick={() =>
    setForm({
      ...form,
      projects: [
        ...form.projects,
        {
          client: '',
          projectName: '',
          environment: '',
          duration: '',
          role: '',
          responsibilities: [''],
        },
      ],
    })
  }
>
  Add Project
</button>

<br></br>
<input
  name="linkedin"
  placeholder="LinkedIn URL"
  value={form.linkedin}
  onChange={handleChange}
/>
<input
  name="github"
  placeholder="GitHub URL"
  value={form.github}
  onChange={handleChange}
/>

      <button type="submit">Submit</button>
    </form>
    
  );
}

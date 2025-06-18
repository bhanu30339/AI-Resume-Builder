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
  education: [{ institution: '', degree: '', year: '' }],
  experience: [{ company: '', role: '', duration: '' }],
  skills: [''],
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
      placeholder="Institution"
      value={edu.institution}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'institution', e.target.value),
        })
      }
    />
    <input
      placeholder="Degree"
      value={edu.degree}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'degree', e.target.value),
        })
      }
    />
    <input
      placeholder="Year"
      value={edu.year}
      onChange={(e) =>
        setForm({
          ...form,
          education: updateArrayField(form.education, index, 'year', e.target.value),
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
        { institution: '', degree: '', year: '' },
      ],
    })
  }
>
  Add Education
</button>
<h3>Experience</h3>
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
      placeholder="Duration"
      value={exp.duration}
      onChange={(e) =>
        setForm({
          ...form,
          experience: updateArrayField(form.experience, index, 'duration', e.target.value),
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
        { company: '', role: '', duration: '' },
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

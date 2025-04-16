import React, { useState } from 'react';
import styles from '../../styles/ResumeForm.module.css';
import { createResume } from '../services/resumeService';

export default function ResumeForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createResume(form);
      alert('Resume submitted successfully!');
      console.log(result);
    } catch (error) {
      console.error(error);
      alert('Error submitting resume.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
      <textarea name="summary" placeholder="Summary" value={form.summary} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

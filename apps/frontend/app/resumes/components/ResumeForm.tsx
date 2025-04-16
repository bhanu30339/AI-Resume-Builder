'use client';

import { useState } from 'react';
import styles from '../../styles/ResumeForm.module.css';

import { createResume } from '@/app/services/resumeService';

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    summary: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await createResume({
        fullName: formData.fullname, // 👈 Fix is here!
        email: formData.email,
        phone: formData.phone,
        summary: formData.summary,
      });
      setSuccess(true);
      setFormData({ fullname: '', email: '', phone: '', summary: '' });
    } catch (err: any) {
      setError('Failed to submit resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <textarea
        name="summary"
        placeholder="Professional Summary"
        value={formData.summary}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Resume'}
      </button>

      {success && <p className={styles.success}>Resume submitted successfully!</p>}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export const createResume = async (resumeData: any) => {
  const response = await fetch('http://localhost:3000/resumes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resumeData),
  });

  if (!response.ok) {
    throw new Error('Failed to create resume');
  }

  return response.json();
};

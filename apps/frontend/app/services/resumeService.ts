// Create a new resume (POST)
export const createResume = async (resumeData: any) => {
  const response = await fetch('http://localhost:3001/resumes', {
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

// Get a resume by ID (GET)
export const getResume = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/resumes/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log response details
    console.log('Response status:', response.status);

    const text = await response.text(); // safer than .json() directly
    console.log('Response length:', text.length);

    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error('Failed to parse JSON:', err);
      throw new Error('Response is not valid JSON');
    }
  } catch (error) {
    console.error('Error fetching resume:', error);
    throw error;
  }
};

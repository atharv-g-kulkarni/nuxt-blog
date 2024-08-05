export const configurableFetch = async (url, options = {}) => {
    const defaultOptions = {
      method: 'GET', // Default method
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const finalOptions = { ...defaultOptions, ...options };
    try {
      debugger;
      const response = await fetch(url,finalOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
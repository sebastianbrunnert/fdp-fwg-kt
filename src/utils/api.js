// API configuration
export const API_BASE_URL = 'https://api.fdp-fwg-kt.de';

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};

// Helper function to format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

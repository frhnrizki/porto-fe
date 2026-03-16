export const useEmail = () => {
  const getEmailLink = (email: string = 'farhanrizki475@gmail.com') => {
    // Always use Gmail compose link for both desktop and mobile
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  };

  return {
    getEmailLink
  };
};

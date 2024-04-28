/**
 * Function to validate a phone number
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} - True if the phone number is valid, false otherwise
 */
export const validatePhoneNumber = phoneNumber => {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phoneNumber);
  };
  
  /**
   * Function to validate a username
   * @param {string} username - Username to validate
   * @returns {boolean} - True if the username is valid, false otherwise
   */
  export const validateUsername = username => {
    // Username must be between 3 and 20 characters long
    // and contain only letters, numbers, underscores, and hyphens
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
  };
  
  /**
   * Function to validate a URL
   * @param {string} url - URL to validate
   * @returns {boolean} - True if the URL is valid, false otherwise
   */
  export const validateURL = url => {
    // Simple regex to check if the URL format is valid
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };


  /**
 * Function to validate an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if the email address is valid, false otherwise
 */
export const validateEmail = email => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
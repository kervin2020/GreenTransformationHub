import { useState } from 'react';

/**
 * Custom hook for form validation and submission
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function that returns error messages
 * @param {Function} onSubmit - Function to call when form is submitted and valid
 * @returns {Object} Form state and handlers
 */
function useFormValidation(initialValues, validate, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setValues({
      ...values,
      [name]: value
    });
  };
  
  // Mark field as touched when blurred
  const handleBlur = (event) => {
    const { name } = event.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate on blur
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };
  
  // Handle form submission
  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    
    // Validate all fields
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Only submit if there are no errors
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        await onSubmit(values);
        setIsSuccess(true);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSuccess(false);
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
}

export default useFormValidation;
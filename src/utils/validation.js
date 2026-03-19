export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(String(phone));
};

export const validateContactForm = (values) => {
  const errors = {};

  const nameRegex = /^[A-Za-z\s]+$/;
  const mobileRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(values.name.trim())) {
    errors.name = "Name should contain only letters and spaces";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Enter valid email address";
  }

  if (!values.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileRegex.test(values.mobile.trim())) {
    errors.mobile = "Mobile must be exactly 10 digits";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required";
  }

  return errors;
};

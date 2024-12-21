'use client'
import React, { useState } from 'react';
import '../user/page.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  type: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    type: '',
    country: '',
    state: '',
    city: '',
    pinCode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  const validateStep = (): ValidationErrors => {
    const validationErrors: ValidationErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        validationErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        validationErrors.lastName = 'Last name is required';
      }
      if (!formData.email) {
        validationErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        validationErrors.email = 'Please enter a valid email address';
      }
      if (!formData.mobile) {
        validationErrors.mobile = 'Mobile number is required';
      } else if (!validateMobile(formData.mobile)) {
        validationErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    } else if (step === 2) {
      if (!formData.type) {
        validationErrors.type = 'Type is required';
      }
      if (!formData.pinCode) {
        validationErrors.pinCode = 'PIN code is required';
      }
      if (!formData.addressLine1) {
        validationErrors.addressLine1 = 'Address Line 1 is required';
      }
    } else if (step === 3) {
      if (!formData.country) {
        validationErrors.country = 'Country is required';
      }
      if (!formData.state) {
        validationErrors.state = 'State is required';
      }
      if (!formData.city) {
        validationErrors.city = 'City is required';
      }
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Registration successful!');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        type: '',
        country: '',
        state: '',
        city: '',
        pinCode: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
      });
      setStep(1);
    } catch {
      alert('Registration failed. Please try again.');
    }
  };

  const nextStep = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="container">
      <div className="registerCard">
        <div className="white">
          <div className="strap"></div>
        </div>
        <div className="registration">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="step">
                <h3>User Info</h3>
                <div>
                  <h4>First Name</h4>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div>
                  <h4>Last Name</h4>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>

                <div>
                  <h4>Email</h4>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                  <h4>Mobile No.</h4>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobile && <span className="error">{errors.mobile}</span>}
                </div>

                <div className="buttons">
                  <button type="button" onClick={nextStep}>Next</button>
                  <button type="button"><a href='/login'>Cancel</a></button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step">
                <h3>Address Info (Step 1)</h3>
                <div>
                  <h4>Type</h4>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.type && <span className="error">{errors.type}</span>}
                </div>

                <div>
                  <h4>PIN Code</h4>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="Enter PIN code"
                  />
                  {errors.pinCode && <span className="error">{errors.pinCode}</span>}
                </div>

                <div>
                  <h4>Address Line 1</h4>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="Enter address line 1"
                  />
                  {errors.addressLine1 && <span className="error">{errors.addressLine1}</span>}
                </div>

                <div>
                  <h4>Address Line 2</h4>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Enter address line 2 (optional)"
                  />
                </div>

                <div>
                  <h4>Landmark</h4>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Enter landmark (optional)"
                  />
                </div>

                <div className="buttons">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button" onClick={nextStep}>Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step">
                <h3>Address Info (Step 2)</h3>
                <div>
                  <h4>Country</h4>
                  <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                  {errors.country && <span className="error">{errors.country}</span>}
                </div>

                <div>
                  <h4>State</h4>
                  <select name="state" value={formData.state} onChange={handleChange}>
                    <option value="">Select State</option>
                    <option value="State1">State 1</option>
                    <option value="State2">State 2</option>
                  </select>
                  {errors.state && <span className="error">{errors.state}</span>}
                </div>

                <div>
                  <h4>City</h4>
                  <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="City1">City 1</option>
                    <option value="City2">City 2</option>
                  </select>
                  {errors.city && <span className="error">{errors.city}</span>}
                </div>

                <div className="buttons">
                  <button type="button" onClick={prevStep}>Back</button>
                  <button type="button"><a href='/register/partner'>Next</a></button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

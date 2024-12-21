'use client';
import React, { useState } from 'react';
import '../partner/page.css';

interface PartnerFormData {
  // Partner Info
  name: string;
  description: string;
  email: string;
  mobile: string;
  // Address Info - Step 2
  type: string;
  country: string;
  state: string;
  city: string;
  // Address Details - Step 3
  pinCode: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Partner = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PartnerFormData>({
    name: '',
    description: '',
    email: '',
    mobile: '',
    type: '',
    country: '',
    state: '',
    city: '',
    pinCode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: ''
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
      if (!formData.name.trim()) {
        validationErrors.name = 'Name is required';
      }
      if (!formData.description.trim()) {
        validationErrors.description = 'Description is required';
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
      if (!formData.country) {
        validationErrors.country = 'Country is required';
      }
      if (!formData.state) {
        validationErrors.state = 'State is required';
      }
      if (!formData.city) {
        validationErrors.city = 'City is required';
      }
    } else if (step === 3) {
      if (!formData.pinCode) {
        validationErrors.pinCode = 'PIN code is required';
      }
      if (!formData.addressLine1) {
        validationErrors.addressLine1 = 'Address Line 1 is required';
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

    // Here you would typically make an API call to submit the form
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Partner registration successful!');
      // Reset form
      setFormData({
        name: '',
        description: '',
        email: '',
        mobile: '',
        type: '',
        country: '',
        state: '',
        city: '',
        pinCode: '',
        addressLine1: '',
        addressLine2: '',
        landmark: ''
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

  return (
    <div className="container">
      <div className="partnerCard">
        <div className="white">
          <div className="strap"></div>
        </div>
        <div className="registration">
          <h2>Partner</h2>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="step">
                <h3>Partner Info</h3>
                <div>
                  <h4>Name</h4>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter partner name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div>
                  <h4>Description</h4>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                  {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div>
                  <h4>Email</h4>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div>
                  <h4>Mobile no.</h4>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                  />
                  {errors.mobile && <span className="error">{errors.mobile}</span>}
                </div>

                <div className="buttons">
                  <button type="button" onClick={nextStep}>Next</button>
                  <button type="button">Cancel</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step">
                <h3>Address Info</h3>
                <div>
                  <h4>Type</h4>
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Select Type</option>
                    <option value="Business">Business</option>
                    <option value="Individual">Individual</option>
                  </select>
                  {errors.type && <span className="error">{errors.type}</span>}
                </div>

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
                  <button type="button" onClick={nextStep}>Next</button>
                  <button type="button">Cancel</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step">
                <h3>Address Details</h3>
                <div>
                  <h4>Pin Code</h4>
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
                    placeholder="Enter landmark"
                  />
                </div>

                <div className="buttons">
                  <button type="button"><a href='/register/details'>Next</a></button>
                  <button type="button"><a href='/login'>Cancel</a></button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Partner;

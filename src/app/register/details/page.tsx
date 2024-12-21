'use client';
import React, { useState } from 'react';
import '../details/page.css';

interface FormData {
  // Role
  roleName: string;
  roleDescription: string;
  
  // Department
  departmentName: string;
  departmentDescription: string;
  departmentHead: string;
  
  // Group
  groupName: string;
  groupDescription: string;
  groupOwner: string;
  
  // Service
  serviceName: string;
  serviceDescription: string;
}

const Detail = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    roleName: '',
    roleDescription: '',
    departmentName: '',
    departmentDescription: '',
    departmentHead: '',
    groupName: '',
    groupDescription: '',
    groupOwner: '',
    serviceName: '',
    serviceDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear the specific error when the field is modified
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Role
        if (!formData.roleName.trim()) {
          newErrors.roleName = 'Role name is required';
        }
        if (!formData.roleDescription.trim()) {
          newErrors.roleDescription = 'Role description is required';
        }
        break;

      case 2: // Department
        if (!formData.departmentName.trim()) {
          newErrors.departmentName = 'Department name is required';
        }
        if (!formData.departmentDescription.trim()) {
          newErrors.departmentDescription = 'Department description is required';
        }
        if (!formData.departmentHead) {
          newErrors.departmentHead = 'Department head is required';
        }
        break;

      case 3: // Group
        if (!formData.groupName.trim()) {
          newErrors.groupName = 'Group name is required';
        }
        if (!formData.groupDescription.trim()) {
          newErrors.groupDescription = 'Group description is required';
        }
        if (!formData.groupOwner) {
          newErrors.groupOwner = 'Group owner is required';
        }
        break;

      case 4: // Service
        if (!formData.serviceName.trim()) {
          newErrors.serviceName = 'Service name is required';
        }
        if (!formData.serviceDescription.trim()) {
          newErrors.serviceDescription = 'Service description is required';
        }
        break;
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateStep();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        // API call would go here
        alert('All information submitted successfully!');
        // Reset form
        setFormData({
          roleName: '',
          roleDescription: '',
          departmentName: '',
          departmentDescription: '',
          departmentHead: '',
          groupName: '',
          groupDescription: '',
          groupOwner: '',
          serviceName: '',
          serviceDescription: ''
        });
        setStep(1);
      } catch {
        alert('Submission failed. Please try again.');
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h3>Role Info</h3>
            <div>
              <h4>Name</h4>
              <input
                type="text"
                name="roleName"
                value={formData.roleName}
                onChange={handleChange}
                placeholder="Enter role name"
              />
              {errors.roleName && <span className="error">{errors.roleName}</span>}
            </div>

            <div>
              <h4>Description</h4>
              <input
                type="text"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleChange}
                placeholder="Enter role description"
              />
              {errors.roleDescription && <span className="error">{errors.roleDescription}</span>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step">
            <h3>Department Info</h3>
            <div>
              <h4>Name</h4>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                placeholder="Enter department name"
              />
              {errors.departmentName && <span className="error">{errors.departmentName}</span>}
            </div>

            <div>
              <h4>Description</h4>
              <input
                type="text"
                name="departmentDescription"
                value={formData.departmentDescription}
                onChange={handleChange}
                placeholder="Enter department description"
              />
              {errors.departmentDescription && <span className="error">{errors.departmentDescription}</span>}
            </div>

            <div>
              <h4>Department Head</h4>
              <select
                name="departmentHead"
                value={formData.departmentHead}
                onChange={handleChange}
              >
                <option value="">Select Department Head</option>
                <option value="head1">Department Head 1</option>
                <option value="head2">Department Head 2</option>
              </select>
              {errors.departmentHead && <span className="error">{errors.departmentHead}</span>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step">
            <h3>Group Info</h3>
            <div>
              <h4>Name</h4>
              <input
                type="text"
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
                placeholder="Enter group name"
              />
              {errors.groupName && <span className="error">{errors.groupName}</span>}
            </div>

            <div>
              <h4>Description</h4>
              <input
                type="text"
                name="groupDescription"
                value={formData.groupDescription}
                onChange={handleChange}
                placeholder="Enter group description"
              />
              {errors.groupDescription && <span className="error">{errors.groupDescription}</span>}
            </div>

            <div>
              <h4>Group Owner</h4>
              <select
                name="groupOwner"
                value={formData.groupOwner}
                onChange={handleChange}
              >
                <option value="">Select Group Owner</option>
                <option value="owner1">Owner 1</option>
                <option value="owner2">Owner 2</option>
              </select>
              {errors.groupOwner && <span className="error">{errors.groupOwner}</span>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step">
            <h3>Service Info</h3>
            <div>
              <h4>Name</h4>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                placeholder="Enter service name"
              />
              {errors.serviceName && <span className="error">{errors.serviceName}</span>}
            </div>

            <div>
              <h4>Description</h4>
              <input
                type="text"
                name="serviceDescription"
                value={formData.serviceDescription}
                onChange={handleChange}
                placeholder="Enter service description"
              />
              {errors.serviceDescription && <span className="error">{errors.serviceDescription}</span>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Role";
      case 2:
        return "Department";
      case 3:
        return "Group";
      case 4:
        return "Services";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="partnerCard">
        <div className="white">
          <div className="strap"></div>
        </div>
        <div className="registration">
          <h2>{getStepTitle()}</h2>
          <form onSubmit={handleSubmit}>
            {getStepContent()}
            <div className="buttons">
              {step > 1 && (
                <button type="button" onClick={prevStep}>Back</button>
              )}
              <button type="submit">
                {step === 4 ? 'Submit' : 'Next'}
              </button>
              <button type="button">
                <a href="/login">Cancel</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Detail;
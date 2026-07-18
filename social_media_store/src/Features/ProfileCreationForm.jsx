import React, { useState } from 'react';
import "./ProfileCreationForm.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Features/AuthForm'; 

export default function SocialProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    bio: '',
    website: '',
    isPrivate: false,
    avatar: null
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(formData.username)) {
      newErrors.username = '3-15 characters. Letters, numbers, underscores only';
    }

    if (formData.bio.length > 160) {
      newErrors.bio = 'Bio must be under 160 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
        submissionData.append(key, formData[key]);
      });
      console.log('Social Profile Data ready for API:', formData);

      navigate('/profile');
    }
  };

  return (
    <div className="social-container">
      <h2 className="social-title">Set Up Your Profile</h2>
      <form onSubmit={handleSubmit} className="social-form">
        
        {/* Avatar Upload */}
        <div className="avatar-section">
          <div className="avatar-preview-box">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Preview" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">Add Photo</div>
            )}
          </div>
          <label htmlFor="avatar" className="avatar-upload-btn">Change Profile Photo</label>
          <input 
            type="file" 
            id="avatar" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="hidden-file-input"
          />
        </div>

        {/* Display Name */}
        <div className="social-group">
          <label htmlFor="displayName" className="social-label">Display Name</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            placeholder="e.g. Jane Doe"
            value={formData.displayName}
            onChange={handleChange}
            className={`social-input ${errors.displayName ? 'social-input-error' : ''}`}
          />
          {errors.displayName && <span className="social-error-text">{errors.displayName}</span>}
        </div>

        {/* Unique Username */}
        <div className="social-group">
          <label htmlFor="username" className="social-label">Username</label>
          <div className="username-input-wrapper">
            <span className="username-prefix">@</span>
            {/* Removed stray "className" text */}
            <input
              type="text"
              id="username"
              name="username"
              placeholder="janedoe"
              value={formData.username}
              onChange={handleChange}
              className={`social-input username-field ${errors.username ? 'social-input-error' : ''}`}
            />
          </div>
          {errors.username && <span className="social-error-text">{errors.username}</span>}
        </div>

        {/* Bio Character Counter */}
        <div className="social-group">
          <div className="label-row">
            <label htmlFor="bio" className="social-label">Bio</label>
            <span className={`char-counter ${formData.bio.length > 160 ? 'char-limit' : ''}`}>
              {formData.bio.length}/160
            </span>
          </div>
          <textarea
            id="bio"
            name="bio"
            placeholder="Tell the community about yourself..."
            value={formData.bio}
            onChange={handleChange}
            className={`social-textarea ${errors.bio ? 'social-input-error' : ''}`}
            rows="3"
          />
          {errors.bio && <span className="social-error-text">{errors.bio}</span>}
        </div>

        {/* Links */}
        <div className="social-group">
          <label htmlFor="website" className="social-label">Website Links</label>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChange={handleChange}
            className="social-input"
          />
        </div>

        {/* Account Visibility Switch */}
        <div className="toggle-group">
          <div className="toggle-info">
            <span className="toggle-title">Private Account</span>
            <span className="toggle-desc">Only approved followers can see your posts.</span>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button type="submit" className="social-submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
}

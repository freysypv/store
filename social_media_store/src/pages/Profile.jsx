import './profile.css'; 
import React, { useState } from 'react'; 

export default function Profile() { 
  const [isEditing, setEditing] = useState(false); 
  const [activeTab, setActiveTab] = useState('overview'); 
  
  // FIX: Changed avatarUrl from '' to null to prevent the empty string DOM warning
  const [user, setUser] = useState({ 
    id: 'usr_9482f3a', 
    name: 'Alex Chen', 
    title: 'Staff Developer', 
    avatarUrl: null, 
    joinedDate: '2024-03-15', 
    isActive: true, 
    email: 'alex.chen@company.com', 
    location: 'San Francisco, CA', 
    bio: 'Building responsive web interfaces with React.', 
  }); 

  const [editedUser, setEditedUser] = useState({ ...user }); 

  const handleInputChanges = (e) => { 
    const { name, value } = e.target; 
    setEditedUser(prev => ({ ...prev, [name]: value })); 
  }; 

  const handleSave = () => { 
    setUser({ ...editedUser }); 
    setEditing(false); 
  }; 

  const handleCancel = () => { 
    setEditedUser({ ...user }); 
    setEditing(false); 
  }; 

  // Fallback UI assets 
  const defaultAvatar = "https://unsplash.com"; 
  const defaultBanner = "https://unsplash.com"; 

  return ( 
    <div className='profile-container'> 
      <header className='profile-cover-Photo'> 
        <img className="cover-img" src={defaultBanner} alt="Profile cover banner background" /> 
      </header> 
      
      <section className="profile-header"> 
        <img className="profile-avatar" src={user.avatarUrl || defaultAvatar} alt={`Profile headshot of ${user.name}`} /> 
        <div className="profile-header-text"> 
          <h1>{user.name}</h1> 
          <p className="profile-subtitle">{user.title}</p> 
        </div> 
      </section> 

      <nav className="profile-tabs" aria-label="Profile sections"> 
        <button 
          type="button" 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} 
          onClick={() => setActiveTab('overview')} 
          aria-selected={activeTab === 'overview'} 
          role="tab" 
        > 
          Overview 
        </button> 
      </nav> 

      <main className="profile-content-panel"> 
        {!isEditing ? ( 
          <article className="profile-view-mode"> 
            <div className="view-group"> 
              <span className="view-label">Email:</span> 
              <span className="view-value">{user.email || 'Not provided'}</span> 
            </div> 
            <div className="view-group"> 
              <span className="view-label">Location:</span> 
              <span className="view-value">{user.location || 'Not provided'}</span> 
            </div> 
            <div className="view-group"> 
              <span className="view-label">Bio:</span> 
              <p className="view-bio">{user.bio || 'No bio written yet'}</p> 
            </div> 
            <button type="button" className="btn-edit" onClick={() => setEditing(true)}> 
              Edit Profile </button> 
          </article> 
        ) : ( 
          <form className="profile-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}> 
            <div className="form-field"> 
              <label htmlFor="form-name" className="profile-label">Full Name</label> 
              <input id="form-name" type="text" name="name" value={editedUser.name} onChange={handleInputChanges} className="profile-input" required /> 
            </div> 
            <div className="form-field"> 
              <label htmlFor="form-title" className="profile-label">Job Title</label> 
              <input id="form-title" type="text" name="title" value={editedUser.title} onChange={handleInputChanges} className="profile-input" /> 
            </div> 
            <div className="form-field"> 
              <label htmlFor="form-email" className="profile-label">Email Address</label> 
              <input id="form-email" type="email" name="email" value={editedUser.email} onChange={handleInputChanges} className="profile-input" required /> 
            </div> 
            <div className="form-field"> 
              <label htmlFor="form-location" className="profile-label">Location</label> 
              <input id="form-location" type="text" name="location" value={editedUser.location} onChange={handleInputChanges} className="profile-input" /> 
            </div> 
            <div className="form-field"> 
              <label htmlFor="form-bio" className="profile-label">Short Bio</label> 
              <textarea id="form-bio" name="bio" value={editedUser.bio} onChange={handleInputChanges} className="profile-input profile-textarea" rows="4" /> 
            </div> 
            <div className="profile-btn-group"> 
              <button type="submit" className="btn-submit">Save Changes</button> 
              <button type="button" onClick={handleCancel} className="btn-cancel">Cancel</button> 
            </div> 
          </form> 
        )} 
      </main> 
    </div> 
  ); 
}

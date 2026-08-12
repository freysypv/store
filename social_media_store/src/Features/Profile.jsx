import "./profile.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../services/profileService";
import postService from "../services/postService";
import FollowersFriends from "./FollowersFriends";

const DEFAULT_AVATAR = "https://picsum.photos/id/64/300/300";
const DEFAULT_BANNER = "https://picsum.photos/id/29/1200/400";

const compressImage = (file, maxWidth = 500, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function Profile() {
  const [isEditing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [photoError, setPhotoError] = useState("");
  const [isUploadingPhoto, setUploadingPhoto] = useState(false);
  const navigate = useNavigate();

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [user, setUser] = useState(profileService.getProfile());
  const [editedUser, setEditedUser] = useState({
    name: "",
    title: "",
    email: "",
    location: "",
    bio: "",
    ...profileService.getProfile(),
  });
  const [posts, setPosts] = useState(() => {
    try {
      return postService.getPostsByUser(user.id) || [];
    } catch (err) {
      console.error("Failed to load posts:", err);
      return [];
    }
  });

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const saved = profileService.saveProfile(editedUser);
    setUser(saved);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setEditing(false);
  };

  const handlePhotoChange = async (e, field, maxWidth) => {
    const file = e.target.files[0];
    setPhotoError("");
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      setPhotoError("Image is too large. Please select a photo under 1.5MB.");
      return;
    }

    if (isUploadingPhoto) return; // guard against duplicate submissions
    setUploadingPhoto(true);

    try {
      const compressed = await compressImage(file, maxWidth);
      const updated = profileService.updateProfile({ [field]: compressed });
      setUser(updated);
      setEditedUser((prev) => ({ ...prev, [field]: compressed }));
    } catch (err) {
      console.error("Failed to update photo:", err);
      setPhotoError(err.message || "Failed to save photo. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-cover-photo">
        <img
          className="cover-img"
          src={user.coverUrl || DEFAULT_BANNER}
          alt="Profile cover banner background"
        />
        <button
          type="button"
          className="btn-change-cover"
          onClick={() => coverInputRef.current?.click()}
          disabled={isUploadingPhoto}
        >
          Change Cover Photo
        </button>
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handlePhotoChange(e, "coverUrl", 1200)}
          style={{ display: "none" }}
        />
      </header>

      <section className="profile-header">
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src={user.avatarUrl || DEFAULT_AVATAR}
            alt={`Profile headshot of ${user.name}`}
          />
          <button
            type="button"
            className="btn-change-avatar"
            onClick={() => avatarInputRef.current?.click()}
            disabled={isUploadingPhoto}
          >
            Change Photo
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handlePhotoChange(e, "avatarUrl", 500)}
            style={{ display: "none" }}
          />
        </div>
        <div className="profile-header-text">
          <h1>{user.name}</h1>
          <p className="profile-subtitle">{user.title}</p>
        </div>
      </section>

      {photoError && <p className="profile-photo-error">{photoError}</p>}

      <nav className="profile-tabs" aria-label="Profile sections">
        <button
          type="button"
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
          aria-selected={activeTab === "overview"}
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
              <span className="view-value">{user.email || "Not provided"}</span>
            </div>
            <div className="view-group">
              <span className="view-label">Location:</span>
              <span className="view-value">
                {user.location || "Not provided"}
              </span>
            </div>
            <div className="view-group">
              <span className="view-label">Bio:</span>
              <p className="view-bio">{user.bio || "No bio written yet"}</p>
            </div>

            <div className="profile-btn-group">
              <button
                type="button"
                className="btn-edit"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>

              <button
                to
                type="button"
                className="btn-change-password"
                onClick={() => navigate("/ChangePassword")}
              >
                Change Password
              </button>
            </div>

            <div className="profile-create-profile">
              <button
                type="button"
                onClick={() => navigate("/ProfileCreationForm")}
                className="btn-submit"
              >
                Create Profile
              </button>
            </div>
            <section className="profile-followers-section">
              <FollowersFriends />
            </section>

            <section className="profile-posts-section">
              <h2 className="posts-heading">Posts</h2>
              {posts.length === 0 ? (
                <p className="no-posts">No posts yet.</p>
              ) : (
                <div className="posts-grid">
                  {posts.map((post) => (
                    <div key={post.id} className="post-card">
                      {post.image && (
                        <img src={post.image} alt="" className="post-image" />
                      )}
                      <p className="post-content">{post.text}</p>
                      <span className="post-date">{post.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </article>
        ) : (
          <form
            className="profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="form-field">
              <label htmlFor="form-name" className="profile-label">
                Full Name
              </label>
              <input
                id="form-name"
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChanges}
                className="profile-input"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="form-title" className="profile-label">
                Job Title
              </label>
              <input
                id="form-title"
                type="text"
                name="title"
                value={editedUser.title}
                onChange={handleInputChanges}
                className="profile-input"
              />
            </div>
            <div className="form-field">
              <label htmlFor="form-email" className="profile-label">
                Email Address
              </label>
              <input
                id="form-email"
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChanges}
                className="profile-input"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="form-location" className="profile-label">
                Location
              </label>
              <input
                id="form-location"
                type="text"
                name="location"
                value={editedUser.location}
                onChange={handleInputChanges}
                className="profile-input"
              />
            </div>
            <div className="form-field">
              <label htmlFor="form-bio" className="profile-label">
                Short Bio
              </label>
              <textarea
                id="form-bio"
                name="bio"
                value={editedUser.bio}
                onChange={handleInputChanges}
                className="profile-input profile-textarea"
                rows="4"
              />
            </div>
            <div className="profile-btn-group">
              <button type="submit" className="btn-submit">
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

// import { useState } from "react"; 
import "./CreatePost.css"; 
import PostActions from "./PostActions"; 
import PostCard from "./PostCard"; 
import React, { useState } from 'react';
import './CreatePost.css';

export default function CreatePost({ onPostCreated }) {
  const [postText, setPostText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  // Convert uploaded image file to a base64 string for localStorage compatibility
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError('');

    if (file) {
      // Validate image size (localStorage caps out around 5MB total)
      if (file.size > 1.5 * 1024 * 1024) {
        setError('Image is too large. Please select a photo under 1.5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

   
    if (!postText.trim() && !imagePreview) {
      setError('Please add some text or an image to your post.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      text: postText.trim(),
      image: imagePreview, 
      timestamp: new Date().toLocaleString(),
      likes: 0
    };

    try {
      // 1. Get existing database array or initiate a clean one
      const existingPosts = JSON.parse(localStorage.getItem('social_media_posts')) || [];
      
      // 2. Add new item to front of the stack
      const updatedPosts = [newPost, ...existingPosts];
      
      // 3. Attempt writing back to browser cache engine
      localStorage.setItem('social_media_posts', JSON.stringify(updatedPosts));
      
      // 4. Notify parent feed container to refresh UI instantly
      if (onPostCreated) {
        onPostCreated(updatedPosts);
      }

      // Reset form controls completely
      setPostText('');
      setImagePreview(null);
    } catch (err) {
      console.error('Storage error:', err);
      setError('Failed to save post. Your local storage might be full.');
    }
  };

  const removeSelectedImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="create-post-card">
      <form onSubmit={handleSubmit}>
        <textarea
          className="create-post-card__textarea"
          placeholder="Share your thoughts or upload a picture..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          rows="3"
        />


        {imagePreview && (
          <div className="create-post-card__preview-wrapper">
            <img src={imagePreview} alt="Upload preview" className="create-post-card__preview-img" />
            <button 
              type="button" 
              className="create-post-card__remove-img-btn" 
              onClick={removeSelectedImage}
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error Notification Alert */}
        {error && <p className="create-post-card__error-msg">{error}</p>}

        <div className="create-post-card__actions">
          <label htmlFor="file-upload" className="create-post-card__upload-label">
            🖼️ Add Photo
            <input 
              id="file-upload"
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="create-post-card__file-input"
            />
          </label>
          
          <button type="submit" className="create-post-card__submit-btn">
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}


// export default CreatePost;

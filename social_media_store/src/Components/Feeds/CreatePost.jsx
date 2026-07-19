import React, { useState } from 'react';
import "./CreatePost.css";
import * as PostService from "../../services/postService";
import { useAuth } from "../../Features/AuthForm";

export default function CreatePost({ onPostCreated }) {
  const { user } = useAuth();
  const [postText, setPostText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setError('');
    if (file) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!postText.trim() && !imagePreview) {
      setError('Please add some text or an image to your post.');
      return;
    }

    const newPostObj = {
      user: user?.name || "Anonymous Guest",
      username: user?.email || "@guest",
      avatar: "https://picsum.photos/40",
      date: "Just now",
      text: postText.trim(),
      image: imagePreview,
      likes: 0,
      comments: []
    };

    try {
      const createdPost = await PostService.createPost(newPostObj);

      if (onPostCreated) {
        onPostCreated(createdPost);
      }

      setPostText('');
      setImagePreview(null);
    } catch (err) {
      console.error('Failed to save post:', err);
      setError('Failed to save post. Please try again.');
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
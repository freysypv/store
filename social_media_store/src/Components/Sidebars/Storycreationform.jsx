import React, { useState } from 'react';
import './Storycreationform.css';

function CreateStoryForm({ onStorySubmit }) {
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [link, setLink] = useState('');

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setMedia(null);
    setPreviewUrl('');
    setCaption('');
    setLink('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!media) return;

    // Send data upward to your backend/state manager
    onStorySubmit({
      media,
      caption,
      productLink: link,
      timestamp: new Date().toISOString()
    });

    handleClear();
  };

  return (
    <div className="story-form-card">
      <h2 className="form-title">Create New Story</h2>

      <form onSubmit={handleSubmit} className="story-form">
        {/* Media Upload Area */}
        <div className="upload-zone">
          {previewUrl ? (
            <div className="preview-container">
              <img src={previewUrl} alt="Story preview" className="media-preview" />
              {caption && <span className="preview-caption-overlay">{caption}</span>}
              <button type="button" onClick={handleClear} className="remove-preview-btn">✕</button>
            </div>
          ) : (
            <label className="upload-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="upload-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
              <span>Upload Image / Video</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                className="file-input-hidden"
                required
              />
            </label>
          )}
        </div>

        {/* Inputs Panel */}
        <div className="input-fields-group">
          <div className="input-block">
            <label className="field-label">Overlay Caption Text</label>
            <input
              type="text"
              placeholder="Type something to show on your story..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={80}
              className="text-field"
            />
          </div>

          <div className="input-block">
            <label className="field-label">Swipe-Up Product Link (Store Feature)</label>
            <input
              type="url"
              placeholder="https://yourstore.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="text-field"
            />
          </div>

          <button type="submit" disabled={!media} className="publish-story-btn">
            Publish Story
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateStoryForm;
import React, { useState } from 'react';
import "./Home.css";
import Feed from "../Components/Feeds/Feed";
import StoriesCarousel from "../Components/Sidebars/Stories";
import Storycreationform from "../Components/Sidebars/Storycreationform";
import CreatePost from "../Components/Feeds/CreatePost";
import { useAuth } from "../Features/AuthForm";

function Home() {
  const { user } = useAuth();
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);

  const handleAddNewStory = (story) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newStory = {
        ...story,
        media: reader.result,
        id: Date.now(),
        username: user?.name || "Anonymous",
      };
      const existing = JSON.parse(localStorage.getItem('stories') || '[]');
      const updated = [...existing, newStory];
      localStorage.setItem('stories', JSON.stringify(updated));
      setShowStoryForm(false);
      window.location.reload();
    };
    reader.readAsDataURL(story.media);
  };

  return (
    <div className="home-container">
      <h1 className="title">Welcome Home!</h1>

      <button className="custom-app-btn" onClick={() => setShowStoryForm(true)}>
        + Add Story
      </button>

      <button className="custom-app-btn" onClick={() => setShowPostForm(true)}>
        + Create Post
      </button>

      {showStoryForm && (
        <div className="modal-overlay" onClick={() => setShowStoryForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowStoryForm(false)}>✕</button>
            <Storycreationform onStorySubmit={handleAddNewStory} />
          </div>
        </div>
      )}

      {showPostForm && (
        <div className="modal-overlay" onClick={() => setShowPostForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowPostForm(false)}>✕</button>
            <CreatePost
              onPostCreated={() => {
                setShowPostForm(false);
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}

      <StoriesCarousel />
      <Feed />
    </div>
  );
}

export default Home;
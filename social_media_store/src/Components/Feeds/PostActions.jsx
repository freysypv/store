// src/components/feeds/PostActions.jsx
import { useState } from 'react';

function PostActions({ initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post-actions">
      
      <button 
        className={`like-button ${isLiked ? 'liked' : ''}`} 
        onClick={handleLike}
        aria-label={isLiked ? "Unlike post" : "Like post"}
        aria-pressed={isLiked}
      >
        <svg 
          viewBox="0 0 24 24" 
          width="20" 
          height="20" 
          fill={isLiked ? "red" : "none"}
          stroke={isLiked ? "red" : "currentColor"} 
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span className="like-count">{likes}</span>
      </button>
   
    </div>
  );
}


 export default PostActions;

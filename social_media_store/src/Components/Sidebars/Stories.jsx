import React, { useRef, useState, useEffect } from 'react';
import './Stories.css';

function StoriesCarousel() {
  const scrollRef = useRef(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('stories');
    if (saved) {
      try {
        setStories(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing storage items:", e);
      }
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.75
        : scrollLeft + clientWidth * 0.75;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="stories-wrapper">
      {/* Left Navigation Arrow */}
      <button onClick={() => scroll('left')} className="nav-btn left-btn" aria-label="Scroll left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div ref={scrollRef} className="carousel-container">
        {stories.length === 0 ? (
          <div className="no-stories">No updates active</div>
        ) : (
          stories.map((story, index) => (
            <div key={story.id || index} className="story-item">
              <div className={`ring-outer ${story.hasUnseen ? 'unseen' : 'seen'}`}>
                <div className="ring-inner">
                  <img
                    src={story.media || 'https://placehold.co/150'}
                    alt="story preview"
                    className="story-avatar"
                  />
                </div>
              </div>
              <span className="story-username">{story.caption || 'Update'}</span>
            </div>
          ))
        )}
      </div>

      {/* Right Navigation Arrow */}
      <button onClick={() => scroll('right')} className="nav-btn right-btn" aria-label="Scroll right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

export default StoriesCarousel;
import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Stories.css';

const AUTO_ADVANCE_MS = 5000;

function StoryViewer({ stories, startIndex, onClose, onMarkSeen }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(null);
  const totalPausedTimeRef = useRef(0);

  const currentStory = stories[currentIndex];

  // Keep a ref in sync so the animation loop can read the latest
  // pause state without needing to restart on every pause toggle.
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= stories.length) {
        onClose();
        return prev;
      }
      return prev + 1;
    });
  }, [stories.length, onClose]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  }, []);

  useEffect(() => {
    if (currentStory) onMarkSeen(currentStory.id);
  }, [currentStory, onMarkSeen]);

  // Progress and pause animation loop — only restarts when the story changes,
  // so toggling pause freezes the bar in place instead of resetting it.
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = null;
    pauseTimeRef.current = null;
    totalPausedTimeRef.current = 0;

    const tick = (timestamp) => {
      if (pausedRef.current) {
        if (!pauseTimeRef.current) {
          pauseTimeRef.current = timestamp;
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (pauseTimeRef.current) {
        totalPausedTimeRef.current += (timestamp - pauseTimeRef.current);
        pauseTimeRef.current = null;
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current - totalPausedTimeRef.current;
      const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        goNext();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentIndex, goNext]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  if (!currentStory) return null;

  const handleTapZone = (e, direction) => {
    e.stopPropagation();
    if (direction === 'left') goPrev();
    else goNext();
  };

  return (
    <div className="story-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="story-modal-content"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="story-progress-row">
          {stories.map((s, i) => (
            <div key={s.id || i} className="story-progress-track">
              <div
                className="story-progress-fill"
                style={{
                  width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
                }}
              />
            </div>
          ))}
        </div>

        <div className="story-modal-header">
          <span className="story-modal-username">{currentStory.caption || 'Update'}</span>
          <button className="story-modal-close" onClick={onClose} aria-label="Close story">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <img src={currentStory.media || 'https://placehold.co/600x800'} alt={currentStory.caption || 'story'} className="story-modal-media" />

        <div className="story-tap-zone story-tap-left" onClick={(e) => handleTapZone(e, 'left')} />
        <div className="story-tap-zone story-tap-right" onClick={(e) => handleTapZone(e, 'right')} />

        {currentIndex > 0 && (
          <button className="story-modal-nav story-modal-nav-left" onClick={(e) => handleTapZone(e, 'left')} aria-label="Previous story">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        {currentIndex < stories.length - 1 && (
          <button className="story-modal-nav story-modal-nav-right" onClick={(e) => handleTapZone(e, 'right')} aria-label="Next story">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function StoriesCarousel() {
  const scrollRef = useRef(null);
  const [stories, setStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // null = closed

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

  const openStory = (index) => setActiveIndex(index);
  const closeStory = () => setActiveIndex(null);

  const markSeen = useCallback((storyId) => {
    setStories((prev) => {
      const updated = prev.map((s) =>
        s.id === storyId ? { ...s, hasUnseen: false } : s
      );
      localStorage.setItem('stories', JSON.stringify(updated));
      return updated;
    });
  }, []);

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
            <div
              key={story.id || index}
              className="story-item"
              onClick={() => openStory(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openStory(index);
              }}
            >
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

      {/* Right Navigation Arrow  */}
       <button onClick={() => scroll('right')} className="nav-btn right-btn" aria-label="Scroll right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="nav-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/*stories viewer */}
      {activeIndex !== null && (
        <StoryViewer
          stories={stories}
          startIndex={activeIndex}
          onClose={closeStory}
          onMarkSeen={markSeen}
        />
      )}
    </div>
  );
}

export default StoriesCarousel;
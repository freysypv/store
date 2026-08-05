import { useState, useEffect } from 'react';
import './RightSidebar.css';
import React from 'react';
import FollowersFriends from '../../Features/FollowersFriends';
import postService from '../../services/postService'; // adjust path to wherever postService.js actually lives

const TRENDING_COUNT = 5;
const TRUNCATE_LENGTH = 60;

function truncate(text, length) {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
}

function RightSidebar() {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const posts = postService.loadPosts();
    const sortedByLikes = [...posts]
      .sort((a, b) => (b.likes || 0) - (a.likes || 0))
      .slice(0, TRENDING_COUNT);
    setTrendingPosts(sortedByLikes);
  }, []);

  return (
    <div className="container">
      <div className="sidebar-body">
        <div className="search-bar">
          <input type="text" placeholder="search bar" aria-label="Search" />
        </div>

        <h1 className="rightside-title">Trending</h1>
        <div className="main-rightside">
          <h2>Dashboard</h2>

          <aside className="sticky-sidebar">
            {/* Trending posts, pulled from real post data */}
            <div className="card">
              <h3 className="section-title">For You</h3>
              <div className="trends-list">
                {trendingPosts.length === 0 && (
                  <div className="trend-item">
                    <div className="trend-meta">No posts yet</div>
                  </div>
                )}
                {trendingPosts.map((post) => (
                  <div key={post.id} className="trend-item">
                    <div className="trend-meta">{post.username} · Trending</div>
                    <div className="trend-avatar">
                      {post.avatarUrl && <img src={post.avatarUrl} alt={post.username} />}
                    </div>
                    <div className="image-preview">
                      {post.image && <img src={post.image} alt="Post preview" />}
                    </div>
                    <div className="trend-name">{truncate(post.text, TRUNCATE_LENGTH)}</div>
                    <div className="trend-meta">{post.likes ?? 0} likes</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <FollowersFriends />
            </div>
          </aside>

          {/* Sticky Advertisement Banner */}
          <div className="ad-banner">
            <span className="ad-tag">Sponsored</span>
            <img
              src="https://plus.unsplash.com/premium_photo-1785079918966-6fd3cf59c82e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Advertisement"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;

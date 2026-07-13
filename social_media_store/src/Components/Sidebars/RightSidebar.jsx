import { useState } from 'react';
import './RightSidebar.css';
import Trending from "../Feeds/Trending.jsx";
import React from 'react';


function RightSidebar() {
  // Use React state to track if the sidebar is open or closed
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
  };

  const trends = [
    { id: 1, category: 'Outdoors · Trending', topic: '#WebDevelopment', posts: '45.2K Posts' },
    { id: 2, category: 'Design · Trending', topic: 'UI Layout Design', posts: '12.8K Posts' }
  ];

  const recommendations = [
    { id: 1, name: 'DesignBot', handle: '@Pedro_picapiedra', avatarUrl: '' },
    { id: 2, name: 'CodeCraft', handle: '@Jose_Veras', avatarUrl: '' }
  ];

  return (
    <div className="container right-sidebar">
      
      <div className='search-bar'>
        <input type='text' placeholder='search bar' aria-label='Search' />
      </div>
  
      <h1 className='rightside-title'>Trending</h1>
      <div className='main-rightside'>
        <h2>Dashboard</h2>

       <aside className="right-sidebar sticky-sidebar">
        
      {/* One: Trend post */}
      <div className="card">
        <h3 className="section-title">For You</h3>
        <div className="trends-list">
          {trends.map((trend) => (
            <div key={trend.id} className="trend-item">
              <div className="trend-meta">{trend.category}</div>
              <div className="trend-name">{trend.topic}</div>
              <div className="trend-meta">{trend.posts}</div>
            </div>
          ))}
        </div>
      </div> 

      {/* Two: Follow Recommendations */}
      <div className="card">
        <h3 className="section-title">People you may know</h3>
        <div className="follow-list">
          {recommendations.map((user) => (
            <div key={user.id} className="follow-row">
              <div className="user-info">
                <div className="avatar">
                  {user.avatarUrl && <img src={user.avatarUrl} alt={user.name} />}
                </div>
                <div>
                  <div className="trend-name">{user.name}</div>
                  <div className="trend-name">{user.handle}</div>
                </div>
              </div>
              <button className="btn-follow" type="button">Follow</button>
            </div>
          ))}
        </div>
      </div>
    </aside> 

      </div>


      {/* Sticky Advertisement Banner */}
      <div className=" ad-banner">
        <span className="ad-tag">Sponsored</span>
        {/* <img src="" /> */}
      </div>
    

    </div>


  );
}

export default RightSidebar;

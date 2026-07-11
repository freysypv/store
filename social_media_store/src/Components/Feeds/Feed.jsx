import React from 'react';
import CreatePost from './CreatePost'; 
import PostCard from './PostCard'; 

function Feed() { 
  
  const mockPosts = [
    {
      id: 1,
      user: "Alex Johnson",
      username: "@alex_dev",
      content: "Just finished refactoring my React application structure! Feels amazing to get those file paths running cleanly. 🚀 #webdev #react",
      likes: 24,
      comments: 5
    },
    {
      id: 2,
      user: "Sarah Smith",
      username: "@sarah_design",
      content: "Working on a new 3-column dashboard layout. Grid or Flexbox, what is your preference for sidebar columns? 🤔",
      likes: 42,
      comments: 12
    },

    {
    id: 3,
    username: "alex_dev",
    avatar: "https://unsplash.com",
    date: "2 hours ago",
    text: "Just pushed my new React project to production! The new React 19 compiler makes optimization so much easier. Anyone else trying it out?",
    likes: 42,
    comments: [
      "Awesome work! Looks incredibly smooth.",
      "Congrats! Did you run into any dependency issues?",
      "Loving React 19 so far as well."
    ]
  },
  {
    id: 4,
    username: "design_sarah",
    avatar: "https://unsplash.com",
    date: "5 hours ago",
    text: "Spent the morning playing with modern CSS Grid layouts. It's amazing how much layout complexity we can handle now with just a few lines of clean code.",
    likes: 128,
    comments: [
      "Grid completely changed how I build interfaces.",
      "Mind sharing a snippet of what you built?"
    ]
  },
  {
    id: 5,
    username: "coder_cat",
    avatar: "https://unsplash.com",
    date: "Yesterday",
    text: "That moment when your code runs perfectly on the very first try... and immediately makes you suspicious that something is horribly wrong hidden underneath.",
    likes: 256,
    comments: [
      "Every single time! 😂",
      "Check the console logs immediately!",
      "It's a trap, don't close the IDE yet."
    ]
  }

  ];

  return ( 
    <div className="feed-container"> 
      <CreatePost /> 
      <div className="feed-posts"> 
        {mockPosts.map((post) => ( 
          <PostCard key={post.id} post={post} /> 
        ))} 
      </div> 
    </div> 
  ); 
} 

export default Feed;


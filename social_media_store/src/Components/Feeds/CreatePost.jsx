import { useState } from "react"; 
import "./CreatePost.css"; 
import PostActions from "./PostActions"; 
import PostCard from "./PostCard"; 

function CreatePost() { 
  const [text, setText] = useState(''); 

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New post text content:", text);
    setText(''); // Reset text input area after submission
  };

  const PostData = {
    date: new Date().toLocaleDateString() // Displays current calendar date string
  };

  return ( 
    <div className="create-post-card"> 

      <form className='form' onSubmit={handleSubmit}> 
        <h2>New Post</h2> 
        <img src="" alt="User Avatar" className="user-avatar" /> 
        <textarea 
          className="textarea"
          placeholder="What's on your mind?" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
        /> 
        
        <p className="post-date">{PostData.date}</p> 
        
        <button  className="post-button " type="submit" disabled={!text.trim()}>Post</button> 
      </form> 
    </div> 
  ); 
} 

export default CreatePost;

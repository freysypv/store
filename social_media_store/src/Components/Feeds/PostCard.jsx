import './PostCard.css'; 
import PostActions from './PostActions'; 

function PostCard({ PostData }) {
  const avatarUrl = PostData?.avatar;
  return (
    <div className="post-card"> 
      <div className="post-header"> 
        <img src={avatarUrl} loading="lazy" alt="User Avatar" className="user-avatar" /> 
        <h3>{PostData?.username || "user.name"}</h3> 
        <span className="post-date">{PostData?.date}</span> 
      </div> 
      
      <div className="post-content"> 
        <p>{PostData?.text}</p> 
        <PostActions initialLikes={PostData?.likes || 0} /> 
        
        <div className="post-comments"> 
          <p>Comments</p> 
          {PostData?.comments?.map((comment, index) => ( 
            <p key={index}>{comment}</p> 
          ))} 
        </div> 
      </div> 
    </div> 
  ); 
} 

export default PostCard;

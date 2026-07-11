import "./Home.css"; 
import Feed from "../Components/Feeds/Feed"; 
import CreatePost from "../Components/Feeds/CreatePost";

function Home() { 
  return ( 
    <div className="home-container"> 
      <h1 className='title'>Welcome Home!</h1> 
    
      <Feed /> 

    </div> 
  ); 
} 

export default Home;


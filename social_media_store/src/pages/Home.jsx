import "./Home.css"; 
import Feed from "../Components/Feeds/Feed"; 
import CreatePost from "../Components/Feeds/CreatePost"; 
import React, { useState, useRef, useEffect } from 'react'; 

function Home() { 
  const [items, setItems] = useState([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const loaderRef = useRef(null); 

  // Simulated API function that mimics pagination delays 
  const fetchMoreData = async (currentPage) => { 
    setLoading(true); 
    // Simulate a network latency of 800ms 
    await new Promise((resolve) => setTimeout(resolve, 800)); 
    
    // Generate mock item cards for demonstration 
    const newItems = Array.from({ length: 10 }, (_, i) => ({ 
      id: (currentPage - 1) * 10 + i + 1, 
      title: `Dynamic Card Item #${(currentPage - 1) * 10 + i + 1}`, 
      body: "This card was loaded dynamically using infinite scroll.", 
    })); 
    
    // Crucial: Append new entries to the previous state array 
    setItems((prev) => [...prev, ...newItems]); 
    setLoading(false); 
  }; 

  // Effect 1: Fetches more items whenever the "page" state changes 
  useEffect(() => { 
    fetchMoreData(page); 
  }, [page]); 

  // Effect 2: Observes the bottom element to trigger page increment 
  useEffect(() => { 
    const observer = new IntersectionObserver( 
      (entries) => { 
        // If the loader element enters the screen and we aren't already fetching 
        if (entries[0].isIntersecting && !loading) { 
          setPage((prevPage) => prevPage + 1); 
        } 
      }, 
      { threshold: 1.0 } // Element must be fully visible to trigger 
    ); 

    if (loaderRef.current) { 
      observer.observe(loaderRef.current); 
    } 

    // Cleanup observer upon component unmounting 
    return () => { 
      if (loaderRef.current) { 
        observer.unobserve(loaderRef.current); 
      } 
    }; 
  }, [loading]); // Dependencies ensure observer evaluates current loading state 

  return ( 
    <div className="home-container"> 
      <h1 className='title'>Welcome Home!</h1> 
      
      {/* Component to create a post */}
      <CreatePost />
      
      {/* Component showing standard feed */}
      <Feed /> 

      <div className="container"> 
        <header className="header"> 
          <h1>Infinite Scrolling </h1> 
          <p>Keep scrolling down to load more content automatically.</p> 
        </header> 

        <main className="grid"> 
          {items.map((item) => ( 
            <div key={item.id} className="card"> 
              <span className="card-badge">ID: {item.id}</span> 
              <h3>{item.title}</h3> 
              <p>{item.body}</p> 
            </div> 
          ))} 
        </main> 
      </div>

     
      <div ref={loaderRef} className="loader-container"> 
        {loading && (
          <div className="spinner">
           
          </div>
        )} 
        <p>{loading ? "Fetching new cards..." : "Scroll down to trigger load"}</p> 
      </div> 
    </div> 
  ); 
} 

export default Home;



import React, { useState, useEffect, useRef, useCallback } from 'react'; 
import CreatePost from './CreatePost'; 
import PostCard from './PostCard'; 
// FIX: Imported everything as PostService to match your component calls
import * as PostService from "../../services/postService"; 

function Feed() { 
  const handleAddNewPost = async (postText) => {
    // Fallback values if no active user session exists in cache state
    const newPostObj = { 
      user: user?.name || "Anonymous Guest", 
      username: user?.username || "@guest", 
      avatar: user?.avatar || "https://picsum.photos", 
      date: "Just now", 
      text: postText, 
      likes: 0, 
      comments: [] 
    }; 

    try { 
      const savedPost = await PostService.createPost(newPostObj); 
      setItems((prev) => [savedPost, ...prev]); 
    } catch (error) { 
      console.error("Failed to save post:", error); 
      setItems((prev) => [{ ...newPostObj, id: Date.now().toString() }, ...prev]); 
    } 
  };

  // 1. Initial State synchronized with localStorage 
  const [items, setItems] = useState([]); 

  const [page, setPage] = useState(() => { 
    const savedPage = localStorage.getItem('infinite_scroll_page'); 
    return savedPage ? JSON.parse(savedPage) : 1; 
  }); 

  const [loading, setLoading] = useState(false); 
  const loaderRef = useRef(null); 

  // Single tracking lock ref to cleanly eliminate duplicate network requests 
  const isFetching = useRef(false); 

  // Synchronize items and current page value to localStorage whenever they change 
  useEffect(() => { 
    localStorage.setItem('infinite_scroll_items', JSON.stringify(items)); 
    localStorage.setItem('infinite_scroll_page', JSON.stringify(page)); 
  }, [items, page]); 
  

  // Integrated real backend API function wrapped in useCallback 
  const fetchMoreData = useCallback(async (currentPage) => { 
    if (isFetching.current) return; 
    isFetching.current = true; 
    setLoading(true); 
    
    try { 
      // Call your imported backend service functions safely 
      const response = await PostService.getPosts(currentPage, 10); 
      
      // Handle array structure based on how your backend returns data 
      const newItems = Array.isArray(response) ? response : response.data || []; 
      
      setItems((prev) => { 
        const currentIds = new Set(prev.map(item => item.id || item._id));
          // Filter out any incoming item that already exists in the feed state
        const uniquelyFiltered = newItems.filter(item => !currentIds.has(item.id || item._id)); 
        return [...prev, ...uniquelyFiltered]; 
      });

    } catch (error) { 
      console.error("Error fetching data from PostService:", error); 
    } finally { 
      isFetching.current = false; 
      setLoading(false); 
    } 
  }, []); 

  // Effect 1: Fetches more items whenever the "page" state changes 
  useEffect(() => { 
    const expectedItemCount = page * 10; 
    if (items.length < expectedItemCount) { 
      fetchMoreData(page); 
    } 
  }, [page, items.length, fetchMoreData]); 

  // Effect 2: Observes the bottom element to trigger page increment 
  useEffect(() => { 
    const currentLoader = loaderRef.current; 
    if (!currentLoader) return; 

    const observer = new IntersectionObserver( 
      (entries) => { 
        if (entries[0].isIntersecting && !isFetching.current) { 
          setPage((prevPage) => prevPage + 1); 
        } 
      }, 
      { threshold: 0.1, rootMargin: "100px" } 
    ); 

    observer.observe(currentLoader); 

    return () => { 
      if (currentLoader) { 
        observer.unobserve(currentLoader); 
      } 
    }; 
  }, [loading]); 

  // Handle user creating a new post manually 
  // const handleAddNewPost = async (postText) => { 
  //   const newPostObj = { 
  //     user: "Current User", 
  //     username: "@current_user", 
  //     avatar: "https://picsum.photos", 
  //     date: "Just now", 
  //     text: postText, 
  //     likes: 0, 
  //     comments: [] 
  //   }; 

  //   try { 
      
  //     const savedPost = await PostService.createPost(newPostObj); 
      
  //     setItems((prev) => [savedPost, ...prev]); 
  //   } catch (error) { 
  //     console.error("Failed to save post to the server:", error);  
  //     setItems((prev) => [{ ...newPostObj, id: Date.now() }, ...prev]); 
  //   } 
  // }; 

  const loadInitalItems = async () => {
     // load initial data
    const savedItems = localStorage.getItem('infinite_scroll_items');  
    let initialItems = []; 
    if(savedItems) {
      initialItems = JSON.parse(savedItems);      
    }
 
    if(initialItems.length < 1) {
      initialItems = await PostService.getPosts();
    }

    setItems(initialItems);
    console.log(initialItems)
  }

  useEffect(() => { 
   loadInitalItems();
  }, []);

  return ( 
    <div className="feed-container"> 
      <CreatePost onSavePost={handleAddNewPost} /> 
      <div className="posts-list"> 
        {items.map((post, index) => ( 
        <PostCard key={`${post.id || post._id}-${index}`} PostData={post} /> ))} 
      </div> 
      <div ref={loaderRef} className="feed-loader" style={{ padding: '20px', textAlign: 'center', minHeight: '50px' }}> 
        {loading && <div className="spinner">Fetching timeline updates...</div>} 
      </div> 
    </div> 
  ); 
} 

export default Feed;

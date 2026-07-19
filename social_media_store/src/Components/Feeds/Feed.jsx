import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostCard from './PostCard';
import * as PostService from "../../services/postService";

function Feed() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const isFetching = useRef(false);

  const fetchMoreData = useCallback(async (currentPage) => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const newItems = await PostService.getPosts(currentPage, 10);

      setItems((prev) => {
        const currentIds = new Set(prev.map(item => item.id));
        const uniquelyFiltered = newItems.filter(item => !currentIds.has(item.id));
        return [...prev, ...uniquelyFiltered];
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoreData(1);
  }, [fetchMoreData]);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching.current) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchMoreData(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(currentLoader);
    return () => observer.unobserve(currentLoader);
  }, [fetchMoreData]);

  return (
    <div className="feed-container">
      <div className="posts-list">
        {items.length === 0 && !loading ? (
          <div className="no-posts">No posts yet — be the first to share something!</div>
        ) : (
          items.map((post, index) => (
            <PostCard key={post.id || index} PostData={post} />
          ))
        )}
      </div>
      <div ref={loaderRef} className="feed-loader" style={{ padding: '20px', textAlign: 'center', minHeight: '50px' }}>
        {loading && <div className="spinner">Fetching timeline updates...</div>}
      </div>
    </div>
  );
}

export default Feed;
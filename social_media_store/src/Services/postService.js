const STORAGE_KEY = 'social_feed_posts';

const seedPosts = [
  {
    id: "1719820800000",
    user: "GraphQL Expert",
    username: "@graphql_dev2",
    avatar: "https://picsum.photos/300",
    date: "7/1/2026",
    text: "Just completed the migration of our legacy microservices over to a unified GraphQL gateway. The latency drops are absolutely beautiful!",
    image: "https://picsum.photos/300",
    timestamp: "7/1/2026, 10:14:22 AM",
    likes: 42,
    comments: []
  },
  {
    id: "1719907200000",
    user: "UI Designer",
    username: "@css_vibe",
    avatar: "https://picsum.photos/300",
    date: "7/2/2026",
    text: "Can we all agree that naming CSS variables is the absolute hardest part of frontend engineering? 'primary-dark-v2-final-fixed' is my current vibe.",
    image: null,
    timestamp: "7/2/2026, 2:30:15 PM",
    likes: 128,
    comments: []
  },
  {
    id: "1719993600000",
    user: "Early Bird Coder",
    username: "@coffee_code",
    avatar: "https://picsum.photos/300",
    date: "7/3/2026",
    text: "Early morning debugging sessions hit differently when the coffee is strong and the test suite finally passes on the first try.",
    image: "https://picsum.photos/300",
    timestamp: "7/3/2026, 6:45:01 AM",
    likes: 56,
    comments: []
  },
  {
    id: "1721095800000",
    user: "Nature Stroller",
    username: "@green_steps",
    avatar: "https://picsum.photos/300",
    date: "7/15/2026",
    text: "Clear paths and fresh air. Taking a screen break to clear my head always fixes my creative blocks.",
    image: "https://picsum.photos",
    timestamp: "7/15/2026, 11:30:00 PM",
    likes: 19,
    comments: []
  },
  {
    id: "1721095900000",
    user: "Boot Enthusiast",
    username: "@leather_sole",
    avatar: "https://picsum.photos/300",
    date: "7/15/2026",
    text: "The patina on these brown chukkas is starting to settle in nicely after a mile-long stroll.",
    image: "https://picsum.photos",
    timestamp: "7/15/2026, 11:31:40 PM",
    likes: 54,
    comments: []
  },
  {
    id: "1721096000000",
    user: "Daily Walk Tracker",
    username: "@step_counter",
    avatar: "https://picsum.photos/300",
    date: "7/15/2026",
    text: "Crushing the daily movement goal before the day ends. Keep moving, everyone!",
    image: "https://picsum.photos",
    timestamp: "7/15/2026, 11:33:15 PM",
    likes: 31,
    comments: []
  }
];

function loadPosts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Error parsing saved posts, falling back to seed data:", error);
    }
  }
  // First-ever load: seed localStorage with the mock posts
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedPosts));
  return seedPosts;
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export const getPosts = async (page = 1, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const posts = loadPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return posts.slice(startIndex, endIndex);
};

export const createPost = async (newPostData) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const posts = loadPosts();

  const createdPost = {
    ...newPostData,
    id: Date.now().toString(),
    timestamp: new Date().toLocaleString(),
  };

  const updated = [createdPost, ...posts];
  savePosts(updated);

  return createdPost;
};
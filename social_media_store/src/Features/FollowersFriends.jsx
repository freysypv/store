import { createContext, useContext, useEffect, useState, useCallback, useMemo, memo } from 'react';
import "./FollowersFriends.jsx"
const STORAGE_KEY = 'social_follow_data';

const MOCK_USERS = [
  { id: 'u1', name: 'Maya Rodriguez', handle: '@maya' },
  { id: 'u2', name: 'Jordan Lee', handle: '@jordanlee' },
  { id: 'u3', name: 'Sam Patel', handle: '@sampatel' },
  { id: 'u4', name: 'Riley Chen', handle: '@rileyc' },
  { id: 'u5', name: 'Alex Kim', handle: '@alexkim' },
];

const SEED_FOLLOWERS = ['u1', 'u3', 'u5'];

const DEFAULT_STATE = {
  following: {},
  followers: SEED_FOLLOWERS.reduce((acc, id) => ({ ...acc, [id]: true }), {}),
};

const FollowContext = createContext(null);

function safeStorageGet(key) {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full — state still works in-memory
    // for the current session, it just won't persist.
  }
}

export function loadInitialState() {
  return safeStorageGet(STORAGE_KEY) ?? DEFAULT_STATE;
}

export function FollowProvider({ children }) {
  const [data, setData] = useState(loadInitialState);

  useEffect(() => {
    safeStorageSet(STORAGE_KEY, data);
  }, [data]);

  const toggleFollow = useCallback((userId) => {
    setData((prev) => {
      const isFollowing = !!prev.following[userId];
      const next = { ...prev.following };
      if (isFollowing) delete next[userId];
      else next[userId] = true;
      return { ...prev, following: next };
    });
  }, []);

  const isFollowing = useCallback((id) => !!data.following[id], [data.following]);
  const isFriend = useCallback(
    (id) => !!data.following[id] && !!data.followers[id],
    [data.following, data.followers]
  );

  const followingIds = useMemo(() => Object.keys(data.following), [data.following]);
  const followerIds = useMemo(() => Object.keys(data.followers), [data.followers]);
  const friendIds = useMemo(
    () => followingIds.filter((id) => data.followers[id]),
    [followingIds, data.followers]
  );

  const value = useMemo(
    () => ({ toggleFollow, isFollowing, isFriend, followingIds, followerIds, friendIds }),
    [toggleFollow, isFollowing, isFriend, followingIds, followerIds, friendIds]
  );

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollow() {
  const ctx = useContext(FollowContext);
  if (!ctx) throw new Error('useFollow must be used within a FollowProvider');
  return ctx;
}

function getInitials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export const Avatar = memo(function Avatar({ name }) {
  return <div className="avatar">{getInitials(name)}</div>;
});

export const FollowButton = memo(function FollowButton({ userId, className }) {
  const { isFollowing, toggleFollow, isFriend } = useFollow();
  const following = isFollowing(userId);
  const friend = isFriend(userId);

  const handleClick = useCallback(() => toggleFollow(userId), [toggleFollow, userId]);

  return (
    <button
      onClick={handleClick}
      className={`${className || ''} follow-button ${friend ? 'is-friend' : following ? 'is-following' : ''}`}
      type="button"
      aria-pressed={following}
    >
      {friend ? 'Friends' : following ? 'Following' : 'Follow'}
    </button>
  );
});

export const UserRow = memo(function UserRow({ user }) {
  return (
    <div className="user-row">
      <Avatar name={user.name} />
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-handle">{user.handle}</div>
      </div>
      <FollowButton className="follow-button-wrapper" userId={user.id} />
    </div>
  );
});

function SummaryStat({ label, value }) {
  return (
    <div className="summary-stat">
      <div className="summary-value">{value}</div>
      <div className="summary-label">{label}</div>
    </div>
  );
}

export function SummaryBar() {
  const { followingIds, followerIds, friendIds } = useFollow();

  return (
    <div className="summary-bar">
      <SummaryStat label="Following" value={followingIds.length} />
      <SummaryStat label="Followers" value={followerIds.length} />
      <SummaryStat label="Friends" value={friendIds.length} />
    </div>
  );
}

export function FollowInner() {
  return (
    <div className="follow">
      <h2 className="people-title">People</h2>
      <p className="people-description">People you may know.</p>
      <p className="summary-description">Updates and content.</p>
      <SummaryBar />
      <div className="user-list">
        {MOCK_USERS.map((u) => (
          <UserRow key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}

export default function FollowersFriends() {
  return (
   
    <FollowProvider>
      <FollowInner />
    </FollowProvider>

  );
}

const STORAGE_KEY = 'profile';

const DEFAULT_PROFILE = {
  id: 'usr_9482f3a',
  name: 'Joseph Dias',
  title: 'FS Developer',
  avatarUrl: UserActivation.avatarUrl,
  joinedDate: '2024-03-15',
  isActive: true,
  email: 'alex.chen@company.com',
  location: 'San Diego, CA',
  bio: 'Building responsive web interfaces with React and Django.',
};

// Get the saved profile, or fall back to defaults if none exists yet
function getProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch (err) {
    console.error('Failed to read profile from localStorage:', err);
    return DEFAULT_PROFILE;
  }
}

// Save the full profile object
function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return profile;
  } catch (err) {
    console.error('Failed to save profile to localStorage:', err);
    return getProfile();
  }
}

// Update only some fields of the profile
function updateProfile(updates) {
  const current = getProfile();
  const updated = { ...current, ...updates };
  return saveProfile(updated);
}

// Reset back to defaults
function clearProfile() {
  localStorage.removeItem(STORAGE_KEY);
}

const profileService = {
  getProfile,
  saveProfile,
  updateProfile,
  clearProfile,
};

export default profileService;
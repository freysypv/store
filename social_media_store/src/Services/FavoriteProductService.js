import Favorites from "../pages/Favorites";

const STORAGE_PREFIX = 'user_favorites:';
 
function getStorageKey(userId) {
  if (!userId) throw new Error('User ID is required');
  return `${STORAGE_PREFIX}${userId}`;
}
 
export function getFavoriteIds(userId) {
  try {
    const saved = localStorage.getItem(getStorageKey(userId));
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load favorites:', err);
    return [];
  }
}
 
export function saveFavoriteIds(userId, ids) {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(ids));
  } catch (err) {
    console.error('Failed to save favorites:', err);
  }
}
 
export function isFavorite(userId, productId) {
  const ids = getFavoriteIds(userId);
  return new Set(ids).has(productId);
}
 
export function toggleFavorite(userId, productId) {
  const currentIds = getFavoriteIds(userId);
  const idSet = new Set(currentIds);
 
  if (idSet.has(productId)) {
    idSet.delete(productId);
  } else {
    idSet.add(productId);
  }
 
  const updated = Array.from(idSet);
  saveFavoriteIds(userId, updated);
  return updated;
}
 
export function getFavoriteProducts(userId, allProducts) {
  const idSet = new Set(getFavoriteIds(userId));
  return allProducts.filter((product) => idSet.has(product.id));
}
 
const favoriteProductService = {
  getFavoriteIds,
  saveFavoriteIds,
  isFavorite,
  toggleFavorite,
  getFavoriteProducts,
};
 
export default favoriteProductService;
const cache = new Map();

function appendToCache(cacheKey, notes) {
  cache.set(cacheKey, notes);
}

function sendFromCache(cacheKey, res) {
  if (cache.get(cacheKey)) {
    res.set('Cache-Control', 'no-store');
    return res.json(cache.get(cacheKey));
  }
}

function clearCache() {
  cache.clear();
}

module.exports = {
  appendToCache,
  sendFromCache,
  clearCache,
};

export function loadCollection(key, seedData) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(key, JSON.stringify(seedData));
    return seedData;
  } catch {
    return seedData;
  }
}

export function saveCollection(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

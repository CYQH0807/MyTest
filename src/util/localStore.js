export default {
  get: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
  set: (key, val) => {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        localStorage.removeItem(key)
      }
    }
  },
  remove: (key) => {
    localStorage.removeItem(key)
  },
  clear: () => {
    localStorage.clear()
  }
}

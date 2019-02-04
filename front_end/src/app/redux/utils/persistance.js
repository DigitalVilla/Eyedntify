export const persistLS = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const getLS = (key) => JSON.parse(localStorage.getItem(key));

export const deleteLS = (key) => localStorage.removeItem(key);

export const clearLS = () => localStorage.clear();
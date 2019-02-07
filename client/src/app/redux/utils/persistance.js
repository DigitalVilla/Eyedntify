export const persistLS = (key, value) => localStorage.setItem(key, value)

export const getLS = (key) => localStorage.getItem(key);

export const deleteLS = (key) => localStorage.removeItem(key);

export const clearLS = () => localStorage.clear();


export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function getLocalStorage<T>(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  
  export function removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
  
  export function clearLocalStorage() {
    localStorage.clear();
  }
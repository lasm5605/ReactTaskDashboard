/* bring in React hooks that 1) allow components to remember a value and 2) lets a component run code after something changes */
import { useState, useEffect } from "react";

/* defining my own hook that takes two inputs: key and initialvalue */
export function useLocalStorage(key, initialValue) {
/* '() =>' means React only calls the following functions once: localStorage.getItem(key), which is built into the browser, and JSON.parse, which is built into JavaScript */
  const [value, setValue] = useState(() => {
/* Starts a safety block. If anything inside throws an error, the code jumps to catch instead of crashing the app. */
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
/* If reading or parsing failed (corrupted data, storage blocked), fall back to initialValue. */
    } catch {
      return initialValue;
    }
  });

/* Sets up code that runs after the component renders. */
  useEffect(() => {
/* JSON.stringify turns your array or object into text, since localStorage can only hold strings. setItem files that text under the key, replacing the old version. The try/catch means a failed save doesn’t break the app. */
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or blocked; the app still works, it just won't persist
    }
  }, [key, value]);

  return [value, setValue];
}
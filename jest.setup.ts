import '@testing-library/jest-dom';

// Wyciszenie ostrzeżeń React Router
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes('React Router')) return;
  originalWarn(...args);
};
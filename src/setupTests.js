import '@testing-library/jest-dom';

const originalWarn = console.warn;

console.warn = (...args) => {
  const [firstArg] = args;
  if (typeof firstArg === 'string' && firstArg.includes('React Router Future Flag Warning')) {
    return;
  }
  originalWarn(...args);
};

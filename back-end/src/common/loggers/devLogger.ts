export const getMethodForDevEnv = (method: () => void) => {
  return (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      method.call(console, ...args);
    }
  };
};

export const devlog = getMethodForDevEnv(console.log);
export const deverr = getMethodForDevEnv(console.error);

export const timeMiddleware = (store: any) => (next: any) => (action: any) => {
  setTimeout(() => {
    return next(action);
  }, 2000);
};

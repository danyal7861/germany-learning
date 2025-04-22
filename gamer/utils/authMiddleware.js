// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  
  // Middleware to check if user is not authenticated
  export const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  };
  
  // Middleware to add user to all views
  export const addUserToViews = (req, res, next) => {
    res.locals.user = req.user || null;
    next();
  };
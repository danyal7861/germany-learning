// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated using Passport's isAuthenticated method
  if (req.isAuthenticated()) {
      return next();  // If authenticated, proceed to the next middleware or route handler
  }
  res.redirect('/login');  // If not authenticated, redirect to the login page
};

// Middleware to check if user is not authenticated
export const isNotAuthenticated = (req, res, next) => {
  // Check if the user is NOT authenticated
  if (!req.isAuthenticated()) {
      return next();  // If the user is not authenticated, proceed to the next middleware or route handler
  }
  res.redirect('/dashboard');  // If the user is already authenticated, redirect them to the dashboard page
};

// Middleware to add user to all views
export const addUserToViews = (req, res, next) => {
  // Add the user object to the res.locals, making it available to all views
  // This is useful for rendering user data in templates (e.g., the logged-in user's name)
  res.locals.user = req.user || null;  // If user is authenticated, add the user to locals, otherwise set it as null
  next();  // Proceed to the next middleware or route handler
};

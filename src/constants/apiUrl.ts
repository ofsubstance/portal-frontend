const APIUrl = {
  base: import.meta.env.VITE_API || "http://localhost:3000",
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/signup",
    socialSignin: () => "/auth/social-signin",
    googleApiSignin: () => "https://www.googleapis.com/oauth2/v3/userinfo",
    signout: () => "/auth/logout",
    refreshToken: () => "/auth/refresh",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: (token: string) => "/auth/reset-password/" + token,
  },
  user: {
    getUser: (userId: string) => "/user/" + userId,
  },
};

export default APIUrl;

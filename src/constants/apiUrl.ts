const APIUrl = {
  base: import.meta.env.VITE_API || "http://localhost:5000",
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/signup",
    googleSignin: () => "/auth/google-login",
    googleApiSignin: () => "https://www.googleapis.com/oauth2/v3/userinfo",
    signout: () => "/auth/logout",
    refreshToken: () => "/auth/refresh",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: (token: string) => "/auth/reset-password/" + token,
  },
  user: {
    getUser: (userId: string) => "/user/" + userId,
  },
  videoManagement: {
    uploadVideo: () => "/videos",
  },
};

export default APIUrl;

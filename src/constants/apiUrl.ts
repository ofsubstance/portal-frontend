const APIUrl = {
  base: import.meta.env.VITE_API || "http://localhost:3000",
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/signup",
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

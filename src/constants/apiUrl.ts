import { PlaylistTag } from './enums';

const APIUrl = {
  base: import.meta.env.VITE_API || 'http://localhost:5000',
  auth: {
    signin: () => '/auth/login',
    signup: () => '/auth/signup',
    resendVerification: () => '/auth/resendVerification',
    verifyEmail: (token: string) => '/auth/verify-email?token=' + token,
    googleSignin: () => '/auth/google-login',
    googleApiSignin: () => 'https://www.googleapis.com/oauth2/v3/userinfo',
    signout: () => '/auth/logout',
    refreshToken: () => '/auth/refresh',
    forgotPassword: () => '/auth/forgot-password',
    resetPassword: (token: string) => '/auth/reset-password/' + token,
  },
  user: {
    getUser: (userId: string) => '/users/' + userId,
  },
  videoManagement: {
    getVideos: () => '/videos',
    getVideoById: (videoId: string) => '/videos/' + videoId,
    uploadVideo: () => '/videos',
    updateVideo: (videoId: string) => '/videos/' + videoId,
    deleteVideo: (videoId: string) => '/videos/' + videoId,
  },

  playlistManagement: {
    getPlaylists: () => '/playlists',
    getPlaylistById: (playlistId: string) => '/playlists/' + playlistId,
    getPlaylistByTag: (tag: PlaylistTag) => '/playlists/tag/' + tag,
    createPlaylist: () => '/playlists',
    updatePlaylist: (playlistId: string) => '/playlists/' + playlistId,
    deletePlaylist: (playlistId: string) => '/playlists/' + playlistId,
  },

  comments: {
    create: () => '/comments',
    getAll: () => '/comments',
    getByVideo: (videoId: string) => '/comments/video/' + videoId,
    getByUser: () => '/comments/user/me',
    updateStatus: (commentId: string) => '/comments/' + commentId + '/status',
  },

  sharelinks: {
    create: () => '/sharelinks',
    getByUser: () => '/sharelinks/user/me',
    getById: (id: string) => '/sharelinks/' + id,
    getByUniqueId: (uniqueId: string) => '/sharelinks/unique-id/' + uniqueId,
    trackVisit: (uniqueId: string) => `/sharelinks/track-id/${uniqueId}`,
    getComprehensiveAnalytics: () => '/sharelinks/analytics/comprehensive',
  },

  metrics: {
    getDau: (date: string) =>
      `/metrics/performance/active-users/daily?date=${date}`,
    getMau: (date: string) =>
      `/metrics/performance/active-users/monthly?date=${date}`,
    getUserTrend: (startDate: string, endDate: string, span: string) =>
      `/metrics/performance/active-users/trend?startDate=${startDate}&endDate=${endDate}&span=${span}`,
    getGrowthTrend: (startDate: string, endDate: string, span: string) =>
      `/metrics/performance/growth/trend?startDate=${startDate}&endDate=${endDate}&span=${span}`,
    getRetention: (startDate: string, endDate: string) =>
      `/metrics/performance/retention?startDate=${startDate}&endDate=${endDate}`,
    getSessionEngagement: (startDate: string, endDate: string) =>
      `/metrics/sessions?startDate=${startDate}&endDate=${endDate}`,
    getSessionEngagementDaily: (startDate: string, endDate: string) =>
      `/metrics/sessions/daily?startDate=${startDate}&endDate=${endDate}`,
  },

  sessions: {
    heartbeat: (sessionId: string) => `/user-sessions/heartbeat/${sessionId}`,
    contentEngaged: (sessionId: string) =>
      `/user-sessions/${sessionId}/content-engaged`,
    createGuestSession: () => `/user-sessions/guest`,
  },

  videoWatches: {
    create: () => `/video-watches`,
    update: (watchId: string) => `/video-watches/${watchId}`,
  },

  feedback: {
    submit: () => `/feedback`,
  },

  userContent: {
    profile: () => `/user-content/profile`,
    comments: () => `/user-content/comments`,
    feedbacks: () => `/user-content/feedbacks`,
    sharelinks: () => `/user-content/sharelinks`,
  },
};

export default APIUrl;

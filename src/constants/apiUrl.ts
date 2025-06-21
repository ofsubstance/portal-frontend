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
    updateContentEngagement: (userId: string) =>
      '/users/' + userId + '/content-engagement',
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
      `/metrics/engagement/sessions?startDate=${startDate}&endDate=${endDate}`,
    getSessionEngagementDaily: (startDate: string, endDate: string) =>
      `/metrics/engagement/sessions/by-timespan?startDate=${startDate}&endDate=${endDate}&span=daily`,
    getSessionTime: (startDate: string, endDate: string, span: string) =>
      `/metrics/engagement/session-time?startDate=${startDate}&endDate=${endDate}&span=${span}`,
    getUserUtilization: () => `/metrics/engagement/distribution/utilization`,
    getUserInterests: () => `/metrics/engagement/distribution/interests`,
    getInterestSankey: () =>
      `/metrics/engagement/distribution/interests-sankey`,
    // Content Metrics
    getVideoList: () => `/metrics/content`,
    getVideoViews: (
      videoId: string,
      startDate: string,
      endDate: string,
      period: string
    ) =>
      `/metrics/content/${videoId}/views?startDate=${startDate}&endDate=${endDate}&period=${period}`,
    getVideoPercentageWatched: (
      videoId: string,
      startDate: string,
      endDate: string,
      period: string
    ) =>
      `/metrics/content/${videoId}/average-percentage-watched?startDate=${startDate}&endDate=${endDate}&period=${period}`,
    getVideoShares: (
      videoId: string,
      startDate: string,
      endDate: string,
      period: string
    ) =>
      `/metrics/content/${videoId}/share-count?startDate=${startDate}&endDate=${endDate}&period=${period}`,
    getVideoCompletionRates: (
      videoId: string,
      startDate: string,
      endDate: string,
      period: string
    ) =>
      `/metrics/content/${videoId}/completion-and-drop-off-rates?startDate=${startDate}&endDate=${endDate}&period=${period}`,
  },

  sessions: {
    heartbeat: (sessionId: string) => `/user-sessions/heartbeat/${sessionId}`,
    contentEngaged: (sessionId: string) =>
      `/user-sessions/${sessionId}/content-engaged`,
  },

  watchSessions: {
    create: () => '/watch-sessions',
    getById: (id: string) => `/watch-sessions/${id}`,
    update: (id: string) => `/watch-sessions/${id}`,
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

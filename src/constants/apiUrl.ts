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
};

export default APIUrl;

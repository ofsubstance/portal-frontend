import { Chip, Paper, Typography, Box, CircularProgress, Card, Grid, useTheme, Link } from '@mui/material';
import userManagementImg from '@/assets/userManagement.svg';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { adminUsers, AdminUser } from '@/data/adminUserData';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import userService from '@/services/user.service';
import { UserDto, UserEngagementDto } from '@/dtos/user.dto';
import { 
  AccessTime as TimeIcon,
  Person as UserIcon,
  Email as EmailIcon,
  VpnKey as RoleIcon,
  RadioButtonChecked as StatusIcon,
  CalendarToday as CalendarIcon,
  Timeline as StatsIcon,
  Visibility as ViewsIcon,
  Share as ShareIcon,
  PlayCircle as WatchIcon,
  TrendingUp as TrendIcon,
  VideoLibrary as VideoIcon
} from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material';

const userColumns: MRT_ColumnDef<UserDto>[] = [
  {
    accessorKey: 'firstname',
    header: 'First Name',
  },
  {
    accessorKey: 'lastname',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'profile.business_name',
    header: 'Business Name',
  },
  {
    accessorKey: 'profile.website',
    header: 'Website',
    Cell: ({ row }) => (
      <Link 
        href={row.original.profile.website.startsWith('http') ? row.original.profile.website : `https://${row.original.profile.website}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ textDecoration: 'none' }}
      >
        {row.original.profile.website}
      </Link>
    ),
  },
  {
    accessorKey: 'profile.utilization_purpose',
    header: 'Usage Purpose',
    Cell: ({ row }) => (
      <Chip 
        label={row.original.profile.utilization_purpose}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    Cell: ({ row }) => (
      <Chip 
        label={row.original.role}
        color={row.original.role === 'admin' ? 'primary' : 'default'}
        size="small"
        variant="outlined"
      />
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: ({ row }) => (
      <Chip 
        label={row.original.status}
        color={row.original.status === 'active' ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  {
    accessorKey: 'profile.state_region',
    header: 'State/Region',
  },
  {
    accessorKey: 'profile.country',
    header: 'Country',
  },
  {
    accessorKey: 'last_login',
    header: 'Last Login',
    Cell: ({ row }) => (
      <Typography>
        {row.original.last_login
          ? format(new Date(row.original.last_login), 'MMM dd, yyyy')
          : '-'}
      </Typography>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Account Creation',
    Cell: ({ row }) => (
      <Typography>
        {format(new Date(row.original.createdAt), 'MMM dd, yyyy')}
      </Typography>
    ),
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

const StatCard = ({ title, value, icon: Icon, color = 'primary' }: StatCardProps) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      p: 2, 
      borderRadius: 2,
      bgcolor: `${theme.palette[color].main}08`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Icon sx={{ color: theme.palette[color].main }} />
        <Typography color="text.secondary" variant="body2">{title}</Typography>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette[color].main }}>
        {value}
      </Typography>
    </Box>
  );
};

const UserEngagementDetails = ({ userId, user }: { userId: string; user: UserDto }) => {
  const [engagement, setEngagement] = useState<UserEngagementDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchEngagement = async () => {
      try {
        const data = await userService.getUserEngagement(userId);
        setEngagement(data);
      } catch (err) {
        setError('Failed to load user engagement data');
      } finally {
        setLoading(false);
      }
    };

    fetchEngagement();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, color: 'error.main' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!engagement) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No engagement data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default }}>
      {/* User Profile Summary */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom>Business Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography>
                  <strong>Business Name:</strong> {user.profile.business_name}
                </Typography>
                <Typography>
                  <strong>Website:</strong>{' '}
                  <Link href={user.profile.website} target="_blank" rel="noopener noreferrer">
                    {user.profile.website}
                  </Link>
                </Typography>
                <Typography>
                  <strong>Location:</strong> {user.profile.state_region}, {user.profile.country}
                </Typography>
                <Typography>
                  <strong>Usage Purpose:</strong> {user.profile.utilization_purpose}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom>Areas of Interest</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.profile.interests.map((interest) => (
                  <Chip 
                    key={interest}
                    label={interest}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Watch Time" 
            value={`${engagement.watchStats.totalWatchTimeMinutes}m`}
            icon={TimeIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Sessions" 
            value={engagement.sessionStats.totalSessions}
            icon={StatsIcon}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Engagement Rate" 
            value={`${engagement.sessionStats.engagementRate}%`}
            icon={ViewsIcon}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Links Shared" 
            value={engagement.shareableLinks.totalLinks}
            icon={ShareIcon}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Session Stats */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            boxShadow: theme.shadows[1],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <StatsIcon color="primary" />
              <Typography variant="h6">Session Statistics</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Active Sessions
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.sessionStats.activeSessions}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Engaged Sessions
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.sessionStats.engagedSessions}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Avg Duration
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.sessionStats.averageSessionDuration}m
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Last Session
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {engagement.sessionStats.lastSessionDate 
                      ? format(new Date(engagement.sessionStats.lastSessionDate), 'MMM dd, yyyy')
                      : '-'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Watch Stats */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            boxShadow: theme.shadows[1],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <WatchIcon color="primary" />
              <Typography variant="h6">Watch Statistics</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Watch Sessions
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.watchStats.totalWatchSessions}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Avg Watch %
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.watchStats.averageWatchPercentage}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Completed Videos
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {engagement.watchStats.completedVideos}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Unique Videos
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.watchStats.uniqueVideosWatched}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Video Specific Stats */}
        {engagement.videoSpecificStats.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ 
              p: 3,
              boxShadow: theme.shadows[1],
              '&:hover': {
                boxShadow: theme.shadows[4],
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <VideoIcon color="primary" />
                <Typography variant="h6">Video Watch History</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {engagement.videoSpecificStats.map((video) => (
                  <Box 
                    key={video.videoId} 
                    sx={{ 
                      p: 2,
                      borderRadius: 1,
                      bgcolor: theme.palette.background.default,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle1" fontWeight="600">
                          {video.videoTitle}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Last watched: {format(new Date(video.lastWatched), 'MMM dd, yyyy')}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant="body2" color="text.secondary">Sessions</Typography>
                        <Typography variant="h6">{video.totalSessions}</Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant="body2" color="text.secondary">Watch Time</Typography>
                        <Typography variant="h6">{video.totalWatchTimeMinutes}m</Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant="body2" color="text.secondary">Avg Watch %</Typography>
                        <Typography variant="h6">{video.averageWatchPercentage}%</Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant="body2" color="text.secondary">Completed</Typography>
                        <Chip 
                          label={video.completedSessions > 0 ? 'Yes' : 'No'}
                          color={video.completedSessions > 0 ? 'success' : 'default'}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        )}

        {/* Shareable Links */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            boxShadow: theme.shadows[1],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <ShareIcon color="primary" />
              <Typography variant="h6">Shareable Links</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                mb: 2
              }}>
                <Box sx={{ 
                  flex: 1,
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Total Views
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.shareableLinks.totalViews}
                  </Typography>
                </Box>
                <Box sx={{ 
                  flex: 1,
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Unique Visitors
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.shareableLinks.totalUniqueVisitors}
                  </Typography>
                </Box>
              </Box>

              {engagement.shareableLinks.links.length > 0 ? (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Recent Links
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {engagement.shareableLinks.links.map((link) => (
                      <Box 
                        key={link.id} 
                        sx={{ 
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: theme.palette.background.default,
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 0.5
                        }}>
                          <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                            {link.video.title}
                          </Typography>
                          <Chip 
                            label={`${link.views} views`}
                            size="small"
                            color="primary"
                          />
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <Typography variant="caption" color="text.secondary">
                            Created: {format(new Date(link.createdAt), 'MMM dd, yyyy')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Unique Visitors: {link.uniqueVisitors}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No shared links yet
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>

        {/* 30-Day Trends */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            p: 3, 
            height: '100%',
            boxShadow: theme.shadows[1],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <TrendIcon color="primary" />
              <Typography variant="h6">30-Day Trends</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Watch Sessions
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.engagementTrends.last30Days.totalWatchSessions}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Watch Time
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.engagementTrends.last30Days.totalWatchTimeMinutes}m
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Avg Watch %
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.engagementTrends.last30Days.averageWatchPercentage}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1, 
                  bgcolor: theme.palette.background.default 
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Unique Videos
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {engagement.engagementTrends.last30Days.uniqueVideosWatched}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        p: 4, 
        textAlign: 'center',
        color: 'error.main',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight="600">
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users and view their engagement metrics
        </Typography>
      </Box>

      <MaterialReactTable
        columns={userColumns}
        data={users}
        enableExpanding
        renderDetailPanel={({ row }) => (
          <UserEngagementDetails userId={row.original.id} user={row.original} />
        )}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '1rem',
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden'
          },
        }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        enableTopToolbar={true}
        enableBottomToolbar={true}
        enableColumnFilters={true}
        enableGlobalFilter={true}
        enablePagination={true}
        enableColumnResizing={true}
        enableRowSelection={false}
        positionExpandColumn="first"
        muiExpandButtonProps={({ row }) => ({
          sx: {
            backgroundColor: row.getIsExpanded() 
              ? `${theme.palette.primary.main}14` 
              : 'transparent',
            transition: 'all 0.2s ease',
          },
        })}
        displayColumnDefOptions={{
          'mrt-row-expand': {
            size: 60,
          },
        }}
        initialState={{
          density: 'comfortable',
          pagination: { pageSize: 10, pageIndex: 0 },
          sorting: [{ id: 'last_login', desc: true }],
          columnVisibility: {
            'profile.state_region': false,
            'profile.country': false,
          }
        }}
      />
    </Box>
  );
}

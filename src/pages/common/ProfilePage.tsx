import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  Rating,
  Button,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  RiPhoneFill as PhoneIcon,
  RiMailFill as EmailIcon,
  RiMapPin2Fill as LocationIcon,
  RiBuilding2Fill as BusinessIcon,
  RiGlobalFill as WebsiteIcon,
  RiUser2Fill as PurposeIcon,
  RiLightbulbFill as InterestIcon,
  RiCalendarLine as CalendarIcon,
  RiShareLine as ShareIcon,
  RiMessage3Line as CommentIcon,
  RiStarSLine as FeedbackIcon,
  RiCheckLine as ApprovedIcon,
  RiErrorWarningLine as PendingIcon,
  RiCloseCircleLine as RejectedIcon,
  RiTimeLine as ExpirationIcon,
  RiEyeLine as ViewsIcon,
  RiVideoLine as FilmIcon,
  RiUser2Fill,
} from 'react-icons/ri';
import { format, formatDistanceToNow } from 'date-fns';
import { TabPanel } from '@/components/common/TabPanel';
import useUserContentActions from '@/hooks/useUserContentActions';
import coverImagePlaceholder from '@/assets/coverImagePlaceholder.svg';

function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const {
    useUserProfileQuery,
    useUserCommentsQuery,
    useUserFeedbacksQuery,
    useUserSharelinksQuery,
  } = useUserContentActions();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useUserProfileQuery();

  const {
    data: comments,
    isLoading: isLoadingComments,
    error: commentsError,
  } = useUserCommentsQuery();

  const {
    data: feedbacks,
    isLoading: isLoadingFeedbacks,
    error: feedbacksError,
  } = useUserFeedbacksQuery();

  const {
    data: sharelinks,
    isLoading: isLoadingSharelinks,
    error: sharelinksError,
  } = useUserSharelinksQuery();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Loading state
  if (isLoadingProfile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (profileError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Error loading profile. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Profile not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      {/* Profile Header */}
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'relative',
            height: 200,
            backgroundImage: `url(${coverImagePlaceholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Avatar
            sx={{
              position: 'absolute',
              bottom: -50,
              left: { xs: '50%', sm: 40 },
              transform: { xs: 'translateX(-50%)', sm: 'none' },
              width: 100,
              height: 100,
              border: '4px solid white',
              boxShadow: 1,
            }}
            alt={`${profile.firstname} ${profile.lastname}`}
            src="/default-avatar.png"
          />
        </Box>

        <Box
          sx={{
            mt: 6,
            p: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-end' },
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {profile.firstname} {profile.lastname}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.profile.business_name}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ px: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab
              icon={<RiUser2Fill />}
              iconPosition="start"
              label="Profile"
              id="profile-tab"
              aria-controls="profile-panel"
            />
            <Tab
              icon={<CommentIcon />}
              iconPosition="start"
              label="Comments"
              id="comments-tab"
              aria-controls="comments-panel"
            />
            <Tab
              icon={<FeedbackIcon />}
              iconPosition="start"
              label="Feedbacks"
              id="feedbacks-tab"
              aria-controls="feedbacks-panel"
            />
            <Tab
              icon={<ShareIcon />}
              iconPosition="start"
              label="Shared Links"
              id="sharelinks-tab"
              aria-controls="sharelinks-panel"
            />
          </Tabs>
        </Box>
      </Paper>

      {/* Profile Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon />
                  <Typography variant="body1">{profile.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon />
                  <Typography variant="body1">
                    {profile.phone || 'Not provided'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon />
                  <Typography variant="body1">
                    {profile.profile.state_region}, {profile.profile.country}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                sx={{ mt: 3 }}
              >
                Business Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BusinessIcon />
                  <Typography variant="body1">
                    {profile.profile.business_name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WebsiteIcon />
                  <Typography variant="body1">
                    {profile.profile.website}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <PurposeIcon style={{ marginTop: 4 }} />
                  <Typography variant="body1">
                    {profile.profile.utilization_purpose}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Interests
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {profile.profile.interests.map((interest) => (
                  <Chip
                    key={interest}
                    icon={<InterestIcon />}
                    label={interest}
                    variant="outlined"
                    color="primary"
                    sx={{ margin: 0.5 }}
                  />
                ))}
              </Box>

              <Typography variant="h6" gutterBottom fontWeight="bold">
                Account Statistics
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      {comments?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Comments
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      {feedbacks?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Feedbacks
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      {sharelinks?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Shared Links
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom fontWeight="bold">
                Account Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Role
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {profile.role}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={profile.status}
                    color={profile.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="body2">
                    {format(new Date(profile.createdAt), 'PPP')}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Comments Tab Content */}
      <TabPanel value={tabValue} index={1}>
        {isLoadingComments ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : comments && comments.length > 0 ? (
          <Grid container spacing={3}>
            {comments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { sm: 140 },
                      height: { xs: 140, sm: 'auto' },
                      objectFit: 'cover',
                    }}
                    image={comment.video.thumbnail_url}
                    alt={comment.video.title}
                  />
                  <CardContent sx={{ flex: '1 1 auto' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          gutterBottom
                          component={Link}
                          to={`/video/${comment.video.id}`}
                          sx={{ textDecoration: 'none', color: 'text.primary' }}
                        >
                          {comment.video.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          <CalendarIcon
                            style={{ verticalAlign: 'middle', marginRight: 4 }}
                          />
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </Box>
                      <Chip
                        icon={
                          comment.status === 'approved' ? (
                            <ApprovedIcon />
                          ) : comment.status === 'pending' ? (
                            <PendingIcon />
                          ) : (
                            <RejectedIcon />
                          )
                        }
                        label={comment.status}
                        color={
                          comment.status === 'approved'
                            ? 'success'
                            : comment.status === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                        size="small"
                      />
                    </Box>
                    <Typography variant="body1" paragraph>
                      {comment.text}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FilmIcon />}
                      component={Link}
                      to={`/video/${comment.video.id}`}
                    >
                      Go to Film
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No comments yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You haven't commented on any films yet.
            </Typography>
          </Box>
        )}
      </TabPanel>

      {/* Feedbacks Tab Content */}
      <TabPanel value={tabValue} index={2}>
        {isLoadingFeedbacks ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : feedbacks && feedbacks.length > 0 ? (
          <Grid container spacing={3}>
            {feedbacks.map((feedback) => (
              <Grid item xs={12} key={feedback.id}>
                <Card>
                  <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                      image={feedback.video.thumbnail_url}
                      alt={feedback.video.title}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Typography
                          variant="h6"
                          component={Link}
                          to={`/video/${feedback.video.id}`}
                          sx={{ textDecoration: 'none', color: 'text.primary' }}
                        >
                          {feedback.video.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <CalendarIcon
                            style={{ verticalAlign: 'middle', marginRight: 4 }}
                          />
                          {formatDistanceToNow(new Date(feedback.createdAt), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Engagement Level
                          </Typography>
                          <Rating value={feedback.engagementLevel} readOnly />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Subject Matter Usefulness
                          </Typography>
                          <Rating
                            value={feedback.subjectMatterUsefulness}
                            readOnly
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Outcome Improvement
                          </Typography>
                          <Rating
                            value={feedback.outcomeImprovement}
                            readOnly
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Continue Usage Likelihood
                          </Typography>
                          <Rating
                            value={feedback.continueUsageLikelihood}
                            readOnly
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            Recommend Likelihood
                          </Typography>
                          <Rating
                            value={feedback.recommendLikelihood}
                            readOnly
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    {feedback.openEndedFeedback && (
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 2, mb: 1 }}
                        >
                          Your Feedback:
                        </Typography>
                        <Paper
                          variant="outlined"
                          sx={{ p: 2, bgcolor: 'background.default' }}
                        >
                          <Typography variant="body2">
                            {feedback.openEndedFeedback}
                          </Typography>
                        </Paper>
                      </>
                    )}

                    <Box
                      sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FilmIcon />}
                        component={Link}
                        to={`/video/${feedback.video.id}`}
                      >
                        Go to Film
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No feedbacks yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You haven't provided feedback on any films yet.
            </Typography>
          </Box>
        )}
      </TabPanel>

      {/* Shared Links Tab Content */}
      <TabPanel value={tabValue} index={3}>
        {isLoadingSharelinks ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : sharelinks && sharelinks.length > 0 ? (
          <Grid container spacing={3}>
            {sharelinks.map((sharelink) => (
              <Grid item xs={12} md={6} key={sharelink.id}>
                <Card>
                  <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                      image={sharelink.video.thumbnail_url}
                      alt={sharelink.video.title}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/video/${sharelink.video.id}`}
                        sx={{ textDecoration: 'none', color: 'text.primary' }}
                      >
                        {sharelink.video.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        <CalendarIcon
                          style={{ verticalAlign: 'middle', marginRight: 4 }}
                        />
                        Created{' '}
                        {formatDistanceToNow(new Date(sharelink.createdAt), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Share Link:
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{ p: 1.5, bgcolor: 'background.default' }}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {sharelink.unique_link}
                        </Typography>
                      </Paper>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <ViewsIcon />
                        <Typography variant="body2">
                          {sharelink.views}{' '}
                          {sharelink.views === 1 ? 'view' : 'views'}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <ExpirationIcon />
                        <Typography variant="body2">
                          Expires{' '}
                          {formatDistanceToNow(
                            new Date(sharelink.expiration_time),
                            { addSuffix: true }
                          )}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        onClick={() => {
                          navigator.clipboard.writeText(sharelink.unique_link);
                        }}
                      >
                        Copy Link
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={sharelink.unique_link}
                        target="_blank"
                        fullWidth
                      >
                        Open
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No shared links yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You haven't shared any films yet.
            </Typography>
          </Box>
        )}
      </TabPanel>
    </Box>
  );
}

export default ProfilePage;

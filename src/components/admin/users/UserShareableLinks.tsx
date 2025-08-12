import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import { UserEngagementDto } from '@/dtos/user.dto';
import {
  RiShareForwardLine,
  RiEyeLine,
  RiUserLine,
  RiVideoLine,
  RiCalendarLine,
  RiTimeLine,
} from 'react-icons/ri';

interface UserShareableLinksProps {
  engagement: UserEngagementDto;
}

const UserShareableLinks: React.FC<UserShareableLinksProps> = ({
  engagement,
}) => {
  const theme = useTheme();
  const { shareableLinks } = engagement;

  if (!shareableLinks || shareableLinks.totalLinks === 0) {
    return (
      <Card elevation={0} sx={{ mb: 3, border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
              color: 'text.primary',
            }}
          >
            <RiShareForwardLine size={20} />
            Shareable Links
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No shareable links created yet.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{ mb: 3, mt: 3, border: 1, borderColor: 'divider' }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
            color: 'text.primary',
          }}
        >
          <RiShareForwardLine size={20} />
          Shareable Links
        </Typography>

        {/* Summary Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'primary.50',
                borderRadius: 2,
                border: 1,
                borderColor: 'primary.200',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <RiShareForwardLine size={16} />
                <Typography variant="body2" color="text.secondary">
                  Total Links
                </Typography>
              </Box>
              <Typography variant="h6">{shareableLinks.totalLinks}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'success.50',
                borderRadius: 2,
                border: 1,
                borderColor: 'success.200',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <RiEyeLine size={16} />
                <Typography variant="body2" color="text.secondary">
                  Total Views
                </Typography>
              </Box>
              <Typography variant="h6">{shareableLinks.totalViews}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'info.50',
                borderRadius: 2,
                border: 1,
                borderColor: 'info.200',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
              >
                <RiUserLine size={16} />
                <Typography variant="body2" color="text.secondary">
                  Unique Visitors
                </Typography>
              </Box>
              <Typography variant="h6">
                {shareableLinks.totalUniqueVisitors}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Links Table */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: 1, borderColor: 'divider' }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RiVideoLine size={16} />
                    Video
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <RiEyeLine size={16} />
                    Views
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <RiUserLine size={16} />
                    Unique Visitors
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <RiCalendarLine size={16} />
                    Created
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'center',
                    }}
                  >
                    <RiTimeLine size={16} />
                    Status
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shareableLinks.links.map((link) => {
                const isExpired = new Date(link.expirationTime) < new Date();
                return (
                  <TableRow
                    key={link.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {link.video.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {link.video.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{link.views}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {link.uniqueVisitors}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {format(new Date(link.createdAt), 'MMM dd, yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={isExpired ? 'Expired' : 'Active'}
                        size="small"
                        color={isExpired ? 'error' : 'success'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {shareableLinks.links.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No individual links data available.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserShareableLinks;

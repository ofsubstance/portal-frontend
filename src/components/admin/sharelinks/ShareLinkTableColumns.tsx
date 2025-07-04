import { useMemo } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  IconButton,
  Link,
} from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';
import {
  RiExternalLinkLine as ExternalLinkIcon,
  RiEyeLine as ViewsIcon,
  RiUserLine as VisitorsIcon,
  RiTimeLine as ExpirationIcon,
} from 'react-icons/ri';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ShareLinkAnalyticsDto } from '@/dtos/sharelink.dto';

dayjs.extend(relativeTime);

export default function ShareLinkTableColumns() {
  const columns = useMemo<MRT_ColumnDef<ShareLinkAnalyticsDto>[]>(
    () => [
      {
        accessorKey: 'video.title',
        header: 'Video',
        size: 350,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              variant="rounded"
              src={row.original.video.thumbnail_url}
              sx={{
                width: 60,
                height: 40,
                bgcolor: 'grey.100',
                '& .MuiAvatar-img': {
                  objectFit: 'cover',
                },
              }}
            />
            <Box>
              <Typography variant="body2" fontWeight={600} noWrap>
                {row.original.video.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {row.original.user.name}
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        size: 120,
        Cell: ({ row }) => (
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {dayjs(row.original.created_at).format('MMM D, YYYY')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(row.original.created_at).fromNow()}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'expiration_time',
        header: 'Status',
        size: 150,
        Cell: ({ row }) => {
          const isExpired = row.original.is_expired;
          const daysLeft = row.original.days_until_expiration;

          return (
            <Box>
              <Chip
                label={isExpired ? 'Expired' : 'Active'}
                size="small"
                color={isExpired ? 'error' : 'success'}
                variant={isExpired ? 'filled' : 'outlined'}
                sx={{ fontWeight: 500 }}
              />
              {!isExpired && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  {daysLeft} days left
                </Typography>
              )}
            </Box>
          );
        },
      },
      {
        accessorKey: 'views',
        header: 'Performance',
        size: 120,
        Cell: ({ row }) => (
          <Box>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}
            >
              <ViewsIcon size={14} color="gray" />
              <Typography variant="body2" fontWeight={500}>
                {row.original.views}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                views
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisitorsIcon size={14} color="gray" />
              <Typography variant="body2" fontWeight={500}>
                {row.original.unique_visitors}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                unique
              </Typography>
            </Box>
          </Box>
        ),
      },
      {
        accessorKey: 'unique_link',
        header: 'Actions',
        size: 80,
        Cell: ({ row }) => (
          <Tooltip title="Open shared link">
            <IconButton
              component={Link}
              href={row.original.unique_link}
              target="_blank"
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ExternalLinkIcon />
            </IconButton>
          </Tooltip>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    []
  );

  return columns;
}

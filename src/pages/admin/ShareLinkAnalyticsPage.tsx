import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
  Link,
  CircularProgress,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
import {
  RiExternalLinkLine as ExternalLinkIcon,
  RiEyeLine as ViewsIcon,
  RiUserLine as VisitorsIcon,
  RiTimeLine as ExpirationIcon,
  RiCalendarLine as DateIcon,
} from 'react-icons/ri';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ShareLinkAnalyticsDto, EngagementDetail } from '@/dtos/sharelink.dto';
import useShareLinkAction from '@/hooks/useShareLinkAction';
import mediaUploadImg from '@/assets/mediaUpload.svg';

dayjs.extend(relativeTime);

export default function ShareLinkAnalyticsPage() {
  // Table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch data
  const { useShareLinkAnalyticsQuery } = useShareLinkAction();
  const {
    data: shareLinks = [],
    isLoading,
    isError,
  } = useShareLinkAnalyticsQuery();

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  // Define columns
  const columns = useMemo<MRT_ColumnDef<ShareLinkAnalyticsDto>[]>(
    () => [
      {
        accessorKey: 'video.title',
        header: 'Video',
        size: 250,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              variant="rounded"
              src={row.original.video.thumbnail_url}
              sx={{ width: 50, height: 30 }}
            />
            <Typography variant="body2" fontWeight={500}>
              {row.original.video.title}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'user.name',
        header: 'Created By',
        size: 200,
        Cell: ({ row }) => (
          <Box>
            <Typography variant="body2">{row.original.user.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {row.original.user.email}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Created',
        size: 150,
        Cell: ({ row }) => (
          <Tooltip title={formatDate(row.original.created_at)}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DateIcon size={16} />
              <Typography variant="body2">
                {dayjs(row.original.created_at).fromNow()}
              </Typography>
            </Box>
          </Tooltip>
        ),
        filterFn: 'greaterThan',
      },
      {
        accessorKey: 'expiration_time',
        header: 'Expires',
        size: 150,
        Cell: ({ row }) => {
          const isExpired = row.original.is_expired;
          return (
            <Tooltip title={formatDate(row.original.expiration_time)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ExpirationIcon
                  size={16}
                  color={isExpired ? 'red' : undefined}
                />
                <Typography
                  variant="body2"
                  color={isExpired ? 'error' : 'text.primary'}
                >
                  {isExpired
                    ? 'Expired'
                    : `${row.original.days_until_expiration} days left`}
                </Typography>
              </Box>
            </Tooltip>
          );
        },
        filterFn: 'greaterThan',
      },
      {
        accessorKey: 'views',
        header: 'Views',
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ViewsIcon size={16} />
            <Typography variant="body2">{row.original.views}</Typography>
          </Box>
        ),
        filterFn: 'greaterThan',
      },
      {
        accessorKey: 'unique_visitors',
        header: 'Unique Visitors',
        size: 120,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VisitorsIcon size={16} />
            <Typography variant="body2">
              {row.original.unique_visitors}
            </Typography>
          </Box>
        ),
        filterFn: 'greaterThan',
      },
      {
        accessorKey: 'last_engagement',
        header: 'Last Engagement',
        size: 150,
        Cell: ({ row }) => {
          if (!row.original.last_engagement) {
            return <Typography variant="body2">Never</Typography>;
          }
          return (
            <Tooltip title={formatDate(row.original.last_engagement)}>
              <Typography variant="body2">
                {dayjs(row.original.last_engagement).fromNow()}
              </Typography>
            </Tooltip>
          );
        },
        filterFn: 'greaterThan',
      },
      {
        accessorKey: 'unique_link',
        header: 'Link',
        size: 100,
        Cell: ({ row }) => (
          <Tooltip title="Open shared link">
            <IconButton
              component={Link}
              href={row.original.unique_link}
              target="_blank"
              size="small"
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

  // Render engagement details
  const renderEngagementDetails = (details: EngagementDetail[]) => {
    if (!details.length) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No engagement data available for this share link
          </Typography>
        </Box>
      );
    }

    return (
      <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '900px' }}>
          <Typography variant="h6" gutterBottom fontWeight="500">
            Engagement History
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {details.length} engagement records in chronological order
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ maxHeight: 350, overflow: 'auto' }}>
              {details.map((detail, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderBottom:
                      index < details.length - 1
                        ? '1px solid rgba(0,0,0,0.08)'
                        : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.02)',
                    },
                  }}
                >
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}
                  >
                    <Typography variant="subtitle2" fontWeight="500">
                      {formatDate(detail.time)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontFamily: 'monospace' }}
                      >
                        IP: {detail.ip}
                      </Typography>
                      {detail.referrer && (
                        <Tooltip title={`Referred from: ${detail.referrer}`}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              maxWidth: 200,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              cursor: 'help',
                            }}
                          >
                            via: {detail.referrer}
                          </Typography>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {detail.is_unique && (
                      <Chip
                        label="Unique Visit"
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                    {!detail.is_unique && (
                      <Chip
                        label="Return Visit"
                        size="small"
                        variant="outlined"
                        color="default"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                    <Tooltip
                      title={`Time since share link creation: ${dayjs(
                        detail.time
                      ).diff(dayjs(), 'minutes')} minutes`}
                    >
                      <Chip
                        label={dayjs(detail.time).fromNow()}
                        size="small"
                        variant="outlined"
                        color="info"
                        sx={{ fontWeight: 500 }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data: shareLinks,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      density: 'compact',
    },
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableColumnResizing: true,
    enableFullScreenToggle: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: false,
    enableGrouping: false,
    enablePinning: false,
    enableRowActions: false,
    enableRowSelection: false,
    enableDensityToggle: true,
    positionGlobalFilter: 'left',
    muiSearchTextFieldProps: {
      placeholder: 'Search all share links...',
      sx: { minWidth: '300px' },
      variant: 'outlined',
      size: 'small',
    },
    renderDetailPanel: ({ row }) =>
      renderEngagementDetails(row.original.engagement_details),
    renderEmptyRowsFallback: () => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          p: 2,
        }}
      >
        {isLoading ? (
          <CircularProgress size={40} />
        ) : isError ? (
          <Typography>Error loading data. Please try again.</Typography>
        ) : (
          <Typography>No share links found</Typography>
        )}
      </Box>
    ),
    muiTableContainerProps: {
      sx: { maxWidth: '100%' },
    },
    muiTablePaperProps: {
      sx: { margin: 0, padding: 0 },
    },
    layoutMode: 'grid',
    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 50,
      },
    },
  });

  return (
    <Box sx={{ p: 0 }} className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Share Link Analytics
          </Typography>
          <Typography variant="subtitle1">
            Track and analyze the performance of your shared video links
          </Typography>
        </div>
        <object
          role="img"
          type="image/svg+xml"
          data={mediaUploadImg}
          className="max-h-48"
        />
      </Paper>

      <Paper sx={{ overflow: 'hidden', width: '100%', margin: 0, padding: 0 }}>
        <MaterialReactTable table={table} />
      </Paper>
    </Box>
  );
}

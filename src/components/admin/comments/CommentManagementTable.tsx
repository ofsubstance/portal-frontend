import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Tooltip,
  Typography,
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
  RiCheckLine as ApproveIcon,
  RiCloseLine as RejectIcon,
  RiEyeLine as ViewIcon,
  RiMoreLine as MoreIcon,
  RiUserLine as UserIcon,
  RiVideoLine as VideoIcon,
  RiTimeLine as TimeIcon,
} from 'react-icons/ri';
import { CommentDto, CommentStatus } from '@/dtos/comment.dto';
import { formatDistanceToNow } from 'date-fns';
import { useCommentActions } from '@/hooks/useCommentActions';
import { toast } from 'react-toastify';

export default function CommentManagementTable() {
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
  const [expandedComment, setExpandedComment] = useState<string | null>(null);

  // Fetch data
  const { allCommentsQuery, updateCommentStatusMutation } = useCommentActions();
  const comments = allCommentsQuery.data || [];
  const isLoading = allCommentsQuery.isLoading;
  const isError = allCommentsQuery.isError;

  // Handle status update
  const handleUpdateStatus = async (
    commentId: string,
    status: CommentStatus
  ) => {
    try {
      await updateCommentStatusMutation.mutateAsync({
        commentId,
        status,
      });

      let statusMessage = '';
      switch (status) {
        case CommentStatus.APPROVED:
          statusMessage = 'approved';
          break;
        case CommentStatus.REJECTED:
          statusMessage = 'rejected';
          break;
        case CommentStatus.PENDING:
          statusMessage = 'marked as pending';
          break;
      }

      toast.success(`Comment ${statusMessage} successfully`);
    } catch (error) {
      toast.error('Failed to update comment status');
      console.error(error);
    }
  };

  // Get status chip
  const getStatusChip = (status: CommentStatus) => {
    switch (status) {
      case CommentStatus.PENDING:
        return <Chip label="Pending" color="warning" size="small" />;
      case CommentStatus.APPROVED:
        return <Chip label="Approved" color="success" size="small" />;
      case CommentStatus.REJECTED:
        return <Chip label="Rejected" color="error" size="small" />;
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  // Render action buttons based on current status
  const renderActionButtons = (comment: {
    id: string;
    status: CommentStatus;
  }) => {
    const { id, status } = comment;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {status !== CommentStatus.APPROVED && (
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<ApproveIcon />}
            onClick={() => handleUpdateStatus(id, CommentStatus.APPROVED)}
          >
            Approve
          </Button>
        )}

        {status !== CommentStatus.REJECTED && (
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<RejectIcon />}
            onClick={() => handleUpdateStatus(id, CommentStatus.REJECTED)}
          >
            Reject
          </Button>
        )}

        {status !== CommentStatus.PENDING && (
          <Button
            variant="outlined"
            color="warning"
            size="small"
            startIcon={<MoreIcon />}
            onClick={() => handleUpdateStatus(id, CommentStatus.PENDING)}
          >
            Mark Pending
          </Button>
        )}
      </Box>
    );
  };

  // Define columns
  const columns = useMemo<MRT_ColumnDef<CommentDto>[]>(
    () => [
      {
        accessorKey: 'user',
        header: 'User',
        size: 200,
        minSize: 150,
        maxSize: 250,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <UserIcon size={16} />
            <Typography variant="body2">
              {row.original.user?.firstname} {row.original.user?.lastname}
            </Typography>
          </Box>
        ),
        filterFn: 'contains',
      },
      {
        accessorKey: 'video',
        header: 'Video',
        size: 250,
        minSize: 180,
        maxSize: 300,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VideoIcon size={16} />
            <Typography
              variant="body2"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {row.original.video?.title || `Video ID: ${row.original.videoId}`}
            </Typography>
          </Box>
        ),
        filterFn: 'contains',
      },
      {
        accessorKey: 'text',
        header: 'Comment',
        size: 350,
        minSize: 250,
        grow: true,
        Cell: ({ row }) => {
          const isExpanded = expandedComment === row.original.id;
          const text = row.original.text;
          const isTruncated = text.length > 50;

          return (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                {isExpanded || !isTruncated
                  ? text
                  : `${text.substring(0, 50)}...`}
              </Typography>
              {isTruncated && (
                <Tooltip title={isExpanded ? 'Collapse' : 'View full comment'}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      setExpandedComment(isExpanded ? null : row.original.id)
                    }
                  >
                    <ViewIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          );
        },
        filterFn: 'contains',
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        size: 180,
        minSize: 150,
        maxSize: 200,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimeIcon size={16} />
            <Tooltip title={new Date(row.original.createdAt).toLocaleString()}>
              <Typography variant="body2">
                {formatDistanceToNow(new Date(row.original.createdAt), {
                  addSuffix: true,
                })}
              </Typography>
            </Tooltip>
          </Box>
        ),
        filterFn: 'greaterThan',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
        minSize: 120,
        maxSize: 180,
        Cell: ({ row }) => getStatusChip(row.original.status),
        filterFn: 'equals',
        filterSelectOptions: [
          { text: 'Pending', value: CommentStatus.PENDING },
          { text: 'Approved', value: CommentStatus.APPROVED },
          { text: 'Rejected', value: CommentStatus.REJECTED },
        ],
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 300,
        minSize: 250,
        maxSize: 350,
        Cell: ({ row }) => renderActionButtons(row.original),
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [expandedComment]
  );

  const table = useMaterialReactTable({
    columns,
    data: comments,
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
    columnResizeMode: 'onChange',
    enableFullScreenToggle: true,
    enableColumnFilterModes: true,
    enableDensityToggle: true,
    positionGlobalFilter: 'left',
    muiSearchTextFieldProps: {
      placeholder: 'Search comments, users, or videos...',
      sx: { minWidth: '300px' },
      variant: 'outlined',
      size: 'small',
    },
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
          <Typography>Error loading comments. Please try again.</Typography>
        ) : (
          <Typography>No comments found</Typography>
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
    <Paper sx={{ overflow: 'hidden' }}>
      <MaterialReactTable table={table} />
    </Paper>
  );
}

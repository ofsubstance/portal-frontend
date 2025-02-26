import {
  Button,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  RiCheckLine as ApproveIcon,
  RiCloseLine as RejectIcon,
  RiEyeLine as ViewIcon,
  RiSearchLine as SearchIcon,
  RiFilterLine as FilterIcon,
  RiMoreLine as MoreIcon,
} from 'react-icons/ri';
import { CommentStatus } from '@/dtos/comment.dto';
import { formatDistanceToNow } from 'date-fns';
import { useCommentActions } from '@/hooks/useCommentActions';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

type SortDirection = 'asc' | 'desc';
type SortField = 'user' | 'video' | 'text' | 'date' | 'status';

export default function CommentManagementTable() {
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  const { allCommentsQuery, updateCommentStatusMutation } = useCommentActions();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sorting state
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filtering state
  const [statusFilter, setStatusFilter] = useState<CommentStatus | 'all'>(
    'all'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const comments = allCommentsQuery.data || [];
  const isLoading = allCommentsQuery.isLoading;

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Reset pagination when filters change
  useEffect(() => {
    setPage(0);
  }, [statusFilter, searchQuery]);

  // Filter and sort comments
  const filteredAndSortedComments = useMemo(() => {
    let result = [...comments];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((comment) => comment.status === statusFilter);
    }

    // Apply search filter (case insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (comment) =>
          comment.text.toLowerCase().includes(query) ||
          comment.user?.firstname?.toLowerCase().includes(query) ||
          comment.user?.lastname?.toLowerCase().includes(query) ||
          comment.video?.title?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'user':
          comparison = (a.user?.firstname || '').localeCompare(
            b.user?.firstname || ''
          );
          break;
        case 'video':
          comparison = (a.video?.title || '').localeCompare(
            b.video?.title || ''
          );
          break;
        case 'text':
          comparison = a.text.localeCompare(b.text);
          break;
        case 'date':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [comments, statusFilter, searchQuery, sortBy, sortDirection]);

  // Paginate comments
  const paginatedComments = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedComments.slice(
      startIndex,
      startIndex + rowsPerPage
    );
  }, [filteredAndSortedComments, page, rowsPerPage]);

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
      <div className="flex flex-wrap gap-2">
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
      </div>
    );
  };

  if (isLoading) {
    return (
      <Paper className="p-4">
        <Typography>Loading comments...</Typography>
      </Paper>
    );
  }

  if (comments.length === 0) {
    return (
      <Paper className="p-4">
        <Typography align="center">No comments found</Typography>
      </Paper>
    );
  }

  return (
    <Paper className="overflow-hidden">
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 border-b">
        <TextField
          placeholder="Search comments, users, or videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          className="w-full md:w-1/3"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <div className="flex items-center gap-2 w-full md:w-auto">
          <FilterIcon className="text-gray-500" />
          <Typography variant="body2" className="whitespace-nowrap">
            Filter by status:
          </Typography>
          <Select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as CommentStatus | 'all')
            }
            size="small"
            className="min-w-[120px]"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={CommentStatus.PENDING}>Pending</MenuItem>
            <MenuItem value={CommentStatus.APPROVED}>Approved</MenuItem>
            <MenuItem value={CommentStatus.REJECTED}>Rejected</MenuItem>
          </Select>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'user'}
                  direction={sortBy === 'user' ? sortDirection : 'asc'}
                  onClick={() => handleSort('user')}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'video'}
                  direction={sortBy === 'video' ? sortDirection : 'asc'}
                  onClick={() => handleSort('video')}
                >
                  Video
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'text'}
                  direction={sortBy === 'text' ? sortDirection : 'asc'}
                  onClick={() => handleSort('text')}
                >
                  Comment
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'date'}
                  direction={sortBy === 'date' ? sortDirection : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'status'}
                  direction={sortBy === 'status' ? sortDirection : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  {comment.user?.firstname} {comment.user?.lastname}
                </TableCell>
                <TableCell>
                  {comment.video?.title || `Video ID: ${comment.videoId}`}
                </TableCell>
                <TableCell>
                  {expandedComment === comment.id ? (
                    comment.text
                  ) : (
                    <div className="flex items-center">
                      {comment.text.length > 50
                        ? `${comment.text.substring(0, 50)}...`
                        : comment.text}
                      {comment.text.length > 50 && (
                        <Tooltip title="View full comment">
                          <IconButton
                            size="small"
                            onClick={() =>
                              setExpandedComment(
                                expandedComment === comment.id
                                  ? null
                                  : comment.id
                              )
                            }
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>{getStatusChip(comment.status)}</TableCell>
                <TableCell>{renderActionButtons(comment)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredAndSortedComments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}

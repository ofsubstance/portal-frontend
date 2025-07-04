import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
import { RiRefreshLine as RefreshIcon } from 'react-icons/ri';
import { ShareLinkAnalyticsDto } from '@/dtos/sharelink.dto';
import useShareLinkAction from '@/hooks/useShareLinkAction';
import {
  ShareLinkTableColumns,
  ShareLinkEngagementDetails,
} from '@/components/admin/sharelinks';
import mediaUploadImg from '@/assets/mediaUpload.svg';

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
    error,
    refetch,
  } = useShareLinkAnalyticsQuery();

  // Get columns from the component
  const columns = ShareLinkTableColumns();

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
    enableColumnResizing: false,
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
      placeholder: 'Search share links...',
      sx: { minWidth: '300px' },
      variant: 'outlined',
      size: 'small',
    },
    renderDetailPanel: ({ row }) => (
      <ShareLinkEngagementDetails shareLink={row.original} />
    ),
    renderEmptyRowsFallback: () => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          gap: 2,
        }}
      >
        {isLoading ? (
          <CircularProgress size={40} />
        ) : isError ? (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <Button onClick={() => refetch()} size="small">
                Retry
              </Button>
            }
          >
            {error?.message || 'Error loading share links'}
          </Alert>
        ) : (
          <>
            <Typography variant="h6" color="text.secondary">
              No Share Links Found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your first share link to start tracking analytics
            </Typography>
          </>
        )}
      </Box>
    ),
    muiTableContainerProps: {
      sx: {
        maxWidth: '100%',
        '& .MuiTableHead-root': {
          '& .MuiTableCell-head': {
            backgroundColor: 'grey.50',
            fontWeight: 600,
          },
        },
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 2,
      },
    },
    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 50,
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
    },
  });

  return (
    <Box sx={{ p: 0 }} className="flex flex-col gap-5">
      {/* Header Section */}
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Share Link Analytics
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track and analyze the performance of your shared video links
          </Typography>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
            disabled={isLoading}
            size="small"
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'primary.50',
              },
            }}
          >
            Refresh
          </Button>
          <object
            role="img"
            type="image/svg+xml"
            data={mediaUploadImg}
            className="max-h-48"
          />
        </Box>
      </Paper>

      {/* Table Section */}
      <MaterialReactTable table={table} />
    </Box>
  );
}

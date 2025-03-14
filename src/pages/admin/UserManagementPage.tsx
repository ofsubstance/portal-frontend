import { Chip, Paper, Typography } from '@mui/material';
import userManagementImg from '@/assets/userManagement.svg';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { adminUsers, AdminUser } from '@/data/adminUserData';
import { format } from 'date-fns';

const userColumns: MRT_ColumnDef<AdminUser>[] = [
  {
    accessorKey: 'index',
    header: '#',
    size: 60,
    Cell: ({ row }) => <span>{row.index + 1}</span>,
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'businessEmail',
    header: 'Business Email',
  },
  {
    accessorKey: 'mobilePhone',
    header: 'Mobile Phone',
  },
  {
    accessorKey: 'businessName',
    header: 'Business Name',
  },
  {
    accessorKey: 'website',
    header: 'Website',
    Cell: ({ row }) => (
      <a
        href={row.original.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {row.original.website}
      </a>
    ),
  },
  {
    accessorKey: 'stateRegion',
    header: 'State/Region',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'smsOptIn',
    header: 'SMS Opt In',
    Cell: ({ row }) => (
      <Chip
        label={row.original.smsOptIn ? 'Yes' : 'No'}
        color={row.original.smsOptIn ? 'success' : 'default'}
        variant="outlined"
        size="small"
      />
    ),
  },
  {
    accessorKey: 'emailOptIn',
    header: 'Email Opt In',
    Cell: ({ row }) => (
      <Chip
        label={row.original.emailOptIn ? 'Yes' : 'No'}
        color={row.original.emailOptIn ? 'success' : 'default'}
        variant="outlined"
        size="small"
      />
    ),
  },
  {
    accessorKey: 'usageIntent',
    header: 'Usage Of Substance',
  },
  {
    accessorKey: 'latestLoginDate',
    header: 'Last Login Date',
    Cell: ({ row }) => (
      <span>{format(row.original.latestLoginDate, 'MMM dd, yyyy')}</span>
    ),
  },
  {
    accessorKey: 'accountCreationDate',
    header: 'Account Creation Date',
    Cell: ({ row }) => (
      <span>{format(row.original.accountCreationDate, 'MMM dd, yyyy')}</span>
    ),
  },
  {
    accessorKey: 'contentEngagements30Days',
    header: 'Content Engagements (30 Days)',
    Cell: ({ row }) => (
      <span className="font-medium">
        {row.original.contentEngagements30Days}
      </span>
    ),
  },
  {
    accessorKey: 'linkShares30Days',
    header: 'Link Shares (30 Days)',
    Cell: ({ row }) => (
      <span className="font-medium">{row.original.linkShares30Days}</span>
    ),
  },
];

function UserManagementPage() {
  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            User Management
          </Typography>

          <Typography variant="subtitle1">
            Manage all the users in the system
          </Typography>
        </div>
        <object
          role="img"
          type="image/svg+xml"
          data={userManagementImg}
          className="max-h-48"
        />
      </Paper>

      <MaterialReactTable
        data={adminUsers}
        columns={userColumns}
        enableFullScreenToggle={true}
        enableColumnResizing
        enablePinning
        enableColumnFilters
        enableGlobalFilter
        enablePagination
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: '800px' } }}
        initialState={{
          density: 'compact',
          columnVisibility: {
            website: false,
            stateRegion: false,
            country: false,
          },
          pagination: {
            pageSize: 10,
            pageIndex: 0,
          },
        }}
      />
    </div>
  );
}

export default UserManagementPage;

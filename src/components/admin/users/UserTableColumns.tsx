import { Box, Typography, Chip, Avatar, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import { type MRT_ColumnDef } from 'material-react-table';
import { UserDto } from '@/dtos/user.dto';

export const userColumns: MRT_ColumnDef<UserDto>[] = [
  {
    accessorKey: 'firstname',
    header: 'Name',
    size: 200,
    Cell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {row.original.firstname[0]}
          {row.original.lastname[0]}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {row.original.firstname} {row.original.lastname}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.original.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorKey: 'profile.business_name',
    header: 'Business',
    size: 180,
    Cell: ({ row }) => (
      <Box>
        <Typography variant="body2" fontWeight={500}>
          {row.original.profile.business_name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.original.profile.state_region}, {row.original.profile.country}
        </Typography>
      </Box>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    size: 120,
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
    size: 120,
    Cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={row.original.status === 'active' ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  {
    accessorKey: 'last_login',
    header: 'Last Login',
    size: 140,
    Cell: ({ row }) => (
      <Box>
        <Typography variant="body2">
          {row.original.last_login
            ? format(new Date(row.original.last_login), 'MMM dd, yyyy')
            : 'Never'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.original.last_login
            ? format(new Date(row.original.last_login), 'HH:mm')
            : '-'}
        </Typography>
      </Box>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    size: 120,
    Cell: ({ row }) => (
      <Tooltip
        title={format(new Date(row.original.createdAt), 'MMM dd, yyyy HH:mm')}
      >
        <Typography variant="body2">
          {format(new Date(row.original.createdAt), 'MMM dd, yyyy')}
        </Typography>
      </Tooltip>
    ),
  },
];

import { Typography, Box, CircularProgress } from '@mui/material';
import userManagementImg from '@/assets/userManagement.svg';
import { MaterialReactTable } from 'material-react-table';
import { useEffect, useState } from 'react';
import userService from '@/services/user.service';
import { UserDto } from '@/dtos/user.dto';
import { userColumns, UserEngagementDetails } from '@/components/admin/users';

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, color: 'error.main' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <img
          src={userManagementImg}
          alt="User Management"
          style={{ width: 60, height: 60 }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and monitor user accounts, roles, and engagement metrics
          </Typography>
        </Box>
      </Box>

      <MaterialReactTable
        columns={userColumns}
        data={users}
        enableColumnResizing={false}
        enableColumnActions={false}
        enableHiding={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableGlobalFilter={true}
        enableSorting={true}
        enablePagination={true}
        enableRowSelection={false}
        enableColumnFilters={true}
        enableExpanding={true}
        getRowCanExpand={() => true}
        renderDetailPanel={({ row }) => (
          <UserEngagementDetails userId={row.original.id} user={row.original} />
        )}
        muiTableContainerProps={{
          sx: {
            minHeight: '400px',
          },
        }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        initialState={{
          pagination: {
            pageSize: 10,
            pageIndex: 0,
          },
          globalFilter: '',
        }}
        positionGlobalFilter="left"
        muiSearchTextFieldProps={{
          placeholder: 'Search users...',
          sx: { minWidth: '300px' },
        }}
      />
    </Box>
  );
}

import { Avatar, Chip, Paper, Typography } from "@mui/material";

import {
  RiEditLine as EditIcon,
  RiAdminLine as AdminIcon,
} from "react-icons/ri";
import userManagementImg from "@/assets/userManagement.svg";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_ColumnDef,
} from "material-react-table";
import { userList } from "@/data/dummyData";

type Playlist = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  contactNumber: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

const playlistColumns: MRT_ColumnDef<Playlist>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",

    Cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar src={row.original.avatar} variant="rounded" />
        <Typography variant="body2">
          {row.original.firstName} {row.original.lastName}
        </Typography>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "role",
    header: "Role",
    Cell: ({ row }) => {
      const role =
        row.original.role === "Admin"
          ? "Admin"
          : row.original.role === "User"
          ? "User"
          : "Guest";
      return (
        <Chip
          label={role}
          variant="outlined"
          color={
            role === "Admin" ? "error" : role === "User" ? "primary" : "default"
          }
          size="small"
        />
      );
    },
  },
];

function UserManagementPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-8 md:py-0 py-8">
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
        data={userList}
        columns={playlistColumns}
        enableFullScreenToggle={false}
        enableRowActions
        positionActionsColumn="last"
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/admin/profile/${row.original.id}`),
        })}
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EditIcon />}
            key="edit"
            label="Edit User"
            onClick={() => console.info("Edit")}
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<AdminIcon />}
            key="makeAdmin"
            label={
              row.original.role === "admin" ? "Remove Admin" : "Make Admin"
            }
            onClick={() => console.info("Delete")}
            table={table}
          />,
        ]}
      />
    </div>
  );
}

export default UserManagementPage;

import { Button, Paper, Typography } from "@mui/material";

import {
  RiPlayListAddLine as AddPlaylistIcon,
  RiEditLine as EditIcon,
  RiDeleteBin2Line as DeleteIcon,
} from "react-icons/ri";
import playlistManagementImg from "@/assets/playlistManagement.svg";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_ColumnDef,
} from "material-react-table";
import { playList } from "@/data/dummyData";
import dayjs from "dayjs";

type Playlist = {
  id: string;
  title: string;
  description: string;
  videoCount: number;
  createdAt: string;
  updatedAt: string;
};

const playlistColumns: MRT_ColumnDef<Playlist>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "videoCount",
    header: "Video Count",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    Cell: ({ row }) => dayjs(row.original.createdAt).format("MMMM DD, YYYY"),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    Cell: ({ row }) => dayjs(row.original.updatedAt).format("MMMM DD, YYYY"),
  },
];

function PlaylistManagementPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-8 md:py-0 py-8">
        <div className="space-y-4 text-slate-500">
          <Typography variant="h5" fontWeight={600}>
            Playlist Management
          </Typography>

          <Typography variant="subtitle1">
            Manage your video playlists or create new ones.
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddPlaylistIcon />}
            disableElevation
            size="large"
            fullWidth
            onClick={() => navigate("/playlist-management/create")}
          >
            Create New Playlist
          </Button>
        </div>
        <object
          role="img"
          type="image/svg+xml"
          data={playlistManagementImg}
          className="max-h-48"
        />
      </Paper>

      <MaterialReactTable
        data={playList}
        columns={playlistColumns}
        enableFullScreenToggle={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EditIcon />}
            key="edit"
            label="Edit"
            onClick={() => console.info("Edit")}
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<DeleteIcon />}
            key="delete"
            label="Delete"
            onClick={() => console.info("Delete")}
            table={table}
          />,
        ]}
      />
    </div>
  );
}

export default PlaylistManagementPage;

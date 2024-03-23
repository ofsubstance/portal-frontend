import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { RiPlayList2Fill as PlaylistIcon } from "react-icons/ri";

import {
  MaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowModel,
} from "material-react-table";
import { IVideo, vidoeList } from "@/data/dummyData";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(relativeTime);

const videoListColumns: MRT_ColumnDef<IVideo>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    Cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt={row.original.title}
        className="w-20 h-20 object-cover rounded-md"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "genre",
    header: "Genre",
    Cell: ({ row }) =>
      row.original.genre.map((g) => (
        <Chip
          key={g}
          label={g}
          size="small"
          variant="outlined"
          className="mr-1 mb-1"
        />
      )),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    Cell: ({ row }) => `${Math.floor(row.original.duration / 60)} min`,
  },
  {
    accessorKey: "createdAt",
    header: "Published At",
    Cell: ({ row }) => dayjs(row.original.createdAt).format("MMMM DD, YYYY"),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    Cell: ({ row }) => dayjs(row.original.updatedAt).fromNow(),
  },
];

function AddVideosToPlaylistDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <DialogTitle>Pick Videos To Add To Playlist</DialogTitle>
      <DialogContent>
        <MaterialReactTable
          data={vidoeList}
          columns={videoListColumns}
          enableRowSelection
          enableStickyHeader
          muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
          muiTablePaperProps={{
            sx: {
              boxShadow: "none",
            },
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={onClose}>
          Add Selected
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PlaylistInfoDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <DialogTitle>Playlist Information</DialogTitle>
      <DialogContent>
        <div className="space-y-4 py-1.5">
          <TextField label="Playlist Title" variant="outlined" fullWidth />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={onClose}>
          Create Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function PlaylistCreatePage() {
  const theme = useTheme();
  const [openVideosDialog, setOpenVideosDialog] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const [data, setData] = useState([]);

  const handleRemoveSelected = (selectedRows: MRT_RowModel<IVideo>) => {
    console.log(selectedRows);
  };

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="flex gap-2 justify-between md:flex-row flex-col items-center">
        <Typography variant="h5" fontWeight={600} className="text-slate-500">
          <PlaylistIcon
            className="inline-block mr-3"
            size={40}
            color={theme.palette.primary.main}
          />
          Create Playlist
        </Typography>

        <Button variant="contained" onClick={() => setOpenInfoDialog(true)}>
          Save Playlist
        </Button>
      </div>

      <PlaylistInfoDialog
        open={openInfoDialog}
        onClose={() => setOpenInfoDialog(false)}
      />

      <AddVideosToPlaylistDialog
        open={openVideosDialog}
        onClose={() => setOpenVideosDialog(false)}
      />

      <MaterialReactTable
        data={data}
        columns={videoListColumns}
        enableFullScreenToggle={false}
        enableRowSelection
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <div className="flex flex-wrap p-2 gap-4">
            <Button
              variant="contained"
              onClick={() => setOpenVideosDialog(true)}
            >
              Add Videos To Playlist
            </Button>

            <Button
              variant="contained"
              color={"error"}
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              onClick={() => handleRemoveSelected(table.getSelectedRowModel())}
            >
              Remove Selected From Playlist
            </Button>
          </div>
        )}
      />
    </div>
  );
}

export default PlaylistCreatePage;

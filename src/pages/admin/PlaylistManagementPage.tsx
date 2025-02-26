import { Button, Paper, Typography } from '@mui/material';

import playlistManagementImg from '@/assets/playlistManagement.svg';
import { ModalHookLayout } from '@/components/common/modal/ModalLayout';
import { PlaylistDto } from '@/dtos/playlist.dto';
import usePlaylistManagementActions from '@/hooks/usePlaylistManagementAction';
import { useModal } from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import {
  RiPlayListAddLine as AddPlaylistIcon,
  RiDeleteBin2Line as DeleteIcon,
  RiEditLine as EditIcon,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const playlistColumns: MRT_ColumnDef<PlaylistDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'tag',
    header: 'Tag',
  },
  {
    accessorKey: 'videos',
    header: 'Video Count',
    Cell: ({ row }) => row.original.videos.length,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    Cell: ({ row }) => dayjs(row.original.createdAt).format('MMMM DD, YYYY'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    Cell: ({ row }) => dayjs(row.original.updatedAt).format('MMMM DD, YYYY'),
  },
];

function PlaylistManagementPage() {
  const navigate = useNavigate();
  const modal = useModal(ModalHookLayout);
  const { usePlaylistsQuery, playlistDeleteMutation } =
    usePlaylistManagementActions();

  const { data: playList = [] } = usePlaylistsQuery();

  const handleDeletePlaylist = (playlistId: string) => {
    modal.show({
      title: 'Delete Playlist',
      children: (
        <Typography variant="h6">
          Are you sure you want to delete this playlist?
        </Typography>
      ),
      dialogActions: {
        confirmButtonProps: {
          text: 'Yes, Delete Playlist',
          color: 'error',
          onClick: () => {
            playlistDeleteMutation.mutate(playlistId);
            modal.hide();
          },
        },
        cancelButtonProps: {
          text: 'No, Cancel',
          onClick: () => modal.hide(),
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Playlist Management
          </Typography>

          <Typography variant="subtitle1">
            Manage your video playlists or create new ones.
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddPlaylistIcon />}
            size="large"
            fullWidth
            onClick={() => navigate('/admin/playlist-management/create')}
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
        muiTableBodyRowProps={({ row }) => ({
          onClick: () =>
            navigate(`/admin/playlist-management/${row.original.id}`),
        })}
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem
            icon={<EditIcon />}
            key="edit"
            label="Edit"
            onClick={() =>
              navigate(`/admin/playlist-management/edit/${row.original.id}`)
            }
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<DeleteIcon />}
            key="delete"
            label="Delete"
            onClick={() => handleDeletePlaylist(row.original.id)}
            table={table}
          />,
        ]}
      />
    </div>
  );
}

export default PlaylistManagementPage;

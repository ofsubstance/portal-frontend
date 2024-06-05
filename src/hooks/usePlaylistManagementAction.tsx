import { useMutation, useQuery } from "@tanstack/react-query";

import { PlaylistCreateDto } from "@/dtos/playlist.dto";
import { PlaylistTag } from "@/constants/enums";
import playlistManagementService from "@/services/playlist-management.service";

export default function usePlaylistManagementActions() {
  const playlistCreateMutation = useMutation({
    mutationFn: playlistManagementService.createPlaylist,
  });

  const usePlaylistsQuery = () =>
    useQuery({
      queryKey: ["getPlayLists"],
      queryFn: playlistManagementService.getPlaylists,
    });

  const usePlaylistQuery = (playlistId?: string) =>
    useQuery({
      enabled: !!playlistId,
      queryKey: ["getPlaylist", playlistId],
      queryFn: async () =>
        playlistId
          ? await playlistManagementService.getPlaylistById(playlistId)
          : undefined,
    });

  const usePlaylistTagQuery = (tag: PlaylistTag) =>
    useQuery({
      enabled: !!tag,
      queryKey: ["getPlaylistByTag", tag],
      queryFn: async () =>
        await playlistManagementService.getPlaylistByTag(tag),
    });

  const playlistUpdateMutation = useMutation({
    mutationFn: ({
      playlistId,
      data,
    }: {
      playlistId: string;
      data: PlaylistCreateDto;
    }) => playlistManagementService.updatePlaylist(playlistId, data),
  });

  const playlistDeleteMutation = useMutation({
    mutationFn: playlistManagementService.deletePlaylist,
  });

  return {
    playlistCreateMutation,
    usePlaylistsQuery,
    usePlaylistQuery,
    usePlaylistTagQuery,
    playlistUpdateMutation,
    playlistDeleteMutation,
  };
}

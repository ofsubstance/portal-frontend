import { PlaylistCreateDto, PlaylistDto } from "@/dtos/playlist.dto";

import APIUrl from "../constants/apiUrl";
import { IResponse } from "@/dtos/response.dto";
import { PlaylistTag } from "@/constants/enums";
import httpClient from "../utils/httpClient";

class PlaylistManagementService {
  async createPlaylist(data: PlaylistCreateDto) {
    const res = await httpClient.postForm<IResponse<PlaylistDto>>(
      APIUrl.playlistManagement.createPlaylist(),
      data
    );

    return res.data.body;
  }

  async getPlaylists() {
    const res = await httpClient.get<IResponse<PlaylistDto[]>>(
      APIUrl.playlistManagement.getPlaylists()
    );

    return res.data.body;
  }

  async getPlaylistById(playlistId: string) {
    const res = await httpClient.get<IResponse<PlaylistDto>>(
      APIUrl.playlistManagement.getPlaylistById(playlistId)
    );

    return res.data.body;
  }

  async getPlaylistByTag(tag: PlaylistTag) {
    const res = await httpClient.get<IResponse<PlaylistDto>>(
      APIUrl.playlistManagement.getPlaylistByTag(tag)
    );

    return res.data.body;
  }

  async updatePlaylist(playlistId: string, data: PlaylistCreateDto) {
    const res = await httpClient.patchForm<IResponse<PlaylistDto>>(
      APIUrl.playlistManagement.updatePlaylist(playlistId),
      data
    );

    return res.data.body;
  }

  async deletePlaylist(playlistId: string) {
    const res = await httpClient.delete<IResponse<PlaylistDto>>(
      APIUrl.playlistManagement.deletePlaylist(playlistId)
    );

    return res.data.body;
  }
}

export default new PlaylistManagementService();

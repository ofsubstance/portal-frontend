import { IResponse } from "@/dtos/response.dto";
import { UserDto } from "@/dtos/user.dto";
import APIUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import storageService from "./storage.service";

class UserService {
  async getCurrentUser() {
    const authData = storageService.getAuthData();
    if (!authData) return null;

    const res = await httpClient.get<IResponse<UserDto>>(APIUrl.user.getUser(authData?.user.id));

    storageService.setCurrentUser(res.data.body);

    return res.data.body;
  }
}

export default new UserService();

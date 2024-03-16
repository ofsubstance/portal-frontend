import APIUrl from "../constants/apiUrl";
import httpClient from "../utils/httpClient";
import storageService from "./storage.service";

class UserService {
  async getCurrentUser() {
    const authData = storageService.getAuthData();
    if (!authData) return null;

    const res = await httpClient.get(APIUrl.user.getUser(authData?.user.id));

    storageService.setCurrentUser(res.data);

    return res.data;
  }
}

export default new UserService();

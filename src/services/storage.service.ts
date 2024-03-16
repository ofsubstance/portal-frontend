import { SigninRes } from "@/dtos/auth.dto";

class StorageService {
  getAuthData() {
    const data = sessionStorage.getItem("auth") || localStorage.getItem("auth");

    if (!data) return null;

    return JSON.parse(data) as SigninRes & { remember: boolean };
  }

  setAuthData(authData: SigninRes, remember = false) {
    if (!remember)
      return sessionStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, remember })
      );

    return localStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, remember })
    );
  }

  getLocalRefreshToken() {
    const authData = this.getAuthData();
    return authData?.refresh_token;
  }

  removeAuthData() {
    sessionStorage.removeItem("auth");
    localStorage.removeItem("auth");
  }

  setCurrentUser(user: any) {
    const authData = this.getAuthData();

    if (authData?.remember)
      return localStorage.setItem(
        "auth",
        JSON.stringify({ ...authData, user })
      );

    return sessionStorage.setItem(
      "auth",
      JSON.stringify({ ...authData, user })
    );
  }

  getCurrentUser() {
    const authData = this.getAuthData();
    return authData?.user;
  }
}

export default new StorageService();

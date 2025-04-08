import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../config/API";
import { PAGES, STATUS_CODE } from "../config/Constant";
import { publicApiInstance, apiInstance } from "../config/AxiosConfig";

interface User {
  id: string;
  userName: string;
  email: string;
  avatarUrl: string;
  fullName: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  authTokens: string | null;
  loginUser: (username: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authTokens: null,
  loginUser: async () => {
    throw new Error("loginUser function not implemented");
  },
  logoutUser: () => {
    throw new Error("logoutUser function not implemented");
  },
});

import { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState<string | null>(() =>
    localStorage.getItem("refreshToken")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await publicApiInstance.post(API.Authentication.LOGIN, {
        username,
        password,
      });

      if (
        response.data.status === STATUS_CODE.SUCCESS &&
        response.status === STATUS_CODE.SUCCESS
      ) {
        const { accessToken, refreshToken } = response.data.objects;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAuthTokens(accessToken);

        await getUserInformation();

        navigate(PAGES.HOME_PAGE);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error(
        "Đăng nhập thất bại:",
        error.response?.data || error.message
      );
      return false;
    }
  };

  const getUserInformation = async () => {
    const userResponse = await apiInstance.get(API.User.GET_INFORMATION);

    if (userResponse.data.status === STATUS_CODE.SUCCESS) {
      setUser(userResponse.data.objects);
      console.log("Đăng nhập thành công:", userResponse.data.objects);
    }
  };

  const checkRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return logoutUser();

    try {
      const payload = JSON.parse(atob(refreshToken.split(".")[1]));
      const exp = payload.exp * 1000;

      if (exp < Date.now()) {
        console.warn("Refresh token đã hết hạn. Đăng xuất...");
        logoutUser();
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra refresh token:", error);
      logoutUser();
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(PAGES.LOGIN_PAGE);
  };

  useEffect(() => {
    const initAuth = async () => {
      await checkRefreshToken(); 
  
      if (user === null && authTokens !== null) {
        await getUserInformation(); 
      }
  
      setLoading(false);
    };
  
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

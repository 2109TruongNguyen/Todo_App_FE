import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../config/Constant";

export default function GoogleLoginHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access");
    const refresh = params.get("refresh");
    const error = params.get("error");

    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      //navigate(PAGES.HOME_PAGE);
      const domain =window.location.origin;
      window.location.href = domain+PAGES.HOME_PAGE;
    }

    if (error) {
      console.error(error);
      navigate(PAGES.LOGIN_PAGE, {
        state: { error: "Đăng nhập thất bại!" },
      });
    }
  }, []);

  return <p>Đang xử lý đăng nhập...</p>;
}

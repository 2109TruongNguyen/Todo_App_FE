import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/private/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import ScrollToTop from "../components/ScrollToTop";
import MainLayout from "../Layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import {PAGES} from "../config/Constant";
import ProfilePage from "../pages/private/ProfilePage";
import GoogleLoginHandler from "../pages/public/GoogleLoginHandler";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route path={PAGES.HOME_PAGE} element={<HomePage />} />
                <Route path={PAGES.PROFILE_PAGE} element={<ProfilePage />} />
              </Route>
            </Route>
            // Public Pages
            <Route path={PAGES.LOGIN_PAGE} element={<LoginPage />} />
            <Route path={PAGES.REGISTER_PAGE} element={<RegisterPage />} />
            <Route path={PAGES.GOOGLE_HANDLER} element={<GoogleLoginHandler />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

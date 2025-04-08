import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBInput,
  MDBTypography,
  MDBCheckbox,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";
import { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import { PAGES } from "../../config/Constant";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const errorNotification = (message: string) => toast.error(message);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      errorNotification("Tên đăng nhập không được để trống!");
      return;
    }
    if (!password) {
      errorNotification("Mật khẩu không được để trống!");
      return;
    }

    setLoading(true);
    const success = await loginUser(username, password);
    setLoading(false);

    if (!success) {
      errorNotification("Đăng nhập thất bại!");
    }
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #fbc2eb, #a6c1ee)" }}>
      <ToastContainer />
      <div className="d-flex shadow-lg bg-white rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="d-none d-md-flex flex-column justify-content-center align-items-center p-5 text-white" style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)", width: "50%" }}>
          <MDBTypography tag="h2" className="fw-bold">Welcome Back!</MDBTypography>
          <p className="text-center">Sign in to continue your journey with us.</p>
        </div>

        <MDBCard className="p-5 border-0" style={{ width: "50%" }}>
          <MDBCardBody>
            <div className="text-center mb-4">
              <img src="https://res.cloudinary.com/dkzn3xjwt/image/upload/v1744118798/c435280f-ab8c-478b-8a38-786fbd5e681a.png" alt="Logo" height="70" width="70" className="mb-2" />
              <MDBTypography tag="h4" className="fw-bold text-dark">Sign In</MDBTypography>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput className="mb-3" type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <MDBInput className="mb-3" type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <MDBRow className="mb-3">
                <MDBCol className="d-flex align-items-center">
                  <MDBCheckbox id="rememberMe" label="Remember me" defaultChecked />
                </MDBCol>
                <MDBCol className="text-end">
                  <a href="#" className="text-primary">Forgot password?</a>
                </MDBCol>
              </MDBRow>

              <MDBBtn type="submit" block size="lg" disabled={loading} className="mt-3 text-white fw-bold" style={{ backgroundColor: "#E74C3C", borderRadius: "6px" }}>
                {loading ? "Signing in..." : "Sign In"}
              </MDBBtn>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0 text-muted">
                Don't have an account? <a onClick={() => navigate(PAGES.REGISTER_PAGE)} className="fw-bold" style={{ color: "#E74C3C", cursor: "pointer" }}>Sign up</a>
              </p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}

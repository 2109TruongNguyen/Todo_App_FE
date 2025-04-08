import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    nickName: "",
  });
  const [loading, setLoading] = useState(false);

  const errorNotification = (message: string) => toast.error(message);
  const successNotification = (message: string) => toast.success(message);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.username) return "Tên người dùng không được để trống!";
    if (!formData.email || !formData.email.includes("@")) return "Email không hợp lệ!";
    if (formData.password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự!";
    if (formData.password !== formData.confirmPassword) return "Mật khẩu xác nhận không khớp!";
    if (!formData.firstName) return "Họ không được để trống!";
    if (!formData.lastName) return "Tên không được để trống!";
    if (!formData.nickName) return "Biệt danh không được để trống!";
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      errorNotification(errorMessage);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      successNotification("Đăng ký thành công!");
    }, 2000);
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #fbc2eb, #a6c1ee)" }}>
      <ToastContainer />
      <div className="d-flex shadow-lg bg-white rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        {/* Background section */}
        <div className="d-none d-md-flex flex-column justify-content-center align-items-center p-5 text-white" style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)", width: "50%" }}>
          <MDBTypography tag="h2" className="fw-bold">Welcome Back!</MDBTypography>
          <p className="text-center">Join us today and explore amazing features.</p>
        </div>
        
        {/* Form section */}
        <MDBCard className="p-5 border-0" style={{ width: "50%" }}>
          <MDBCardBody>
            <div className="text-center mb-4">
              <img src="/logo.png" alt="Logo" height="40" className="mb-2" />
              <MDBTypography tag="h4" className="fw-bold text-dark">Sign Up</MDBTypography>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput className="mb-3" type="text" label="Username" name="username" value={formData.username} onChange={handleChange} required />
              <MDBInput className="mb-3" type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required />
              <MDBInput className="mb-3" type="password" label="Password" name="password" value={formData.password} onChange={handleChange} required />
              <MDBInput className="mb-3" type="password" label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              <MDBInput className="mb-3" type="text" label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <MDBInput className="mb-3" type="text" label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              <MDBInput className="mb-3" type="text" label="Nick Name" name="nickName" value={formData.nickName} onChange={handleChange} required />
              
              <MDBBtn type="submit" block size="lg" disabled={loading} className="mt-3 text-white fw-bold" style={{ backgroundColor: "#E74C3C", borderRadius: "6px" }}>
                {loading ? "Registering..." : "Sign Up"}
              </MDBBtn>
            </form>
            <div className="text-center mt-3">
              <p className="mb-0 text-muted">
                Already have an account? <a href="/login" className="fw-bold" style={{ color: "#E74C3C" }}>Log in</a>
              </p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { apiInstance } from "../../config/AxiosConfig";

function HomePage() {
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async () => {
    try {
      const response = await apiInstance.post(
        `/api/categories/create/${categoryName}`
      );

      console.log(response.data);
    } catch (error) {
      console.error("Create category failed:", error);
    }
  };
  return (
    <MDBCard>
      <MDBCardHeader>Tạo Danh Mục</MDBCardHeader>
      <MDBCardBody>
        <MDBInput
          label="Tên danh mục"
          type="text"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <MDBBtn color="primary" onClick={handleCreateCategory}>
          Primary
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}
export default HomePage;

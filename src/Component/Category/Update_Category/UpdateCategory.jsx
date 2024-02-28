



import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import Footer from '../../MainComponent/Footer/Footer';

function UpdateCategory() {
  const navigate = useNavigate();
  const { tctgid } = useParams();
  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks } = useTheme();

  const imageurl = `https://www.crystalsolutions.com.pk/csart/ctgImg/`;

  const [user, setUser] = useState({
    tctgid: '',
    tctgdsc: '',
    remarks:'',
    ctindexs:'',
    tctgsts: '',
    tctgpic: '',

  });

  useEffect(() => {
    fetch(
      `https://www.crystalsolutions.com.pk/csart/get_category.php?tctgid=${tctgid}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tctgid === tctgid);
        setUser(user);
        setPreviewImage(user.tctgpic ? imageurl + user.tctgpic : '');


      })
      .catch((error) => console.error(error));
  }, [tctgid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const [values, setValues] = useState({
    FCtgDscc: "",
    FCtgStss: "",
    pic1 : '',
    loading: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  

  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic1-preview");
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }


  const UserId = 33;
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // setUsers(userData);
      console.log(userData);
      console.log("user id is", userData.tusrid);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = new FormData();
    requestBody.append("FCtgDsc", user.tctgdsc);
    requestBody.append("remarks", user.remarks);
    requestBody.append("index", user.ctindexs);
    requestBody.append("FCtgSts", user.tctgsts);
    requestBody.append("FCtgId", user.tctgid);
    requestBody.append("pic1", selectedImage1);
    // if (selectedImage1) {
    //   requestBody.append("pic1", selectedImage1);
    // }

    axios
      .post(
        `https://www.crystalsolutions.com.pk/csart/update_category.php?tctgid=${tctgid}`,
        requestBody
      )
      
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/GetCategory");
          }, 1000);
          
        } else {
          console.log(response.data.message);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };


  
  useEffect(() => {
    if (selectedImage1) {
      document.getElementById("pic1-preview").src = URL.createObjectURL(selectedImage1);
    }
  }, [selectedImage1]);


  return (
    <>
       <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%", 
              zIndex: 1000,
              textAlign: "center", 
            }}
          >
            {alertData.message}
          </Alert>
        )}
<Header />

<PathHead pageName="File > Category Maintenance > Add Category" screen='Get_Item' pageLink="/GetCategory"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold', fontFamily: 'Verdana'}}>
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div className="col-md-12 form-container"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "100%",
            maxWidth: "600px",
            margin: "20px 0",
            fontSize:'12px'
          }}
          >
            <Form onSubmit={handleSubmit}>
            <div className="row">
  {/* Left side (label and input field) */}
  <div className="col-6">
  <br />
  <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: '58px' }}>Id :</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder=" Id"
         className="form-control"
         name="tctgid"
         value={user.tctgid}
         style={{height:'20px', width:'70px' }}
         onChange={handleInputChange}
         disabled
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px' }}>Description:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="Description"
        className="form-control"
        name="tctgdsc"
        value={user.tctgdsc}
        style={{height:'20px', width:'270px'}}
        onChange={handleInputChange}
      />
    </Form.Group>
   
    <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '37px' }}>Index:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="Index"
        className="form-control"
        name="ctindexs"
        value={user.ctindexs}
        style={{height:'20px', width:'70px' }}
        onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '17px', marginLeft: '33px', textAlign: 'right' }}>Status:</Form.Label>
     <Form.Control

as="select"

  name="tctgsts"
  value={user.tctgsts}
  onChange={handleInputChange}
  className="form-control"
  style={{ height: '27px', fontSize: '11px', width: '70px', marginLeft: '-3%' }}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</Form.Control>

    </Form.Group>

    <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '17px' }}>Remarks:</Form.Label>
      <Form.Control
         as="textarea" // Set the input type to textarea
         rows={4} // Specify the number of rows (adjust as needed)
        id="code"
        placeholder="Remarks"
        className="form-control"
        name="remarks"
        value={user.remarks}
        style={{ width:'270px' }}
        onChange={handleInputChange}
      />
    </Form.Group>

    {/* <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '22px' }}>Remarks:</Form.Label>
  <Form.Control
    as="textarea" // Set the input type to textarea
    rows={4} // Specify the number of rows (adjust as needed)
    placeholder="Remarks"
    name="itmremarks"
    className="form-control"
    value={user.remarks}
    style={{ width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group> */}
  </div>

  {/* Right side (picture code) */}
  <div className="col-6">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1, marginRight: '-20px', textAlign: 'center' }}>
        <label htmlFor="pic" style={{ display: 'block', marginBottom: '10px' }}>Category Pic: </label>
        <label
                      htmlFor="pic1"
                      style={{ cursor: "pointer", display: "block" }}
                    >
                       <div
    style={{
      width: "100px",
      height: "100px",
      border: "2px dashed #bbb",
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "100px",
    }}
  >
    <span
      style={{
        fontSize: "14px",
        color: "#aaa",
        marginBottom: "5px",
      }}
    >
      Click to Upload
    </span>
    <img
      id="pic1-preview"
      src={previewImage1}
      alt="Category"
      style={{ width: '100%', height: '60px' }}
    />
    <input
      type="file"
      id="pic1"
      style={{ display: "none" }}
      onChange={handleImageChange1}
    />
  </div>
                    </label>
      </div>
    </div>
  </div>
</div>
<br />
<Button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "25%",
                      marginRight: "2%",
                    }}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button>
                  {/* <Button
                className="btn btn-primary"
                onClick={() => navigate("/GetCategory")}
                style={{
                  backgroundColor: primaryColor,
                  height: "4%",
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "25%",
                  marginRight: "2%",
                }}
              >
                Return
              </Button> */}
              </Form>
          </div>
        </div>
        <br />
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default UpdateCategory;
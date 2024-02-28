
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../../MainComponent/Header/Header';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from '../../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../../ThemeContext';
import Footer from '../../../MainComponent/Footer/Footer';

function Add_Location() {
  const [values, setValues] = useState({
    lodscc: '',
    lostss:'',
     
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor,secondaryColor,apiLinks } = useTheme();


  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById('pic-preview'); // Replace 'image1-preview' with the actual ID of your preview element
      imgElement.src = URL.createObjectURL(file);
    }
  }

const UserId =33;


  
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      lostss: selectedStatus,
    
  };
   
   
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append('lodsc', values.lodscc);
      formData.append('losts', value.lostss);

      axios
        .post(
          `${apiLinks}/add_location.php`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        // .then((res) => {
        //   console.log(res);
        // });
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_Location");
            }, 3000);
            
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

      // Reset form values after submission
      setValues({
        FCtgDscc: '',
        lostss: '',
        loading: false,
      });

      setAlert('Image uploaded successfully.');
    } catch (error) {
      setAlert('Error uploading image.');
      console.error(error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
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

<PathHead pageName="File > Location Maintenance > Add Location" />

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold' }}>
        

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
            maxWidth: "400px",
            margin: "20px 0",
            fontSize:'12px'
          }}
          >
            <Form onSubmit={handleFormSubmit}>
            <div className="row">
  {/* Left side (label and input field) */}
  <div className="col-12">
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px' }}>Description:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Description"
        name="lodscc"
        value={values.lodscc}
        onChange={handleInputChange}
        style={{ height: '20px', width: '270px' }}
      />
    </Form.Group>
    
    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '13px', marginLeft: '25px', textAlign: 'right' }}>Status:</Form.Label>
      <Form.Control
        as="select"
        name="lostss"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        style={{ height: '30px', width: '100px', fontSize: '11px' }}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </Form.Control>
    </Form.Group>
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
                    onClick={handleFormSubmit}
                  >
                    SUBMIT
                  </Button>
                  <Button
                className="btn btn-primary"
                onClick={() => navigate("/Get_Location")}
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
              </Button>
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

export default Add_Location;
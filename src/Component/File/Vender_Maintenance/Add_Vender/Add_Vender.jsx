


import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
// import './Item.css';

function Add_Vender() {
  const [values, setValues] = useState({
    descriptionn: "",
    addresss: "",
    mobilee:'',
    emaill:'',
    jazzcashh:'',
    banknamee: "",
    acc_titlee: "",
    acc_codee:" ",
   
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus2, setSelectedStatus2] = useState("Yes");

  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [selectedUnitId, setSelectedUnitId] = useState("Startup");

  const [alertData, setAlertData] = useState(null);
  const { secondaryColor ,apiLinks } = useTheme();

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [selectedUnit, setSelectedUnit] = useState("Quantity");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  const { primaryColor } = useTheme();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(file);
      const imgElement = document.getElementById("pic2-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  const handleImageChange3 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage3(file);
      const imgElement = document.getElementById("pic3-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  {/* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.crystalsolutions.com.pk/csart/get_category.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const apiData = await response.json();
        setData(apiData);
  
        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedCategoryId(apiData[0].tctgid);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.crystalsolutions.com.pk/malikspicy/get_uom.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const apiData = await response.json();
        setData1(apiData);
  
        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedUnitId(apiData[0].uomid);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  const UserId = 33;

  const [nextItemId, setNextItemId] = useState(''); // Initialize the next TItmId


  {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const value = {
      itemStss: selectedStatus,
      categoryIdd: selectedStatus1,
      typee: selectedType,
      titmspll:selectedStatus2,
    };
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      // formData.append("itmId", values.itemid);  
      formData.append("description", values.descriptionn);
      formData.append("address", values.addresss);
      formData.append("mobile", values.mobilee);
      formData.append("email", values.emaill);

      formData.append("jazzcash", values.jazzcashh);
      formData.append("bankname", values.banknamee);
      formData.append("acc_title", values.acc_titlee);
      formData.append("acc_code", values.acc_codee);
    



  
      // console.log("FormData data:");
      // console.log("itmId:", nextItemId);
      // console.log("itemDsc:", values.itemDscc);
      // console.log("itemDscUrd:", values.itemDscUrdd);
      // console.log("itmremarks:", values.itmremarkss);
      // console.log("itmindex:", values.itmindexx);
      // console.log("itemSts:", value.itemStss);
      // console.log("purRate:", values.purRatee);
      // console.log("saleRate:", values.saleRatee);
      // console.log("discont:", values.discontt);
      // console.log("categoryId:", selectedCategoryId);
      // console.log("type:", value.typee);
      // console.log("titmspl:", value.titmspll);
      // console.log("pic:", selectedImage1);
      // console.log("pic2:", selectedImage2);
      // console.log("pic3:", selectedImage3);

      // formData.append('FUsrId', UserId);
      const response = await axios.post(
        `https://crystalsolutions.com.pk/csart/AddVender.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/json;charset=UTF-8', 
        },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          navigate("/Get_Vender");
          console.log('response data show',response);

          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 1000);
          
        }
         else {
          console.log(response.data.message);
          console.log('response data show',response);

          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
        }
        navigate("/Add_Vender");

      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

      console.log(response.data); 
      // Reset form values after submission
      setValues({
        descriptionn: "",
        addresss: "",
        mobilee:'',
        emaill:'',
        jazzcashh:'',
        banknamee: "",
        acc_titlee: "",
        acc_codee:" ",
        categoryIdd: data.length > 0 ? data[0].tctgid : "", // Set the initial value for categoryIdd
        typee: "Item Purchase", 
        uomm: data1.length > 0 ? data1[0].uomid : "",// Set the initial value for typee
        pic: "",
        loading: true,
      });
      setSelectedStatus("Yes"); // Set the initial value for selectedStatus
      setSelectedStatus1(""); // Set the initial value for selectedStatus1
      setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup");
      setSelectedUnitId(data1.length > 0 ? data1[0].uomid : "KG"); // Set the initial value for selectedCategoryId
      // Set the initial value for selectedCategoryId
      setSelectedType("Item Purchase"); // Set the initial value for selectedType
      setSelectedUnit("Quantity");
      setSelectedImage1(null); // Clear the selected image
  
      setAlert("Image uploaded successfully.");
      navigate("/Add_Vender");
      window.location.reload();

    } catch (error) {
      console.error("Error uploading image:", error);
      setAlert("Error uploading image.");
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };
  
  ////////////////////////get item id show them in inout field//////////////////////////
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.crystalsolutions.com.pk/csart/get_item.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const apiData = await response.json();
        setItem(apiData);

        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(...apiData.map((item) => parseInt(item.TItmId)));
        // Set the nextItemId to be one greater than the maximum TItmId
        setNextItemId(maxItemId + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Function to handle adding new data
  const handleAddData = () => {
    const newData = {
      TItmId: String(nextItemId), // Convert to string
      // Add other properties as needed
    };

    // Update the state with the new data
    setItem([...item, newData]);

    // Increment the nextItemId for the next addition
    setNextItemId(nextItemId + 1);
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
<Header  />

<PathHead pageName="File > Vender Maintenance > Add Item" screen="Item"  pageLink="/Get_Vender"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold', fontFamily: 'Verdana' }}>
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
            overflowY: "scroll", // Enable vertical scrolling
            height: "calc(100vh - 200px)", // Set an appropriate height
          }}
        >
          <div className="col-md-12 form-container"
           style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "100%",
            maxWidth: "500px",
            margin: "20px 0",
            fontSize: '12px'
          }}
          >
            <Form onSubmit={handleFormSubmit}>
            <div className="row">
  {/* Left side (label and input field) */}
  <div className="col-12">
    <br />
  





<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '20px' }}>Description:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Description"
    name="descriptionn"
    className="form-control"
    value={values.descriptionn}
    style={{ height: '20px', width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group>
<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '42px' }}>Address:</Form.Label>
  <Form.Control
    type="text"
    placeholder="House Address"
    name="addresss"
    className="form-control"
    value={values.addresss}
    style={{ height: '20px', width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group>
<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '42px' }}>Mobile#:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Mobile No."
    name="mobilee"
    className="form-control"
    value={values.mobilee}
    style={{ height: '20px', width: '110px' }}
    onChange={handleInputChange}
  />
</Form.Group>

<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '2px' }}>Email Address:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Email Address"
    name="emaill"
    className="form-control"
    value={values.emaill}
    style={{ height: '20px', width: '170px' }}
    onChange={handleInputChange}
  />
</Form.Group>
<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '32px' }}>Jazz Cash:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Jazz Cash"
    name="jazzcashh"
    className="form-control"
    value={values.jazzcashh}
    style={{ height: '20px', width: '170px' }}
    onChange={handleInputChange}
  />
</Form.Group>
<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '20px' }}>Bank Name:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Bank Name"
    name="banknamee"
    className="form-control"
    value={values.banknamee}
    style={{ height: '20px', width: '200px' }}
    onChange={handleInputChange}
  />
</Form.Group>
{/* <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '10px' }}>Account Title:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Account Title"
    name="acc_titlee    "
    className="form-control"
    value={values.acc_titlee}
    style={{ height: '20px', width: '200px' }}
    onChange={handleInputChange}
  />
</Form.Group> */}

<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '6px' }}>Account Title:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Account Title"
    name="acc_titlee"
    className="form-control"
    value={values.acc_titlee}
    style={{ height: '20px', width: '200px' }}
    onChange={handleInputChange}
  />
</Form.Group>


<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '6px' }}>Account Code:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Account Code"
    name="acc_codee"
    className="form-control"
    value={values.acc_codee}
    style={{ height: '20px', width: '200px' }}
    onChange={handleInputChange}
  />
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
                  {/* <Button
                className="btn btn-primary"
                onClick={() => navigate("/Get_Item")}
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

export default Add_Vender;


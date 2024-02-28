


import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import '../Add Item/Item.css';

function Item() {
  const [values, setValues] = useState({
    itemid: "",
    itemDscc: "",
    itemDscUrdd:'',
    itmremarkss:'',
    itmindexx:'',
    itemStss: "",
    purRatee: "",
    discontt:" ",
    saleRatee: "",
    categoryIdd: "",
    typee: "",
    titmspll:'',
    pic:'',
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
      formData.append("itemDsc", values.itemDscc);
      formData.append("itemDscUrd", values.itemDscUrdd);
      formData.append("itmremarks", values.itmremarkss);
      formData.append("itmindex", values.itmindexx);

      formData.append("itemSts", value.itemStss);
      formData.append("purRate", values.purRatee);
      formData.append("saleRate", values.saleRatee);
      formData.append("discont", values.discontt);
      formData.append("categoryId", selectedCategoryId); 
      // formData.append("type", value.typee);
      formData.append("titmspl", value.titmspll);
      formData.append("pic", selectedImage1); 
      formData.append("pic2", selectedImage2); 
      formData.append("pic3", selectedImage3); 



  
      console.log("FormData data:");
      console.log("itmId:", nextItemId);
      console.log("itemDsc:", values.itemDscc);
      console.log("itemDscUrd:", values.itemDscUrdd);
      console.log("itmremarks:", values.itmremarkss);
      console.log("itmindex:", values.itmindexx);
      console.log("itemSts:", value.itemStss);
      console.log("purRate:", values.purRatee);
      console.log("saleRate:", values.saleRatee);
      console.log("discont:", values.discontt);
      console.log("categoryId:", selectedCategoryId);
      console.log("type:", value.typee);
      console.log("titmspl:", value.titmspll);
      console.log("pic:", selectedImage1);
      console.log("pic2:", selectedImage2);
      console.log("pic3:", selectedImage3);

      // formData.append('FUsrId', UserId);
      const response = await axios.post(
        `https://www.crystalsolutions.com.pk/csart/add_item.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data",
          // 'Content-Type': 'application/json;charset=UTF-8', 
        },
        }
      )
      .then((response) => {
        if (response.data.error === 200) {
          navigate("/Get_Item");
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
        navigate("/Item");

      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

      console.log(response.data); 
      // Reset form values after submission
      setValues({
        itemid: "",
        itmindex:'',
        itmremarks:'',
        itemDscc: "",
        itemDscUrdd:"",
        itmremarkss:'',
        itemStss: "Yes", // Set the initial value for itemStss
        purRatee: "",
        discontt: "", // Set the initial value for discontt
        saleRatee: "",
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
      navigate("/Item");
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

<PathHead pageName="File > Item Maintenance > Add Item" screen="Item"  pageLink="/Get_Item"/>

      <div className="col-12" style={{ color: 'black' ,fontFamily: 'Verdana', fontWeight:'bold' }}>
        

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
            maxWidth: "600px",
            margin: "20px 0",
            fontSize: '12px'
          }}
          >
            <Form onSubmit={handleFormSubmit}>
            <div className="row">
  {/* Left side (label and input field) */}
  <div className="col-6">
    <br />
  
{/* <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-2%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '1px' }}>De Code:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Design Code"
    name="itemDscc"
    className="form-control"
    value={values.itemDscc}
    style={{ height: '20px', width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group> */}




<Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px' }}>Design Code:</Form.Label>
      <Form.Control
    type="text"
    placeholder="Design Code"
    name="itemDscc"
    className="form-control"
    value={values.itemDscc}
    style={{ height: '20px', width: '170px' }}
    onChange={handleInputChange}
  />
    </Form.Group>
<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-2%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '6px' }}>Description:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Description"
    name="itemDscc"
    className="form-control"
    value={values.itemDscc}
    style={{ height: '20px', width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group>
<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-2%' }}>
  <Form.Control
    type="text"
    placeholder="تفصیل"
    name="itemDscUrdd"
    className="form-control"
    value={values.itemDscUrdd}
    style={{ height: '20px', width: '210px', textAlign: 'right', marginLeft: '96px', marginRight: '10px' }}
    onChange={handleInputChange}
  />
  <Form.Label style={{ marginRight: '30px' }}>تفصیل</Form.Label>
</Form.Group>



<Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center', marginTop: '-1%'  }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '22px', textAlign: 'right' }}>Category:</Form.Label>
      <Form.Control


as="select"

        name="categoryIdd"
        onChange={(e) => {
          setSelectedCategoryId(e.target.value);
        }}
        id="categoryIdd"
        style={{ height: '27px', fontSize: '11px', width: '120px'}}
        className="form-control"
      >
        {data.map((item) => (
      <option
        key={item.tctgid}
        value={item.tctgid}
      >
        {item.tctgdsc}
      </option>
    ))}
      </Form.Control>
    </Form.Group>

<Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '42px' }}>Index:</Form.Label>
  <Form.Control
    type="text"
    placeholder="index"
    name="itmindexx"
    className="form-control"
    value={values.itmindexx}
    style={{ height: '20px', width: '70px' }}
    onChange={handleInputChange}
  />
</Form.Group>

    
<Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '38px', textAlign: 'right' }}>Status:</Form.Label>
  <Form.Control
    as="select"
    name="itemStss"
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="form-control custom-select"
    style={{ height: '27px', fontSize: '11px', width: '70px' }}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </Form.Control>
</Form.Group>


    
{/* 
    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '38px', textAlign: 'right' }}>Type:</Form.Label>
      <Form.Control
         as="select"

        name="typee"
        value={selectedType } // Set the default value to "Item Purchase"
        onChange={(e) => setSelectedType(e.target.value)}
        className="form-control"
        style={{ height: '27px', fontSize: '11px', width: '120px' }}
      >
      <option value="Item Purchase">Item Purchase</option>
      <option value="Item Sale">Item Sale</option>
      </Form.Control>
    </Form.Group> */}


    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft:'-5px',  textAlign: 'right' }}>Special Offer:</Form.Label>
      <Form.Control
   as="select"
  name="titmspll"
  value={selectedStatus2}
  onChange={(e) => setSelectedStatus2(e.target.value)}
  className="form-control custom-select" // Add the custom CSS class 'custom-select'
  style={{ height: '27px', fontSize: '11px', width: '70px' }}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</Form.Control>
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '22px' }}>Pur Rate:</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder="Purchase  "
         name="purRatee"
         className="form-control"
         value={values.purRatee || ".00"}
         style={{height:'20px', width:'80px' ,fontSize:'12px',textAlign: 'right',}}
         onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '17px' }}>Disc Rate:</Form.Label>
      <Form.Control
         type="text"
         id="code"
         placeholder="Discount Rate"
         name="discontt"
         className="form-control"
         defaultValue=".00" // Use defaultValue instead of value
         style={{
           height: '20px',
           width: '80px',
           fontSize: '12px',
           textAlign: 'right',
         }}
         onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '17px' }}>Sale Rate:</Form.Label>
      <Form.Control
          type="text"
          id="code"
          placeholder="Sale Rate"
          name="saleRatee"
          className="form-control"
          value={values.saleRatee || ".00"}
          style={{
            height: '20px',
            width: '80px',
            fontSize: '12px',
            textAlign: 'right', // Align text to the right
          }}
          onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '22px' }}>Remarks:</Form.Label>
  <Form.Control
    as="textarea" // Set the input type to textarea
    rows={4} // Specify the number of rows (adjust as needed)
    placeholder="Remarks"
    name="itmremarkss"
    className="form-control"
    value={values.itmremarkss}
    style={{ width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group>

  </div>

  {/* Right side (picture code) */}
  <div className="col-6">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1, marginRight: '-20px', textAlign: 'center' }}>
        <label htmlFor="pic" style={{ display: 'block', marginBottom: '10px' }}> Item Pic: </label>
        <label htmlFor="pic" style={{ display: "block" }}>
                      <div
                        style={{
                          width: "35%",
                          height: "70px",
                          marginLeft: "40%",
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            // fontSize: "14px",
                            color: "#aaa",
                            marginBottom: "1%",
                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic" style={{ cursor: "pointer" }}>
                          <img
                            id="pic-preview"
                            src=""
                            alt="Upload"
                            style={{
                              width: "70px",
                              height: "40px",
                              display: "block",
                            }}
                          />
                          <input
                            type="file"
                            id="pic"
                            style={{ display: "none" }}
                            onChange={handleImageChange1}
                          />
                        </label>
                      </div>
                    </label>
      </div>
    </div>




    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1, marginRight: '-20px', textAlign: 'center' }}>
        <label htmlFor="pic2" style={{ display: 'block', marginBottom: '10px' }}> Item Pic: </label>
        <label htmlFor="pic2" style={{ display: "block" }}>
                      <div
                        style={{
                          width: "35%",
                          height: "70px",
                          marginLeft: "40%",
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            // fontSize: "14px",
                            color: "#aaa",
                            marginBottom: "1%",
                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic2" style={{ cursor: "pointer" }}>
                          <img
                            id="pic2-preview"
                            src=""
                            alt="Upload"
                            style={{
                              width: "70px",
                              height: "40px",
                              display: "block",
                            }}
                          />
                          <input
                            type="file"
                            id="pic2"
                            style={{ display: "none" }}
                            onChange={handleImageChange2}
                          />
                        </label>
                      </div>
                    </label>
      </div>
    </div>



    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1, marginRight: '-20px', textAlign: 'center' }}>
        <label htmlFor="pic3" style={{ display: 'block', marginBottom: '10px' }}> Item Pic: </label>
        <label htmlFor="pic3" style={{ display: "block" }}>
                      <div
                        style={{
                          width: "35%",
                          height: "70px",
                          marginLeft: "40%",
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          // justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            // fontSize: "14px",
                            color: "#aaa",
                            marginBottom: "1%",
                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic3" style={{ cursor: "pointer" }}>
                          <img
                            id="pic3-preview"
                            src=""
                            alt="Upload"
                            style={{
                              width: "70px",
                              height: "40px",
                              display: "block",
                            }}
                          />
                          <input
                            type="file"
                            id="pic3"
                            style={{ display: "none" }}
                            onChange={handleImageChange3}
                          />
                        </label>
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

export default Item;


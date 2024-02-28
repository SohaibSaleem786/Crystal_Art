import React, { useState, useEffect ,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import PathHead from "../../../MainComponent/PathHead/PathHead";

import axios from "axios";
import Alert from "@mui/material/Alert";
import { useData } from "../../../../DataContext";
import { useParams } from "react-router-dom";

import { RowIdContext } from "../../../../createContext";
import { Container, Row, Col, Form } from 'react-bootstrap';


import {
    Card,
    // Row,
    // Col,
    
    Button,
    FormControl,
    InputGroup,
  } from "react-bootstrap";
  // import { Form } from 'react-bootstrap';
import { useTheme } from "../../../../ThemeContext";
import { useLocation } from 'react-router-dom';


const Order_View = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
 const { updateOrderData } = useData(); 
 const { id } = useParams();
 const [getOrderNum, setOrderdatainto] = useState();

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor ,secondaryColor} = useTheme();
  const { apiLinks } = useTheme();
  const [alertData, setAlertData] = useState(null);


  const handleMenuItemClick = () => {
    navigate("/Item");
  };
  const [getUser, setUser] = useState();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);   
  const imageurl = `${apiLinks}/itemimage/`;
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = () => {
    fetch(`${apiLinks}/OrderList.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id: item.id,
          torddat: item.torddat,
          tordtim: item.tordtim,
          tcstnam: item.tcstnam,
          tmobnum: item.tmobnum,
          tordamt: item.tordamt,
          tordsts: item.tordsts,
          tordrsvdt :item.tordrsvdt,
          tordrinpro :item.tordrinpro,
          tcuteml:item.tcuteml,
          torddisp :item.torddisp,
          tdlvdat :item.tdlvdat,
          tordadd:item.tordadd,
          torddsc:item.torddsc,
          titmqnt:item.titmqnt,
        }));
  
        const columns = [
          { label: "Sr.", field: "id", sort: "asc" },
          { label: "Ord ID", field: "id", sort: "asc" },
          { label: "Date", field: "torddat", sort: "asc" },
          { label: "Time", field: "tordtim", sort: "asc" },
          { label: "Customer Name", field: "tcstnam", sort: "asc" },
          { label: "Mobile", field: "tmobnum", sort: "asc" },
          { label: "Amount", field: "tordamt", sort: "asc" },
          { label: "Status", field: "tordsts", sort: "asc" },
          { label: "Update Date", field: "tedtdat", sort: "asc" },
          { label: "Receive", field: "tedtdat", sort: "asc" },
        ];
  
        setData({ columns, rows: transformedData });
        setDataFetched(true);
        if (apiData.length > 0) {
          const lastId = apiData[apiData.length - 1].id; // Increment the last ID by 1
          console.log('Last ID:', lastId);
          setOrderdatainto(lastId);
        } else {
          console.log('apiData is empty');
        }
        console.log('dsfsdfsd', apiData.length);
        updateOrderData(apiData.length);
      })
      .catch((error) => console.error(error));
  };
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function
//   const filteredRows = data.rows.filter((row) =>
  // (row.tcstnam && row.tcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
  // (row.tmobnum && row.tmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
  // (row.tordsts && row.tordsts.toLowerCase().includes(searchText.toLowerCase()))
// );
const [selectedOption, setSelectedOption] = useState('All'); // Initialize with 'All' or any default value

const handleSelectOption = (event) => {
  setSelectedOption(event.target.value);
};
const filteredRows1 = data.rows.filter((row) => row.id === id);

const filteredRows = data.rows.filter((row) =>
  (selectedOption === 'All' || row.tordsts === selectedOption) &&
  (
    (row.tcstnam && row.tcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
    (row.tmobnum && row.tmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
    (row.tordsts && row.tordsts.toLowerCase().includes(searchText.toLowerCase()))
  )
);


   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////New ORder id generate ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const [Orderid, setOrderId] = useState(""); 
 const [refreshKey, setRefreshKey] = useState(0);

   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////status change ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const handleReceivedChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderReceived.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
      console.error("Error:", error);
    });
};

const handleOrderInProcessChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderInProcess.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
      console.error("Error:", error);
    });
};
const handleOrderDispatchChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderDispatch.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
      console.error("Error:", error);
    });
};
const handleOrderDeliveredChange = (orderid) => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/OrderDelivered.php`;
  const data = {
    orderId: orderid,
  };

console.log('orderi d is this',orderid)

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('order sataus update is', response.data);

       



        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
        fetchData();
        // Do not navigate here

        // Update the DataContext with the new row.id value
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
      console.error("Error:", error);
    });
};





//////////////////////////// usecontext to store the row id ////////////////////////////////
const { setRowId } = useContext(RowIdContext);

// // Assuming row.id is set somewhere in your component
// const rowId = row.id; 

// Use setRowId to update the context when navigating to the next screen
const handleLinkClick = (rowId) => {
  setRowId(rowId);
};
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const [newOrderData, setNewOrderData] = useState(null);
const handleNewOrderClick = () => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/NewOrder.php`;
  const data = {
    userid: getUser.id,
  };

  console.log(getUser.id);

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('Response Data:', response.data);

        const newOrder = {
          id: response.data.message,
        };
        const jsonString = JSON.stringify(newOrder);

        // Log the new order data
        console.log('this is or JSON variable:', jsonString);
        console.log('New Order Data:', newOrder);

        setNewOrderData(newOrder); // Store the new order data
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });

        // Do not navigate here

        // Update the DataContext with the new row.id value
        handleLinkClick1(newOrder.id);
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
      console.error("Error:", error);
    });
};

const handleLinkClick1 = (rowId) => {
  setRowId(rowId);
};
useEffect(() => {
  if (newOrderData) {
    navigate(`/Order_Category/${newOrderData.id}`);
  }
}, [newOrderData]);


// Log newOrderData outside the function
console.log('Outside handleNewOrderClick:', newOrderData);
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
function formatCurrency(amount) {
  // Format the amount as currency with two decimal places
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}


const [selectedOptions, setSelectedOptions] = useState([]);
// Define the 'index' variable if needed
const index = 0;




return (
  <>
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    }}>
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

      <Header Orderid={Orderid}/>
      <PathHead pageName="Transaction > Order Tracking > View" screen='Get_Item' pageLink="/Order_Tracking"/>
    <br /><br /><br />
      <div style={{ 
      fontFamily: 'Verdana',

      fontSize: '12px', 
      width: '100%', 
      overflowX: 'auto',
      display: 'flex',
      justifyContent:'center',
      alignItems: 'start',
      height: '100vh',
    }}>
      <form style={{ 
        width: '60%',
        padding: '20px',
        border: '2px solid #007BFF',
        borderRadius: '10px',
        background: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        color:'black'
      }}>
        {filteredRows1.map((row, index) => (
          
          <Row key={index} style={{ marginBottom: '20px' ,fontWeight:'bold'}}>
          <Col xs={12} md={5} style={{ marginBottom: '10px' ,textAlign:'right',fontWeight:'bold'}}>
            <Form>
            

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Id:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.id} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Name:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tcstnam} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Description:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.torddsc} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Date:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={formatDate(row.torddat)} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Time:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tordtim} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Mobile:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tmobnum} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Email:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tcuteml} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Ord Status:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tordsts} />
                </Col>
              </Form.Group>
            </Form>
          </Col>

          <Col xs={12} md={7} style={{ marginBottom: '10px' ,textAlign:'right',fontWeight:'bold'}}>
            <Form>
              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Quantity:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.titmqnt} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Amount:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tordamt} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Order Receive:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tordrsvdt} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Order Inprocess:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tordrinpro} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Order Dispatch:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.torddisp} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Order Delivered:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tdlvdat} />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column xs={6} sm={4}>
                  Address:
                </Form.Label>
                <Col xs={6} sm={8}>
                  <Form.Control readOnly value={row.tordadd} />
                </Col>
              </Form.Group>

              
            </Form>
          </Col>
        </Row>
        
        ))}
      </form>
    </div>

        <Footer />
     
      </div>
    </>
  );
};

export default Order_View;





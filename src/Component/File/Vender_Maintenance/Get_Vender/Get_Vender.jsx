import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from '../../../../image/edit.png';
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import './Get_Vender.css'
const Get_Vender = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor ,secondaryColor} = useTheme();
  const { apiLinks } = useTheme();
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;

  const handleMenuItemClick = () => {
    navigate("/Add_Vender");
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
  useEffect(() => {
    fetch(`https://www.crystalsolutions.com.pk/csart/GetVender.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          
          id : item.id,
          description: item.description,
          address: item.address,
          mobile: item.mobile,
          email: item.email,
          jazzcash: item.jazzcash,
          bankname: item.bankname,
          acc_title:item.acc_title,
          acc_code:item.acc_code,

           
        }));

        const columns = [
          { label: "Sr#", field: "id", sort: "asc" },
          { label: "Desription ", field: "description", sort: "asc" },
          { label: "Address ", field: "address", sort: "asc" },
          { label: "Mobile", field: "mobile", sort: "asc" },
          { label: "Email", field: "email", sort: "asc" },
          { label: "Jazz Cash ", field: "jazzcash", sort: "asc" },
          { label: "Bank Name", field: "bankname", sort: "asc" },
          { label: "Account Title", field: "acc_title", sort: "asc" },
          { label: "Account Code", field: "acc_code", sort: "asc" },

       


        ];

        setData({ columns, rows: transformedData });

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  const filteredRows = data.rows.filter((row) =>
  (row.description?.toLowerCase() || "").includes(searchText.toLowerCase())
);





  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Vender/${row.id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.id);
    }
  };

  
  return (
    <>
      <Header />
      <PathHead pageName="File > Vender Maintenance" screen='Get_Item' pageLink="/MainPage"/>

      <div className="col-12" style={{ color: secondaryColor}}>
        

        <br />
        <div className="Item-container" 
        style={{ marginLeft: "5%",marginRight: "5%", fontFamily: 'Verdana',  maxWidth: "100%" }}
        >
          
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  marginBottom: '10px',
                }}
                onClick={handleMenuItemClick}
              >
                ADD
              </Button>
            </Col>
            {/* <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                onClick={() => navigate("/MainPage")}
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '100%',
                  marginBottom: '10px',
                }}
              >
                Return
              </Button>
            </Col> */}
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 8 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
            <MDBTable
              scrollY
              maxHeight="25rem"
              striped
              bordered
              small
              responsive
            >
           
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{backgroundColor: primaryColor,color:secondaryColor, fontWeight: "bold",position: "sticky",
                      top: -1,
                      zIndex: 1 }}
                    >
                      {column.label}
                    </th>
                  ))}
                  
                </tr>
              </MDBTableHead>






              <MDBTableBody>
      {filteredRows.map((row, index) => (
        <tr key={index} onClick={() => handleRowClick(row)}>
          {Object.keys(row).map((key, columnIndex) => {
            if (columnIndex === 9 || columnIndex === 10 || columnIndex === 11) {
              // Skip rendering these columns
              return null;
            }

            return (
              <td
                key={key}
                style={{
                  textAlign:
                    columnIndex === 1  || columnIndex === 2 || columnIndex === 4 || columnIndex === 6 || columnIndex === 7
                      ? 'left'
                      // :   columnIndex === 6
                      // ? 'right'
                      : 'center'
                      ,

                  // width:
                  //   columnIndex === 0
                  //     ? '1%'
                  //     : columnIndex === 1
                  //     ? '25%'
                  //     : columnIndex === 2
                  //     ? '25%'
                  //     : columnIndex === 3
                  //     ? '1%'
                  //     : columnIndex === 4
                  //     ? '12%'
                  //     : columnIndex === 5
                  //     ? '12%'
                  //     : columnIndex === 6
                  //     ? '12%'
                  //     : 'auto',
                }}
              >
                {key === 'tusrpwd' ? '*****' : row[key]}
              </td>
            );
          })}
        </tr>
      ))}
    </MDBTableBody>






            </MDBTable>
          </div>
        </div>

        <Footer />
      </div>


    </>
  );
};

export default Get_Vender;
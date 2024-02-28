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
import '../Get Item/Get_Item.css'
const Get_Item = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor ,secondaryColor} = useTheme();
  const { apiLinks } = useTheme();
  const imageurl = `https://www.crystalsolutions.com.pk/csart/itemimage/`;

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
  useEffect(() => {
    fetch(`https://crystalsolutions.com.pk/csart/get_item.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id : item.id,
            TItmDsc: item.TItmDsc,
            itmdscurd: item.itmdscurd,
            // itmremarks: item.itmremarks,
            TItmSts: item.TItmSts,
            TPurRat: item.TPurRat,
            itmdis: item.itmdis,
            TSalRat: item.TSalRat,
            // tctgdsc : item.tctgdsc,
            // TItmPic: item.TItmPic,
            // TItmPic2:item.TItmPic2,
            // TItmPic3:item.TItmPic3
        }));

        const columns = [
          { label: "Sr#", field: "id", sort: "asc" },
          { label: "Desription ", field: "TItmDsc", sort: "asc" },
          { label: "تفصیل ", field: "itmdscurd", sort: "asc" },
          // { label: "Remarks ", field: "itmremarks", sort: "asc" },


          { label: "Status", field: "TItmSts", sort: "asc" },
          { label: "Cost", field: "TPurRat", sort: "asc" },
          { label: "Sale ", field: "TSalRat", sort: "asc" },
          { label: "Discount", field: "itmdis", sort: "asc" },
          // { label: "Category", field: "tctgdsc", sort: "asc" },
          // { label: "Pic ", field: "TItmPic", sort: "asc" },
          // { label: "Pic ", field: "TItmPic", sort: "asc" },

          // { label: "Pic ", field: "TItmPic", sort: "asc" },

          // { label: "Edit ", field: "tedtdat", sort: "asc" },


        ];

        setData({ columns, rows: transformedData });

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  const filteredRows = data.rows.filter((row) =>
  (row.TItmDsc?.toLowerCase() || "").includes(searchText.toLowerCase())
);


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Item/${row.id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.id);
    }
  };

  
  return (
    <>
      <Header />
      <PathHead pageName="File > Item Maintenance" screen='Get_Item' pageLink="/MainPage"/>

      <div className="col-12" style={{ color: secondaryColor}}>
        

        <br />
        <div className="Item-container" 
        style={{ marginLeft: "20%", marginRight: "20%", maxWidth: "60%" }}
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
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 7 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <div style={{ fontSize: '12px', fontFamily: 'Verdana', width: '100%', overflowX: 'auto' }}>
            <MDBTable
              scrollY
              maxHeight="25rem"
              striped
              bordered
              small
              responsive
            >
              {/* <MDBTableHead columns={data.columns} /> */}
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
                    columnIndex === 1
                      ? 'left'
                      : columnIndex === 2 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6
                      ? 'right'
                      : 'center',

                  width:
                    columnIndex === 0
                      ? '1%'
                      : columnIndex === 1
                      ? '25%'
                      : columnIndex === 2
                      ? '25%'
                      : columnIndex === 3
                      ? '1%'
                      : columnIndex === 4
                      ? '12%'
                      : columnIndex === 5
                      ? '12%'
                      : columnIndex === 6
                      ? '12%'
                      : 'auto',
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

export default Get_Item;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Header from '../../MainComponent/Header/Header';
import Footer from '../../MainComponent/Footer/Footer';
import PathHead from '../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../ThemeContext';
import Edit from '../../../image/edit.png';
import './GetCategory.css';

const GetCategory = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.crystalsolutions.com.pk/csart/get_category.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        setData(await response.json());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleMenuItemClick = () =>  navigate('/AddCategory');

  const buttonStyle = {
    backgroundColor: primaryColor,
    height: '4%',
    fontSize: '11px',
    color: secondaryColor,
    width: '15%',
    marginRight: '2%',
  };

  const tableCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: 'bold',
    position: 'sticky',
    top: -1,
    zIndex: 1,
  };

  const filteredData = data.filter((item) =>
    item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
  );


  
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (item) => {
    if (selectedRow === item.tctgid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/UpdateCategory/${item.tctgid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(item.tctgid);
    }
  };
  return (
    <>
      <Header />
      <PathHead pageName="File > Category Maintenance" screen='Get_Item' pageLink="/MainPage" />
      <div className="col-12">
        <br />
        <br />
        <div className="col-12 button-container" style={{ fontFamily: 'Verdana'}}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={handleMenuItemClick}
              style={buttonStyle}
            >
              ADD
            </button>
            {/* <button
              className="btn btn-primary"
              onClick={() => navigate('/MainPage')}
              style={buttonStyle}
            >
              Return
            </button> */}
            <div style={{ marginLeft: 'auto' }}>
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
          </div>
          <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
            <MDBTable scrollY maxHeight="400px" striped bordered small responsive>
              <MDBTableHead>
                <tr>
                  <th style={tableCellStyle}>Sr#</th>
                  <th style={tableCellStyle}>Index</th>
                  <th style={tableCellStyle}>Description</th>
                  <th style={tableCellStyle}>Remarks</th>
                  <th style={tableCellStyle}>Status</th>
                  {/* <th style={tableCellStyle}>Picture</th>
                  <th style={tableCellStyle}>Edit</th> */}
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {filteredData.map((item) => (
                  <tr key={item.tctgid} onClick={() => handleRowClick(item)}>
                    <td>{item.tctgid}</td>
                    <td>{item.ctindexs}</td>
                    <td style={{ textAlign: 'left' ,width: '25%'}}>{item.tctgdsc}</td>
                    <td style={{ textAlign: 'left' }}>{item.remarks}</td>
                    <td>{item.tctgsts}</td>
                    {/* <td style={{ width: '7%' }}>
                      <img
                        src={`https://www.crystalsolutions.com.pk/csart/ctgImg/${item.tctgpic}`}
                        alt="Category"
                        style={{ width: '50px', height: '25px' }}
                      />
                    </td> */}
                    {/* <td style={{ width: '7%' }}>
                      <div>
                        <Link to={`/UpdateCategory/${item.tctgid}`}>
                          <img
                            src={Edit}
                            alt="Login"
                            className="login-image"
                            style={{ height: '25px', width: '55%' }}
                          />
                        </Link>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetCategory;





// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
// import Header from '../../MainComponent/Header/Header';
// import Footer from '../../MainComponent/Footer/Footer';
// import PathHead from '../../MainComponent/PathHead/PathHead';
// import { useTheme } from '../../../ThemeContext';
// import Edit from '../../../image/edit.png';
// import './GetCategory.css';

// import { connect } from 'react-redux';
// import { fetchCategories } from '../../../Redux/Action'; // Update the path to your action file

// const GetCategory = ({ categories, fetchCategories }) => {
//   const navigate = useNavigate();
//   const { primaryColor, secondaryColor, apiLinks } = useTheme();

//   const [filterValue, setFilterValue] = useState('');

//   useEffect(() => {
//     fetchCategories(); // Dispatch the action to fetch data
//   }, [fetchCategories]);

//   const handleMenuItemClick = () => navigate('/AddCategory');

//   const buttonStyle = {
//     backgroundColor: primaryColor,
//     height: '4%',
//     fontSize: '11px',
//     color: secondaryColor,
//     width: '15%',
//     marginRight: '2%',
//   };

//   const tableCellStyle = {
//     backgroundColor: primaryColor,
//     color: secondaryColor,
//     fontWeight: 'bold',
//     position: 'sticky',
//     top: -1,
//     zIndex: 1,
//   };

//   const filteredData = categories.filter((item) =>
//     item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
//   );

//   return (
//     <>
//       <Header />
//       <PathHead pageName="File > Category Maintenance" />
//       <div className="col-12">
//         <br />
//         <br />
//         <div className="col-12 button-container">
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <button
//               className="btn btn-primary"
//               onClick={handleMenuItemClick}
//               style={buttonStyle}
//             >
//               ADD
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={() => navigate('/MainPage')}
//               style={buttonStyle}
//             >
//               Return
//             </button>
//             <div style={{ marginLeft: 'auto' }}>
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="form-control"
//                 value={filterValue}
//                 onChange={(e) => setFilterValue(e.target.value)}
//               />
//             </div>
//           </div>
//           <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
//             <MDBTable scrollY maxHeight="400px" striped bordered small responsive>
//               <MDBTableHead>
//                 <tr>
//                   <th style={tableCellStyle}>ID</th>
//                   <th style={tableCellStyle}>Index</th>
//                   <th style={tableCellStyle}>Description</th>
//                   <th style={tableCellStyle}>Remarks</th>
//                   <th style={tableCellStyle}>Status</th>
//                   <th style={tableCellStyle}>Picture</th>
//                   <th style={tableCellStyle}>Edit</th>
//                 </tr>
//               </MDBTableHead>

//               <MDBTableBody>
//                 {filteredData.map((item) => (
//                   <tr key={item.tctgid}>
//                     <td>{item.tctgid}</td>
//                     <td>{item.ctindexs}</td>
//                     <td style={{ textAlign: 'left' }}>{item.tctgdsc}</td>
//                     <td style={{ textAlign: 'left' }}>{item.remarks}</td>
//                     <td>{item.tctgsts}</td>
//                     <td style={{ width: '15%' }}>
//                       <img
//                         src={`${apiLinks}/ctgImg/${item.tctgpic}`}
//                         alt="Category"
//                         style={{ width: '50px', height: 'auto' }}
//                       />
//                     </td>
//                     <td style={{ width: '15%' }}>
//                       <div>
//                         <Link to={`/UpdateCategory/${item.tctgid}`}>
//                           <img
//                             src={Edit}
//                             alt="Login"
//                             className="login-image"
//                             style={{ height: '5%', width: '25%' }}
//                           />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </MDBTableBody>
//             </MDBTable>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   categories: state.categories,
// });

// const mapDispatchToProps = {
//   fetchCategories,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(GetCategory);

// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import Header from "../../../MainComponent/Header/Header";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PathHead from "../../../MainComponent/PathHead/PathHead";
// import { useTheme } from "../../../../ThemeContext";
// import Footer from "../../../MainComponent/Footer/Footer";

// function Update_Item() {
//   const navigate = useNavigate();
//   const { TItmId } = useParams();
//   const [alertData, setAlertData] = useState(null);

//   const [previewImage1, setPreviewImage] = useState('');
//   const [previewImage2, setPreviewImage2] = useState('');
//   const [previewImage3, setPreviewImage3] = useState('');
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   const { secondaryColor ,apiLinks} = useTheme();

//   const imageurl = `${apiLinks}/itemimage/`;
//   const [data, setData] = useState([]);
//   const { primaryColor } = useTheme();

//   const [user, setUser] = useState({
   
//     TItmId :'',
// TItmDsc:'',
// itmdscurd:'',
// uom:'',
// TItmSts:'',
// TPurRat:'',
// TSalRat:'',
// TCtgId :'',
// TitmTyp:'',
// TItmPic:'',
// itmdis:'',
//   });

//   useEffect(() => {
//     fetch(
//       `${apiLinks}/get_item.php?TItmId=${TItmId}`
//     )
//       .then((response) => response.json())
//       .then((apiData) => {
//         const user = apiData.find((item) => item.TItmId === TItmId);
//         setUser(user);
//         setPreviewImage(user.TItmPic ? imageurl + user.TItmPic : '');
  

//       })
//       .catch((error) => console.error(error));
//   }, [TItmId]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

  
//   const [values, setValues] = useState({
//     itmIdd: "",
//     itemDscc: "",
//     itmdscurd:'',
//     itemStss: "",
//     purRatee: "",
//     saleRatee: "",
//     categoryIdd: "",
//     discountt:"",
//     typee: "",
//     pic : '',
//     loading: false,
//   });

//   const [selectedStatus, setSelectedStatus] = useState("");

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
// //   const [selectedImage2, setSelectedImage2] = useState(null);
// //   const [selectedImage3, setSelectedImage3] = useState(null);

//   function handleImageChange1(event) {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage1(file);
//       const imgElement = document.getElementById("pic-preview");
//       if (imgElement) {
//         imgElement.src = URL.createObjectURL(file);
//       }
//     }
//   }


//   const UserId = 33;
//   useEffect(() => {
//     // Retrieve user data from local storage
//     const userData = JSON.parse(localStorage.getItem("user"));

//     if (userData) {
//       // setUsers(userData);
//       console.log(userData);
//       console.log("user id is", userData.tusrid);
//     } else {
//       // Handle cases when user data is not available
//       console.error("User data not available in local storage.");
//     }
//   }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${apiLinks}/get_category.php`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         setData(apiData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();


//     return () => {
//     };
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
  
//     const FSinUsr = 33; // Your user ID logic here
  
//     const requestBody = new FormData();
//     requestBody.append("itmId", user.TItmId);
//     requestBody.append("itemDsc", user.TItmDsc);
//     requestBody.append("uom", user.uom);
//     requestBody.append("itemSts", user.TItmSts);
//     requestBody.append("purRate", user.TPurRat);
//     requestBody.append("saleRate", user.TSalRat);
//     requestBody.append("discont", user.itmdis);
//     requestBody.append("categoryId", user.TCtgId);

//     // requestBody.append("categoryId", selectedCategoryId);
//     requestBody.append("type", user.TitmTyp);
 
//     requestBody.append("pic", selectedImage1);


//     axios
//       .post(
//         `${apiLinks}/update_item.php?TItmId=${TItmId}`,
//         requestBody
//       )
//       .then((response) => {
//         if (response.data.error === 200) {
//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//             navigate("/Get_Item");
//           }, 1000);
          
//         } else {
//           console.log(response.data.message);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });
//   };
  

  
//   useEffect(() => {
//     if (selectedImage1) {
//       document.getElementById("pic-preview").src = URL.createObjectURL(selectedImage1);
//     }
//   }, [selectedImage1]);


//   return (
//     <>
//      <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%", 
//               zIndex: 1000,
//               textAlign: "center", 
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//          <Header />
        
//         <PathHead pageName="File > Item Maintenance > Update Item" />

//       <div className="col-12" >
       
//         <div
//           className="row"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "5px",
//             backgroundColor: "#f5f5f5",
//             minHeight: "100vh",
//           }}
//         >
//           <div
//             className="col-md-12"
//             style={{
//               backgroundColor: "#fff",
//               borderRadius: "10px",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//               padding: "10px",
//               width: "100%",
//               maxWidth: "600px",
//               margin: "20px 0",
//             }}
//           >
//             <form
//               onSubmit={handleSubmit}
//               style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold'}}
//             >
//               <div className="form-group" >


//                <div className="row">

//                 <div className="col-6">

//                 <div className="row">
//                 <div className="col-md-4" >
//                     <label htmlFor="code">Id :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder=" Id"
//                       className="form-control"
//                       name="TItmId"
//                       value={user.TItmId}
//                       style={{height:'20px', width:'70px',marginLeft: "-3%" }}
//                       onChange={handleInputChange}
//                       disabled
//                     />
//                   </div>

                  

                  
//                 </div>
// <div className="row">
// <div className="col-md-4" >
//                     <label htmlFor="code">Description :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Description"
//                       className="form-control"
//                       name="TItmDsc"
//                       value={user.TItmDsc}
//                       style={{height:'20px', width:'270px',marginLeft: "-3%" }}
//                       onChange={handleInputChange}
//                     />
//                   </div>
// </div>

// <div className="row">
//                 <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="تفصیل"
//                       name="itmdscurd"
//                       className="form-control"
//                       value={user.itmdscurd}
//                       style={{height:'20px', width:'210px' ,textAlign:'right' ,marginLeft:'90px'}}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div className="col-md-4" >
//                     <label htmlFor="code" style={{marginLeft:'120px'}} >:تفصیل</label>
//                   </div>
                  
                 
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code">Remarks :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Remarks"
//                       name="itemRmkss"
//                       className="form-control"
//                       value={values.itemRmkss}
//                       style={{height:'20px', width:'270px' ,marginLeft: "-3%"}}
//                       onChange={handleInputChange}
//                     />
//                   </div>
                 
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code">Index No. :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Index No."
//                       name="itemIndexx"
//                       className="form-control"
//                       value={values.itemIndexx}
//                       style={{height:'20px', width:'70px' ,marginLeft: "-3%"}}
//                       onChange={handleInputChange}
//                     />
//                   </div>
                 
//                 </div>
//                 <div className="row">
//                 <div className="col-md-4">
//                     <label htmlFor="TItmSts">Status :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <select
//                       name="TItmSts"
//                       value={user.TItmSts}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       style={{height:'27px', fontSize:'11px', width:'70px',marginLeft: "-3%" }}
//                     >
//                       <option value="">Select Type</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="row">
//                 <div className="col-md-4">
//                     <label htmlFor="uom">UOM:</label>
//                   </div>
//                   <div className="col-md-8">
//                     <select
//                       name="uom"
//                       value={user.uom}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       style={{height:'27px', fontSize:'11px', width:'100px',marginLeft: "-3%" }}
//                     >
//                      <option value="Number">Number</option>
//       <option value="KG">KG</option>
//       <option value="Liter">Liter</option>
//       <option value="Gram">Gram</option>
//       <option value="Half">Half</option>
//       <option value="Full">Full </option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-4" >
//                     <label htmlFor="code">Pur Rate :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Purchase Rate"
//                       className="form-control"
//                       name="TPurRat"
//                       value={user.TPurRat}
//                       style={{height:'20px', width:'80px',marginLeft: "-3%",textAlign:'right' }}
//                       onChange={handleInputChange}
//                     />
//                   </div>

                  
//                 </div>
//                 <div className="row">
//                 <div className="col-md-4" >
//                     <label htmlFor="code">Sale Rate :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Sale Rate"
//                       className="form-control"
//                       name="TSalRat"
//                       value={user.TSalRat}
//                       style={{height:'20px', width:'80px' ,marginLeft: "-3%",textAlign:'right'}}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//               <div className="col-md-4" >
//                     <label htmlFor="code">Disc Rate :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <input
//                       type="text"
//                       id="code"
//                       placeholder="Discount Rate"
//                       className="form-control"
//                       name="itmdis"
//                       value={user.itmdis}
//                       style={{height:'20px', width:'80px',marginLeft: "-3%",textAlign:'right' }}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//               </div>
                
// <div className="row">
//                 <div className="col-md-4">
//                     <label htmlFor="TCtgId">Category :</label>
//                   </div>
//                   <div className="col-md-8">
//                   <select
//     name="categoryId"
//     value={user.TCtgId}
//     onChange={(e) => {
//       // setSelectedCategoryId(e.target.value);
//       setUser((prevUser) => ({
//         ...prevUser,
//         TCtgId: e.target.value,
//       }));
//     }}
//     style={{height:'27px', fontSize:'11px', width:'110px',marginLeft: "-3%" }}
//     id="categoryIdd"
//     className="form-control"
//   >
//     {data.map((item) => (
//       <option
//         key={item.tctgid}
//         value={item.tctgid}
//       >
//         {item.tctgdsc}
//       </option>
//     ))}
//   </select>
//                   </div>
//                 </div>
             
//                 <div className="row">
//                 <div className="col-md-4">
//                     <label htmlFor="TitmTyp">Item Type :</label>
//                   </div>
//                   <div className="col-md-8">
//                     <select
//                       name="TitmTyp"
//                       value={user.TitmTyp}
//                       onChange={handleInputChange}
//                       className="form-control"
//                       style={{height:'27px', fontSize:'11px', width:'100px',marginLeft: "-3%" }}
//                     >
//                       <option value="Item Sale">Item Sale</option>
//                       <option value="Item Purchase">Item Purchase</option>
//                     </select>
//                   </div>
//                 </div>

              
              
//                 </div>


//                 <div className="col-6">
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     marginBottom: "30px",
//                   }}
//                 >
                  
//                   <div
//                     style={{
//                       flex: 1,
//                       textAlign: "center",
//                     }}
//                   >
//                     <label
//                       htmlFor="pic"
//                       style={{
//                         display: "block",
//                         marginBottom: "10px",
//                         marginLeft:'15%'
//                       }}
//                     >
//                       Item Pic:
//                     </label>
//                     <label
//                       htmlFor="pic"
//                       style={{ cursor: "pointer", display: "block" }}
//                     >
//                       <div
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           marginLeft:'45%',
//                           border: "2px dashed #bbb",
//                           borderRadius: "5px",
//                           display: "flex",
//                           flexDirection: "column",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <span
//                           style={{
//                             color: "#aaa",
//                             marginBottom: "5px",
//                           }}
//                         >
//                           Click to Upload
//                         </span>
//                         <label htmlFor="pic" style={{ cursor: "pointer" }}>
//           <img
//             id="pic-preview"
//             src={previewImage1}  
//             alt="Category"
//             style={{ width: '100%', height: '60px' }}
//           />
//           <input
//             type="file"
//             id="pic"
//             style={{ display: "none" }}
//             onChange={handleImageChange1}
//           />
//         </label>
//                       </div>
//                     </label>
//                   </div>




                 


//                 </div>
//                 </div>
//                </div>

//                 {/* ///////////////////////////////////////////         picture//////////////////////////// */}
              
//                 <br />
//                 <div style={{ marginRight: "300px" }}>
//                   <button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "4%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "45%",
//                       marginRight: "2%",
//                     }}
//                     onClick={handleSubmit}
//                   >
//                     SUBMIT
//                   </button>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => navigate("/Get_Item")}
//                     style={{
//                       backgroundColor: primaryColor,
//                       height: "4%",
//                       fontSize: "11px",
//                       color: secondaryColor,
//                       width: "45%",
//                       marginRight: "2%",
//                     }}
//                   >
//                     Return
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//         <br />
//       </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default Update_Item;










import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";

function Update_Item() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alertData, setAlertData] = useState(null);

  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { secondaryColor ,apiLinks} = useTheme();

  const imageurl = `https://crystalsolutions.com.pk/csart/itemimage/`;
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();

  const [user, setUser] = useState({
   
    id :'',
TItmDsc:'',
itmdscurd:'',
itmremarks:'',
itmindex:'',
uom:'',
TItmSts:'',
TPurRat:'',
TSalRat:'',
TCtgId :'',
TitmTyp:'',
TItmPic:'',
itmdis:'',
TItmPic1:'',
TItmPic2:'',
TItmPic3:'',
  });

  useEffect(() => {
    fetch(
      `https://crystalsolutions.com.pk/csart/get_item.php?id=${id}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.id === id);
        setUser(user);
        setPreviewImage(user.TItmPic ? imageurl + user.TItmPic : '');
        setPreviewImage2(user.TItmPic2 ? imageurl + user.TItmPic2 : '');
        setPreviewImage3(user.TItmPic3 ? imageurl + user.TItmPic3 : '');


      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const [values, setValues] = useState({
    itmIdd: "",
    itemDscc: "",
    itmdscurd:'',
    itmindex:'',
    itmremarks:'',
    itmdscurd:'',
    itemStss: "",
    purRatee: "",
    saleRatee: "",
    categoryIdd: "",
    discountt:"",
    typee: "",
    pic : '',
    TItmPic1:'',
TItmPic3:'',
TItmPic3:'',
    loading: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);

  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }
  function handleImageChange2(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage2(file);
      const imgElement = document.getElementById("pic2-preview");
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }
  function handleImageChange3(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage3(file);
      const imgElement = document.getElementById("pic3-preview");
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crystalsolutions.com.pk/csart/get_category.php`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();


    return () => {
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const FSinUsr = 33; // Your user ID logic here
  
    const requestBody = new FormData();
    requestBody.append("id", user.id);
    requestBody.append("itemDsc", user.TItmDsc);
    requestBody.append("itemDscUrd", user.itmdscurd);
    // requestBody.append("uom", user.uom);
    requestBody.append("itemSts", user.TItmSts);
    requestBody.append("purRate", user.TPurRat);
    requestBody.append("saleRate", user.TSalRat);
    requestBody.append("discont", user.itmdis);
    requestBody.append("categoryId", user.TCtgId);
    requestBody.append("itmremarks", user.itmremarks);
    requestBody.append("itmindex", user.itmindex);
    requestBody.append("titmspl", user.itmindex);

    // requestBody.append("categoryId", selectedCategoryId);
    // requestBody.append("type", user.TitmTyp);
    requestBody.append("pic", selectedImage1);
    requestBody.append("pic2", selectedImage2);
    requestBody.append("pic3", selectedImage3);

    requestBody.append("picname1", user.TItmPic);
    requestBody.append("picname2", user.TItmPic2);
    requestBody.append("picname3", user.TItmPic3);
    axios
      .post(
        `https://crystalsolutions.com.pk/csart/update_item.php?id=${id}`,
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
            navigate("/Get_Item");
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
      document.getElementById("pic-preview").src = URL.createObjectURL(selectedImage1);
    }
  }, [selectedImage1]);
  useEffect(() => {
    if (selectedImage2) {
      document.getElementById("pic2-preview").src = URL.createObjectURL(selectedImage2);
    }
  }, [selectedImage2]);
  useEffect(() => {
    if (selectedImage3) {
      document.getElementById("pic3-preview").src = URL.createObjectURL(selectedImage3);
    }
  }, [selectedImage3]);
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

<PathHead pageName="File > Item Maintenance > Update Item"  screen='Update_Item' pageLink="/Get_Item"/>

      <div className="col-12" style={{ color: 'black' ,fontFamily: 'Verdana',fontWeight:'bold' }}>
        

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
  <div className="col-6">
    <br />
  <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px',marginLeft: '60px' }}>Id :</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder=" Id"
        className="form-control"
        name="TItmId"
        value={user.id}
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
         name="TItmDsc"
         value={user.TItmDsc}
         style={{height:'20px', width:'270px' }}
         onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Control
          type="text"
          id="code"
          placeholder="تفصیل"
          name="itmdscurd"
          className="form-control"
          value={user.itmdscurd}
          style={{height:'20px', width:'210px' ,textAlign:'right' ,marginLeft:'92px'}}
          onChange={handleInputChange}
      />
      <Form.Label style={{ marginRight: '10px' }}>:تفصیل</Form.Label>

    </Form.Group>
    <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '18px' }}>Remarks:</Form.Label>
      <Form.Control
       type="text"
       id="code"
       placeholder="Remarks"
       name="itmremarks"
       className="form-control"
       value={user.itmremarks}
       style={{height:'20px', width:'270px' }}
       onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '37px' }}>Index:</Form.Label>
      <Form.Control
       type="text"
       id="code"
       placeholder="Index."
       name="itmindex"
       className="form-control"
       value={user.itmindex}
       style={{height:'20px', width:'70px' }}
       onChange={handleInputChange}
      />
    </Form.Group>
    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '34px', textAlign: 'right' }}>Status:</Form.Label>
     <Form.Control

as="select"

name="TItmSts"
value={user.TItmSts}
onChange={handleInputChange}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'70px'}}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</Form.Control>

    </Form.Group>


    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '17px', textAlign: 'right' }}>Category:</Form.Label>
     <Form.Control

as="select"

name="categoryId"
    value={user.TCtgId}
    onChange={(e) => {
      // setSelectedCategoryId(e.target.value);
      setUser((prevUser) => ({
        ...prevUser,
        TCtgId: e.target.value,
      }));
    }}
    style={{height:'27px', fontSize:'11px', width:'110px'}}
    id="categoryIdd"
    className="form-control">
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




    {/* <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '40px', textAlign: 'right' }}>Type:</Form.Label>
     <Form.Control

as="select"

name="TitmTyp"
value={user.TitmTyp}
onChange={handleInputChange}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'100px'}}
>
<option value="Item Sale">Item Sale</option>
                      <option value="Item Purchase">Item Purchase</option>
                    
</Form.Control>

    </Form.Group>
    <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '40px', textAlign: 'right' }}>Unit:</Form.Label>
     <Form.Control

as="select"

name="uom"
value={user.uom}
onChange={handleInputChange}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'100px' }}
>
<option value="Number">Number</option>
      <option value="KG">KG</option>
      <option value="Liter">Liter</option>
      <option value="Gram">Gram</option>
      <option value="Half">Half</option>
      <option value="Full">Full </option>
</Form.Control>

    </Form.Group> */}

    <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-1%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '20px' }}>Pur Rate:</Form.Label>
      <Form.Control
       type="text"
       id="code"
       placeholder="Purchase Rate"
       className="form-control"
       name="TPurRat"
       value={user.TPurRat}
       style={{height:'20px', width:'80px',textAlign:'right' }}
       onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '15px' }}>Sale Rate:</Form.Label>
      <Form.Control
       type="text"
       id="code"
       placeholder="Sale Rate"
       className="form-control"
       name="TSalRat"
       value={user.TSalRat}
       style={{height:'20px', width:'80px' ,textAlign:'right'}}
       onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' ,marginTop:'-2%'}}>
      <Form.Label style={{ marginRight: '10px', marginLeft: '15px' }}>Disc Rate:</Form.Label>
      <Form.Control
        type="text"
        id="code"
        placeholder="Discount Rate"
        className="form-control"
        name="itmdis"
        value={user.itmdis}
        style={{height:'20px', width:'80px',textAlign:'right' }}
        onChange={handleInputChange}
      />
    </Form.Group>

    <Form.Group style={{ display: 'flex', alignItems: 'center', marginTop: '-1%' }}>
  <Form.Label style={{ marginRight: '10px', marginLeft: '22px' }}>Remarks:</Form.Label>
  <Form.Control
    as="textarea" // Set the input type to textarea
    rows={4} // Specify the number of rows (adjust as needed)
    placeholder="Remarks"
    name="itmremarks"
    className="form-control"
    value={user.itmremarks}
    style={{ width: '270px' }}
    onChange={handleInputChange}
  />
</Form.Group>
  </div>

  {/* Right side (picture code) */}
  <div className="col-6">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1, marginRight: '-20px', textAlign: 'center' }}>
      <label
                      htmlFor="pic"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        marginLeft:'15%'
                      }}
                    >
                      Item Pic:
                    </label>
                    <label
                      htmlFor="pic"
                      style={{ cursor: "pointer", display: "block" }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "70px",
                          marginLeft:'45%',
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "#aaa",
                            marginBottom: "5px",
                            fontSize:'11px'
                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic" style={{ cursor: "pointer" }}>
          <img
            id="pic-preview"
            src={previewImage1}  
            alt="Category"
            style={{ width: '100%', height: '40px' }}
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
      <label
                      htmlFor="pic2"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        marginLeft:'15%'
                      }}
                    >
                      Item Pic:
                    </label>
                    <label
                      htmlFor="pic2"
                      style={{ cursor: "pointer", display: "block" }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "70px",
                          marginLeft:'45%',
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "#aaa",
                            marginBottom: "5px",                            fontSize:'11px'

                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic2" style={{ cursor: "pointer" }}>
          <img
            id="pic2-preview"
            src={previewImage2}  
            alt="Category"
            style={{ width: '100%', height: '40px' }}
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
      <label
                      htmlFor="pic3"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        marginLeft:'15%'
                      }}
                    >
                      Item Pic:
                    </label>
                    <label
                      htmlFor="pic3"
                      style={{ cursor: "pointer", display: "block" }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "70px",
                          marginLeft:'45%',
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "#aaa",
                            marginBottom: "5px",                            fontSize:'11px'

                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic3" style={{ cursor: "pointer" }}>
          <img
            id="pic3-preview"
            src={previewImage3}  
            alt="Category"
            style={{ width: '100%', height: '40px' }}
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
                    onClick={handleSubmit}
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

export default Update_Item;
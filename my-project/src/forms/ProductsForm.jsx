
import { MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import PortalLayout from '../components/PortalLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import person from '/assets/thumbnail.png'

const ProductsForm = () => {

  const [productData, setProductData] = useState({
    name: '',
    code: '',
    brand: '',
    price: '',
    product_unit: '',
    in_stock: ''
  })

  const navigate = useNavigate()

  console.log(productData)

  const handleChange = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3005/addProduct', productData)
      .then(res => {
        console.log(res)
        navigate('/products')
      })
      .catch(err => console.log(err))
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadClick = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.onchange = handleFileChange;
    inputFile.click();
  };

  return (
    <PortalLayout title={"Products / Add New"} >
      <div className=''>
        <div className='bg-white p-10 mt-20 rounded-xl'>
          <h1 className="text-left text-gray-800 font-[600] text-[1rem] uppercase">
            Add New Product
          </h1>
          <form onSubmit={handleSubmit} >
            <div className="flex gap-8 px-10  py-[3%] mt-[2%] border-t-2 border-b-2">
              <div className="flex justify-center w-[30%] border-r-2 ">
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                    className="w-40 h-40 rounded-full border-[6px]"
                    src="/assets/thumnail.png"
                    alt=""
                  />
                    <div
                      // onClick={handleFileUploadClick}
                      className="w-40 h-40 group hover:bg-gray-200 opacity-60 rounded-full absolute top-0 left-0 flex justify-center items-center cursor-pointer transition duration-500"
                    >
                      <MdOutlineFileUpload
                        className="hidden group-hover:block"
                        size={60}
                      />
                    </div>
                  </div>
                  <h1 className="mt-4 text-gray-600 text-[15px]">
                    Accepts jpg, .png, files up to 1MB.
                  </h1>
                  <h1 className="mt-4 text-gray-600 text-[14px]">
                    Recommended dimensions: 200px X 200px
                  </h1>
                </div>
              </div>
              <div className="w-[70%]">
                <h1 className="mb-2 text-gray-600 ">Personal Details</h1>
                <div className="flex w-[100%] gap-8">
                  <div className="w-[50%]">
                    <TextField
                      id="outlined-textarea"
                      label="Name"
                      name='name'
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "black",

                        },
                        "& .MuiInputLabel-outlined": {
                          color: "gray",
                          fontWeight: "normal",
                        },
                        borderColor: "gray",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[50%]">
                    <TextField
                      id="outlined-textarea"
                      label="Code"
                      name='code'
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "black",

                        },
                        "& .MuiInputLabel-outlined": {
                          color: "gray",
                          fontWeight: "normal",
                        },
                        borderColor: "gray",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex w-[100%] gap-8 my-[15px]">
                  <div className="w-[50%]">
                    <TextField
                      id="outlined-textarea"
                      label="Brand"
                      name='brand'
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "black",

                        },
                        "& .MuiInputLabel-outlined": {
                          color: "gray",
                          fontWeight: "normal",
                        },
                        borderColor: "gray",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[50%]">
                    <TextField
                      id="outlined-textarea"
                      label="Price"
                      name='price'
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "black",

                        },
                        "& .MuiInputLabel-outlined": {
                          color: "gray",
                          fontWeight: "normal",
                        },
                        borderColor: "gray",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex w-[100%] gap-8">
                  <div className="w-[50%]">
                    <TextField
                      id="outlined-textarea"
                      label="Product Unit "
                      name='product_unit'
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "black",

                        },
                        "& .MuiInputLabel-outlined": {
                          color: "gray",
                          fontWeight: "normal",
                        },
                        borderColor: "gray",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-[50%]">
                    <TextField
                      id="outlined-textarea"
                      label="In Stock"
                      name='in_stock'
                      size="small"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "black",

                        },
                        "& .MuiInputLabel-outlined": {
                          color: "gray",
                          fontWeight: "normal",
                        },
                        borderColor: "gray",
                      }}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* <div className="flex w-[100%] gap-8 my-[15px]">
                <div className="flex  w-[50%]">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Gender"
                    placeholder="Select Gender"
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        backgroundColor:
                          localStorage.getItem("lightDark") === "light"
                            ? "#f1f1f1"
                            : "transparent",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e1e1e1e1",
                          borderRadius: 2,
                        },
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "gray",
                        fontWeight: "normal",
                      },
                      borderColor: "gray",
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"none"}>Rather not to say</MenuItem>
                  </TextField>
                </div>
                <div className="flex flex-col w-[50%]">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="In Stock"
                    fullWidth
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "gray",
                        fontWeight: "normal",
                      },
                      borderColor: "gray",
                    }}
                    onChange={handleChange}
                  >
                    <MenuItem value={"single"}>Single</MenuItem>
                    <MenuItem value={"married"}>Married</MenuItem>
                  </TextField>
                </div>
              </div> */}
                <hr />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="!ml-auto gap-4 flex">
                <input
                  type="reset"
                  value="Cancel"
                  className="uppercase border-2 rounded-xl px-6 py-1 bg-gray-600 text-gray-100 font-[500] mt-5 ml-auto cursor-pointer"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="uppercase border-2 rounded-xl px-6 py-1 bg-[#101418] text-gray-100 font-[500] mt-5 ml-auto cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </PortalLayout>
  )
}

export default ProductsForm

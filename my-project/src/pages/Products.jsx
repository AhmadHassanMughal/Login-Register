import React, { useEffect, useState } from "react";
import PortalLayout from "../components/PortalLayout";
import { Pagination, Stack, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { GrEdit } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { PuffLoader } from "react-spinners";
import axios from "axios";

const rows = [
  {
    id: "1",
    name: "Air Conditioner",
    code: "12",
    brand: "Intel",
    price: "$ 100",
    product_unit: "Kilogram",
    stock: "1122",
  },
  {
    id: "2",
    name: "Air Conditioner",
    code: "12",
    brand: "Intel",
    price: "$ 100",
    product_unit: "Kilogram",
    stock: "1122",
  },
  {
    id: "3",
    name: "Air Conditioner",
    code: "12",
    brand: "Intel",
    price: "$ 100",
    product_unit: "Kilogram",
    stock: "1122",
  },
  {
    id: "4",
    name: "Air Conditioner",
    code: "12",
    brand: "Intel",
    price: "$ 100",
    product_unit: "Kilogram",
    stock: "1122",
  },
  {
    id: "5",
    name: "Air Conditioner",
    code: "12",
    brand: "Intel",
    price: "$ 100",
    product_unit: "Kilogram",
    stock: "1122",
  },
];

const Products = () => {
  //   const loading = useSelector((state) => state.book.isLoading);
  const [loading, setLoading] = useState(false)
  const [nodata, setNodData] = useState(false);
  const [fetchData, setFetchData] = useState()

  useEffect(() => {
    axios.get('http://localhost:3005/allProduct')
      .then(response => {
        console.log(response.data);
        setFetchData(response.data)
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    if (fetchData?.length !== 0) {
      setNodData(false);
    } else {
      setNodData(true);
    }
  });

  //   const books = useSelector((state) => state.book.books);
  //   useEffect(() => {
  //     console.log(books);
  //   }, [books]);
  //   useEffect(() => {
  //     dispatch(AllBooks());
  //   }, [dispatch]);

  const navigate = useNavigate();

  //search

  const [search, setSearch] = useState("");
  useEffect(() => {
    const result = fetchData?.filter((item) => {
      return item?.name?.toLowerCase()?.match(search?.toLocaleLowerCase());
    });
    setPaginatedData(result);
  }, [search]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [paginatedData, setPaginatedData] = useState();
  useEffect(() => {
    if (fetchData) {
      setPaginatedData(fetchData?.slice(startIndex, endIndex));
    }
  }, [fetchData, startIndex]);

  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteID] = useState();

  const deleteBook = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(`http://localhost:3005/deleteProduct/${id}`)
      console.log(response.data);
      setOpen(!open);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDelete = (id) => {
    setOpen(!open);
    setDeleteID(id);
  };

  const handleEdit = (id) => {
    console.log(id, 'inProduct')
    navigate("/product/edit", { state: { ID: id } });
  };

  const Status = (id, status) => {
    let st = 0;
    if (status === 1) {
      st = 0;
    } else {
      st = 1;
    }
    // dispatch(BookStatus(id, st));
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#22C55E",
        contrastText: "#EEE",
      },
    },
    typography: {
      fontFamily: ["Poppins"],
      fontSize: 15,
      fontWeightBold: 800
    },
  });

  return (
    <PortalLayout title={"Products"}>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        ID={deleteID}
        deleteFunction={deleteBook}
      />
      {/* <DeleteModal open={open} handleClose={handleOpen} /> */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PuffLoader color="#04375F" />
        </div>
      ) : (
        <>
          {nodata ? (
            <div>
              <p className="text-[2rem] font-[500] mt-5">No Books Found</p>
              <div className="mt-5">
                <Link to={'/product/add'}>
                  {" "}
                  <button className="bg-teal-500 text-white hover:bg-[#178941] text-[0.9rem] border-gray-400 border-[1px]   transition-all ease-in-out duration-75 cursor-pointer max-md:text-[.6rem] py-2 px-[1rem] max-md:px-[1rem] max-md:py-[5px] !font-[600] max-md:font-[400] rounded-full mr-auto ">
                    Add New Product
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="my-11">
                <div className="flex flex-col bg-white py-7 mt-5 rounded-xl  shadow-xl  w-full">
                  <div className="flex justify-between w-full pb-6 px-5 border-b-2 m-autos">
                    <div className="flex bg-green-500 rounded-full  w-[27.8125rem] border-gray-400 hover:border-gray-700 border-[1px] max-md:py-[1px] max-md:w-[15rem] max-md:text-[0.7rem]">
                      <IoIosSearch className="text-[1.8rem] my-auto ml-2 text-white" />
                      <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        name=""
                        id=""
                        placeholder="Search..."
                        className="ml-2 pl-5 w-[90%] rounded-r-full bg-white outline-none"
                      />
                    </div>
                    <Link to={'/product/add'}>
                      {" "}
                      <button className="bg-green-500 text-white hover:bg-[#178941] text-[0.9rem] border-gray-400 border-[1px]  transition-all ease-in-out duration-75 cursor-pointer max-md:text-[.6rem] py-2 px-[1rem] max-md:px-[1rem] max-md:py-[5px] !font-[600] max-md:font-[400] rounded-full mr-auto ">
                        + Add New Product 
                      </button>
                    </Link>
                  </div>
                  <h5 className="!ml-5 mt-5 text-[.9rem] " >(10) Records Found</h5>
                  <table className="w-full mt-4 max-md:h-[400px] ">
                    <thead>
                      <tr className="!bg-gray-200 text-black  uppercase text-sm leading-normal w-[100%]">
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem]  !font-[700] max-sm:text-[.5rem]  text-center">
                          ID
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          Name
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          Code
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          BRAND
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          PRICE
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          PRODUCT UNIT
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          IN STOCK
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] !font-[700]  text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {paginatedData?.map((value, index) => (
                      <tbody
                        key={index}
                        className="!text-gray-600 text-sm !font-bold w-[100%]"
                      >
                        <tr
                          className={`border-b border-gray-300 bg-white ${index % 2 ? "!bg-gray-50" : "bg-white"
                            }`}
                        >
                          <td className="w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                            <span className="font-bold">{index + 1}</span>
                          </td>
                          <td className="w-[10%]  lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[600] text-center">
                            <span>{value.name}</span>
                          </td>
                          <td className="w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[600] text-center">
                            <span>{value.code}</span>
                          </td>
                          <td className="w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[600] text-center">
                            <span>{value.brand}</span>
                          </td>
                          <td className="w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[600] text-center">
                            <span>{value.price}</span>
                          </td>
                          <td className="w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[600] text-center">
                            <span>{value.product_unit}</span>
                          </td>
                          <td className="w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[600] text-center">
                            <span>{value.in_stock}</span>
                          </td>
                          {/* <td className="py-[1.5%] w-[10%]  text-center">
                            <span
                              onClick={() => Status(value.id, value.status)}
                              className={`lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] px-4 text-white font-[500] py-1 cursor-pointer rounded-full text-xs ${value.status === 0
                                  ? "bg-red-500 "
                                  : "bg-green-500"
                                }`}
                            >
                              {value.status === 0 ? "Disable" : "Enable"}
                            </span>
                          </td> */}
                          <td className="py-[1.5%] w-[10%] pr-6 lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                            <div className="flex item-center justify-center md:gap-3 max-sm:gap-1">
                              <div
                                onClick={() => handleEdit(value._id)}
                                className="transform hover:text-blue-500 md:bg-blue-600 rounded-full cursor-pointer md:p-2 hover:scale-110"
                              >
                                <GrEdit className="!text-white max-sm:!text-blue-600 max-sm:text-[0.7rem]" />
                              </div>
                              <div
                                onClick={() => handleDelete(value._id)}
                                className="transform  md:bg-red-600 rounded-full cursor-pointer md:p-1 hover:scale-110"
                              >
                                <MdDeleteOutline className="!text-white max-sm:!text-red-600  md:text-[1.3rem] max-sm:text-[0.8rem]" />
                              </div>
                              {/* <div className="w-4  transform hover:text-blue-500  hover:scale-110 ">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div> */}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <div className="mt-8">
                  <ThemeProvider theme={theme}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      marginTop={2}
                    >
                      <Pagination
                        count={Math.ceil(fetchData?.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                      />
                    </Stack>
                  </ThemeProvider>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </PortalLayout>
  );
};

export default Products;

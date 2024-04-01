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
    try{
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
    // navigate("/books/edit", { state: { ID: id } });
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
        main: "#04375F",
        contrastText: "#EEE",
      },
    },
    typography: {
      fontFamily: ["Poppins"],
      fontSize: 18,
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
                <Link to={'/new/product'}>
                  {" "}
                  <button className="bg-[#04375F] text-white hover:text-black hover:font-[600] text-[0.9rem] hover:bg-white border-[#04375F] border-2  transition-all ease-in-out duration-75 cursor-pointer max-md:text-[.6rem] py-2 px-[1rem] max-md:px-[1rem] max-md:py-[5px] font-[400] max-md:font-[400] rounded-full mr-auto ">
                    Add New Product
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="my-11">
                <div className="flex justify-center w-full m-auto  ">
                  <Link to={'/new/product'}>
                    {" "}
                    <button className="bg-[#04375F] text-white hover:text-black hover:font-[600] text-[0.9rem] hover:bg-white border-[#04375F] border-2  transition-all ease-in-out duration-75 cursor-pointer max-md:text-[.6rem] py-2 px-[1rem] max-md:px-[1rem] max-md:py-[5px] font-[400] max-md:font-[400] rounded-full mr-auto ">
                      Add New Product
                    </button>
                  </Link>
                  <div className="border-2 flex bg-[#04375F] border-gray-600pl-[1rem] rounded-[8px]  w-[27.8125rem] ml-auto max-md:py-[1px] max-md:w-[15rem] max-md:text-[0.7rem] focus:outline-none focus:ring-0 focus:border-gray-900 peer">
                    <IoIosSearch className="text-[2rem] my-auto ml-2 text-white" />
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      type="search"
                      name=""
                      id=""
                      placeholder="Search..."
                      className="ml-2 pl-5 w-full bg-white outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center bg-white py-10 mt-5 rounded-xl  shadow-xl  w-full">
                  <table className="w-full max-md:h-[400px] ">
                    <thead>
                      <tr className="bg-[#04375F] text-white uppercase text-sm leading-normal w-[100%]">
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          ID
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          Name
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          Code
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          BRAND
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          PRICE
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          PRODUCT UNIT
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          IN STOCK
                        </th>
                        <th className="py-[1.5%] w-[10%] lg:text-[.9rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {paginatedData?.map((value, index) => (
                      <tbody
                        key={index}
                        className="text-gray-600 text-sm font-light w-[100%]"
                      >
                        <tr
                          className={`border-b border-gray-300 bg-white ${index % 2 ? "!bg-gray-100" : "bg-white"
                            }`}
                        >
                          <td className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] text-center">
                            <span className="font-medium">{index + 1}</span>
                          </td>
                          <td className="py-[1.5%] w-[10%]  lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[500] text-center">
                            <span>{value.name}</span>
                          </td>
                          <td className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[500] text-center">
                            <span>{value.code}</span>
                          </td>
                          <td className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[500] text-center">
                            <span>{value.brand}</span>
                          </td>
                          <td className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[500] text-center">
                            <span>{value.price}</span>
                          </td>
                          <td className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[500] text-center">
                            <span>{value.product_unit}</span>
                          </td>
                          <td className="py-[1.5%] w-[10%] lg:text-[.8rem] md:text-[.7rem] max-sm:text-[.5rem] font-[500] text-center">
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
                                onClick={() => handleEdit(value.id)}
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

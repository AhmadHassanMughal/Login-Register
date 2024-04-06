import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdDashboardCustomize } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { Popover, Transition } from "@headlessui/react";
import { FaBook } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import SignOutModal from "./SignOutModal";
import { useState } from "react";
import { useEffect } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PortalLayout({ children, title }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const handleDrawer = () => {
    setOpen(!open);
  };
  const route = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const LogOut = () => {
    sessionStorage.setItem("LOGIN", "false")
    sessionStorage.setItem("ID", null)
    sessionStorage.setItem("TYPE", null)
    sessionStorage.setItem("Admin", null)
    route('/login')
  }

  const [openSingout, setOpenSignout] = useState()


  const handleSignOut = () => {
    setOpenSignout(!openSingout)
  }
  
//   useEffect(() => {
//     const login = sessionStorage.getItem("LOGIN")
//     if(login === "false"){
//       navigate('/login')
//     }
//   }, []);

  return (
    <Box sx={{ display: "flex", fontFamily: 'Montserrat' }}>
      <CssBaseline />
      <AppBar className={`!bg-teal-500  !text-white !border-0 ${open ? '!z-0' : ''} !shadow-none ${open? '!w-[84.8%]' : '!w-full'} `} open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{  color: 'white' }}
            className={` ${open ? '!mx-[1rem]' : '!mr-[1rem]'}`}
          >
            <MenuIcon />
          </IconButton>
          <p className=" text-[.9rem] w-full uppercase !font-[700] ">{title}</p>
          <Popover className="ml-auto">
            <Popover.Button
              onClick={toggleMenu}
              className={`flex gap-2 outline-none md:mr-2 cursor-pointer`}
            >
              <CiUser className="h-10  w-10 border-2 rounded-full p-2 mt-[6px]" />
              <div>
                <p className="text-left text-[.9rem] font-[700] ">M. Warren Buffet</p>
                <p className="text-left text-[.9rem] font-[700] ">WarrenBuffet@gmail.com</p>
              </div>

              {isOpen ? (
                <IoIosArrowDropup className="mt-[14px] cursor-pointer text-[1.5rem] " />
              ) : (
                <IoIosArrowDropdown className="mt-[14px] cursor-pointer text-[1.5rem] " />
              )}
            </Popover.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel className="absolute max-sm:right-0 text-center z-50 mt-2 py-5 bg-gray-50 border-2 border-gray-300 shadow-lg rounded-md max-w-xs max-sm:w-[230px] w-[270px]">
                <div>
                  <div className='flex items-center'>
                  <img src="/assets/logo.png" alt="" className='w-20 max-sm:w-15 rounded-full h-auto m-auto' />
                  {/* <span className='ml-[1rem] absolute right-[30%] top-[32%] bg-white cursor-pointer rounded-full p-1'><BiSolidEditAlt className='text-[1.5rem] z-[999]' /></span> */}
                </div>
                  <>
                    <h1 className="font-[600] text-black text-[1.5rem] mb-2 text-center">
                      Abubkara
                    </h1>
                    <div className="rounded-xl pl-5">
                      <i className="items-center flex">
                        <AiOutlineMail className="text-black"/>
                        <span className="font-[600] text-[1rem] text-gray-600 ml-[1rem]">
                          abubakar@gmail.com
                        </span>
                      </i>
                      <i className="items-center flex">
                        <BsTelephone className="text-black"/>
                        <span className="font-[600] text-[1rem] text-gray-600 ml-[1rem] mt-2">
                          03214242471414
                        </span>
                      </i>
                      <i className="items-center flex">
                        <SlLocationPin className="text-black"/>
                        <span className="font-[600] text-[1rem] text-gray-600 ml-[1rem] mt-2">
                          Gandiabad, Lahore
                        </span>
                      </i>
                    </div>
                  </>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            zIndex: '8000'
          },
        }}
        className="!z-50"
        open={open}
      >
        {!open ? <DrawerHeader></DrawerHeader> : ""}
        <Divider />
        <center className="border-b-[1px] border-gray-200" >
        <img src="./assets/logo.png" alt="" className={`p-4 ${open ? 'w-32 h-32' : ''}`} />
        </center>
        <List className={`${open ? '!mt-[1rem]': ''}`}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => route("/dashboard")}
              className={`  ${
                location.pathname === "/dashboard" 
                  ? "!bg-gradient-to-r from-teal-400 to-green-500 !text-white !border-l-2 !rounded-r-full w-[95%] !border-l-white"
                  : "text-gray-800"
              }`}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MdDashboardCustomize 
                  className={`${
                    location.pathname === "/dashboard" ? 'text-white' : ''}`}
                />
              </ListItemIcon>
              <p className={`!text-[.9rem] !font-[700] ${ open ? '' : 'hidden'}`}  >Dashboard</p>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => route("/products")}
              className={`  ${
                location.pathname === "/products" ||
                location.pathname === "/books/add" ||
                location.pathname === "/books/edit" 
                  ? "!bg-gradient-to-r from-teal-400 to-green-500 !text-white !border-l-2 !rounded-r-full w-[95%] !border-l-white"
                  : "!text-black"
              }`}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaBook  
                  className={`${
                    location.pathname === "/products" ? 'text-white' : '!text-black'}`}
                />
              </ListItemIcon>
              <p className={`!text-[.9rem] !font-[700] ${ open ? '' : 'hidden'}`} >Products</p>
            </ListItemButton>
          </ListItem>
          <SignOutModal open={openSingout} setOpen={setOpenSignout} signOutFunction={LogOut}/>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleSignOut()}
              className={`  ${
                location.pathname === "/login"
                  ? "!bg-gradient-to-r from-teal-400 to-green-500 !text-white !border-l-2 !rounded-r-full w-[95%] !border-l-white"
                  : "text-gray-900"
              }`}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <RiLogoutCircleRLine 
                  className='text-gray'
                />
              </ListItemIcon>
              <p className={`!text-[.9rem] !font-[700] ${ open ? '' : 'hidden'}`} >Sign Out</p>
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        <div className="border-2 bg-gray-100 min-h-screen px-10">{children}</div>
      </Box>
    </Box>
  );
}

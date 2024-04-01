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
      <AppBar className={`!bg-white !border-0 !shadow-none !w-[100%] `} open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            sx={{ marginRight: 22 }}
          >
            <MenuIcon />
          </IconButton>
          <p className="text-black text-[1.5rem] w-full pl-10 text-center uppercase !font-[600] ">{title}</p>
          <Popover className="ml-auto">
            <Popover.Button
              onClick={toggleMenu}
              className="flex gap-2 outline-none md:mr-6 cursor-pointer text-gray-700"
            >
              <CiUser className="h-10  w-10 border-2 rounded-full  border-gray-600 p-2 mt-[6px]" />
              <div>
                <p className="text-left text-gray-700">Abubakar</p>
                <p className="text-left text-gray-700">Abubakkar@gmail.com</p>
              </div>

              {isOpen ? (
                <IoIosArrowDropup className="mt-[14px] cursor-pointer text-[1.5rem] text-gray-600" />
              ) : (
                <IoIosArrowDropdown className="mt-[14px] cursor-pointer text-[1.5rem] text-gray-600" />
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
                  {/* <div className='flex items-center'>
                  <img src="/assets/profile_thumb.png" alt="" className='w-20 max-sm:w-15 rounded-full h-auto m-auto' />
                  <span className='ml-[1rem] absolute right-[30%] top-[32%] bg-white cursor-pointer rounded-full p-1'><BiSolidEditAlt className='text-[1.5rem] z-[999]' /></span>
                </div> */}
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
        color="#04375F"
        PaperProps={{
          sx: {
            backgroundColor: "#04375F",
          },
        }}
        open={open}
      >
        {!open ? <DrawerHeader></DrawerHeader> : ""}
        <Divider />
        <img src="./assets/logo_mark.png" alt="" className="p-4" />
        <List className={`${open ? '!mt-[4rem]': ''}`}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => route("/dashboard")}
              className={`  ${
                location.pathname === "/dashboard" 
                  ? "!bg-[#375d7a] !border-l-2 !border-l-white "
                  : " text-white"
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
                  color: "white"
                }}
              >
                <MdDashboardCustomize 
                  className='text-white'
                />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
                className='text-white'
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => route("/books")}
              className={`  ${
                location.pathname === "/books" ||
                location.pathname === "/books/add" ||
                location.pathname === "/books/edit" 
                  ? "!bg-[#375d7a]"
                  : " text-white"
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
                  className='text-white'
                />
              </ListItemIcon>
              <ListItemText
                primary="Expense"
                sx={{ opacity: open ? 1 : 0 }}
                className='text-white'
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => route("/products")}
              className={`  ${
                location.pathname === "/books" ||
                location.pathname === "/books/add" ||
                location.pathname === "/books/edit" 
                  ? "!bg-[#375d7a]"
                  : " text-white"
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
                  className='text-white'
                />
              </ListItemIcon>
              <ListItemText
                primary="Products"
                sx={{ opacity: open ? 1 : 0 }}
                className='text-white'
              />
            </ListItemButton>
          </ListItem>
          <SignOutModal open={openSingout} setOpen={setOpenSignout} signOutFunction={LogOut}/>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleSignOut()}
              className={`  ${
                location.pathname === "/login"
                  ? "!bg-[#375d7a]"
                  : " text-white"
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
                  className='text-white'
                />
              </ListItemIcon>
              <ListItemText
                primary="Sign Out"
                sx={{ opacity: open ? 1 : 0 }}
                className='text-white'
              />
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

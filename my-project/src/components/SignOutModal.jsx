import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';


const SignOutModal = ({ open, setOpen, signOutFunction }) => {

    const handleClose = () => {
        setOpen(!open)
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title" PaperProps={{ style: { borderRadius: 20, padding: 15 } }}>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white ">
                    <button onClick={handleClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover: " data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <div className=''>
                            <LogoutIcon className="!text-[6rem] !text-white !bg-red-700 !rounded-full !p-5 " />
                        </div>
                        <h3 className="mb-5 mt-2 text-lg font-normal text-gray-500 :text-gray-400">Are you sure you want to Sign Out ?</h3>
                        <button
                            onClick={signOutFunction}
                            data-modal-hide="popup-modal" type="button" className="bg-[#A52922] hover:bg-red-700 font-sm font-[600] active:bg-[#A52922] cursor-pointer py-2 px-[1.5rem] mr-4 text-white rounded-md">
                            Yes, I'm sure
                        </button>
                        <button onClick={handleClose} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-md border-[2px] border-gray-400 text-sm font-[600] px-5 py-2.5 hover:text-gray-900 focus:z-10 :bg-gray-700 :text-gray-300 :border-gray-500  :hover:bg-gray-600 :focus:ring-gray-600">No, cancel</button>
                    </div>
                </div>
            </div>

        </Dialog>
    )
}

export default SignOutModal
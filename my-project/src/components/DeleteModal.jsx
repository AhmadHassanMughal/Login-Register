import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'

const DeleteModal = ({open, setOpen, ID , deleteFunction}) => {
    const handleClose = () => {
        setOpen(!open)
    }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="customized-dialog-title" PaperProps={{ style: { borderRadius: 20, padding: 15 } }}>
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white ">
            <button onClick={handleClose} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover: " data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 :text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 :text-gray-400">Are you sure you want to delete ?</h3>
                <button onClick={()  => deleteFunction(ID)} data-modal-hide="popup-modal" type="button" className="  bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 border-[2px] border-red-600">
                    Yes, I'm sure
                </button>
                <button  onClick={handleClose} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border-[2px] border-gray-400 text-sm font-[600] px-5 py-2.5 hover:text-gray-900 focus:z-10 :bg-gray-700 :text-gray-300 :border-gray-500 :hover:  :hover:bg-gray-600 :focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>

    </Dialog>
  )
}

export default DeleteModal
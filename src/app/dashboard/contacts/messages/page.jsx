'use client'
import {deleteMessage, getAllMessages , markMessageAsRead } from '@/redux/slices/contactSlice';
import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import DeleteConfirmDialog from '@/app/dashboard/DeleteConfirmDialog';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box , CircularProgress  } from '@mui/material';
import { FaTrash, FaEye  } from 'react-icons/fa';
import ViewMessage from '../View';
import MailOutlineIcon from '@mui/icons-material/MailOutline';         // غير مقروءة
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';     // مقروءة

const page = () => {

    const dispatch = useDispatch();
    const {messages, loading, error} = useSelector((state) => state.contact)
// states 
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [openView, setOpenView] = useState(false);
    const [selectedmessage, setSelectedMessage] = useState(null);      
    
    useEffect(() => {
        dispatch(getAllMessages());
    },[])



const handleMarkAsRead = (messageId) => {
    dispatch(markMessageAsRead(messageId));
};    


const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },       
      {
        accessorKey: 'isRead',
        header: 'Status',
        Cell: ({ cell }) => {
          const isRead = cell.getValue();
          return isRead ? (
            <MarkEmailReadIcon style={{ color: '#9e9e9e' }} titleAccess="Read" />  
          ) : (
            <MarkEmailReadIcon style={{ color: '#4caf50' }} titleAccess="Unread" />  
          );
        },
      },                 
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <Button
            onClick={() => {
                setSelectedMessage(row.original);
                setOpenView(true);
                handleMarkAsRead(row.original._id)
            }}
            >
            <FaEye />
            </Button>
            <Button
              onClick={() => handleOpenConfirm(row.original._id)}
              variant="outlined"
              color="error"
              size="small"
            >
              <FaTrash />
            </Button>
          </Box>
        ),
      },
    ],
    []
);
  
    
  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
};

  const handleConfirmDelete = () => {
    dispatch(deleteMessage(selectedId));
    setOpenConfirm(false);
};

    

<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
<CircularProgress />
</div>

    
  return (
    <div>
          <h1> Messages </h1>



    <MaterialReactTable
        columns={columns}
        data={messages}
        state={{ isLoading: loading }}
        enableColumnActions={false}
        enableSorting={false}
      />


    <DeleteConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Property Type"
        message="Are you sure you want to delete this property type?"
      />

    <ViewMessage
open={openView} onClose={() => setOpenView(false)} message={selectedmessage}
      />          

    </div>
  )
}

export default page
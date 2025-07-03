'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities, deleteCity } from '@/redux/slices/citySlice';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box ,Switch, CircularProgress  } from '@mui/material';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import DeleteConfirmDialog from '@/app/dashboard/DeleteConfirmDialog';

const Cities = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list, loading } = useSelector((state) => state.cities);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(getAllCities());
  }, [dispatch]);

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCity(selectedId));
    setOpenConfirm(false);
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.en',
        header: 'City Name',
      },
      {
        id: 'actions',
        header: 'Actions',
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <Button
              onClick={() => router.push(`cities/${row.original._id}`)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              <FaEdit />
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
    [router]
  );

if (loading)  return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress />
      </div>
    ); 

  return (
    <div>
      <h1>Cities</h1>
      <Box mb={2}>
        <Link href="cities/add">
          <Button variant="contained" color="success">Create New City</Button>
        </Link>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={list}
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
      
    </div>
  );
};

export default Cities;

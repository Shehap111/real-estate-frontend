'use client';
import { deletePropertyType, getAllPropertyTypesAdmin, togglePropertyTypeStatus } from '@/redux/slices/propertyTypeSlice';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box , Switch ,CircularProgress } from '@mui/material';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DeleteConfirmDialog from '@/app/dashboard/DeleteConfirmDialog';
import ViewPropertyType from './View';

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { adminList, loading } = useSelector((state) => state.propertyTypes);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [selectedType, setSelectedType] = useState(null);


  useEffect(() => {
    dispatch(getAllPropertyTypesAdmin());
  }, []);

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deletePropertyType(selectedId));
    setOpenConfirm(false);
};
    
    const handleToggleStatus = (id) => {
        dispatch(togglePropertyTypeStatus(id));
    }

  const columns = useMemo(
      () => [
    {
        accessorKey: 'image',
        header: 'Property Type Image',
        Cell: ({ cell }) => (
            <Image
            src={cell.getValue()}
            alt="Property Type"
            width={50}
            height={50}
            />
        ),
    },      
      {
        accessorKey: 'name.en',
        header: 'Property Type Name',
          },
     
      {
        id: 'actions',
        header: 'Actions',
          Cell: ({row}) => (
            
              <Box display="flex" gap={1}>
    <Switch
          checked={row.original.isActive}
          onChange={() => handleToggleStatus(row.original._id)}
          color="success"
        />
<Button
  onClick={() => {
    setSelectedType(row.original);
    setOpenView(true);
  }}
>
  <FaEye />
</Button>
            <Button
              onClick={() => router.push(`propertyTypes/${row.original._id}`)}
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

  if (loading) return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <h1>Property Types</h1>

      <Box mb={2}>
        <Link href="propertyTypes/add">
          <Button variant="contained" color="success">Create New Property Type</Button>
        </Link>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={adminList}
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

<ViewPropertyType
        open={openView}
        onClose={() => setOpenView(false)}
        type={selectedType}
      />

    </div>
  );
};

export default Page;

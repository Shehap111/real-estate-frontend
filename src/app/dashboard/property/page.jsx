'use client';
import React, {useEffect  , useMemo, useState} from 'react'
import { deleteProperty, getAllPropertiesAdmin , togglePropertyStatus} from '@/redux/slices/propertySlice';
import {useDispatch, useSelector} from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box , Switch ,CircularProgress   } from '@mui/material';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import DeleteConfirmDialog from '@/app/dashboard/DeleteConfirmDialog';
import {getAllCities} from '@/redux/slices/citySlice';
import {getAllPropertyTypesAdmin} from '@/redux/slices/propertyTypeSlice';
import View from './View'
const Property = () => {

const dispatch = useDispatch();
const { loading , error ,adminProperties } = useSelector((state) => state.property);
const { adminList , loading: typesLoading } = useSelector((state) => state.propertyTypes);
const {list , loading: citiesLoading} = useSelector((state) => state.cities);
const [openView, setOpenView] = useState(false);
const [selectedProperty, setSelectedProperty] = useState(null);
const router = useRouter();
const [openConfirm, setOpenConfirm] = useState(false);
const [selectedId, setSelectedId] = useState(null);
    
useEffect(() => {
    dispatch(getAllPropertiesAdmin());
    dispatch(getAllCities());
    dispatch(getAllPropertyTypesAdmin());
}, []);



// function to get city name by cityId
const getCityName = (cityId) => {
    const id = typeof cityId === 'object' ? cityId._id : cityId;
    const city = list.find((c) => String(c._id) === String(id));
    return city ? city.name.en : '';
};
// function to get property type name by typeId
  const getPropertyTypeName = (typeId) => {
    const id = typeof typeId === 'object' ? typeId._id : typeId;
    const type = adminList.find((t) => String(t._id) === String(id));
    return type ? type.name.en : '';
  };
  

// function to toggle property type status
    const handleToggleStatus = (id) => {
    dispatch(togglePropertyStatus(id))
}


// function to toggle property type status for Delete Button
const handleOpenConfirm = (id) => {
  setSelectedId(id);
  setOpenConfirm(true);
};
const handleConfirmDelete = () => {
  dispatch(deleteProperty(selectedId));
  setOpenConfirm(false);
};
    
const columns = useMemo(
    () => [
        {
            accessorKey: 'images',
            header: 'Property Type Image',
            Cell: ({ cell }) => (
                <Image
                    src={cell.getValue()[0]}
                    alt="Property Type"
                    width={50}
                    height={50}
                />
            ),
    },
    {
        accessorKey: 'title.en',
        header: 'Property Title',
    },
    {
        accessorKey: 'location.en',
        header: 'Property Location',
    },
{
  header: 'City Name',
  Cell: ({ row }) => getCityName(row.original.cityId),
},
{
  header: 'Property Type',
  Cell: ({ row }) => getPropertyTypeName(row.original.propertyTypeId),
},

        {
            id: 'actions',
            header: 'Actions',
            Cell: ({ row }) => (
                <Box display="flex" gap={1}>
                    <Switch
                        checked={row.original.isActive}
                        onChange={() => handleToggleStatus(row.original._id)}
                        color="success"
                    />
<Button
  onClick={() => {
    setSelectedProperty(row.original); // خزّن البيانات
    setOpenView(true);             // افتح البوب أب
  }}
  variant="outlined"
  color="primary"
  size="small"
>
  <FaEye />
</Button>
                    <Button
                        onClick={() => router.push(`property/${row.original._id}`)}
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
    [router ,list, adminList ]
);
    




if (loading || typesLoading || citiesLoading ) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress />
      </div>
    );
}
  
return (
      <div>
          <h1>Properties</h1>
            {error && <div className="error">{error}</div>}
<Box mb={2}>
  <Link href="property/add">
    <Button variant="contained" color="success">Create New Property</Button>
  </Link>
</Box>          
<MaterialReactTable
        columns={columns}
        data={adminProperties}
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
    

      <View
        open={openView}
        onClose={() => setOpenView(false)}
        property={selectedProperty}
      />
    </div>
  )
}

export default Property
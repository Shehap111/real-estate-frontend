'use client'
import React, {useEffect , useMemo ,useState} from 'react'
import {getAllBlogsAdmin, getAllActiveBlogs , toggleBlogStatus} from '@/redux/slices/blogSlices';
import {useSelector ,useDispatch}  from 'react-redux';
import {MaterialReactTable} from 'material-react-table';
import { Button, Box , Switch ,CircularProgress } from '@mui/material';
import {FaTrash, FaEdit, FaEye} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import DeleteConfirmDialog from '@/app/dashboard/DeleteConfirmDialog';
import ViewBlog from './View';

const page = () => {
const dispatch = useDispatch();
const router = useRouter();
    const {adminBlogs, publicBlogs, loading, error} = useSelector((state) => state.blog);
    
    // State 
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
    


useEffect(() => {
    dispatch(getAllBlogsAdmin());
    dispatch(getAllActiveBlogs());
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
        dispatch(toggleBlogStatus(id));
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
        accessorKey: 'title.en',
        header: 'Blog Title',
          },
      {
        accessorKey: 'author',
        header: 'Blog Author',
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
    setSelectedBlog(row.original);
    setOpenView(true);
  }}
>
  <FaEye />
</Button>
            <Button
              onClick={() => router.push(`blog/${row.original._id}`)}
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
          <h1>Blog</h1>
          
    <Box mb={2}>
        <Link href="blog/add">
          <Button variant="contained" color="success">Create New Blog Post</Button>
        </Link>
      </Box>

      <MaterialReactTable
        columns={columns}
        data={adminBlogs}
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

<ViewBlog open={openView} onClose={() => setOpenView(false)} blog={selectedBlog} />


    </div>
  )
}

export default page
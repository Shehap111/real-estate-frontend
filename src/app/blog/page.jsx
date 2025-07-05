'use client'
import {getAllActiveBlogs} from '@/redux/slices/blogSlices';
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Image from 'next/image';
import Link from 'next/link';
import IntroSections from '@/components/IntroSections';
import './blogs.css'
import {Alert, TextField} from '@mui/material';
import {t} from 'i18next';
import { Pagination } from '@mui/material';


const page = () => {
  const dispatch = useDispatch();
  const {publicBlogs, loading} = useSelector((state) => state.blog);
  const language = useSelector((state) => state.language.language);
  // search state
  const [title, setTitle] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  // pagenat state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  
  useEffect(() => {
    dispatch(getAllActiveBlogs());
  },[])  


  const handleSearch = (e) => {
    const value = e.target.value;
    setTitle(value);
  
    const searchValue = value.trim().toLowerCase();
  
    if (searchValue === '') {
      setFilteredBlogs(publicBlogs); // عرض كل البلوجات لو مفيش كتابة
      return;
    }
  
    const filtered = publicBlogs.filter((blog) =>
      blog.title[language]?.toLowerCase().includes(searchValue)
    );
  
    setFilteredBlogs(filtered);
  };
  useEffect(() => {
    setFilteredBlogs(publicBlogs);
  }, [publicBlogs]);
  


  return (
    <>
<IntroSections sectionName={t('blog.section_name')} path='blog' Link={t('blog.link_text')} />
<section className='blogs'>
      <div className='container'>
          <div className="search">
          <TextField
            fullWidth
            margin="normal"
            label={t('blog.search_label')}
            name="name"
            value={title}
            onChange={handleSearch}
            required
          />

          </div>
          <div className="row">
            {filteredBlogs.length > 0 ? (
              paginatedBlogs.map((blog) => {
                return (
                  <div className='col-lg-4 col-md-6' key={blog._id}>
                    <div className="box">
                      <div className="image">
                        <Image loading="lazy" src={blog.image} alt={blog.title[language]} width={300} height={250}/>
                      </div>
                      <div className="content">
                        <h4> {blog.title[language]} </h4>
                        <span> {blog.author} </span>
                        <p>{blog.description[language].slice(0, 110)}...</p>
                          <Link href={`/blog/${blog.slug}`} alt={blog.title[language]}>
                            {t('blog.read')}
                        </Link>
                      </div>                      
                    </div>
                  </div>
                )
              })  
            ) : (
              <Alert severity="info" sx={{ mt: 2 }}>
                <div>{t('blog.noResults')}</div>
              </Alert>
            )
              

            }  
          </div>

          <Pagination
  count={totalPages}
  page={currentPage}
  onChange={(e, value) => setCurrentPage(value)}
  color="primary"
  sx={{
    mt: 3,
    display: 'flex',
    justifyContent: 'center',
    direction: 'rtl',
    '& .MuiPagination-ul': {
      flexDirection: 'row-reverse',
      justifyContent: 'center',
    },
  }}
/>
       
          
      </div>
    </section>      
    </>
  )
}

export default page
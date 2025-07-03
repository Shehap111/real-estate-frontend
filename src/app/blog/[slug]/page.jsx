'use client';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActiveBlogs, getBlogBySlug } from '@/redux/slices/blogSlices';
import { CircularProgress, Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import IntroSections from '@/components/IntroSections';

const BlogPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const language = i18n.language || 'en';

  const { publicBlogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    if (slug) {
      dispatch(getBlogBySlug(slug));
      dispatch(getAllActiveBlogs());
    }
  }, [slug]);

  const blog = useMemo(() => {
    return publicBlogs.find((b) => b.slug === slug);
  }, [publicBlogs, slug]);

  if (loading || !blog) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

    return (
      
    <>
      <IntroSections  sectionName={blog.title.en} path='blog' Link='Blogs' /> 
<Container maxWidth="md" sx={{ mt: 8, mb: 12 }}>
  {/* ====== Title ====== */}


  {/* ====== Author & Date ====== */}
  <Box display="flex" gap={3} flexWrap="wrap" mb={3}>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      ✍️ {t('blog.author')}: <strong>{blog.author}</strong>
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      📅 {t('blog.date')}: {format(new Date(blog.createdAt), 'dd MMM yyyy')}
    </Typography>
  </Box>

  {/* ====== Image ====== */}
  <Box mb={4} borderRadius={3} overflow="hidden">
    <Image
      src={blog.image}
      alt={blog.title?.[language]}
      width={300}
      height={300}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '16px',
      }}
    />
  </Box>

  {/* ====== Description ====== */}
  <Typography
    variant="h6"
    sx={{
      color: 'text.secondary',
      fontSize: '1.1rem',
      mb: 4,
      lineHeight: 1.8,
    }}
  >
    {blog.description?.[language]}
  </Typography>

  {/* ====== Content ====== */}
  <Box
    sx={{
      fontSize: '1.125rem',
      lineHeight: 1.9,
      color: 'text.primary',
      mb: 6,
    }}
    dangerouslySetInnerHTML={{ __html: blog.content?.[language] }}
  />

  <Box
    sx={{
      backgroundColor: '#f1f5f9',
      borderLeft: '6px solid #1976d2',
      p: 4,
      borderRadius: 3,
      boxShadow: 1,
    }}
  >
    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
    📄 Description
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {blog.description?.[language]}
    </Typography>

  </Box>
</Container>    
            

    </>    


  );
};

export default BlogPage;

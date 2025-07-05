'use client'
import {getAllActiveBlogs} from '@/redux/slices/blogSlices';
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import '../blog/blogs.css'
import {useTranslation} from 'react-i18next';

const Section_5 = () => {
    const {t} = useTranslation();
    const language = useSelector((state) => state.language.language);
    const dispatch = useDispatch();
    const {publicBlogs, loading} = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllActiveBlogs());
  },[])  


  return (
    <section className='blogs'>
      <div className='container'>
        <div className="intro">
          <h3>{t("home_page.home_Section_5.title")}</h3>
          <p>{t("home_page.home_Section_5.description")}</p>
        </div>
          <div className="row">
            {publicBlogs.length > 0 ? (
              publicBlogs.slice(0,3).map((blog) => {
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
                            {t("home_page.home_Section_5.read")}
                        </Link>
                      </div>                      
                    </div>
                  </div>
                )
              })  
            ) : (
                <div>
                  {t("home_page.home_Section_5.no_blogs")}
                </div>

            )
              

            }  
          </div>      
          <Link className='btn_style' href='/properties' alt='Top Rated Properties You Can Trust'>   {t("home_page.home_Section_5.see_more")}          </Link>
      </div>
    </section>  
  )
}

export default Section_5
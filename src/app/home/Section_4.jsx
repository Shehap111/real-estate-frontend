'use client'
import {getAllProperties} from '@/redux/slices/propertySlice';
import React, {useEffect, useMemo} from 'react'
import {useDispatch ,useSelector} from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import { GoArrowRight } from 'react-icons/go';
import { CircularProgress } from '@mui/material';
import '../properties/properties.css'
import {useTranslation} from 'react-i18next';

const Section_4 = () => {
      const {t} = useTranslation();
    const language = useSelector((state) => state.language.language);
    const dispatch = useDispatch();
    const {publicProperties, loading, error} = useSelector((state) => state.property);
    const isArabic = language === 'ar';


    useEffect(() => {
        dispatch(getAllProperties());
    },[dispatch])

    
    const getPropertyByRaite = useMemo(() => {
        return [...publicProperties].filter((p) => typeof p.rating === 'number').sort((a, b) => b.rating - a.rating);
      }, [publicProperties]);
      

    
    
  return (
    <section className="properties">
    <div className="container">
    <div className="intro">
          <h3>{t("home_page.home_Section_4.title")}</h3>
          <p>{t("home_page.home_Section_4.description")}</p>
        </div>

      <div className="row">
        {getPropertyByRaite.slice(0,6).map((p) => (
          <div className="col-lg-4 col-md-6" key={p._id}>
            <div className="box">
              <div className="image">
                <Link href={`/properties/${p.slug}`} alt={p.title[language]}>
                  <Image
                    src={p.images[0]}
                    alt={p.title[language]}
                    width={350}
                    height={300}
                    loading="lazy"
                  />
                </Link>
              </div>
              <div className="box_contant">
                <Link href={`/properties/${p.slug}`} alt={p.title[language]}>
                  <h4>{p.title[language]}</h4>
                </Link>
                <h6>{p.location[language]}</h6>
                <p>{p.description[language].slice(0, 100)}...</p>
                <div className="foot">
                  <span className="price">
                    ${p.price.toLocaleString()}
                  </span>
                  <ul>
                  <Rating
                  value={Number(p.rating)}
                  precision={0.1}
                  readOnly
                  sx={{
                    ...(isArabic && {
                      transform: 'scaleX(-1)',
                      direction: 'ltr',
                    }),
                    fontSize: 24,
                    color: '#f5a623',
                  }}
                  />
              </ul>
                </div>
                <Link href={`/properties/${p.slug}`} alt={p.title[language]}>
                    {t("home_page.home_Section_4.more_details")}
              </Link>
              </div>
            </div>
          </div>
        ))}
              <Link className='btn_style' href='/properties' alt='Top Rated Properties You Can Trust'> {t("home_page.home_Section_5.see_more")}  </Link>
      </div>
    </div>
  </section>
  )
}

export default Section_4
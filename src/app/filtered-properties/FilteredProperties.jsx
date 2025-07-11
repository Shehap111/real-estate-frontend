'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties } from '@/redux/slices/propertySlice';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { Rating } from '@mui/material';
import { GoArrowRight } from 'react-icons/go';
import IntroSections from '@/components/IntroSections'; 
import '../properties/properties.css'
import {useTranslation} from 'react-i18next';

const FilteredProperties = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const searchParams = useSearchParams();
  const { publicProperties, loading: loadingProperties } = useSelector((state) => state.property);
  const {t} = useTranslation()
  const isArabic = language === 'ar';

  const [filters, setFilters] = useState({
    operation: '',
    areaMin: 0,
    areaMax: Infinity,
    city: '',
    bedrooms: 0,
    type: '',
    keyword: '',
  });

  useEffect(() => {
    if (!publicProperties.length) {
      dispatch(getAllProperties());
    }
  }, [dispatch, publicProperties.length]);

  useEffect(() => {
    setFilters({
      operation: searchParams.get('operation') || '',
      areaMin: Number(searchParams.get('areaMin') || 0),
      areaMax: Number(searchParams.get('areaMax') || Infinity),
      city: searchParams.get('city') || '',
      bedrooms: Number(searchParams.get('bedrooms') || 0),
      type: searchParams.get('type') || '',
      keyword: searchParams.get('keyword')?.toLowerCase() || '',
    });
  }, [searchParams.toString()]);

  const filtered = useMemo(() => {
    return publicProperties
      .filter(Boolean)
      .filter((property) => {
        const matchOperation =
          filters.operation === '' || property.operationType === filters.operation;
  
        const matchCity =
          filters.city === '' ||
          property.cityId === filters.city ||
          property.cityId?._id === filters.city;
  
        const matchType =
          filters.type === '' ||
          property.propertyTypeId === filters.type ||
          property.propertyTypeId?._id === filters.type;
          
          const matchBedrooms =
          filters.bedrooms === 0 ||
          property.bedrooms === filters.bedrooms ||
          property.bedrooms === filters.bedrooms;    
          // filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms;

        const matchArea =
          property.area >= filters.areaMin && property.area <= filters.areaMax;
  
        const matchKeyword =
          filters.keyword === '' ||
          property.title?.[language]?.toLowerCase().includes(filters.keyword);
  
        return matchOperation && matchCity && matchType && matchArea && matchKeyword && matchBedrooms ;
      });
  }, [publicProperties, filters, language]);
  
  return (
    <div>
<IntroSections
  sectionName={t("filtered.section_title")}
  Link={t("filtered.breadcrumb")}
  path="properties"
/>  
      <section className="properties">
        <div className="container">
          <div className="row">
            {filtered.map((p) => (
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
                        {t("filtered.more_details")} <GoArrowRight />
                      </Link>
                  </div>
                </div>
              </div>
            ))}
  
            {!loadingProperties &&
              publicProperties.length > 0 &&
              filtered.length === 0 && (
                <div className="no-matches">
                  <h3
                    style={{
                      textAlign: 'center',
                      width: '100%',
                      padding: '2rem 0',
                    }}
                  >
                    😢 {t("filtered.no_properties")}
                  </h3>
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilteredProperties;

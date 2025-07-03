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
const FilteredProperties = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const searchParams = useSearchParams();
  const { publicProperties, loading: loadingProperties } = useSelector((state) => state.property);

  const [filters, setFilters] = useState({
    operation: '',
    areaMin: 0,
    areaMax: Infinity,
    city: '',
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
          
        const matchArea =
          property.area >= filters.areaMin && property.area <= filters.areaMax;
  
        const matchKeyword =
          filters.keyword === '' ||
          property.title?.[language]?.toLowerCase().includes(filters.keyword);
  
        return matchOperation && matchCity && matchType && matchArea && matchKeyword;
      });
  }, [publicProperties, filters, language]);
  
  return (
    <div>
      <IntroSections sectionName="Filtered Properties" Link="Properties" path="properties" />
  
      <section className="properties">
        <div className="container">
          <div className="row">
            {filtered.map((p) => (
              <div className="col-lg-4 col-md-6" key={p._id}>
                <div className="box">
                  <div className="image">
                    <Link href={`/property/${p.slug}`} alt={p.title[language]}>
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
                    <Link href={`/property/${p.slug}`} alt={p.title[language]}>
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
                          value={p.rating}
                          precision={0.1}
                          readOnly
                        />
                      </ul>
                    </div>
  
                    <Link href={`/property/${p.slug}`} alt={p.title[language]}>
                      MORE DETAILS <GoArrowRight />
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
                    😢 {language === 'ar'
                      ? 'لا توجد عقارات للإيجار.'
                      : 'No Filtered  properties found.'}
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

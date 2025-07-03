'use client'
import IntroSections from '@/components/IntroSections';
import {getAllProperties} from '@/redux/slices/propertySlice';
import Select from 'react-select';
import React, {useEffect, useState, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './properties.css'
import {GoArrowRight} from 'react-icons/go';
import {Rating} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { FormControl, MenuItem, Pagination } from '@mui/material';

const page = () => {
    const language = useSelector((state) => state.language.language);
    const dispatch = useDispatch();
    const {publicProperties, loading }=useSelector((state) => state.property)
    // state 
    const [sortByDate, setSortByDate] = useState('');
    const [sortByPrice, setSortByPrice] = useState('');
    const [sortOption, setSortOption] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        dispatch(getAllProperties());
    },[dispatch])

    const sortedProperties = useMemo(() => {
        let props = [...publicProperties];
      
        switch (sortOption?.value) {
          case 'newest':
            props.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'oldest':
            props.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
          case 'low':
            props.sort((a, b) => a.price - b.price);
            break;
          case 'high':
            props.sort((a, b) => b.price - a.price);
            break;
          default:
            break;
        }
      
        return props;
      }, [publicProperties, sortOption]);
      
      const paginatedProperties = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return sortedProperties.slice(start, start + itemsPerPage);
      }, [sortedProperties, page]);
      
      const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'low', label: 'Lowest Price' },
        { value: 'high', label: 'Highest Price' },
      ];

  return (
<div>
<IntroSections sectionName='Properties' Link='Properties' path='properties'/>
<section className="properties">
<div className="container">
<div className="filters" style={{ maxWidth: 250, margin: '20px 0' }}>
  <Select
    options={sortOptions}
    value={sortOption}
    onChange={(selected) => {
      setSortOption(selected);
      setPage(1); // Reset page when sorting changes
    }}
    isClearable
    placeholder="Sort by..."
    styles={{
      control: (base) => ({
        ...base,
        minHeight: 40,
        borderRadius: 8,
        borderColor: '#ccc',
        boxShadow: 'none',
      }),
      menu: (base) => ({
        ...base,
        zIndex: 9999, // مهم علشان ما يخشش تحت الحاجات التانية
      }),
    }}
  />
</div>  
    {/*  */}
    <div className="row">
    {paginatedProperties.map((p) => (
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
                    value={p.rating}
                    precision={0.1}
                    readOnly
                />
                </ul>
            </div>

            <Link href={`/properties/${p.slug}`} alt={p.title[language]}>
                MORE DETAILS <GoArrowRight />
            </Link>
            </div>
        </div>
        </div>
    ))}

    {/* {!loading &&
        publicProperties.length > 0 &&
        publicProperties.length === 0 && (
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
        )} */}
    </div>
</div>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
  <Pagination
    count={Math.ceil(sortedProperties.length / itemsPerPage)}
    page={page}
    onChange={(e, value) => setPage(value)}
    color="primary"
  />
</div>        
</section>
          
</div>
  )
}

export default page
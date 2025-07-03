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

const Section_4 = () => {
    const language = useSelector((state) => state.language.language);
    const dispatch = useDispatch();
    const {publicProperties, loading, error} = useSelector((state) => state.property);


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
        <h3>Top Rated Properties You Can Trust</h3>
        <p>Discover the highest-rated properties handpicked by our community. Quality, comfort, and great locations — all in one place.</p>
    </div>

      <div className="row">
        {getPropertyByRaite.slice(0,6).map((p) => (
          <div className="col-lg-4 col-md-6" key={p._id}>
            <div className="box">
              <div className="image">
                <Link href={`adadsads`} alt={p.title[language]}>
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
                <Link href={`adadsads`} alt={p.title[language]}>
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
                <Link href={`adadsads`} alt={p.title[language]}>
                  MORE DETAILS <GoArrowRight />
                </Link>
              </div>
            </div>
          </div>
        ))}
              <Link className='btn_style' href='/properties' alt='Top Rated Properties You Can Trust'> See More </Link>
      </div>
    </div>
  </section>
  )
}

export default Section_4
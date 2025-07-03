'use client'
import IntroSections from '@/components/IntroSections';
import {getAllProperties} from '@/redux/slices/propertySlice';
import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../properties/properties.css'
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import { GoArrowRight } from "react-icons/go";
import {CircularProgress} from '@mui/material';


const page = () => {
  const language = useSelector((state)=>state.language.language)
  const dispatch = useDispatch();
  const {publicProperties, loading, error} = useSelector((state) => state.property);
  useEffect(() => {
    dispatch(getAllProperties());
  },[dispatch])

  const filteredBuyProperties = useMemo(() => {
    return publicProperties?.filter(
      (property) => property.operationType === 'sale'
    ) || [];
  }, [publicProperties]);
  

if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center',justifyItems:"center", marginTop: 50, height:"400px" }}>
        <CircularProgress />
      </div>
    );
}  
  return (
    <div>
<IntroSections  sectionName="Buy" Link="Buy" path="buy" /> 
<section className='properties'>
<div className="container">
<div className="row">

{
filteredBuyProperties.map((p) => {
  return (
    <div className="col-lg-4 col-md-6" key={p._id}>
      <div className="box">
        <div className="image">
          <Link href={`adadsads`} alt={p.title[language]}>
            <Image src={p.images[0]} alt={p.title[language]} width={350} height={300} loading='lazy' />
          </Link>
        </div>
        <div className="box_contant">
          <Link href={`adadsads`} alt={p.title[language]}> <h4> {p.title[language]} </h4> </Link>
          <h6> {p.location[language]} </h6>
          <p> {p.description[language].slice(0 , 100)}... </p>
          <div className="foot">
            <span className='price'>  ${p.price.toLocaleString()} </span>
            <ul>
              {/* <span className='rating'> {p.rating} </span> */}
              <Rating value={p.rating} precision={0.1} readOnly />
            </ul>
          </div>
            <Link href={`adadsads`} alt={p.title[language]}> MORE DETAILS   <GoArrowRight /> </Link>
        </div>
      </div>  
      
    </div>
    )
})         
}            

{!loading && publicProperties.length > 0 && filteredBuyProperties.length === 0 && (
  <div className="no-matches">
    <h3 style={{ textAlign: 'center', width: '100%', padding: '2rem 0' }}>
      😢 No properties found for sale.
    </h3>
  </div>
)}
</div>
</div>        
</section>


    </div>
  )
}

export default page
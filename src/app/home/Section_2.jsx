'use client'
import {getAllPropertyTypes} from '@/redux/slices/propertyTypeSlice';
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Image from 'next/image';
import Link from 'next/link';
const Section_2 = () => {
    const dispatch = useDispatch();
    const {list, loading, error} = useSelector((state) => state.propertyTypes)
    const language = useSelector((state) => state.language.language);
    
    useEffect(() => {
       dispatch(getAllPropertyTypes()) 
    },[])

    

  return (
<div className='Section_2'>
<div className="container">
<div className="intro">
              <h3> Explore Available Property Types </h3>
            <p>Browse a wide range of property types to find what suits your needs — from apartments and villas to commercial spaces and lands.</p>
          </div>         
    <div className="row">
    {
        list.map((p) => {
            return (
                <div className='col-lg-3' key={p._id}>
                    <Link href={`/propertiesByTyps/${p._id}`} alt={p.name[language]}>
                    <div className="box">
                        <div className="image">
                            <Image loading="lazy" width={300} height={250} src={p.image} alt={ p.name.en } />
                            <h4 className='title'> {p.name[language]} </h4>
                        </div>
                    </div>
                    </Link>
                </div>
            )    
        })
    }          
    </div>    
              
</div>
</div>
  )
}

export default Section_2
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import '../properties.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProperties, getPropertyBySlug } from '@/redux/slices/propertySlice'
import { useParams } from 'next/navigation'
import IntroSections from '@/components/IntroSections'
import PhotoSphereViewerContainer from '@/components/PhotoSphereViewerContainer';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import {getAllPropertyTypes} from '@/redux/slices/propertyTypeSlice'
import {getAllCities} from '@/redux/slices/citySlice'
import PropertyDetails from './PropertyDetails'
import { Box } from '@mui/material'

const page = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.language)
  const { selectedProperty } = useSelector((state) => state.property)
  const { list:listTypes } = useSelector((state) => state.propertyTypes)
  const { list:listCities } = useSelector((state) => state.cities)

  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  useEffect(() => {
    if (slug) {
        const decodedSlug = decodeURIComponent(slug)
        dispatch(getPropertyBySlug(decodedSlug))
        dispatch(getAllCities());
        dispatch(getAllPropertyTypes());
    }
  }, [slug])


// function to get city name by cityId
const cityName = useMemo(() => {
    const cityId = selectedProperty?.cityId;
    if (!cityId || !listCities.length) return '';
  
    const id = typeof cityId === 'object' ? cityId._id || cityId?.$oid : cityId;
    const city = listCities.find((c) => String(c._id) === String(id));
    return city ? city.name[language] : '';
}, [selectedProperty?.cityId, listCities]);
    
// function to get city name by cityId
const typeName = useMemo(() => {
    const propertyTypeId = selectedProperty?.propertyTypeId;
    if (!propertyTypeId || !listTypes.length) return '';
  
    const id = typeof propertyTypeId === 'object' ? propertyTypeId._id || propertyTypeId?.$oid : propertyTypeId;
    const city = listTypes.find((c) => String(c._id) === String(id));
    return city ? city.name[language] : '';
}, [selectedProperty?.propertyTypeId, listTypes]);    
    
console.log("getCityName" , cityName);
console.log("typeName" , typeName);
    
  return (
    <div>
      <IntroSections sectionName={selectedProperty?.title[language]} path="properties" Link="Properties" />

      <section className="single">
        <div className="container">
        <Box       sx={{ p: 4 , mb:5, background: '#fff', borderRadius: 3, boxShadow: 2 }}>
        <div className="row">
        <div className="col-lg-8 box">
              {/* ✅ Image Slider */}
              {selectedProperty?.images?.length > 0 && (
                <>
                  <Swiper
                    modules={[Thumbs, Navigation]}
                    spaceBetween={10}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    className="main-slider"
                    style={{ marginBottom: '10px' }}
                  >
                    {selectedProperty.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={`Slide ${i}`}
                          style={{
                            width: '100%',
                            borderRadius: '10px',
                            maxHeight: '500px',
                            objectFit: 'cover',
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress
                    className="thumb-slider"
                  >
                    {selectedProperty.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={`Thumb ${i}`}
                          style={{
                            width: '100%',
                            height: '90px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            border: '2px solid #eee',
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}
            </div>
        <div className="col-lg-4 box" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* ✅ فيديو العقار */}
            {selectedProperty?.videoUrl && (
                <div>
                <h5 style={{ marginBottom: '10px' }}>📹 فيديو العقار</h5>
                <iframe width="100%" 
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                            maxHeight: '250px',
                            objectFit: 'cover',
                            border: '1px solid #ccc',
                        }}
                height="250" src={selectedProperty.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                
                </div>
            )}

            {/* ✅ صورة 360 درجة */}
            {selectedProperty?.image360 && (
                <div>
                <h5 style={{ marginBottom: '10px' }}>🌀 عرض 360 درجة</h5>
                <div
                    style={{
                    width: '100%',
                    height: '250px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid #ccc',
                    }}
                >
  <PhotoSphereViewerContainer imageUrl={selectedProperty.image360} />
                                  </div>
                                  {/* */}
                </div>
            )}
        </div>              
        </div>  
        </Box>
        <div className="contant_box">
            
                <PropertyDetails
                selectedProperty={selectedProperty}
                cityName={cityName}
                propertyTypeName={typeName}
                />
        </div>



        </div>
      </section>
    </div>
  )
}

export default page

'use client';
import IntroSections from '@/components/IntroSections';
import { getAllProperties } from '@/redux/slices/propertySlice';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../properties/properties.css';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import { GoArrowRight } from 'react-icons/go';
import { CircularProgress } from '@mui/material';
import {useTranslation} from 'react-i18next';

const Page = () => {
  const {t} = useTranslation();
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const { publicProperties, loading } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  const filteredRentProperties = useMemo(() => {
    return (
      publicProperties?.filter(
        (property) => property.operationType === 'rent'
      ) || []
    );
  }, [publicProperties]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 50,
          height: '400px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
<IntroSections sectionName={t("rent.section_title")} Link={t("rent.section_link")} path="rent" />
<section className="properties">
        <div className="container">
          <div className="row">
            {filteredRentProperties.map((p) => (
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
                        {t("rent.more_details")} <GoArrowRight />
                      </Link>
                  </div>
                </div>
              </div>
            ))}

            {!loading &&
              publicProperties.length > 0 &&
              filteredRentProperties.length === 0 && (
                <div className="no-matches">
<h3
  style={{
    textAlign: 'center',
    width: '100%',
    padding: '2rem 0',
  }}
>
  😢 {t("rent.no_properties")}
</h3>
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;

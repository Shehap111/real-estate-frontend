'use client'
import React from 'react'
import Image from 'next/image'
import img1 from '../../../public/images/laptop.webp'
import img2 from '../../../public/images/professional-success.webp'
import img3 from '../../../public/images/success.webp'
import img4 from '../../../public/images/about-thumb-01.webp'
import img5 from '../../../public/images/about-thumb-small-01.webp'
import shape1 from '../../../public/images/about-book-shape.webp'; 
import shape2 from '../../../public/images/about-wave-shape.webp'; 
import shape3 from '../../../public/images/dot-shape-01.webp'; 
import shape4 from '../../../public/images/about-circle.webp'; 
import Link from 'next/link'
import { useTranslation } from 'react-i18next';

const Section_3 = () => {
const { t } = useTranslation(); 
return (
<section className='S3_home about_S2'>
  <div className="container">
    <div className="shaps">
      <li className='shapeimg shape1'><Image loading="lazy" src={shape1} alt='shape1' /></li>
      <li className='shapeimg shape2'><Image loading="lazy" src={shape2} alt='shape2' /></li>
      <li className='shapeimg shape3'><Image loading="lazy" src={shape3} alt='shape3' /></li>
      <li className='shapeimg shape4'><Image loading="lazy" src={shape4} alt='shape4' /></li>
    </div>

    <div className="row">
      <div className="col-lg-6 left_box_container">
        <div className="box">
          <div className="big_img">
            <Image loading="lazy" width={500} height={500} src={img4} alt='about big image' />
          </div>
          <div className="small_img">
            <Image loading="lazy" width={300} height={300} src={img5} alt='about small image' />
          </div>
        </div>
      </div>

      <div className="col-lg-6 right_box_container">
        <div className="box">
          <span>{t('about_section_2.about_title')}</span>
          <h3>{t('about_section_2.main_heading')}</h3>
          <p>{t('about_section_2.main_paragraph')}</p>

          <ul>
            <li className='img_cont'>
              <Image width={50} height={50} loading="lazy" src={img1} alt='Professional System' />
            </li>
            <li>
              <h5>{t('about_section_2.features.professional_system.title')}</h5>
              <p>{t('about_section_2.features.professional_system.description')}</p>
            </li>
          </ul>

          <ul>
            <li className='img_cont'>
              <Image width={50} height={50} loading="lazy" src={img2} alt='Global Standards' />
            </li>
            <li>
              <h5>{t('about_section_2.features.global_standards.title')}</h5>
              <p>{t('about_section_2.features.global_standards.description')}</p>
            </li>
          </ul>

          <ul>
            <li className='img_cont'>
              <Image width={50} height={50} loading="lazy" src={img3} alt='Client Trust' />
            </li>
            <li>
              <h5>{t('about_section_2.features.client_trust.title')}</h5>
              <p>{t('about_section_2.features.client_trust.description')}</p>
            </li>
          </ul>

          <Link className='btn_style' href="/about">
            {t('about_section_2.read_more')}
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Section_3
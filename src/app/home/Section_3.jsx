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
<section className='S3_home'>
<div className="container">
        <div className="shaps">
                <li className='shapeimg shape1'> <Image loading="lazy" src={shape1} alt='Flexible Classes'/> </li>    
                <li className='shapeimg shape2'> <Image loading="lazy" src={shape2} alt='Flexible Classes'/> </li>    
                <li className='shapeimg shape3'> <Image loading="lazy" src={shape3} alt='Flexible Classes'/> </li>    
                <li className='shapeimg shape4'> <Image loading="lazy" src={shape4} alt='Flexible Classes'/> </li>    
        </div>

<div className="row">
    <div className="col-lg-6 left_box_container">
        <div className="box">
            <div className="big_img">
                <Image loading="lazy" width={500} height={500} src={img4} alt='Flexible Classes'/>    
            </div>         
            <div className="small_img">
                <Image loading="lazy" width={300} height={300} src={img5} alt='Flexible Classes'/>    
            </div>
        </div>
    </div>    

    <div className="col-lg-6 right_box_container">
        <div className="box">
            <span>{t('home_section_3.about_title')}</span>
            <h3> {t('home_section_3.main_heading')} </h3>
            <p> {t('home_section_3.main_paragraph')}</p>
            <ul>
                <li className='img_cont'> <Image width={50} height={50} loading="lazy" src={img1} alt='Flexible Classes'/> </li>    
                <li>
                    <h5>{t('home_section_3.features.flexible_classes.title')}</h5>
                    <p> {t('home_section_3.features.flexible_classes.description')} </p>
                </li>    
            </ul>
            <ul>
                <li className='img_cont'> <Image width={50} height={50} loading="lazy" src={img2} alt='Flexible Classes'/> </li>    
                <li>
                    <h5>{t('home_section_3.features.Expert_Trainers.title')}</h5>
                    <p> {t('home_section_3.features.Expert_Trainers.description')} </p>                </li>    
            </ul>
            <ul > 
                <li className='img_cont'> <Image loading="lazy" width={50} height={50}  src={img3} alt='Flexible Classes'/> </li>    
                <li>
                    <h5>{t('home_section_3.features.Build_Your_Career.title')}</h5>
                    <p> {t('home_section_3.features.Build_Your_Career.description')} </p>                </li>    
            </ul>       
            <Link className='btn_style' href="/about"> {t('home_section_3.read_more')}  </Link>            
    </div>
    </div>                

</div>        
</div>        
</section>
  )
}

export default Section_3
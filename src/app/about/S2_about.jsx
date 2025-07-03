import React from 'react'
import S2_about_1 from "../../../public/images/S2-about-1.webp"
import S2_about_2 from "../../../public/images/S2-about-2.webp"
import S2_about_3 from "../../../public/images/S2-about-3.webp"
import S2_about_4 from "../../../public/images/S2-about-4.webp"
import S2_about_5 from "../../../public/images/S2-about-5.webp"
import S2_about_6 from "../../../public/images/S2-about-6.webp"
import '../home/home.css'
import Image from 'next/image'
import {useTranslation} from 'react-i18next'

const S2_about = () => {

    const {t} = useTranslation();
  return (
<section className='S2_about'>
<div className='container'>
    <div className='intro'>
        <span> {t('about_section_1.our_team.subtitle')}  </span>
        <h3> {t('about_section_1.our_team.title')} </h3> 
        <p>{t('about_section_1.our_team.description')}</p>          

    </div>

<div className='row mt-5'>
                  
<div className='col-lg-4 col-md-6'>
    <div className='card'>                
    <Image className='S2_about_img' width={100} height={100} src={S2_about_1} loading='lazy' alt='S2_about img'/>
    <h5>Harvey Spector</h5>
    <span>Founder - CEO</span>                  
    </div>                     
    </div>          

<div className='col-lg-4 col-md-6'>
    <div className='card'>       
    <Image className='S2_about_img' width={100} height={100} src={S2_about_2} loading='lazy' alt='S2_about img'/>
    <h5>Jessica Pearson</h5>
    <span>COO</span> 
    </div> 
    </div> 
                  
<div className='col-lg-4 col-md-6'>
    <div className='card'>      
    <Image className='S2_about_img' width={100} height={100} src={S2_about_3} loading='lazy' alt='S2_about img'/>
    <h5>Rachel Zain</h5>
    <span>Marketing Head</span>              
    </div>
    </div> 

<div className='col-lg-4 col-md-6'>
    <div className='card'>        
    <Image className='S2_about_img' width={100} height={100} src={S2_about_4} loading='lazy' alt='S2_about img'/>
    <h5>Luise Litt</h5>
    <span>Lead Developer</span>              
    </div>
    </div> 
        
<div className='col-lg-4 col-md-6'>
    <div className='card'>              
    <Image className='S2_about_img' width={100} height={100} src={S2_about_5} loading='lazy' alt='S2_about img'/>
    <h5>Katrina Bennett</h5>
    <span>Intern Designer</span>            
    </div>  
    </div> 

<div className='col-lg-4 col-md-6'>
    <div className='card'>                   
    <Image className='S2_about_img' width={100} height={100} src={S2_about_6} loading='lazy' alt='S2_about img'/>
    <h5>Mike Ross</h5>
    <span>Intern Designer</span>
    </div> 
    </div>                   

</div>  
</div> 
</section>
  )
}

export default S2_about
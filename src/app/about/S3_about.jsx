'use client'
import React, {useEffect} from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaTiktok,
  FaTelegram,
  FaThreads,
  FaXTwitter,
  FaGlobe
} from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import {useDispatch, useSelector} from 'react-redux';
import {getContactInfo} from '@/redux/slices/contactSlice';
import {CircularProgress} from '@mui/material';

const S3_about = () => {
const dispatch = useDispatch();
const {contactInfo , loading , error  } = useSelector((state)=> state.contact)

useEffect(() => {
  dispatch(getContactInfo());
},[])  

const socialIcons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
  telegram: FaTelegram,
  threads: FaThreads,
  x: FaXTwitter,
  snapchat: FaSnapchatGhost,
  website: FaGlobe,
};


if (loading ) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress />
      </div>
    );
}
  return (
<section className='S3_about'>
    <div className='Follow'>
        <h3>Follow Us</h3>

<ul>
{Object.entries(socialIcons).map(([key, Icon]) => {
    const url = contactInfo?.[key];

    // شرط يتحقق إن اللينك مش undefined ومش null ومش فاضي بعد إزالة المسافات
    if (!url || url.trim() === "") return null;

    return (
      <li key={key}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Icon size={30} />
        </a>
      </li>
    );
  })}
</ul>



    </div>   

</section>
  )
}

export default S3_about
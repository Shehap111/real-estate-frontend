'use client';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage ,resetStatus , getContactInfo} from '../../redux/slices/contactSlice';
import { toast } from 'react-toastify';
import IntroSections from '../../components/IntroSections';
import Image from 'next/image';
import img1 from '../../../public/images/about-thumb-01.webp';
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { IoLogoYoutube } from 'react-icons/io5'
import MapEmbed from './MapEmbed';
import {useTranslation} from 'react-i18next';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaTiktok,
  FaTelegram,
  FaGlobe,
  FaSnapchatGhost,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import {   FaThreads } from "react-icons/fa6"; // دي موجودة
import { FaTwitter } from "react-icons/fa";
import {Link} from 'lucide-react';
import './contant.css'




const ContactForm = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const { loading, success, error , contactInfo } = useSelector((state) => state.contact);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });

const {t} = useTranslation()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMessage(form));
  };

  useEffect(() => {
    if (success) {
      setForm({name: '', email: '', phone: '', message: ''});
      dispatch(resetStatus());
    }
    if (error) {
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);


// CONTACT INFO

  useEffect(() => {
    dispatch(getContactInfo());
  },[dispatch])


  const socialIcons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    youtube: FaYoutube,
    linkedin: FaLinkedinIn,
    whatsapp: FaWhatsapp,
    tiktok: FaTiktok,
    telegram: FaTelegram,
    threads: FaThreads,
    x: FaTwitter,
    snapchat: FaSnapchatGhost,
    website: FaGlobe,
  };  


  const data = contactInfo || {};
  if (loading) 
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress />
      </div>
    );
  

return (
  <>
    <IntroSections
      sectionName={t("contact.sectionTitle")}
      path="/contact"
      Link={t("contact.breadcrumb")}
    />

    <section className="contant">
      <div className="container">
        <div className="row">
          {/* Left Section: Logo and Description */}
          <div className="col-lg-6">
            <Image
              src={data.logo}
              alt={t("contact.sectionTitle")}
              width={250}
              height={200}
              className="contact-image"
              loading="lazy"
            />
            <p>{data?.description?.[language] ?? ""}</p>
          </div>

          {/* Right Section: Contact Form */}
          <div className="col-lg-6">
            <h3>{t("contact.getInTouch")}</h3>
            <p>{t("contact.teamMessage")}</p>

            <Box noValidate>
              <form onSubmit={handleSubmit} action="">
                <TextField
                  fullWidth
                  margin="normal"
                  label={t("contact.yourName")}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={t("contact.yourEmail")}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={t("contact.yourPhone")}
                  name="phone"
                  type="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label={t("contact.yourMessage")}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                />

                <Box mt={2} textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ px: 5, py: 1 }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t("contact.send")
                    )}
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </div>

        {/* Contact Info Boxes */}
        <div className="row information">
          <div className="col-lg-3">
            <div className="box">
              <FaMapMarkerAlt />
              <h4 className="mb-3">{t("contact.cairoOffice")}</h4>
              <p>{data.address}</p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="box aaa">
              <FaPhoneAlt />
              <h4 className="mb-3">{t("contact.callUs")}</h4>
              <a href={`tel:${data.phone}`}>{data.phone}</a>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="box">
              <FaEnvelope />
              <h4 className="mb-3">{t("contact.emailUs")}</h4>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="box">
              <MdLocationCity />
              <h4>{t("contact.followUs")}</h4>
              <div className="social">
                {Object.entries(socialIcons).map(([key, Icon]) => {
                  const url = contactInfo?.[key];
                  if (!url || url.trim() === "") return null;

                  return (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <Icon size={30} />
                      </a>
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="map">
          <MapEmbed path={data.locationLink} />
        </div>
      </div>
    </section>
  </>
);
    
};

export default ContactForm;

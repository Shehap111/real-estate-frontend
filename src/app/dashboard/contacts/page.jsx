'use client'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { updateContactInfo,getContactInfo } from "@/redux/slices/contactSlice";
import {uploadImage} from '@/redux/slices/UploadsSlice';

const page = () => {

  const dispatch = useDispatch();
  const {contactInfo, loading, error} = useSelector((state) => state.contact)
  // Contact Info States
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [locationLink, setLocationLink] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [snapchat, setSnapchat] = useState('');
  const [telegram, setTelegram] = useState('');
  const [threads, setThreads] = useState('');
  const [x, setX] = useState('');
  const [website, setWebsite] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    dispatch(getContactInfo());
  }, [dispatch]);


const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        dispatch(uploadImage(file)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setLogo(res.payload); 
        }
        });
    }
};

  useEffect(() => {
    if (contactInfo) {
      setEmail(contactInfo.email || '');
      setPhone(contactInfo.phone || '');
      setAddress(contactInfo.address || '');
      setLocationLink(contactInfo.locationLink || '');
      setFacebook(contactInfo.facebook || '');
      setInstagram(contactInfo.instagram || '');
      setWhatsapp(contactInfo.whatsapp || '');
      setYoutube(contactInfo.youtube || '');
      setLinkedin(contactInfo.linkedin || '');
      setTiktok(contactInfo.tiktok || '');
      setSnapchat(contactInfo.snapchat || '');
      setTelegram(contactInfo.telegram || '');
      setThreads(contactInfo.threads || '');
      setX(contactInfo.x || '');
      setWebsite(contactInfo.website || '');
      setDescriptionEn(contactInfo.description?.en || '');
      setDescriptionAr(contactInfo.description?.ar || '');
      setLogo(contactInfo.logo || '');      
    }
  }, [contactInfo]);
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const contactInfoData = {
      email,
      phone,
      address,
      locationLink,
      facebook,
      instagram,
      whatsapp,
      youtube,
      linkedin,
      tiktok,
      snapchat,
      telegram,
      threads,
      x,
      website,
      logo,
      description: {
        en: descriptionEn,
        ar: descriptionAr,
      }      
    };
  
    dispatch(updateContactInfo(contactInfoData))
      .unwrap()
      .then(() => {
        toast.success("Contact Info updated successfully");
      })
      .catch((err) => {
        toast.error(err || "Failed to update contact info");
      });
  };  

  return (
      <div>
<Box maxWidth="700px" mx="auto" mt={5}>
  <Typography variant="h5" mb={2}>Contact Info</Typography>

  <form onSubmit={handleSubmit}>
    
<Box my={2}>
  <Button
    variant="outlined"
    component="label"
    fullWidth
    sx={{ mb: 1 }}
  >
    {logo ? "Change Logo" : "Upload Logo"}
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={handleImageChange}
    />
  </Button>

  {logo && (
    <Box
      sx={{
        width: "100%",
        height: 180,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #ccc",
        mb: 2,
      }}
    >
      <img
        src={logo}
        alt="Preview"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  )}
</Box>          

    <TextField
      label=" Description (English)"
      fullWidth
      value={descriptionEn}
      onChange={(e) => setDescriptionEn(e.target.value)}
      margin="normal"
      multiline
      rows={3}
    />

    <TextField
      label=" Description (Arabic)"
      fullWidth
      value={descriptionAr}
      onChange={(e) => setDescriptionAr(e.target.value)}
      margin="normal"
      multiline
      rows={3}
    />
    <TextField
      label="Email"
      fullWidth
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Phone"
      fullWidth
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Address"
      fullWidth
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Location Link"
      fullWidth
      value={locationLink}
      onChange={(e) => setLocationLink(e.target.value)}
      margin="normal"
    />

    {/* Social Media Fields */}
    <TextField
      label="Facebook"
      fullWidth
      value={facebook}
      onChange={(e) => setFacebook(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Instagram"
      fullWidth
      value={instagram}
      onChange={(e) => setInstagram(e.target.value)}
      margin="normal"
    />
    <TextField
      label="WhatsApp"
      fullWidth
      value={whatsapp}
      onChange={(e) => setWhatsapp(e.target.value)}
      margin="normal"
    />
    <TextField
      label="YouTube"
      fullWidth
      value={youtube}
      onChange={(e) => setYoutube(e.target.value)}
      margin="normal"
    />
    <TextField
      label="LinkedIn"
      fullWidth
      value={linkedin}
      onChange={(e) => setLinkedin(e.target.value)}
      margin="normal"
    />
    <TextField
      label="TikTok"
      fullWidth
      value={tiktok}
      onChange={(e) => setTiktok(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Snapchat"
      fullWidth
      value={snapchat}
      onChange={(e) => setSnapchat(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Telegram"
      fullWidth
      value={telegram}
      onChange={(e) => setTelegram(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Threads"
      fullWidth
      value={threads}
      onChange={(e) => setThreads(e.target.value)}
      margin="normal"
    />
    <TextField
      label="X (Twitter)"
      fullWidth
      value={x}
      onChange={(e) => setX(e.target.value)}
      margin="normal"
    />
    <TextField
      label="Website"
      fullWidth
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      margin="normal"
    />

    <Box mt={3}>
      <Button variant="contained" type="submit" fullWidth>
        Save Contact Info
      </Button>
    </Box>
  </form>
</Box>


    </div>
  )
}

export default page
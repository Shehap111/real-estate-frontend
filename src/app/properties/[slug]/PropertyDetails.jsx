'use client';

import { Box, Typography, Divider, Grid, Chip, Rating } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FaWhatsapp } from 'react-icons/fa';

const PropertyDetails = ({ selectedProperty, cityName, propertyTypeName }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);

  const message = language === 'ar'
  ? `مرحبًا، أرغب في الاستفسار عن العقار: ${selectedProperty?.title?.ar}`
  : `Hello, I'm interested in the property: ${selectedProperty?.title?.en}`;    
    
  return (
    <Box
      className="contant_box"
      sx={{
        p: 4,
        background: '#fff',
        borderRadius: 3,
        boxShadow: 2,
      }}
    >
      {/* 🏡 العنوان والوصف */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {selectedProperty?.title?.[language]}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        {selectedProperty?.description?.[language]}
      </Typography>

      {/* 📋 بيانات العقار */}
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.price')}:
          </Typography>
          <Typography>{selectedProperty?.price} {t('Single-properties.egp')}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={12}>
          <Typography variant="subtitle2">
            {t('Single-properties.operation_type')}:
          </Typography>
          <Typography>
            {selectedProperty?.operationType === 'rent'
              ? t('Single-properties.rent')
              : t('Single-properties.sale')}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.property_type')}:
          </Typography>
          <Typography>{propertyTypeName}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.city')}:
          </Typography>
          <Typography>{cityName}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.bedrooms')}:
          </Typography>
          <Typography>{selectedProperty?.bedrooms}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.bathrooms')}:
          </Typography>
          <Typography>{selectedProperty?.bathrooms}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.area')}:
          </Typography>
          <Typography>{selectedProperty?.area} م²</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.rating')}:
          </Typography>
          <Rating
            value={selectedProperty?.rating || 0}
            readOnly
            precision={0.5}
            size="small"
          />
        </Grid>



        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle2">
            {t('Single-properties.created_at')}:
          </Typography>
          <Typography>
            {new Date(selectedProperty?.createdAt).toLocaleDateString(language)}
          </Typography>
        </Grid>
      </Grid>
{/* زرار واتساب */}
<Box
  sx={{
    width: '100%',
    bgcolor: '#25D366',
    color: '#fff',
    textAlign: 'center',
    py: 1.5,
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1.2,
    marginTop: '20px', 
    transition: '0.3s',
    '&:hover': {
      opacity: 0.9,
    },
  }}
>
  <FaWhatsapp size={20} />
  {t('Single-properties.whatsapp_inquiry')}
</Box>

      <Divider sx={{ my: 4 }} />

      {/* 🗺️ الموقع */}
      {selectedProperty?.mapLocation && (
        <Box>
          <Typography variant="subtitle2" mb={1}>
            {t('Single-properties.map_location')}:
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: '300px',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #ddd',
            }}
          >
            <iframe
              src={selectedProperty.mapLocation}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PropertyDetails;

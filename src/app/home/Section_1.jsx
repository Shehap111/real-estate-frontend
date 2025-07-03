'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, RadioGroup, FormControlLabel, Radio, Typography, TextField, Button, Slider } from '@mui/material';
import Select from 'react-select';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCities } from '@/redux/slices/citySlice';
import { getAllPropertyTypes } from '@/redux/slices/propertyTypeSlice';
import { getAllProperties } from '@/redux/slices/propertySlice';
import { useRouter } from 'next/navigation';

const Section_1 = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const language = useSelector((state) => state.language.language)

  // Redux Data
  const { list: citiesList } = useSelector(state => state.cities);
  const { list: propertyTypesList } = useSelector(state => state.propertyTypes);
  const { publicProperties } = useSelector(state => state.property);

  // Filters State
  const [operation, setOperation] = useState('rent');
  const [area, setArea] = useState([10, 2000]);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState(null);
  const [type, setType] = useState(null);

  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  // Get data on load
  useEffect(() => {
    dispatch(getAllCities());
    dispatch(getAllPropertyTypes());
    dispatch(getAllProperties());
  }, [dispatch]);

// Options for selects
const cityOptions = useMemo(
  () =>
    citiesList.map(c => ({
      value: c._id,
      label: c.name?.[language] || '',
    })),
  [citiesList, language]
);

const typeOptions = useMemo(
  () =>
    propertyTypesList.map(t => ({
      value: t._id,
      label: t.name?.[language] || '',
    })),
  [propertyTypesList, language]
);


  // Filtered suggestions from title
  const suggestions = useMemo(() => {
    if (!search) return [];
    return publicProperties
      .filter(p =>
        p.title?.[language]?.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);
  }, [search, publicProperties]);

  // Debounced search input
  const handleSearchChange = useMemo(() => debounce((val) => {
    setSearch(val);
  }, 400), []);

  // Submit
  const handleSubmit = () => {
    const query = new URLSearchParams({
      operation,
      areaMin: area[0],
      areaMax: area[1],
      ...(city && { city: city }),
      ...(type && { type: type }),
      ...(search && { keyword: search }),
    }).toString();

    router.push(`/filtered-properties?${query}`);
  };

  return (
    <div className='Section_1'>
      <div className='box'>
        <div className='filters'>
          <Box
              className="filters_box"   
            sx={{
              direction,
              p: 3,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 3,
              boxShadow: 3,
              maxWidth: '1000px',
              mx: 'auto',
              mt: 4,
            }}
          >
            {/* Row 1: Rent/Buy + Area */}
            <Box className='Rent_Buy' display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center"  >
            <RadioGroup
  row
  value={operation}
  onChange={(e) => setOperation(e.target.value)}
  className="operation-toggle"
>
  <FormControlLabel
    value="rent"
    control={<Radio sx={{ display: 'none' }} />}
    label={isRTL ? 'إيجار' : 'Rent'}
    className={operation === 'rent' ? 'option active' : 'option'}
  />

  <FormControlLabel
    value="sale"
    control={<Radio sx={{ display: 'none' }} />}
    label={isRTL ? 'بيع' : 'Buy'}
    className={operation === 'sale' ? 'option active' : 'option'}
  />
</RadioGroup>

            <Box width={300}>
              <Typography variant="subtitle2" mb={1}>
                {isRTL ? 'المساحة (متر)' : 'Area (m²)'}
              </Typography>
              <Slider
                value={area}
                className="custom-slider"
                onChange={(_, newValue) => setArea(newValue)}
                valueLabelDisplay="auto"
                min={10}
                max={2000}
              />
            </Box>
            </Box>

            {/* Row 2: Search + City + Type */}
            <Box className="filters_box_row_two"  display="flex" flexDirection={{ xs: 'column', md: 'row' }} >
              <Box flex={2} position="relative">
              <TextField
                fullWidth
                label={isRTL ? 'ابحث باسم العقار' : 'Search by name'}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search_input custom__textfield"
                InputLabelProps={{ shrink: true }}
/>


                {/* Suggestions */}
                {Boolean(suggestions.length) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: '#fff',
                      boxShadow: 2,
                      zIndex: 10,
                      maxHeight: 200,
                      overflowY: 'auto',
                    }}
                  >
                    {suggestions.map(p => (
                      <Box
                        key={p._id}
                        display="flex"
                        alignItems="center"
                        px={1.5}
                        py={1}
                        sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#eee' } }}
                        onClick={() => router.push(`/property/${p.slug}`)}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.title[language]}
                          width={40}
                          height={30}
                          style={{ objectFit: 'cover', borderRadius: 4, marginInlineEnd: 8 }}
                        />
                        <Typography variant="body2">{p.title[language]}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              <Box flex={1}>
              <Select
                className="Select_City"
                classNamePrefix="custom-select"
                options={cityOptions}
                value={cityOptions.find(c => c.value === city)}
                onChange={(selected) => setCity(selected?.value || null)}
                placeholder={isRTL ? 'اختر المدينة' : 'Select City'}
                isRtl={isRTL}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 13000, // أعلى من MUI drawers/dialogs
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 13000, // تأكيد مضاعف جوه المنيو نفسها
                  }),
                }}
            />

              </Box>

              <Box flex={1}>
                <Select
                  classNamePrefix="custom-select"
                  options={typeOptions}
                  value={typeOptions.find(t => t.value === type)}
                  onChange={(selected) => setType(selected?.value || null)}
                  placeholder={isRTL ? 'نوع العقار' : 'Property Type'}
                  menuPortalTarget={document.body} // مهم جدا
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  isRtl={isRTL}
                />
              </Box>

              <Button className='btn_search' variant="contained" onClick={handleSubmit}>
                {isRTL ? 'بحث' : 'Search'}
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Section_1;

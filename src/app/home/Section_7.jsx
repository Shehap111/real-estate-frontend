
'use client';

import React from 'react';
import Image from 'next/image';
import { Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import custmer1 from '../../../public/images/S2-about-4.webp';
const testimonials = [
    {
      id: 1,
      name: 'محمد علي',
      feedback: 'تجربة ممتازة جدًا، التعامل راقي والخدمة سريعة. أنصح الجميع بالتعامل معهم.',
      image: custmer1,
    },
    {
      id: 2,
      name: 'نهى سعيد',
      feedback: 'خدمة العملاء ممتازة جدًا وساعدوني في اختيار العقار المناسب بكل صبر.',
      image: custmer1,
    },
    {
      id: 3,
      name: 'أحمد حسن',
      feedback: 'أكتر حاجة عجبتني إن الصور والمعلومات كانت واقعية 100%، شكراً ليكم.',
      image: custmer1,
    },
    {
      id: 4,
      name: 'سارة عبد الله',
      feedback: 'أول مرة ألاقي موقع عقارات مصري منظم وسهل الاستخدام كده. تجربة مميزة فعلاً.',
      image: custmer1,
    },
    {
      id: 5,
      name: 'عمرو عبد الرحيم',
      feedback: 'الدقة في التفاصيل والمتابعة المستمرة فرقت معايا جدًا. شكراً للفريق الرائع.',
      image: custmer1,
    },
    {
      id: 6,
      name: 'منى خالد',
      feedback: 'المنصة دي وفرتلي وقت ومجهود كبير، تجربة جميلة ومريحة.',
      image: custmer1,
    },
    {
      id: 7,
      name: 'ياسر إبراهيم',
      feedback: 'كنت متردد في البداية، لكن الخدمة فاقت توقعاتي. بالتوفيق دايمًا.',
      image: custmer1,
    },
  ];
  

const Section_7 = () => {
  return (
<section className='Section_7'>
<div className="intro">
  <h3>What Our Clients Say</h3>
  <p>Discover the experiences of our valued clients and how we helped them find their perfect property with ease and confidence.</p>
</div>
    <Box >
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        navigation
        breakpoints={{
          600: {
            slidesPerView: 1.5,
          },
          960: {
            slidesPerView: 2.2,
          },
          1200: {
            slidesPerView: 2.5,
          },
        }}
        style={{ padding: '0 30px' }}
      >
{testimonials.map((item) => (
    <SwiperSlide key={item.id}>
<div className='box'>
                {/* صورة العميل */}
    <Box
      sx={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        overflow: 'hidden',
        mx: 'auto',
        mb: 2,
        border: '4px solid #eee',
      }}
    >
      <Image
        src={item.image}
        alt={item.name}
        width={120}
        height={120}
        style={{ objectFit: 'cover' }}
      />
    </Box>

    {/* اسم العميل */}
    <Typography variant="h6" fontWeight="bold" mb={1}>
      {item.name}
    </Typography>

    {/* رأيه */}
    <Typography fontSize="15px" color="text.secondary">
      {item.feedback}
    </Typography>
</div>
</SwiperSlide>
))}
      </Swiper>
    </Box>      
</section>
  );
};

export default Section_7;

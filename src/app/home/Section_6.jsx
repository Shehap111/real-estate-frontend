'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Grid, Box } from '@mui/material';
import { FaSmile, FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';

const Section_6 = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="Section_6">
      <Box ref={ref} className="container">
        <div className="intro">
          <h3>Our Impact in Numbers</h3>
          <p>
            Take a quick look at some of our proud achievements and milestones in the real estate market.
          </p>
        </div>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaSmile size={36} />
              <h4>{inView && <CountUp end={1200} duration={2} />}</h4>
              <p>عميل سعيد</p>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaBuilding size={36} />
              <h4>{inView && <CountUp end={250} duration={2} />}</h4>
              <p>عقار مميز</p>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaMapMarkerAlt size={36} />
              <h4>{inView && <CountUp end={50} duration={2} />}</h4>
              <p>مدينة نخدمها</p>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaUserTie size={36} />
              <h4>{inView && <CountUp end={75} duration={2} />}</h4>
              <p>وكيل معتمد</p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default Section_6;

'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Grid, Box } from '@mui/material';
import { FaSmile, FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import {useTranslation} from 'react-i18next';

const Section_6 = () => {
  const { ref, inView } = useInView({ triggerOnce: true });
    const {t} = useTranslation();
  return (
    <section className="Section_6">
      <Box ref={ref} className="container">
        <div className="intro">
          <h3>{t("home_page.home_Section_6.title")}</h3>

          <p>{t("home_page.home_Section_6.description")}</p>
        </div>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaSmile size={36} />
              <h4>{inView && <CountUp end={1200} duration={2} />}</h4>
              <p>{t("home_page.home_Section_6.happy_clients")}</p>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaBuilding size={36} />
              <h4>{inView && <CountUp end={250} duration={2} />}</h4>
              <p>{t("home_page.home_Section_6.featured_properties")}</p>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaMapMarkerAlt size={36} />
              <h4>{inView && <CountUp end={50} duration={2} />}</h4>
              <p>{t("home_page.home_Section_6.cities_served")}</p>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <div className="box">
              <FaUserTie size={36} />
              <h4>{inView && <CountUp end={75} duration={2} />}</h4>
              <p>{t("home_page.home_Section_6.verified_agents")}</p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default Section_6;

import React from 'react'
import IntroSections from '../../components/IntroSections'
import './about.css'
import S1_about from './S1_about'
import S2_about from './S2_about'
import S3_about from './S3_about'
import S3_home from '../home/Section_3'
const Apout = () => {
  return (
    <>
      <IntroSections sectionName="Apout Us" Link="Apout Us" path='about' />
      <S1_about/>
      <S3_home/>
      <S2_about/>   
      <S3_about />
    </>
  )
}

export default Apout
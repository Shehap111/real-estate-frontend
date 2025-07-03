'use client';
import Image from "next/image";
import styles from "./page.module.css";
import './home/home.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Section_1 from "./home/Section_1";
import Section_2 from "./home/Section_2";
import Section_3 from "./home/Section_3";
import Section_4 from "./home/Section_4";
import Section_5 from "./home/Section_5";
import Section_6 from "./home/Section_6";
import Section_7 from "./home/Section_7";
export default function Home() {
  return (
    <>
      <Section_1/>
      <Section_2/>
      <Section_3/>
      <Section_4/>
      <Section_5/>
      <Section_7/>
      <Section_6/>
      
    </>
  );
}

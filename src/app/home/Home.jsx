'use client';
import Image from "next/image";
import './home.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Section_1 from "./Section_1";
import Section_2 from "./Section_2";
import Section_3 from "./Section_3";
import Section_4 from "./Section_4";
import Section_5 from "./Section_5";
import Section_6 from "./Section_6";
import Section_7 from "./Section_7";

export default function Home() {
  return (
    <>
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />
      <Section_5 />
      <Section_7 />
      <Section_6 />
    </>
  );
}

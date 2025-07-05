import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {useTranslation} from 'react-i18next';

const IntroSections = (props) => {
  const {t} = useTranslation();
  return (
    <section className='intro_section'>
          <div className='intro'>
               <h1>{ props.sectionName }</h1>
          <ul>
              <li > <Link href={'/'}> {t(`intro_section.home`)} </Link> </li>
              <li>/</li>
              <li ><Link href={props.path}>  {props.Link} </Link>  </li>

          </ul>
         </div>
    </section>
  )
}

export default IntroSections
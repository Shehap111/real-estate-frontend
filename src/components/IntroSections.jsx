import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
const IntroSections = (props) => {
  return (
    <section className='intro_section'>
          <div className='intro'>
               <h1>{ props.sectionName }</h1>
          <ul>
              <li > <Link href={'/'}> Home </Link> </li>
              <li>/</li>
              <li ><Link href={props.path}>  {props.Link} </Link>  </li>

          </ul>
         </div>
    </section>
  )
}

export default IntroSections
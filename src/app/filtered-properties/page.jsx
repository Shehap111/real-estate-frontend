'use client';
import React, { Suspense } from 'react';
import FilteredProperties from './FilteredProperties'

const page = () => {
  return (
    <div>
     <Suspense fallback={<div>Loading...</div>}>
      <FilteredProperties/>     
     </Suspense>
    </div>
  )
}

export default page

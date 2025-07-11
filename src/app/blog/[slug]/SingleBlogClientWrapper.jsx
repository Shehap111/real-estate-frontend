'use client';

import React from 'react';
import SingleBlog from './SingleBlog';

const SingleBlogClientWrapper = ({ slug }) => {
  return <SingleBlog slug={slug} />;
};

export default SingleBlogClientWrapper;

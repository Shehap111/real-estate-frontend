'use client';

import React, { useEffect, useRef } from 'react';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';

const PhotoSphereViewerContainer = ({ imageUrl }) => {
  const viewerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadViewer = async () => {
      const { Viewer } = await import('photo-sphere-viewer');

      if (!isMounted || !viewerRef.current || !imageUrl) return;

      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }

      instanceRef.current = new Viewer({
        container: viewerRef.current,
        panorama: imageUrl,
        navbar: ['zoom', 'fullscreen'],
        defaultLong: Math.PI,
      });
    };

    loadViewer();

    return () => {
      isMounted = false;
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [imageUrl]);

  return <div ref={viewerRef} style={{ width: '100%', height: '100%' }} />;
};

export default PhotoSphereViewerContainer;

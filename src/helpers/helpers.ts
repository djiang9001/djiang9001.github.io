import { useEffect, useState } from 'react';

import type { Vector3 } from 'three';

export const roundAwayFromZero = (num: number): number => {
  if (num > 0) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
}

export const roundVector3AwayFromZero = (vec: Vector3): Vector3 => {
  vec.setX(roundAwayFromZero(vec.x));
  vec.setY(roundAwayFromZero(vec.y));
  vec.setZ(roundAwayFromZero(vec.z));
  return vec;
}


export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const degreeToRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
}

export const radToDegree = (rads: number): number => {
  return (rads * 180) / Math.PI;
}

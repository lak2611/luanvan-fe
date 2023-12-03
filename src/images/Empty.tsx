import Image from 'next/image';
import React from 'react';
import empty from './empty.png';

const Empty = ({ width = 30, height = 30 }) => {
  return <Image width={width} height={height} src={empty} alt="empty" />;
};

export default Empty;

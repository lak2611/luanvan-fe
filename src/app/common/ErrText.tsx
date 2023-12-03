import { Typography } from '@mui/material';
import React from 'react';

const ErrText = ({ err }) => {
  if (!err) {
    return null;
  }
  return <Typography color="red">{err}</Typography>;
};

export default ErrText;

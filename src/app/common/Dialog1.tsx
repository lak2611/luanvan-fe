import { Close } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import React from 'react';

const Dialog1 = ({ open = true, onClose = () => {}, children = null }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <IconButton
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onClick={onClose}
      >
        <Close />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default Dialog1;

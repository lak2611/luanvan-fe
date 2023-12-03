import React from 'react';
import Dialog1 from '../common/Dialog1';
import CreateSponsorForm from './CreateSponsorForm';

const CreateSponsorDialog = ({ open, onClose }) => {
  return (
    <Dialog1 open={open} onClose={onClose}>
      <CreateSponsorForm />
    </Dialog1>
  );
};

export default CreateSponsorDialog;

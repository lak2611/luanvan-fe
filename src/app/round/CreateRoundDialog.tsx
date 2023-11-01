import React from 'react';
import Dialog1 from '../common/Dialog1';
import CreateRound from './CreateRound';

const CreateRoundDialog = ({ open, onClose, afterSubmit, title, btnTitle, data, serviceFunction }) => {
  return (
    <Dialog1 onClose={onClose} open={open}>
      <CreateRound afterSubmit={afterSubmit} title={title} btnTitle={btnTitle} data={data} serviceFunction={serviceFunction} />
    </Dialog1>
  );
};

export default CreateRoundDialog;

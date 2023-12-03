import React, { useEffect, useState } from 'react';
import Dialog1 from '../common/Dialog1';
import { Box, Container, Typography } from '@mui/material';
import Form1 from '../common/Form1';
import { updateCurrentNonstudent } from '../service/services';
import moment from 'moment';

const formFields = [
  {
    name: 'fullname',
    label: 'Tên hiển thị',
    type: 'text',
  },
  {
    name: 'position',
    label: 'Chức vụ',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    isEmail: true,
  },
  {
    name: 'phone',
    label: 'Số điện thoại',
    type: 'text',
  },
];

const UpdateNonstudentDialog = ({ open, onClose, propData, fetchData }) => {
  const [formData, setFormData] = useState(propData);

  useEffect(() => {
    setFormData(propData);
  }, [propData]);

  const handleUpdateNonstudent = async (data) => {
    try {
      await updateCurrentNonstudent({ ...formData, birthday: moment(formData.birthday)?.format('YYYY-MM-DD') });
      await fetchData();
      onClose();
    } catch (error) {}
  };

  return (
    <Dialog1 open={open} onClose={onClose}>
      <Box
        sx={{
          pt: '60px',
          pb: '30px',
        }}
        maxWidth="md"
      >
        <Form1
          title={
            <Typography variant="h5" component="div">
              Cập nhật thông tin cá nhân
            </Typography>
          }
          fields={formFields}
          handleSubmit={handleUpdateNonstudent}
          formData={formData}
          setFormData={setFormData}
          btnTitle="Cập nhật"
        />
      </Box>
    </Dialog1>
  );
};

export default UpdateNonstudentDialog;

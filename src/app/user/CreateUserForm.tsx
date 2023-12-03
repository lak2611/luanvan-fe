import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Form1 from '../common/Form1';
import { createNonstudent } from '../service/services';
import ErrText from '../common/ErrText';

const formFields = [
  {
    name: 'username',
    label: 'Tên đăng nhập',
    type: 'text',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    isEmail: true,
  },
];

const CreateUserForm = () => {
  const [formData, setFormData] = React.useState<any>({});
  const [error, setError] = useState('');
  //submit
  const handleSubmit = async () => {
    try {
      let { data } = await createNonstudent(formData);
      if (data?.isErr) {
        setError(data?.message);
        return;
      }
      console.log('🚀 ~ file: createUserForm.tsx:25 ~ handleSubmit ~ data:', data);
    } catch (error) {}
  };
  //
  return (
    <Box>
      <Form1
        title={
          <Typography mt="10%" mb="20px" variant="h0" style={{ textAlign: 'center' }}>
            Tạo tài khoản
          </Typography>
        }
        handleSubmit={handleSubmit}
        btnTitle="Tạo"
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
        beforeButton={<ErrText err={error} />}
      />
    </Box>
  );
};

export default CreateUserForm;

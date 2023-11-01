'use client';
import React, { useState } from 'react';
import Form1 from '../common/Form1';
import { Typography } from '@mui/material';
import { createDocType } from '../service/services';

const formFields = [
  {
    name: 'title',
    label: 'Tên loại hồ sơ',
    type: 'text',
  },
];

const CreateDocTypeForm = ({ fetchDocTypeList }) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const submitData = {
      title: formData.title,
    };
    try {
      let { data } = await createDocType(submitData);
      await fetchDocTypeList();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form1
      formData={formData}
      setFormData={setFormData}
      fields={formFields}
      handleSubmit={handleSubmit}
      loading={loading}
      btnTitle={'Tạo'}
      title={
        <Typography mt="10%" mb="20px" variant="h3" style={{ textAlign: 'center' }}>
          Tạo loại hồ sơ
        </Typography>
      }
    />
  );
};

export default CreateDocTypeForm;

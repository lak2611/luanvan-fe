'use client';
import { Backdrop, Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Form1 from '../common/Form1';
import { IFile1 } from '../interfaces/IFile1';
import ImageList from '../application/ImageList';
import { SERVER_URL, createSponsor } from '../service/services';
import moment from 'moment';
import { useSponsorContext } from './page';

// Sponsor(fullname, description, date, money)
const fields = [
  {
    name: 'fullname',
    label: 'Họ và tên',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Mô tả',
    type: 'text',
    multiline: true,
    minRows: 3,
    required: true,
  },
  {
    name: 'date',
    label: 'Ngày',
    type: 'date',
    required: true,
  },
  {
    name: 'money',
    label: 'Số tiền (VNĐ)' as any,
    type: 'number',
    required: true,
  },
];

const CreateSponsorForm = () => {
  const [formData, setFormData] = useState({});
  const [fileObjs, setFileObjs] = useState<IFile1[]>([]);
  const sponsorContext = useSponsorContext();

  const handleSubmit = async () => {
    try {
      const formSubmit = new FormData();
      fileObjs.forEach((fileObj) => {
        formSubmit.append(fileObj.fieldName, fileObj.file);
      });
      //loop through formData
      Object.keys(formData).forEach((key) => {
        if (key == 'date') {
          formSubmit.append(key, moment(formData[key]).format('YYYY-MM-DD'));
        }
        if (key == 'money') {
          formSubmit.append(key, formData[key]);
        }
        if (key == 'fullname') {
          formSubmit.append(key, formData[key]);
        }
        if (key == 'description') {
          formSubmit.append(key, formData[key]);
        }
      });
      let { data } = await createSponsor(formSubmit);
      sponsorContext.setIsOpenCreateSponsor?.(false);
      sponsorContext.fetchSponsorList?.();
    } catch (error) {}
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let fieldName = e.target.id;
    if (!files?.length) return;
    let tmpFileObjs = Array.from(files).map((file) => ({
      file,
      fieldName,
    }));
    setFileObjs([...fileObjs, ...tmpFileObjs]);
  };

  return (
    <Box minWidth={'600px'} py="30px">
      <Form1
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        title={<Typography variant="h1">Thêm thông tin tài trợ</Typography>}
        handleSubmit={handleSubmit}
        btnTitle="Thêm"
        beforeButton={
          <Box>
            <label htmlFor={`files`}>
              <input onChange={onFileChange} accept="image/*" style={{ display: 'none' }} id={`files`} type="file" multiple />
              <Button
                sx={{
                  mb: '10px',
                }}
                variant="outlined"
                component="span"
                startIcon={<FileUploadIcon />}
              >
                Ảnh minh chứng
              </Button>
            </label>
            <ImageList files={fileObjs} setFiles={setFileObjs} allFiles={fileObjs} />
          </Box>
        }
      />
    </Box>
  );
};

export default CreateSponsorForm;

// 'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Grid, Container, Paper, Typography, IconButton, Icon, Stack, Box, Backdrop } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ApplicationPageContext } from './page';
import { APPLICATION_FORM_FIELDS } from './formFields';
import { submitApplication } from '../service/services';
import { Close } from '@mui/icons-material';
import ImageList from './ImageList';
import useRound from '../round/[roundYear]/useRound';
import Form1 from '../common/Form1';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const IMG_HEIGHT = 200;

const ApplicationForm = ({ Context, disabled = false, data = null, title = '', hideBtn = false }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState<any>(data || {});
  useEffect(() => {
    setFormData(data || {});
  }, [data]);
  const { round, loading: loadingRound, fetchRound } = useRound(new Date().getFullYear());
  const context = useContext<any>(Context || ApplicationPageContext);
  const { fileObjs, setFileObjs } = context;
  console.log('🚀 ~ file: ApplicationTable.tsx:25 ~ ApplicationForm ~ fileObjs:', fileObjs);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formSubmit = new FormData(e.target as HTMLFormElement);
    fileObjs.forEach((fileObj) => {
      formSubmit.append(fileObj.fieldName, fileObj.file);
    });
    //loop through formData
    Object.keys(formData).forEach((key) => {
      if (key == 'birthday') {
        formSubmit.append(key, formData[key].format('YYYY-MM-DD'));
      }
      if (key == 'gender') {
        formSubmit.append(key, formData[key]);
      }
    });
    formSubmit.append('year', new Date().getFullYear().toString());

    try {
      await submitApplication(formSubmit);
    } catch (error) {
      console.log(error);
    }
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

  const onImgClick = (file: File) => {
    setSelectedImage(file);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: 'min-content',
        minWidth: '60%',
      }}
    >
      {selectedImage && (
        <Backdrop
          sx={{
            zIndex: 1000,
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'auto',
          }}
          open={true}
          onClick={() => setSelectedImage(null)}
        >
          <Box position={'absolute'} p="20px" top="0px">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt=""
              style={{
                maxHeight: '100vh',
                maxWidth: '100vw',
                width: 'auto',
                height: 'auto',
              }}
            />
          </Box>
        </Backdrop>
      )}
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <Grid container spacing={2} p="20px">
            <Typography variant="h5" mb="15px">
              {title}
            </Typography>
            <Form1
              containerProps={{
                maxWidth: 'md',
                sx: {
                  mx: '0px',
                  px: '0px !important',
                },
              }}
              fields={APPLICATION_FORM_FIELDS}
              formData={formData}
              setFormData={setFormData}
              title=""
              btnTitle="Đăng ký"
              hideButton
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" my="15px">
              Hình ảnh
            </Typography>
            <Stack direction="column" spacing={2} alignItems="flex-start">
              {round?.doctypes?.map((docType: any) =>
                !data ? (
                  <Box key={docType?.doctypeId}>
                    <label htmlFor={`${docType?.doctypeId}`}>
                      <input accept="image/*" style={{ display: 'none' }} id={`${docType?.doctypeId}`} type="file" onChange={onFileChange} multiple />
                      <Button variant="outlined" component="span" startIcon={<FileUploadIcon />}>
                        {docType?.title}
                      </Button>
                    </label>
                    <ImageList
                      files={fileObjs.filter((fileObj) => fileObj.fieldName == docType?.doctypeId)}
                      setFiles={setFileObjs}
                      onImgClick={onImgClick}
                      allFiles={fileObjs}
                    />
                  </Box>
                ) : (
                  <Box key={docType?.doctypeId}>
                    <Stack direction={'row'} alignItems={'center'} gap="10px">
                      <PhotoSizeSelectActualIcon />
                      <Typography variant="body1">{docType?.title}</Typography>
                    </Stack>
                    <ImageList
                      files={fileObjs.filter((fileObj) => fileObj.fieldName == docType?.doctypeId)}
                      setFiles={setFileObjs}
                      onImgClick={onImgClick}
                      allFiles={fileObjs}
                    />
                  </Box>
                )
              )}
            </Stack>
          </Grid>
          {!hideBtn && (
            <Button
              sx={{
                mt: '15px',
              }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Đăng ký
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default ApplicationForm;

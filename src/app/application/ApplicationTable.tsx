// 'use client';
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Paper,
  Typography,
  IconButton,
  Icon,
  Stack,
  Box,
  Backdrop,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ApplicationPageContext } from "../public/apply/page";
import { APPLICATION_FORM_FIELDS } from "./formFields";
import { SERVER_URL, submitApplication } from "../service/services";
import { Close } from "@mui/icons-material";
import ImageList from "./ImageList";
import useRound from "../round/[roundYear]/useRound";
import Form1 from "../common/Form1";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import StatusSection from "./[id]/StatusSection";

const IMG_HEIGHT = 200;

const ApplicationForm = ({
  Context,
  disabled = false,
  data = null,
  title = "",
  hideBtn = false,
}: any) => {
  const [formData, setFormData] = useState<any>(data || {});
  useEffect(() => {
    setFormData(data || {});
  }, [data]);
  const {
    round,
    loading: loadingRound,
    fetchRound,
  } = useRound(new Date().getFullYear());
  const context = useContext<any>(Context || ApplicationPageContext);
  const { fileObjs, setFileObjs } = context;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formSubmit = new FormData(e.target as HTMLFormElement);
    fileObjs.forEach((fileObj) => {
      formSubmit.append(fileObj.fieldName, fileObj.file);
    });
    //loop through formData
    Object.keys(formData).forEach((key) => {
      if (key == "birthday") {
        formSubmit.append(key, formData[key].format("YYYY-MM-DD"));
      }
      if (key == "gender") {
        formSubmit.append(key, formData[key]);
      }
    });
    formSubmit.append("year", new Date().getFullYear().toString());

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

  return (
    <Container
      maxWidth="xl"
      sx={{
        width: "min-content",
        minWidth: "60%",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <form encType="multipart/form-data" onSubmit={onSubmit}>
          <Grid container spacing={2} p="20px">
            <Typography variant="h1" mb="15px">
              {title}
            </Typography>
            <Form1
              containerProps={{
                maxWidth: "xl",
                sx: {
                  mx: "0px",
                  px: "0px !important",
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
            {!!round?.doctypes?.length && (
              <Typography variant="h6" my="15px">
                Hình ảnh
              </Typography>
            )}
            <Stack direction="column" spacing={2} alignItems="flex-start">
              {round?.doctypes?.map((docType: any) =>
                !data ? (
                  <Box key={docType?.doctypeId}>
                    <label htmlFor={`${docType?.doctypeId}`}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id={`${docType?.doctypeId}`}
                        type="file"
                        onChange={onFileChange}
                        multiple
                      />
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<FileUploadIcon />}
                      >
                        {docType?.title}
                      </Button>
                    </label>
                    <ImageList
                      files={fileObjs?.filter?.(
                        (fileObj) => fileObj?.fieldName == docType?.doctypeId
                      )}
                      setFiles={setFileObjs}
                      allFiles={fileObjs}
                    />
                  </Box>
                ) : (
                  <Box key={docType?.doctypeId}>
                    <Stack direction={"row"} alignItems={"center"} gap="10px">
                      <PhotoSizeSelectActualIcon />
                      <Typography variant="body1">{docType?.title}</Typography>
                    </Stack>
                    <ImageList
                      files={fileObjs?.filter?.(
                        (fileObj) => fileObj.fieldName == docType?.doctypeId
                      )}
                      setFiles={setFileObjs}
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
                mt: "15px",
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

'use client';
import { Autocomplete, Box, Button, Chip, CircularProgress, Container, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';

const renderField = (field: any, setFormData: any, formData: any, disabled: boolean) => {
  switch (field.type) {
    case 'text':
    case 'password':
      return (
        <TextField
          key={field.name}
          label={field.label}
          value={formData?.[field?.name] || ''}
          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          disabled={disabled}
          {...field}
        />
      );
    case 'date':
      return (
        <DatePicker
          key={field.name}
          label={field.label}
          value={formData[field.name] || null}
          onChange={(newValue) => setFormData({ ...formData, [field.name]: newValue })}
          disabled={disabled}
          {...field}
          format="DD/MM/YYYY"
        />
      );

    case 'number':
      return (
        <TextField
          key={field.name}
          label={field.label}
          value={formData[field.name] || ''}
          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          disabled={disabled}
          type="number"
          {...field}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete
          key={field.name}
          disabled={disabled}
          options={field.options}
          onChange={(e, newValue: any) => {
            const isUnique = !formData[field.name]?.some((value: any) => value.value === newValue.value);
            if (isUnique) {
              setFormData({ ...formData, [field.name]: newValue });
            }
          }}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
          value={formData[field.name] || []}
          renderInput={(params) => <TextField {...params} label={field.label} />}
          multiple
          renderTags={(tagValue, getTagProps) => {
            return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.value} label={option.label} />);
          }}
          renderOption={(props, option: any) => {
            if (formData[field.name]?.some((value: any) => value.value === option.value)) {
              return null;
            }
            return (
              <li {...props} key={option.value}>
                <span>{option.label}</span>
              </li>
            );
          }}
        />
      );
    case 'select':
      return (
        <TextField
          disabled={disabled}
          key={field.name}
          label={field.label}
          value={formData[field.name] || ''}
          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          select
        >
          {field.options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );

    default:
      return <div>Unknown field type</div>;
  }
};

const Form1 = ({
  formData,
  setFormData,
  handleSubmit,
  title = null,
  fields,
  loading,
  btnTitle,
  hideButton = false,
  containerProps,
  maxWidth = 'sm',
  disabled = false,
  beforeButton = null,
}: any) => {
  const [err, setErr] = useState({});
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmitWithValidation = async () => {
    const err = {};
    fields.forEach((field: any) => {
      if (field.required && !formData[field.name]) {
        err[field.name] = 'Trường này là bắt buộc';
        return;
      }
      if (field.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
        err[field.name] = 'Email không hợp lệ';
        return;
      }
    });
    setErr(err);
    if (Object.keys(err).length === 0) {
      setLocalLoading(true);
      await handleSubmit();
      setLocalLoading(false);
    }
  };

  const setFormDataAndRemoveErr = (newFormData: any) => {
    setFormData(newFormData);
    setErr({});
  };

  return (
    <Container maxWidth={maxWidth} {...containerProps}>
      <Stack
        gap="20px"
        sx={{
          '& .Mui-disabled *': {
            '-webkit-text-fill-color': 'black !important',
          },
        }}
      >
        {title}
        {fields?.map((field: any) => {
          return (
            <>
              {renderField(field, setFormDataAndRemoveErr, formData, disabled)}
              {err[field.name] && (
                <Typography mt="-15px" color="red">
                  {err[field.name]}
                </Typography>
              )}
            </>
          );
        })}
        {beforeButton}
        {!hideButton && (
          <Button
            variant="contained"
            onClick={handleSubmitWithValidation}
            sx={{
              color: 'white',
            }}
          >
            {localLoading ? <CircularProgress color="inherit" size={24} /> : btnTitle}
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default Form1;

import { Container, Stack, TextField, Typography, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import React, { useContext, useState } from 'react';
import { createRound } from '../service/services';
import Form1 from '../common/Form1';
import { RoundContext } from './page';
import useDocTypeList from '../doctype/useDocTypeList';

const CreateRound = ({ afterSubmit, title, btnTitle, data = {}, serviceFunction = () => {} }: any) => {
  const { docTypeList } = useDocTypeList();
  //form fields
  const formFields = [
    {
      name: 'startDate',
      label: 'Ngày bắt đầu',
      type: 'date',
      format: 'DD/MM/YYYY',
      maxDate: moment().endOf('year'),
      minDate: moment(),
    },
    {
      name: 'endDate',
      label: 'Ngày kết thúc',
      type: 'date',
      format: 'DD/MM/YYYY',
      maxDate: moment().endOf('year'),
      minDate: moment(),
    },
    {
      name: 'description',
      label: 'Mô tả',
      type: 'text',
    },
    {
      name: 'docTypeList',
      label: 'Loại tài liệu được yêu cầu',
      type: 'autocomplete',
      options: docTypeList.map((docType) => ({
        label: docType.title,
        value: docType.doctypeId,
      })),
    },
  ];
  //transform data
  const transformedData = {
    startDate: moment(data?.startDate),
    endDate: moment(data?.endDate),
    description: data?.description,
    docTypeList: data?.doctypes?.map((docType: any) => ({
      label: docType.title,
      value: docType.doctypeId,
    })),
  };
  // Form logic
  const [formData, setFormData] = useState<any>(transformedData || {});
  const [loading, setLoading] = useState(false);

  //handle submit
  async function handleSubmit() {
    setLoading(true);
    const submitData = {
      year: formData.startDate.year(),
      startDate: formData.startDate.format('YYYY-MM-DD'),
      endDate: formData.endDate.format('YYYY-MM-DD'),
      description: formData.description,
      docTypeList: formData?.docTypeList?.map((docType: any) => docType.value) || [],
    };
    try {
      let { data } = await serviceFunction(submitData);
      afterSubmit?.();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  // UI
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: '50px',
      }}
    >
      <Form1
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        handleSubmit={handleSubmit}
        fields={formFields}
        btnTitle={btnTitle}
        title={
          <Typography mb="20px" variant="h3" style={{ textAlign: 'center' }}>
            {title}
          </Typography>
        }
      />
    </Container>
  );
};

export default CreateRound;

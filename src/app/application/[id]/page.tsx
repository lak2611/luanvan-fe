'use client';
import Layout1 from '@/app/common/Layout1';
import { Box, Container } from '@mui/material';
import React from 'react';
import useApplicationById from './useApplicationById';
import { useParams } from 'next/navigation';
import ApplicationForm from '../ApplicationTable';
import moment from 'moment';

const ApplicationContext = React.createContext<any>(null);

const ApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { application, fetchApplication } = useApplicationById(Number(id));
  console.log('🚀 ~ file: page.tsx:12 ~ ApplicationDetailPage ~ application:', application);
  const fileObjs: {
    file: File;
    fieldName: string;
  }[] = application?.files?.map((file) => ({
    file: file,
    fieldName: file?.doctype?.doctypeId,
  }));

  return (
    <ApplicationContext.Provider
      value={{
        fileObjs,
        setFileObjs: () => {},
      }}
    >
      <Layout1>
        <Box py="20px">
          <ApplicationForm
            title={'Đơn xin học bổng'}
            data={{ ...application, birthday: moment(application?.birthday) }}
            disabled={true}
            Context={ApplicationContext}
            hideBtn={true}
          />
        </Box>
      </Layout1>
    </ApplicationContext.Provider>
  );
};

export default ApplicationDetailPage;

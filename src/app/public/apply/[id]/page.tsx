'use client';
import ApplicationForm from '@/app/application/ApplicationTable';
import StatusSection from '@/app/application/[id]/StatusSection';
import useApplicationById from '@/app/application/[id]/useApplicationById';
import Header1 from '@/app/common/Header1';
import { IFile1 } from '@/app/interfaces/IFile1';
import { Box, Container } from '@mui/material';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React from 'react';

const ApplicationContext = React.createContext<any>(null);

const PublicApplicationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { application, fetchApplication } = useApplicationById(Number(id));
  const fileObjs: IFile1[] = application?.files?.map((file) => ({
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
      <Box>
        <Header1 />
        <ApplicationForm
          title={`Đơn xin học bổng - Kỳ học bổng năm ${application?.round?.year}`}
          data={{ ...application, birthday: moment(application?.birthday) }}
          disabled={true}
          Context={ApplicationContext}
          hideBtn={true}
        />
        <Container
          maxWidth="xl"
          sx={{
            width: 'min-content',
            minWidth: '60%',
            mt: '20px',
            pb: '40px',
          }}
        >
          <StatusSection
            application={{ ...application, status: application?.round?.publicResult ? application?.status : 'pending' }}
            publicResult={application?.publicResult}
          />
        </Container>
      </Box>
    </ApplicationContext.Provider>
  );
};

export default PublicApplicationDetailPage;

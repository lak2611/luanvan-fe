'use client';
import Layout1 from '@/app/common/Layout1';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useApplicationById from './useApplicationById';
import { useParams } from 'next/navigation';
import ApplicationForm from '../ApplicationTable';
import moment from 'moment';
import Form1 from '@/app/common/Form1';
import { createComment } from '@/app/service/services';
import CommentItem from './CommentItem';
import { isAdmin, isNonstudent } from '@/app/utils/auth';
import Header1 from '@/app/common/Header1';
import StatusSection from './StatusSection';
import Empty from '@/images/Empty';

const ApplicationContext = React.createContext<any>(null);

const formFields = [
  {
    name: 'evaluation',
    label: 'Nhận xét đánh giá',
    type: 'text',
    multiline: true,
    minRows: 3,
    required: true,
  },
];

const ApplicationDetailPage = () => {
  const [stateAdmin, setStateAdmin] = useState(undefined);

  useEffect(() => {
    setStateAdmin(isAdmin());
  }, []);

  if (stateAdmin === undefined) return null;

  if (stateAdmin) {
    return (
      <Layout1>
        <Component />
      </Layout1>
    );
  } else {
    return (
      <>
        <Header1 />
        <Component />
      </>
    );
  }
};

const Component = () => {
  const { id } = useParams<{ id: string }>();
  const { application, fetchApplication } = useApplicationById(Number(id));
  console.log('🚀 ~ file: page.tsx:58 ~ Component ~ application:', application);
  const [formData, setFormData] = useState(null);
  const fileObjs: {
    file: File;
    fieldName: string;
  }[] = application?.files?.map((file) => ({
    file: file,
    fieldName: file?.doctype?.doctypeId,
  }));

  const onCreateComment = async () => {
    try {
      let dataSubmit = {
        content: formData.evaluation,
        applicationId: application.applicationId,
      };
      let { data } = await createComment(dataSubmit);
      fetchApplication(id);
    } catch (error) {}
  };

  return (
    <ApplicationContext.Provider
      value={{
        fileObjs,
        setFileObjs: () => {},
      }}
    >
      <Box py="20px">
        <ApplicationForm
          title={'Đơn xin học bổng - Kỳ học bổng năm ' + application?.round?.year}
          data={{ ...application, birthday: moment(application?.birthday) }}
          disabled={true}
          Context={ApplicationContext}
          hideBtn={true}
        />
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          width: 'min-content',
          minWidth: '60%',
          pb: '40px',
        }}
      >
        <StatusSection refetch={() => fetchApplication(id)} application={application} publicResult={application?.round?.publicResult} />
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          {isNonstudent() && (
            <>
              <Typography variant="h5" mb="15px">
                Thêm nhận xét đánh giá
              </Typography>
              <Form1
                containerProps={{
                  sx: {
                    px: '0px !important',
                  },
                  maxWidth: 'lg',
                }}
                fields={formFields}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={onCreateComment}
                btnTitle="Thêm"
              />
            </>
          )}
          <Typography variant="h5" my="15px">
            Tất cả nhận xét đánh giá
          </Typography>
          {application?.comments?.map?.((comment, index) => (
            <CommentItem key={comment?.createdAt || index} comment={comment} />
          ))}
          {application?.comments?.length == 0 && (
            <Stack mt="20px" alignItems={'center'}>
              <Empty width={300} height={300} />
              <Typography mt="15px" variant="body1" color="rgba(0,0,0,0.6)" fontSize={'16px'} fontWeight={600}>
                Chưa có dữ liệu
              </Typography>
            </Stack>
          )}
        </Paper>
      </Container>
    </ApplicationContext.Provider>
  );
};

export default ApplicationDetailPage;

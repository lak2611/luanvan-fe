'use client';
import ApplicationList from '@/app/application/ApplicationList';
import useApplicationList from '@/app/application/useApplicationList';
import Header1 from '@/app/common/Header1';
import { useRoundDetailTab } from '@/app/round/[roundYear]/RoundDetailTab';
import useRound from '@/app/round/[roundYear]/useRound';
import { isAdmin, isNonstudent } from '@/app/utils/auth';
import Empty from '@/images/Empty';
import { Box, Button, Container, LinearProgress, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';

const PublicRoundDetailPage = ({ params }) => {
  const { roundYear } = params;
  const { round, loading, fetchRound } = useRound(roundYear);
  const { applicationList, fetchApplicationList } = useApplicationList(roundYear);
  const router = useRouter();
  const tabHook = useRoundDetailTab();

  const renderPassedList = () => {
    const filteredList = applicationList.filter((item) => {
      return item?.status === 'approved';
    });
    if (round?.publicResult && filteredList?.length) {
      return <ApplicationList applicationList={filteredList} isPublic={true} />;
    }
    return (
      <Stack mt="20px" alignItems={'center'}>
        <Empty width={300} height={300} />
        <Typography mt="15px" variant="body1" color="rgba(0,0,0,0.6)" fontSize={'16px'} fontWeight={600}>
          Kết quả chưa được công bố
        </Typography>
      </Stack>
    );
  };

  const renderAllList = () => {
    if (applicationList?.length == 0) {
      return (
        <Stack mt="20px" alignItems={'center'}>
          <Empty width={300} height={300} />
          <Typography mt="15px" variant="body1" color="rgba(0,0,0,0.6)" fontSize={'16px'} fontWeight={600}>
            Chưa có dữ liệu
          </Typography>
        </Stack>
      );
    }
    return (
      <Table
        sx={{
          ...(tabHook.value === 0 && applicationList?.length > 0 ? {} : { display: 'none' }),
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& *': {
                fontWeight: 'bold !important',
              },
            }}
          >
            <TableCell>Họ và tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Quên quán</TableCell>
            <TableCell>Ngành học</TableCell>
            <TableCell>Trường</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicationList.map((application) => (
            <TableRow
              onClick={() => {
                if (isNonstudent()) {
                  router.push(`/application/${application?.applicationId}`);
                  return;
                }
                router.push(`/public/apply/${application?.applicationId}`);
              }}
              key={application?.applicationId}
              hover
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{application?.fullname}</TableCell>
              <TableCell>{application?.email}</TableCell>
              <TableCell>{application?.phone}</TableCell>
              <TableCell>{application?.hometown}</TableCell>
              <TableCell>{application?.major}</TableCell>
              <TableCell>{application?.university}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Box>
      <Header1 />
      <Container maxWidth="xl" sx={{ py: '20px' }}>
        {loading && <LinearProgress />}
        {!loading && (
          <Stack direction={'row'} gap="10px" alignItems={'center'} mb="20px">
            <Typography variant="h1" component="h1">
              {!loading && !round ? 'Không tìm thấy kỳ phỏng vấn' : ` Kỳ học bổng năm ${roundYear}`}
            </Typography>
          </Stack>
        )}
        {!loading && round && (
          <>
            <Typography variant="body1" sx={{ mb: '10px' }}>
              <b>Ngày bắt đầu: </b>
              {moment(round.startDate).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="body1" sx={{ mb: '10px' }}>
              <b>Ngày kết thúc:</b> {moment(round.endDate).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="body1" sx={{ mb: '10px' }}>
              <b>Mô tả:</b> {round.description}
            </Typography>
            {!!round?.doctypes?.length && (
              <Typography variant="body1" sx={{ mb: '10px' }}>
                <b>Loại tài liệu được yêu cầu:</b>
              </Typography>
            )}

            {round?.doctypes?.map((docType) => (
              <Typography variant="body1" sx={{ mb: '10px' }} key={docType?.doctypeId}>
                {'- ' + docType?.title}
              </Typography>
            ))}

            {/* <Typography variant="body1" sx={{ mb: '10px' }}>
              <b>Danh sách đơn xin học bổng:</b>
            </Typography> */}
            {tabHook.Component()}
            {tabHook.value === 1 && renderPassedList()}
            {tabHook.value === 0 && renderAllList()}
          </>
        )}
      </Container>
    </Box>
  );
};

export default PublicRoundDetailPage;

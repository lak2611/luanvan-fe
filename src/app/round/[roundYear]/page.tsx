'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Container, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Stack, Button } from '@mui/material';
import { getRound, updateRound } from '@/app/service/services';
import moment from 'moment';
import Layout1 from '@/app/common/Layout1';
import CreateRoundDialog from '../CreateRoundDialog';
import useRound from './useRound';
import useApplicationList from '@/app/application/useApplicationList';
import { useRouter } from 'next/navigation';

const RoundDetailPage = ({ params }) => {
  const { roundYear } = params;
  const { applicationList, fetchApplicationList } = useApplicationList(roundYear);
  const router = useRouter();
  console.log('🚀 ~ file: page.tsx:14 ~ RoundDetailPage ~ applicationList:', applicationList);
  const [showCreateRoundDialog, setShowCreateRoundDialog] = useState(false);

  const { round, loading, fetchRound } = useRound(roundYear);

  return (
    <Layout1>
      <CreateRoundDialog
        open={showCreateRoundDialog}
        onClose={() => setShowCreateRoundDialog(false)}
        afterSubmit={() => {
          fetchRound();
          setShowCreateRoundDialog(false);
        }}
        title={'Cập nhật kỳ học bổng năm ' + roundYear}
        btnTitle={'Cập nhật'}
        data={round}
        serviceFunction={(data: any) => updateRound(roundYear, data)}
      />
      <Container maxWidth="xl" sx={{ py: '20px' }}>
        {loading && <LinearProgress />}
        {!loading && (
          <Stack direction={'row'} gap="10px" alignItems={'center'} mb="20px">
            <Typography variant="h4" component="h1">
              {!loading && !round ? 'Không tìm thấy kỳ phỏng vấn' : ` Kỳ học bổng năm ${roundYear}`}
            </Typography>
            <Button
              sx={{
                maxHeight: '40px',
              }}
              variant="contained"
              onClick={() => {
                setShowCreateRoundDialog(true);
              }}
            >
              Cập nhật
            </Button>
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

            <Typography variant="body1" sx={{ mb: '10px' }}>
              <b>Danh sách đơn xin học bổng:</b>
            </Typography>
            <Table>
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
                      router.push(`/application/${application?.applicationId}`);
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
          </>
        )}
      </Container>
    </Layout1>
  );
};

export default RoundDetailPage;

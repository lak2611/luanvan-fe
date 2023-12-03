'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Container, Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Stack, Button, Box } from '@mui/material';
import { getRound, publicResult, updateRound } from '@/app/service/services';
import moment from 'moment';
import Layout1 from '@/app/common/Layout1';
import CreateRoundDialog from '../CreateRoundDialog';
import useRound from './useRound';
import useApplicationList from '@/app/application/useApplicationList';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/app/utils/auth';
import { useRoundDetailTab } from './RoundDetailTab';
import Empty from '@/images/Empty';
import ApplicationList from '@/app/application/ApplicationList';

const RoundDetailPage = ({ params }) => {
  const { roundYear } = params;
  const router = useRouter();
  const [showCreateRoundDialog, setShowCreateRoundDialog] = useState(false);
  const roundTabHook = useRoundDetailTab();

  const { round, loading, fetchRound } = useRound(roundYear);
  const notFound = !loading && !round;

  const onPublicResult = async () => {
    try {
      let { data } = await publicResult({
        year: roundYear,
      });
      fetchRound();
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicationList = () => {
    return round?.applications?.filter((application) => {
      if (roundTabHook.value === 0) return true;
      if (!round?.publicResult) return false;
      return application?.status == 'approved';
    });
  };

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
            <Typography variant="h1" component="h1">
              {notFound ? 'Không tìm thấy kỳ phỏng vấn' : ` Kỳ học bổng năm ${roundYear}`}
            </Typography>
            {isAdmin() && !notFound && (
              <>
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
                {!round.publicResult ? (
                  <Button
                    onClick={() => {
                      onPublicResult();
                    }}
                    variant="contained"
                    color="success"
                  >
                    Công bố kết quả
                  </Button>
                ) : (
                  <Typography variant="body1" color="success.main">
                    Đã công bố kết quả
                  </Typography>
                )}
              </>
            )}
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

            <Stack>{roundTabHook.Component()}</Stack>
            {getApplicationList()?.length ? (
              <ApplicationList applicationList={getApplicationList()} />
            ) : (
              <Stack mt="20px" alignItems={'center'}>
                <Empty width={300} height={300} />
                <Typography mt="15px" variant="body1" color="rgba(0,0,0,0.6)" fontSize={'16px'} fontWeight={600}>
                  Chưa có dữ liệu
                </Typography>
              </Stack>
            )}
          </>
        )}
      </Container>
    </Layout1>
  );
};

export default RoundDetailPage;

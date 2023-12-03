import { Backdrop, Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import UpdateStatusBackdrop, { useUpdateStatusBackdrop } from './UpdateStatusBackdrop';
import { isAdmin } from '@/app/utils/auth';
const StatusSection = ({ application, refetch = () => {}, publicResult = false }) => {
  const updateStatusHook = useUpdateStatusBackdrop();

  const renderStatus = () => {
    switch (application?.status) {
      case 'pending':
        return (
          <Typography variant="h6" color="warning.main" sx={{ display: 'flex', alignItems: 'center' }}>
            <PendingIcon sx={{ mr: '5px' }} />
            Chờ duyệt
          </Typography>
        );
      case 'approved':
        return (
          <Typography variant="h6" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon sx={{ mr: '5px' }} />
            Trúng tuyển
          </Typography>
        );
      case 'rejected':
        return (
          <Typography variant="h6" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
            <SentimentVeryDissatisfiedIcon sx={{ mr: '5px' }} />
            Không trúng tuyển
          </Typography>
        );
      default:
        return (
          <Typography variant="h6" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
            <SentimentVeryDissatisfiedIcon sx={{ mr: '5px' }} />
            Không trúng tuyển
          </Typography>
        );
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Stack direction={'row'} alignItems={'center'} gap="10px">
        <Typography variant="h5" my="15px">
          Trạng thái hồ sơ
        </Typography>
        {isAdmin() && !publicResult && (
          <Button
            variant="outlined"
            onClick={() => {
              updateStatusHook.openBackdrop();
            }}
          >
            Cập nhật
          </Button>
        )}
      </Stack>
      {renderStatus()}
      {updateStatusHook.Component({ application, afterConfirm: refetch })}
    </Paper>
  );
};

export default StatusSection;

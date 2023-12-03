import { Backdrop, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { updateAppStatus } from '@/app/service/services';

const STATUS_LIST = ['pending', 'approved', 'rejected'];

const statusLabel = {
  pending: 'Chờ duyệt',
  approved: 'Trúng tuyển',
  rejected: 'Không trúng tuyển',
};

export const useUpdateStatusBackdrop = () => {
  const [open, setOpen] = React.useState(false);

  const openBackdrop = () => {
    setOpen(true);
  };

  const closeBackdrop = () => {
    setOpen(false);
  };

  const Component = ({ application, afterConfirm }) => {
    return <UpdateStatusBackdrop open={open} application={application} onClose={closeBackdrop} afterConfirm={afterConfirm} />;
  };

  return { Component, openBackdrop, setOpen };
};

const UpdateStatusBackdrop = ({ open, application, onClose, afterConfirm }) => {
  const [value, setValue] = useState(application?.status);
  console.log('🚀 ~ file: UpdateStatusBackdrop.tsx:34 ~ UpdateStatusBackdrop ~ value:', value);

  const onUpdateStatus = async () => {
    try {
      let { data } = await updateAppStatus(application?.applicationId, {
        status: value,
      });
      onClose();
      afterConfirm?.();
    } catch (error) {}
  };

  useEffect(() => {
    setValue(application?.status);
  }, [application]);

  return (
    <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}>
      <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Typography variant="h5" my="15px">
          Chọn trạng thái mới
        </Typography>
        <RadioGroup
          row
          aria-label="status"
          name="row-radio-buttons-group"
          defaultValue={value}
          value={value || 'pending'}
          onChange={(e, newValue) => {
            setValue(newValue);
          }}
        >
          {STATUS_LIST.map((status) => (
            <FormControlLabel key={status} value={status} control={<Radio value={status} />} label={statusLabel[status]} />
          ))}
        </RadioGroup>
        <Stack direction={'row'}>
          <Button
            variant="contained"
            sx={{ mt: '20px', mr: '10px' }}
            onClick={() => {
              onUpdateStatus();
            }}
          >
            Cập nhật
          </Button>
          <Button color="error" variant="contained" sx={{ mt: '20px' }} onClick={onClose}>
            Hủy
          </Button>
        </Stack>
      </Paper>
    </Backdrop>
  );
};

export default UpdateStatusBackdrop;

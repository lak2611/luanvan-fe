'use client';
import React, { useState } from 'react';
import Layout1 from '../common/Layout1';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import RoundList from '../round/RoundList';
import useRoundList from '../round/useRoundList';
import useCurrentNonstudent from './useCurrentNonstudent';
import UpdateNonstudentDialog from './UpdateNonstudentDialog';
import moment from 'moment';
import Header1 from '../common/Header1';

const ProfilePage = () => {
  const { roundList, fetchRoundList } = useRoundList();
  const { currentNonstudent, fetchCurrentNonstudent } = useCurrentNonstudent();
  const [openUpdateNonstudent, setOpenUpdateNonstudent] = useState(false);

  return (
    <Box>
      <Header1 />
      <Stack alignItems={'center'} px="10px" gap={'10px'} pt="20px">
        <Stack direction={'row'} alignItems={'center'} gap="10px">
          <Typography variant="h1" component="div">
            Thông tin cá nhân
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenUpdateNonstudent(true);
            }}
          >
            Cập nhật
          </Button>
        </Stack>
        <Card
          sx={{
            minWidth: 600,
            maxWidth: '100%',
          }}
        >
          <CardContent>
            <Box>
              <Typography fontWeight={'bold'}>Tên hiển thị: </Typography>
              <Typography>{currentNonstudent?.username || 'Chưa cập nhật'}</Typography>
            </Box>
            <Box>
              <Typography fontWeight={'bold'}>Chức vụ:</Typography>
              <Typography>{currentNonstudent?.position || 'Chưa cập nhật'}</Typography>
            </Box>
            <Box>
              <Typography fontWeight={'bold'}>Email:</Typography>
              <Typography>{currentNonstudent?.email || 'Chưa cập nhật'}</Typography>
            </Box>
            <Box>
              <Typography fontWeight={'bold'}>Số điện thoại:</Typography>
              <Typography>{currentNonstudent?.phone || 'Chưa cập nhật'}</Typography>
            </Box>
          </CardContent>
        </Card>
        {/* <Typography variant="h1" component="div">
          Danh sách kỳ phỏng vấn
        </Typography>
        <RoundList roundList={roundList} /> */}
        <UpdateNonstudentDialog
          fetchData={fetchCurrentNonstudent}
          open={openUpdateNonstudent}
          onClose={() => setOpenUpdateNonstudent(false)}
          propData={{ ...currentNonstudent, birthday: moment(currentNonstudent?.birthday) }}
        />
      </Stack>
    </Box>
  );
};

export default ProfilePage;

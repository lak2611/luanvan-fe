'use client';
import { Container, Card, CardContent, Typography, Stack, Button } from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';

const RoundList = ({ roundList }) => {
  const router = useRouter();
  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap="20px">
      {roundList.map((round) => (
        <Card
          key={round.id}
          sx={{
            minWidth: '500px',
            flex: 1,
          }}
        >
          <CardContent>
            <Typography variant="h6">Năm: {round.year}</Typography>
            <Typography>Ngày bắt đầu: {moment(round.startDate).format('DD/MM/YYYY')}</Typography>
            <Typography>Ngày kết thúc: {moment(round.endDate).format('DD/MM/YYYY')}</Typography>
            <Typography>Mô tả: {round.description}</Typography>
            <Button
              sx={{
                mt: '10px',
              }}
              onClick={() => {
                router.push(`round/${round.year}`);
              }}
              variant="contained"
              color="primary"
            >
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default RoundList;

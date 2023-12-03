'use client';
import Header1 from '@/app/common/Header1';
import RoundList from '@/app/round/RoundList';
import useRoundList from '@/app/round/useRoundList';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const PublicRoundPage = () => {
  const { roundList, fetchRoundList } = useRoundList();
  return (
    <Box>
      <Header1 />
      <Container
        maxWidth="xl"
        sx={{
          pt: '20px',
        }}
      >
        <Typography variant="h1">Danh sách kỳ học bổng</Typography>
        <RoundList roundList={roundList} />
      </Container>
    </Box>
  );
};

export default PublicRoundPage;

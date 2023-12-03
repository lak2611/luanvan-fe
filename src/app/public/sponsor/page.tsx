'use client';
import Header1 from '@/app/common/Header1';
import SponsorList from '@/app/sponsor/SponsorList';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const PublicSponsorPage = () => {
  return (
    <Box>
      <Header1 />
      <Container
        sx={{
          mt: '15px',
        }}
        maxWidth="xl"
      >
        <Typography mb="10px" textAlign={'center'} variant="h1">
          Thông tin tài trợ
        </Typography>
        <SponsorList />
      </Container>
    </Box>
  );
};

export default PublicSponsorPage;

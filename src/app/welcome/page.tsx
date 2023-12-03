'use client';
import { Container, Typography } from '@mui/material';
import React from 'react';
import Layout1 from '../common/Layout1';

const WelcomePage = () => {
  return (
    <Layout1>
      <Container>
        <Typography variant="h3" mt="30vh" textAlign={'center'}>
          Hệ thống quản lý xét cấp học bổng
        </Typography>
      </Container>
    </Layout1>
  );
};

export default WelcomePage;

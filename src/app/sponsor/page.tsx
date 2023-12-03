'use client';
import React, { useState, createContext, useContext } from 'react';
import Layout1 from '../common/Layout1';
import CreateSponsorForm from './CreateSponsorForm';
import { Button, Container, Stack, Typography } from '@mui/material';
import SponsorList from './SponsorList';
import CreateSponsorDialog from './CreateSponsorDialog';
import useSponsorList from './useSponsorList';
import Empty from '@/images/Empty';

const SponsorContext = createContext(null);
export const useSponsorContext = () => useContext(SponsorContext);

const SponsorPage = () => {
  const [isOpenCreateSponsor, setIsOpenCreateSponsor] = useState(false);
  const { sponsorList, fetchSponsorList } = useSponsorList();

  return (
    <SponsorContext.Provider value={{ setIsOpenCreateSponsor }}>
      <Layout1>
        <Container
          maxWidth="xl"
          sx={{
            pt: '10px',
          }}
        >
          <CreateSponsorDialog open={isOpenCreateSponsor} onClose={() => setIsOpenCreateSponsor(false)} />
          <Stack direction={'row'} alignItems={'center'} gap="10px">
            <Typography variant="h1">Thông tin tài trợ</Typography>
            <Button
              onClick={() => {
                setIsOpenCreateSponsor(true);
              }}
              variant="outlined"
            >
              <Typography variant="body1">Thêm</Typography>
            </Button>
          </Stack>
          <SponsorList />
        </Container>
      </Layout1>
    </SponsorContext.Provider>
  );
};

export default SponsorPage;

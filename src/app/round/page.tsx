'use client';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { TextField, Box, Typography, Container, Stack, Button } from '@mui/material';
import CreateRound from './CreateRound';
import RoundList from './RoundList';
import useRoundList from './useRoundList';
import CreateRoundDialog from './CreateRoundDialog';
import Layout1 from '../common/Layout1';
import { createRound } from '../service/services';

type RoundPageContextType = {
  fetchRoundList: () => Promise<void>;
  setOpenCreateRound: (open: boolean) => void;
} | null;

export const RoundContext = React.createContext<RoundPageContextType>(null);

const RoundPage = () => {
  const { roundList, fetchRoundList } = useRoundList();
  const [openCreateRound, setOpenCreateRound] = useState(false);

  const showCreateButton = () => {
    let currentYear = new Date().getFullYear();
    return roundList.every((round) => round.year !== currentYear);
  };

  return (
    <Layout1>
      <RoundContext.Provider
        value={{
          fetchRoundList,
          setOpenCreateRound,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: '20px',
          }}
        >
          <CreateRoundDialog
            open={openCreateRound}
            onClose={() => {
              setOpenCreateRound(false);
            }}
            afterSubmit={() => {
              fetchRoundList();
              setOpenCreateRound(false);
            }}
            title={'Bắt đầu kỳ mới năm ' + new Date().getFullYear()}
            btnTitle={'Tạo kỳ mới'}
            data={{}}
            serviceFunction={createRound}
          />
          <Stack direction={'row'} gap="20px">
            <Typography variant="h1">Danh sách kỳ học bổng</Typography>
            {showCreateButton() && (
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenCreateRound(true);
                }}
              >
                Bắt đầu kỳ mới
              </Button>
            )}
          </Stack>
          <RoundList roundList={roundList} />
        </Container>
      </RoundContext.Provider>
    </Layout1>
  );
};

export default RoundPage;

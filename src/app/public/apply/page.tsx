'use client';
import React, { useState } from 'react';
import ApplicationTable from '../../application/ApplicationTable';
import { Box } from '@mui/material';
import { IFile1 } from '../../interfaces/IFile1';
import Header1 from '../../common/Header1';
import { useRoundDetailTab } from '@/app/round/[roundYear]/RoundDetailTab';

interface ApplicationPageContextProps {
  fileObjs: {
    file: File;
    fieldName: string;
  }[];
  setFileObjs: any;
}

export const ApplicationPageContext = React.createContext<ApplicationPageContextProps | null>(null);

const ApplicationPage = () => {
  const [fileObjs, setFileObjs] = useState<IFile1[]>([]);
  return (
    <ApplicationPageContext.Provider
      value={{
        fileObjs,
        setFileObjs,
      }}
    >
      <Header1 />
      <Box pb={'40px'}>
        <ApplicationTable title={`Kỳ học bổng năm ${new Date().getFullYear()} - Đăng ký`} />
      </Box>
    </ApplicationPageContext.Provider>
  );
};

export default ApplicationPage;

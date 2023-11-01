'use client';
import React, { useState } from 'react';
import ApplicationTable from './ApplicationTable';
import Layout1 from '../common/Layout1';

interface ApplicationPageContextProps {
  fileObjs: {
    file: File;
    fieldName: string;
  }[];
  setFileObjs: any;
}

export const ApplicationPageContext = React.createContext<ApplicationPageContextProps | null>(null);

const ApplicationPage = () => {
  const [fileObjs, setFileObjs] = useState<
    {
      file: File;
      fieldName: string;
    }[]
  >([]);
  return (
    <ApplicationPageContext.Provider
      value={{
        fileObjs,
        setFileObjs,
      }}
    >
      <Layout1>
        <ApplicationTable title={`Kỳ học bổng năm ${new Date().getFullYear()} - Đăng ký`} />
      </Layout1>
    </ApplicationPageContext.Provider>
  );
};

export default ApplicationPage;

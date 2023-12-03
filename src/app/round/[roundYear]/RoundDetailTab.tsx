import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

export const useRoundDetailTab = () => {
  const [value, setValue] = useState(0);

  const Component = () => {
    return <RoundDetailTab value={value} setValue={setValue} />;
  };

  return { Component, value, setValue };
};

const RoundDetailTab = ({ value, setValue }) => {
  return (
    <Tabs
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
      }}
      sx={{
        width: '100%',
        display: 'flex',
      }}
    >
      <Tab
        sx={{
          flex: 1,
          maxWidth: '100%',
        }}
        label="Danh sách ứng viên"
      />
      <Tab
        sx={{
          flex: 1,
          maxWidth: '100%',
        }}
        label="Kết quả trúng tuyển"
      />
    </Tabs>
  );
};

export default RoundDetailTab;

'use client';
import React from 'react';
import CreateDocTypeForm from './CreateDocTypeForm';
import DocTypeList from './DocTypeList';
import useDocTypeList from './useDocTypeList';
import Layout1 from '../common/Layout1';
import { Container } from '@mui/material';

const DocTypePage = () => {
  const { docTypeList, fetchDocTypeList } = useDocTypeList();
  return (
    <Layout1>
      <Container>
        <CreateDocTypeForm fetchDocTypeList={fetchDocTypeList} />
        <DocTypeList docTypeList={docTypeList} fetchDocTypeList={fetchDocTypeList} />
      </Container>
    </Layout1>
  );
};

export default DocTypePage;

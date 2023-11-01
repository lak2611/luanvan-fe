import React, { useEffect, useState } from 'react';
import { getAllDocTypes } from '../service/services';

const useDocTypeList = () => {
  const [docTypeList, setDocTypeList] = useState([]);

  async function fetchDocTypeList() {
    try {
      let { data } = await getAllDocTypes();
      setDocTypeList(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDocTypeList();
  }, []);

  return {
    docTypeList,
    fetchDocTypeList,
  };
};

export default useDocTypeList;

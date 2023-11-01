import React, { useEffect, useState } from 'react';
import { getRoundList } from '../service/services';

const useRoundList = () => {
  const [roundList, setRoundList] = useState([]);
  console.log('🚀 ~ file: useRoundList.ts:6 ~ useRoundList ~ roundList:', roundList);

  async function fetchRoundList() {
    try {
      let { data } = await getRoundList();
      setRoundList(data?.data || []);
    } catch (error) {}
  }

  useEffect(() => {
    fetchRoundList();
  }, []);

  return {
    roundList,
    fetchRoundList,
  };
};

export default useRoundList;

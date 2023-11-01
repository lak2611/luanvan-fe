import { getRound } from '@/app/service/services';
import React, { useEffect, useState } from 'react';

const useRound = (roundYear) => {
  const [round, setRound] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchRound() {
    try {
      let { data } = await getRound(roundYear);
      setRound(data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRound();
  }, []);

  return { round, loading, fetchRound };
};

export default useRound;

import React, { useEffect, useState } from 'react';
import { getSponsorList } from '../service/services';

const useSponsorList = () => {
  const [sponsorList, setSponsorList] = useState([]);

  const fetchSponsorList = async () => {
    try {
      let { data } = await getSponsorList();
      setSponsorList(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchSponsorList();
  }, []);

  return { sponsorList, fetchSponsorList };
};

export default useSponsorList;

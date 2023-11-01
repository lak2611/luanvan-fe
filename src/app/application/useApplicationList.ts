import React from 'react';
import { getApplicationByYear } from '../service/services';

const useApplicationList = (year: number) => {
  const [applicationList, setApplicationList] = React.useState([]);

  const fetchApplicationList = async () => {
    try {
      const { data } = await getApplicationByYear(year);
      setApplicationList(data?.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchApplicationList();
  }, []);

  return { applicationList, fetchApplicationList };
};

export default useApplicationList;

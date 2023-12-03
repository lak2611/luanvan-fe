import React, { useEffect, useState } from 'react';
import { getCurrentNonstudent } from '../service/services';

const useCurrentNonstudent = () => {
  const [currentNonstudent, setCurrentNonstudent] = useState(null);

  const fetchCurrentNonstudent = async () => {
    try {
      const { data } = await getCurrentNonstudent();
      setCurrentNonstudent(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCurrentNonstudent();
  }, []);

  return {
    currentNonstudent,
    fetchCurrentNonstudent,
  };
};

export default useCurrentNonstudent;

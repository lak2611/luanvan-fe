import { getApplicationById } from '@/app/service/services';
import React from 'react';

const useApplicationById = (id: number) => {
  const [application, setApplication] = React.useState<any>({});

  const fetchApplication = async (id: any) => {
    try {
      const { data } = await getApplicationById(id);
      setApplication(data?.data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchApplication(id);
  }, []);

  return { application, fetchApplication };
};

export default useApplicationById;

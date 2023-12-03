'use client';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { login } from '../service/services';
import { useRouter } from 'next/navigation';
import { isAdmin, isNonstudent } from '../utils/auth';
import Form1 from '../common/Form1';
import ErrText from '../common/ErrText';
import Logo from '../../images/tsnt.png';
import Image from 'next/image';
import Header1 from '../common/Header1';

const formFields = [
  {
    name: 'username',
    label: 'Tên đăng nhập',
    type: 'text',
    required: true,
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    type: 'password',
    required: true,
  },
];

const Login = () => {
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();
  const [firstRender, setFirstRender] = useState(true);
  const [err, setErr] = useState('');

  const handleRoute = () => {
    if (isAdmin()) {
      router.push('/welcome');
      return;
    }
    if (isNonstudent()) {
      router.push('/profile');
      return;
    }
  };

  async function handleSubmit() {
    try {
      const { data } = await login(formData);
      if (data?.isErr) {
        setErr(data?.message);
        return;
      }
      localStorage.setItem('token', data?.data?.accessToken || '');
      handleRoute();
    } catch (error) {}
  }

  React.useEffect(() => {
    setFirstRender(false);
    handleRoute();
  }, []);

  React.useEffect(() => {
    setErr('');
  }, [formData]);

  if (!firstRender && !isAdmin() && !isNonstudent()) {
    return (
      <Box>
        <Header1 />
        <Box
          boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.2), 0px 0px 10px 0px rgba(0,0,0,0.14), 0px 0px 10px 0px rgba(0,0,0,0.12)'}
          maxWidth={'600px'}
          borderRadius={'10px'}
          mx={'auto'}
          mt={'10vh'}
          p={2}
        >
          <Stack gap="10px" alignItems={'center'}>
            <Image src={Logo} alt="tsnt" width={100} height={100} />
            <Typography mb="30px" variant="h4" textAlign={'center'}>
              Quỹ Học Bổng Thắp Sáng Niềm Tin
            </Typography>
            <Form1
              containerProps={{
                sx: {
                  px: '0px !important',
                },
              }}
              formData={formData}
              btnTitle="Đăng nhập"
              fields={formFields}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              beforeButton={<ErrText err={err} />}
            />
            {/* <Typography width={'100%'} textAlign={'right'}>
              Quên mật khẩu? <Link href="#">Nhấn vào đây</Link>
            </Typography> */}
          </Stack>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default Login;

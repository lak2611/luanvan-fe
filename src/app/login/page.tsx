import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const Login = () => {
  return (
    <Box
      boxShadow={
        '0px 0px 10px 0px rgba(0,0,0,0.2), 0px 0px 10px 0px rgba(0,0,0,0.14), 0px 0px 10px 0px rgba(0,0,0,0.12)'
      }
      maxWidth={'600px'}
      borderRadius={'10px'}
      mx={'auto'}
      mt={'10vh'}
      p={2}
    >
      <Stack gap="10px">
        <Typography mb="30px" variant="h4" textAlign={'center'}>
          Quỹ học bổng Thắp Sáng Niềm Tin
        </Typography>
        <TextField label="Tên đăng nhập" />
        <TextField label="Mật khẩu" />
        <Typography textAlign={'right'}>
          Quên mật khẩu? <Link href="#">Nhấn vào đây</Link>
        </Typography>
        <Button variant="contained">Đăng nhập</Button>
      </Stack>
    </Box>
  );
};

export default Login;

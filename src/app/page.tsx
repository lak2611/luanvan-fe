import Image from 'next/image';
import styles from './page.module.css';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../images/tsnt.png';
import Header1 from './common/Header1';

export default function Home() {
  return (
    <Box>
      <Header1 />
      <Stack alignItems={'center'} textAlign={'center'} pt="20vh">
        <Image src={Logo} alt="tsnt" width={150} height={150} />
        <Typography mt="15px" variant="h0" component="div" fontWeight={500}>
          Quỹ Học Bổng Thắp Sáng Niềm Tin
        </Typography>
        <Typography mt="10px" variant="h1" component="div" fontWeight={500}>
          Hệ Thống Xét Cấp Học Bổng
        </Typography>
      </Stack>
    </Box>
  );
}

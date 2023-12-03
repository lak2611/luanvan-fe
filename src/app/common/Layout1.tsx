'use client';
import React, { useEffect, useState } from 'react';
import { Box, Drawer, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sidebarItems1 } from '../sidebarItems/sidebarItems1';
import { useRouter } from 'next/navigation';
import { isAdmin, isNonstudent } from '../utils/auth';
import { sidebarItems2 } from '../sidebarItems/sidebarItems2';
import Logo from '../../images/tsnt.png';
import Image from 'next/image';

const drawerWidth = 240;

const useStyles: any = makeStyles((theme: any) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: '10 !important',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

type variant = 'admin' | 'user';

const Layout1 = ({ children, variant = 'admin' }: { children: React.ReactNode; variant?: variant }) => {
  const [firstRender, setFirstRender] = useState(true);
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    setFirstRender(false);
  }, []);

  function getSidebarItems() {
    let newVariant = variant;
    if (isNonstudent()) newVariant = 'user';
    //if still server side, return null
    if (typeof window === 'undefined') return null;
    switch (newVariant) {
      case 'admin':
        if (!isAdmin()) {
          router.push('/login');
          return [];
        }

        return sidebarItems1;
      case 'user':
        if (!isNonstudent()) {
          router.push('/login');
          return [];
        }
        return sidebarItems2;

      default:
        return null;
    }
  }

  if (!getSidebarItems()?.length || firstRender) return null;

  return (
    <Box>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <Box py="30px" display={'flex'} justifyContent={'center'} width={'100%'}>
          <Image
            onClick={() => {
              router.push('/');
            }}
            style={{
              cursor: 'pointer',
            }}
            src={Logo}
            alt="tsnt"
            width={70}
            height={70}
          />
        </Box>
        {getSidebarItems()?.map((item) => (
          <Box
            onClick={() => {
              router.push('/' + item.id);
            }}
            key={item.id}
            p="20px"
            sx={{ '&:hover': { backgroundColor: '#8ab4f8', cursor: 'pointer' } }}
          >
            <Typography variant="h6">{item.label}</Typography>
          </Box>
        ))}
        <Box flex={1}></Box>
        <Box
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          p="20px"
          mb="20px"
          sx={{ '&:hover': { backgroundColor: '#8ab4f8', cursor: 'pointer' } }}
        >
          <Typography variant="h6">Đăng xuất</Typography>
        </Box>
      </Drawer>
      <Box pl={`${drawerWidth}px`}>{children}</Box>
    </Box>
  );
};

export default Layout1;

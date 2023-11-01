import React from 'react';
import { Box, Drawer, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { sidebarItems1 } from '../sidebarItems/sidebarItems1';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

const useStyles: any = makeStyles((theme: any) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 10,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

type variant = 'admin' | 'user';

const Layout1 = ({ children, variant = 'admin' }: { children: React.ReactNode; variant?: variant }) => {
  const classes = useStyles();
  const router = useRouter();

  function getSidebarItems() {
    switch (variant) {
      case 'admin':
        return sidebarItems1;
      case 'user':
        return null;

      default:
        return null;
    }
  }

  return (
    <Box>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {getSidebarItems()?.map((item) => (
          <Box
            onClick={() => {
              router.push('/' + item.id);
            }}
            key={item.id}
            p="20px"
            sx={{ '&:hover': { backgroundColor: 'lightgray', cursor: 'pointer' } }}
          >
            <Typography variant="h6">{item.label}</Typography>
          </Box>
        ))}
      </Drawer>
      <Box pl={`${drawerWidth}px`}>{children}</Box>
    </Box>
  );
};

export default Layout1;

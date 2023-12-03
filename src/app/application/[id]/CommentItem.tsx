import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <Card
      sx={{
        borderRadius: '20px',
        mb: '15px',
      }}
    >
      <CardContent
        sx={{
          width: '100%',
        }}
      >
        <Typography fontWeight={700} variant="h6">
          {comment?.nonstudent?.username}
        </Typography>
        <Typography variant="body1">{comment?.content}</Typography>
        <Stack width={'100%'}>
          <Typography fontSize={'14px'} width={'100%'} textAlign={'right'} variant="caption">
            {moment(comment?.createdAt).format('HH:mm DD/MM/YYYY')}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CommentItem;

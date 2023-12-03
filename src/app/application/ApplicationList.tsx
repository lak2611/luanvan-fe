import { Box } from '@mui/material';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useRouter } from 'next/navigation';

import React from 'react';

const statusColor = {
  pending: 'gray',
  approved: 'green',
  rejected: 'red',
};

const statusText = {
  pending: 'Chờ xét duyệt',
  approved: 'Trúng tuyển',
  rejected: 'Không trúng tuyển',
};

const ApplicationList = ({ applicationList, isPublic = false }) => {
  const router = useRouter();
  return (
    <Box>
      <Table
        sx={{
          width: '100%',
          ...(applicationList?.length ? {} : { display: 'none' }),
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& *': {
                fontWeight: 'bold !important',
              },
            }}
          >
            <TableCell>Họ và tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Quên quán</TableCell>
            <TableCell>Ngành học</TableCell>
            <TableCell>Trường</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicationList.map((application) => (
            <TableRow
              onClick={() => {
                if (isPublic) {
                  router.push(`/public/apply/${application?.applicationId}`);
                  return;
                }
                router.push(`/application/${application?.applicationId}`);
              }}
              key={application?.applicationId}
              hover
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{application?.fullname}</TableCell>
              <TableCell>{application?.email}</TableCell>
              <TableCell>{application?.phone}</TableCell>
              <TableCell>{application?.hometown}</TableCell>
              <TableCell>{application?.major}</TableCell>
              <TableCell>{application?.university}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    color: statusColor[application?.status],
                    fontWeight: 'bold',
                  }}
                >
                  {statusText[application?.status]}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ApplicationList;

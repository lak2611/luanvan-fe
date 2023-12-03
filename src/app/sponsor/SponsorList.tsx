import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import { useSponsorContext } from './page';
import ImageList from '../application/ImageList';
import useSponsorList from './useSponsorList';
import Empty from '@/images/Empty';

const fields = [
  {
    name: 'fullname',
    label: 'Tên nhà tài trợ',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Mô tả',
    type: 'text',
    required: true,
  },
  {
    name: 'date',
    label: 'Ngày',
    type: 'date',
    required: true,
  },
  {
    name: 'money',
    label: 'Số tiền (VNĐ)' as any,
    type: 'number',
    required: true,
  },
];

const SponsorList = () => {
  const sponsorContext = useSponsorContext();
  const [showingRow, setShowingRow] = useState(-1);
  const { sponsorList, fetchSponsorList } = useSponsorList();

  return (
    <Box>
      {!!sponsorList?.length && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {fields.map((field) => (
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                    key={field.name}
                  >
                    {field.label}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sponsorList?.map?.((sponsor: any) => {
                const fileObjs: {
                  file: File;
                  fieldName: string;
                }[] = sponsor?.files?.map((file) => ({
                  file: file,
                  fieldName: file?.doctype?.doctypeId,
                }));
                return (
                  <>
                    <TableRow
                      sx={{
                        border: 'none',
                        '& *': {
                          border: 'none !important',
                        },
                      }}
                      key={sponsor.id}
                    >
                      {fields.map((field) => {
                        if (field.name == 'date') {
                          return <TableCell key={field.name}>{moment(sponsor[field.name]).format('DD/MM/YYYY')}</TableCell>;
                        }
                        return <TableCell key={field.name}>{sponsor[field.name]}</TableCell>;
                      })}
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            if (showingRow == sponsor.sponsorId) {
                              setShowingRow(-1);
                            } else {
                              setShowingRow(sponsor.sponsorId);
                            }
                          }}
                        >
                          {showingRow == sponsor.sponsorId ? 'Ẩn ảnh minh chứng' : 'Hiển thị ảnh minh chứng'}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={fields.length + 1}>
                        {showingRow == sponsor.sponsorId && <ImageList files={fileObjs} setFiles={() => {}} allFiles={fileObjs} />}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Stack display={sponsorList.length > 0 ? 'none' : 'flex'} mt="20px" alignItems={'center'}>
        <Empty width={300} height={300} />
        <Typography mt="15px" variant="body1" color="rgba(0,0,0,0.6)" fontSize={'16px'} fontWeight={600}>
          Chưa có dữ liệu
        </Typography>
      </Stack>
    </Box>
  );
};

export default SponsorList;

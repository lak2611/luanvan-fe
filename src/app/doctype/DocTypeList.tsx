'use client';
import React, { useEffect, useState } from 'react';
import { deleteDocType, getAllDocTypes, updateDocType } from '../service/services';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';

const DocTypeList = ({ docTypeList, fetchDocTypeList }) => {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState(null);

  async function onDeleteDocType(id: any) {
    try {
      let { data } = await deleteDocType(id);
      await fetchDocTypeList();
    } catch (error) {}
  }

  function onStartEditing(id, value) {
    setEditingId(id);
    setEditingValue(value);
  }

  async function onEndEditing() {
    try {
      await updateDocType(editingId, { title: editingValue });
      fetchDocTypeList();
    } catch (error) {}
    setEditingId(null);
    setEditingValue(null);
  }

  return (
    <TableContainer
      sx={{
        maxWidth: '800px',
        mx: 'auto',
        mt: '30px',
      }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Loại hồ sơ</strong>
            </TableCell>
            <TableCell>
              <strong>Hành động</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docTypeList.map((docType: any) => (
            <TableRow key={docType.doctypeId}>
              <TableCell>
                {editingId === docType.doctypeId ? (
                  <TextField
                    sx={{
                      width: '100%',
                    }}
                    id="outlined-basic"
                    label="Tên loại hồ sơ"
                    variant="outlined"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                  />
                ) : (
                  docType.title
                )}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    if (editingId === docType.doctypeId) {
                      onEndEditing();
                    } else {
                      onStartEditing(docType.doctypeId, docType.title);
                    }
                  }}
                  variant="outlined"
                  color="primary"
                >
                  {editingId === docType.doctypeId ? 'Lưu' : 'Sửa'}
                </Button>
                {/* <Button onClick={() => onDeleteDocType(docType.doctypeId)} variant="outlined" color="error">
                  Xóa
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DocTypeList;

import React, { useState } from 'react';
// Inserted code starts here
import { Backdrop, Box, IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SERVER_URL } from '../service/services';
import { IFile1 } from '../interfaces/IFile1';
const IMG_HEIGHT = '100px';
// Inserted code ends here

interface ImageListProps {
  files: IFile1[];
  setFiles: any;
  allFiles: IFile1[];
}

const ImageList = ({ files, setFiles, allFiles }: ImageListProps) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const transformedFiles = files?.map((file: any) => file.file);
  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap="10px">
      {transformedFiles?.map((file: any) => (
        <div key={file.name} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <img
            onClick={() => setSelectedImage(file)}
            src={file?.url ? SERVER_URL + file?.url : URL.createObjectURL(file)}
            alt={file.name}
            style={{ height: IMG_HEIGHT, width: 'auto' }}
          />
          {!file?.url && (
            <IconButton
              sx={{
                background: 'black',
                '&:hover': {
                  background: 'rgba(0,0,0,0.5)',
                },
                height: '20px',
                width: '20px',
              }}
              onClick={() => setFiles(allFiles.filter((f: any) => f.file !== file))}
              style={{ position: 'absolute', top: 0, right: 0, color: 'white', cursor: 'pointer' }}
            >
              <Close color="inherit" />
            </IconButton>
          )}
        </div>
      ))}
      {selectedImage && (
        <Backdrop
          sx={{
            zIndex: 1000,
            position: 'fixed',
            top: 0,
            left: 0,
            overflow: 'auto',
          }}
          open={true}
          onClick={() => setSelectedImage(null)}
        >
          <Box position={'absolute'} p="20px" top="0px">
            <img
              src={selectedImage?.url ? SERVER_URL + selectedImage?.url : URL.createObjectURL(selectedImage)}
              alt=""
              style={{
                maxHeight: '100vh',
                maxWidth: '100vw',
                width: 'auto',
                height: 'auto',
              }}
            />
          </Box>
        </Backdrop>
      )}
    </Stack>
  );
};

export default ImageList;

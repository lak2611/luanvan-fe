import React from 'react';
// Inserted code starts here
import { IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
const IMG_HEIGHT = '100px';
// Inserted code ends here

const ImageList = ({ files, setFiles, onImgClick, allFiles }) => {
  const transformedFiles = files?.map((file: any) => file.file);
  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap="10px">
      {transformedFiles?.map((file: any) => (
        <div key={file.name} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <img
            onClick={() => onImgClick(file)}
            src={file?.url || URL.createObjectURL(file)}
            alt={file.name}
            style={{ height: IMG_HEIGHT, width: 'auto' }}
          />
          <IconButton
            onClick={() => setFiles(allFiles.filter((f: any) => f.file !== file))}
            style={{ position: 'absolute', top: 0, right: 0, color: 'white', cursor: 'pointer' }}
          >
            <Close color="inherit" />
          </IconButton>
        </div>
      ))}
    </Stack>
  );
};

export default ImageList;

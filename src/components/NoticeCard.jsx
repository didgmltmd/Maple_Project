import React from 'react';
import {Box, Typography,Card,CardContent} from '@mui/material';

export default function NoticeCard({ title, contentUrl }) {
  const onclickHandler = () => {
    if (contentUrl) {
      window.open(contentUrl, "_blank");
    }
  };
  return (
     <Card sx={{ mb: 2, position: "relative" ,height: "10vh"}}>
        <CardContent
          >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              }
            }}
            onClick={onclickHandler}
            >
            <Typography variant="h7">
              {title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
  );
}
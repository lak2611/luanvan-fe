"use client";
import Header1 from "@/app/common/Header1";
import RoundList from "@/app/round/RoundList";
import useRoundList from "@/app/round/useRoundList";
import Empty from "@/images/Empty";
import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

const PublicRoundPage = () => {
  const { roundList, fetchRoundList } = useRoundList();
  return (
    <Box>
      <Header1 />
      <Container
        maxWidth="xl"
        sx={{
          pt: "20px",
        }}
      >
        <Typography variant="h1" textAlign={"center"}>
          Danh sách kỳ học bổng
        </Typography>
        <RoundList roundList={roundList} />
        {!roundList?.length && (
          <Stack mt="20px" alignItems={"center"}>
            <Empty width={300} height={300} />
            <Typography
              mt="15px"
              variant="body1"
              color="rgba(0,0,0,0.6)"
              fontSize={"16px"}
              fontWeight={600}
            >
              Chưa có thông tin
            </Typography>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default PublicRoundPage;

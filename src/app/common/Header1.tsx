"use client";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Box,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { isAdmin, isNonstudent } from "../utils/auth";

const menuItems = [
  {
    name: "Kỳ xét học bổng",
    link: "/public/round",
  },
  {
    name: "Nộp hồ sơ",
    link: "/public/apply",
  },
  {
    name: "Thông tin tài trợ",
    link: "/public/sponsor",
  },
];

const Header1 = () => {
  const router = useRouter();
  const [loginText, setLoginText] = useState("");
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setFirstRender(true);
    if (isNonstudent()) {
      setLoginText("Đăng xuất");
      return;
    }
    setLoginText(isAdmin() ? "Quản lý" : "Đăng nhập");
  }, []);
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Stack gap="40px" alignItems={"center"} direction={"row"}>
          <IconButton
            onClick={() => {
              router.push("/");
            }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Home />
          </IconButton>
          {menuItems.map((item) => (
            <Typography
              onClick={() => {
                router.push(item.link);
              }}
              key={item.name}
              variant="h6"
              component="div"
              fontWeight={500}
              sx={{
                "&:hover": {
                  opacity: [0.9, 0.8, 0.7],
                },
                cursor: "pointer",
              }}
            >
              {item.name}
            </Typography>
          ))}
        </Stack>
        <Stack direction={"row"} gap="40px">
          {isNonstudent() && firstRender && (
            <Typography
              onClick={() => {
                router.push("/profile");
              }}
              variant="h6"
              component="div"
              fontWeight={500}
              sx={{
                "&:hover": {
                  opacity: [0.9, 0.8, 0.7],
                },
                cursor: "pointer",
              }}
            >
              Thông tin cá nhân
            </Typography>
          )}
          <Typography
            onClick={() => {
              if (isNonstudent()) {
                localStorage.clear();
              }
              router.push("/login");
            }}
            variant="h6"
            component="div"
            fontWeight={500}
            sx={{
              "&:hover": {
                opacity: [0.9, 0.8, 0.7],
              },
              cursor: "pointer",
            }}
          >
            {loginText}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header1;

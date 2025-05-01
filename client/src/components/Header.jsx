import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: isDark ? "#333" : "#1976d2", // Dark or light background
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            color: isDark ? "#fff" : "#f5f5f5",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          BlogsApp
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: isDark ? "#fff" : "#f5f5f5",
                },
              }}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#f5f5f5",
                }}
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#f5f5f5",
                }}
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: isDark ? "#fff" : "#f5f5f5",
                }}
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#f5f5f5",
                  borderRadius: 10,
                  border: `2px solid ${isDark ? "#fff" : "#f5f5f5"}`,
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignupClick}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#f5f5f5",
                  borderRadius: 10,
                  border: `2px solid ${isDark ? "#fff" : "#f5f5f5"}`,
                }}
              >
                SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                backgroundColor: isDark ? "#f44336" : "#d32f2f",
                color: "#fff",
                "&:hover": {
                  backgroundColor: isDark ? "#d32f2f" : "#b71c1c",
                },
              }}
            >
              Logout
            </Button>
          )}
          <div
            onClick={(e) => {
              e.preventDefault();
              dispatch(setDarkmode(!isDark));
            }}
            style={{
              alignContent: "center",
              padding: "10px 0",
              cursor: "pointer",
              color: isDark ? "#fff" : "#f5f5f5",
            }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

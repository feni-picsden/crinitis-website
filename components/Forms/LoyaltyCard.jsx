import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import Image from "next/image";

// import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const LoyaltyCard = () => {
  return (
    <>
    <div>
      <AppBar
      position="static"
      elevation={0}
      sx={{
        mb:3,
        backgroundColor: "#fff",
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Icon */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/img/icon/square.svg"
            width={24}
            height={24}
            alt="Logo"
          />
        </Box>

         <a href="tel:0280267700" className="blockbtn" title="Call Us">
            Call Us
         </a>
      </Toolbar>
    </AppBar>
    <Paper
      elevation={0}
      sx={{
        maxWidth: 620,
        mx: "auto",
        borderRadius: 3,
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 56,
          height: 56,
          mx: "auto",
          mb: 3,
          borderRadius: 2,
          backgroundColor: "rgb(84, 100, 118)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <Image
        src="/img/icon/store.svg"
        width={24}
        height={24}
        sx={{
          color: "#fff"
        }}
        alt="Home"
      />
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Criniti&apos;s Italian Cuisine
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mb: 3,
          fontSize:14,
          lineHeight: 1.6,
        }}
      >
        Earn La Famiglia Loyalty when you shop and get rewards,
        offers and coupons.
      </Typography>

      {/* Button */}
      <a
        href="https://app.squareup.com/loyalty/MLGSKJY8DHNCQ"
        target="_blank"
        rel="noopener noreferrer"
      >
    <Button
        fullWidth
        sx={{
          height: 52,
          borderRadius: 999,
          backgroundColor: "#000",
          color: "#fff",
          marginBottom: '20px',
          fontWeight: 600,
          textTransform: "none",
          fontSize: 16,
          "&:hover": {
            backgroundColor: "#111",
          },
        }}
      >
      Sign up or check in
      </Button>
       </a>
    </Paper>
    </div>
    </>
  );
};

export default LoyaltyCard;

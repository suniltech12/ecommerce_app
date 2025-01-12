import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = () => {
  return (
    <Box className="Loader">
      <CircularProgress className="circular" />
    </Box>
  );
};

export default Loader;

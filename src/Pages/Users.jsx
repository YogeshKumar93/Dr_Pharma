import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Users = () => {
  return (
    <Box p={2} >
      <Typography sx={{fontSize:100, ml:20}}>Hello this is yogesh</Typography>
      <Button variant="contained" sx={{backgroundColor:"yellow"}}>Add Bank</Button>
    </Box>
  );
};

export default Users;

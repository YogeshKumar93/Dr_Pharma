import { BrowserRouter } from "react-router-dom";
import { ThemeProvider,createTheme  } from "@mui/material";
 
// import theme from "./theme";
import Approutes from "./AppRoutes/Approutes";

export default function App() {
const theme = createTheme();


  return (
    <ThemeProvider theme={theme}>
 
     
        {/* Any global providers also here */}
        {/* <AuthProvider> */}
        <Approutes />
        {/* </AuthProvider> */}
      
    </ThemeProvider>
  );
}

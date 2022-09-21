import { createTheme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { Routes, Route } from "react-router-dom";
import VotingAppBar from "./components/appBar";
import IntroPage from "./components/intro";
import PrivateRoute from "./components/PrivateRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0b223dfc",
    },
    
  },
});


const App = () => {
 
  return(
    <>
     <ThemeProvider theme={theme}>
    <VotingAppBar />
    <Routes>
    <Route path = "/"  element={<PrivateRoute action="End-user" />}/>
    <Route path = "/admin" element={<PrivateRoute action="Admin" />} />
    <Route path = "/intro"  element={<IntroPage/>}/>
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App;
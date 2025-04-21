import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Login from "pages/login";
import { useMemo } from "react";
// import { useSelector } from "react-redux";
import { themeSettings } from "theme";

function App() {
  const mode = "dark"; //useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Login />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;

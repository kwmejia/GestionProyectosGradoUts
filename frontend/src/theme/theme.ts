import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }


}


export const theme = createTheme({
  palette: {
    primary: {
      main: '#CAD225',
    },
    success: {
      main: '#0B4A75'
    },
    error: {
      main: "#dc2626"
    },
    neutral: {
      main: "#777777",
    },
    secondary: {
      main: "#FAFAFA"
    },

  }
});


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
    palette:{
        primary: {
            main: '#CAD225',
        },
        success: {
            main: '#2196f3'
        },
        error: {
            main: red[400]
        },
        neutral: {
            main: "#777777",
        }
        
    }
});


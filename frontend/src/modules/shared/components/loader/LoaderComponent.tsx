
import { Box, LinearProgress } from "@mui/material"
import './loaderStyles.scss';

export const LoaderComponent = () => {
    return (
        <div className="cont-loader">
            <img src="https://www.uts.edu.co/sitio/wp-content/uploads/2019/10/favicon-1.png" alt="logo" className="logo-loader" />
            <Box sx={{ width: '30%' }}>
                <LinearProgress />
            </Box>
        </div>
    )
}

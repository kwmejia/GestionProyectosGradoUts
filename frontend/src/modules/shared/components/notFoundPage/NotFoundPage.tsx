import { Box, Button, ThemeProvider } from '@mui/material';
import iconSrc from "../../../../assets/img/iconSad.png";
import { theme } from "../../../../theme/theme";
import { useNavigate } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => {

	const navigate = useNavigate();
	const neutralColor = "#777777";
	const goBack = () => {
		navigate(-1);
	}

	return (
		<ThemeProvider theme={theme}>
			<Box className="container-page w-100 h-100 d-flex flex-column justify-content-center aling-items-center text-center mx-4 mx-md-0">
				<div className="w-100">
					<img src={iconSrc} alt="img" width={200} />
				</div>
				<h2>404</h2>
				<h4>No hemos podido encontrar la página que buscas.</h4>
				<p>
					La página que está buscando no existe o ocurrió otro error. <br />
					Regresa o puedes hacer
					<Button variant="text" color="success" onClick={goBack}>
						<span>clic aquí</span>
					</Button>
					para redirigirte.
				</p>
			</Box>
		</ThemeProvider >
	);
}

export default NotFoundPage;

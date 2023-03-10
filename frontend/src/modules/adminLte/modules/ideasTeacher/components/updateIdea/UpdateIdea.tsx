import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ReactQuill from 'react-quill';
import { useIdeasTeacher } from '../../../../../../hooks/useIdeasTeacher';
import { AuthContext } from '../../../../../../context/AuthContext';
import 'react-quill/dist/quill.snow.css';
import './newIdea.scss';

const NewIdea = () => {
  const [typesIdeas, setTypesIdeas] = useState([
    { id: 1, nombre: 'Desarrollo Tecnológico' },
    { id: 2, nombre: 'Monografía' },
    { id: 3, nombre: 'Emprendimiento' },
    { id: 4, nombre: 'Investigación' },
  ]);

  const [typeIdea, setTypeIdea] = useState('');
  const [descriptionIdea, setDescriptionIdea] = useState('');
  const [titleIdea, setTitleIdea] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const { updateIdeaTeacher, getIdeaTeacherById } = useIdeasTeacher();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) onMountedComponent();
  }, [user])

  const onMountedComponent = async () => {

    const data = await getIdeaTeacherById(Number(params.id), user?.email);
    if (!data) {
      navigate('*')
      return;
    }

    setTitleIdea(data.nombre_idea);
    setTypeIdea(data.id_tipo_idea);
    setDescriptionIdea(data.descripcion_idea);
  }


  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setTypeIdea(value);
  };

  const onChangeTitleIdea = (title: string) => {
    setTitleIdea(title);
  }

  const onChangeDescription = (description: string) => {
    setDescriptionIdea(description);
  }

  const showAlertError = (msg: string) => {
    Swal.fire({
      title: msg,
      icon: 'error',
      timer: 5000,
      confirmButtonColor: "#c3d730",
      iconColor: "#dc2626"
    });
  }

  const showAlertSuccess = (msg: string) => {
    Swal.fire({
      title: msg,
      icon: 'success',
      timer: 5000,
      confirmButtonColor: "#0B4A75",
      iconColor: "#c3d730"
    });
  }

  const onSubmitForm = async () => {
    if ([titleIdea, descriptionIdea, typeIdea].includes('')) {
      showAlertError("Todos los campos son obligatorios");
      return;
    }

    if (descriptionIdea.length <= 100) {
      showAlertError("La descripción de la idea debe ser de minimo 100 caracteres");
      return;
    }

    try {
      await updateIdeaTeacher(Number(params.id), titleIdea, typeIdea, descriptionIdea)
      setTitleIdea('');
      setTitleIdea('');
      setDescriptionIdea('');
      localStorage.removeItem('titleIdea');
      localStorage.removeItem('descriptionIdea');
      localStorage.removeItem('typeIdea');
      showAlertSuccess("La idea fue actualizada exitosamente");
      navigate('/mis-ideas');
    } catch (error) {
      showAlertError("Ocurrió un problema al actualizar la idea ");
    }
  }


  return (
    <div className="new-idea-container container mb-5 mt-4 w-100 fadeIn">
      <h1 className="text-center my-3 text-muted">Actualizar idea</h1>
      <div className="d-flex row w-100">
        <div className="col-md-8 mb-3">
          <h4 className="text-second">Titulo de la idea</h4>
          <TextField
            label="Titulo"
            variant="outlined"
            size='small'
            style={{ width: '100%', color: "#6B778C" }}
            onChange={(e) => onChangeTitleIdea(e.target.value)}
            value={titleIdea}
          />
        </div>

        <div className="col-md-4 mb-3 ">
          <h4 className="text-second">Tipo de idea</h4>
          <FormControl sx={{ width: "95%", color: "#344563" }} size="small">
            <InputLabel id="demo-select-small">Tipo</InputLabel>
            <Select
              style={{ color: "#6B778C" }}
              labelId="demo-select-small"
              id="demo-select-small"
              value={typeIdea}
              label="Age"
              onChange={handleChange}
            >
              {typesIdeas.map((type, index) => (
                <MenuItem
                  key={index}
                  value={type.id}
                  style={{ color: "#6B778C" }}
                >{type.nombre}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>
      </div>

      <h4 className="text-second mt-4">Descripción</h4>
      <div className="quill-container me-5">
        <ReactQuill theme="snow" value={descriptionIdea} onChange={onChangeDescription} />
      </div>

      <div className="mt-3">
        <Button variant="contained" endIcon={<SendIcon color="secondary" />} onClick={onSubmitForm}>
          <span className="text-white">Actualizar Idea</span>
        </Button>
      </div>
    </div>
  )
}


export default NewIdea;
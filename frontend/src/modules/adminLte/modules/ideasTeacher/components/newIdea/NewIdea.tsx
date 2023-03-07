import { useState, useEffect, useContext } from 'react';
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

export const NewIdea = () => {
  const [typesIdeas, setTypesIdeas] = useState([
    { id: 1, nombre: 'Desarrollo Tecnológico' },
    { id: 2, nombre: 'Monografía' },
    { id: 3, nombre: 'Emprendimiento' },
    { id: 4, nombre: 'Investigación' },
  ]);

  const [typeIdea, setTypeIdea] = useState('');
  const [descriptionIdea, setDescriptionIdea] = useState('');
  const [titleIdea, setTitleIdea] = useState('');


  const { postIdeasTeacher } = useIdeasTeacher();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    onMountedComponent();
  }, [])

  const onMountedComponent = () => {

  }

  const handleChange = (event: SelectChangeEvent) => {
    setTypeIdea(event.target.value);
  };

  const onChangeTitleIdea = (title: string) => {
    setTitleIdea(title);
  }

  const onSubmitForm = async () => {
    console.log(titleIdea);
    console.log(descriptionIdea);
    console.log(typeIdea);

    if ([titleIdea, descriptionIdea, typeIdea].includes('')) {
      Swal.fire({
        title: "Todos los campos son obligatorios",
        icon: 'error',
        timer: 5000,
        confirmButtonColor: "#c3d730",
        iconColor: "#dc2626"
      });
      return;
    }

    try {
      await postIdeasTeacher(titleIdea, user?.email, typeIdea, descriptionIdea)
      setTitleIdea('');
      setTitleIdea('');
      setDescriptionIdea('');
      Swal.fire({
        title: "La idea fue creada exitosamente",
        icon: 'success',
        timer: 5000,
        confirmButtonColor: "#0B4A75",
        iconColor: "#c3d730"
      });
    } catch (error) {
      Swal.fire({
        title: "Ocurrió un problema al crear la idea ",
        icon: 'error',
        timer: 5000,
        confirmButtonColor: "#c3d730",
        iconColor: "#dc2626"
      });
    }
  }


  return (
    <div className="new-idea-container m-4 w-100">
      <div className="d-flex row w-100">
        <div className="col-6 mb-3">
          <h4 className="text-second">Titulo de la idea</h4>
          <TextField
            label="Titulo"
            variant="outlined"
            size='small'
            style={{ width: '100%', color: "#fff" }}
            onChange={(e) => onChangeTitleIdea(e.target.value)}
          />
        </div>

        <div className="col-2 mb-3">
          <h4 className="text-second">Tipo de idea</h4>
          <FormControl sx={{ width: 250, color: "#344563" }} size="small">
            <InputLabel id="demo-select-small">Tipo</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={typeIdea}
              label="Age"
              onChange={handleChange}
            >
              {typesIdeas.map((type, index) => (
                <MenuItem key={index} value={type.id}>{type.nombre}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>
      </div>

      <h4 className="text-second">Descripción</h4>
      <div className="quill-container me-5">
        <ReactQuill theme="snow" value={descriptionIdea} onChange={setDescriptionIdea} />
      </div>

      <div className="mt-3">
        <Button variant="contained" endIcon={<SendIcon color="secondary" />} onClick={onSubmitForm}>
          <span className="text-white">Enviar a revision</span>
        </Button>
      </div>
    </div>
  )
}

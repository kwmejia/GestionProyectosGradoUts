import { useEffect, useState } from 'react';
import { useIdeasTaken } from '../../../../../hooks';
import clientHTTP from '../../../../../api/configAxios';
import Swal from 'sweetalert2';
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';

const IdeasTakenAdmin = () => {
  const [valueRadius, setValueRadius] = useState("");

  const { allIdeasTaken, getAllIdeasTaken, deteleIdeaTaken } = useIdeasTaken();
  useEffect(() => {
    onMounted();
  }, [])

  const onMounted = async () => {
    await getAllIdeasTaken();
  }

  const alertDeleteIdea = (id: number) => {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar esta idea?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#0B4A75",
      cancelButtonText: "Cancelar"

    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteIdea(id);
      }
    })
  }

  const showAlert = () => {
    return Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Idea actualizada correctamente!',
      toast: true,
      showConfirmButton: false,
      timer: 1500
    })
  }

  const showAlertError = () => {
    return Swal.fire({
      position: 'bottom-end',
      icon: 'error',
      title: 'Oops! Ocurrió un error',
      toast: true,
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handlePay = async (id: number) => {
    try {
      await clientHTTP.put(`/payIdea?id=${id}`);
      onMounted();
      showAlert();
    } catch (error) {
      showAlertError();
    }
  }

  const handleNoPay = async (id: number) => {
    try {
      await clientHTTP.put(`/noPayIdea?id=${id}`);
      onMounted();
      showAlert();
    } catch (error) {
      showAlertError();
    }
  }

  const handleDeleteIdea = async (id: number) => {
    try {
      await deteleIdeaTaken(id);
      onMounted();
      showAlert();
    } catch (error) {
      showAlertError();
    }
  }

  const filterIdeaByState = async (state: any) => {
    setValueRadius(state);
    try {
      await getAllIdeasTaken(state);
    } catch (error) {
      showAlertError();
    }
  }

  const filterIdea = async (search: string) => {
    try {
      await getAllIdeasTaken(valueRadius, search);
    } catch (error) {
      showAlertError();
    }
  }

  return (
    <section className="w-100 d-flex flex-column m-5 aling-items-center">
      <h1 className="text-center mb-5">Administrar Ideas Tomadas</h1>
      <div className="w-100 my-4 d-flex gap-5">
        <TextField
          label="Buscar"
          variant="outlined"
          size='small'
          onChange={(e) => filterIdea(e.target.value)}
        />

        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={valueRadius}
            onChange={(e) => filterIdeaByState(e.target.value)}
          >
            <FormControlLabel value="" control={<Radio />} label="Todas las ideas" />
            <FormControlLabel value="1" control={<Radio />} label="Pagadas" />
            <FormControlLabel value="0" control={<Radio />} label="Sin pagar" />
          </RadioGroup>
        </FormControl>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de la idea</th>
            <th scope="col">Correo estudiante</th>
            <th scope="col">Fecha tomada</th>
            <th scope="col">Estado de pago</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {allIdeasTaken.map((idea, index) => (
            <tr key={idea.id_idea_tomada}>
              <td>{index + 1}</td>
              <td>{idea.nombre_idea}</td>
              <td>{idea.id_azure_estudiante_correo}</td>
              <td>{idea.fecha_aceptado}</td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {(idea.estado_pago) ? "Pagada" : "Sin pagar"}
                  </button>
                  <ul className="dropdown-menu">
                    {(idea.estado_pago)
                      ? <li>
                        <a className="dropdown-item" onClick={() => handleNoPay(idea.id_idea_tomada)}>Sin pagar</a>
                      </li>
                      : <li><a className="dropdown-item" onClick={() => handlePay(idea.id_idea_tomada)}>Pagada</a></li>
                    }
                  </ul>
                </div>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => alertDeleteIdea(idea.id_idea_tomada as number)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default IdeasTakenAdmin;
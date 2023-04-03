import { useEffect, useRef, useState } from 'react';
import { useIdeas } from '../../../../../hooks';
import { TypeStateIdeas } from '../../../../../interfaces/interfacesEndPoints';
import clientHTTP from '../../../../../api/configAxios';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Swal from 'sweetalert2';
import './ideasAdmin.scss';




const IdeasAdmin = () => {
  const [valueRadius, setValueRadius] = useState("");
  const { getAllIdeas, allIdeas, loader } = useIdeas();
  const [ideaModal, setideaModal] = useState<TypeStateIdeas>();

  useEffect(() => {
    onMounted();
  }, [])

  const onMounted = async () => {
    await getAllIdeas();
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

  const approveIdea = async (id: number) => {
    try {
      await clientHTTP.put(`/approveIdea?id=${id}`);
      onMounted();
      showAlert();
    } catch (error) {
      showAlertError();
    }
  }

  const disapproveIdea = async (id: number) => {
    try {
      await clientHTTP.put(`/disapproveIdea?id=${id}`);
      showAlert();
      onMounted();
    } catch (error) {
      showAlertError();
    }
  }

  const filterIdea = async (search: string) => {
    try {
      await getAllIdeas(valueRadius, search);
    } catch (error) {
      showAlertError();
    }
  }

  const filterIdeaByState = async (state: any) => {
    setValueRadius(state);
    try {
      await getAllIdeas(state);

    } catch (error) {

    }
  }
  return (
    <section className="fadeIn container-ideasAdmin m-5">
      <h1 className="text-center w-100">Administrador de ideas</h1>

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
            <FormControlLabel value="1" control={<Radio />} label="Aprobadas" />
            <FormControlLabel value="0" control={<Radio />} label="Desaprobadas" />
          </RadioGroup>
        </FormControl>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de la idea</th>
            <th scope="col">Correo docente</th>
            <th scope="col">Tipo Idea</th>
            <th scope="col">Descripción</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>

          {allIdeas.map((idea, index) => (
            <tr key={idea.id_idea}>
              <th scope="row">{index + 1}</th>
              <td>{idea.nombre_idea}</td>
              <td>{idea.id_azure_docente_correo}</td>
              <td>{idea.nombre}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setideaModal(idea)}
                >
                  Ver
                </button>
              </td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {(idea.aprovado) ? "Aprobada" : "Desaprobada"}
                  </button>
                  <ul className="dropdown-menu">
                    {(idea.aprovado)
                      ? <li>
                        <a className="dropdown-item" onClick={() => disapproveIdea(idea?.id_idea as number)}>Desaprobar</a>
                      </li>
                      : <li><a className="dropdown-item" onClick={() => approveIdea(idea?.id_idea as number)}>Aprobar</a></li>
                    }
                  </ul>
                </div>
              </td>
            </tr>

          ))

          }
        </tbody>


      </table>

      <div className="modal fade" id="exampleModal" data-bs-backdrop="static" style={{ zIndex: 9999999 }} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Descripción de la idea</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h1>{ideaModal?.nombre_idea}</h1>
              <p className="my-2">{ideaModal?.fecha_creacion}</p>
              <p className="my-2">{ideaModal?.id_azure_docente_correo}</p>
              <p className="mt-3 fw-bold">Descripción:</p>
              <div id="cont-description" dangerouslySetInnerHTML={{ __html: ideaModal?.descripcion_idea as string }}></div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Volver</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IdeasAdmin;
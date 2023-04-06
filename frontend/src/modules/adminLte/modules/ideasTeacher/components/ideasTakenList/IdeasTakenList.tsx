import { useEffect, useContext } from 'react';
import { useIdeasTaken } from '../../../../../../hooks/useIdeasTaken';
import { AuthContext } from '../../../../../../context/AuthContext';
import formatDate from '../../../../../../helpers/formatDate';
import './ideasTaken.scss'

export const IdeasTakenList = () => {
  const { getIdeasTakenTeacher, ideasTakenTeacher } = useIdeasTaken();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) onMounted();
  }, [user, ideasTakenTeacher])

  const onMounted = async () => {
    await getIdeasTakenTeacher(user?.email);
  }


  if (!ideasTakenTeacher.length) {
    return (
      <section className="w-100 text-center">
        <h1 className="text-center .color-text">No tienes ideas tomadas</h1>
      </section>
    )
  }

  return (
    <section className="table-container table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de la idea</th>
            <th scope="col">Tipo</th>
            <th scope="col">Correo estudiante</th>
            <th scope="col">Fecha tomado</th>
          </tr>
        </thead>
        <tbody>
          {ideasTakenTeacher.map((idea, index) => (
            <tr key={idea.id_idea}>
              <th scope="row">{index + 1}</th>
              <td>{idea.nombre_idea}</td>
              <td>{idea.nombre}</td>
              <td>{idea.id_azure_estudiante_correo}</td>
              <td>{formatDate(idea.fecha_aceptado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

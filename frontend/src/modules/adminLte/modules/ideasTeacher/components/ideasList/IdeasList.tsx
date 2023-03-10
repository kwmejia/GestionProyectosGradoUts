import React from 'react'
import { ItemIdeaTeacher } from './components/itemIdeaTeacher/ItemIdeaTeacher'
import { useEffect, useContext, useState } from 'react';
import { useIdeasTeacher } from '../../../../../../hooks/';
import { AuthContext } from '../../../../../../context/AuthContext';
import iconSrc from "../../../../../../assets/img/iconSad.png";

export const IdeasList = () => {

  const [updateComponent, setUpdateComponent] = useState(false);
  const { user } = useContext(AuthContext);
  const { getIdeasTeacher, ideasTeacher } = useIdeasTeacher();

  useEffect(() => {
    onMountedComponent();
  }, [user, updateComponent]);

  const handleUpdateComponent = () => setUpdateComponent(!updateComponent);

  const onMountedComponent = async () => {
    if (user?.email) await getIdeasTeacher(user?.email);
  }

  return (
    <div className="ideas-list-container fadeIn px-5">
      <h3 className="text-second">Mis ideas</h3>

      {ideasTeacher.map((idea, index) => (
        <ItemIdeaTeacher
          key={index}
          idea={idea}
          index={index + 1}
          updateComponent={handleUpdateComponent}
        />
      ))}

      {
        !ideasTeacher.length && (
          <>
            <div className="d-flex w-100 gap-3 flex-column justify-content-center align-items-center">
              <h4 style={{color: '#777777'}}>No tienes ideas</h4>
              <img src={iconSrc} alt="img" width={100} />
            </div>
          </>
        )

      }

    </div>
  )
}

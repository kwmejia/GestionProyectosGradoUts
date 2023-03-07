import React from 'react'
import { ItemIdeaTeacher } from './components/itemIdeaTeacher/ItemIdeaTeacher'

export const IdeasList = () => {
  return (
    <div className="ideas-list-container fadeIn px-5">
      <h3>Mis ideas</h3>
      <ItemIdeaTeacher />

    </div>
  )
}

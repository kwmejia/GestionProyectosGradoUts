import './lineTimeProgress.scss#c3d730';
import { useEffect } from 'react';
import { useIdeasTaken } from '../../../../../../../../hooks/useIdeasTaken';


interface PropsLineTimeProgress {
  approved: boolean | undefined;
  taken: boolean;
}

export const LineTimeProgress = ({ approved, taken }: PropsLineTimeProgress) => {



  return (
    <div
      className="line-time d-flex w-75 justify-content-between align-items-center"
    >
      <div className="line" style={taken ? { width: '100%' } : { width: '50%' }}></div>
      <div className="circle activeTime">
        <span>Propuesta</span>
      </div>

      <div className={approved ? "activeTime circle" : "circle"}>
        <span>Aprobada</span>
      </div>

      <div className={taken ? "activeTime circle" : "circle"}>
        <span>Tomada</span>
      </div>
    </div>
  )
}

import './lineTimeProgress.scss#c3d730';


interface PropsLineTimeProgress {
  approved: boolean | undefined;
}

export const LineTimeProgress = ({ approved }: PropsLineTimeProgress) => {
  return (
    <div
      className="line-time d-flex w-75 justify-content-between align-items-center"
    >
      <div className="line" style={{ width: '50%' }}></div>
      <div className="circle activeTime">
        <span>Propuesta</span>
      </div>

      <div className={approved ? "activeTime circle" : "circle"}>
        <span>Aprovada</span>
      </div>

      <div className="circle">
        <span>Tomada</span>
      </div>
    </div>
  )
}

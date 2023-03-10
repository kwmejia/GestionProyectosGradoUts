import './iconburger.scss';
import { useState } from 'react';

interface PropsBurger {
  action: () => any;
}

export const IconBurger = ({ action }: PropsBurger) => {
  const [active, setActive] = useState<boolean>(false);

  const handleClickBurger = () => {
    setActive(!active)
    action();
  }
  return (

    <div
      className="icon-cont"
      onClick={handleClickBurger}
    >
      <span className={active ? 'active' : ''}></span>
      <span className={active ? 'active' : ''}></span>
      <span className={active ? 'active' : ''}></span>
    </div>

  )
}


import { useEffect, useState } from 'react';
import './cardMetric.scss';


interface ICardMetric {
  value: number;
  title: string;
  children: JSX.Element
}

export const CardMetric =
  ({ value, title, children }: ICardMetric): JSX.Element => {

    const [valueCard, setValueCard] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
      onMounted();
    }, [valueCard, value])

    const onMounted = (): void => {
      setTimeout(() => {
        if (valueCard < value) {
          setValueCard(valueCard + 1);
          setIsLoading(true);
        };
      }, 50)
      if (value === valueCard) setIsLoading(false)
    }

    return (
      <div className="col col-lg-3 my-2 my-xxl-0 px-4">
        <div
          className="cont-card d-flex flex-column justify-content-center align-items-center gap-1 p-3"
        >
          <div className="d-flex justify-content-center align-items-end gap-2">
            <p
              className={isLoading ? 'text-normal' : 'text-animation'}
            >
              {valueCard}
            </p>
            {children}
          </div>
          <h2>{title}</h2>
        </div>
      </div>
    )
  }

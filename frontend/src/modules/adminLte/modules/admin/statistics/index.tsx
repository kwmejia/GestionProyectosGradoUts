import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLightbulb,
  faCheckCircle,
  faBox,
  faMoneyBill1Wave,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons'
import ColumnChart from "./components/ColumnChart";
import { Metrics } from "./components/Metrics";
import './statistics.scss'
import { CardMetric } from './components/cardMetric/CardMetric';
import { useMetrics } from '../../../../../hooks/useMetrics';
import { AuthContext } from '../../../../../context';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../../../../interfaces/enumRoles';

interface IMetricsList {
  children: IconDefinition;
  title: string;
  value: number;
}

const Statistics = (): JSX.Element => {

  const { getMetricsIdeas, metrics } = useMetrics();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const listMetrics: IMetricsList[] = [
    { children: faLightbulb, title: "Número de ideas", value: metrics?.numIdeas as number || 0 },
    { children: faCheckCircle, title: "Ideas Aprobadas", value: metrics?.numIdeasApproved as number || 0 },
    { children: faBox, title: "Ideas Tomadas", value: metrics?.numIdeasTaken as number || 0 },
    { children: faMoneyBill1Wave, title: "Ideas compradas", value: metrics?.numIdeasPay as number || 0 },
  ]
  useEffect(() => {
    if (user?.rol == Roles.TEACHER) {
      navigate("/mis-ideas");
    }

    if (user?.rol == Roles.STUDENT) {
      navigate("/");
    }
    onMounted();
  }, [user]);

  const onMounted = async () => {
    await getMetricsIdeas();
  }

  return (
    <section className="statistics-cont fadeIn w-100 m-5">
      <h1 className="text-center w-100">Estadisticas</h1>
      <div className="row my-4">
        {listMetrics.map((metric, index) => (
          <CardMetric
            key={index}
            title={metric.title}
            value={metric.value}
            children={<FontAwesomeIcon
              icon={metric.children}
            />}
          />
        ))}
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-4 col-xxl-6">
          <Metrics />
        </div>
        <div className="col-8 col-xxl-6">
          <ColumnChart />
        </div>
      </div>
    </section>
  )
}

export default Statistics;
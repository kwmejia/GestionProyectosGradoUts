import { useState } from "react";
import clientHTTP from "../api/configAxios"
import { IMetricsNum } from "../interfaces/interfacesEndPoints";

interface IuseMetrics {
  metrics: IMetricsNum | undefined;
  getMetricsIdeas: () => Promise<void>
}

export const useMetrics = (): IuseMetrics => {
  const [metrics, setMetrics] = useState<IMetricsNum>();

  const getMetricsIdeas =
    async (): Promise<void> => {
      try {
        const promises = await Promise.all([
          await clientHTTP.get(`numIdeasTaken`),
          await clientHTTP.get(`numIdeas`),
          await clientHTTP.get(`numIdeasApproved`),
          await clientHTTP.get(`numIdeasPay`),
        ]);

        setMetrics({
          numIdeasTaken: promises[0].data.ideas_tomadas || 0,
          numIdeas: promises[1].data.ideas || 0,
          numIdeasApproved: promises[2].data.ideas_aprobadas || 0,
          numIdeasPay: promises[3].data.ideas_compradas || 0
        })
      } catch (error) {
        console.log(error)
      }
    }

  return {
    metrics,
    getMetricsIdeas
  }

}

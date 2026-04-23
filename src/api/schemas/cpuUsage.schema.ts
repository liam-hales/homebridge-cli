import { z } from 'zod';

/**
 * The schema used to describe and transform the CPU usage data
 * returned from the `GET /api/status/cpu` endpoint
 */
const cpuUsageSchema = z
  .object({
    currentLoad: z.number(),
    cpuTemperature: z.object({
      main: z.number(),
      max: z.number(),
    }),
  })
  .transform((data) => {
    const { currentLoad, cpuTemperature } = data;
    return {
      currentLoad: Math.round(currentLoad * 10) / 10,
      currentTemp: Math.round(cpuTemperature.main * 10) / 10,
      maxTemp: Math.round(cpuTemperature.max * 10) / 10,
    };
  });

export default cpuUsageSchema;

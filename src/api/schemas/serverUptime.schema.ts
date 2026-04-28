import { z } from 'zod';
import date from '../../date.js';

/**
 * The schema used to describe and transform the server uptime data
 * returned from the `GET /api/status/uptime` endpoint
 */
const serverUptimeSchema = z
  .object({
    time: z.object({
      current: z.number(),
      uptime: z.number(),
    }),
    processUptime: z.number(),
  })
  .transform((data) => {
    const { processUptime, time } = data;
    return {
      current: date.utc(time.current),
      server: time.uptime,
      process: processUptime,
    };
  });

export default serverUptimeSchema;

import { z } from 'zod';

/**
 * The schema used to describe and transform the server network overview
 * data returned from the `GET /api/server/network/overview` endpoint
 */
const serverNetworkOverviewSchema = z.object({
  entries: z.array(
    z.object({
      service: z.string(),
      port: z.number(),
      protocol: z.string(),
      bridge: z.string(),
      status: z.string(),
    }),
  ),
  conflicts: z.array(z.unknown()),
});

export default serverNetworkOverviewSchema;

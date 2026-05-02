import { z } from 'zod';

/**
 * The schema used to describe and transform the child bridge data
 * returned from the `GET /api/status/homebridge/child-bridges` endpoint
 */
const childBridgeSchema = z.object({
  name: z.string(),
  plugin: z.string(),
  identifier: z.string(),
  status: z.string(),
  username: z.string(),
  pin: z.string(),
  paired: z.boolean(),
  port: z.number(),
  pid: z.number(),
});

export default childBridgeSchema;

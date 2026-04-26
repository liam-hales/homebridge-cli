import { z } from 'zod';

/**
 * The schema used to describe and transform the child bridges data
 * returned from the `GET /api/status/homebridge/child-bridges` endpoint
 */
const childBridgesSchema = z.object({
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

export default childBridgesSchema;

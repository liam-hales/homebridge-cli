import { z } from 'zod';

/**
 * The schema used to describe the Node.js info data
 * returned from the `GET /api/status/nodejs` endpoint
 */
const nodejsInfoSchema = z.object({
  currentVersion: z.string(),
  latestVersion: z.string(),
  installPath: z.string(),
  npmVersion: z.string(),
});

export default nodejsInfoSchema;

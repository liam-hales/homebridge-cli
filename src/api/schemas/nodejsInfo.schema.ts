import { z } from 'zod';

/**
 * The schema used to describe the Node.js info data
 * returned from the `GET /api/status/nodejs` endpoint
 */
const nodejsInfoSchema = z
  .object({
    currentVersion: z.string(),
    latestVersion: z.string(),
    npmVersion: z.string(),
    updateAvailable: z.boolean(),
    installPath: z.string(),
    architecture: z.string(),
  })
  .transform((data) => {
    return {
      current: data.currentVersion,
      latest: data.latestVersion,
      npm: data.npmVersion,
      updateAvailable: data.updateAvailable,
      installPath: data.installPath,
      architecture: data.architecture,
    };
  });

export default nodejsInfoSchema;

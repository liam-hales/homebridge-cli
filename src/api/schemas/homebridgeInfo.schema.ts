import { z } from 'zod';

/**
 * The schema used to describe the Homebridge info data
 * returned from the `GET /api/status/homebridge-version` endpoint
 */
const homebridgeInfoSchema = z
  .object({
    installedVersion: z.string(),
    latestVersion: z.string(),
    updateAvailable: z.boolean(),
    installPath: z.string(),
  })
  .transform((data) => {
    return {
      current: data.installedVersion,
      latest: data.latestVersion,
      updateAvailable: data.updateAvailable,
      installPath: data.installPath,
    };
  });

export default homebridgeInfoSchema;

import { z } from 'zod';

/**
 * The schema used to describe and transform the installed plugin data
 * returned from the `GET /api/plugins` endpoint
 */
const installedPluginSchema = z
  .object({
    name: z.string(),
    displayName: z.string(),
    author: z.string(),
    installedVersion: z.string(),
    latestVersion: z.string(),
    updateAvailable: z.boolean(),
    verifiedPlugin: z.boolean(),
    verifiedPlusPlugin: z.boolean(),
  })
  .transform((data) => {
    return {
      name: data.name,
      displayName: data.displayName,
      author: data.author,
      current: `v${data.installedVersion}`,
      latest: `v${data.latestVersion}`,
      updateAvailable: data.updateAvailable,
      verified: data.verifiedPlugin,
      verifiedPlus: data.verifiedPlusPlugin,
    };
  });

export default installedPluginSchema;

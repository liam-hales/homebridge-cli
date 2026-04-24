import { z } from 'zod';

/**
 * The schema used to describe and transform the installed plugin data
 * returned from the `GET /api/plugins` endpoint
 */
const installedPluginsSchema = z
  .object({
    name: z.string(),
    displayName: z.string(),
    author: z.string(),
    verifiedPlugin: z.boolean(),
    verifiedPlusPlugin: z.boolean(),
    installedVersion: z.string(),
    installPath: z.string(),
    updateAvailable: z.boolean(),
    latestVersion: z.string(),
  })
  .transform((data) => {
    return {
      name: data.name,
      displayName: data.displayName,
      author: data.author,
      installed: data.installedVersion,
      latest: data.latestVersion,
      updateAvailable: data.updateAvailable,
      verified: data.verifiedPlugin,
      verifiedPlus: data.verifiedPlusPlugin,
    };
  });

export default installedPluginsSchema;

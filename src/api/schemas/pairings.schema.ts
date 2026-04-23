/* eslint-disable @typescript-eslint/naming-convention */

import { z } from 'zod';

/**
 * The schema used to describe and transform the pairings data
 * returned from the `GET /api/server/pairings` endpoint
 */
const pairingsSchema = z
  .object({
    name: z.string(),
    displayName: z.string(),
    pincode: z.string(),
    _id: z.string(),
    _username: z.string(),
    _category: z.string(),
    _main: z.boolean(),
    _isPaired: z.boolean(),
  })
  .transform((data) => {
    return {
      id: data._id,
      name: data.name,
      displayName: data.displayName,
      username: data._username,
      category: data._category,
      setupCode: data.pincode,
      primary: data._main,
      paired: data._isPaired,
    };
  });

export default pairingsSchema;

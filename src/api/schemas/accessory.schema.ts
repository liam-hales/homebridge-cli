import { z } from 'zod';

/**
 * The schema used to describe and transform the accessory
 * data returned from the `GET /api/accessories` endpoint
 */
const accessorySchema = z
  .object({
    uniqueId: z.string(),
    serviceName: z.string(),
    type: z.string(),
  })
  .transform((data) => {
    return {
      id: data.uniqueId,
      name: data.serviceName,
      type: data.type,
    };
  });

export default accessorySchema;

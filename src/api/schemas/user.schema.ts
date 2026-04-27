import { z } from 'zod';

/**
 * The schema used to describe and transform the user data
 * returned from the `GET /api/users` endpoint
 */
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  admin: z.boolean(),
});

export default userSchema;

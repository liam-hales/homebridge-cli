/* eslint-disable @typescript-eslint/naming-convention */

import { z } from 'zod';

/**
 * The schema used to describe and transform the login response
 * returned from the `POST /api/auth/login` endpoint
 */
const loginSchema = z
  .object({
    access_token: z.string(),
  })
  .transform((data) => {
    return {
      accessToken: data.access_token,
    };
  });

export default loginSchema;

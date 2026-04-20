import { z } from 'zod';

/**
 * The schema used to describe and transform the memory usage data
 * returned from the `GET /api/status/ram` endpoint
 */
const memoryUsageSchema = z
  .object({
    mem: z.object({
      total: z.number(),
      available: z.number(),
      free: z.number(),
      used: z.number(),
      active: z.number(),
    }),
  })
  .transform((data) => {
    const { mem } = data;

    /**
     * Used to convert bytes
     * to gigabytes (GB)
     *
     * @param bytes The bytes to convert
     * @returns The value in gigabytes (GB)
     */
    const _toGig = (bytes: number): number => {
      const gig = bytes / (1024 * 1024 * 1024);
      return Math.round(gig * 10) / 10;
    };

    return {
      total: _toGig(mem.total),
      available: _toGig(mem.available),
      free: _toGig(mem.free),
      used: _toGig(mem.used),
      active: _toGig(mem.active),
    };
  });

export default memoryUsageSchema;

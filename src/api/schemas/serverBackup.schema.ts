import { z } from 'zod';
import date from '../../date.js';

/**
 * The schema used to describe and transform the server backup data
 * returned from the `GET /api/backup/scheduled-backups` endpoint
 */
const serverBackupSchema = z
  .object({
    id: z.string(),
    instanceId: z.string(),
    timestamp: z.iso.datetime(),
    fileName: z.string(),
  })
  .transform((data) => {
    return {
      id: data.id,
      instanceId: data.instanceId,
      fileName: data.fileName,
      datetime: date.utc(data.timestamp),
    };
  });

export default serverBackupSchema;

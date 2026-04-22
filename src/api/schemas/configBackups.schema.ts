import { z } from 'zod';
import date from '../../date.js';

/**
 * The schema used to describe and transform the config backups data
 * returned from the `GET /api/config-editor/backups` endpoint
 */
const configBackupsSchema = z
  .object({
    id: z.string(),
    timestamp: z.iso.datetime(),
    file: z.string(),
  })
  .transform((data) => {
    return {
      id: data.id,
      fileName: data.file,
      datetime: date.utc(data.timestamp),
    };
  });

export default configBackupsSchema;

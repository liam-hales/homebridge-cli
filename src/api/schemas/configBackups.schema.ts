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
      date: date
        .utc(data.timestamp)
        .format('DD MMM YYYY'),
      time: date
        .utc(data.timestamp)
        .format('HH:mm'),
      relative: date
        .utc(data.timestamp)
        .fromNow(),
    };
  });

export default configBackupsSchema;

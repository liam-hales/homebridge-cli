import dayjs, { type Dayjs as Date } from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';

// Configure Day.js to use the UTC,
// timezone and relative time plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

/**
 * Used to check if a given
 * value is a `Date` object
 *
 * @param value The value to check
 */
const isDate = (value: unknown): value is Date => {
  return dayjs.isDayjs(value);
};

export default dayjs;
export {
  Date,
  isDate,
};

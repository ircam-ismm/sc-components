import equal from 'fast-deep-equal';
import { isPlainObject } from '@ircam/sc-utils';

/**
 * If object check that we have the same key value pairs even in different order
 * If Array check that we have the same values even in different order
 */
export default function isSameOptions(oldOptions, newOptions) {
  if (
    (isPlainObject(newOptions) && equal(newOptions, oldOptions))
    || (Array.isArray(newOptions) && newOptions.slice(0).sort().join(',') === oldOptions.slice(0).sort().join(','))
  ) {
    return true;
  }

  return false;
}

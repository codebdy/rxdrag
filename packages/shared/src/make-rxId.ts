import _ from 'lodash';

export function makeRxId() {
  return 'rx-' + _.uniqueId();
}

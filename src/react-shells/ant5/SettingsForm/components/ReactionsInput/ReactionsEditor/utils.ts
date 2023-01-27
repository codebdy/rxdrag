import { v4 as uuidv4 } from 'uuid';

export const createUuid = () => {
  return uuidv4();
};

export const MIN_ZOOM = 0.3;
export const MAX_ZOOM = 5;
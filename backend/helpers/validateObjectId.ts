import { isValidObjectId } from 'mongoose';

const validateObjectId = (id: string) => {
  if (isValidObjectId(id)) return true;

  return false;
};

export default validateObjectId;

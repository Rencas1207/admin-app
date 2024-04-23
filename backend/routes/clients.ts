import express from 'express';
import {
  getAll,
  create,
  getById,
  update,
  getByDocument,
} from '../controllers/clients';
import { validateUser } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { ClientCreationSchema } from '../schemas/clients';

const router = express.Router();

router.use(validateUser());

router.get('/', getAll);
router.get('/:id', getById);
router.get('/document/:document', getByDocument);
router.post('/', validateRequest(ClientCreationSchema), create);
router.put('/:id', update);

export default router;

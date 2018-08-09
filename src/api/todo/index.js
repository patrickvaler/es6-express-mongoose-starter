import express from 'express';
import ctrl from './todo.ctrl';

const router = express.Router();

router
  .route('/todo')

  // GET /api/v1/todo - Get list of todos
  .get(ctrl.getAll)

  // POST /api/v1/todo - Create new todo
  .post(ctrl.create);

router
  .route('/todo/:id')

  // DELETE /api/v1/todo/:id - Delete todo
  .delete(ctrl.remove)

  // PUT /api/v1/todo/:id - Update todo
  .put(ctrl.update);

export default router;

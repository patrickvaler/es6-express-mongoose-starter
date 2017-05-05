import express from 'express';
import ctrl from './todo.ctrl';

const router = express.Router();

router.route('/todo')
    .get(ctrl.getAll)
    .post(ctrl.create);

router.route('/todo/:id')
    .delete(ctrl.remove)
    .put(ctrl.update);

export default router;

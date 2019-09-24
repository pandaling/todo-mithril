import express from 'express';
import db from '../../sequelize/models';

export default app => {
  const router = express.Router();
  const { Task } = db;

  router.post('/create', (req, res) => {
    Task.create(req.body)
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error));
  });

  router.get('/findAll', (req, res) => {
    Task.findAll()
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  router.put('/update/:id', (req, res) => {
    Task.update(req.body, { where: { taskId: req.params.id } })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  app.use('/task', router);
};

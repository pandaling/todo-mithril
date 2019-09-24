import express from 'express';
import db from '../../sequelize/models';

export default app => {
  const router = express.Router();
  const { User, Task } = db;

  router.post('/create', (req, res) => {
    User.create(req.body)
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error));
  });

  router.get('/findAll', (req, res) => {
    User.findAll({ include: [{ model: Task, as: 'tasks' }] })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  router.post('/findOne', (req, res) => {
    let queryString = '';
    if (req.body.include) {
      queryString = {
        where: req.body.where,
        include: [{ model: Task, as: req.body.include.toLowerCase() + 's' }] }
    }

    User.findOne(queryString)
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  router.put('/update/:id', (req, res) => {
    User.update(req.body, { where: { userId: req.params.id } })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  router.delete('/delete/:id', (req, res) => {
    User.destroy({ where: { userId: req.params.id } })
      .then(results => res.status(200).send(results))
      .catch(error => res.status(500).send(error));
  });

  app.use('/user', router);
};

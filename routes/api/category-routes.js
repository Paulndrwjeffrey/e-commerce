const router = require('express').Router();
const { json } = require('sequelize/types');
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll(
    {
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  .then(data => res.json(data))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['category_id']
      }
    })
    .then(data => res.json(data))
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(data => res.json(data))
  .catch(error => {
    res.status(500).json(error)
  })
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }).then(data => res.json(data))
    .catch(error => {
      res.status(500).json(error)
    })
  });

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    }).then(data => res.json(data))
    .catch(error => {
      res.status(500).json(error)
    })
  });

module.exports = router;

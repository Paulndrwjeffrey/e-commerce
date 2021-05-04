const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({ include: { model: Product }}).then(data => res.json(data)).catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: {
        id: req.params.id
      }
    },
    {
      include: {
        model: Product
      }
    }).then(data => res.json(data))
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
  });

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => res.json(data))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => res.json(data))
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  });
});

module.exports = router;

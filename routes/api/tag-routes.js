const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
 
       attributes: ['id', 'tag_name'],
       include:[
         {
           model: Product,
         attributes:['id', 'product_name', 'price', 'stock', 'category_id']
       },
     ],
     });
 
     res.status(200).json(tagData);
   } catch (err) {
     console.log(err);
     res.status(500).json(err);
   }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
     where: {
       id: req.params.id,
     },
     attributes: ['id', 'tag_name'],
     include: [
       {
         model: Product,
         attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
     },
   ],
 });
     if (!tagData) {
     res.status(404).json({message: 'No tag found with that id'});
     return;
   }
   res.json(tagData);
 } catch (err) {
   console.log(err);
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;

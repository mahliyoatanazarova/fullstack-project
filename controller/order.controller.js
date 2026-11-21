const Cart = require('../model/cart.model');
const Product = require('../model/products.model');
const Order = require('../model/order.model');

const addOrder = async (req, res) => {
  const { address, phone } = req.body;

  if (!address || !phone) {
    return res.status(400).json({ message: 'address, phone are required' });
  }

  let cart = await Cart.findOne({ user: req.user.id }).populate(
    'items.product',
  );

  for (const item of cart.items) {
    if (item.product.inStock < item.quantity) {
      return res
        .status(400)
        .json({
          message: 'Faqat ' + item.product.inStock + ' ta mahsulot bor',
        });
    }
  }

  let items = cart.items.map((item) => ({
    product: item.product._id,
    title: item.product.title,
    price: item.product.price,
    image: item.product.image,
    quantity: item.quantity,
  }));

  
  let totalPrice = items.reduce((a, b) => a + b.quantity * b.price, 0)
  
  await Order.create({user: req.user.id, items, address, phone, totalPrice})

  for (const item of cart.items) {
    await Product.updateOne({_id: item.product._id}, {$inc: {inStock: -item.quantity}})
  }

  cart.items = []
  await cart.save()
  res.json({message: "Mahsulotga buyurtma berildi"})
};

module.exports = {
  addOrder,
};

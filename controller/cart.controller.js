const cartModel = require("../model/cart.model")
const productModel = require("../model/product.model")

const sendCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product")



  res.json(cart || { user: req.user.id, items: [] })
}


const addCart = async (req, res) => {
  const { productId, quantity } = req.body

  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: "Mahsulot soni 1 dan katta yoki butun sonn bo'lishi kerak" })
  }


  if (quantity < 1) {
    return res.status(400).json({
      message: "Mahsulot soni bittadan kam bolmasin!"
    })
  }

  const foundProduct = await productId.findById(productId)

  if (!foundProduct) {
    return res.status(400).json({
      message: "Mahsulot topilmadi"
    })
  }


  let cart = await Cart.findOne({ user: req.user.id })
  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] })
  }



  const foundItem = cart.items.find((element) => element.product.toString() === productId)
  const newQuantity = (foundItem ? foundItem.quantity : 0) + quantity




  if (newQuantity > foundProduct.inStock) {
    return res.status(400).json({
      message: "Faqat" + foundProduct.inStock + "ta mahsulot bor"
    })
  }
  if (foundItem) foundItem.quantity = newQuantity
  else cart.items.push({ productId, quantity })

  await cart.save()
  await sendCart(req, res)


}

const updateCart = async (req, res) => {
  const { quantity } = req.body
  const { productId } = req.params



  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: "Mahsulot soni 1 dan katta yoki butun sonn bo'lishi kerak" })
  }
  let cart = await Cart.findOne({ user: req.user.id });
  const foundItem = cart.items.find((element) => element.product.equals(productId))

  if (!foundItem){
     return res.status(400).json({ message: "Savatda bunday mahsulot yo'q" })
  }

const product =await Product.findById(foundItem.product)


if (quantity > product.inStock){
  return res.status(400).json({
      message: "Faqat" + product.inStock + "ta mahsulot bor"
    })
}

foundItem.quantity= quantity
await cart.save()
await sendCart(req,res)
}

const removeFromCart = async (req,res)=>{
  const {productId}=req.params

  await Cart.updateOne(
    {user:req.user.id},
    {$pull:{items:{product:productId}}}
  )
  await sendCart(req,res)
}

const clearCart = async (req,res)=>{
await Cart.updateOne(
    {user:req.user.id},
    {items:[]}
  )
  await sendCart(req,res)
}





module.exports = {
  sendCart,
  addCart,
  updateCart,
  removeFromCart,
  clearCart
}
const productModel = require("../model/product.model")

const sendCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product")



  res.json(cart || { user: req.user.id, items: [] })
}


const addCart = async (req, res) => {
  const { productId, quantity } = req.body


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


  let cart = await Cart.findOne({user:req.user.id})
  if (!cart) { 
    cart = new Cart({ user: req.user.id, items: [] })
  }






    if (cart.items.length === 0){
   cart.items.push({ product: foundProduct, quantity });
  await cart.save()
   await sendCart(req, res);
   return
    }


    const foundItem = cart.items.find((element)=>element.product.toString() === productId)


    if (!foundItem){
cart.items.push({ product: foundProduct, quantity });
  await cart.save()
   return res.json({message:"Mahsulot savatga qo'shildi"})
    }else{
      return res.status(400).json({
      message: "Mahsulot allaqachon mavjud"
    })
    }
}



module.exports = {
  sendCart,
  addCart
}
import userModel from "../users/userModel.js"

const update = async (req, res, next) => {
  const { product, operation } = req.body
  try {
    // TODO: just use req.user
    // Find user in db
    // const user = await userModel.findOne({ _id })
    // Get user cart
    let newCart = [ ...req.user.cart ]
    console.log("newCart", newCart)

    // Add item
    if (operation === "increment") {
      // Is item in cart
      const itemInCart = req.user.cart.filter(item => item.id === product.id)
      // Item not in cart already
      if (itemInCart.length === 0) {
        console.log("itemInCart.length === 0")
        // Add quantity property to item and add to cart
        newCart.push({ ...product, quantity: 1 })
      }
      // Item is in cart already
      else {
        // Update the quantity
        newCart = newCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
    }

    // Remove item
    else if (operation === "decrement") {
      // Is item in cart
      const itemInCart = req.user.cart.filter(item => item.id === product.id)
      console.log("itemInCart", itemInCart, itemInCart[0])
      // Item in cart
      if (itemInCart.length > 0) {
        console.log("itemInCart.length > 0")
        // If quantity > 1
        if (itemInCart[0].quantity > 1) {
          // Remove 1 quantity on item
          newCart = newCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)
        }
        else {
          newCart = newCart.filter(item => item.id !== product.id)
        }
      }
      // TODO: If item is not in cart lol
    }
      
    // Update db
    console.log("req.user._id", req.user._id)
    const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { cart: newCart }, { returnDocument: "after" })
    console.log("user", user)

    res.status(200).json({ success: true, user: { firstName: user.firstName, lastName: user.lastName, email: user.email, username: user.username, roles: user.roles, cart: user.cart } })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: "There was an error." })
  }
}

export default update
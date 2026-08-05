export let cart = JSON.parse(localStorage.getItem('cart'))
if(!cart){
    cart =[{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryOptionId :'1'
},
{
    productId :'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1,
    deliveryOptionId:'2'
}

]
}


export function addToCart(productId) {

  const cartItem = cart.find((item) => {
    return item.productId === productId;
  });

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId:'1'
    });
  }
  saveToLocal()
}


export function removeFromCart(prodid){
    const newCart =[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== prodid){
            newCart.push(cartItem)
        }
    })
    cart = newCart
    saveToLocal();
}

function saveToLocal(){
    localStorage.setItem('cart',JSON.stringify(cart))
}

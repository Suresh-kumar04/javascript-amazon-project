  import{cart,removeFromCart} from '../data/cart.js'
  import { products } from '../data/products.js';
  import { formatCurrancy } from './utils/money.js';
  import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
  import {deliveryOption} from '../data/deliveryData.js'
  const today = dayjs();
  const deliverydate =today.add(7,'days')
  let format =deliverydate.format('dddd ,MMMM D');
  console.log(format)
  let cartSummary ='';
  cart.forEach((cartItem)=>{

      const productid = cartItem.productId;

      let matchingProduct ;
      products.forEach((product)=>{
          if(product.id === productid){
              matchingProduct = product
          }
      })
      // console.log(matchingProduct);
      const deliveryOptionID = cartItem.deliveryOptionId;
      let deliveryOp;
      deliveryOption.forEach((option)=>{
        if(option.id===deliveryOptionID){
          deliveryOp =option;
        }
      })
      const today =dayjs()
      const deliverDate = today.add(deliveryOp.deliveryDays, 'days');
    const dateString = deliverDate.format('dddd, MMMM D');
   
        

      cartSummary+=
      `
              <div class="cart-item-container js-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${formatCurrancy(matchingProduct.pricePaise)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>
                ${deliveryOptionsHtml(matchingProduct,cartItem)}
                </div>
                </div>
                
      `
  })
  function deliveryOptionsHtml(matchingProduct,cartItem) {
  let html = `
    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
  `;

  const today = dayjs();

  deliveryOption.forEach((option) => {
    const deliverDate = today.add(option.deliveryDays, 'days');
    const dateString = deliverDate.format('dddd, MMMM D');
    const priceString =
      option.pricePaise === 0
        ? 'Free'
        : `${formatCurrancy(option.pricePaise)} -`;
        const isChecked =option.id ===cartItem.deliveryOptionId ;


    html += `
      <div class="delivery-option">
        <input
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
          ${isChecked?'checked':''}
        >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;

  return html;
}
  document.querySelector('.js-order').innerHTML=cartSummary;
  console.log(cartSummary)
  document.querySelectorAll('.js-delete').forEach((link)=>{
      link.addEventListener('click',()=>{
          const prodId =link.dataset.productId;
          removeFromCart(prodId)
          console.log(cart)

          const con = document.querySelector(
              `.js-container-${prodId}`
          )
          // console.log(con)
          con.remove();
      })
  })
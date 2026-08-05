import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryData.js";
import { formatCurrancy } from "../utils/money.js";
export function renderPayment(){
    let price =0;
    let shippingPrice=0
    cart.forEach(item => {
        const matchinProduct =getProduct(item.productId);
        price +=matchinProduct.pricePaise*item.quantity

    const deliveryoption =getDeliveryOption(item.deliveryOptionId)
    shippingPrice+=deliveryoption.pricePaise

    });
   const totalBeforeTax =price+shippingPrice;

   const taxPrice =totalBeforeTax*0.18;
   const totalPaise = totalBeforeTax + taxPrice;

   const paymentSummaryHtml =`
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrancy(price)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrancy(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (18%):</div>
            <div class="payment-summary-money">$${formatCurrancy(taxPrice)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrancy(totalPaise)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
   `
   document.querySelector('.js-payment-summary  ').innerHTML=paymentSummaryHtml;
   
}

export const deliveryOption =[{
    id:'1',
    deliveryDays:7,
    pricePaise:0
},{
    id:'2',
    deliveryDays:3,
    pricePaise:499
},{
    id:'3',
    deliveryDays:1,
    pricePaise:900
}
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOp;
          deliveryOption.forEach((option)=>{
            if(option.id===deliveryOptionId){
              deliveryOp =option;
            }
          })
          return deliveryOp || deliveryOption[0];
}
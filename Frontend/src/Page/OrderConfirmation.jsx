import React from 'react'
const checkout = {
    _id:"4563",
    createdAt:new Date(),
    checkoutItem:[
        {
        productId:1,
      name: "Stylish Jacket",
      size: "M",
      Color: "Black",
      price: 120,
      quanity:2,
      image: "https://picsum.photos/200?random=10",
    },
    {
        productId:2,
      name: "Stylish Jacket",
      size: "L",
      Color: "White",
      price: 150,
      quanity:2,
      image: "https://picsum.photos/200?random=11",
    },
    {
        productId:3,
      name: "Stylish Jacket",
      size: "M",
      Color: "Black",
      price: 120,
      quanity:2,
      image: "https://picsum.photos/200?random=12",
    },
    {
        productId:4,
      name: "Stylish Jacket",
      size: "L",
      Color: "White",
      price: 150,
      quanity:2,
      image: "https://picsum.photos/200?random=13",
    },
    ],
    shippingAddress:{
        address:"Saidpur",
        city:"ghazipur",
        pin:233304,
        country:"India"
    },
};


function OrderConfirmation() {

    const calcEstimatedDelivery = (createdAt) =>{
        const ordrDate = new Date (createdAt);
        ordrDate.setDate(ordrDate.getDate()+10);
        return ordrDate.toLocaleDateString()
    }

  return (
    <div className=' max-w-4xl mx-auto p-6  '>
        <h1 className=' text-4xl font-bold text-center text-emerald-700 mb-8'>
            Thanks You For Your Order
        </h1>
        <h1>
            {checkout&&(<div className=' p-6 rounded-lg border'>
                <div className=' flex justify-between mb-20'>
                     {/* Order Id And Date  */}
                     <div className='space-y-2'>
                        <h2 className=' text-xl font-semibold'> Order ID :{checkout._id}</h2>
                        <p className=' text-gray-500'>
                            Order Date :{new Date(checkout.createdAt). toLocaleDateString()}
                        </p>

                     </div>
                     {/* Estimeted Delivery  */}
                     <div>
                        <p className=' text-emerald-700 text-sm' >Estimated Deleivery : {calcEstimatedDelivery(checkout.createdAt ) }</p>
                     </div>
                </div>
                <div className='mb-20 '>{checkout.checkoutItem.map((item)=> (<div key={item.productId} className=' flex items-center mb-4'>
                    <img src={item.image} alt={item.name} className=' w-16 h-16 object-cover rounded-md mr-4' />
                    <div>
                        <h4 className=' text-md font-semibold'>{item.name}</h4>
                        <p className=' text-gray-500 text-sm'>{item.Color} | {item.size}</p>
                    </div>
                    <div className=' ml-auto text-right'>
                        <p className='text-md'>${item.price}</p>
                        <p className='text-sm text-gray-500'>Qty:{item.quanity}</p>
                    </div>
                </div>))}</div>
                {/* payment &  Delivery info */}
                    <div className=' grid grid-cols-2 gap-8 '>
                        <div>
                            <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                            <p>Cash On Delivery </p>
                        </div>
                        <div className='gap-5'>
                            <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                            <p>{checkout.shippingAddress.address}{", "}{checkout.shippingAddress.city}{", "}{checkout.shippingAddress.pin}</p>
                        </div>
                    </div>
            </div>)}
        </h1>
    </div>
  )
}

export default OrderConfirmation  
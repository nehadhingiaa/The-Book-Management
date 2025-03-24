import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../Buyer/BuyerCart/Slices/PlaceOrdersSlice";
import {
  MdDelete,
  MdOutlineEdit,
  MdOutlineStarBorderPurple500,
} from "react-icons/md";
import { GrView } from "react-icons/gr";

const SellerOrderComponent = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  console.log(orders, "orders history");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(fetchOrder());
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full max-w-screen bg-purple-100 p-5">
      

      <div className="text-4xl font-semibold">
        <h1 className="text-5xl">Orders History</h1>
      </div>
      <table className="w-full border-collapse border border-gray-300 mt-5 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700 uppercase text-md tracking-wider">
          <tr className="h-14">
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Total Books</th>
            <th className="px-6 py-3 text-left">Total Price</th>
            <th className="px-6 py-3 text-left">Cart Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`border-b border-gray-200 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100 transition-all`}
            >
              <td className="px-6 py-4 text-gray-700 font-medium">
                {order.id}
              </td>
              <td className="px-6 py-4 text-gray-700 font-medium">
                {order.customer}
              </td>
              <td className="px-6 py-4 text-gray-700">{order.totalBooks}</td>
              <td className="px-6 py-4 text-green-600 font-semibold">
                ₹ {order.totalPrice}
              </td>
            
              <td className="px-6 py-4">
                <div className="space-y-3">
                  {order.cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition mt-3"
                    >
                      <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      <div>
                     
                        <h3 className="font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Author: {item.author}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                       
                        {/* <button className="mt-1 text-blue-500 hover:text-blue-700 transition">
                          <GrView size={18} />
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    //     <div className='min-h-screen w-full max-w-screen bg-purple-100 p-20'>
    //            <h1 className='mt-10'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum aut  rem ipsum
    //              dolor sit amet consectetur adipisicing elit. Doloremque eumpariatur iste magni in ab
    //              exercitationem dolores vel illo consequatur? rem,delectus id officia nobis expedita accusamus iusto deserunt accusantium!
    //             </h1>
    //             <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum aut  rem ipsum
    //              dolor sit amet consectetur adipisicing elit. Doloremque eumpariatur iste magni in ab
    //              exercitationem dolores vel illo consequatur? rem,delectus id officia nobis expedita accusamus iusto deserunt accusantium!
    //             </h1>

    //         <div className='text-4xl font-semibold'><h1>Orders History</h1></div>

    //             {/* {orders.map((order) => (
    //               <div
    //                 key={order.id}
    //                 className='flex bg-purple-50 w-full'
    //               >
    //                 <div className='w-full' >
    //                 <p className="px-6 py-4 text-gray-700 font-medium">{order.id}</p>
    //                 <p className="px-6 py-4 text-gray-700">{order.totalBooks}</p>
    //                 <p className="px-6 py-4 text-green-600 font-semibold">₹ {order.totalPrice}</p>

    //                 </div>

    //                   <div className="space-y-3">
    //                     {order.cartItems.map((item) => (
    //                       <div
    //                         key={item.id}
    //                         className="flex "
    //                       >
    //                         <img
    //                           src={item.image}
    //                           alt={item.title}
    //                           className="w-14 h-14 object-cover rounded-md"
    //                         />
    //                         <div>
    //                           <h3 className="font-semibold text-gray-800">{item.title}</h3>
    //                           <p className="text-sm text-gray-500">Author: {item.author}</p>
    //                           <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
    //                           <p className="text-sm text-blue-600 font-semibold">₹ {item.price}</p>
    //                           <button className="mt-1 text-blue-500 hover:text-blue-700 transition">
    //                             <GrView size={18} />
    //                           </button>
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>

    //               </div>
    //             ))} */}

    // <div className="space-y-3">
    //                     {orders?.cartItems?.map((item) => (
    //                       <div
    //                         key={item.id}
    //                         className="flex "
    //                       >
    //                         <img
    //                           src={item.image}
    //                           alt={item.title}
    //                           className="w-14 h-14 object-cover rounded-md"
    //                         />
    //                         <div>
    //                           <h3 className="font-semibold text-gray-800">{item.title}</h3>
    //                           <p className="text-sm text-gray-500">Author: {item.author}</p>
    //                           <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
    //                           <p className="text-sm text-blue-600 font-semibold">₹ {item.price}</p>
    //                           <button className="mt-1 text-blue-500 hover:text-blue-700 transition">
    //                             <GrView size={18} />
    //                           </button>
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>

    //       </div>
  );
};

export default SellerOrderComponent;

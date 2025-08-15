import { useEffect } from "react";
import { useState } from "react";
import api from "../Utils/axios.js";
import { assets } from "../assets/assets";
function Orders({ token }) {
  const [allOrderItems, setAllOrderItems] = useState([]);
  const statusHandler = async (e, orderId) => {
    try {
      const res = await api.post("/api/order/update-status", {
        status: e.target.value,
        orderId,
      });
      await fetchAllOrders();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await api.post("/api/order/");
      if (res.data.success) {
        setAllOrderItems(res.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {allOrderItems.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img src={assets.parcel_icon} alt="" className="w-12" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstname} {order.address.lastname}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},
                  {order.address.country}{" "}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">
                Method : {order.paymentMethod.toUpperCase()}
              </p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>
                Date :{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <p className="text-sm sm:text-[15px]">${order.price}</p>
            <select
              className="p-2 font-semibold"
              value={order.status}
              onChange={(e) => {
                statusHandler(e, order._id);
              }}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipping">Shipping</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;

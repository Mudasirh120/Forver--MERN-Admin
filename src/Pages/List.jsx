import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { backendUrl } from "../../Constants";
function List({ token }) {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        "/api/product/delete",
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border-gray-200 border bg-gray-100 text-sm">
          <p className="font-semibold">Image</p>
          <p className="font-semibold">Name</p>
          <p className="font-semibold">Category</p>
          <p className="font-semibold">Price</p>
          <p className="font-semibold text-center">Action</p>
        </div>
        {list.map((item, index) => (
          <div
            className="grid grid-cols[1fr_3fr_1fr] grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 text-sm"
            key={index}
          >
            <img src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div className="flex gap-2 items-center">
              <Link className="cursor-pointer " to={`/edit/${item._id}`}>
                <img src={assets.edit_icon} alt="" className="w-8" />
              </Link>
              <p
                className="cursor-pointer"
                onClick={() => {
                  removeProduct(item._id);
                }}
              >
                <img src={assets.bin_icon} alt="" className="w-8" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default List;

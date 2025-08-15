import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Utils/axios.js";
function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  useEffect(() => {
    fetchSingle();
  }, []);
  const fetchSingle = async () => {
    try {
      const res = await api.get(`/api/product/single/${id}`);
      if (res.data.success) {
        const productData = await res.data.product;
        setImage1(productData.image[0] || "");
        setImage2(productData.image[1] || "");
        setImage3(productData.image[2] || "");
        setImage4(productData.image[3] || "");
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setCategory(productData.category);
        setSubCategory(productData.subCategory);
        setBestSeller(productData.bestSeller || false);
        setSizes(productData.sizes);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      const res = await api.post(`/api/product/edit/${id}`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([]);
        navigate("/list");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                !image1
                  ? assets.upload_area
                  : typeof image1 == "string"
                  ? image1
                  : URL.createObjectURL(image1)
              }
              alt=""
            />
            <input
              onChange={(e) => {
                setImage1(e.target.files[0]);
              }}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={
                !image2
                  ? assets.upload_area
                  : typeof image2 == "string"
                  ? image2
                  : URL.createObjectURL(image2)
              }
              alt=""
            />
            <input
              onChange={(e) => {
                setImage2(e.target.files[0]);
              }}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={
                !image3
                  ? assets.upload_area
                  : typeof image3 == "string"
                  ? image3
                  : URL.createObjectURL(image3)
              }
              alt=""
            />
            <input
              onChange={(e) => {
                setImage3(e.target.files[0]);
              }}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={
                !image4
                  ? assets.upload_area
                  : typeof image4 == "string"
                  ? image4
                  : URL.createObjectURL(image4)
              }
              alt=""
            />
            <input
              onChange={(e) => {
                setImage4(e.target.files[0]);
              }}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2  placeholder:text-gray-400 "
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          placeholder="Write content here"
          className="w-full max-w-[500px] px-3 py-2 placeholder:text-gray-400"
          required
        ></textarea>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            min={0}
            placeholder="25"
            className="w-full px-3 py-2 sm:w-[120px] placeholder:text-gray-400"
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() => {
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((i) => i !== "S")
                  : [...prev, "S"]
              );
            }}
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div
            onClick={() => {
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((i) => i !== "M")
                  : [...prev, "M"]
              );
            }}
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              M
            </p>
          </div>
          <div
            onClick={() => {
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((i) => i !== "L")
                  : [...prev, "L"]
              );
            }}
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              L
            </p>
          </div>
          <div
            onClick={() => {
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((i) => i !== "XL")
                  : [...prev, "XL"]
              );
            }}
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() => {
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((i) => i !== "XXL")
                  : [...prev, "XXL"]
              );
            }}
          >
            <p
              className={` px-3 py-1 cursor-pointer ${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              }`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestSeller}
          onChange={() => {
            setBestSeller((prev) => !prev);
          }}
        />
        <label className="cursor-pointer " htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button type="submit" className="bg-black text-white w-28 py-3 mt-4 ">
        Edit
      </button>
    </form>
  );
}

export default Edit;

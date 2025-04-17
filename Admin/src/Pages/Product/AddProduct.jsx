
import Imageandall from "./Imageandall";
import Productdetails from "./Productdetails";
import ShipingDetails from "./ShipingDetails";
import { useState } from "react";

import Toppages from "../../Components/Utils/Toppages";
import useProductStore from "../../Store/useProductStore";

function AddProduct() {
  const { addProduct } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    sku: "",
    quantity: "",
    stock: "",
    discountType: "noDiscount",
    discountPrice: "",
    discountPercent: "",
    shipping_cost: "",
    image: [],
    size: "",
    color: "",
    tags: [],
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (shippingData) => {
    setProduct((prev) => ({
      ...prev,
      shipping_cost: shippingData.cost,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const result = await addProduct(product);

    if (result.success) {
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        sku: "",
        quantity: "",
        stock: "",
        discountType: "noDiscount",
        discountPrice: "",
        discountPercent: "",
        shipping_cost: "",
        image: [],
        size: "",
        color: "",
        tags: [],
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <Toppages title="Add Product" hidden={true} />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-10">
            <div className="flex justify-end mb-10 items-end flex-wrap">
              <div className="mb-2 flex sm:justify-end items-center flex-wrap">
                <button
                  className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Publish"}
                </button>
                <button
                  className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white sm:mb-0 mb-2"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 2xl:col-span-10">
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
                <div className="mb-6 bg-white px-8 py-8 rounded-md">
                  <h4 className="text-[22px]">General</h4>

                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">
                      Product Name <span className="text-red">*</span>
                    </p>
                    <input
                      className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                      type="text"
                      placeholder="Product name"
                      value={product.name}
                      onChange={handleChange}
                      name="name"
                    />
                    <span className="text-tiny">
                      A product name is required and recommended to be unique.
                    </span>
                  </div>

                  <div className="mb-5">
                    <p className="mb-0 text-base text-black">Description</p>
                    <textarea
                      className="input w-full h-[200px] py-4 rounded-md border border-gray6 px-6 text-base resize-none text-black"
                      placeholder="Description ..."
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                <Productdetails product={product} handleChange={handleChange} />
                <ShipingDetails onShippingChange={handleShippingChange} />
              </div>

              <Imageandall product={product} handleChange={handleChange} />
            </div>

            <div className="mb-2 flex items-center flex-wrap">
              <button
                className="tp-btn px-10 py-2 mr-2"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Saving..." : "Publish"}
              </button>
              <div className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white">
                Save Draft
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

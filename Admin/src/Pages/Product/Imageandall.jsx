/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

import useProductStore from "../../Store/useProductStore";

function Imageandall({ product, handleChange }) {
  const { categories, fetchCategories } = useProductStore();
  const [imageerror, setImageerror] = useState([]);
  useEffect(() => {
    fetchCategories(); // Fetch from Zustand
  }, [fetchCategories]);
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const validImages = [];

    files.forEach((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width <= 282 && img.height <= 300) {
          validImages.push(file);

          handleChange({
            target: {
              name: "image",
              value: [...(product.image || []), ...validImages], // Sirf valid images add hongi
            },
          });
        } else {
          setImageerror("Image size  282x300 pixels.");
        }
      };
    });
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      // Naye tag ko product.tags me add karein
      handleChange({
        target: {
          name: "tags",
          value: [...(product.tags || []), e.target.value.trim()], // Pehle se existing tags rakhein
        },
      });

      e.target.value = ""; // Input field ko clear karein
      e.preventDefault(); // Default form submission rokna
    }
  };

  const removeTag = (index) => {
    // Selected tag remove karein
    const updatedTags = product.tags.filter((_, i) => i !== index);

    handleChange({
      target: {
        name: "tags",
        value: updatedTags,
      },
    });
  };

 
  return (
    <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
      <div className="bg-white px-8 py-8 rounded-md mb-6">
        <p className="mb-2 text-base text-black">Upload Image & thumbnail </p>
        <div className="text-center">
          {product.image && product.image.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {product.image.map((file, index) => (
                <img
                  key={index}
                  className="w-[100px] h-auto mx-auto"
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                />
              ))}
            </div>
          ) : (
            <img
              className="w-[100px] h-auto mx-auto"
              src="https://html.hixstudio.net/ebazer/assets/img/icons/upload.png"
              alt="Upload Placeholder"
            />
          )}
        </div>
        <span className="text-tiny text-center w-full inline-block mb-3">
          Image size less than 5Mb & 282x300
          <p className="text-red-400">{imageerror}</p>
        </span>
        <div>
          <input
            type="file"
            id="productImage"
            className="hidden"
            multiple
            onChange={handleImageChange} // ✅ Image update
          />
          <label
            htmlFor="productImage"
            className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
          >
            Upload Image
          </label>
        </div>
      </div>

      <div className="bg-white px-8 py-8 rounded-md mb-6">
        <p className="mb-5 text-base text-black">Product Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
          <div className="category-select">
            <h5 className="text-tiny mb-1">Category</h5>
            <select
              className="h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px] w-full"
              name="category"
              value={product.category}
              onChange={handleChange} // ✅ Category update
            >
              <option value="">Select </option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>No Categories Available</option>
              )}
            </select>
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-0 text-base text-black">Tags</p>
          <div className="tags-input-wrapper">
            {product.tags &&
              product.tags.length > 0 &&
              product.tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag} <b onClick={() => removeTag(index)}>×</b>
                </span>
              ))}
            <input
              type="text"
              onKeyPress={handleTagKeyPress} // ✅ Add tags on Enter
              placeholder="Press Enter to add tags"
            />
          </div>
        </div>
      </div>

      <div className="bg-white px-8 py-8 rounded-md">
        <p className="mb-5 text-base text-black">Product Attribute</p>
        <div>
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Size</p>
            <input
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="Size"
              name="size"
              value={product.size}
              onChange={handleChange} // ✅ Size update
            />
          </div>
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Color</p>
            <input
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
              type="text"
              placeholder="Hex Code Here"
              name="color"
              value={product.color}
              onChange={handleChange} // ✅ Color update
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imageandall;

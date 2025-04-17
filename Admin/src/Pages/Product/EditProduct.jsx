/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toppages from "../../Components/Utils/Toppages";
import useProductStore from "../../Store/useProductStore";

const initialFormState = {
  name: "", description: "", price: "", sku: "", quantity: "", stock: "",
  discountType: "", discountPrice: "", discountPercent: "",
  image: [], imageFile: null, size: "", color: "", category: "", tags: [],
  shipping_cost: "", width: "", height: "", weight: ""
};

const DIMENSIONS = ["width", "height", "weight"];
const FIELDS = [
  { label: 'Base Price', name: 'price' },
  { label: 'SKU', name: 'sku' },
  { label: 'Quantity', name: 'quantity' },
  { label: 'Stock', name: 'stock' },
];

const DISCOUNT_TYPES = [
  { label: "No Discount", value: "noDiscount" },
  { label: "Fixed Discount", value: "fixedDiscount" },
  { label: "Percent Discount", value: "percentDiscount" },
];

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    singleProduct, fetchSingleProduct,
    updateProduct, categories, fetchCategories
  } = useProductStore();

  const [formData, setFormData] = useState(initialFormState);

  const safeParse = (val) => isNaN(parseFloat(val)) ? 0 : parseFloat(val);
  const calculateShippingCost = (w, h, wt) =>
    (safeParse(wt) * 10 + safeParse(w) * safeParse(h)).toFixed(2);

  useEffect(() => {
    id && fetchSingleProduct(id);
    fetchCategories();
  }, [id]);

  useEffect(() => {
    if (singleProduct) {
      const { width = "", height = "", weight = "", shipping_cost } = singleProduct;
      setFormData({
        ...singleProduct,
        width, height, weight,
        shipping_cost: shipping_cost || calculateShippingCost(width, height, weight),
      });
    }
  }, [singleProduct]);

  const handleChange = ({ target: { name, value } }) => {
    const updated = { ...formData, [name]: value };

    if (DIMENSIONS.includes(name)) {
      updated.shipping_cost = calculateShippingCost(
        name === "width" ? value : formData.width,
        name === "height" ? value : formData.height,
        name === "weight" ? value : formData.weight
      );
    }

    setFormData(updated);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: files.map((f) => URL.createObjectURL(f)),
      imageFile: files,
    }));
  };

  const handleDiscountTypeChange = ({ target: { value } }) =>
    setFormData((prev) => ({
      ...prev,
      discountType: value,
      discountPrice: value === "fixedDiscount" ? prev.discountPrice : "",
      discountPercent: value === "percentDiscount" ? prev.discountPercent : "",
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(formData, id).then((res) => {
      if (res?.success) navigate("/product-list");
    });
  };

  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <Toppages title="Edit Product" hidden />

      <form onSubmit={handleSubmit}>
        <div className="flex justify-end mb-10 flex-wrap gap-2">
          <button className="tp-btn px-10 py-2" type="submit">Update</button>
          <button type="button" className="tp-btn px-10 py-2 border border-gray-300 bg-transparent text-black hover:bg-white hover:border-white">
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 2xl:col-span-9 space-y-6">

            {/* General Section */}
            <section className="bg-white p-8 rounded-md">
              <h4 className="text-[22px] mb-6">General</h4>
              <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} required />
              <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} />
            </section>

            {/* Details Section */}
            <section className="bg-white p-8 rounded-md space-y-6">
              <h4 className="text-[22px]">Details</h4>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {FIELDS.map((f) => (
                  <Input key={f.name} {...f} value={formData[f.name]} onChange={handleChange} required />
                ))}
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-base font-medium text-black mb-3">Discount Type</label>
                <div className="flex flex-wrap gap-3">
                  {DISCOUNT_TYPES.map(({ value, label }) => (
                    <label key={value} className="tp-checkbox-secondary border px-6 py-4 rounded-md flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="discountType" value={value} checked={formData.discountType === value} onChange={handleDiscountTypeChange} />
                      <span className="text-base font-medium">{label}</span>
                    </label>
                  ))}
                </div>

                {formData.discountType === "fixedDiscount" && (
                  <Input label="Discount Price" name="discountPrice" value={formData.discountPrice} onChange={handleChange} />
                )}
                {formData.discountType === "percentDiscount" && (
                  <Input label="Discount Percent" name="discountPercent" value={formData.discountPercent} onChange={handleChange} />
                )}
              </div>
            </section>

            {/* Shipping Section */}
            <section className="bg-white p-8 rounded-md">
              <h4 className="text-[22px] mb-6">Shipping</h4>
              <div className="grid sm:grid-cols-3 gap-6">
                {DIMENSIONS.map((d) => (
                  <Input key={d} label={`${d.charAt(0).toUpperCase() + d.slice(1)} (${d === 'weight' ? 'KG' : 'Inch'})`} name={d} type="number" value={formData[d]} onChange={handleChange} />
                ))}
              </div>
              <Input label="Shipping Cost" name="shipping_cost" value={formData.shipping_cost} readOnly />
            </section>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 2xl:col-span-3 space-y-6">
            {/* Image Upload */}
            <section className="bg-white p-8 rounded-md text-center">
              <p className="text-base font-medium text-black mb-4">Upload Image & Thumbnail</p>
              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {formData.image.length > 0
                  ? formData.image.map((img, i) => <img key={i} src={img} className="w-[100px] rounded-md" />)
                  : <img src="fallback-image-url.png" className="w-[100px] rounded-md" />}
              </div>
              <input type="file" id="productImage" hidden multiple onChange={handleFileChange} />
              <label htmlFor="productImage" className="block text-tiny py-2 px-4 border border-gray6 rounded-md cursor-pointer hover:bg-theme hover:text-white transition">
                Upload Image
              </label>
            </section>

            {/* Category and Tags */}
            <section className="bg-white p-8 rounded-md space-y-5">
              <Dropdown label="Category" name="category" value={formData.category} onChange={handleChange} options={categories} />
              <Input label="Tags" name="tags" placeholder="Enter comma separated" value={formData.tags?.join(", ")} onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }))} />
            </section>

            {/* Attributes */}
            <section className="bg-white p-8 rounded-md">
              <p className="text-base font-medium text-black mb-4">Product Attribute</p>
              {["size", "color"].map((attr) => (
                <Input key={attr} label={attr.charAt(0).toUpperCase() + attr.slice(1)} name={attr} value={formData[attr]} onChange={handleChange} />
              ))}
            </section>
          </div>
        </div>
      </form>
    </div>
  );
}

// Reusable small components
const Input = ({ label, name, type = "text", value, onChange, readOnly, required }) => (
  <div>
    <label className="block text-base font-medium text-black mb-1">
      {label} {required && <span className="text-red">*</span>}
    </label>
    <input
      className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-base font-medium text-black mb-1">{label}</label>
    <textarea
      className="input w-full h-[200px] py-4 rounded-md border border-gray6 px-6 text-base resize-none"
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

const Dropdown = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-base font-medium text-black mb-1">{label}</label>
    <select
      className="w-full h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px]"
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">Select</option>
      {options?.length > 0
        ? options.map((opt) => <option key={opt._id} value={opt._id}>{opt.name}</option>)
        : <option disabled>No Options</option>}
    </select>
  </div>
);

export default EditProduct;

import { useEffect, useState } from "react";
import { InputField } from "../../Components/Utils/InputFields";
import Toppages from "../../Components/Utils/Toppages";

import CategoryList from "./CategoryList";
import useProductStore from "../../Store/useProductStore";

function Category() {
  const {
    categories,
    fetchCategories,
    addCategory,
    editCategory,
    setEditCategory,
    updateCategory,
  } = useProductStore();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    parent: "",
    isParent: false,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name || "",
        slug: editCategory.slug || "",
        description: editCategory.description || "",
        parent: editCategory.parent || "",
        isParent: editCategory.isCreateAsParentCategory || false,
        image: null,
      });

      if (editCategory.image) {
        setImagePreview(editCategory.image); // 👈 Show existing image
      }
    }
  }, [editCategory]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // 👈 Generate preview URL
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const categoryData = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      parent: formData.parent,
      isCreateAsParentCategory: formData.isParent,
    };

    try {
      if (editCategory) {
        // Update mode
        await updateCategory(editCategory._id, categoryData, formData.image);
      } else {
        // Add mode
        const newCategoryData = new FormData();
        newCategoryData.append("name", formData.name);
        newCategoryData.append("slug", formData.slug);
        newCategoryData.append("description", formData.description);
        newCategoryData.append("isCreateAsParentCategory", formData.isParent);
        if (!formData.isParent) {
          newCategoryData.append("parent", formData.parent);
        }
        if (formData.image) {
          newCategoryData.append("image", formData.image);
        }
        await addCategory(newCategoryData);
      }

      // Reset form
      setFormData({
        name: "",
        slug: "",
        description: "",
        parent: "",
        isParent: false,
        image: null,
      });
      setImagePreview(null);
      setEditCategory(null); // Clear editing state
    } catch (error) {
      console.error("Error submitting category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Toppages title="Add Category" hidden={true} />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <p className="mb-2 text-base text-black">Upload Image</p>
                  <div className="text-center">
                    {imagePreview ? (
                      <img
                        className="w-[100px] h-auto mx-auto rounded-md border border-gray-300"
                        src={imagePreview}
                        alt="Preview"
                      />
                    ) : (
                      <img
                        className="w-[100px] h-auto mx-auto"
                        src="https://html.hixstudio.net/ebazer/assets/img/icons/upload.png"
                        alt="Placeholder"
                      />
                    )}
                  </div>
                  <span className="text-tiny text-center w-full inline-block mb-3">
                    Image size must be less than 5Mb
                  </span>
                  <div>
                    <input
                      type="file"
                      id="productImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="productImage"
                      className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <InputField
                    label="Name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                  />
                </div>

                <div className="mb-6">
                  <InputField
                    label="Slug"
                    type="text"
                    placeholder="Slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Parent</p>
                  <div className="category-add-select select-bordered">
                    <select
                      className="h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px] w-full"
                      name="parent"
                      value={formData.parent}
                      onChange={handleChange}
                      disabled={formData.isParent}
                    >
                      <option value="">Select </option>{" "}
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <InputField
                    label="Description"
                    type="textarea"
                    placeholder="Description Here"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="tp-checkbox flex items-center mb-5">
                  <input
                    id="product-1"
                    type="checkbox"
                    name="isParent"
                    checked={formData.isParent}
                    onChange={handleChange}
                  />
                  <label htmlFor="product-1" className="text-tiny">
                    Create As Parent Category
                  </label>
                </div>

                <button
                  className="tp-btn px-7 py-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <button
                    className="tp-btn px-2 py-1"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? editCategory
                        ? "Updating..."
                        : "Adding..."
                      : editCategory
                      ? "Update Category"
                      : "Add Category"}
                  </button>
                </button>
                {editCategory && (
                  <button
                    type="button"
                    className="ml-3 px-4 py-2 bg-gray-300 text-black rounded-md"
                    onClick={() => {
                      setFormData({
                        name: "",
                        slug: "",
                        description: "",
                        parent: "",
                        isParent: false,
                        image: null,
                      });
                      setImagePreview(null);
                      setEditCategory(null);
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
          <CategoryList />
        </div>
      </div>
    </>
  );
}

export default Category;

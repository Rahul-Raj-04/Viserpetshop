import { useEffect, useState } from "react";
import { InputField } from "../../Components/Utils/InputFields";
import Toppages from "../../Components/Utils/Toppages";
import useGenarlStore from "../../Store/Genaralsetting";

import Banner from "./Banner";
import toast from "react-hot-toast";

function AddBanner() {
  const { addBanner, loading, editBanner, updateBanner, setEditBanner } =
    useGenarlStore();
  const [bannerData, setBannerData] = useState({
    title: "",
    subtitle: "",
    link: "",
    isActive: false,
    displayOrder: "",
    place: "homepage",
    type: "slider",
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check if the selected file is an SVG
    if (file.type === "image/svg+xml") {
      toast.error("SVG images are not allowed. Please select another image.");
      return;
    }

    // If file is valid, update state
    setImageUrl(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submit

  useEffect(() => {
    if (editBanner) {
      setBannerData({
        title: editBanner.title || "",
        subtitle: editBanner.subtitle || "",
        link: editBanner.link || "",
        isActive: editBanner.isActive || false,
        displayOrder: editBanner.displayOrder || "",
        place: editBanner.place || "homepage",
        type: editBanner.type || "slider",
      });
      setPreview(editBanner.imageUrl || null);
      setImageUrl(null); // Let user choose a new image if needed
    }
  }, [editBanner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editBanner && !imageUrl) {
      toast.error("Please upload an image!");
      return;
    }

    if (editBanner) {
      await updateBanner(editBanner._id, bannerData, imageUrl);
    } else {
      await addBanner(bannerData, imageUrl);
    }

    // Reset form
    setBannerData({
      title: "",
      subtitle: "",
      link: "",
      isActive: false,
      displayOrder: "",
      place: "homepage",
      type: "slider",
    });
    setImageUrl(null);
    setPreview(null);
    setEditBanner(null); // Reset edit mode
  };

  return (
    <>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Toppages title="Add Banner" hidden={true} />

        <div className="grid grid-cols-12 gap-6">
          {/* Add Banner Form */}
          <div className="col-span-12 lg:col-span-4">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <p className="mb-2 text-base text-black">Upload Image</p>
                  <div className="text-center">
                    {preview ? (
                      <img
                        className="w-[100px] h-auto mx-auto"
                        src={preview}
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
                  <div>
                    <input
                      type="file"
                      id="bannerImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="bannerImage"
                      className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>

                <InputField
                  label="Title"
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={bannerData.title}
                  onChange={handleChange}
                />
                <InputField
                  label="Sub Title"
                  type="text"
                  name="subtitle"
                  placeholder="Enter Sub Title"
                  value={bannerData.subtitle}
                  onChange={handleChange}
                />
                <InputField
                  label="Link"
                  type="text"
                  name="link"
                  placeholder="Enter Link"
                  value={bannerData.link}
                  onChange={handleChange}
                />

                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Place</p>
                  <select
                    className="h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px] w-full"
                    name="place"
                    value={bannerData.place}
                    onChange={handleChange}
                  >
                    <option value="homepage">Homepage</option>
                    <option value="offer">offer Page</option>
                    <option value="footer">footer Page</option>
                    <option value="contact">Contact Page</option>
                    <option value="about">About Page</option>
                  </select>
                </div>

                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Type</p>
                  <select
                    className="h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px] w-full"
                    name="type"
                    value={bannerData.type}
                    onChange={handleChange}
                  >
                    <option value="slider">slider</option>
                    <option value="normal">normal</option>
                  </select>
                </div>

                <InputField
                  label="Display Order"
                  type="number"
                  name="displayOrder"
                  placeholder="1"
                  value={bannerData.displayOrder}
                  onChange={handleChange}
                />

                <div className="tp-checkbox flex items-center mb-5">
                  <input
                    id="isActive"
                    type="checkbox"
                    name="isActive"
                    checked={bannerData.isActive}
                    onChange={handleChange}
                  />
                  <label htmlFor="isActive" className="text-tiny">
                    Is Active
                  </label>
                </div>

                <button className="tp-btn px-7 py-2" type="submit">
                  {loading
                    ? editBanner
                      ? "Updating..."
                      : "Adding..."
                    : editBanner
                    ? "Update Banner"
                    : "Add Banner"}
                </button>
                {editBanner && (
                  <button
                    className="ml-3 px-4 py-2 bg-gray-300 text-black rounded-md"
                    type="button"
                    onClick={() => {
                      setEditBanner(null);
                      setBannerData({
                        title: "",
                        subtitle: "",
                        link: "",
                        isActive: false,
                        displayOrder: "",
                        place: "homepage",
                        type: "slider",
                      });
                      setPreview(null);
                      setImageUrl(null);
                    }}
                  >
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>

          <Banner />
        </div>
      </div>
    </>
  );
}

export default AddBanner;

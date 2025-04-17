// function EditProduct() {
//     return (
//       <>
//         <div className="body-content px-8 py-8 bg-slate-100">
//           <div className="grid grid-cols-12">
//             <div className="col-span-12 2xl:col-span-10">
//               <div className="flex justify-between mb-10 items-end flex-wrap">
//                 <div className="page-title mb-6 sm:mb-0">
//                   <h3 className="mb-0 text-[28px]">Edit Product</h3>
//                   <ul className="text-tiny font-medium flex items-center space-x-3 text-text3">
//                     <li className="breadcrumb-item text-muted">
//                       <a href="product-list.html" className="text-hover-primary">
//                         {" "}
//                         Home
//                       </a>
//                     </li>
//                     <li className="breadcrumb-item flex items-center">
//                       <span className="inline-block bg-text3/60 w-[4px] h-[4px] rounded-full"></span>
//                     </li>
//                     <li className="breadcrumb-item text-muted">Edit Product</li>
//                   </ul>
//                 </div>
//                 <div className="mb-2 flex sm:justify-end items-center flex-wrap">
//                   <button className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2">
//                     Save
//                   </button>
//                   <button className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white sm:mb-0 mb-2">
//                    Cancle
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
  
//           <div className="grid grid-cols-12">
//             <div className="col-span-12 2xl:col-span-10">
              
//               <div className="">
//                 <div className="">
//                   <div className="grid grid-cols-12 gap-6 mb-6">
//                     <div className="col-span-12 xl:col-span-8 2xl:col-span-9 ">
//                       <div className="mb-6 bg-white px-8 py-8 rounded-md">
//                         <h4 className="text-[22px]">General</h4>
  
//                         <div className="mb-5">
//                           <p className="mb-0 text-base text-black">
//                             Product Name <span className="text-red">*</span>
//                           </p>
//                           <input
//                             className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                             type="text"
//                             placeholder="Product name"
//                           />
//                           <span className="text-tiny">
//                             A product name is required and recommended to be
//                             unique.
//                           </span>
//                         </div>
//                         <div className="mb-5">
//                           <p className="mb-0 text-base text-black">Description</p>
//                           <div className="ql-toolbar ql-snow">
//                             <span className="ql-formats">
//                               <span className="ql-header ql-picker">
//                                 <span
//                                   className="ql-picker-label"
//                                   tabIndex="0"
//                                   role="button"
//                                   aria-expanded="false"
//                                   aria-controls="ql-picker-options-0"
//                                 >
//                                   <svg viewBox="0 0 18 18">
//                                     {" "}
//                                     <polygon
//                                       className="ql-stroke"
//                                       points="7 11 9 13 11 11 7 11"
//                                     ></polygon>{" "}
//                                     <polygon
//                                       className="ql-stroke"
//                                       points="7 7 9 5 11 7 7 7"
//                                     ></polygon>{" "}
//                                   </svg>
//                                 </span>
//                                 <span
//                                   className="ql-picker-options"
//                                   aria-hidden="true"
//                                   tabIndex="-1"
//                                   id="ql-picker-options-0"
//                                 >
//                                   <span
//                                     tabIndex="0"
//                                     role="button"
//                                     className="ql-picker-item"
//                                     data-value="1"
//                                   ></span>
//                                   <span
//                                     tabIndex="0"
//                                     role="button"
//                                     className="ql-picker-item"
//                                     data-value="2"
//                                   ></span>
//                                   <span
//                                     tabIndex="0"
//                                     role="button"
//                                     className="ql-picker-item"
//                                   ></span>
//                                 </span>
//                               </span>
//                               <select
//                                 className="ql-header"
//                                 style={{ display: "none" }}
//                               >
//                                 <option value="1"></option>
//                                 <option value="2"></option>
//                                 <option selected="selected"></option>
//                               </select>
//                             </span>
//                             <span className="ql-formats">
//                               <button type="button" className="ql-bold">
//                                 <svg viewBox="0 0 18 18">
//                                   {" "}
//                                   <path
//                                     className="ql-stroke"
//                                     d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
//                                   ></path>{" "}
//                                   <path
//                                     className="ql-stroke"
//                                     d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
//                                   ></path>{" "}
//                                 </svg>
//                               </button>
//                               <button type="button" className="ql-italic">
//                                 <svg viewBox="0 0 18 18">
//                                   {" "}
//                                   <line
//                                     className="ql-stroke"
//                                     x1="7"
//                                     x2="13"
//                                     y1="4"
//                                     y2="4"
//                                   ></line>{" "}
//                                   <line
//                                     className="ql-stroke"
//                                     x1="5"
//                                     x2="11"
//                                     y1="14"
//                                     y2="14"
//                                   ></line>{" "}
//                                   <line
//                                     className="ql-stroke"
//                                     x1="8"
//                                     x2="10"
//                                     y1="14"
//                                     y2="4"
//                                   ></line>{" "}
//                                 </svg>
//                               </button>
//                               <button type="button" className="ql-underline">
//                                 <svg viewBox="0 0 18 18">
//                                   {" "}
//                                   <path
//                                     className="ql-stroke"
//                                     d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
//                                   ></path>{" "}
//                                   <rect
//                                     className="ql-fill"
//                                     height="1"
//                                     rx="0.5"
//                                     ry="0.5"
//                                     width="12"
//                                     x="3"
//                                     y="15"
//                                   ></rect>{" "}
//                                 </svg>
//                               </button>
//                             </span>
//                             <span className="ql-formats">
//                               <button type="button" className="ql-image">
//                                 <svg viewBox="0 0 18 18">
//                                   {" "}
//                                   <rect
//                                     className="ql-stroke"
//                                     height="10"
//                                     width="12"
//                                     x="3"
//                                     y="4"
//                                   ></rect>{" "}
//                                   <circle
//                                     className="ql-fill"
//                                     cx="6"
//                                     cy="7"
//                                     r="1"
//                                   ></circle>{" "}
//                                   <polyline
//                                     className="ql-even ql-fill"
//                                     points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
//                                   ></polyline>{" "}
//                                 </svg>
//                               </button>
//                               <button type="button" className="ql-code-block">
//                                 <svg viewBox="0 0 18 18">
//                                   {" "}
//                                   <polyline
//                                     className="ql-even ql-stroke"
//                                     points="5 7 3 9 5 11"
//                                   ></polyline>{" "}
//                                   <polyline
//                                     className="ql-even ql-stroke"
//                                     points="13 7 15 9 13 11"
//                                   ></polyline>{" "}
//                                   <line
//                                     className="ql-stroke"
//                                     x1="10"
//                                     x2="8"
//                                     y1="5"
//                                     y2="13"
//                                   ></line>{" "}
//                                 </svg>
//                               </button>
//                             </span>
//                           </div>
//                           <div
//                             className="min-h-[200px] ql-container ql-snow"
//                             id="editor"
//                           >
//                             <div
//                               className="ql-editor ql-blank"
//                               data-gramm="false"
//                               contentEditable="true"
//                               data-placeholder="Compose an epic..."
//                             >
//                               <p>
//                                 <br />
//                               </p>
//                             </div>
//                             <div
//                               className="ql-clipboard"
//                               contentEditable="true"
//                               tabIndex="-1"
//                             ></div>
//                             <div className="ql-tooltip ql-hidden">
//                               <a
//                                 className="ql-preview"
//                                 target="_blank"
//                                 href="about:blank"
//                               ></a>
//                               <input
//                                 type="text"
//                                 data-formula="e=mc^2"
//                                 data-link="https://quilljs.com"
//                                 data-video="Embed URL"
//                               />
//                               <a className="ql-action"></a>
//                               <a className="ql-remove"></a>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="bg-white px-8 py-8 rounded-md mb-6">
//                         <h4 className="text-[22px]">Details</h4>
  
//                         <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               Base Price <span className="text-red">*</span>
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Product price"
//                             />
//                             <span className="text-tiny leading-4">
//                               Set the base price of product.
//                             </span>
//                           </div>
  
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               SKU <span className="text-red">*</span>
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="SKU"
//                             />
//                             <span className="text-tiny leading-4">
//                               Enter the product SKU.
//                             </span>
//                           </div>
  
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               Qantity <span className="text-red">*</span>
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Qantity"
//                             />
//                             <span className="text-tiny leading-4">
//                               Enter the product quantity.
//                             </span>
//                           </div>
  
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               VAT Ammount (%)
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="VAT"
//                             />
//                             <span className="text-tiny leading-4">
//                               Set the product VAT about.
//                             </span>
//                           </div>
//                         </div>
  
//                         <div className="">
//                           <p className="mb-0 text-base text-black">
//                             Discount Type <span className="text-red">*</span>
//                           </p>
//                           <div className="flex items-center sm:space-x-3 flex-wrap mb-5">
//                             <div className="tp-checkbox-secondary mb-4">
//                               <label
//                                 htmlFor="noDiscount"
//                                 className="border border-gray6 px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer"
//                               >
//                                 <small className="flex items-center">
//                                   <input
//                                     id="noDiscount"
//                                     type="radio"
//                                     name="priceDiscount"
//                                   />
//                                   <span className="text-base font-medium">
//                                     No Discount
//                                   </span>
//                                 </small>
//                               </label>
//                             </div>
//                             <div className="tp-checkbox-secondary mb-4">
//                               <label
//                                 htmlFor="percentDiscount"
//                                 className="border border-gray6 px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer"
//                               >
//                                 <small className="flex items-center">
//                                   <input
//                                     id="percentDiscount"
//                                     type="radio"
//                                     name="priceDiscount"
//                                   />
//                                   <span className="text-base font-medium">
//                                     Fixed Discount
//                                   </span>
//                                 </small>
//                               </label>
//                             </div>
//                             <div className="tp-checkbox-secondary mb-4">
//                               <label
//                                 htmlFor="fixedDiscount"
//                                 className="border border-gray6 px-4 sm:px-10 py-5 rounded-md hover:cursor-pointer"
//                               >
//                                 <small className="flex items-center">
//                                   <input
//                                     id="fixedDiscount"
//                                     type="radio"
//                                     name="priceDiscount"
//                                   />
//                                   <span className="text-base font-medium">
//                                     Percent Discount
//                                   </span>
//                                 </small>
//                               </label>
//                             </div>
//                           </div>
  
//                           <div className="mb-5 ">
//                             <p className="mb-0 text-base text-black">
//                               Price <span className="text-red">*</span>
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Price"
//                             />
//                           </div>
//                           <div className="mb-5">
//                             <p className="mb-2 text-base text-black">
//                               Percent <span className="text-red">*</span>
//                             </p>
//                             <input
//                               type="text"
//                               id="example_id"
//                               name="example_name"
//                               value=""
//                             />
//                           </div>
  
//                           <div className="mt-10 hidden">
//                             <div className="w-full">
//                               <div
//                                 className="relative h-5 w-full"
//                                 id="my-slider"
//                                 data-se-min="00"
//                                 data-se-step="1"
//                                 data-se-min-value="0"
//                                 data-se-max-value="40"
//                                 data-se-max="100"
//                               >
//                                 <div className="slider-touch-left w-5 h-5 rounded-md absolute z-10 hover:cursor-pointer">
//                                   <span className="block w-full h-full bg-white rounded-full shadow-sm"></span>
//                                 </div>
//                                 <div className="slider-touch-right w-5 h-5 rounded-md absolute z-10 hover:cursor-pointer">
//                                   <span className="block w-full h-full bg-white rounded-full shadow-sm"></span>
//                                 </div>
//                                 <div className="slider-line absolute w-[calc(100%-5rem)] h-1 left-[18px] top-[7px] rounded bg-[#f9f9f9] overflow-hidden">
//                                   <span className="block h-full w-0 bg-theme"></span>
//                                 </div>
//                               </div>
//                             </div>
//                             <div id="result" className="">
//                               Min: 0 Max: 100
//                             </div>
//                           </div>
//                         </div>
//                       </div>
  
//                       <div className="bg-white px-8 py-8 rounded-md mb-6">
//                         <h4 className="text-[22px]">Shipping</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               Width(Inch)
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Width"
//                             />
//                             <span className="text-tiny">
//                               Set the product width.
//                             </span>
//                           </div>
  
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               Height(Inch)
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Height"
//                             />
//                             <span className="text-tiny">
//                               Set the product height.
//                             </span>
//                           </div>
  
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">
//                               Weight(KG)
//                             </p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Weight"
//                             />
//                             <span className="text-tiny">
//                               Set the product weight.
//                             </span>
//                           </div>
//                         </div>
  
//                         <div className="mb-5">
//                           <p className="mb-0 text-base text-black">
//                             Shipping Cost
//                           </p>
//                           <input
//                             className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                             type="text"
//                             placeholder="Cost"
//                           />
//                           <span className="text-tiny">
//                             Set the product shipping cost.
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-span-12 xl:col-span-4 2xl:col-span-3 ">
//                       <div className="bg-white px-8 py-8 rounded-md mb-6">
//                         <p className="mb-2 text-base text-black">Upload Image</p>
//                         <div className="text-center">
//                           <img
//                             className="w-[100px] h-auto mx-auto"
//                             src="https://html.hixstudio.net/ebazer/assets/img/icons/upload.png"
//                             alt=""
//                           />
//                         </div>
//                         <span className="text-tiny text-center w-full inline-block mb-3">
//                           Image size must be less than 5Mb
//                         </span>
//                         <div className="">
//                           <form action="#">
//                             <input
//                               type="file"
//                               id="productImage"
//                               className="hidden"
//                             />
//                             <label
//                               htmlFor="productImage"
//                               className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
//                             >
//                               Upload Image
//                             </label>
//                           </form>
//                         </div>
//                       </div>
//                       <div className="bg-white px-8 py-8 rounded-md mb-6">
//                         <p className="mb-5 text-base text-black">
//                           Product Details
//                         </p>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
//                           <div className="category-select ">
//                             <h5 className="text-tiny mb-1">Category</h5>
//                             <select className="h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px]">
//                               <option value="">Electronics</option>
//                               <option value="">Fashion</option>
//                               <option value="">Jewellery</option>
//                               <option value="">Beauty</option>
//                               <option value="">Grocery</option>
//                             </select>
//                           </div>
//                           <div className="sub-category-select select-bordered">
//                             <h5 className="text-tiny mb-1">Sub Category</h5>
//                             <select className="h-[44px] border border-[#E4E4E4] rounded-[6px] pl-[15px]">
//                               <option value="">Electronics</option>
//                               <option value="">Fashion</option>
//                               <option value="">Jewellery</option>
//                               <option value="">Beauty</option>
//                               <option value="">Grocery</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="mb-5">
//                           <p className="mb-0 text-base text-black">Tags</p>
//                           <div className="tags-input-wrapper">
//                             <span className="tag">
//                               PHP<b>×</b>
//                             </span>
//                             <span className="tag">
//                               JavaScript<b>×</b>
//                             </span>
//                             <span className="tag">
//                               CSS<b>×</b>
//                             </span>
//                             <input type="text" />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="bg-white px-8 py-8 rounded-md">
//                         <p className="mb-5 text-base text-black">
//                           Product Attribute
//                         </p>
//                         <div className="">
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">Size</p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Size"
//                             />
//                           </div>
//                           <div className="mb-5">
//                             <p className="mb-0 text-base text-black">Color</p>
//                             <input
//                               className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
//                               type="text"
//                               placeholder="Hex Code Here"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mb-2 flex  items-center flex-wrap">
//                     <button className="tp-btn px-10 py-2 mr-2 sm:mb-0 mb-2">
//                     Save
//                     </button>
//                     <button className="tp-btn px-10 py-2 border border-[#dfdfdf] bg-transparent text-black hover:text-black hover:bg-white hover:border-white sm:mb-0 mb-2">
//                      Cancel
//                     </button>
//                   </div>
//                 </div>
  
//                 <div className=""></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
  
//   export default EditProduct;
  
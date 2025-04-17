import { useEffect, useState } from "react";
import InputField from "../../Components/InputField";
import Toppage from "../../Components/Toppage";
import useAuthStore from "../Store/useAuthStore";

function Contact() {
  const { settings, fetchSettings, sendContactForm } = useAuthStore();
  useEffect(() => {
    if (!settings) {
      fetchSettings();
    }
  }, [settings, fetchSettings]); // ✅ Runs only if settings is not already present

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return alert("All fields are required!");
    }

    await sendContactForm(formData);
    setFormData({ name: "", email: "", message: "" }); // Clear form after submit
  };
  return (
    <>
      <Toppage pagename="Contact Us" />
      <section className="contact-top pt-120">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-6 ">
              <div className="contact-item">
                <div className="contact-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/icons/contact01.png"
                    alt=""
                  />
                </div>
                <div className="contact-item__content">
                  <h5 className="contact-item__title">
                    {" "}
                    {settings?.contactPhone}{" "}
                  </h5>
                  <p className="contact-item__desc">
                    {" "}
                    Accompanied By English versions{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 ">
              <div className="contact-item">
                <div className="contact-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/icons/contact02.png"
                    alt=""
                  />
                </div>
                <div className="contact-item__content">
                  <h5 className="contact-item__title">
                    {" "}
                    {settings?.contactAddress}{" "}
                  </h5>
                  <p className="contact-item__desc">
                    {" "}
                    including versions of Lorem Ipsum{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 ">
              <div className="contact-item">
                <div className="contact-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/icons/contact03.png"
                    alt=""
                  />
                </div>
                <div className="contact-item__content">
                  <h5 className="contact-item__title">
                    {" "}
                    <a
                      href="/cdn-cgi/l/email-protection"
                      className="__cf_email__"
                      data-cfemail="b1f8dfd7de808382f1f6dcd0d8dd9fd2dedc"
                    >
                      {settings?.contactEmail}{" "}
                    </a>
                  </h5>
                  <p className="contact-item__desc">
                    {" "}
                    including versions of Lorem Ipsum{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6  d-lg-none d-block">
              <div className="contact-item">
                <div className="contact-item__thumb">
                  <img
                    src="https://template.viserlab.com/viserpet/demos/assets/images/icons/contact01.png"
                    alt=""
                  />
                </div>
                <div className="contact-item__content">
                  <h5 className="contact-item__title">
                    {" "}
                    {settings?.contactPhone}{" "}
                  </h5>
                  <p className="contact-item__desc">
                    {" "}
                    Accompanied By English versions{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="contact-bottom py-120 ">
        <div className="container">
          <div
            className="bg-img"
            style={{
              backgroundImage:
                "url(https://template.viserlab.com/viserpet/demos/assets/images/thumbs/contact-bg.png)",
            }}
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-bottom__inner">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-9 col-md-10 col-sm-10">
                      <div className="contactus-form">
                        <div className="contactus-form__thumb-one">
                          <img
                            src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/contact03.png"
                            alt=""
                          />
                        </div>
                        <div className="contactus-form__thumb-two">
                          <img
                            src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/contact04.png"
                            alt=""
                          />
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="section-heading">
                              <h4 className="section-heading__title style-four">
                                Send Your Message{" "}
                                <span className="section-heading__bars"></span>
                              </h4>
                            </div>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <InputField
                                    type="text"
                                    placeholder="Yor Name"
                                    label="Your Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="form-group">
                                  <InputField
                                    type="email"
                                    placeholder="Email Address"
                                    label="Email Address"
                                    id="email" // ✅ ID use kar rahe hain
                                    value={formData.email}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <div className="form-group">
                                  <label htmlFor="message" className="mb-2">
                                    Your Message{" "}
                                  </label>
                                  <textarea
                                    className="form--control"
                                   id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="col-sm-12 text-center">
                                <button className="btn btn--base pill">
                                  SEMD YOUR MESSAGE{" "}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;

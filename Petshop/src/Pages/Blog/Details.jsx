import { useLocation } from "react-router-dom";
import useGenarlStore from "../Store/GenralStore";
import { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import Toppage from "../../Components/Toppage";
import { Helmet } from "react-helmet-async";
function Details() {
  const { singleBlog, fetchSingleBlog, loading, error } = useGenarlStore();
  const location = useLocation();
  const blogId = location.state?.blogId;
  useEffect(() => {
    if (blogId) fetchSingleBlog(blogId);
  }, [blogId, fetchSingleBlog]);

  if (loading)
    return (
      <div className="text-center my-5  container mx-auto">
        <BallTriangle color="#00BFFF" height={80} width={80} />
      </div>
    );

  if (error) return <p className="text-center text-danger">{error}</p>;

  if (!singleBlog || !singleBlog.sections)
    return <p className="text-center">No blog found.</p>;

  const metaTitle = singleBlog?.metaTitle || "Blog Details";
  const metaDescription =
    singleBlog?.metaDescription || "Detailed view of our latest blog post.";
  const metaKeywords =
    singleBlog?.metakeywords?.join(", ") || "blog, article, pet";
  const metaImage =
    singleBlog?.sections?.find((s) => s.type === "image")?.content || "";
  console.log(metaTitle);

  return (
    <>
      {metaTitle && (
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={metaKeywords} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={metaImage} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDescription} />
          <meta name="twitter:image" content={metaImage} />
        </Helmet>
      )}

      <Toppage pagename={"Blog Details"} />
      <section className="blog-detials py-120">
        <div className="container">
          <div className="row gy-5 justify-content-center flex-wrap-reverse ">
            <div className="col-lg-4">
              <div className="blog-sidebar-wrapper">
                <div className="blog-sidebar">
                  <form action="#" autoComplete="off">
                    <div className="search-box w-100">
                      <input
                        type="text"
                        className="form--control style-two"
                        placeholder="Email Address"
                      />
                      <button type="submit" className="search-box__button">
                        <i className="las la-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
                <div className="blog-sidebar">
                  <h5 className="blog-sidebar__title"> Category </h5>
                  <ul className="text-list style-category">
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        Cad Food (5)
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        Accessories (20)
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        Pet Training (18)
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        Veterinary (02)
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="blog-sidebar">
                  <h5 className="blog-sidebar__title"> Popular Post </h5>
                  <div className="latest-blog">
                    <div className="latest-blog__thumb">
                      <a href="blog-details.html">
                        <img
                          src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog04.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="latest-blog__content">
                      <h6 className="latest-blog__title">
                        <a href="blog-details.html">
                          Analysing Potential Problem
                        </a>
                      </h6>
                      <span className="latest-blog__date">August 25 2021</span>
                    </div>
                  </div>
                  <div className="latest-blog">
                    <div className="latest-blog__thumb">
                      <a href="blog-details.html">
                        <img
                          src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog05.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="latest-blog__content">
                      <h6 className="latest-blog__title">
                        <a href="blog-details.html">
                          Wherefore always free from repetiti.
                        </a>
                      </h6>
                      <span className="latest-blog__date">August 25 2021</span>
                    </div>
                  </div>
                  <div className="latest-blog">
                    <div className="latest-blog__thumb">
                      <a href="blog-details.html">
                        <img
                          src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog06.png"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="latest-blog__content">
                      <h6 className="latest-blog__title">
                        <a href="blog-details.html">
                          Eum soluta nobis gendi optio cumque.
                        </a>
                      </h6>
                      <span className="latest-blog__date">August 25 2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="blog-details blog-details__content">
                {singleBlog.sections.map((section, index) => {
                  if (section.type === "title") {
                    return (
                      <h3 key={index} className="blog-details__title">
                        {section.content}
                      </h3>
                    );
                  }
                  if (section.type === "paragraph") {
                    return (
                      <p
                        key={index}
                        className="blog-details__desc"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      ></p>
                    );
                  }
                  if (section.type === "list") {
                    return (
                      <ul key={index} className="blog-details__list">
                        {section.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (section.type === "image") {
                    const nextSection = singleBlog.sections[index + 1];
                    const isPairImage =
                      nextSection && nextSection.type === "image";

                    return (
                      <div
                        key={index}
                        className={`${
                          isPairImage ? "col-lg-12 pb-4" : "col-lg-12"
                        } blog-details__thumb`}
                      >
                        <div className="blog-details-inner__thumb">
                          <img src={section.content} alt="Blog" />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;

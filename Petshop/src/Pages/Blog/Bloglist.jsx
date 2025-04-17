/* eslint-disable no-useless-escape */
import { useEffect } from "react";
import Toppage from "../../Components/Toppage";
import useGenarlStore from "../Store/GenralStore";
import { Link } from "react-router-dom";
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
function Bloglist() {
  const { blogs, fetchBlogs, loading } = useGenarlStore();

  useEffect(() => {
    fetchBlogs();
    console.log(blogs);
  }, []);

  return (
    <>
      <Toppage pagename={"Blog Post"} />
      <div className="blog-section py-120">
        <div className="container">
          <div className="row flex-wrap-reverse gy-5">
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
                <div className="blog-sidebar">
                  <h5 className="blog-sidebar__title"> Archives </h5>
                  <ul className="text-list style-category">
                    <li className="text-list__item">
                      <a href="blog-details.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        May 2000
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog-details.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        Jun 2008
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog-details.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        August 2010
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog-details.html" className="text-list__link">
                        <span className="text-list__icon">
                          <i className="fas fa-angle-right"></i>
                        </span>
                        December 2021
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="blog-sidebar">
                  <h5 className="blog-sidebar__title"> Tags </h5>
                  <ul className="text-list style-tag">
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        Baber
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        Food
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        Cat
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        dog Food
                      </a>
                    </li>
                    <li className="text-list__item">
                      <a href="blog.html" className="text-list__link">
                        Cat
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="blog-sidebar">
                  <h5 className="blog-sidebar__title"> Instagram </h5>
                  <div className="toggle-thumbs justify-content-between d-flex align-items-center flex-wrap">
                    <a
                      href="assets/images/thumbs/blog/blog06.png"
                      className="gallery-popup"
                    >
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog06.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="assets/images/thumbs/blog/blog07.png"
                      className="gallery-popup"
                    >
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog07.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="assets/images/thumbs/blog/blog08.png"
                      className="gallery-popup"
                    >
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog08.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="assets/images/thumbs/blog/blog09.png"
                      className="gallery-popup"
                    >
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog09.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="assets/images/thumbs/blog/blog10.png"
                      className="gallery-popup"
                    >
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog10.png"
                        alt=""
                      />
                    </a>
                    <a
                      href="assets/images/thumbs/blog/blog11.png"
                      className="gallery-popup"
                    >
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/blog/blog11.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <div className="row gy-4 justify-content-center align-items-center">
                  {blogs.map((blog) => {
                    const titleSection = blog.sections.find(
                      (sec) => sec.type === "title"
                    );
                    const imageSection = blog.sections.find(
                      (sec) => sec.type === "image"
                    );
                    const title = titleSection?.content || "untitled";
                    const paragraphSection = blog.sections.find(
                      (sec) => sec.type === "paragraph"
                    );
                    return (
                      // 👈 Yeh return add karna zaroori hai
                      <div key={blog._id} className="blog-card-wrapper">
                        <Link
                          to={`/blog/${slugify(title)}`}
                          state={{ blogId: blog._id }}
                          className="blog-card-wrapper__thumb"
                        >
                          <img
                            src={imageSection.content}
                            alt={titleSection?.content || "Blog Image"}
                          />
                        </Link>
                        <div className="blog-card-wrapper__content">
                          <h4 className="blog-card-wrapper__title">
                            <Link
                              to={`/blog/${slugify(title)}`}
                              state={{ blogId: blog._id }}
                              className="blog-card-wrapper__title-link"
                            >
                              {titleSection
                                ? titleSection.content
                                : "Untitled Blog"}
                            </Link>
                          </h4>
                          <span className="blog-card-wrapper__date">
                            {new Date(blog.createdAt).toDateString()}
                          </span>
                          <div
                            className="blog-card-wrapper__desc"
                            dangerouslySetInnerHTML={{
                              __html:
                                paragraphSection?.content ||
                                "<p>No description available.</p>",
                            }}
                          ></div>
                          <div className="blog-card-wrapper__icon">
                            <Link
                              to={`/blog/${slugify(title)}`}
                              state={{ blogId: blog._id }}
                              className="blog-card-wrapper__button"
                            >
                              Continue Reading
                              <span className="blog-card-wrapper__button-icon">
                                <i className="fas fa-angle-right"></i>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bloglist;

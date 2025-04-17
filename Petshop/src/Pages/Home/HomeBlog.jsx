/* eslint-disable no-useless-escape */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGenarlStore from "../Store/GenralStore";
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
function HomeBlog() {
  const { blogs, fetchBlogs, loading } = useGenarlStore();

  useEffect(() => {
    fetchBlogs();
    console.log(blogs);
  }, [fetchBlogs]);

  return (
    <section className="blog py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2 className="section-heading__subtitle">Blog Post</h2>
              <h3 className="section-heading__title style-two">
                Latest news post <span className="section-heading__bars"></span>{" "}
              </h3>
            </div>
          </div>
        </div>
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
              return (
                // 👈 Yeh return add karna zaroori hai
                <div key={blog._id} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="blog-item">
                    <div className="blog-item__thumb">
                      <Link
                        to={`/blog/${slugify(title)}`}
                        state={{ blogId: blog._id }}
                        className="blog-item__thumb-link"
                      >
                        {imageSection ? (
                          <img
                            src={imageSection.content}
                            alt={titleSection?.content || "Blog Image"}
                          />
                        ) : (
                          <img
                            src="/default-image.jpg"
                            alt="Default Blog Image"
                          />
                        )}
                      </Link>
                    </div>
                    <div className="blog-item__date">
                      <span className="blog-item__month">
                        {new Date(blog.createdAt).getDate()}
                      </span>
                      <span className="blog-item__month">
                        {new Date(blog.createdAt).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="blog-item__content">
                      <h4 className="blog-item__title">
                        <Link
                          state={{ blogId: blog._id }}
                          to={`/blog/${slugify(title)}`}
                          className="blog-item__title-link"
                        >
                          {titleSection
                            ? titleSection.content
                            : "Untitled Blog"}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomeBlog;

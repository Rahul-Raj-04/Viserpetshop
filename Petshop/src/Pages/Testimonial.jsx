
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonial() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false
  };

  return (
    <>
      <div className="testimonial-section py-60 " >
        <div className="container">
          <div className="row align-items-center flex-wrap">
            <div className="col-lg-6">
              <div className="testimonials-thumb-slider">
                <Slider {...settings}>
                  <div className="testimonial-thumb">
                    <img
                      src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/t-1.png"
                      alt="Testimonial 1"
                    />
                  </div>
                  <div className="testimonial-thumb">
                    <img
                      src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/testimonial-img.png"
                      alt="Testimonial 2"
                    />
                  </div>
                  <div className="testimonial-thumb">
                    <img
                      src="https://template.viserlab.com/viserpet/demos/assets/images/thumbs/t-2.png"
                      alt="Testimonial 3"
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="testimonial-slick-slider">
                <Slider {...settings}>
                  <div className="testimonial-slider">
                    <div className="testimonial-slider__icon">
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/icons/testimonial-icon.png"
                        alt="Icon"
                      />
                    </div>
                    <p className="testimonial-slider__desc">
                      A great about us block helps builds trust between you
                      and your customers. The more content you provide about you
                      and your business, the more reliable you seem.
                    </p>
                    <div className="testimonial-slider__details">
                      <h4 className="testimonial-slider__name">Dianne Russell</h4>
                      <span className="testimonial-slider__designation">
                        Customer
                      </span>
                    </div>
                  </div>
                  <div className="testimonial-slider">
                    <div className="testimonial-slider__icon">
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/icons/testimonial-icon.png"
                        alt="Icon"
                      />
                    </div>
                    <p className="testimonial-slider__desc">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Libero necessitatibus deserunt eligendi dolorem delectus
                      illo impedit nulla.
                    </p>
                    <div className="testimonial-slider__details">
                      <h4 className="testimonial-slider__name">Walton</h4>
                      <span className="testimonial-slider__designation">
                        Customer
                      </span>
                    </div>
                  </div>
                  <div className="testimonial-slider">
                    <div className="testimonial-slider__icon">
                      <img
                        src="https://template.viserlab.com/viserpet/demos/assets/images/icons/testimonial-icon.png"
                        alt="Icon"
                      />
                    </div>
                    <p className="testimonial-slider__desc">
                      A great about us block helps builds trust between you
                      and your customers. The more content you provide about you
                      and your business, the more reliable you seem.
                    </p>
                    <div className="testimonial-slider__details">
                      <h4 className="testimonial-slider__name">Andre Russell</h4>
                      <span className="testimonial-slider__designation">
                        Customer
                      </span>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testimonial;

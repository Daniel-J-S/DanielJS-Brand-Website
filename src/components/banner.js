import React, { Component } from "react";
import Slider from "react-slick";
import Img from "gatsby-image";

var settings = {
  dots: true,
  speed: 500,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default class Banner extends Component {
  render() {

    const { BannerData } = this.props;

    return (
      <div className="slider-section">
        <Slider {...settings}>
          {BannerData.map((items, i) => (
            <div key={i} className="item">
              <div className="site-Banner">
                <Img sizes={items.node.image.fluid} />
                <div className="Banner-details">
                  <div>
                    <h1>{items.node.title}</h1>
                    <span className="sub-title">{items.node.subHeading}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
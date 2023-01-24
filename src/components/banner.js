import React, { Component } from 'react';
import Slider from 'react-slick';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// TODO: Remove Slider

export default class Banner extends Component {

  state = {
    subHeadingSection: 0
  }


  subHeadings = {
    0: 'I TEACH CAREER CHANGERS HOW TO CODE',
    1: 'I BUILD HIGH QUALITY WEBSITES FOR BUSINESSES.',
    2: 'I COACH AND MENTOR SOFTWARE DEVELOPERS.',
  }

  settings = {
    dots: true,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 0
  }

  timerId = null


  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState(prevState => ({
        subHeadingSection: ++prevState.subHeadingSection % 3
      }));
    }, 3500);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {

      const {
        bannerData
      } = this.props;
      const image = getImage(bannerData.image);

    return (
      <div className="slider-section">
        <Slider {...this.settings}>
          <div className="item">
            <div className="site-Banner">
              <GatsbyImage image={image} alt={bannerData.title}/>
              <div className="Banner-details">
                  <h1>{bannerData.title}</h1>
                <div>
                  <span key={this.state.subHeadingSection} className="sub-title">{this.subHeadings[this.state.subHeadingSection]}</span>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
};
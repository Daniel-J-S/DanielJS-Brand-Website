import React, { Component } from 'react';
import Slider from 'react-slick';

var settings = {
  dots: true,
  speed: 500,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 0
};



export default class Banner extends Component {

    state = {
      subHeadingSection: 0
    }


    subHeadings = {
      0: 'I TEACH CAREER CHANGERS HOW TO CODE',
      1: 'I BUILD HIGH QUALITY WEBSITES FOR BUSINESSES.',
      2: 'I COACH AND MENTOR SOFTWARE DEVELOPERS.',
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

    const { BannerData } = this.props;

    return (
      <div className="slider-section">
        <Slider {...settings}>
          {BannerData.map((items, i) => (
            <div key={i} className="item">
              <div className="site-Banner">
                <div className="Banner-details">
                    <h1>{items.node.title}</h1>
                  <div>
                    <span key={this.state.subHeadingSection} className="sub-title">{this.subHeadings[this.state.subHeadingSection]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
};
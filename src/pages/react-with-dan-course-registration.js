import React from 'react';
import Seo from '../components/seo';
import { graphql } from 'gatsby';

const ReactWithDanCourseRegistration = ({ location, data: { course } }) => {    
  
  return (
    <>
      <Seo 
        title="React With Dan Course Registration" 
        keywords={[`React With Dan Course Registration`, `Courses`, `Training`]} 
        description="Check out my latest live classes available for purchase"
        location={location}
      />
      <div className="container details-page pt-5 pb-5">
        <div className="product-details pt-5">
          <div className="row ml-0 mr-0">
          <div className="col-md-6 text-center text-md-left">
            </div>
            <div className="col-md-6 heading-section">
              <h2>"{course.name}" Course <small><i>(Currently Not Accepting Enrollees)</i></small></h2> 
              <span className="price">${course.price}.00</span>
              <br />
              <button
                  className="Product snipcart-add-item mt-2 mb-5"
                  data-item-id={`/react-with-dan-course-registration`}
                  data-item-price={course.price}
                  data-item-name={`React With Dan`}
                  data-item-url={`/react-with-dan-course-registration`}
                  data-item-shippable={false}
                  data-item-taxable={false}
                  data-item-weight={0}
                  style={{opacity: .6, cursor: 'not-allowed'}}
                  disabled={true}
                  >
                  <i className="fas fa-tags" />
                  Add to Cart
                </button> 
            </div>
          </div>
          <div
          className="container"
            dangerouslySetInnerHTML={{
              __html: course.details.childMarkdownRemark.html
            }}
          />
        </div>
      </div>
    </>
  );
}


export default ReactWithDanCourseRegistration;

export const query = graphql`
query ReactWithDanCourseRegistrationQuery {
  course: contentfulCourse(name: {eq: "React With Dan"}) {
    name
    price
    rating
    slug
    details {
      childMarkdownRemark {
        html
      }
    }
  }
}`;

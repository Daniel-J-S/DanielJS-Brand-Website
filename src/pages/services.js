import React, { useState } from 'react';
import { navigate, graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/seo';


function IndexPost ({ services }) {
    return (
        <React.Fragment>
          <div className="row product-main">
            {services.edges.sort((a, b) => b.node.title - a.node.title).map(({ node: { id, title, description, image }}) => {
              return (
                <div key={id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4 text-dark mt-4">
                  <div className="details_List">
                    {image === null ? <div className="no-image">No Image</div> : <Img sizes={image.fluid} />}
                    <div className="details_inner">
                      <h2>
                          {title}
                      </h2>
                      <p dangerouslySetInnerHTML={{__html: description.childMarkdownRemark.html }}/>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </React.Fragment>
    );
  }

function WorkRequest({ location, data: { allContentfulService }}) {

    const [state, setState] = useState(resetState());

    const encode = (data) => {
        const {name, email, businessName, businessURL, message} = data
        return `form-name=Work+Request&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&businessName=${encodeURIComponent(businessName)}&businessURL=${encodeURIComponent(businessURL)}&message=${encodeURIComponent(message)}`
    }

    function handleChange(e) {
        setState({...state, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch('/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: encode(state)
        })
        setState(resetState(true));

        setTimeout(() => {
            navigate('/');
            setState(resetState());
        }, 2500)
    }

    function resetState(formSubmitted=false) {
        return { 
            name: "", 
            email: "", 
            message: "",
            businessName: "",
            businessURL: "", 
            formSubmitted
        }
    }
    return (
        <>
            <SEO title="Request for Web Development" description="Need a new website or updates to an existing site? I would love to dicuss how we can optimize your web presence" />
            <div className="Contact-us mt-5 Page">
                <div className="container">
                <div className="Blog-section mt-5">
                    <div className="pt-5">
                        <h1>Services</h1>
                        <IndexPost services={allContentfulService} />
                        </div>
                    </div>
                    <h2>Request a Proposal</h2>
                    <p>Need a new website or updates to an existing site? I would love to dicuss how we can optimize your web presence.</p>
                    {state.formSubmitted ? <p>Thank you for contacting me!</p> :
                        <form className="mt-5" name="Work Request" data-netlify="true" onSubmit={handleSubmit}>
                            <input type="hidden" name="form-name" value="Work Request" />
                            <div>
                                <label>Your name
                                <input placeholder="Alan Turing" type="text" name="name" required value={state.name}  onChange={handleChange}/></label>
                            </div>
                            <div>
                                <label>Your Email: 
                                <input placeholder="ada@lovelace.com" type="email" name="email" required value={state.email}  onChange={handleChange}/></label>
                            </div>
                            <div>
                                <label>Your Business Name: 
                                <input placeholder="ACME" type="text" name="businessName" required value={state.businessName}  onChange={handleChange}/></label>
                            </div>
                            <div>
                                <label>Your Current Business Website URL: 
                                <input placeholder="https://www.mybusiness.com" type="text" name="businessURL" required value={state.businessURL}  onChange={handleChange}/></label>
                            </div>
                            <div>
                                <label>What do you need help with?: 
                                <textarea placeholder="I need a super amazing website" name="message" required value={state.message} onChange={handleChange}></textarea></label>
                            </div>
                            <div>
                                <button className="btn btn-dark" type="submit" required>Send</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </>
    );
}

export const query = graphql`
    query ServicesQuery {
        allContentfulService {
            edges {
                node {
                    id
                    title
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                    image {
                        fluid(maxWidth: 1000) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                    }
                }
            }
        }
    }
}`

export default WorkRequest;

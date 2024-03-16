import React, { useState } from 'react';
import { navigate, graphql } from 'gatsby';
import Seo from '../components/seo';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';


function IndexPost ({ services }) {
    return (
        <React.Fragment>
          <div className="row product-main">
            {services.edges.sort((a, b) => a.node.ranking - b.node.ranking).map(({ node: { id, title, description, image }}) => {
            const imageAsset = getImage(image);
              return (
                <div key={id} className="Catalogue__item col-sm-12 col-md-6 col-lg-4 text-dark mt-4">
                  <div className="details_List no-hover border-dark rounded">
                    {
                        image === null 
                        ? <div 
                            className="no-image">
                                No Image
                          </div> 
                        : <GatsbyImage 
                            className="border-bottom border-dark" 
                            image={imageAsset} 
                            alt={title}
                           />
                    }
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

function WorkRequest({ data: { allContentfulService }}) {

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
            <Seo title="Request for Web Development" description="Need a new website or updates to an existing site? I would love to dicuss how we can optimize your web presence" />
            <div className="Contact-us mt-5 Page">
                <div className="container">
                    <div className="Blog-section mt-5">
                        <div className="pt-5">
                            <h1>Need help with Your Website, Web Application, Desktop Application or Other Software Solution?</h1>
                            <IndexPost services={allContentfulService} />
                            </div>
                        </div>
                    <div className="container p-5">
                    <h2>Request a Proposal</h2>
                    <p>I can make improvements to existing digital assets like these, or build new ones</p>
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
                ranking
                description {
                    childMarkdownRemark {
                        html
                    }
                }
                image {
                    gatsbyImageData(width: 5000)
                }
            }
        }
    }
}`;

export default WorkRequest;

import React, { useState } from 'react';
import Layout from '../components/layout';
import { navigate } from 'gatsby';
import SEO from '../components/seo';

function WorkRequest({ location }) {
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
        <Layout location={location}>
            <SEO title="Request for Web Development" description="Need a new website or updates to an existing site? I would love to dicuss how we can optimize your web presence" />
            <div className="Contact-us">
                <div className="container">
                    <h1>Work Request</h1>
                    <p>Need a new website or updates to an existing site? I would love to dicuss how we can optimize your web presence</p>
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
        </Layout>
    );
}

export default WorkRequest;

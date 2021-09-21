import React, { useState } from 'react'

function Form(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        message: "",
        formSubmitted: false
    });

    const encode = (data) => {
        const {name, email, message} = data
        return `form-name=contact&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
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
        setState({
            name: "",
            email: "",
            message: "",
            formSubmitted: true
        });
    }

    return (
        <>
            {state.formSubmitted ? <p>Thank you for contacting me!</p> :
                <form name="contact" data-netlify="true" onSubmit={handleSubmit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div>
                        <label>Your name
                        <input placeholder="Alan Turing" type="text" name="name" required value={state.name}  onChange={handleChange}/></label>
                    </div>
                    <div>
                        <label>Your Email: 
                        <input placeholder="ada@lovelace.com" type="email" name="email" required value={state.email}  onChange={handleChange}/></label>
                    </div>
                    <div>
                        <label>Message: 
                        <textarea placeholder="Hey! What's up?" name="message" required value={state.message} onChange={handleChange}></textarea></label>
                    </div>
                    <div>
                        <button className="btn btn-dark" type="submit" required>Send</button>
                    </div>
                </form>
            }
       
        </>
    );
}

export default Form;
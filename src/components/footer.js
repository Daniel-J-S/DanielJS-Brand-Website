import React, { Component } from 'react';
import SocialIcons from './social-icons';
import { Link } from 'gatsby';

class Footer extends Component {
    render() {
        return (
            <footer className="site-footer mt-5">
                <div className="footer_inner">
                    <div className="container">
                        <div className="footer-widget footer-content">
                            <section id="nav_menu-8" className="widget widget_nav_menu">
                                <div className="menu-main-container">
                                    <ul id="menu-main" className="menu">
                                        <li>
                                            <span tabIndex="0" role="link" className="snipcart-customer-signin">My Account</span>
                                        </li>
                                        <li>
                                            <Link to="/videos">My Videos</Link>

                                        </li>
                                        <li>
                                            <Link to="/proposal-request">Proposal Request</Link>
                                        </li>
                                        <li>
                                            <Link to="/resume">Resume</Link>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="footer-bottom social-right-menu mt-3">
                        <SocialIcons />
                            <div className="site-info">
                                © {new Date().getFullYear()} DanielJS. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer

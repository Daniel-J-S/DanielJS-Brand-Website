import React, { Component } from 'react';
import SocialIcons from './social-icons';
import { Link } from 'gatsby';

class Footer extends Component {
    render() {
        return (
            <footer className="site-footer mt-5" style={{ opacity: this.props.darkenBackground ? '.2': '1', animation: this.props.darkenBackground ? 'fadeOut 500ms ease-out backwards':''}}>
                <div className="footer_inner">
                    <div className="container">
                        <div className="footer-widget footer-content">
                            <section id="nav_menu-8" className="widget widget_nav_menu">
                                <div className="menu-main-container">
                                    <ul id="menu-main" className="menu">
                                        <li>
                                            <Link to="/services">Services</Link>
                                        </li>
                                        {/* <li>
                                            <span className="snipcart-customer-signin">Manage Account</span>
                                        </li> */}
                                        <li>
                                            <Link to="/articles">Articles</Link>
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

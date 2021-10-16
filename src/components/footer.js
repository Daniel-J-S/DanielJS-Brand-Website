import React, { Component } from "react";
import SocialIcons from "./social-icons";

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
                                        {/* <li><Link to="/about">About</Link></li> */}
                                        {/* <li><Link to="/blogs">Articles</Link></li> */}
                                        {/* <li><Link to="/store">Store</Link></li> */}
                                        {/* <li><Link to="/contact-us">Contact</Link></li> */}
                                        {/* <li><Link to="/copyright">Copyright</Link></li> */}
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div className="footer-bottom social-right-menu ">
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

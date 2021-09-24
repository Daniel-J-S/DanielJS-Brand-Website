import React, { Component } from "react";
import Img from "gatsby-image"
import { Link } from "gatsby"

export default class LatestBlogs extends Component {
    render() {

        const { data } = this.props;

        return (
            <div className="container mt-5 mb-3" id="articles">
                <hr />
                <div className="pt-5 pb-5">
                    <h2 className="mb-3">
                        <Link className="text-dark" to="/blogs">
                            Latest Articles
                        </Link>
                    </h2>
                <ul className="latest-blog">
                    {data.edges.map(items => (
                        <li key={items.node.id}>
                            <div className="inner">
                                <Link to={`/${items.node.slug}`}></Link>
                                <Img sizes={items.node.featureImage.fluid} />
                                <h2>{items.node.title}</h2>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
                <hr />
            </div>
        );
    }
}
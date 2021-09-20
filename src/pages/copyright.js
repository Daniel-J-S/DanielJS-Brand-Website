import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class Copyright extends React.Component {
    render() {
        return (
            < Layout >
                <SEO title="Copyright" keywords={[`gatsby`, `Copyright`, `react`]} />
                <div className="site-About">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>Copyright</h2>
                                <p>© {new Date().getFullYear()} DanielJS. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ Layout>
        )
    }
}

export default Copyright

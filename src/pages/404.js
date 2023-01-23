import React from "react"
import Seo from "../components/seo"

const NotFoundPage = ({ location }) => (
  <>
    <Seo 
      description="You've requested a page that doesn't exist" 
      title="404: Not found" 
      keywords={[`Not Found`, `404`, `Whoops`]}
      location={location}
     />
    <div className="container not-found Page">
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </>
)

export default NotFoundPage

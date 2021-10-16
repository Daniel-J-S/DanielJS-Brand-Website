import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Posts from '../components/posts';
import algorithmChallengeVideos from '../data/algorithm-challenge-videos.json';

function Videos({ location }) {
    return(
        <Layout location={location}>
        <SEO title="My Videos" description="Check out my latest videos where I demonstrate how to solve FreeCodeCamp's Algorithm Challenges"/>
            <div className="Blog-section Page">
                <Posts data={algorithmChallengeVideos} title="My Videos" />
            </div>
        </Layout>
    );
}

export default Videos;
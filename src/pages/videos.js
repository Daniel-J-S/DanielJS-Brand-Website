import React, {useState, useEffect} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Posts from '../components/posts';
import algorithmChallengeVideos from '../data/algorithm-challenge-videos.json';

function Videos({ location }) {

    const [isSmallScreen, setIsSmallScreen] = useState(true);
    
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 992px)');
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
  
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }, []);
  
  
    const handleMediaQueryChange = mediaQuery => {
      if (mediaQuery.matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    return(
        <Layout location={location}>
        <SEO title="My Videos" description="Check out my latest videos where I demonstrate how to solve FreeCodeCamp's Algorithm Challenges"/>
            <div className="Blog-section Page">
                <Posts isSmallScreen={isSmallScreen} data={algorithmChallengeVideos} title="My Videos" />
            </div>
        </Layout>
    );
}

export default Videos;
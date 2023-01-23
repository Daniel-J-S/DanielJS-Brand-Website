import React, {useState, useEffect} from 'react';
import Seo from '../components/seo';
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
        <>
        <Seo title="My Videos" description="Check out my latest videos where I demonstrate how to solve FreeCodeCamp's Algorithm Challenges"/>
            <div className="Blog-section Page">
                <Posts isSmallScreen={isSmallScreen} data={algorithmChallengeVideos} title="My Videos" />
            </div>
        </>
    );
}

export default Videos;
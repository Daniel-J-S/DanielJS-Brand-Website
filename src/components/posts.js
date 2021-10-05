import React, { useState, useEffect } from 'react';


export default function Posts (props) {
    const [isSmallScreen, setIsSmallScreen] = useState(true);

        useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1065px)');
        
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

    function processData(data) {
        const arr = Object.entries(data);
        if(isSmallScreen) arr.splice(0, 6);
        return arr;
    }

    return (
        <div className="container mt-5 mb-3" id="articles">
            <div className="pt-5 pb-5 mb-5">
                <h2 className="mb-5">
                    {props.title}
                </h2>
                <div className="latest-posts mb-1">
                    {processData(props.data).map(item => (
                        <div key={item[1]}>
                            <iframe width="350" height="225" src={`https://www.youtube.com/embed/${item[1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                    ))}
                </div>
            </div>
            <hr />
        </div>
    );
}
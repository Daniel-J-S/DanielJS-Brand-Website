import React from 'react';


export default function Posts ({ data, title }) {

    function processData(data) {
        const arr = Object.entries(data);
        return arr;
    }

    return (
        <div className="container mb-3" id="videos">
            <div className="pt-5 pb-5 mb-5">
                <h1 className="mb-5 section-title">
                    {title}
                </h1>
                <div className="latest-posts mb-1">
                    {processData(data).map(item => (
                        <div key={item[1]} className="mt-3 mb-3">
                            <iframe width="350" height="225" src={`https://www.youtube.com/embed/${item[1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
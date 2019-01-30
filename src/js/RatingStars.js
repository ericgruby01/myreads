import React from 'react';

/**
 * If 5 is the highest note, then how much % 4.5 is from 5:
 * (4.5/5)*100 = 90.
 * 4.5 is 90% of 5.
 */
const RatingStars = ({stars}) => (
    <div className="rating-stars">
        <div className="stars-bg"></div>
        <div className="stars" style={{width: `${(stars/5)*100}%`}}></div>
    </div>
);

export default RatingStars;
import React from 'react';

const BookCover = ({cover, title}) => {
   return cover !== undefined ? (
        <div onClick={console.log} className="cover" style={{backgroundImage: `url(${cover.thumbnail})`}}></div>
    ) : (
        <div className="cover no-cover">
            <img src="images/my-reads.svg" alt={title}/>
        </div>
    )
}

export default BookCover;
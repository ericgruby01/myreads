import React from 'react';

import Breadcrumbs from './Breadcrumbs';

const Credits = () => {
    return (
        <div id="credits">
            <Breadcrumbs crumbs={[{text: 'Back', link: 'back'}]}></Breadcrumbs>
            <h1>Credits</h1>
            <p><strong>Code</strong> - Eric Gruby</p>
            <p><strong>VanillaTilt</strong> - Tilt effect on the book covers <a href="https://micku7zu.github.io/vanilla-tilt.js/" rel="noopener noreferrer" target="_blank">Link &rarr;</a></p>
            <p><strong>Popmotion</strong> - Smooth movement when shelves are dragged <a href="https://popmotion.io" rel="noopener noreferrer" target="_blank">Link &rarr;</a></p>
            <p><strong>Icons</strong> - <a href="http://flaticon.com" rel="noopener noreferrer" target="_blank">Flaticon &rarr;</a></p>
            <p><strong>Logo</strong> - <a href="http://freepik.com" rel="noopener noreferrer" target="_blank">Freepik &rarr;</a></p>
            <p><strong>Thanks, <a href="http://udacity.com" rel="noopener noreferrer" target="_blank">Udacity</a></strong> for teaching me React :)</p>
        </div>
    );
}

export default Credits;
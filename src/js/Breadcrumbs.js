import React from 'react';
import { Link } from 'react-router-dom';

const urlify = string => string.toLowerCase().replace(/\s/, '-');

function Breadcrumbs(props) {
    return (
        <ul id="breadcrumbs">
            {props.crumbs.map(crumb => {
                if (crumb.active) {
                    return <li key={urlify(crumb.text)}><span className="active">{crumb.text}</span></li>
                } else {
                    if (crumb.link === 'back') {
                        return <li key={urlify(crumb.text)}><a href="back" onClick={e => {e.preventDefault(); window.history.back();}}>{crumb.text}</a></li>
                    } else {
                        return <li key={urlify(crumb.text)}><Link to={crumb.link}>{crumb.text}</Link></li>
                    }
                }
            })}
        </ul>
    )
}

export default Breadcrumbs;
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = props => {
    return (
        <div className="empty">
            <div className="icon">
                <i className="flaticon-indifferent"></i>
            </div>
            {props.text}<br/>
            {props.link && props.linkText && <Link to={props.link}>{props.linkText}</Link>}
        </div>
    )
}

export default EmptyState;
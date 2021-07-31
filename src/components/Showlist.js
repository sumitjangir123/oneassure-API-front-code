import React from 'react'

export default function Showlist(props) {
    return (
        
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{props.one_user.name}</div>
                {props.one_user.email}
            </div>
            <span className="badge bg-primary rounded-pill">{props.one_user.phone}</span>
        </li>

    )
}

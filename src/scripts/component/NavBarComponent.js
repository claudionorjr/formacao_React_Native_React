import React from 'react'


export default function NavBarComponent(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <a className="nav-link" href='/' onClick={() => {
                    }}>
                        | CANAL 77 - Home <i className="fa fa-tv"></i> |
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#favoritos" onClick={() => {
                        props.controller.addAllNoticesNew()
                        }}>
                        | Favoritos |
                    </a>
                </li>
            </ul>
        </nav>
    )
}




import React from 'react'


/**
 * @description: Exporta por padrão um NavBarComponent.
 * 
 * @author Claudionor Silva <claudionor.junior1994@gmail.com>
 * @version 1.0.0
 * 
 * @param {NoticeViewController} props
 * @returns {NavBarComponent}
 */
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




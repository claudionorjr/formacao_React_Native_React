import React from 'react'
import BSN from 'bootstrap.native'


export default function ModalComponent() {
    const modalStyle = {tabIndex:'-1'}

    return (
        <div id="myModal" className="modal fade" style={modalStyle}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className='modal-header'>
                        <h5 className='modal-title' id="titleModal"></h5>
                    </div>
                    <div className='modal-body'>
                        <p id="contentModal"></p>
                    </div>
                    <div className="card-footer">
                    <button className="btn btn-secondary btn-sm" onClick={() => {
                        let modal = document.getElementById('myModal')
                        new BSN.Modal(modal).hide()
                    }}>
                        Fechar <i className="fa fa-close"></i>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
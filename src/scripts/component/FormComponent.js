import React from 'react'


/**
 * @description: Exporta por padrão um FormComponent.
 * 
 * @author Claudionor Silva <claudionor.junior1994@gmail.com>
 * @version 1.0.0
 * 
 * @param {NoticeViewController} props
 * @returns {FormComponent}
 */
export default function FormComponent(props) {

    return (
        <form id="form-search" onSubmit={(e)=>{
            e.preventDefault()
            props.controller.clickSubmit()

        }}>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Selecione o tipo de noticia</label>
                <select className="form-control" id="select-news" onChange={(e) => {
                    props.controller.clickSelected(e)
                }}>
                    <option value="" disabled defaultValue hidden> Selecione...</option>
                    <option value="top-headlines">Principais Noticias</option>
                    <option value="everything">Noticias Personalizadas</option>
                    <option value="country">Pais</option>
                </select>
            </div>
            <div className="form-group" style={{display:'none'}} id="search">
                <label htmlFor="exampleFormControlSelect1">Consulte por assunto</label>
                <input className="form-control" id="input-search"></input>
            </div>
            <div className="form-group" style={{display:'none'}} id="div-countries">
                <label htmlFor="exampleFormControlSelect1">Selecione o Pais</label>
                <select className="form-control" id="select-countries">
                    <option value="" disabled defaultValue hidden> Selecione...</option>
                    <option value="br">Brasil</option>
                    <option value="us">USA</option>
                </select>
            </div>
            <button type="submit" className="btn btn-success mt-3">Enviar</button>
        </form>
    )
}

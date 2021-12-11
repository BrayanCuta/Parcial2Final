import React from 'react'
import './style.css'
import { FormattedMessage } from "react-intl";

const Table = ({data, onSelected}) => {
    const handleSelection = (id)=> {
        onSelected(id)
    }
    return (
        <div className='Container' style={{padding:"10px"}}>
        <table className="table">
            <thead className="tableHeader">
                <tr>
                    <th className="tableHeader">#</th>
                    <th className="tableHeader"><FormattedMessage id="Name" /> </th>
                    <th className="tableHeader"><FormattedMessage id="Channel" /> </th>
                    <th className="tableHeader"><FormattedMessage id="Seasons" /> </th>
                    <th className="tableHeader"><FormattedMessage id="Episodes" /> </th>
                    <th className="tableHeader"><FormattedMessage id="ReleaseDate" /> </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((serie, i)=>(
                        <tr className='tableRowItems' key={i} onClick={()=> handleSelection(serie.id)}>
                            <td className='tableCell'>{serie.id}</td>
                            <td className='tableCell'>{serie.name}</td>
                            <td className='tableCell'>{serie.channel}</td>
                            <td className='tableCell'>{serie.seasons}</td>
                            <td className='tableCell'>{serie.episodes}</td>
                            <td className='tableCell'>{serie.release}</td>
                        </tr>
                    ))
                    }
            </tbody>
        
        </table>
        </div>
    )
}

export default Table

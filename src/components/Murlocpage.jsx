import React from 'react';
import { Link } from 'react-router-dom';

function Murlocpage() {
    return (
        <div className="text-emerald-600">
            <h1>Murl</h1>
            <input className="border border-emerald-400 rounded shadow-emerald-400 shadow-md" type="text" placeholder="Sök här..."/>
            <h1>Du kan söka direkt genom att lägga till /filmtitel i hemsidans namn</h1>
            <p>Till exempel <span className="font-semibold"><Link to="/gladiator">varkanjag.se/gladiator</Link></span></p>
        </div>
    )
}

export default Murlocpage;
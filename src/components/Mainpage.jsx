import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getSearchRequest, getWhereRequest } from '../utils/api';

function Mainpage() {

    const {id} = useParams();
    const [where, setWhere] = useState([]);

    useEffect(() => {
        async function getSearch() {
            const movie = await getSearchRequest(id);
            const where = await getWhereRequest(movie[0].id);
            setWhere(where);
        }

        getSearch();
    }, [id]);

    console.log(where)

    return (
        <div className="w-screen flex justify-center h-screen items-center">
            <h1 className="font-semibold text-3xl text-emerald-400">Murloc</h1>
            <h1>{id}</h1>
            {where.SE && <ul>
                {where.SE.buy?.map((service) => (
                    <li key={service.provider_id}>
                        köp {service.provider_name}
                    </li>
                ))}
                {where.SE.ads?.map((service) => (
                    <li key={service.provider_id}>
                        reklam {service.provider_name}
                    </li>
                ))}
                {where.SE.free?.map((service) => (
                    <li key={service.provider_id}>
                        gratis {service.provider_name}
                    </li>
                ))}
                {where.SE.flatrate?.map((service) => (
                    <li key={service.provider_id}>
                        Streama {service.provider_name}
                    </li>
                ))}
                {where.SE.rent?.map((service) => (
                    <li key={service.provider_id}>
                        Hyr {service.provider_name}
                    </li>
                ))}
            </ul>}
        </div>
    )
}

export default Mainpage;
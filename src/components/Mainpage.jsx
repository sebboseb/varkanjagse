import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSearchRequest, getWhereRequest } from '../utils/api';

function Mainpage() {

    const { id } = useParams();
    const [where, setWhere] = useState([]);
    const [moviemovie, setMovie] = useState([]);

    useEffect(() => {
        async function getSearch() {
            const movie = await getSearchRequest(id);
            setMovie(movie[0])
            const where = await getWhereRequest(movie[0].id);
            setWhere(where);
        }

        getSearch();
    }, [id]);

    console.log(where)

    return (
        <div className="w-screen h-screen flex flex-col bg-slate-800">
            {/* <h1 className="font-semibold text-3xl text-emerald-400">Murloc</h1> */}
            <div className="w-screen flex flex-col">
                <div className=" z-10">
                    <div className=" bg-gradient-to-t dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 h-2/3 w-full absolute object-cover z-10"></div>
                    <div className=" bg-gradient-to-l dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 h-2/3 w-full absolute object-cover z-10"></div>
                    <div className=" bg-gradient-to-r dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 h-2/3 w-full absolute object-cover z-10"></div>
                    <div className=" bg-gradient-to- dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 h-2/3 w-full absolute object-cover z-10"></div>
                    <img className="h-2/3 w-full absolute object-cover" src={`https://image.tmdb.org/t/p/original${moviemovie.backdrop_path}`} alt={moviemovie.name}></img>
                </div>
                <div className="z-20 w-screen flex flex-col items-center pt-64">
                    <img className=" w-44 border border-white rounded shadow-lg shadow-black" src={`https://image.tmdb.org/t/p/original${moviemovie.poster_path}`} alt="" />
                    <h1 className="text-6xl font-semibold capitalize mb-8 text-white mt-4">{id.replace(/-/g, " ")}</h1>
                </div>
            </div>
            <div className=" text-white w-screen flex justify-center">
                {where.SE && <div className="flex gap-x-3 justify-between w-screen border-t border-slate-600 max-w-5xl pt-4">
                    {where.SE.buy &&
                        <div>
                            <u className="font-semibold">Köp</u>
                            <ul className="">
                                {
                                    where.SE.buy?.map((service) => (
                                        <li className="flex gap-x-3 mt-1 justify-between" key={service.provider_id}>
                                            {service.provider_name} <img className="w-7 rounded" src={`https://image.tmdb.org/t/p/original${service.logo_path}`} alt="" />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                    {where.SE.ads &&
                        <div>
                            <u className="font-semibold">Reklam</u>
                            <ul className="">
                                {where.SE.ads?.map((service) => (
                                    <li className="flex gap-x-3 mt-1 justify-between" key={service.provider_id}>
                                        {service.provider_name} <img className="w-7 rounded" src={`https://image.tmdb.org/t/p/original${service.logo_path}`} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                    {where.SE.free &&
                        <div>
                            <u className="font-semibold">Gratis</u>
                            <ul className="">
                                {where.SE.free?.map((service) => (
                                    <li className="flex gap-x-3 mt-1 justify-between" key={service.provider_id}>
                                        {service.provider_name} <img className="w-7 rounded" src={`https://image.tmdb.org/t/p/original${service.logo_path}`} alt="" />
                                    </li>
                                ))}</ul>
                        </div>
                    }
                    {where.SE.flatrate &&
                        <div>
                            <u className="font-semibold">Streama</u>
                            <ul className="">
                                {where.SE.flatrate?.map((service) => (
                                    <li className="flex gap-x-3 mt-1 justify-between" key={service.provider_id}>
                                        {service.provider_name} <img className="w-7 rounded" src={`https://image.tmdb.org/t/p/original${service.logo_path}`} alt="" />
                                    </li>
                                ))}</ul>
                        </div>
                    }
                    {where.SE.rent &&
                        <div>
                            <u className="font-semibold">Hyr</u>
                            <ul className="">
                                {where.SE.rent?.map((service) => (
                                    <li className="flex gap-x-3 mt-1 justify-between" key={service.provider_id}>
                                        {service.provider_name} <img className="w-7 rounded" src={`https://image.tmdb.org/t/p/original${service.logo_path}`} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>}
            </div>
        </div>
    )
}

export default Mainpage;
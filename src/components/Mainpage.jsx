import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSearchRequest, getWhereRequest, getWhereRequestSeries } from '../utils/api';
import { Link } from 'react-router-dom';

function Mainpage() {

    const { id } = useParams();
    const [where, setWhere] = useState([]);
    const [moviemovie, setMovie] = useState([]);
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        async function getSearch() {
            const movie = await getSearchRequest(id);
            setMovie(movie[0]);
            const where = movie[0].media_type !== 'tv' ? await getWhereRequest(movie[0].id) : await getWhereRequestSeries(movie[0].id);
            setWhere(where);
        }

        getSearch();
    }, [id]);

    const onChange = (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        fetch(`https://api.themoviedb.org/3/search/multi?api_key=e333684dcb3e9eac6a70505572519a23&language=en-US&query=${query}`).then((res) => res.json()).then((data) => {
            if (!data.errors) {
                setMovies(data.results);
                console.log(data.results)
            } else {
                setMovies([]);
            }
        });
    }

    return (
        <div className="w-screen h-auto md:h-screen flex flex-col bg-slate-800">
            <div className="flex w-screen z-50 absolute justify-end">
                <div className="flex flex-col">
                    <input className=" w-56 mt-4 mr-8 rounded p-1 px-5 focus:bg-blue-100" type="text" placeholder="Sök" value={query} onChange={onChange} />
                    <div className="hover:block" id="searchDiv">
                        <ul className="flex flex-col gap-y-1 p-1">
                            {movies.map((resultMovie, index) => (
                                resultMovie.media_type === 'tv' ? 
                                index <= 3 && resultMovie.poster_path &&
                                    <Link to={`/${resultMovie.name}`}>
                                    <div className="flex hover:bg-gray-300 transition delay-75 p-1 rounded">
                                        <img className=" w-12 border border-white rounded" src={`https://image.tmdb.org/t/p/original${resultMovie.poster_path}`} alt="" />
                                        <li className="text-black">{resultMovie.name}</li>
                                    </div>
                                </Link> : 
                                index <= 3 && resultMovie.poster_path &&<Link to={`/${resultMovie.title}`}>
                                    <div className="flex hover:bg-gray-300 transition delay-75 p-1 rounded">
                                        <img className=" w-12 border border-white rounded" src={`https://image.tmdb.org/t/p/original${resultMovie.poster_path}`} alt="" />
                                        <li className="text-black">{resultMovie.title}</li>
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <h1 className="font-semibold text-3xl text-emerald-400">Murloc</h1> */}
            <div className="w-screen flex flex-col">
                <div className=" z-10">
                    <div className=" bg-gradient-to-t dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 md:h-2/3 w-full absolute object-cover z-10"></div>
                    <div className=" bg-gradient-to-l dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 md:h-2/3 w-full absolute object-cover z-10"></div>
                    <div className=" bg-gradient-to-r dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 md:h-2/3 w-full absolute object-cover z-10"></div>
                    <div className=" bg-gradient-to- dark:via-transparent via-transparent dark:from-letterboxd-bg from-slate-800 md:h-2/3 w-full absolute object-cover z-10"></div>
                    <img className="md:h-2/3 h-96 w-full absolute object-cover md:object-[0px,-100px]" src={`https://image.tmdb.org/t/p/original${moviemovie.backdrop_path}`} alt={moviemovie.name}></img>
                </div>
                <div className="z-20 w-screen flex flex-col items-center pt-24 md:pt-64">
                    <img className=" md:w-44 w-32 border border-white rounded shadow-lg shadow-black" src={`https://image.tmdb.org/t/p/original${moviemovie.poster_path}`} alt="" />
                    <h1 className="md:text-6xl text-4xl font-semibold capitalize mb-8 text-white mt-4">{id.replace(/-/g, " ")}</h1>
                </div>
            </div>
            <div className=" text-white w-screen flex justify-center bg-slate-800">
                {where.SE && <div className="flex flex-col md:flex-row gap-y-9 md:gap-x-3 justify-evenly w-screen border-t border-slate-600 md:max-w-5xl max-w-xl pt-4 px-3 md:p-0">
                    {where.SE.buy &&
                        <div className="border-t border-slate-600 md:border-0 w-full text-center md:w-auto md:text-left">
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
                        <div className="border-t border-slate-600 md:border-0 w-full text-center md:w-auto md:text-left">
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
                        <div className="border-t border-slate-600 md:border-0 w-full text-center md:w-auto md:text-left">
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
                        <div className="border-t border-slate-600 md:border-0 w-full text-center md:w-auto md:text-left">
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
                        <div className="border-t border-slate-600 md:border-0 w-full text-center md:w-auto md:text-left">
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
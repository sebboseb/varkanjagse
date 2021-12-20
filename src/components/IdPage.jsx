import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieWithId, getSearchRequest, getTvWithId, getWhereRequest, getWhereRequestSeries } from '../utils/api';
import { Link } from 'react-router-dom';

function IdPage() {

    const { id, mediaType, actualId } = useParams();
    const [where, setWhere] = useState([]);
    const [moviemovie, setMovie] = useState([]);
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [style, setStyle] = useState("flex flex-col gap-y-1 p-1 transition duration-75");

    const [newRender, setNewRender] = useState(true);

    // const location = useLocation()
    // const { idlollol } = location.state

    // console.log(idlollol && idlollol);

    useEffect(() => {
        async function getSearch() {
            if (mediaType === "movie") {
                const movie = await getMovieWithId(actualId);
                setMovie(movie);
                const where = await getWhereRequest(actualId);
                setWhere(where);
            } else {
                const movie = await getTvWithId(actualId);
                setMovie(movie);
                const where = await getWhereRequestSeries(actualId);
                setWhere(where);
            }
            // const movie = await get(id);
            // setMovie(movie[0]);
            // const where = movie[0].media_type !== 'tv' ? await getWhereRequest(movie[0].id) : await getWhereRequestSeries(movie[0].id);
            // setWhere(where);



            // if (idlollol) {
            //     if (mediatype === "movie") {
            //         const movie = await getMovieWithId(idlollol);
            //         setMovie(movie);
            //         const where = await getWhereRequest(movie.id)
            //         setWhere(where);
            //     } else {
            //         const movie = await getTvWithId(idlollol);
            //         setMovie(movie);
            //         const where = await getWhereRequestSeries(movie.id);
            //         setWhere(where);
            //     }
            //     idlollol = null;
            // } else {
            //     const movie = await getSearchRequest(id);
            //     setMovie(movie[0]);
            //     if (movie[0].media_type === "movie") {
            //         const where = await getWhereRequest(movie[0].id);
            //         setWhere(where);
            //     } else {
            //         const where = await getWhereRequestSeries(movie[0].id);
            //         setWhere(where);
            //     }
            // }
        }

        newRender && getSearch();
    }, [id, newRender, actualId]);

    const onChange = (e) => {
        e.preventDefault();

        setQuery(e.target.value);

        fetch(`https://api.themoviedb.org/3/search/multi?api_key=e333684dcb3e9eac6a70505572519a23&language=en-US&query=${e.target.value}`).then((res) => res.json()).then((data) => {
            if (!data.errors) {
                setMovies(data.results);
                // console.log(data.results)
                //    console.log(data.results.reduce((total, item) => {
                //     const exists = total.find(
                //         (movie) => (movie.title || movie.name) === (item.title || item.name)
                //       );
                //     if (exists) {
                //       if (exists.vote_count > item.vote_count) {
                //         return [...total, exists];
                //       } else {
                //         return [...total, item];
                //       }
                //     } else {
                //       return [...total, item];
                //     }
                //   }, []))
            } else {
                setMovies([]);
            }
        });
    }

    async function setMovielol(name, poster, backdrop, media_type, idlol) {
        setNewRender(false);
        if (media_type === 'tv') {
            const movie = await getTvWithId(idlol);
            setMovie(movie);
            // console.log(movie);
        } else {
            const movie = await getMovieWithId(idlol);
            setMovie(movie);
        }

        console.log(moviemovie)

        // setName(name); setPoster(poster); setBackdrop(backdrop);
        const where = media_type !== 'tv' ? await getWhereRequest(idlol) : await getWhereRequestSeries(idlol);
        console.log(where)
        setWhere(where);
    }

    return (
        <div className="w-screen h-screen xl:h-screen flex flex-col bg-slate-800">
            <div className="flex w-screen z-50 absolute justify-center xl:justify-end">
                <div className="flex flex-col">
                    <input onClick={() => setStyle("flex flex-col gap-y-1 p-1")} className=" w-72 xl:w-56 mt-4 xl:mr-8 rounded p-1 px-5 focus:bg-blue-100" type="text" placeholder="Sök" value={query} onChange={onChange} />
                    <div className="hover:block" id="searchDiv">
                        <ul className={movies.length !== 0 ? style : "hidden"}>
                            {movies.map((resultMovie, index) => (
                                resultMovie.media_type === 'tv' ?
                                    index <= 3 && resultMovie.poster_path &&
                                    <Link onClick={() => setMovielol(resultMovie.name, resultMovie.poster_path, resultMovie.backdrop_path, resultMovie.media_type, resultMovie.id)} to={`/${resultMovie.name.replace(/ /g, "-")}`}>
                                        <div onClick={() => setStyle("hidden")} className="flex hover:bg-gray-300 transition delay-75 p-1 rounded">
                                            <img className=" w-12 border border-white rounded" src={`https://image.tmdb.org/t/p/original${resultMovie.poster_path}`} alt="" />
                                            <li className="text-black">{resultMovie.name}</li>
                                        </div>
                                    </Link> :
                                    index <= 3 && resultMovie.poster_path && <Link to={`/${resultMovie.title.replace(/ /g, "-")}`} onClick={() => setMovielol(resultMovie.title, resultMovie.poster_path, resultMovie.backdrop_path, resultMovie.media_type, resultMovie.id)}>
                                        <div onClick={() => setStyle("hidden")} className="flex hover:bg-gray-300 transition delay-75 p-1 rounded">
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
                    {/* top-0 left-0 */}
                    <div className=" bg-gradient-to-t via-transparent from-slate-800 xl:h-[630px] h-[430px] w-full absolute z-10"></div>
                    <div className=" bg-gradient-to-l via-transparent from-slate-800 xl:h-[630px] h-[430px] w-full absolute z-10"></div>
                    <div className=" bg-gradient-to-r via-transparent from-slate-800 xl:h-[630px] h-[430px] w-full absolute z-10"></div>
                    <div className=" bg-gradient-to- via-transparent from-slate-800 xl:h-[630px] h-[430px] w-full absolute z-10"></div>
                    <img className="xl:h-[630px] h-[430px] w-full absolute object-cover xl:object-[0px,-100px]" src={`https://image.tmdb.org/t/p/original${moviemovie.backdrop_path}`} alt={moviemovie.name}></img>
                </div>
                <div className="z-20 w-screen flex flex-col items-center pt-24 xl:pt-64">
                    <img className=" xl:w-44 w-32 border border-white rounded shadow-lg shadow-black" src={`https://image.tmdb.org/t/p/original${moviemovie.poster_path}`} alt="" />
                    <h1 className="xl:text-6xl sm:text-4xl text-xl font-semibold capitalize mb-8 text-white mt-4">{id.replace(/-/g, " ")}</h1>
                </div>
            </div>
            {where.SE ? <div className=" text-white w-screen flex justify-center bg-slate-800 mt-8 xl:mt-0 z-50">
                <div className="flex flex-col xl:flex-row gap-y-9 xl:gap-x-3 justify-evenly w-screen xl:border-t border-slate-600 xl:max-w-5xl max-w-xl px-3 xl:p-0 xl:pt-4 pb-8">
                    {where.SE.buy &&
                        <div className="border-t border-slate-600 xl:border-0 w-full text-center xl:w-auto xl:text-left">
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
                        <div className="border-t border-slate-600 xl:border-0 w-full text-center xl:w-auto xl:text-left">
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
                        <div className="border-t border-slate-600 xl:border-0 w-full text-center xl:w-auto xl:text-left">
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
                        <div className="border-t border-slate-600 xl:border-0 w-full text-center xl:w-auto xl:text-left">
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
                        <div className="border-t border-slate-600 xl:border-0 w-full text-center xl:w-auto xl:text-left">
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
                </div>
            </div>
                :
                <div className=" text-white w-screen flex justify-center bg-slate-800 mt-8 xl:mt-0 z-50">
                    <div className="flex flex-col xl:flex-row gap-y-9 xl:gap-x-3 justify-evenly w-screen xl:border-t border-slate-600 xl:max-w-5xl max-w-xl px-3 xl:p-0 xl:pt-4 pb-8">
                        <div className="border-t border-slate-600 xl:border-0 w-full text-center xl:w-auto xl:text-left">
                            <h1 className="font-semibold pt-4">Inte Tillgänglig</h1>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default IdPage;
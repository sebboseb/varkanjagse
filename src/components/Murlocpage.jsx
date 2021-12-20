import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Murlocpage() {

    const [query, setQuery] = useState("");
    const [style, setStyle] = useState("flex flex-col gap-y-1 p-1 transition duration-75 absolute");
    const [movies, setMovies] = useState([]);

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

    return (
        <div className="text-white h-screen flex flex-col items-center">
            <div className="z-10 text-white flex flex-col items-center h-screen">
                {/* <h1>Murl</h1> */}
                <h1 className="text-xl font-semibold mt-96">Var kan jag se..?</h1>
                <div className="flex flex-col">
                    <input onClick={() => setStyle("flex flex-col gap-y-1 p-1")} className=" w-72 xl:w-56 mt-4 xl:mr-8 rounded p-1 px-5 text-black" type="text" placeholder="Sök film eller serie" value={query} onChange={onChange} />
                    <div className="hover:block" id="searchDiv">
                        <ul className={movies.length !== 0 ? style : "hidden"}>
                            {movies.map((resultMovie, index) => (
                                resultMovie.media_type === 'tv' ?
                                    index <= 3 && resultMovie.poster_path &&
                                    <Link to={`/${resultMovie.name.replace(/ /g, "-")}`}>
                                        <div onClick={() => setStyle("hidden")} className="flex hover:bg-gray-300 transition delay-75 p-1 rounded">
                                            <img className=" w-12 border border-white rounded" src={`https://image.tmdb.org/t/p/original${resultMovie.poster_path}`} alt="" />
                                            <li className="text-black">{resultMovie.name}</li>
                                        </div>
                                    </Link> :
                                    index <= 3 && resultMovie.poster_path && <Link to={`/${resultMovie.title.replace(/ /g, "-")}`}>
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
            <div className="w-screen overflow-hidden">
                <div className="w-[100vw] h-72 overflow-hidden -skew-y-12 xl:-skew-y-0 bg-black shadow-lg shadow-slate-700 absolute -top-24 xl:-top-14 xl:h-56">
                    {/* <img className="w-2/4 bg-repeat" src="./Comp1.jpg" alt="" /> */}
                    <div id="bgImage"></div>
                </div>
            </div>
            <div className="text-center relative bottom-56">
                    <h1>Du kan söka direkt genom att lägga till /filmtitel i hemsidans namn</h1>
                    <p>Till exempel <span className="font-semibold z-50"><Link to="/gladiator">varkanjag.se/gladiator</Link></span></p>
            </div>
        </div>
    )
}

export default Murlocpage;
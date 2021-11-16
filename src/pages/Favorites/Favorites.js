import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import Table from '../../components/Table/Table'
import {Link} from 'react-router-dom'
import { BsStar, BsStarFill } from "react-icons/bs";
import { Button } from '../../components/Button/Button';
import backend from "../../services/backend";
import './Favorites.css'

function Favorites(props) {

    const [favCompetitions, setFavCompetitions] = useState([])

    const tournaments = {
        "2002":"Bundesliga",
        "2003":"Eredivisie",
        "2013": "Campeonato Brasileiro Série A",
        "2014":"Primera Division",
        "2015":"Ligue 1",
        "2017":"Primeira Liga",
        "2019":"Serie A",
        "2021":"Premier League",
    }
    
    const tournamentsId = {
        "UEFA Champions League": 2001,
        "Bundesliga": 2002,
        "Eredivisie": 2003,
        "Campeonato Brasileiro Série A": 2013,
        "Primera Division": 2014,
        "Ligue 1": 2015,
        "Primeira Liga": 2017,
        "European Championship": 2018,
        "Serie A": 2019,
        "Premier League": 2021,
        "Copa Libertadores": 2152
    }

    const [gamesData, setGamesData] = useState();
    
    const [tournamentData, setTournamentData] = useState();
    
    const [favoriteList, setFavoriteList] = useState([]);

    useEffect(() => {
        backend.get('/favorite/'+props.userName).then((response) => {
            var newList = []
            for (var i = 0; i < response.data.length; i++) {
                newList.push(response.data[i].tournament)
            }
            setFavoriteList(newList);
        })

        // eslint-disable-next-line
    }, [])

    return (
        <div className='homePage'>
            <ul>
                {favoriteList.map(competition => (
                    <li className='tournament-links'>
                        <Link className='tournament-link' to={"/tournament/" + (tournamentsId[tournaments[competition]])} key={competition.toString()}>
                            {tournaments[competition]}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>       
    )
}

export default Favorites;
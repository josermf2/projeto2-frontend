import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import Table from '../../components/Table/Table'
import './Tournament.css'
import {Link} from 'react-router-dom'
function Tournament(props) {
    const [gamesData, setGamesData] = useState();
    
    const [tournamentData, setTournamentData] = useState();
    
    var list = [2001, 2002, 2003, 2013, 2014, 2015, 2017, 2018, 2019, 2021, 2152]

    useEffect(() => {
        api.get('/competitions/' + window.location.pathname.slice(12) + '/matches').then((response) => { 
            let games = []
            let numberOfMatches = 11;
            if (response.data.matches.length < 11){
                numberOfMatches = response.data.matches.length
            }

            for (var i = 0; i < numberOfMatches; i++) {
                games.push({
                    homeTeamName: response.data.matches[i].homeTeam.name, 
                    awayTeamName: response.data.matches[i].awayTeam.name, 
                    time: response.data.matches[i].utcDate.slice(1+response.data.matches[i].utcDate.indexOf('T'), -1)
                })
            }
            setGamesData(games);
        })

        api.get('competitions/' + window.location.pathname.slice(12) + '/standings').then((response) => { 
            let tournamentStangings = []
            console.log(response.data.standings[0].table);
            for (var i = 0; i< response.data.standings[0].table.length; i++) {
                tournamentStangings.push({
                    position: response.data.standings[0].table[i].position,
                    name: response.data.standings[0].table[i].team.name,
                    crestUrl: response.data.standings[0].table[i].team.crestUrl,
                    points: response.data.standings[0].table[i].points,
                    playedGames: response.data.standings[0].table[i].playedGames,
                    won: response.data.standings[0].table[i].won
                })
            }
            setTournamentData(tournamentStangings);
        })
        // eslint-disable-next-line
    }, [])


    const gamesColumns = React.useMemo(
        () => [
            {
                Header: "Time da Casa",
                accessor: "homeTeamName",
            },
            {
                Header: "Visitante",
                accessor: "awayTeamName",
            },
            {
                Header: "Time",
                accessor: "time",
            },
        ],
        []
    );

    const tournamentColumns = React.useMemo(
        () => [
            {
                Header: "Posição",
                accessor: "position",
            },  
            {
                Header: "",
                accessor: "crestUrl",
                Cell:  e => <img className='flags' src={e.value}/>,
            },      
            {
                Header: "Time",
                accessor: "name",
            },
            {
                Header: "Pts",
                accessor: "points",
            },
            {
                Header: "PJ",
                accessor: "playedGames",
            },
            {
                Header: "VIT",
                accessor: "won",
            },

        ],
        []
    );        
    return (
        <div className='homePage'>
            <div className='gamesTable'>
                {gamesData ?  
                    <h1 className='gamesTitle'>
                        Jogos do Dia
                    </h1>
                : '' }
                {gamesData ?  
                    <Table columns={gamesColumns} data={gamesData} /> 
                : '' }
            </div>

            <div className='tournamentTable'>
                {tournamentData ? 
                    <h1 className='tournamentTitle'>
                        Tabela
                    </h1> 
                : '' }
                {tournamentData ? 
                    <Table columns={tournamentColumns} data={tournamentData} /> 
                : '' }
            </div>
        </div>       
    )
}

export default Tournament;
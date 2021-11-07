import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import Table from '../../components/Table/Table'
import './Home.css'
import {Link} from 'react-router-dom'

function Home() {

    const [gamesData, setGamesData] = useState();
    
    const [tournamentData, setTournamentData] = useState();
    
    var list = [2001, 2002, 2003, 2013, 2014, 2015, 2017, 2018, 2019, 2021, 2152]


    useEffect(() => {
        api.get('/matches').then((response) => { 
            let games = []
            let numberOfMatches = 11;
            if (response.data.matches.length < 11){
                numberOfMatches = response.data.matches.length
            }

            for (var i = 0; i < numberOfMatches; i++) {
                games.push({
                    homeTeamName: response.data.matches[i].homeTeam.name, 
                    awayTeamName: response.data.matches[i].awayTeam.name, 
                    tournament: response.data.matches[i].competition.name, 
                    time: response.data.matches[i].utcDate.slice(1+response.data.matches[i].utcDate.indexOf('T'), -1)
                })
            }
            setGamesData(games);
        })

        api.get('competitions/').then((response) => { 
            let competitions = []
            for (var i = 0; i< response.data.competitions.length; i++) {
                if (list.includes(response.data.competitions[i].id)){
                    competitions.push({
                        name: response.data.competitions[i].name,
                        countryCode: response.data.competitions[i].area.countryCode,
                        ensignUrl: response.data.competitions[i].area.ensignUrl
                    })
                }
            }
            setTournamentData(competitions);
        })
        // eslint-disable-next-line
    }, [])


    const gamesColumns = React.useMemo(
        () => [
            {
                Header: "Home Team",
                accessor: "homeTeamName",
            },
            {
                Header: "Away Team",
                accessor: "awayTeamName",
            },
            {
                Header: "Tournament",
                accessor: "tournament",
            },          {
                Header: "Time",
                accessor: "time",
            },
        ],
        []
    );

    const tournamentColumns = React.useMemo(
        () => [  
            {
                Header: "",
                accessor: "ensignUrl",
                Cell:  e => <img className='flags' src={e.value}/>,
            },      
            {
                Header: "Country",
                accessor: "countryCode",
            },
            {
                Header: "Name",
                accessor: "name",
                Cell:  e => 
                    <Link 
                        to={{
                            pathname: "/tournament",
                            state: [{id:2001}]
                        }}>
                            {e.value}
                    </Link>,
            },
        ],
        []
    );        
    return (
        <div className='homePage'>
            <div className='gamesTable'>
                {gamesData ?  
                    <h1 className='gamesTitle'>
                        Today's Matches
                    </h1>
                : '' }
                {gamesData ?  
                    <Table columns={gamesColumns} data={gamesData} /> 
                : '' }
            </div>

            <div className='tournamentTable'>
                {tournamentData ? 
                    <h1 className='tournamentTitle'>
                        Tournaments
                    </h1> 
                : '' }
                {tournamentData ? 
                    <Table columns={tournamentColumns} data={tournamentData} /> 
                : '' }
            </div>
        </div>       
    )
}

export default Home;
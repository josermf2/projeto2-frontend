import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import Table from '../../components/Table/Table'
import './Home.css'
import {Link} from 'react-router-dom'
import { BsStar, BsStarFill } from "react-icons/bs";
import { Button } from '../../components/Button/Button';
  
/*const convertUTCToLocalTime = (dateString) => {
    let date = new Date(dateString);
    const milliseconds = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );
    const localTime = new Date(milliseconds);
    localTime.getDate() // local date
    localTime.getHours() // local hour

    console.log(localTime);
  };toString(tournaments[(e.value)])<button className="btn-star"><BsStarFill /></button>;*/


function Home() {
    const tournaments = {
        "Bundesliga": 2002,
        "Eredivisie": 2003,
        "Campeonato Brasileiro Série A": 2013,
        "Primera Division": 2014,
        "Ligue 1": 2015,
        "Primeira Liga": 2017,
        "Serie A": 2019,
        "Premier League": 2021,
    }

    const [gamesData, setGamesData] = useState();
    
    const [tournamentData, setTournamentData] = useState();
    
    var list = [2002, 2003, 2013, 2014, 2015, 2017, 2019, 2021]


    useEffect(() => {
        api.get('/matches').then((response) => { 
            let games = []
            let numberOfMatches = 11;
            if (response.data.matches.length < 11){
                numberOfMatches = response.data.matches.length
            }

            for (var i = 0; i < numberOfMatches; i++) {
                games.push({
                    time: (response.data.matches[i].utcDate).slice(1+response.data.matches[i].utcDate.indexOf('T'), -4),
                    ensignUrl: response.data.matches[i].competition.area.ensignUrl,
                    countryCode: response.data.matches[i].competition.area.code,
                    tournament: response.data.matches[i].competition.name,
                    homeTeamName: response.data.matches[i].homeTeam.name, 
                    awayTeamName: response.data.matches[i].awayTeam.name
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
                        tournamentCode: {'name': response.data.competitions[i].name, 'state': false},
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
                Header: "Horário",
                accessor: "time",
            },
            {
                Header: "",
                accessor: "ensignUrl",
                Cell:  e => <img className='flags' src={e.value}/>,
            },  
            {
                Header: "País",
                accessor: "countryCode",
            },     
            {
                Header: "Campeonato",
                accessor: "tournament",
            },   
            {
                Header: "Time da Casa",
                accessor: "homeTeamName",
            },
            {
                Header: "Visitante",
                accessor: "awayTeamName",
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
                Header: "País",
                accessor: "countryCode",
            },
            {
                Header: "Campeonato",
                accessor: "name",
                Cell:  e => 
                    <Link to={"/tournament/" + (tournaments[(e.value)])}>{e.value}</Link>,
            },
            {
                Header: "Favoritar",
                accessor: 'tournamentCode',
                Cell: e => 
                    <button className="btn-star" onClick={() => {
                        if (e.value.state == false){
                            e.value.state = true;
                        } else{
                            e.value.state = false;
                        } 
                    }}>
                        {(e.value.state == false) && <BsStar />}
                        {(e.value.state == true) && <BsStarFill />}
                    </button>
            },
        ],
        []
    );        
    return (
        <div className='homePage'>
            <div className='tournamentTable'>
                {tournamentData ? 
                    <h1 className='tournamentTitle'>
                        Campeonatos
                    </h1> 
                : '' }
                {tournamentData ? 
                    <Table columns={tournamentColumns} data={tournamentData} /> 
                : '' }
            </div>
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
        </div>       
    )
}

export default Home;
import React, { useState, useEffect } from 'react';
import api from "../../services/api";
import Table from '../../components/Table/Table'
import './Home.css'

function Home() {
    const [data, setData] = useState();
    


    useEffect(() => {
        api.get('/matches').then((response) => { 
            let games = []
            for (var i = 0; i< response.data.matches.length; i++) {
                games.push({
                    homeTeamName: response.data.matches[i].homeTeam.name, 
                    awayTeamName: response.data.matches[i].awayTeam.name, 
                    date: response.data.matches[i].utcDate
                })
            }
            setData(games);
        })
    }, [])


    const columns = React.useMemo(
        () => [
          {
            Header: "Home Team",
            accessor: "homeTeamName",
          },
          {
            Header: " Team",
            accessor: "awayTeamName",
          },
          {
            Header: "Date",
            accessor: "date",
          },
        ],
        []
      );
    
        

    return (
        <div className='gamesTable'>
            <h1 className='gamesTitle'>
                Próximos jogos
            </h1>
            {data ?  <Table columns={columns} data={data} /> : '' }
        </div>
    )
}

export default Home;
import React, {useState} from 'react';
import Popup from 'reactjs-popup';
const Duel = require('duel')


const players = {
    1: "Tokido",
    2: "Daigo",
    3: "Infiltration",
    4: "TrickCards",
    5: "Mango",
    6: "Leffen",
    7: "Justin Wong",
    8: "Alex Valle"
}




var trn = new Duel(8, {last : Duel.LB})

// console.log(trn)


// this bracket is for double elimination


const DisplayBracket = props => {
    
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    
    //on submit, send id of match and score for each player
    const onSubmit = (event, matchID, player1, player2) => {
        event.preventDefault();
        trn.score(matchID, [player1, player2]);
        console.log(trn)
    }

    return( 
        <div>
            <h3>Bracket :</h3>
            <hr/>
            {trn.matches.map((match, index) => {
                var score = [null, null]
                for(var i = 0; i < trn.state.length; i++){
                    if(JSON.stringify(match.id) === JSON.stringify(trn.state[i].id)){
                        score=trn.state[i].score;
                        break;
                    }
                }
                return (
                    match.id.s===1 ?
                    <div className = 'upperB' key ={index}>
                        Upper Bracket Match ID: {match.id.s}{match.id.r}{match.id.m}
                        <br/>

                        {/* Player 1 */}

                        {match.p[0] <= 0 ? 
                            (match.id.r-1) <= 0 ? 
                                <span style={{color:"grey"}}>BYE</span> 
                                : 
                                <span style={{color:"grey"}}> winner of match #{match.id.s.toString()}{(match.id.r - 1).toString()}{((match.id.m + (match.id.m -1))).toString()} </span> 
                        : 
                            score[1]===score[0] ? 
                                <span style = {{color: ""}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                : 
                                score[0]<score[1] ? 
                                    <span style = {{color: "red"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                    : 
                                    <span style = {{color: "green"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span>}
                        <br/>

                        <span>vs</span>
                        
                        <br/>

                        {/* Player 2 */}

                        {match.p[1] <= 0 ? 
                            (match.id.r-1) <= 0 ? 
                                <span style={{color:"grey"}}>BYE</span> 
                                : 
                                <span style={{color:"grey"}}> winner of match #{match.id.s.toString()}{(match.id.r - 1).toString()}{(match.id.m + (match.id.m)).toString()} </span> 
                        : 
                            score[1]===score[0] ?
                                <div>
                                <span style = {{color: ""}}> #{match.p[1]} {players[match.p[1]]} {score[1]} </span>
                                <br/>

                                <Popup trigger = {<button>Enter Score</button>} position = "top center" modal closeOnDocumentClick>
                                    {close =>(
                                        <>
                                        <form onSubmit = {(event) => {onSubmit(event, match.id, Number(player1), Number(player2)); close()}}>
                                            <div style ={{color:"black"}} className="header">Enter Score for match #{match.id.s}{match.id.r}{match.id.m}</div>
                                            <label style ={{color:"black"}}># {match.p[0]} {players[match.p[0]]} : </label>
                                            <input type = "number" name = "player1" onChange={(e) => { setPlayer1(e.target.value) }}></input>
                                            <br></br>
                                            <label style ={{color:"black"}}># {match.p[1]} {players[match.p[1]]} : </label>
                                            <input type = "number" name = "player2" onChange={(e) => { setPlayer2(e.target.value) }}></input>
                                            <br></br>
                                            <button>Submit</button>
                                        </form>
                                        <button onClick = {close}>Cancel</button>
                                        </>
                                    )}
                                    
                                </Popup>
                                </div>
                                : 
                                score[1]<score[0] ? 
                                    <span style = {{color: "red"}}> #{match.p[1]} {players[match.p[1]]} {score[1]} </span>
                                    : 
                                    <span style = {{color: "green"}}> #{match.p[1]} {players[match.p[1]]} {score[1]} </span>}
                        <hr/>
                    </div>

                    :

                    <div className = 'lowerB' key={index}>
                        Lower Bracket Match ID: {match.id.s}{match.id.r}{match.id.m}
                        <br/>


                        {/* Player 1 */}

                        {match.p[0] <= 0 ? 
                            (match.id.r <= 1) ? 
                                (match.p[0] < 0) ?
                                    <span style={{color:"grey"}}> BYE </span>
                                    : 
                                    <span style={{color:"grey"}}> loser of match # {(match.id.s-1).toString()}{match.id.r}{(match.id.m + (match.id.m) )} </span>
                                :    
                                <span style={{color:"grey"}}> loser of match # {(match.id.s-1).toString()}{match.id.r}{(match.id.m + (match.id.m) )} </span>
                            :
                            <span> #{match.p[0]} {players[match.p[0]]} {score[0]} </span>
                        }
                        
                        <br/>
                        <span>vs</span>
                        <br/>


                        {/* Player 2 */}

                        {match.p[1] <= 0 ? 
                            (match.id.r <= 1) ? 
                                (match.p[1] < 0) ?
                                    <span style={{color:"grey"}}> BYE </span>
                                    : 
                                    <span style={{color:"grey"}}> loser of match # {(match.id.s-1).toString()}{match.id.r}{(match.id.m + (match.id.m - 1) )} </span>
                                :    
                                <span style={{color:"grey"}}> loser of match # {(match.id.s-1).toString()}{match.id.r}{(match.id.m + (match.id.m - 1) )} </span>
                            :
                            <span> #{match.p[1]} {players[match.p[1]]} {score[1]} </span>
                        }

                        <hr/>
                    </div>
                )
            })}
        </div>
    )

}

export default DisplayBracket
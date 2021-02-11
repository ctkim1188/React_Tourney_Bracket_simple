import React, {useState} from 'react';
import Popup from 'reactjs-popup';
const Duel = require('duel')

// make an api call for this
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

var playerCount = 0;
const registeredPlayers = 8;

for (var i = 1; i <= registeredPlayers; i++){
    playerCount ++;
}


var trn = new Duel(playerCount, {short:true})
console.log(trn)



// this bracket is for single elimination

const SingleElimDisplayBracket = props => {
    
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    
    //on submit, send id of match and score for each player
    const onSubmit = (event, matchID, player1, player2) => {
        event.preventDefault();
        trn.score(matchID, [player1, player2]);
        console.log(trn)
    }


    return( 
        <div className = "bracketDisplayContainer">
            <h3>Bracket :</h3>
            <div className = "bracketMatches">

            <div className = {"all_round_1"}>
            {trn.matches.map((match, index) => {
                var score = [null, null]
                for(var i = 0; i < trn.state.length; i++){
                    if(JSON.stringify(match.id) === JSON.stringify(trn.state[i].id)){
                        score=trn.state[i].score;
                        break;
                    }
                }
                return (
                    <>
                        {match.id.r === 1 ? 
                            <div className = {"round1 " + "match" + match.id.m} key ={"1" + index}>
                            Match #{match.id.s}{match.id.r}{match.id.m}
                            <br/>
    
                            {/* Player 1 */}
    
                            {match.p[0] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{((match.id.m + (match.id.m -1))).toString()} </span> 
                            : 
                                score[1]===score[0] ? 
                                    <span style = {{color: ""}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                    : 
                                    score[0]<score[1] ? 
                                        <span style = {{color: "red"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                        : 
                                        <span style = {{color: "green"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span>}
                            <br/>
    
                            <hr></hr>
                            
                            {/* Player 2 */}
    
                            {match.p[1] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{(match.id.m + (match.id.m)).toString()} </span> 
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
                            
                        </div>

                        :

                        null
                    }
                    </>
                )
            })}
            </div>


            <div className = {"all_round_2"}>
            {trn.matches.map((match, index) => {
                var score = [null, null]
                for(var i = 0; i < trn.state.length; i++){
                    if(JSON.stringify(match.id) === JSON.stringify(trn.state[i].id)){
                        score=trn.state[i].score;
                        break;
                    }
                }
                return (
                    <>
                        {match.id.r === 2 ? 
                            <div className = {"round2 " + "match" + match.id.m} key ={"2" + index}>
                            Match #{match.id.s}{match.id.r}{match.id.m}
                            <br/>
    
                            {/* Player 1 */}
    
                            {match.p[0] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{((match.id.m + (match.id.m -1))).toString()} </span> 
                            : 
                                score[1]===score[0] ? 
                                    <span style = {{color: ""}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                    : 
                                    score[0]<score[1] ? 
                                        <span style = {{color: "red"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                        : 
                                        <span style = {{color: "green"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span>}
                            <br/>
    
                            <hr></hr>
                            
                            {/* Player 2 */}
    
                            {match.p[1] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{(match.id.m + (match.id.m)).toString()} </span> 
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
                            
                        </div>

                        :

                        null
                    }
                    </>
                )
            })}
            </div>


            <div className = {"all_round_3"}>
            {trn.matches.map((match, index) => {
                var score = [null, null]
                for(var i = 0; i < trn.state.length; i++){
                    if(JSON.stringify(match.id) === JSON.stringify(trn.state[i].id)){
                        score=trn.state[i].score;
                        break;
                    }
                }
                return (
                    <>
                        {match.id.r === 3 ? 
                            <div className = {"round3 " + "match" + match.id.m} key ={"3" + index}>
                            Match #{match.id.s}{match.id.r}{match.id.m}
                            <br/>
    
                            {/* Player 1 */}
    
                            {match.p[0] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{((match.id.m + (match.id.m -1))).toString()} </span> 
                            : 
                                score[1]===score[0] ? 
                                    <span style = {{color: ""}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                    : 
                                    score[0]<score[1] ? 
                                        <span style = {{color: "red"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                        : 
                                        <span style = {{color: "green"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span>}
                            <br/>
    
                            <hr></hr>
                            
                            {/* Player 2 */}
    
                            {match.p[1] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{(match.id.m + (match.id.m)).toString()} </span> 
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
                            
                        </div>

                        :

                        null
                    }
                    </>
                )
            })}
            </div>


            <div className = {"all_round_4"}>
            {trn.matches.map((match, index) => {
                var score = [null, null]
                for(var i = 0; i < trn.state.length; i++){
                    if(JSON.stringify(match.id) === JSON.stringify(trn.state[i].id)){
                        score=trn.state[i].score;
                        break;
                    }
                }
                return (
                    <>
                        {match.id.r === 4 ? 
                            <div className = {"round4 " + "match" + match.id.m} key ={"4" + index}>
                            Match #{match.id.s}{match.id.r}{match.id.m}
                            <br/>
    
                            {/* Player 1 */}
    
                            {match.p[0] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{((match.id.m + (match.id.m -1))).toString()} </span> 
                            : 
                                score[1]===score[0] ? 
                                    <span style = {{color: ""}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                    : 
                                    score[0]<score[1] ? 
                                        <span style = {{color: "red"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span> 
                                        : 
                                        <span style = {{color: "green"}}> #{match.p[0]} {players[match.p[0]]} {score[0]} </span>}
                            <br/>
    
                            <hr></hr>
                            
                            {/* Player 2 */}
    
                            {match.p[1] <= 0 ? 
                                (match.id.r-1) <= 0 ? 
                                    <span style={{color:"grey"}}>BYE</span> 
                                    : 
                                    <span style={{color:"grey"}}> winner of #{match.id.s.toString()}{(match.id.r - 1).toString()}{(match.id.m + (match.id.m)).toString()} </span> 
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
                            
                        </div>

                        :

                        null
                    }
                    </>
                )
            })}
            </div>

            </div>
        </div>
    )

}

export default SingleElimDisplayBracket
import React, {useState} from 'react';
import {Link} from '@reach/router';
import Popup from 'reactjs-popup';

const regForm = props => {

    return (
        <>
        <h3>Register</h3>

        <Popup trigger = {<button>Here</button>} position = "top center" modal closeOnDocumentClick>
            {close =>(
                <>
                {/* <form onSubmit = {(event) => {onSubmit(event, match.id, Number(player1), Number(player2)); close()}}>
                    <div style ={{color:"black"}} className="header">Enter Score for match #{match.id.s}{match.id.r}{match.id.m}</div>
                    <label style ={{color:"black"}}># {match.p[0]} {players[match.p[0]]} : </label>
                    <input type = "number" name = "player1" onChange={(e) => { setPlayer1(e.target.value) }}></input>
                    <br></br>
                    <label style ={{color:"black"}}># {match.p[1]} {players[match.p[1]]} : </label>
                    <input type = "number" name = "player2" onChange={(e) => { setPlayer2(e.target.value) }}></input>
                    <br></br>
                    <button>Submit</button>
                </form> */}
                <button onClick = {close}>Cancel</button>
                </>
            )}
            
        </Popup>
        </>

    )

}

export default regForm
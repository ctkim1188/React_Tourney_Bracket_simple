import React from "react";
import Popup from "reactjs-popup";


export default () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    {close => (
      <div className="modal">
        {/* <a className="close" onClick={close}>
          &times;
        </a> */}
        <div className="header"> Modal Title </div>
        <div style ={{color:"black"}} className="content">
          {" "}
          Hello World
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            closeOnDocumentClick
          >
            <span style ={{color:"black"}}>
              What's up World
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);
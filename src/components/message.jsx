import React from "react";
import '../styles/listingPage.css';
import Reply from '../components/reply.jsx'
import Button from "bootstrap/js/src/button.js";

function GetCurrentTime(){

    const timestamp = new Date(Date.now()).toLocaleString();

    return (
        <div>
            {timestamp}
        </div>
    );
}


function messageContainer({username, message}){


    return (
        <div className="forumMessage">
            <header>{username}</header>
            <p>{message}</p>

            <div className="forumMessageFooter">

                <div className={"standardButton replyButton"}>
                    <button type={"button"}>Reply</button>
                </div>

                <p>
                    <GetCurrentTime/>
                </p>
            </div>


            <div className={"forumReplyAll"}>

                <Reply
                    username={"ReplyUser"}
                    message={"Replying test"}
                    repliedTo={username}
                />

            </div>

        </div>
    );
}


export default messageContainer;
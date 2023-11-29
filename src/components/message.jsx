import React from "react";
import '../styles/listingPage.css';
import Reply from '../components/reply.jsx'

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
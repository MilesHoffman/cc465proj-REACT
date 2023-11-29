import '../styles/listingPage.css';
import React from "react";


function GetCurrentTime(){

    const timestamp = new Date(Date.now()).toLocaleString();

    return (
        <div>
            {timestamp}
        </div>
    );
}


function replyContainer( {username, message, repliedTo}) {

    return (

        <div className={"forumReplyMsg"}>
            <header>{username}</header>
            <p>@{repliedTo},</p>
            <p>{message}</p>

            <div className="forumMessageFooter">
                <p>
                    <GetCurrentTime/>
                </p>
            </div>
        </div>
    );

}


export default replyContainer;
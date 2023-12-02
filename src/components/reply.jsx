import '../styles/listingPage.css';
import React from "react";


function replyContainer( {username, message, repliedTo, time}) {

    return (

        <div className={"forumReplyMsg"}>
            <header>{username}</header>
            <p>@{repliedTo},</p>
            <p>{message}</p>

            <div className="forumMessageFooter">
                <p>
                    {time}
                </p>
            </div>
        </div>
    );

}


export default replyContainer;
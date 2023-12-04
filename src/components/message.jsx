import React, { useEffect, useState } from "react";
import '../styles/listingPage.css';
import Reply from '../components/reply.jsx';

function ForumFooter({ handler }) {
    return (
        <div className="forumFooter standardButton">
            <button type="button" onClick={handler}>Post</button>
        </div>
    );
}

function MessageContainer( { username, message, time, ID, replies, listingID } ) {

    const [showReplyTextbox, setShowReplyTextbox] = useState(false);
    const [textboxmessage,setTextboxmessage] = useState('')
    const [commID, setCommID] = useState('')

    const apiUrl = 'http://localhost:5000/api/sendReply'
    const handleReplyButtonClick = async () => {
        setShowReplyTextbox(!showReplyTextbox);


        try {
            const response = await fetch(apiUrl, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    textBoxMessage: textboxmessage,
                    commentID: ID,
                    listingID: listingID,
                    repliedTo: username
                }),

            })
            if (response.ok) {

            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const clickShowReplyBox = () => {

        setShowReplyTextbox(!showReplyTextbox);
    }



    return (
        <div className="forumMessage">
            <header>{username}</header>
            <p>{message}</p>

            <div className="forumMessageFooter">
                <div className="standardButton replyButton">
                    <button type="button" onClick={clickShowReplyBox}>
                        Reply
                    </button>
                </div>
                <p>{time}</p>
            </div>

            <div className="forumReplyAll">
                {showReplyTextbox && (
                    <>
                        <form className="messageTextbox">
                            <p>
                                <textarea
                                    rows="4"
                                    style={{ width: '50ch' }}
                                    value={textboxmessage}
                                    onChange={(e) => setTextboxmessage(e.target.value)}
                                ></textarea>
                            </p>
                        </form>
                        <ForumFooter handler={handleReplyButtonClick} />
                    </>
                )}

                { replies.length > 0 ? replies.map((reply) => (
                    <Reply
                        key={reply.id} // Ensure each item has a unique key
                        username={reply.Username}
                        message={reply.Message}
                        repliedTo={reply.RepliedTo}
                        time={reply.Timestamp}
                    />
                ))
                    : <></>
                }
            </div>
        </div>
    );
}

export default MessageContainer;
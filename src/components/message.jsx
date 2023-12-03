import React, { useEffect, useState } from "react";
import '../styles/listingPage.css';
import Reply from '../components/reply.jsx';

function ForumFooter({ handler }) {
    return (
        <div className="forumFooter standardButton">
            <button type="button" onClick={handler}>Post</button>
            <button type="button">Report Listing</button>
        </div>
    );
}

function MessageContainer( { username, message, time, ID } ) {
    const [replies, setReplies] = useState([]);
    const [showReplyTextbox, setShowReplyTextbox] = useState(false);
    const [textboxmessage,setTextboxmessage] = useState('')
    const [commID, setCommID] = useState('')

    useEffect(async () => {
        // Fetch messages when the component mounts
        const fetchReplies = async () => {

            return new Promise( async (resolve, reject) => {

                try {
                    const data = {
                        commentID: ID
                    };
                    const apiUrl = "http://localhost:5000/api/getReplies";
                    const response = await fetch(apiUrl, {

                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data),
                    });
                    if (response.ok) {
                        const comments = await response.json();
                        setReplies(comments);
                    } else {
                        console.error('Failed to fetch replies:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching replies:', error);
                }

            });
        };

        await fetchReplies();
    }, []);

    const apiUrl = 'http://localhost:5000/api/sendReply'
    const handleReplyButtonClick = async () => {
        setShowReplyTextbox(true);


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
                    Username: 'bob',
                    TextBoxMessage:textboxmessage,
                    commentid: ID


                }),

            })
            if (response.ok) {

            } else {

            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        }


    };



    return (
        <div className="forumMessage">
            <header>{username}</header>
            <p>{message}</p>

            <div className="forumMessageFooter">
                <div className="standardButton replyButton">
                    <button type="button" onClick={handleReplyButtonClick}>
                        Reply
                    </button>
                </div>
                <p>{time}</p>
            </div>

            <div className="forumReplyAll">
                {showReplyTextbox && (
                    <>
                        <form className="reply-textbox">
                            <label>textArea</label>
                            <br />
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
                {replies.map((reply) => (
                    <Reply
                        key={reply.id} // Ensure each item has a unique key
                        username={reply.Username}
                        message={reply.Message}
                        repliedTo={reply.RepliedTo}
                        time={reply.Timestamp}
                    />
                ))}
            </div>
        </div>
    );
}

export default MessageContainer;

/*
{replies.map( (reply) => (
                    <Reply
                        username={reply.Username}
                        message={reply.Message}
                        repliedTo={reply.RepliedTo}
                        time={reply.Timestamp}
                    />
                ))}
 */
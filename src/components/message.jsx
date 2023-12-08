import React, { useEffect, useState } from "react";
import '../styles/listingPage.css';
import Reply from '../components/reply.jsx';
import PopupContainer from "./Popup.jsx";
import {useNavigate} from "react-router-dom";

function ForumFooter({ handler }) {
    return (
        <div className="forumFooter standardButton">
            <button type="button" onClick={handler}>Post</button>
        </div>
    );
}

function MessageContainer( { username, message, time, ID, replies, listingID, listingData } ) {

    const navigate = useNavigate();
    const [showReplyTextbox, setShowReplyTextbox] = useState(false);
    const [textboxmessage,setTextboxmessage] = useState('')
    const [commID, setCommID] = useState('')

    const apiUrl = 'http://localhost:5000/api/sendReply'
    const handleReplyButtonClick = async () => {
        setShowReplyTextbox(!showReplyTextbox);

        if( textboxmessage.length < 10 || textboxmessage.length > 500 ){
            setPopupMsg("Reply message must be within 10 and 500 characters.");
            setIsPopup(true);
            return;
        }

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


    const [isPopup, setIsPopup] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");

    // Time limit for the popup
    useEffect(() => {
        if (isPopup) {
            const timerId = setTimeout(() => {
                setIsPopup(false); // After 5 seconds, set isPopup to false
            }, 5000);

            // Cleanup the timer if the component unmounts or isPopup changes
            return () => clearTimeout(timerId);
        }
    }, [isPopup]);


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

            <PopupContainer
                isPopupOpen={isPopup}
                message={popupMsg}
            />

        </div>
    );
}

export default MessageContainer;
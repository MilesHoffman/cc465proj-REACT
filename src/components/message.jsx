import React, {useEffect, useState} from "react";
import '../styles/listingPage.css';
import Reply from '../components/reply.jsx'
import Button from "bootstrap/js/src/button.js";


function messageContainer({username, message, time, ID}){

    const [replies, setReplies] = useState([]);

    useEffect(() => {
        // Fetch messages when the component mounts
        const fetchReplies = async () => {
            try {
                const data = {
                    commentID: ID
                };
                const apiUrl = "http://localhost:5000/api/getReplies"
                const response = await fetch(apiUrl, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    const data = await response.json();
                    setReplies(data);
                } else {
                    console.error('Failed to fetch replies:', response.status);
                }
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };

        fetchReplies();
    }, []);


    return (
        <div className="forumMessage">
            <header>{username}</header>
            <p>{message}</p>

            <div className="forumMessageFooter">

                <div className={"standardButton replyButton"}>
                    <button type={"button"}>Reply</button>
                </div>

                <p>
                    {time}
                </p>
            </div>


            <div className={"forumReplyAll"}>

                {replies.map( (reply) => (
                    <Reply
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


export default messageContainer;
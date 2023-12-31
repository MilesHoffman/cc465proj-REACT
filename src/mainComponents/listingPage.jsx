import React, {useEffect, useState} from "react";
import '../styles/listingPage.css';
import {useLocation} from "react-router-dom";
import Message from '../components/message.jsx'
import reply from "../components/reply.jsx";
import PopupContainer from "../components/Popup.jsx";


function ListPicture({productImage}) {
    return (
        <img src={productImage}
             alt="Image unavailable"
        />
    );
}

function PictureContainer({currentPicture, productImage}) {

    return (
      <div className="bodyLeftPicture">
          <ListPicture productImage={`data:image/png;base64, ${productImage[currentPicture].file}`} />
      </div>
    );
}

function MakeOfferButton() {
    return (
        <form className={"standardButton dmButton"}>
            <button type="button">
                Direct Message
            </button>
        </form>
    );
}

function DescContainer({productName, price, location, description}) {

    return (

        <div className={"bodyRight"}>
            <div className="bodyRightHeader">
                <h2>
                    <span>{productName}</span>
                </h2>
                <h2>$
                    <span>{price}</span>
                </h2>
            </div>

            <div className="bodyRightAttributes">

                <div className="bodyRightFirstAttributes">
                    <div>
                        <h3>
                            <span>Condition: </span>
                        </h3>
                        Good
                    </div>
                    <div>
                        <h3>
                            <span>Location: </span>
                        </h3>
                        <span>{location}</span>
                    </div>
                </div>

                <div className="bodyRightSecAttributes">

                </div>
            </div>

            <div className="bodyRightDescription">
                <span>{description}</span>
                </div>
            <MakeOfferButton />
        </div>
    );
}

function TextBox({change,changeHandler}){


    return(

        <form className="reply-textbox">
            <textarea
                rows="4"
                value={change}
                onChange={(e) => changeHandler(e.target.value)}
            ></textarea>
        </form>

    );
}

function Forumfooter({handler}){


    return(

        <div className="forumFooter standardButton">
            <button type="button" onClick={handler}>Post</button>
            <button type="button">Report Listing</button>
        </div>


    );

}

function ListingPage() {
    const location = useLocation();
    const {productName, price, location: productLocation, productImage, description, ID} = location.state;
    const listingData = {productName, price, location: productLocation, productImage, description, ID};

    const [currentPicture, setCurrentPicture] = useState(0);

    const[textboxmessage, setTextboxmessage] = useState('')

    console.log(currentPicture);

    function handleBackButton() {
        if (currentPicture - 1 < 0) {
            setCurrentPicture(productImage.length - 1);
        }
        else {
            setCurrentPicture(currentPicture - 1);
        }
    }
    function handleNextButton() {
        if (currentPicture + 1 === productImage.length) {
            setCurrentPicture(0);
        }
        else {
            setCurrentPicture(currentPicture + 1);
        }
    }
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [messages, setMessages] = useState([]);
    const [replies, setReplies] = useState([]);

    useEffect( () => {
        // Fetch messages when the component mounts
        const fetchMessages = async () => {
            try {
                const data = {
                    listingID: ID
                };
                const apiUrl = "http://localhost:5000/api/getComments"
                const response = await fetch(apiUrl, {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    return await response.json();e

                } else {
                    console.error('Failed to fetch comments:', response.status);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        // Fetch messages when the component mounts
        const fetchReplies = async () => {

            try {
                const data = {
                    listingID: ID
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
                    return await response.json();
                } else {
                    console.error('Failed to fetch replies:', response.status);
                }
            } catch (error) {
                console.error('Error fetching replies:', error);
            }
        };


        const fetchData = async () => {
            try {
                const messagesPromise = fetchMessages();

                // Wait for fetchMessages to complete before calling fetchReplies
                const messages = await messagesPromise;
                setMessages(messages);

                const repliesPromise = fetchReplies();
                const replies = await repliesPromise;
                setReplies(replies);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);




    const apiUrl = 'http://localhost:5000/api/sendComment'

    const handleTextboxFetch = async () => {


        if( textboxmessage.length < 10 || textboxmessage.length > 500 ){
            setPopupMsg("Message must be between 10 and 500 characters.")
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
                    TextBoxMessage: textboxmessage,
                    ListingID: ID,
                }),

            })
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Error produced');
            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        }

    }

    const getMessagesReplies = ( commentID ) => {

        let commentReplies = [];

        for( let i = 0; i < replies.length; i++ ){

            if( replies[i].CommentID === commentID ){
                commentReplies.push( replies[i] );
            }
        }

        return commentReplies;
    };


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

        <div className={"page-container"}>
            <div className="bodySection">

                <div className="bodyLeft">

                    <div className="bodyLeftPicture">
                        <PictureContainer productImage={productImage}
                                          currentPicture={currentPicture} />
                    </div>

                    <div className="bodyLeftControl standardButton">
                        <button type="button" onClick={handleBackButton}>
                            <text> back  </text>
                        </button>
                        <button type="button" onClick={handleNextButton}>
                            <text> next </text>
                        </button>
                    </div>
                </div>


                <DescContainer productName={productName} price={price}
                               location={productLocation} description={description} />

            </div>

            <div className="forumSection">

                <div className="forumHeader">
                    <h1>Join the discussion below!</h1>
                </div>

                <div className="forumAllMessages">

                    { messages && messages.length > 0 ? messages.map( (message) => (
                        <Message
                            username={message.Username}
                            message={message.Message}
                            time={message.Timestamp}
                            ID={message.CommentID}
                            replies={getMessagesReplies( message.CommentID)}
                            listingID={ID}
                            listingData={listingData}
                        />
                    ))
                        : <h5>Be the first to comment!</h5>
                    }


                    <TextBox change={textboxmessage} changeHandler={setTextboxmessage}/>

                    <Forumfooter handler={handleTextboxFetch}/>

                </div>

            </div>

            <PopupContainer
                isPopupOpen={isPopup}
                message={popupMsg}
            />

        </div>
    );
}

export default ListingPage
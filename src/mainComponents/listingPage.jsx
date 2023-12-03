import React, {useEffect, useState} from "react";
import '../styles/listingPage.css';
import {useLocation} from "react-router-dom";
import Message from '../components/message.jsx'


function ListPicture({productImage}) {
    return (
        <img src={productImage}
             alt="Uploaded"
             className="list-img" />
    );
}

function PictureContainer({currentPicture, productImage}) {

    // Currently Hardcoded

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

            <label>
                textArea
            </label>
            <br></br>
            <p>
                <textarea
                    rows="4"
                    style={{width: '50ch'}}
                    value={change}
                    onChange={(e) => changeHandler(e.target.value)}
                ></textarea>
            </p>

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

    const [messages, setMessages] = useState([]);
    const [textboxmessage, setTextboxmessage] = useState('');
    const [currentPicture, setCurrentPicture] = useState(0);

    console.log(currentPicture);

    function handleBackButton() {
        if (currentPicture - 1 < 0) {
            setCurrentPicture(productImage.length - 1);
        }
        else {
            setCurrentPicture(currentPicture + 1);
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
                    const data = await response.json();
                    setMessages(data);
                } else {
                    console.error('Failed to fetch comments:', response.status);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchMessages();
    }, []);

    const apiUrl = 'http://localhost:5000/api/sendComment'

    const handleTextboxFetch = async () => {



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
                    ListingID: ID,


                }),

            })
            if (response.ok) {

            } else {

            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        }

    }



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

                    {messages.map( (message) => (
                        <Message
                            username={message.Username}
                            message={message.Message}
                            time={message.Timestamp}
                            ID={message.CommentID}
                        />
                    ))}


                <TextBox change={textboxmessage} changeHandler={setTextboxmessage}/>


                 <Forumfooter handler={handleTextboxFetch}/>


                </div>



            </div>
        </div>


    );
}

export default ListingPage
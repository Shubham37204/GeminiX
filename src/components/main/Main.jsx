import "./Main.css"
import { assets } from "../../assets/assets"
import { useContext } from "react"
import { Context } from "../../context/Context"
import { useUser, useClerk } from "@clerk/clerk-react";


const Main = () => {
    const { isSignedIn, user } = useUser();
    const { openSignIn } = useClerk();

    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context)
    return (
        <div className="main">
            {/* <div className="nav">
                <p></p>
                <img
                    src={isSignedIn ? user.imageUrl : assets.user_icon}
                    alt="user"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                    onClick={() => {
                        if (!isSignedIn) openSignIn(); // custom Clerk modal
                    }}
                />
            </div> */}
            <div className="nav" style={{ position: "relative" }}>
                <p></p>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img
                        src={isSignedIn ? user.imageUrl : assets.user_icon}
                        alt="user"
                        style={{ cursor: "pointer", borderRadius: "50%", width: "40px", height: "40px" }}
                        onClick={() => {
                            if (!isSignedIn) openSignIn();
                        }}
                    />
                    {!isSignedIn && (
                        <span style={{
                            fontSize: "12px",
                            color: "#888",
                            marginTop: "4px",
                            maxWidth: "150px",
                            textAlign: "center"
                        }}>
                            Click profile to sign in & unlock the input box
                        </span>
                    )}
                </div>
            </div>


            <div className="main-container">
                {!showResult ? <>
                    <div className="greet">
                        <p><span>Hello, Shubham</span></p>
                        <p>How can I Help You today.</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>
                                suggest beautiful places to see on an upcoming road trip
                            </p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>
                                Briefly summarize this article: urban planning
                            </p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>
                                Brainstorm team bonding activities for  our work retreat
                            </p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>
                                Improve the readibility of the following code      </p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </> :
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>
                                {recentPrompt}
                            </p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}>
                            </p>}

                        </div>
                    </div>
                }

                {/* <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="enter your text" />
                        <div className="search-actions">
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p class="gemini-warning">⚠️ Gemini can make mistakes. Check important info.</p>

                </div> */}
                {isSignedIn && (
                    <div className="main-bottom">
                        <div className="search-box">
                            <input
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                type="text"
                                placeholder="enter your text"
                            />
                            <div className="search-actions">
                                <img src={assets.gallery_icon} alt="" />
                                <img src={assets.mic_icon} alt="" />
                                {input && (
                                    <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                                )}
                            </div>
                        </div>
                        <p className="gemini-warning">
                            ⚠️ Gemini can make mistakes. Check important info.
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Main

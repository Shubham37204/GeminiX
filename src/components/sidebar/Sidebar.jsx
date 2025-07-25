import { useState, useContext } from 'react';
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { Context } from '../../context/Context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const {
        onSent,
        prevPrompts,
        setRecentPrompt,newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt='Toggle sidebar menu' />
                <div onClick={()=>newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="Create new chat" />
                    {extended ? <p>New chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (<div key={index} onClick={()=>loadPrompt(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="Message icon" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>)
                        })}
                    </div> :
                    null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Help icon" />
                    {extended ? <p>  Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="Activity icon" />
                    {extended ? <p> Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>setting</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
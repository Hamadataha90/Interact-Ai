import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [chats, setChats] = useState([
    { id: 1, title: 'What is React?', timestamp: 'Today' },
    { id: 2, title: 'Explain JavaScript closures', timestamp: 'Today' },
  ]);

  const handleNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      title: 'New Chat ' + (chats.length + 1),
      timestamp: 'Today',
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={() => setExtended(!extended)} className='menu' src={assets.menu_icon} alt="Menu" />
        
        <div className="new-chat" onClick={handleNewChat} style={{ cursor: 'pointer' }}>
          <img src={assets.plus_icon} alt="New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {chats.map(chat => (
              <div key={chat.id} className="recent-entry">
                <img src={assets.message_icon} alt="Chat Icon" />
                <p>{chat.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry last">
          <img src={assets.setting_icon} alt="Settings" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

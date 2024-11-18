import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { useContext, useEffect, useState, useRef } from 'react';
import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faStop, faCopy } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const {
    onSent,
    showResult,
    setShowResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  
  const [displayedText, setDisplayedText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTextFullyDisplayed, setIsTextFullyDisplayed] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const textContainerRef = useRef(null);

  useEffect(() => {
    if (showResult && resultData && !isCancelled) {
      const words = resultData.split(' ').map(word => word.replace(/[#*]/g, ''));
      setDisplayedText('');
      setIsTextFullyDisplayed(false);

      const timeoutIds = []; // للاحتفاظ بمعرفات التوقيت

      words.forEach((word, index) => {
        const timeoutId = setTimeout(() => {
          if (isCancelled) {
            return; // إلغاء العملية إذا تم تعيين isCancelled
          }
          setDisplayedText((prev) => prev + (prev ? ' ' : '') + word);
          
          if (textContainerRef.current) {
            textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
          }

          if (index === words.length - 1) {
            setIsTextFullyDisplayed(true);
          }
        }, index * 30);

        timeoutIds.push(timeoutId); // حفظ معرف التوقيت
      });

      return () => {
        timeoutIds.forEach(clearTimeout); // مسح كل مؤقتات
      };
    }
  }, [showResult, resultData, isCancelled]);

  useEffect(() => {
    if (!loading && isTextFullyDisplayed) {
      setIsSending(false);
    }
  }, [loading, isTextFullyDisplayed]);

  const handleSend = () => {
    setUserInput(input);
    setShowResult(false);
    setIsSending(true);
    setIsTextFullyDisplayed(false);
    setDisplayedText('');
    setIsCancelled(false); // إعادة تعيين حالة الإلغاء عند الإرسال
    onSent(input, handleCancellation); // تمرير دالة إلغاء كوسيلة لتحديث isCancelled
  };

  const handleCancellation = () => {
    setIsCancelled(true); // تعيين isCancelled إلى true لإيقاف التوليد
    setIsSending(false); // تعيين isSending إلى false لإخفاء زر الانتظار
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // منع السلوك الافتراضي للـ Enter
      if (e.shiftKey) {
        handleCancellation(); // إذا كان Shift مضغوطًا مع Enter، أوقف العملية
      } else {
        handleSend(); // إرسال الإدخال عند الضغط على Enter
      }
    }
  };

  return (
    <div className='main'>
      <Navbar className="navbar">
        <Container className='row'>
          <Navbar.Brand className="text-white d-flex justify-content-between">
            <img src={assets.user_icon} alt="User Icon" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            InteractAI
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="main-container">
        {!showResult && !loading ? (
          <div className="greet">
            <p><span>Hello, Dev.</span></p>
            <p>How can I help you today?</p>
          </div>
        ) : (
          <div className='chat-container' >
            <div className='message-bubble user-message'>
              <div className="user-input-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {!loading && <p className="user-input">{userInput}</p>}
                {displayedText && (
                  <FontAwesomeIcon 
                    icon={faCopy} 
                    className="copy-icon" 
                    onClick={() => handleCopy(displayedText)} 
                    style={{ cursor: 'pointer' }} 
                  />
                )}
              </div>
              <div 
                className="result-text" 
                ref={textContainerRef}
                style={{ height: '270px', overflowY: 'auto' }}
              >
                {displayedText}
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loader"></div>
        )}
      </Container>

      <div className="main-bottom">
        <Form className="search-box">
          <Form.Control
            onChange={(e) => {
              setInput(e.target.value);
              setIsSending(false);
            }}
            value={input}
            type="text"
            placeholder='Enter a Prompt here'
            disabled={loading}
            onKeyDown={handleKeyDown} // إضافة الحدث لمعالجة الضغط على المفاتيح
          />
          <Button
            variant="secondary"
            onClick={isSending ? handleCancellation : handleSend}
            disabled={loading}
            style={{ padding: '5px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isSending ? (
              <FontAwesomeIcon icon={faStop} style={{ color: "#ff4c4c" }} />
            ) : (
              <img src={assets.send_icon} alt="Send" style={{ width: '24px', height: '24px', filter: 'drop-shadow(0 0 3px #fff)' }} />
            )}
          </Button>
          
          <label htmlFor="file-upload">
            <img 
              src={assets.gallery_icon} 
              alt="Upload" 
              className="upload-icon"
            />
          </label>
          <input type="file" id="file-upload" style={{ display: 'none' }} />
          <img src={assets.mic_icon} alt="Mic" className="upload-icon" />
        </Form>
      </div>

      <div className="footer">
        <p>© 2024 InteractAI by Hamada Taha. All rights reserved.</p>
        <a href="https://github.com/Hamadataha90">Github</a>
        <a href="https://www.linkedin.com/in/hamada-elsayed-90h2011/">LinkedIn</a>
      </div>
    </div>
  );
};

export default Main;

import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import wrapper from 'assets/wrapperblack.png'
import './index.css'

interface HeaderNew {
    templateId: string;
}

const HeaderNew: React.FC<HeaderNew> = ({ templateId }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNav = () => setIsNavVisible(!isNavVisible);

  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate(`/`);
  };

  const showCoverPage = () => {
    navigate(`/cover/${templateId}`);
  };
    
  return (
    <div>
        <div className='main-header'>
            <div className='main-header-full'>
                <div className='main-header-content' onClick={toggleNav}>
                    <div className='main-header-logo'>comabooks</div>
                    <div className='main-header-right'>
                        <img src={wrapper} className='main-header-wrapper' />
                    </div>
                </div>

                <div className={`main-navigation ${isNavVisible ? 'show' : 'hide'}`}>
                <button onClick={showCoverPage}>Редактировать обложку</button>
                    {/* <Link to="/page2">Условия использования</Link> */}
                    <Link to="/policies">Политика использования</Link>
                    <button onClick={handleLogout}>Выйти</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderNew
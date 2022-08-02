import './index.scss';

import logo from './../../asserts/Icons/logo.svg';

export const Title = () => {
    return (
        <div className='title'>
            <div className='title__logo'>
                <img src={logo} alt="pomodoro" />
            </div>
            <h1 className='title__name'>Pomodoro</h1>
            <p className='title__slogan'>Let’s train your <span>focus!</span></p>
        </div>
    )
}

import { About } from "../About"
import { Title } from "../Title"

import './index.scss';

export const Header = () => {
    return (
        <header className='header'>
            <Title />
            <About />
        </header>
    )
}

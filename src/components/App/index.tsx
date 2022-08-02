import { Header } from '../Header';
import { MainLayout } from '../MainLayout';

import './index.scss';

export function App() {
    return (
        <div className="App">
            <div className='container'>
                <Header />
                <MainLayout />
            </div>
        </div>
    );
}



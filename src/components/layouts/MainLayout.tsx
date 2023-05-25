import React from 'react';
import Header from '../organisms/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../organisms/Footer';
import '../../App.css';
import { Container } from 'semantic-ui-react';

function MainLayout() {
    return (
        <div className='mainlayout'>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout
import React from 'react';
import AdvertisedProduct from './AdvertisedProduct';
import Banner from './Banner';
import Categories from './Categories';
import Contact from './Contact';
import Stats from './Stats';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <AdvertisedProduct></AdvertisedProduct>
            <Stats></Stats>
            <Contact></Contact>
        </div>
    );
};

export default Home;
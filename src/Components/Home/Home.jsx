import React from 'react';
import Banner from '../HomeComponents/Banner/Banner';
import TopScholarships from '../HomeComponents/TopScholarships/TopScholarships';
import Testimonials from '../HomeComponents/Testimonials/Testimonials';
import ContactUs from '../HomeComponents/ContactUs/ContactUs';
import FAQ from '../HomeComponents/FAQ/FAQ';
import { Element } from 'react-scroll';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <Testimonials></Testimonials>
            <Element name="contactSection">
                <ContactUs></ContactUs>
            </Element>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
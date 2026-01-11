import React from 'react';
import Banner from '../HomeComponents/Banner/Banner';
import TopScholarships from '../HomeComponents/TopScholarships/TopScholarships';
import Testimonials from '../HomeComponents/Testimonials/Testimonials';
import ContactUs from '../HomeComponents/ContactUs/ContactUs';
import FAQ from '../HomeComponents/FAQ/FAQ';
import { Element } from 'react-scroll';
import Features from '../HomeComponents/Features/Features';
import Services from '../HomeComponents/Services/Services';
import Highlights from '../HomeComponents/Highlights/Highlights';
import Newsletter from '../HomeComponents/Newsletter/Newsletter';
import CTA from '../HomeComponents/CTA/CTA';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopScholarships></TopScholarships>
            <Highlights></Highlights>
            <Testimonials></Testimonials>
            <Features></Features>
            <Services></Services>
            <Element name="contactSection">
                <ContactUs></ContactUs>
            </Element>
            <FAQ></FAQ>
            <Newsletter></Newsletter>
            <CTA></CTA>
        </div>
    );
};

export default Home;
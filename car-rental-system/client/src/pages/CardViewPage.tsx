import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AddCard from '../components/CardManage/AddCard';
import CardView from '../components/CardManage/ViewCards';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

export default function CardViewPage() {

    const params = useParams();
    const [posts, setPosts] =useState<any>([]);

    return (
        <div>
            <Header />
            <div
                className="hpimage"
                style={{
                    backgroundColor: "radial-gradient", height: "100vh"
                }}
            >


                <div className="d-flex float-start mt-5 ms-5">
                    <AddCard />
                </div>

            <Link to={`/add-payment`}><button type="button" className="btn btn-info  btn-grad float-end mt-5 ms-5" style={{ width: "250px", height: "50px", margin: "50px" }}>
                    Back to Payment 
                </button></Link>
 
                <div>
                    <CardView />
                </div>


            </div>
            <Footer />


        </div>

    )
}
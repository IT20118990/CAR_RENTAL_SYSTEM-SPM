import React, { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingDetails from '../components/Payment/BookingDetails';
import { useParams } from 'react-router-dom';
import {
  CreditCard,
} from '../components/Card/CreditCard';
import './styles.css'

const initialState: CreditCard = {
  _id: '',
  cardNumber: '',
  cardHolder: '',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
};

export default function AddPayment() {

  const [booking_id, setBookingId] = useState("");
  const [payment_id, setPaymentId] = useState("");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [cost_per_day, setCostPerDay] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [posts, setPosts] = useState<any>([]);
  const [image, setImage] = useState("");
  const [no_of_days, setNoOfDays] = useState("");
  const [type_of_service, setTypeOfService] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [payment_status, setPaymentStatus] = useState("");

  const navigate = useNavigate();

  const params = useParams();



  const [cardsDatas, setCardsDatas] = useState<CreditCard[]>([]);

  const config = localStorage.getItem('access_token') ? {
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
  } : {};

  useEffect(() => {
    const fetchCard = async () => {

      const res = await axios.get('http://localhost:5000/api/cards', config)
      const cards: CreditCard[] = res.data;
      setCardsDatas(cards)
      console.log(cards)

    }
    fetchCard()
    axios.get(`http://localhost:5000/api/bookings/getone/${params.booking_id}`)

      .then(res => {

        console.log(res.data)
        setPosts(res.data)
        setBookingId(res.data['booking_id']);
        setName(res.data['name']);
        setContactNumber(res.data['contact_number']);


      })
      .catch(err => {
        console.log(err)
      })
  }, [])



  const PayData = {
    booking_id,
    name,
    card,
    cost_per_day,
    contact_number,
  }


  return (
    <div>
      <Header />
      <div className='background-radial-gradient'>
        <div className="container">
          <div className="row"> <Link to={`/view-cards`}><button type="button" className="btn btn-info btn-grad" style={{ width: "250px", height: "50px", float: "right" }}>
            see Your Cards
          </button></Link></div>
          <div className="row">
            <div className="col">
              <div className='card-container '>
                <div className="card" style={{ height: "700px", background: "linear-gradient(140deg, rgba(72, 115, 150, 1) 50%, rgba(57, 108, 150, 0.65) 65%, rgba(42, 102, 150, 0.6) 50%, rgba(27, 95, 150, 0.95) 80%, rgba(12, 88, 150, 1) 90%, rgba(0, 83, 150, 0.8) 70%)", marginTop: "50px" }}>
                  <div className="card-body px-4 px-md-5">
                    <section className="mb-4">

                      <h2 className="h1-responsive font-weight-bold text-center my-4" style={{ color: "hsl(218, 81%, 95%)" }}>Place Your Instalment Here</h2>

                      <div className="row">

                        <div className="col-md-9 mb-md-0 mb-5" >
                          <form id="contact-form" name="contact-form" action="mail.php" method="POST" >

                            <div className="form-floating mb-3">
                              <input className="form-control" id="bookingid" type="text" placeholder="Booking ID"  />
                              <label htmlFor="bookingid" style={{ fontSize: "16px" }} >Booking ID</label>

                            </div>
                            <br />
                            <div className="form-floating mb-3">
                              <input className="form-control" id="name" type="text" placeholder="Name" />
                              <label htmlFor="name" style={{ fontSize: "16px" }}>Name</label>

                            </div>
                            <br />
                            <div className="form-floating mb-3">
                              <input className="form-control" id="contact" type="text" placeholder="Contact Number"  />
                              <label htmlFor="contact" style={{ fontSize: "16px" }}>Contact Number</label>

                            </div>
                            <br />

                            <select className="form-select mb-4 text-grey" aria-label="Disabled select example" onChange={(e) => setCard(e.target.value)}>
                              <option selected style={{ fontSize: "16px" }}>credit Card</option>
                              <option selected style={{ fontSize: "16px" }}>visa Card</option>
                              <option selected style={{ fontSize: "16px" }}>Select a Card</option>
                              <option selected style={{ fontSize: "16px" }}>Select a Card</option>
                              {cardsDatas.map(card => {
                                // eslint-disable-next-line react/jsx-key
                                return <option value={card.cardNumber}>{card.cardNumber}</option>
                              })}
                            </select>

                            <br />

                            <div className="form-floating mb-3">
                              <input className="form-control" id="amount" type="text" placeholder="Amount" onChange={(e) => setCostPerDay(e.target.value)} />
                              <label htmlFor="amount" style={{ fontSize: "16px" }}>Amount</label>

                            </div>

                          </form>
                          <br />

                          <div className="text-center">
                            <Link to="/payment-view">
                              <button type="button" className="btn btn-primary" style={{ width: "400px" }} >
                                Pay Now
                              </button>
                            </Link>
                          </div>
                          <div className="status"></div>
                        </div>
                      </div>
                    </section>
                  </div></div></div>

              <br />
            </div>
            <br />
          </div>
        </div>


      </div>
      <Footer />


    </div>

  )
}
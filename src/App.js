import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import './filter.css';
import carImage from './car.jpg';
import hotelsImage from './hotels.jpg';
import travelPackagesImage from './case.jpg';


const Filter = () => {
  return (
    <div className="filter-panel">
      <div className="sort-by">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort">
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
          <option value="earliest">Earliest</option>
          <option value="latest">Latest</option>
        </select>
      </div>

      <div className="filter-section">
        <h3>Arrival Time</h3>
        <label><input type="radio" name="arrival-time" /> 5:00 AM - 11:59 AM</label><br />
        <label><input type="radio" name="arrival-time" /> 12:00 PM - 5:59 PM</label>
      </div>

      <div className="filter-section">
        <h3>Stops</h3>
        <label><input type="radio" name="stops" /> Nonstop - $230</label><br />
        <label><input type="radio" name="stops" /> 1 Stop - $230</label><br />
        <label><input type="radio" name="stops" /> 2+ Stops - $230</label>
      </div>

      <div className="filter-section">
        <h3>Airlines Included</h3>
        <label><input type="radio" name="airline" /> Alitalia - $230</label><br />
        <label><input type="radio" name="airline" /> Lufthansa - $230</label><br />
        <label><input type="radio" name="airline" /> Air France - $230</label><br />
        <label><input type="radio" name="airline" /> Brussels Airlines - $230</label><br />
        <label><input type="radio" name="airline" /> Air Italy - $230</label><br />
        <label><input type="radio" name="airline" /> Siberia - $230</label>
      </div>
    </div>
  );
};

const App = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights');
        setFlights(response.data.flights);
      } catch (err) {
        setError('Error fetching the flights: ' + err.message);
      }
    };

    fetchFlights();
  }, []);

  if (error) return <div>{error}</div>;
  if (!flights.length) return <div>Yükleniyor...</div>;

  return (
    <div className="container-a">
      <div className="flight-container">
        {flights.map(flight => (
          <div key={flight.flightNumber}>
            <div className="flight-card">
              <div className="flight-route">
                <h3>Milano - Madrid</h3>
              </div>
              <div className="flight-schedule">
                <div className="flight-departure">
                  <p>🛫 Departure</p>
                  <h4>{flight.departureTime}</h4>
                  <p>Airport: MXP</p>
                </div>
                <div className="flight-duration">
                  <p>✈️ {flight.airline}</p>
                  <p>2h 25m (Nonstop)</p>
                </div>
                <div className="flight-arrival">
                  <p>🛬 Arrival</p>
                  <h4>{flight.arrivalTime}</h4>
                  <p>Airport: MAD {flight.flightName}</p>
                </div>
              </div>
              <div className="flight-price">
                <h3>Price: ${flight.price}</h3>
                <h4>Round Trip</h4>
              </div>
              <div className="flight-book">
                <a href="#">Book Flight</a>
              </div>
            </div>
            <div className="flight-buttons">
              <a href="#">Check the details</a>
            </div>
          </div>   
        ))}
      </div>
      <Filter /> {/* Render the Filter component */}
      <Services /> {/* Render the Services component */}
    </div>
  );
};

const Services = () => {
  return (
    <div className="services-container">
      {/* Card 1: Car Rentals */}
      <div className="card">

        <img src={carImage} alt="Car Rentals" />
        <div className="card-content">
        </div>
      </div>

      {/* Card 2: Hotels */}
      <div className="card">
        <img src={hotelsImage} alt="Hotels" />
      </div>

      {/* Card 3: Travel Packages */}
      <div className="card">
        <img src={travelPackagesImage} alt="Travel Packages" />
        <div className="card-content">
        </div>
      </div>
    </div>
  );
};


export default App;

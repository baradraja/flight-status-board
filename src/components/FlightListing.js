
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  FormControl,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import Loader from './Skeleton';
import "../App.css";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Navbar from './Navbar/Navbar';
const FlightListing = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [trip, setTrip] = useState("One-way");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");


  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://flight-status-mock.core.travelopia.cloud/flights');
        setFlights(response.data);
        setLoading(false); // Data has been loaded
      } catch (error) {
        console.error('Error fetching flights:', error);
        setLoading(false); // Data has been loaded
      }  finally {
        setLoading(false);
      }
    };

    fetchFlights();

    const interval = setInterval(() => {
      fetchFlights();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleTrip = (e) => {
    setTrip(e.target.value);
  };

  // function stringAvatar(name) {
  //   return {
  //     children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  //   };
  // }

  function stringAvatar(name) {
    const names = name.split(" ");
    const firstName = names[0];
    const lastName = names[1];

    let children;

    if (firstName.length > 1 && lastName) {
      children = `${firstName[0]}${lastName}`;
    } else {
      children = firstName;
    }

    return {
      children: children,
    };
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(selectedDate);
  };
  const handleOrigin = (e) => {
    setOrigin(e.target.value);
    console.log(origin);
  };
  const handleDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleSearch = () => {
    const selectedDate1 = new Date(selectedDate);

    const filteredFlights = flights.filter((flight) => {
      const flightDate = new Date(flight.departureTime);

      const flightDateOnly = flightDate.toISOString().split("T")[0];
      console.log(
        flightDateOnly,
        "selected",
        selectedDate1.toISOString().split("T")[0]
      );
      const selectedDateOnly = selectedDate1.toISOString().split("T")[0];

      return (
        flightDateOnly === selectedDateOnly ||
        (flight.origin.toLowerCase() === origin.toLowerCase().trim() &&
          flight.destination.toLowerCase() === destination.toLowerCase().trim())
      );
    });

    setFilteredFlights(filteredFlights);
    setIsSearching(true);
  };

  return (
    <>
    <Navbar />
      <div className="listing__header">
        <Container>
          <div className="listing__main">
            <div className="listing__search">
              <h2 className="text__center">Search Flights</h2>
              <p className="text__center">
                Search for flights by destination, departure time, and status.
              </p>

              <FormControl fullWidth style={{ padding: "2rem" }}>
                <div className="radio__button">
                  <RadioGroup
                    aria-label="gender"
                    name="Trip"
                    row
                    value={trip}
                    onChange={handleTrip}
                  >
                    <FormControlLabel
                      value="One-way"
                      control={<Radio />}
                      label="One-way"
                      labelPlacement="end"
                    />

                    <FormControlLabel
                      value="Round-Trip"
                      control={<Radio />}
                      label="Round-Trip"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
                <div className="form__div">
                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    color="secondary"
                    value={origin}
                    onChange={handleOrigin}
                  />
                  <CompareArrowsIcon size={30} />
                  <TextField
                    id="outlined-basic"
                    label="Destination"
                    variant="outlined"
                    value={destination}
                    onChange={handleDestination}
                  />
                  <TextField
                    id="date"
                    label="Depart On"
                    type="date"
                    defaultValue={selectedDate}
                    value={selectedDate}
                    onChange={handleDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {trip === "Round-Trip" && (
                    <TextField
                      id="date"
                      label="Return On"
                      type="date"
                      defaultValue="2017-05-24"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  <Button variant="contained" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </FormControl>
            </div>
          </div>
        </Container>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Flight Listings
          </Typography>
          <Grid container spacing={2}>
            {loading ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Loader noCard={5} noDark={5} />
              </Grid>
            ) : isSearching ? (
              filteredFlights.map((flight) => {
                const dateObject = new Date(flight.departureTime);
                const formattedDate = dateObject.toLocaleString();
                return (
                  <Grid
                    item
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    key={flight.id}
                  >
                    {/* Use Link to navigate to the flight details page */}
                    <Link
                      to={`/flights/${flight.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card>
                        <CardContent>
                          <Stack
                            sx={{ minWidth: 0 }}
                            mt={2}
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar {...stringAvatar(flight.airline)} />
                            <Typography variant="h6">
                              {flight.airline}
                            </Typography>
                          </Stack>

                          <Stack
                            sx={{ minWidth: 0 }}
                            mt={2}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                          >
                            <Typography variant="body1">
                              From : {flight.origin}
                            </Typography>
                            <Typography variant="body1">
                              To : {flight.destination}
                            </Typography>
                            <Typography variant="body1">
                              Flight No : {flight.flightNumber}
                            </Typography>
                            <Typography variant="body1">
                              Scheduled Depart : {formattedDate}
                            </Typography>
                          </Stack>

                          <Button
                            mt={10}
                            size="small"
                            variant="outlined"
                            style={{
                              backgroundColor:
                                flight.status === "On Time"
                                  ? "green"
                                  : flight.status === "Delayed"
                                  ? "red"
                                  : flight.status === "Departed"
                                  ? "blue"
                                  : flight.status === "Boarding"
                                  ? "orange"
                                  : "black",
                              color: "white",
                            }}
                          >
                            {flight.status}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            ) : (
              flights.map((flight) => {
                const dateObject = new Date(flight.departureTime);
                const formattedDate = dateObject.toLocaleString();
                return (
                  <Grid
                    item
                    direction="row"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    key={flight.id}
                  >
                    {/* Use Link to navigate to the flight details page */}
                    <Link
                      to={`/flights/${flight.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card>
                        <CardContent>
                          <Stack
                            sx={{ minWidth: 0 }}
                            mt={2}
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar {...stringAvatar(flight.airline)} />
                            <Typography variant="h6">
                              {flight.airline}
                            </Typography>
                          </Stack>

                          <Stack
                            sx={{ minWidth: 0 }}
                            mt={2}
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            divider={
                              <Divider orientation="vertical" flexItem />
                            }
                          >
                            <Typography variant="body1">
                              From : {flight.origin}
                            </Typography>
                            <Typography variant="body1">
                              To : {flight.destination}
                            </Typography>
                            <Typography variant="body1">
                              Flight No : {flight.flightNumber}
                            </Typography>
                            <Typography variant="body1">
                              Scheduled Depart : {formattedDate}
                            </Typography>
                          </Stack>

                          <Button
                            mt={10}
                            size="small"
                            variant="outlined"
                            style={{
                              backgroundColor:
                                flight.status === "On Time"
                                  ? "green"
                                  : flight.status === "Delayed"
                                  ? "red"
                                  : flight.status === "Departed"
                                  ? "blue"
                                  : flight.status === "Boarding"
                                  ? "orange"
                                  : "black",
                              color: "white",
                            }}
                          >
                            {flight.status}
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default FlightListing;

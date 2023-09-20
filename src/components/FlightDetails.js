// src/components/FlightDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import Loader from './Skeleton';
import Navbar from './Navbar/Navbar';

const FlightDetails = () => {
  const { id } = useParams();
  const [flightDetails, setFlightDetails] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
        setFlightDetails(response.data);
        setLoading(false); // Data has been loaded

      } catch (error) {
        console.error('Error fetching flight details:', error);
        setLoading(false); // Data has been loaded
      }
    };

    fetchFlightDetails();
  }, [id]);
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  const flightDateOnly = flightDetails?.departureTime
    ? new Date(flightDetails.departureTime).toISOString().split("T")[0]
    : null;
    return (
      <Container>
        <Navbar />
      <Container style={{ marginTop: "50px" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          className="text__center"
        >
          Flight Details
        </Typography>
        {loading ? ( // Show the skeleton loader while loading
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Loader noCard={1} noDark={10} />
          </Grid>
        ) : (
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem",
              }}
            >
              <Avatar {...stringAvatar(flightDetails.airline)} size="lg" />
  
              <Button variant="contained" color="primary">
                Book Now
              </Button>
            </Box>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                }}
              >
                <Typography variant="h6">{flightDetails.airline}</Typography>
                <Typography variant="body2"></Typography>
              </Box>
              <Typography variant="body2">
                {flightDateOnly && (
                  <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                    Flight Date: {flightDateOnly}
                  </p>
                )}
              </Typography>
  
              <Button
                mt={10}
                size="large"
                variant="contained"
                style={{
                  backgroundColor:
                    flightDetails.status === "On Time"
                      ? "green"
                      : flightDetails.status === "Delayed"
                      ? "red"
                      : flightDetails.status === "Departed"
                      ? "blue"
                      : flightDetails.status === "Boarding"
                      ? "orange"
                      : "black",
                }}
              >
                {flightDetails.status}
              </Button>
            </CardContent>
          </Card>
        )}
      </Container>
      </Container>
    );
  };
  
  export default FlightDetails;
  
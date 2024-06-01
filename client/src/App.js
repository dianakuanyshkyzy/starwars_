import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlanetDetail from './PlanetDetail';
import { AppBar, Toolbar, Typography, InputBase, Button, Container, Grid, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    axios.get('/api/planets')
      .then(response => {
        setPlanets(response.data);
        setFilteredPlanets(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = () => {
    const results = planets.filter(planet =>
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlanets(results);
  };

  const openModal = (planet) => {
    setSelectedPlanet(planet);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPlanet(null);
  };

  const getBackgroundImage = (index) => {
    const images = [
      'diana/image1.jpg',
      'diana/image2.jpg',
      'diana/image3.jpg',
      'diana/image4.jpg'
    ];
    return images[index % images.length];
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Star Wars Planets
            </Typography>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <SearchIcon />
              <InputBase
                placeholder="Search planets..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginLeft: 8, color: 'white' }}
              />
              <Button color="inherit" onClick={handleSearch}>Search</Button>
            </div>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {filteredPlanets.map((planet, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={planet._id}>
                <Card>
                  <CardActionArea onClick={() => openModal(planet)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={getBackgroundImage(index)}
                      alt={planet.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {planet.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Planet Detail"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#282c34',
              color: 'white'
            }
          }}
        >
          {selectedPlanet && (
            <div>
              <Typography variant="h4">{selectedPlanet.name}</Typography>
              <Typography><strong>Rotation Period:</strong> {selectedPlanet.rotation_period}</Typography>
              <Typography><strong>Orbital Period:</strong> {selectedPlanet.orbital_period}</Typography>
              <Typography><strong>Diameter:</strong> {selectedPlanet.diameter}</Typography>
              <Typography><strong>Climate:</strong> {selectedPlanet.climate}</Typography>
              <Typography><strong>Gravity:</strong> {selectedPlanet.gravity}</Typography>
              <Typography><strong>Terrain:</strong> {selectedPlanet.terrain}</Typography>
              <Typography><strong>Surface Water:</strong> {selectedPlanet.surface_water}</Typography>
              <Typography><strong>Population:</strong> {selectedPlanet.population}</Typography>
              <Button variant="contained" color="primary" onClick={closeModal} style={{ marginTop: '20px' }}>
                Close
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </Router>
  );
}

export default App;

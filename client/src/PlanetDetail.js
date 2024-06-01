import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PlanetDetail() {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    axios.get(`/api/planets/${id}`)
      .then(response => setPlanet(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!planet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="PlanetDetail">
      <h2>{planet.name}</h2>
      <p><strong>Rotation Period:</strong> {planet.rotation_period}</p>
      <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
      <p><strong>Diameter:</strong> {planet.diameter}</p>
      <p><strong>Climate:</strong> {planet.climate}</p>
      <p><strong>Gravity:</strong> {planet.gravity}</p>
      <p><strong>Terrain:</strong> {planet.terrain}</p>
      <p><strong>Surface Water:</strong> {planet.surface_water}</p>
      <p><strong>Population:</strong> {planet.population}</p>
    </div>
  );
}

export default PlanetDetail;

import React, { useState, useEffect } from 'react';

import { loadFarmData } from '../utils/helpers.js';
import { Container } from '@chakra-ui/react';

import FarmsHero from './FarmsHero';
import CardGrid from './CardGrid';

const Farms = (props) => {
  const [farms, setFarms] = useState([]);

  async function getFarms() {
    const result = await fetch('/products/farms');
    const data = await result.json();
    setFarms(data);
  }

  useEffect(() => {
    getFarms();
  }, []);

  return (
    <div className="farmsContainer">
      <FarmsHero />
      <Container maxWidth="95%">
        {farms && <CardGrid data={farms} linkTo="/farm" />}
      </Container>
    </div>
  );
};

export default Farms;

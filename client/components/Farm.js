import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@chakra-ui/react';
import { loadFarmProducts, products as prods } from '../utils/helpers';
import FarmsHero from './FarmsHero';
import CardGrid from './CardGrid';
import Search from './Search';

const Farm = (props) => {
  const [farm, setFarm] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    // const farm = loadFarmProducts();
    // console.log(farmId);
    // setFarm(farm);
    // setProducts(farm.products);
    // setFilteredProducts(farm.products);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`/products/all/${id}`);
    const data = await response.json();
    console.log(data);
    const mappedData = data.map((product) => {
      const prod = prods.filter((p) => {
        console.log(p);
        console.log(product);
        return p.id === product.ProductTypeId;
      });
      console.log(prod);
      if (prod.length) {
        product.image = prod[0].image;
      }
      return product;
    });
    setProducts(mappedData);
    setFilteredProducts(mappedData);
    console.log(filteredProducts);
  };

  const searchProducts = (term) => {
    if (term === '') return setFilteredProducts(products);
    const searchableFields = ['name', 'description'];
    const filteredProducts = products.filter((product) => {
      return searchableFields
        .map((field) => {
          return product[field].includes(term);
        })
        .some((val) => val === true);
    });
    console.log(filteredProducts);
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="farmsContainer">
      <FarmsHero />
      <Container maxWidth="95%">
        <Search onChange={searchProducts} />
        {filteredProducts && <CardGrid data={filteredProducts} />}
      </Container>
    </div>
  );
};

export default Farm;

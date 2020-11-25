import React, { useState, useEffect } from 'react';

import { Heading } from '@chakra-ui/react';
import ProductTable from './ProductTable';
import CreateProduct from './CreateProduct';
import ProductAnalytics from './ProductAnalytics';

const Products = (props) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    console.log('running fetch');
    fetch('/products/all/1')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data.sort((a, b) => a.id - b.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="productStats">
      <Heading as="h2">Products</Heading>
      <ProductTable products={products} fetchAllProducts={fetchAllProducts} />
      <CreateProduct fetchAllProducts={fetchAllProducts} />
      <Heading as="h2" className="mt">
        Analytics
      </Heading>
      <ProductAnalytics />
    </div>
  );
};

export default Products;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';

import './Home.css';
import { getAllProducts } from '../Actions/Product';

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='home'>
      {products && products.map(product => (
        <ProductCard
          key={product._id}
          name={product.name}
          description={product.description}
          price={product.price}
          category={product.category}
          stock={product.stock}
          id={product._id}
        />
      ))}
    </div>
  );
}

export default Home;

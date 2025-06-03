// FILE: src/components/CustomerView.jsx
import React from 'react';
import ProductList from './product/ProductList'; // ✅ Correct import path
import HeroBanner from './HeroBanner';

export default function CustomerView() {
  return (
    <div>
      <HeroBanner />
      <ProductList />
    </div>
  );
}

export default function CustomerView() {
  return (
    <div>
      <ProductList />
    </div>
  );
}

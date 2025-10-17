'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const SuccessPage = () => {
  useEffect(() => {
    // Clear the cart after successful payment
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-500 mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase.</p>
      <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;

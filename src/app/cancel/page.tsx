import Link from 'next/link';

const CancelPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Payment Canceled</h1>
      <p className="text-lg mb-8">Your order has been canceled. You have not been charged.</p>
      <Link href="/cart" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Cart
      </Link>
    </div>
  );
};

export default CancelPage;

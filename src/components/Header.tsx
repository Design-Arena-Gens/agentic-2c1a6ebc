import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SnapCart
        </Link>
        <nav>
          <Link href="/cart" className="text-lg">
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

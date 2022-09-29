import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <Link data-test-id="products-link" href="/planters">
          Product Page
        </Link>
      </div>
    </header>
  );
}

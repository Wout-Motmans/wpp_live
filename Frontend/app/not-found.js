import Link from 'next/link'

export default function NotFound() {
  return <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <div>
        <Link href="Frontend\app\dashboard\page.tsx">Go back to dashboard</Link>
      </div>
  </div>
}
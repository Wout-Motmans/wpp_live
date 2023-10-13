'use client'
import { useAuthCheck } from './_hooks/useAuthCheck';

export default function Home() {
  const { requireAuth } = useAuthCheck();

  //requireAuth();

  return (
    <main className="">
      <p>MAIN PAGE</p>
    </main>
  )
}

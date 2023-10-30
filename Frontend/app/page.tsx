'use client'
import { useEffect } from 'react';
import { useAuthCheck } from './_hooks/useAuthCheck';

export default function Home() {
  const { requireAuth } = useAuthCheck();

  useEffect(() => {
    requireAuth();
  }, []);


  return (
    <main className="">
      <p>MAIN PAGE</p>
    </main>
  )
}

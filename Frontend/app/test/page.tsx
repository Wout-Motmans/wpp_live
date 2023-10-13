'use client'
import { useAuthCheck } from '../_hooks/useAuthCheck';

export default function Home() {
    const { requireAuth } = useAuthCheck();

    //requireAuth();

  
  return (
    <main className="">
        <p>TEST PAGE</p>
    </main>
  )
}
  
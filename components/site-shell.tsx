'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeaderComponent from '@/components/header.component';
import FooterComponent from '@/components/footer.component';
import GoogleParticlesCanvas from '@/components/googleParticleBackground';



export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  
  // Don't show header/footer on events page
  const isEventsPage = pathname.startsWith('/events');

  useEffect(() => {
    // Show loading state
    setIsNavigating(true);
    
    // Small delay to show transition, then update content
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsNavigating(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [children, pathname]);
  
  if (isEventsPage) {
    return <>{children}</>;
  }
  
  return (
    <>
      {/* Background particles - persists across all pages */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GoogleParticlesCanvas />
      </div>

      {/* Page content with fade transition */}
      <div className={`relative z-10 transition-opacity duration-200 ${isNavigating ? 'opacity-50' : 'opacity-100'}`}>
        <HeaderComponent />
        {displayChildren}
        <FooterComponent />
      </div>
    </>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import HeaderComponent from '@/components/header.component';
import FooterComponent from '@/components/footer.component';



export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show header/footer on events page
  const isEventsPage = pathname.startsWith('/events');
  
  if (isEventsPage) {
    return <>{children}</>;
  }
  
  return (
    <>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </>
  );
}

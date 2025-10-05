"use client";

import { useState, useMemo, useEffect } from 'react';
import { Calendar, TrendingUp, Star, Code, Users, Sparkles, Zap, ArrowRight, Globe, Target } from 'lucide-react';
import { PastEventCard } from '@/components/events/PastEventCard';
import { UpcomingEventCard } from '@/components/events/UpcomingEventCard';
import { EventFilter } from '@/components/events/EventFilter';
import { EventDetailModal } from '@/components/events/EventDetailModal';
import Header from '@/components/header.component'
import Footer from '@/components/footer.component'
import { 
  Event, 
  EventFilters, 
  PastEvent, 
  UpcomingEvent, 
  isPastEvent, 
  isUpcomingEvent
} from '@/lib/types/events';
import { mockEvents } from '@/lib/data/mockEvents';

export default function EventsPage() {
  const [filters, setFilters] = useState<EventFilters>({
    organization: 'All',
    status: 'All',
    search: ''
  });
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState<{[key: number]: number}>({
    1: 0,
    2: 0  
  });
  // Mobile detection with proper SSR handling
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      if (filters.organization !== 'All' && event.organization !== filters.organization) {
        return false;
      }

      if (filters.search && filters.search.length > 0) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.shortDescription.toLowerCase().includes(searchLower) ||
          event.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
          event.organization.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [filters]);

  // Helper function to check if event is currently live
  const isLiveEvent = (event: Event): boolean => {
    if (!isUpcomingEvent(event)) return false;
    const now = new Date();
    const eventStart = new Date(event.date);
    // If event has endDate, use it; otherwise assume 2 hours duration
    const eventEnd = event.endDate ? new Date(event.endDate) : new Date(eventStart.getTime() + 2 * 60 * 60 * 1000);
    return now >= eventStart && now <= eventEnd;
  };

  // Sort upcoming events by date (ascending) and separate live events
  const allUpcomingEvents = filteredEvents.filter(isUpcomingEvent).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const liveEvents = allUpcomingEvents.filter(isLiveEvent);
  const upcomingEvents = allUpcomingEvents.filter(event => !isLiveEvent(event));
  const pastEvents = filteredEvents.filter(isPastEvent);

  const handleEventDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleEventGallery = (event: PastEvent) => {
    handleEventDetails(event);
  };

  const handleEventRegister = (event: UpcomingEvent) => {
    window.open(event.registrationUrl, '_blank');
  };

  // Detect mobile device - client-side only
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle header show/hide on scroll (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // At top, always show header
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down, hide header
        setShowHeader(false);
      } else {
        // Scrolling up, show header
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, lastScrollY]);

  useEffect(() => {
    // Skip scroll hijacking on mobile devices for better performance
    if (isMobile) {
      return;
    }

    let lastScrollTime = 0;
    let scrollAccumulator = 0;
    let consecutiveSmallScrolls = 0;
    let scrollDecayTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = (e: WheelEvent) => {
      // If the user is interacting with a native scrollable area (or form control),
      // don't hijack scrolling — let the browser handle it. This makes the site
      // feel natural for trackpads and nested scroll areas.
  const target = (e.target as HTMLElement) || null;
  let el: HTMLElement | null = target;
      let isOverInteractive = false;
      if (target) {
        const tag = (target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable) {
          isOverInteractive = true;
        }
      }

      let isOverScrollable = false;
      let footerScrollableEl: HTMLElement | null = null;
      while (el && el !== document.body) {
        try {
          const style = window.getComputedStyle(el);
          const overflowY = style.overflowY;
          if (el.scrollHeight > el.clientHeight && (overflowY === 'auto' || overflowY === 'scroll')) {
            isOverScrollable = true;
            if (el.id === 'footer-section') {
              footerScrollableEl = el as HTMLElement;
            }
            break;
          }
        } catch (err) {
          // ignore cross-origin or other issues
        }
        el = el.parentElement;
      }

      // If over an interactive element, let native behavior happen.
      if (isOverInteractive) {
        return;
      }

      // If over a scrollable area that's NOT the footer, let native behavior happen.
      if (isOverScrollable && !footerScrollableEl) {
        return;
      }

      // Only prevent default when we intend to hijack the scroll for section navigation
      e.preventDefault();

      const currentTime = Date.now();
      let deltaY = e.deltaY;
      let deltaX = e.deltaX;
      
      const timeDiff = currentTime - lastScrollTime;
      const isSmallDelta = Math.abs(deltaY) < 100;
      const isFrequent = timeDiff < 100;
      const isPixelMode = e.deltaMode === 0;
      
      if (isSmallDelta && isFrequent) {
        consecutiveSmallScrolls++;
      } else {
        consecutiveSmallScrolls = 0;
      }
      
      const isTouchpad = (isSmallDelta && isPixelMode) || consecutiveSmallScrolls >= 2;
      
      lastScrollTime = currentTime;
      
      if (isTouchpad) {
        if (scrollDecayTimeout) {
          clearTimeout(scrollDecayTimeout);
        }
        
        // Much more responsive accumulation for trackpad
        scrollAccumulator += deltaY * 0.5; 
        
        // Lower threshold for smoother, more responsive feel
        const baseThreshold = 40; // Reduced from 80
        const velocityFactor = Math.min(2, Math.abs(scrollAccumulator) / 30);
        const adaptiveThreshold = baseThreshold * velocityFactor;
        
        if (Math.abs(scrollAccumulator) < adaptiveThreshold) {
          scrollDecayTimeout = setTimeout(() => {
            scrollAccumulator *= 0.7; // Faster decay
          }, 100); // Reduced from 150ms
          return; 
        }
        
        deltaY = scrollAccumulator;
        scrollAccumulator = 0; 
      }
      
      // Much lower threshold for smoother trackpad experience
      const threshold = isTouchpad ? 30 : 20; // Reduced from 60 for trackpad
      
      // Handle scrolling within section 3 (footer section)
      if (currentSection === 3) {
        const footerSection = document.getElementById('footer-section');
        if (footerSection) {
          const maxScroll = footerSection.scrollHeight - footerSection.clientHeight;
          const currentScroll = footerSection.scrollTop;

          // Let the browser handle native scrolling inside the footer for smoother behavior.
          // Only intercept when the footer is already at the top and the user scrolls up
          // with sufficient intent to move to the previous section.
          if (currentScroll <= 0 && deltaY < 0 && Math.abs(deltaY) > threshold * 1.5) {
            setCurrentSection(prev => Math.max(prev - 1, 0));
            return;
          }

          // If footer is not at top or user is scrolling down, allow native scroll
          // (don't call preventDefault here — returning lets browser handle it)
          return;
        }
        return; // Stay in section 3
      }
      
      if (currentSection === 1 || currentSection === 2) {
        const container = document.getElementById(
          currentSection === 1 ? 'upcoming-events-container' : 'past-events-container'
        );
        
        if (container && container.children.length > 0) {
          const totalCards = container.children.length;
          const currentIndex = currentCardIndex[currentSection];
          
          const firstCard = container.children[0] as HTMLElement;
          const cardWidth = firstCard.offsetWidth;
          const gap = 12;
          const scrollUnit = cardWidth + gap;
          
          const viewport = container.parentElement;
          const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
          
          const cardsInView = Math.floor(viewportWidth / scrollUnit);
          
          const maxScrollIndex = Math.max(0, totalCards - cardsInView);
          
          // Smoother horizontal threshold for trackpad
          const horizontalThreshold = isTouchpad ? threshold * 1.2 : threshold; // Reduced from 1.5
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > horizontalThreshold) {
            if (deltaX > 0) {
              if (currentIndex < maxScrollIndex) {
                const newIndex = currentIndex + 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                // Smoother, faster transition for trackpad
                container.style.transition = isTouchpad ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
                container.style.transform = `translateX(${translateX}px)`;
              }
            } else {
              if (currentIndex > 0) {
                const newIndex = currentIndex - 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                // Smoother, faster transition for trackpad
                container.style.transition = isTouchpad ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
                container.style.transform = `translateX(${translateX}px)`;
              }
            }
            return;
          }
          
          if (Math.abs(deltaY) > threshold) {
            if (deltaY > 0) {
              if (currentIndex < maxScrollIndex) {
                const newIndex = currentIndex + 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                // Smoother, faster transition for trackpad
                container.style.transition = isTouchpad ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
                container.style.transform = `translateX(${translateX}px)`;
                return; 
              }
            } else {
              if (currentIndex > 0) {
                const newIndex = currentIndex - 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                // Smoother, faster transition for trackpad
                container.style.transition = isTouchpad ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
                container.style.transform = `translateX(${translateX}px)`;
                return;
              }
            }
          }
        }
      }

      if (Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          setCurrentSection(prev => {
            if (prev < 3) {
            if (prev === 1 || prev === 2) {
              const container = document.getElementById(
                prev === 1 ? 'upcoming-events-container' : 'past-events-container'
              );
              if (container) {
                container.style.transform = 'translateX(0px)';
              }
              setCurrentCardIndex(p => ({ ...p, [prev]: 0 }));
            }
            return prev + 1;
          }
          return prev;
        });
        } else {
          setCurrentSection(prev => Math.max(prev - 1, 0));
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        
        // If in section 3, scroll within footer instead of changing section
        if (currentSection === 3) {
          const footerSection = document.getElementById('footer-section');
          if (footerSection) {
            footerSection.scrollBy({ top: 100, behavior: 'smooth' });
          }
        } else {
          setCurrentSection(prev => Math.min(prev + 1, 3));
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        
        // If in section 3 and at top, go to previous section
        if (currentSection === 3) {
          const footerSection = document.getElementById('footer-section');
          if (footerSection && footerSection.scrollTop <= 0) {
            setCurrentSection(prev => Math.max(prev - 1, 0));
          } else if (footerSection) {
            footerSection.scrollBy({ top: -100, behavior: 'smooth' });
          }
        } else {
          setCurrentSection(prev => Math.max(prev - 1, 0));
        }
      } else if (e.key === 'ArrowRight' && (currentSection === 1 || currentSection === 2)) {
        e.preventDefault();
        const container = document.getElementById(
          currentSection === 1 ? 'upcoming-events-container' : 'past-events-container'
        );
        if (container && container.children.length > 0) {
          const totalCards = container.children.length;
          const currentIndex = currentCardIndex[currentSection];
          
          const firstCard = container.children[0] as HTMLElement;
          const scrollUnit = firstCard.offsetWidth + 12;
          const viewport = container.parentElement;
          const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
          const cardsInView = Math.floor(viewportWidth / scrollUnit);
          const maxScrollIndex = Math.max(0, totalCards - cardsInView);
          
          if (currentIndex < maxScrollIndex) {
            const newIndex = currentIndex + 1;
            setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
            container.style.transform = `translateX(-${newIndex * scrollUnit}px)`;
          }
        }
      } else if (e.key === 'ArrowLeft' && (currentSection === 1 || currentSection === 2)) {
        e.preventDefault();
        const container = document.getElementById(
          currentSection === 1 ? 'upcoming-events-container' : 'past-events-container'
        );
        if (container && container.children.length > 0) {
          const currentIndex = currentCardIndex[currentSection];
          if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
            const firstCard = container.children[0] as HTMLElement;
            const scrollUnit = firstCard.offsetWidth + 12;
            container.style.transform = `translateX(-${newIndex * scrollUnit}px)`;
          }
        }
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (scrollDecayTimeout) {
        clearTimeout(scrollDecayTimeout);
      }
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, currentCardIndex, isMobile]);

  useEffect(() => {
    // Skip touch hijacking on mobile for better performance
    if (isMobile) {
      return;
    }

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const threshold = 50;

      // Handle touch scrolling in section 3
      if (currentSection === 3) {
        const footerSection = document.getElementById('footer-section');
        if (footerSection && Math.abs(deltaY) > Math.abs(deltaX)) {
          const maxScroll = footerSection.scrollHeight - footerSection.clientHeight;
          const currentScroll = footerSection.scrollTop;
          
          if (deltaY > 0 && currentScroll < maxScroll) {
            // Swiping up (scrolling down) and not at bottom
            footerSection.scrollBy({ top: deltaY * 2, behavior: 'smooth' });
            return;
          } else if (deltaY < 0 && currentScroll > 0) {
            // Swiping down (scrolling up) and not at top
            footerSection.scrollBy({ top: deltaY * 2, behavior: 'smooth' });
            return;
          } else if (deltaY < 0 && currentScroll <= 0 && Math.abs(deltaY) > threshold) {
            // At top, swiping down - go to previous section
            setCurrentSection(prev => Math.max(prev - 1, 0));
            return;
          }
        }
        return;
      }

      if (currentSection === 1 || currentSection === 2) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
          const container = document.getElementById(
            currentSection === 1 ? 'upcoming-events-container' : 'past-events-container'
          );
          
          if (container && container.children.length > 0) {
            const totalCards = container.children.length;
            const currentIndex = currentCardIndex[currentSection];
            
            const firstCard = container.children[0] as HTMLElement;
            const cardWidth = firstCard.offsetWidth;
            const gap = 12;
            const scrollUnit = cardWidth + gap;
            
            const viewport = container.parentElement;
            const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
            const cardsInView = Math.floor(viewportWidth / scrollUnit);
            const maxScrollIndex = Math.max(0, totalCards - cardsInView);
            
            if (deltaX > 0) {
              if (currentIndex < maxScrollIndex) {
                const newIndex = currentIndex + 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                container.style.transform = `translateX(${translateX}px)`;
              }
            } else {
              if (currentIndex > 0) {
                const newIndex = currentIndex - 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                container.style.transform = `translateX(${translateX}px)`;
              }
            }
            return;
          }
        }
      }

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
        if (deltaY > 0) {
          setCurrentSection(prev => Math.min(prev + 1, 3));
        } else {
          setCurrentSection(prev => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, currentCardIndex, isMobile]);

  useEffect(() => {
    if (currentSection === 1 || currentSection === 2) {
      const container = document.getElementById(
        currentSection === 1 ? 'upcoming-events-container' : 'past-events-container'
      );
      if (container && container.children.length > 0) {
        const currentIndex = currentCardIndex[currentSection];
        const firstCard = container.children[0] as HTMLElement;
        const cardWidth = firstCard.offsetWidth;
        const gap = 12;
        const scrollUnit = cardWidth + gap;
        const translateX = -(currentIndex * scrollUnit);
        container.style.transform = `translateX(${translateX}px)`;
      }
    }
  }, [currentSection, currentCardIndex]);

  const scrollToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
  };

  return (
    <>
      {isMobile ? (
        // Mobile: Native app-like experience
        <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-purple-50/20">
          {/* Fixed Google Particles Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          </div>

          {/* Content with z-index */}
          <div className="relative z-10">
            {/* Navbar - Google Style - Auto Hide on Scroll */}
            <div className={`sticky top-0 z-50 border-b border-gray-200/30 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
              <Header />
            </div>

            {/* Hero Section - Google "Events" Title */}
            <div className="relative px-4 pt-8 pb-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 blur-3xl"></div>
              <div className="relative text-center">
                {/* Animated "Events" Title with Google Colors */}
                <div className="flex items-center justify-center mb-4 animate-slide-down">
                  <div className="flex items-center space-x-1 group">
                    <span className="text-5xl font-light text-[#4285F4] transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ animationDelay: '0.1s' }}>E</span>
                    <span className="text-5xl font-light text-[#EA4335] transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ animationDelay: '0.2s' }}>v</span>
                    <span className="text-5xl font-light text-[#FBBC05] transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ animationDelay: '0.3s' }}>e</span>
                    <span className="text-5xl font-light text-[#4285F4] transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ animationDelay: '0.4s' }}>n</span>
                    <span className="text-5xl font-light text-[#34A853] transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ animationDelay: '0.5s' }}>t</span>
                    <span className="text-5xl font-light text-[#EA4335] transition-all duration-300 group-hover:scale-110 animate-bounce-in" style={{ animationDelay: '0.6s' }}>s</span>
                  </div>
                </div>
                
                {/* Subtitle with Google-styled highlights */}
                <h2 className="text-base sm:text-lg text-gray-800 font-light leading-relaxed mb-4 px-4">
                  Discover <span className="font-medium text-[#4285F4]">amazing</span> tech events,{' '}
                  <span className="font-medium text-[#34A853]">workshops</span>, and{' '}
                  <span className="font-medium text-[#EA4335]">meetups</span>
                </h2>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-6 px-4 max-w-md mx-auto">
                  Join our vibrant community of <strong className="text-gray-800">10,000+</strong> developers, designers, and tech enthusiasts
                </p>
                
                {/* Quick Stats Pills */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-2 justify-center">
                  <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">Expert Sessions</span>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">Workshops</span>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">Networking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search & Filter - Mobile First */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-r from-[#4285F4] to-[#34A853] rounded-2xl shadow-lg border border-white/20 p-4">
                <EventFilter
                  filters={filters}
                  onFiltersChange={setFilters}
                  totalEvents={mockEvents.length}
                  filteredEvents={filteredEvents.length}
                />
              </div>
            </div>

            {/* Live Events - Special Section */}
            {liveEvents.length > 0 && (
              <div className="mb-8">
                <div className="px-4 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <div className="relative">
                        <Zap className="w-5 h-5 text-red-500" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                      </div>
                      Live Now
                    </h3>
                    <p className="text-xs text-red-500 mt-0.5 font-medium">Happening right now!</p>
                  </div>
                </div>
                
                <div className="px-4 space-y-4">
                  {liveEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="relative bg-white rounded-2xl shadow-lg border-2 border-red-400 overflow-hidden active:scale-[0.98] transition-transform animate-pulse-slow"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Event Image with Live Badge */}
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-red-100 to-orange-100">
                        <img
                          src={event.image.url}
                          alt={event.image.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
                        
                        {/* Live Badge - Top Right */}
                        <div className="absolute top-2 right-2 z-10">
                          <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <span className="text-xs font-bold uppercase">Live Now</span>
                          </div>
                        </div>
                        
                        {/* Organization Badge - Top Left */}
                        <div className="absolute top-2 left-2">
                          <span className="inline-block px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                            {event.organization}
                          </span>
                        </div>
                        
                        {/* Date Badge - Bottom */}
                        <div className="absolute bottom-2 left-2">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            <div className="flex flex-col items-center text-white">
                              <span className="text-xs font-medium opacity-90">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                              </span>
                              <span className="text-lg font-bold leading-none">
                                {new Date(event.date).getDate()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Card - Live Design */}
                      <div className="p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
                        <h4 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {event.shortDescription}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventDetails(event);
                            }}
                            className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl transition-colors shadow-sm"
                          >
                            Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventRegister(event);
                            }}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95"
                          >
                            Join Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events - Card Stack */}
            {upcomingEvents.length > 0 && (
              <div className="mb-8">
                <div className="px-4 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      Coming Up
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{upcomingEvents.length} events to register</p>
                  </div>
                </div>
                
                <div className="px-4 space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Event Image */}
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                        <img
                          src={event.image.url}
                          alt={event.image.alt}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
                        
                        {/* Organization Badge */}
                        <div className="absolute top-2 left-2">
                          <span className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                            {event.organization}
                          </span>
                        </div>
                        
                        {/* Date Badge */}
                        <div className="absolute bottom-2 left-2">
                          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            <div className="flex flex-col items-center text-white">
                              <span className="text-xs font-medium opacity-90">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                              </span>
                              <span className="text-lg font-bold leading-none">
                                {new Date(event.date).getDate()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Card - Compact Mobile Design */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                          {event.shortDescription}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventDetails(event);
                            }}
                            className="flex-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-xl transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventRegister(event);
                            }}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95"
                          >
                            Register Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}  
                </div>
              </div>
            )}

            {/* Past Events - Horizontal Scroll Gallery */}
            {pastEvents.length > 0 && (
              <div className="mb-8">
                <div className="px-4 mb-4">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Past Events
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Swipe to explore galleries</p>
                </div>
                
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 px-4 pb-2">
                    {pastEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform"
                      >
                        {/* Past Event Card - Gallery Style with Image */}
                        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={event.image.url}
                            alt={event.image.alt}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'absolute inset-0 flex items-center justify-center';
                                placeholder.innerHTML = '<svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                                parent.appendChild(placeholder);
                              }
                            }}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"></div>
                          
                          {/* Organization Badge */}
                          <div className="absolute top-2 left-2">
                            <span className="inline-block px-2.5 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow-lg">
                              {event.organization}
                            </span>
                          </div>
                          
                          {/* Past Event Badge */}
                          <div className="absolute top-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            Past Event
                          </div>
                          
                          {/* Date */}
                          <div className="absolute bottom-2 left-2">
                            <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                              <div className="flex items-center gap-2 text-white text-xs font-medium">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h4 className="font-bold text-gray-800 text-sm mb-3 line-clamp-2">
                            {event.title}
                          </h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventGallery(event);
                            }}
                            className="w-full px-3 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs font-bold rounded-xl transition-all active:scale-95 shadow-md"
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stats Section - Mobile Cards */}
            <div className="px-4 pb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Community Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{mockEvents.length}</div>
                    <div className="text-xs text-gray-600 font-medium">Total Events</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600 mb-1">{upcomingEvents.length}</div>
                    <div className="text-xs text-gray-600 font-medium">Upcoming</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">10K+</div>
                    <div className="text-xs text-gray-600 font-medium">Members</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600 mb-1">50+</div>
                    <div className="text-xs text-gray-600 font-medium">Speakers</div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <button
                  onClick={() => window.open('https://linktr.ee/gdgoncampusprmitr', '_blank')}
                  className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                  Join Our Community
                </button>
              </div>
            </div>

            {/* Footer - Compact Mobile */}
            <div className="bg-gray-50 border-t border-gray-200">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        // Desktop: Full screen scroll sections
        <div className="h-screen overflow-hidden bg-transparent">
        <div 
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${currentSection * 100}vh)` }}
        >
        
        <div className="h-screen relative bg-transparent shadow-sm overflow-hidden flex items-center justify-center">
          {currentSection === 0 && (
            <div className="absolute top-0 left-0 right-0 z-50">
              <Header />
            </div>
          )}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#4285F4]/20 to-[#4285F4]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute -top-20 -right-40 w-80 h-80 bg-gradient-to-bl from-[#EA4335]/20 to-[#EA4335]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-gradient-to-t from-[#34A853]/20 to-[#34A853]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-tr from-[#FBBC05]/15 to-[#FBBC05]/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }}></div>
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
            <div className="text-center max-w-5xl mx-auto animate-fade-in">
              <div className="flex items-center justify-center mb-6 sm:mb-8 lg:mb-10 animate-slide-down">
                <div className="flex items-center space-x-0.5 sm:space-x-1 group">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#4285F4] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-bounce-in" style={{ animationDelay: '0.1s' }}>E</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#EA4335] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-bounce-in" style={{ animationDelay: '0.2s' }}>v</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FBBC05] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-bounce-in" style={{ animationDelay: '0.3s' }}>e</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#4285F4] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-bounce-in" style={{ animationDelay: '0.4s' }}>n</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#34A853] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-bounce-in" style={{ animationDelay: '0.5s' }}>t</span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#EA4335] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg animate-bounce-in" style={{ animationDelay: '0.6s' }}>s</span>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 font-light leading-relaxed px-2">
                  Discover <span className="font-medium text-[#4285F4]">amazing</span> tech events,{' '}
                  <span className="font-medium text-[#34A853]">workshops</span>, and{' '}
                  <span className="font-medium text-[#EA4335]">meetups</span>
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                  Join our vibrant community of <strong className="text-gray-800">10,000+</strong> developers, designers, and tech enthusiasts. 
                  Learn from industry experts and build meaningful connections.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 lg:mb-10 px-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 shadow-md border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-in-left" style={{ animationDelay: '0.6s' }}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#4285F4] group-hover:scale-125 transition-transform"></div>
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#4285F4] group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Expert Sessions</span>
                </div>
                <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 shadow-md border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-in-left" style={{ animationDelay: '0.7s' }}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#34A853] group-hover:scale-125 transition-transform"></div>
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-[#34A853] group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Hands-on Workshops</span>
                </div>
                <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 shadow-md border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-in-right" style={{ animationDelay: '0.8s' }}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FBBC05] group-hover:scale-125 transition-transform"></div>
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#FBBC05] group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Networking</span>
                </div>
                <div className="group flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-full px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 shadow-md border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-in-right" style={{ animationDelay: '0.9s' }}>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EA4335] group-hover:scale-125 transition-transform"></div>
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-[#EA4335] group-hover:rotate-12 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">Career Growth</span>
                </div>
              </div>
              
              <div className="flex justify-center animate-fade-in-up px-4" style={{ animationDelay: '1s' }}>
                <button 
                  onClick={() => scrollToSection(1)}
                  className="group inline-flex items-center gap-2 sm:gap-3 bg-[#4285F4] hover:bg-[#3367D6] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <span className="font-medium text-sm sm:text-base">Explore Events</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 animate-fade-in">
          <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 h-full">
            {(liveEvents.length > 0 || upcomingEvents.length > 0) ? (
              <section className="relative h-full flex flex-col animate-slide-up">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#4285F4]/20 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl from-[#34A853]/20 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden flex-1 flex flex-col transform hover:shadow-2xl transition-all duration-500">
                  <div className={`relative ${liveEvents.length > 0 ? 'bg-gradient-to-r from-[#EA4335] via-[#FF5722] to-[#FF9800]' : 'bg-gradient-to-r from-[#4285F4] via-[#4285F4] to-[#34A853]'} px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex-none`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative">
                      <div className="text-center mb-2 sm:mb-3 md:mb-4">
                        <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-1.5 sm:mb-2">
                          <div className="p-2 sm:p-2 md:p-2.5 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                            {liveEvents.length > 0 ? (
                              <div className="relative">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                              </div>
                            ) : (
                              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                            )}
                          </div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white flex items-center gap-2 sm:gap-3">
                            {liveEvents.length > 0 ? (
                              <>
                                Live & Upcoming Events
                                <div className="bg-white/20 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-white/30 animate-pulse">
                                  {liveEvents.length} Live
                                </div>
                              </>
                            ) : (
                              <>
                                Upcoming Events
                                <div className="bg-white/20 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-white/30">
                                  {upcomingEvents.length}
                                </div>
                              </>
                            )}
                          </h2>
                        </div>
                        <p className="text-white/90 text-xs sm:text-sm max-w-2xl mx-auto px-2">
                          {liveEvents.length > 0 
                            ? 'Events happening now! Plus upcoming events you can register for.' 
                            : 'Don\'t miss these exciting upcoming events. Scroll with mouse wheel or use arrow keys to navigate.'}
                        </p>
                      </div>
                      
                      <EventFilter
                        filters={filters}
                        onFiltersChange={setFilters}
                        totalEvents={mockEvents.length}
                        filteredEvents={filteredEvents.length}
                      />
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden px-2 sm:px-4 md:px-6 py-2.5 sm:py-3.5 relative touch-pan-y">
                    {(liveEvents.length + upcomingEvents.length > 1) && (
                      <>
                        {currentCardIndex[1] > 0 && (
                          <button
                            onClick={() => {
                              const newIndex = currentCardIndex[1] - 1;
                              setCurrentCardIndex(prev => ({ ...prev, 1: newIndex }));
                              const container = document.getElementById('upcoming-events-container');
                              if (container && container.children.length > 0) {
                                const firstCard = container.children[0] as HTMLElement;
                                const scrollUnit = firstCard.offsetWidth + 12;
                                container.style.transform = `translateX(-${newIndex * scrollUnit}px)`;
                              }
                            }}
                            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:-translate-x-1 group animate-fade-in-left"
                            aria-label="Previous event"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#4285F4] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                        )}
                        {(() => {
                          const totalEvents = liveEvents.length + upcomingEvents.length;
                          if (typeof document === 'undefined') return currentCardIndex[1] < totalEvents - 1;

                          const container = document.getElementById('upcoming-events-container');
                          if (container && container.children.length > 0) {
                            const firstCard = container.children[0] as HTMLElement;
                            const scrollUnit = firstCard.offsetWidth + 12;
                            const viewport = container.parentElement;
                            const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
                            const cardsInView = Math.floor(viewportWidth / scrollUnit);
                            const maxScrollIndex = Math.max(0, totalEvents - cardsInView);
                            return currentCardIndex[1] < maxScrollIndex;
                          }
                          return currentCardIndex[1] < totalEvents - 1;
                        })() && (
                          <button
                            onClick={() => {
                              const container = document.getElementById('upcoming-events-container');
                              if (container && container.children.length > 0) {
                                const firstCard = container.children[0] as HTMLElement;
                                const scrollUnit = firstCard.offsetWidth + 12;
                                const viewport = container.parentElement;
                                const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
                                const cardsInView = Math.floor(viewportWidth / scrollUnit);
                                const totalEvents = liveEvents.length + upcomingEvents.length;
                                const maxScrollIndex = Math.max(0, totalEvents - cardsInView);
                                const newIndex = Math.min(currentCardIndex[1] + 1, maxScrollIndex);
                                setCurrentCardIndex(prev => ({ ...prev, 1: newIndex }));
                                container.style.transform = `translateX(-${newIndex * scrollUnit}px)`;
                              }
                            }}
                            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            aria-label="Next event"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#4285F4] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                    
                    <div className="h-full flex items-center gap-2 sm:gap-3 transition-transform duration-500 ease-out will-change-transform touch-pan-x" id="upcoming-events-container">
                      {/* Live Events First */}
                      {liveEvents.map((event) => (
                        <div key={event.id} className="flex-shrink-0 w-[min(380px,90vw)] sm:w-[min(380px,85vw)] h-[500px] relative">
                          {/* Live Badge Overlay */}
                          <div className="absolute top-2 right-2 z-10">
                            <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                              <span className="text-xs font-bold uppercase">Live Now</span>
                            </div>
                          </div>
                          <div className="ring-2 ring-red-400 ring-offset-2 rounded-2xl h-full">
                            <UpcomingEventCard
                              event={event}
                              onKnowMore={() => handleEventDetails(event)}
                              onRegister={() => handleEventRegister(event)}
                            />
                          </div>
                        </div>
                      ))}
                      {/* Regular Upcoming Events */}
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex-shrink-0 w-[min(380px,90vw)] sm:w-[min(380px,85vw)] h-[500px]">
                          <UpcomingEventCard
                            event={event}
                            onKnowMore={() => handleEventDetails(event)}
                            onRegister={() => handleEventRegister(event)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <div className="h-full flex items-center justify-center px-4">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-6 sm:p-8 md:p-12 max-w-md mx-auto">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2 sm:mb-3">No upcoming events</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    We couldn't find any upcoming events matching your criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="h-screen bg-transparent animate-fade-in">
          <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 h-full">
            {pastEvents.length > 0 ? (
              <section className="relative h-full flex flex-col animate-slide-up">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#EA4335]/20 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl from-[#FBBC05]/20 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden flex-1 flex flex-col transform hover:shadow-2xl transition-all duration-500">
                  <div className="relative bg-gradient-to-r from-[#EA4335] via-[#EA4335] to-[#FBBC05] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex-none">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative">
                      <div className="text-center mb-4 sm:mb-5 md:mb-6">
                        <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                          <div className="p-2 sm:p-2.5 md:p-3 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white flex items-center gap-2 sm:gap-3">
                            Past Events
                            <div className="bg-white/20 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/30">
                              {pastEvents.length}
                            </div>
                          </h2>
                        </div>
                        <p className="text-white/90 text-xs sm:text-sm max-w-2xl mx-auto px-2">
                          Explore our successful events and community achievements. Scroll with mouse wheel or use arrow keys.
                        </p>
                      </div>
                      
                      <EventFilter
                        filters={filters}
                        onFiltersChange={setFilters}
                        totalEvents={mockEvents.length}
                        filteredEvents={filteredEvents.length}
                      />
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden px-2 sm:px-4 md:px-6 py-3 sm:py-4 relative touch-pan-y">
                    {pastEvents.length > 1 && (
                      <>
                        {currentCardIndex[2] > 0 && (
                          <button
                            onClick={() => {
                              const newIndex = currentCardIndex[2] - 1;
                              setCurrentCardIndex(prev => ({ ...prev, 2: newIndex }));
                              const container = document.getElementById('past-events-container');
                              if (container && container.children.length > 0) {
                                const firstCard = container.children[0] as HTMLElement;
                                const scrollUnit = firstCard.offsetWidth + 12;
                                container.style.transform = `translateX(-${newIndex * scrollUnit}px)`;
                              }
                            }}
                            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            aria-label="Previous event"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#EA4335] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                        )}
                        {(() => {
                    if (typeof document === 'undefined') return currentCardIndex[2] < pastEvents.length - 1;
                          const container = document.getElementById('past-events-container');
                          if (container && container.children.length > 0) {
                            const firstCard = container.children[0] as HTMLElement;
                            const scrollUnit = firstCard.offsetWidth + 12;
                            const viewport = container.parentElement;
                            const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
                            const cardsInView = Math.floor(viewportWidth / scrollUnit);
                            const maxScrollIndex = Math.max(0, pastEvents.length - cardsInView);
                            return currentCardIndex[2] < maxScrollIndex;
                          }
                          return currentCardIndex[2] < pastEvents.length - 1;
                        })() && (
                          <button
                            onClick={() => {
                              const container = document.getElementById('past-events-container');
                              if (container && container.children.length > 0) {
                                const firstCard = container.children[0] as HTMLElement;
                                const scrollUnit = firstCard.offsetWidth + 12;
                                const viewport = container.parentElement;
                                const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
                                const cardsInView = Math.floor(viewportWidth / scrollUnit);
                                const maxScrollIndex = Math.max(0, pastEvents.length - cardsInView);
                                const newIndex = Math.min(currentCardIndex[2] + 1, maxScrollIndex);
                                setCurrentCardIndex(prev => ({ ...prev, 2: newIndex }));
                                container.style.transform = `translateX(-${newIndex * scrollUnit}px)`;
                              }
                            }}
                            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            aria-label="Next event"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#EA4335] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </>
                    )}
                    
                    <div className="h-full flex items-center gap-2 sm:gap-3 transition-transform duration-500 ease-out will-change-transform touch-pan-x" id="past-events-container">
                      {pastEvents.map((event) => (
                        <div key={event.id} className="flex-shrink-0 w-[min(380px,90vw)] sm:w-[min(380px,85vw)] h-[460px]">
                          <PastEventCard
                            event={event}
                            onMoreDetails={() => handleEventDetails(event)}
                            onGallery={() => handleEventGallery(event)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <div className="h-full flex items-center justify-center px-4">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 p-6 sm:p-8 md:p-12 max-w-md mx-auto">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                    <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2 sm:mb-3">No past events</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    We couldn't find any past events matching your criteria.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics & Footer Section - Combined */}
        <div id="footer-section" className="h-screen relative bg-gradient-to-b from-white/20 via-gray-50/10 to-white/20 border-t border-gray-200 overflow-y-auto overflow-x-hidden animate-fade-in scroll-smooth">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-t from-[#4285F4]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-b from-[#34A853]/5 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-[#EA4335]/5 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2.5s' }}></div>
          </div>
          
          <div className="relative min-h-screen flex flex-col">
            {/* Statistics Section */}
            <div className="flex-1 flex items-center justify-center py-8 sm:py-10 md:py-12 lg:py-16">
              <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="text-center">
                  {/* Header */}
                  <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 animate-slide-down">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
                      Community Statistics
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-2 max-w-3xl mx-auto">
                      Join thousands of tech enthusiasts in our growing community
                    </p>
                  </div>
                  
                  {/* Statistics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12 animate-fade-in-up">
                    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-gray-200/60 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-2xl hover:shadow-[#4285F4]/10 hover:border-[#4285F4]/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden" style={{ animationDelay: '0.1s' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#4285F4] group-hover:scale-150 transition-transform duration-500"></div>
                          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 group-hover:text-[#4285F4] transition-colors duration-500">{mockEvents.length}</span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-1">Total Events</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">Since 2020</p>
                      </div>
                    </div>
                    
                    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-gray-200/60 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-2xl hover:shadow-[#34A853]/10 hover:border-[#34A853]/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden" style={{ animationDelay: '0.2s' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#34A853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#34A853] group-hover:scale-150 transition-transform duration-500"></div>
                          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 group-hover:text-[#34A853] transition-colors duration-500">{upcomingEvents.length}</span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-1">Upcoming</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">This month</p>
                      </div>
                    </div>
                    
                    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-gray-200/60 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-2xl hover:shadow-[#EA4335]/10 hover:border-[#EA4335]/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden" style={{ animationDelay: '0.3s' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#EA4335]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#EA4335] group-hover:scale-150 transition-transform duration-500"></div>
                          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 group-hover:text-[#EA4335] transition-colors duration-500">{pastEvents.length}</span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-1">Completed</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">Success rate 98%</p>
                      </div>
                    </div>
                    
                    <div className="group relative bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-gray-200/60 p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-2xl hover:shadow-[#FBBC05]/10 hover:border-[#FBBC05]/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden" style={{ animationDelay: '0.4s' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FBBC05]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#FBBC05] group-hover:scale-150 transition-transform duration-500"></div>
                          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 group-hover:text-[#FBBC05] transition-colors duration-500">10K+</span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 mb-1">Community</p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500">Active members</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div 
                    onClick={() => window.open('https://linktr.ee/gdgoncampusprmitr', '_blank')}
                    className="group inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 px-4 sm:px-5 md:px-7 lg:px-9 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#4285F4] bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-full border-2 border-white shadow-lg hover:shadow-2xl hover:shadow-[#4285F4]/20 transition-all duration-500 hover:scale-110 cursor-pointer animate-fade-in-up relative overflow-hidden" 
                    style={{ animationDelay: '0.5s' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white relative z-10">Join Our Community Today</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Component */}
            <div className="relative w-full mt-auto">
              <Footer />
            </div>
          </div>
        </div>
      
      </div>
        </div>
      )}

      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEvent(null);
        }}
        onRegister={selectedEvent && isUpcomingEvent(selectedEvent) ? handleEventRegister : undefined}
      />
    </>
  );
}
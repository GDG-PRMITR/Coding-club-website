"use client";

import { useState, useMemo, useEffect } from 'react';
import { Calendar, Search, Filter, TrendingUp, Star, Code, Users, Sparkles, Zap, ArrowRight, Globe, Target, MapPin, Send, Instagram, Mail, Phone } from 'lucide-react';
import { PastEventCard } from '@/components/events/PastEventCard';
import { UpcomingEventCard } from '@/components/events/UpcomingEventCard';
import { EventFilter } from '@/components/events/EventFilter';
import { EventDetailModal } from '@/components/events/EventDetailModal';
import AnimatedBackground  from '@/components/googleParticleBackground';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header.component';
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

  const upcomingEvents = filteredEvents.filter(isUpcomingEvent);
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

  useEffect(() => {
    let lastScrollTime = 0;
    let scrollAccumulator = 0;
    let consecutiveSmallScrolls = 0;
    let scrollDecayTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = (e: WheelEvent) => {
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
        
        scrollAccumulator += deltaY * 0.7; 
        
        const baseThreshold = 80;
        const velocityFactor = Math.min(2, Math.abs(scrollAccumulator) / 40);
        const adaptiveThreshold = baseThreshold * velocityFactor;
        
        if (Math.abs(scrollAccumulator) < adaptiveThreshold) {
          scrollDecayTimeout = setTimeout(() => {
            scrollAccumulator *= 0.8;
          }, 150);
          return; 
        }
        
        deltaY = scrollAccumulator;
        scrollAccumulator = 0; 
      }
      
      const threshold = isTouchpad ? 60 : 20;
      
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
          
          const horizontalThreshold = isTouchpad ? threshold * 1.5 : threshold;
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > horizontalThreshold) {
            if (deltaX > 0) {
              if (currentIndex < maxScrollIndex) {
                const newIndex = currentIndex + 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                container.style.transition = isTouchpad ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
                container.style.transform = `translateX(${translateX}px)`;
              }
            } else {
              if (currentIndex > 0) {
                const newIndex = currentIndex - 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                container.style.transition = isTouchpad ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
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
                container.style.transition = isTouchpad ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
                container.style.transform = `translateX(${translateX}px)`;
                return; 
              }
            } else {
              if (currentIndex > 0) {
                const newIndex = currentIndex - 1;
                setCurrentCardIndex(prev => ({ ...prev, [currentSection]: newIndex }));
                const translateX = -(newIndex * scrollUnit);
                container.style.transition = isTouchpad ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.5s ease-out';
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
        setCurrentSection(prev => Math.min(prev + 1, 3));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentSection(prev => Math.max(prev - 1, 0));
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
  }, [currentSection, currentCardIndex]);

  useEffect(() => {
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
  }, [currentSection, currentCardIndex]);

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
      <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div 
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${currentSection * 100}vh)` }}
        >
        
        <div className="h-screen relative bg-white shadow-sm overflow-hidden flex items-center justify-center">
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
          
          <div className="absolute inset-0 pointer-events-none opacity-40 w-full h-full">
            <AnimatedBackground />
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
            {upcomingEvents.length > 0 ? (
              <section className="relative h-full flex flex-col animate-slide-up">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#4285F4]/20 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl from-[#34A853]/20 to-transparent rounded-full blur-xl pointer-events-none animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden flex-1 flex flex-col transform hover:shadow-2xl transition-all duration-500">
                  <div className="relative bg-gradient-to-r from-[#4285F4] via-[#4285F4] to-[#34A853] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex-none">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative">
                      <div className="text-center mb-2 sm:mb-3 md:mb-4">
                        <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-1.5 sm:mb-2">
                          <div className="p-2 sm:p-2 md:p-2.5 bg-white/20 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                          </div>
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white flex items-center gap-2 sm:gap-3">
                            Upcoming Events
                            <div className="bg-white/20 text-white px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium border border-white/30">
                              {upcomingEvents.length}
                            </div>
                          </h2>
                        </div>
                        <p className="text-white/90 text-xs sm:text-sm max-w-2xl mx-auto px-2">
                          Don't miss these exciting upcoming events. Scroll with mouse wheel or use arrow keys to navigate.
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
                    {upcomingEvents.length > 1 && (
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
                          if (typeof document === 'undefined') return currentCardIndex[1] < upcomingEvents.length - 1;
                          const container = document.getElementById('upcoming-events-container');
                          if (container && container.children.length > 0) {
                            const firstCard = container.children[0] as HTMLElement;
                            const scrollUnit = firstCard.offsetWidth + 12;
                            const viewport = container.parentElement;
                            const viewportWidth = viewport ? viewport.offsetWidth : window.innerWidth;
                            const cardsInView = Math.floor(viewportWidth / scrollUnit);
                            const maxScrollIndex = Math.max(0, upcomingEvents.length - cardsInView);
                            return currentCardIndex[1] < maxScrollIndex;
                          }
                          return currentCardIndex[1] < upcomingEvents.length - 1;
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
                                const maxScrollIndex = Math.max(0, upcomingEvents.length - cardsInView);
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

        <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 animate-fade-in">
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
        <div className="h-screen relative bg-gradient-to-b from-white via-gray-50 to-white border-t border-gray-200 overflow-y-auto overflow-x-hidden animate-fade-in scroll-smooth">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"></div>
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
            
          </div>
        </div>
      
      </div>

      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEvent(null);
        }}
        onRegister={selectedEvent && isUpcomingEvent(selectedEvent) ? handleEventRegister : undefined}
      />
    </div>
  </>
  );
}
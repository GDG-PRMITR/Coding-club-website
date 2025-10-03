"use client";

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink, 
  Image as ImageIcon, 
  User,
  Globe,
  Download,
  Play,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Event, 
  PastEvent, 
  UpcomingEvent, 
  isPastEvent, 
  isUpcomingEvent,
  ORGANIZATIONS,
  EVENT_CATEGORIES 
} from '@/lib/types/events';

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister?: (event: UpcomingEvent) => void;
}

export const EventDetailModal = ({ 
  event, 
  isOpen, 
  onClose, 
  onRegister 
}: EventDetailModalProps) => {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  if (!event) return null;

  const orgConfig = ORGANIZATIONS[event.organization];
  const categoryConfig = EVENT_CATEGORIES[event.category];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntilEvent = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRegistrationProgress = () => {
    if (!isUpcomingEvent(event) || !event.maxAttendees || !event.currentAttendees) return 0;
    return (event.currentAttendees / event.maxAttendees) * 100;
  };

  const handleGalleryPrevious = () => {
    if (!isPastEvent(event) || !event.gallery) return;
    setSelectedGalleryIndex(prev => 
      prev === 0 ? event.gallery!.length - 1 : prev - 1
    );
  };

  const handleGalleryNext = () => {
    if (!isPastEvent(event) || !event.gallery) return;
    setSelectedGalleryIndex(prev => 
      prev === event.gallery!.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[92vh] w-[96vw] p-0 flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Hidden DialogTitle for accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {event.shortDescription || `Details for ${event.title} event organized by ${event.organization}`}
          </DialogDescription>
        </DialogHeader>
        
        {/* Modern Header with Gradient Overlay */}
        <div className="relative h-56 lg:h-64 bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#EA4335] flex-shrink-0">
          <img
            src={event.image.url}
            alt={event.image.alt}
            className="w-full h-full object-cover mix-blend-overlay opacity-90"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Floating Content Card */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
            <div className="bg-white/98 backdrop-blur-xl rounded-2xl p-5 lg:p-6 shadow-2xl border border-white/40 overflow-hidden">
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge 
                  className="px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg border-0"
                  style={{ backgroundColor: orgConfig.color }}
                >
                  {orgConfig.shortName}
                </Badge>
                <Badge className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold text-sm shadow-sm border border-gray-200">
                  {categoryConfig.icon} {categoryConfig.name}
                </Badge>
                <Badge className={`px-4 py-2 rounded-full font-bold text-sm shadow-lg border-0 ${
                  event.status === 'upcoming' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                }`}>
                  {event.status === 'upcoming' ? '🎯 Upcoming' : '✅ Completed'}
                </Badge>
              </div>
              
              {/* Event Title */}
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-4 leading-tight line-clamp-2">
                {event.title}
              </h1>
              
              {/* Event Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-[#4285F4] rounded-lg shadow-sm">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-gray-900 text-sm lg:text-base truncate">{formatDate(event.date)}</div>
                    <div className="text-gray-600 text-xs font-medium">{formatTime(event.date)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-[#34A853] rounded-lg shadow-sm">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-gray-900 text-sm lg:text-base truncate">
                      {event.venue.isOnline ? 'Online Event' : event.venue.name}
                    </div>
                    <div className="text-gray-600 text-xs font-medium truncate">{event.venue.city}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modern Close Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white hover:bg-white/40 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            onClick={onClose}
            aria-label="Close event details"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Scrollable Content Area */}
        <div 
          className="flex-1 overflow-y-auto min-h-0 bg-gray-50/50 overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="p-5 lg:p-7 space-y-5 lg:space-y-7">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 p-1.5 rounded-xl border border-gray-200 shadow-sm">
                <TabsTrigger value="overview" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Overview</TabsTrigger>
                <TabsTrigger value="details" className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">Details</TabsTrigger>
                {isPastEvent(event) && event.gallery && event.gallery.length > 0 && (
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                )}
                {isUpcomingEvent(event) && event.agenda && (
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                )}
              </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Description */}
                  <div className="bg-white rounded-2xl p-5 lg:p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg lg:text-xl font-bold mb-4 text-gray-900">About this event</h3>
                    <p className="text-gray-600 leading-relaxed break-words">{event.description}</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {isUpcomingEvent(event) && (
                      <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-sm">
                        <Calendar className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-purple-900">{getDaysUntilEvent()}</div>
                        <div className="text-sm text-purple-700 font-semibold">Days to go</div>
                      </div>
                    )}
                  </div>

                  {/* Keywords */}
                  <div className="bg-white rounded-2xl p-5 lg:p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg lg:text-xl font-bold mb-4 text-gray-900">Topics covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors font-medium">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Speakers */}
                  {event.speakers && event.speakers.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 lg:p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg lg:text-xl font-bold mb-4 text-gray-900">Speakers</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {event.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden shadow-md">
                              {speaker.image ? (
                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-7 h-7 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 text-base">{speaker.name}</div>
                              <div className="text-sm text-gray-600 font-medium">{speaker.designation}</div>
                              {speaker.company && (
                                <div className="text-sm text-gray-500">{speaker.company}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6 mt-6">
                  {/* Venue Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Venue</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="font-medium">{event.venue.name}</div>
                      <div className="text-gray-600">{event.venue.address}</div>
                      <div className="text-gray-600">{event.venue.city}</div>
                      {event.venue.isOnline && event.venue.meetingLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          asChild
                        >
                          <a href={event.venue.meetingLink} target="_blank" rel="noopener noreferrer">
                            <Globe className="w-4 h-4 mr-2" />
                            Join Online
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>



                  {/* Prerequisites for Upcoming Events */}
                  {isUpcomingEvent(event) && event.prerequisites && event.prerequisites.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                      <ul className="space-y-2">
                        {event.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resources for Past Events */}
                  {isPastEvent(event) && event.resources && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {event.resources.presentation && (
                          <Button variant="outline" className="justify-start" asChild>
                            <a href={event.resources.presentation} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Presentation
                            </a>
                          </Button>
                        )}
                        {event.resources.code && (
                          <Button variant="outline" className="justify-start" asChild>
                            <a href={event.resources.code} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Source Code
                            </a>
                          </Button>
                        )}
                        {event.resources.recording && (
                          <Button variant="outline" className="justify-start" asChild>
                            <a href={event.resources.recording} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4 mr-2" />
                              Recording
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Highlights for Past Events */}
                  {isPastEvent(event) && event.highlights && event.highlights.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Event Highlights</h3>
                      <ul className="space-y-2">
                        {event.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                {/* Gallery Tab for Past Events */}
                {isPastEvent(event) && event.gallery && event.gallery.length > 0 && (
                  <TabsContent value="gallery" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Event Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {event.gallery.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              setSelectedGalleryIndex(index);
                              setShowGallery(true);
                            }}
                          >
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}

                {/* Agenda Tab for Upcoming Events */}
                {isUpcomingEvent(event) && event.agenda && (
                  <TabsContent value="agenda" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Event Agenda</h3>
                      <div className="space-y-3">
                        {event.agenda.map((item, index) => (
                          <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-blue-600 min-w-[80px]">
                              {item.time}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.activity}</div>
                              {item.speaker && (
                                <div className="text-sm text-gray-600">{item.speaker}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </div>
            
            {/* Footer Actions - Fixed at bottom */}
            <div className="border-t p-6 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                {isUpcomingEvent(event) && onRegister && (
                  <Button
                    onClick={() => onRegister(event)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join Event
                  </Button>
                )}
                {event.website && (
                  <Button variant="outline" asChild>
                    <a href={event.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Event Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

        {/* Gallery Lightbox */}
        {showGallery && isPastEvent(event) && event.gallery && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <div className="relative max-w-4xl max-h-full p-4">
              <img
                src={event.gallery[selectedGalleryIndex].url}
                alt={event.gallery[selectedGalleryIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={handleGalleryPrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                onClick={handleGalleryNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
              
              {/* Close */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 text-white hover:bg-white/20"
                onClick={() => setShowGallery(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              
              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                {selectedGalleryIndex + 1} / {event.gallery.length}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
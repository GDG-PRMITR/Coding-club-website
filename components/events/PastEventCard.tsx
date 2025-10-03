"use client";

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PastEvent, ORGANIZATIONS, EVENT_CATEGORIES } from '@/lib/types/events';

interface PastEventCardProps {
  event: PastEvent;
  onMoreDetails: (event: PastEvent) => void;
  onGallery: (event: PastEvent) => void;
}

export const PastEventCard = ({ event, onMoreDetails, onGallery }: PastEventCardProps) => {
  const [imageError, setImageError] = useState(false);
  const orgConfig = ORGANIZATIONS[event.organization];
  const categoryConfig = EVENT_CATEGORIES[event.category];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] border border-gray-200 bg-white overflow-hidden shadow-md flex flex-col animate-fade-in-up hover:-translate-y-1 rounded-3xl p-0 cursor-pointer h-full"
      onClick={() => onMoreDetails(event)}
    >
      {/* Event Image */}
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-500 flex-shrink-0">
        {!imageError ? (
          <>
            <img
              src={event.image.url}
              alt={event.image.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 block"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Organization Badge */}
        <div className="absolute top-2 left-2">
          <Badge 
            style={{ backgroundColor: orgConfig.color, color: 'white' }}
            className="font-semibold text-xs px-2.5 py-1 shadow-lg border-0"
          >
            {orgConfig.shortName}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-700 font-semibold text-xs px-2.5 py-1 shadow-lg border-0">
            {categoryConfig.icon} {categoryConfig.name}
          </Badge>
        </div>

        {/* Event Status Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5">
          <span className="text-white text-sm font-semibold drop-shadow-lg">✓ Event Completed</span>
        </div>
      </div>

      <CardHeader className="pb-2 px-3 pt-2">
        <div className="space-y-1.5">
          <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {event.title}
          </h3>
          
          {/* Date, Time Combined */}
          <div className="flex flex-wrap items-center gap-1 text-[10px]">
            <div className="flex items-center gap-1 bg-blue-50 text-gray-700 px-2 py-0.5 rounded-md font-medium">
              <Calendar className="w-2.5 h-2.5" />
              <span>{formatDate(event.date)}</span>
              <Clock className="w-2.5 h-2.5 ml-0.5" />
              <span>{formatTime(event.date)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[10px] bg-gray-50 text-gray-700 px-2 py-0.5 rounded-md font-medium">
            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="line-clamp-1">{event.venue.name}, {event.venue.city}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 flex-1 px-3 pb-2 pt-1 flex flex-col">
        {/* Short Description */}
        <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">{event.shortDescription}</p>

        {/* Event Stats */}
        {event.attendeeCount && (
          <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-md border border-purple-100">
            <Users className="w-2.5 h-2.5" />
            <span className="text-[10px] font-semibold">{event.attendeeCount} attendees</span>
          </div>
        )}

        {/* Keywords */}
        <div className="flex flex-wrap gap-0.5 mt-auto">
          {event.keywords.slice(0, 3).map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-[9px] px-1 py-0.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200 font-medium">
              {keyword}
            </Badge>
          ))}
          {event.keywords.length > 3 && (
            <Badge variant="outline" className="text-[9px] px-1 py-0.5 bg-gray-50 text-gray-600 border-gray-200 font-medium">
              +{event.keywords.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

    </Card>
  );
};
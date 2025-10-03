"use client";

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Image as ImageIcon, Info, Video, Globe } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UpcomingEvent, ORGANIZATIONS, EVENT_CATEGORIES } from '@/lib/types/events';

interface UpcomingEventCardProps {
  event: UpcomingEvent;
  onKnowMore: (event: UpcomingEvent) => void;
  onRegister: (event: UpcomingEvent) => void;
}

export const UpcomingEventCard = ({ event, onKnowMore, onRegister }: UpcomingEventCardProps) => {
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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    };
  };

  const getDaysUntilEvent = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilEvent = getDaysUntilEvent();

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] border border-gray-200 bg-white overflow-hidden relative shadow-md flex flex-col animate-fade-in-up hover:-translate-y-1 rounded-3xl p-0 cursor-pointer h-full"
      onClick={() => onKnowMore(event)}
    >
      {/* Event Image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 transition-all duration-500 flex-shrink-0">
        {!imageError ? (
          <>
            <img
              src={event.image.url}
              alt={event.image.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <ImageIcon className="w-12 h-12 text-blue-400" />
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

        {/* Days Until Event */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-semibold drop-shadow-lg">
              {daysUntilEvent > 0 ? `🎯 ${daysUntilEvent} days` : 
               daysUntilEvent === 0 ? '🎉 Today!' : 
               '⚡ Started'}
            </span>
            {event.venue.isOnline && (
              <Badge className="bg-green-500 text-white text-[9px] font-semibold px-1.5 py-0.5 shadow-md">
                <Video className="w-2.5 h-2.5 mr-0.5" />
                Online
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-2.5 px-3 pt-2.5">
        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight mb-2">
          {event.title}
        </h3>
        
        {/* Date, Time, and Venue - Compact */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-medium">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{formatDate(event.date)}</span>
            <Clock className="w-3 h-3 flex-shrink-0 ml-1" />
            <span>{formatTime(event.date)}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[11px] bg-gray-50 text-gray-700 px-2.5 py-1 rounded-md font-medium">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">
              {event.venue.isOnline ? 'Online Event' : `${event.venue.name}, ${event.venue.city}`}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-3 pb-3 pt-2 space-y-2.5 flex-1 flex flex-col">
        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{event.shortDescription}</p>

        {/* Price */}
        {event.price && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-md px-2.5 py-1.5 border border-green-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-700 font-medium">Price</span>
              <div className="text-right">
                {event.price.earlyBird && new Date() < new Date(event.price.earlyBird.deadline) ? (
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-green-600">
                      ₹{event.price.earlyBird.amount}
                    </span>
                    <span className="text-[10px] text-gray-500 line-through">
                      ₹{event.price.amount}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-bold text-gray-900">₹{event.price.amount}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Keywords */}
        <div className="flex flex-wrap gap-1 mt-auto pb-1">
          {event.keywords.slice(0, 3).map((keyword, index) => (
            <Badge key={index} variant="outline" className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-700 border-blue-200 font-medium">
              {keyword}
            </Badge>
          ))}
          {event.keywords.length > 3 && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-600 border-gray-200 font-medium">
              +{event.keywords.length - 3}
            </Badge>
          )}
        </div>


      </CardContent>


    </Card>
  );
};
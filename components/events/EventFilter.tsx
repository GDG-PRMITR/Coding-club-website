"use client";

import { useState } from 'react';
import { Search, X, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { EventFilters, Organization, ORGANIZATIONS } from '@/lib/types/events';

interface EventFilterProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  totalEvents: number;
  filteredEvents: number;
}

export const EventFilter = ({ 
  filters, 
  onFiltersChange, 
  totalEvents, 
  filteredEvents 
}: EventFilterProps) => {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFiltersChange({ ...filters, search: value });
  };

  const handleOrganizationChange = (org: Organization | 'All') => {
    onFiltersChange({ 
      ...filters, 
      organization: org
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    onFiltersChange({
      organization: 'All',
      status: 'All',
      search: ''
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.organization !== 'All') count++;
    if (filters.search && filters.search.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-3 sm:space-y-3.5 p-2 sm:p-3 md:p-4 animate-fade-in">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto animate-slide-down">
        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />
        <Input
          placeholder="Search events by title, description, or keywords..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-white/20 bg-white/10 backdrop-blur-xl focus:border-white/40 focus:ring-white/30 focus:bg-white/20 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:scale-[1.01] placeholder:text-white/70 text-white"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-200"
            onClick={() => handleSearchChange('')}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
      </div>

      {/* Organization Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 animate-fade-in-up px-2" style={{ animationDelay: '0.2s' }}>
        <Button
          variant={filters.organization === 'All' ? 'default' : 'outline'}
          onClick={() => handleOrganizationChange('All')}
          className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 min-h-[40px] ${
            filters.organization === 'All'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg border-0 backdrop-blur-xl'
              : 'hover:bg-white/30 hover:shadow-md border-white/30 bg-white/10 backdrop-blur-xl text-white hover:border-white/50'
          }`}
        >
          All Events
        </Button>
        
        {Object.entries(ORGANIZATIONS).map(([key, org]) => (
          <Button
            key={key}
            variant={filters.organization === key ? 'default' : 'outline'}
            onClick={() => handleOrganizationChange(key as Organization)}
            style={filters.organization === key ? { 
              background: `linear-gradient(135deg, ${org.color} 0%, ${org.color}dd 100%)`,
              borderColor: org.color
            } : {}}
            className={`relative overflow-hidden px-3 sm:px-4 md:px-5 py-2 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 min-h-[40px] ${
              filters.organization === key
                ? 'text-white shadow-md hover:shadow-lg border-0 backdrop-blur-xl'
                : 'hover:bg-white/30 hover:shadow-md border-white/30 bg-white/10 backdrop-blur-xl text-white hover:border-white/50'
            }`}
          >
            {filters.organization === key && (
              <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            )}
            <div 
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mr-1.5 sm:mr-2 transition-all duration-300 group-hover:scale-125 relative z-10" 
              style={{ backgroundColor: filters.organization === key ? 'white' : org.color }}
            />
            {org.shortName}
          </Button>
        ))}
      </div>



      {/* Active Search Filter Display */}
      {filters.search && filters.search.length > 0 && (
        <div className="flex justify-center px-2">
          <Badge variant="secondary" className="bg-white/10 backdrop-blur-xl text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-white/30 shadow-md">
            Searching: &quot;{filters.search}&quot;
            <Button
              variant="ghost"
              size="sm"
              className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 p-0 hover:bg-white/30 rounded-full transition-all duration-200"
              onClick={() => handleSearchChange('')}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        </div>
      )}
    </div>
  );
};
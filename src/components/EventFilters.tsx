
import React from 'react';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedCollege: string;
  setSelectedCollege: (college: string) => void;
}

const eventTypes = [
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'tech-talk', label: 'Tech Talk' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'social', label: 'Social' },
  { id: 'other', label: 'Other' }
];

const colleges = [
  'All Colleges',
  'MIT',
  'Stanford University',
  'Harvard University',
  'UC Berkeley',
  'Carnegie Mellon',
  'Georgia Tech',
  'University of Michigan'
];

const EventFilters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  selectedTypes,
  setSelectedTypes,
  selectedCollege,
  setSelectedCollege
}) => {
  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search events..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap gap-2">
        {/* Date filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <CalendarIcon size={16} />
              {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
            {selectedDate && (
              <div className="flex justify-end p-2 border-t">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDate(undefined)}
                >
                  Clear
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Event type filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={16} />
              Event Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 bg-white" align="start">
            <div className="space-y-2">
              <p className="text-sm font-medium mb-2">Event Types</p>
              {eventTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${type.id}`}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={() => handleTypeChange(type.id)}
                  />
                  <Label htmlFor={`type-${type.id}`} className="text-sm">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* College filter */}
        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {colleges.map((college) => (
            <option key={college} value={college}>
              {college}
            </option>
          ))}
        </select>
        
        {/* Clear filters */}
        {(searchTerm || selectedDate || selectedTypes.length > 0 || selectedCollege !== 'All Colleges') && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedDate(undefined);
              setSelectedTypes([]);
              setSelectedCollege('All Colleges');
            }}
            className="ml-auto"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventFilters;


import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a more detailed description"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please enter the time"),
  location: z.string().min(5, "Please provide a detailed location"),
  college: z.string().min(2, "Please enter the college name"),
  type: z.enum(["hackathon", "tech-talk", "workshop", "social", "other"]),
  eventLink: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, isSubmitting }) => {
  const { toast } = useToast();
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      time: "",
      location: "",
      college: "",
      type: "tech-talk",
      eventLink: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/30 backdrop-blur-sm p-5 sm:p-8 rounded-xl shadow-lg border border-white/40">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Provide a description of the event" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left"
                          onClick={() => setCalendarOpen(true)}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Select a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0 bg-white z-50">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3:00 PM - 5:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Venue and address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College/University</FormLabel>
                  <FormControl>
                    <Input placeholder="Hosting institution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <select
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                      {...field}
                    >
                      <option value="hackathon">Hackathon</option>
                      <option value="tech-talk">Tech Talk</option>
                      <option value="workshop">Workshop</option>
                      <option value="social">Social Event</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="eventLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Link (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-pulse-purple to-pulse-teal hover:opacity-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;

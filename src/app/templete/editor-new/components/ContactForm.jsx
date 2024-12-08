'use client';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useFormContext } from '@/contexts/FormContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
})

export function ContactForm() {
  const { formData, updateFormData } = useFormContext()
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: formData.contact,
  })

  const onSubmit = (data) => {
    
    console.log('data', data);
    console.log('formData before contact', formData);
    
    updateFormData('contact', data)
    console.log('formData after contact', formData);
  }

  return (
    (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>Required: Enter a valid email address</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your address" {...field} />
              </FormControl>
              <FormDescription>Required: Provide your address</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
        <Button type="submit">Save Contact Data</Button>
      </form>
    </Form>)
  );
}


import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact({ data }) {
  return (
    <section id="contact" className="container py-12 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
      <Card>
        <CardContent className="grid gap-4 p-6">
          {data.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${data.email}`}
                className="text-primary hover:underline"
              >
                {data.email}
              </a>
            </div>
          )}

          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{data.phone}</span>
            </div>
          )}

          {data.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{data.location}</span>
            </div>
          )}

          {data.social && data.social.length > 0 && (
            <div className="flex gap-2 mt-4">
              {data.social.map((link, index) => (
                <Button key={index} variant="outline" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.platform}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

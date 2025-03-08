"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DownloadResumeButton } from "@/components/resume-pdf";

export function Hero({ data }) {
  const getInitials = (name) => {
    if (!name) return "NN";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {data.name || "Your Name"}
            </h1>
            <DownloadResumeButton data={data} />
          </div>
          {data.title && (
            <h2 className="text-xl text-muted-foreground mt-2">{data.title}</h2>
          )}
          {data.about && (
            <p className="mt-4 text-lg text-muted-foreground max-w-[750px]">
              {data.about}
            </p>
          )}
          {data.social && data.social.length > 0 && (
            <div className="flex gap-2 mt-6">
              {data.social.map((link, index) => (
                <Badge key={index} variant="secondary">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {link.platform}
                  </a>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Avatar className="h-64 w-64">
          <AvatarImage
            src={
              data.profileImage ||
              "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
            }
            alt={data.name || "Profile"}
          />
          <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
}

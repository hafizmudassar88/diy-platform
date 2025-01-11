import Image from "next/image";
import { format } from "date-fns";

export function BlogEntry({ image, heading, date, description }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="aspect-video relative">
        <Image
          src={image}
          alt={heading}
          layout="fill"
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <time className="text-sm text-muted-foreground">
          {format(new Date(date), "MMMM d, yyyy")}
        </time>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

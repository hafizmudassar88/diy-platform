import * as React from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";

const testimonials = [
  {
    username: "Olivia G.",
    comment:
      "This platform made it so easy to create my portfolio. I built my site in just a few hours, and it looks so professional!",
  },
  {
    username: "John Lark",
    comment:
      "I love how simple it is to manage my content. Adding new research papers and blogs is a breeze – no coding required!",
  },
  {
    username: "Jennifer L.",
    comment:
      "The free hosting is a game-changer. I published my website instantly, and it’s been running smoothly ever since.",
  },
  {
    username: "Bob Brown",
    comment: "A great experience overall. Will definitely come again.",
  },
];

export function TestimonialCarousel() {
  return (
    <div className="w-full h-full px-6 md:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="flex"
      >
        <CarouselContent className="flex space-x-2">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="flex-none w-full md:w-1/3 cursor-grab select-none "
            >
              <div className="p-4 h-full">
                <Card className="bg-[#1B94A6] text-white rounded-3xl h-full flex flex-col">
                  <CardContent className="flex flex-col items-center justify-center p-6 py-12 flex-1 ">
                    <p className="text-lg italic mb-4 text-center">
                      {testimonial.comment}
                    </p>
                    <span className="text-xl font-semibold">
                      - {testimonial.username}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg[#1B94A6] text-bg[#1B94A6] border-0 hover:bg[#1B94A6] hover:[#1B94A6]" />
        <CarouselNext className="bg[#1B94A6] text-bg[#1B94A6] border-0 hover:bg[#1B94A6] hover:[#1B94A6]" />
      </Carousel>
    </div>
  );
}

import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { format } from "date-fns";

const ListPropertyTestimonialCard = ({testimonial}) => {
  const emptyRating = 5 - testimonial?.rating || 0;

  return (
    <Card className="mx-4 max-w-xl border transition-all duration-300 ease-in-out hover:border-p1 hover:shadow-lg">
      <CardHeader>
        <h3 className="text-2xl font-semibold leading-tight text-gray-900">
         {testimonial?.review?.slice(0, 60)}
        </h3>
      </CardHeader>
      <CardContent className="grid gap-6">
        <p className="text-muted-foreground text-base/relaxed">
         {testimonial?.review}
        </p>

        <div className="flex gap-0.5">
          {Array(testimonial?.rating)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-500 text-yellow-500"
              />
            ))}
          {Array(emptyRating)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-gray-300 text-gray-300"
              />
            ))}
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={testimonial?.user?.profile} alt="Profile picture" />
              <AvatarFallback>{testimonial?.user?.name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{testimonial?.user?.name}</span>
          </div>
          <time className="text-muted-foreground text-sm" dateTime="2024-10-23">
            {format(testimonial?.createdAt, 'dd.MM.yyyy')}
          </time>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListPropertyTestimonialCard;

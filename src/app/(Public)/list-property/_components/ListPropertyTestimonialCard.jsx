import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import userImg from "/public/images/navbar/dummy-user.jpg";

const ListPropertyTestimonialCard = () => {
  return (
    <Card className="mx-4 max-w-xl border transition-all duration-300 ease-in-out hover:border-p1 hover:shadow-lg">
      <CardHeader>
        <h3 className="text-2xl font-semibold leading-tight text-gray-900">
          I can't imagine booking a hotel without this app now
        </h3>
      </CardHeader>
      <CardContent className="grid gap-6">
        <p className="text-muted-foreground text-base/relaxed">
          Sofitel Algiers Hamma Garden offers luxurious accommodations
          overlooking the stunning Botanical Garden of Hamma. With world-class
          dining, a relaxing spa, and proximity to Algiers' top landmarks, it's
          the perfect blend of elegance and convenience.
        </p>

        <div className="flex gap-0.5">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-500 text-yellow-500"
              />
            ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImg?.src} alt="Profile picture" />
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
            <span className="font-medium">Noah Patel</span>
          </div>
          <time className="text-muted-foreground text-sm" dateTime="2024-10-23">
            23.10. 2024
          </time>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListPropertyTestimonialCard;

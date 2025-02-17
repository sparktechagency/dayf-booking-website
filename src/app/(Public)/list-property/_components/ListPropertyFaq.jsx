import AnimatedArrow from "@/components/AnimatedArrow/AnimatedArrow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How do I list my property on Dayf Booking?..",
    answer:
      "Voluptatibus iste! Eligendi, quia. Tempora laboriosam hic dolor temporibus rem delectus fuga alias tenetur placeat vel necessitatibus ab excepturi, quasi odit, debitis accusamus corrupti quaerat culpa? Voluptatum, voluptates esse nobis fugit quia explicabo dignissimos ipsam repudiandae velit doloribus laborum, qui, ea quidem. Corrupti aut amet eligendi id cumque, fuga molestiae, quia quo neque accusantium provident non. Harum, obcaecati odit. Facere eveniet doloremque pariatur nihil mollitia voluptas totam consectetur maxime",
  },
  {
    question: "How do I list my property on Dayf Booking?.",
    answer:
      "Voluptatibus iste! Eligendi, quia. Tempora laboriosam hic dolor temporibus rem delectus fuga alias tenetur placeat vel necessitatibus ab excepturi, quasi odit, debitis accusamus corrupti quaerat culpa? Voluptatum, voluptates esse nobis fugit quia explicabo dignissimos ipsam repudiandae velit doloribus laborum, qui, ea quidem. Corrupti aut amet eligendi id cumque, fuga molestiae, quia quo neque accusantium provident non. Harum, obcaecati odit. Facere eveniet doloremque pariatur nihil mollitia voluptas totam consectetur maxime",
  },
  {
    question: "How do I list my property on Dayf Booking?...",
    answer:
      "Voluptatibus iste! Eligendi, quia. Tempora laboriosam hic dolor temporibus rem delectus fuga alias tenetur placeat vel necessitatibus ab excepturi, quasi odit, debitis accusamus corrupti quaerat culpa? Voluptatum, voluptates esse nobis fugit quia explicabo dignissimos ipsam repudiandae velit doloribus laborum, qui, ea quidem. Corrupti aut amet eligendi id cumque, fuga molestiae, quia quo neque accusantium provident non. Harum, obcaecati odit. Facere eveniet doloremque pariatur nihil mollitia voluptas totam consectetur maxime",
  },
  {
    question: "How do I list my property on Dayf Booking?....",
    answer:
      "Voluptatibus iste! Eligendi, quia. Tempora laboriosam hic dolor temporibus rem delectus fuga alias tenetur placeat vel necessitatibus ab excepturi, quasi odit, debitis accusamus corrupti quaerat culpa? Voluptatum, voluptates esse nobis fugit quia explicabo dignissimos ipsam repudiandae velit doloribus laborum, qui, ea quidem. Corrupti aut amet eligendi id cumque, fuga molestiae, quia quo neque accusantium provident non. Harum, obcaecati odit. Facere eveniet doloremque pariatur nihil mollitia voluptas totam consectetur maxime",
  },
  {
    question: "How do I list my property on Dayf Booking?.....",
    answer:
      "Voluptatibus iste! Eligendi, quia. Tempora laboriosam hic dolor temporibus rem delectus fuga alias tenetur placeat vel necessitatibus ab excepturi, quasi odit, debitis accusamus corrupti quaerat culpa? Voluptatum, voluptates esse nobis fugit quia explicabo dignissimos ipsam repudiandae velit doloribus laborum, qui, ea quidem. Corrupti aut amet eligendi id cumque, fuga molestiae, quia quo neque accusantium provident non. Harum, obcaecati odit. Facere eveniet doloremque pariatur nihil mollitia voluptas totam consectetur maxime",
  },
];

const ListPropertyFaq = () => {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto mb-14 w-1/2 text-center">
        <h1 className="heading">Everything You Need to Know Before Hosting</h1>
        <p className="description mt-3">
          Got questions? We’ve got answers! Whether you're new to hosting or
          looking to optimize your listing, our FAQs cover everything from
          pricing and payments to guest management and security. Explore the
          most common questions to ensure a seamless hosting experience with
          Dayf Booking.
        </p>
      </div>

      <div className="mx-auto w-full px-5 lg:w-1/3 lg:px-0 xl:w-1/2">
        <Accordion type="single" collapsible>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="my-5 rounded-2xl border border-p1/75 px-3"
            >
              <AccordionTrigger className="text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-center">
          Still have questions? Find answers to all your questions in our{" "}
          <Link href="/" className="font-medium text-p1">
            FAQ
          </Link>{" "}
          page
        </p>
      </div>

      <div className="flex-center mt-8">
        <Button
          variant="outline-primary"
          className="group relative rounded-full px-12 py-7"
        >
          Start Welcoming <AnimatedArrow />
        </Button>
      </div>
    </div>
  );
};

export default ListPropertyFaq;

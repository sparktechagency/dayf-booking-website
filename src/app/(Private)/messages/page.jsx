import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import MessageContainer from "./_components/MessageContainer";

export const metadata = {
  title: "Messages",
};

export default function MessagesPage() {
  return (
    <ResponsiveContainer className="my-12 min-h-screen">
      <MessageContainer />
    </ResponsiveContainer>
  );
}

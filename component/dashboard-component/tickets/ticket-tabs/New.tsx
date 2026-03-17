import Image from "next/image";
import Avatar from "@/assets/people.png";
import Link from "next/link";

const ticketData = [
  {
    id: 1,
    statusColor: "[#F8A53499]",
    statusText: "New Ticket",
    ticketNumber: "Ticket# 2023-CS123",
    postedAt: "Posted at 12:45 AM",
    title: "How to deposit money to my portal?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "John Snow",
  },
  {
    id: 2,
    statusColor: "green-400",
    statusText: "Ongoing Ticket",
    ticketNumber: "Ticket# 2023-CS124",
    postedAt: "Posted at 1:30 PM",
    title: "Issues with the login page",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Jane Doe",
  },
  {
    id: 3,
    statusColor: "blue-400",
    statusText: "Ongoing Ticket",
    ticketNumber: "Ticket# 2023-CS124",
    postedAt: "Posted at 1:30 PM",
    title: "Issues with the login page",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Jane Doe",
  },
  {
    id: 4,
    statusColor: "[#F8A53499]",
    statusText: "Ongoing Ticket",
    ticketNumber: "Ticket# 2023-CS124",
    postedAt: "Posted at 1:30 PM",
    title: "Issues with the login page",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Jane Doe",
  },
  {
    id: 5,
    statusColor: "[#F8A53499]",
    statusText: "Ongoing Ticket",
    ticketNumber: "Ticket# 2023-CS124",
    postedAt: "Posted at 1:30 PM",
    title: "Issues with the login page",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    author: "Jane Doe",
  },
  // Add more ticket data objects as needed
];

const New = () => {
  return (
    <section className="bg-white py-4 px-2 space-y-4">
      <div className="pt-2 pb-4 flex flex-col space-y-4">
        {ticketData.map((ticket, index) => (
          <div
            key={index}
            className="rounded-[0.625rem] border border-[#D6DDEB] px-5 py-[1.1875rem] space-y-2 lg:space-y-4"
          >
            <div className="lg:flex justify-between gap-4 space-y-1 lg:space-y-0">
              <span className="flex gap-2">
                <div
                  className={`bg-${ticket.statusColor} p-2 rounded-full w-5 h-5 my-1`}
                />
                <p className="font-bold text-lg">{ticket.ticketNumber}</p>
              </span>
              <p className="font-normal text-sm">{ticket.postedAt}</p>
            </div>

            <div className="space-y-2 border-b pb-2">
              <p className="text-[#25324B] font-medium">{ticket.title}</p>
              <p className="text-[#515B6F]">{ticket.content}</p>
            </div>

            <div className="flex justify-between gap-4 space-y-2 lg:space-y-0">
              <span className="flex gap-2">
                <Image
                  src={Avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <p>{ticket.author}</p>
              </span>
              <Link
                href="/ticket-details/[id]"
                as={`/ticket-details/${ticket.id}`}
                className="text-base hover:text-black bg-white text-[#0D24F1]"
              >
                Open Ticket
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default New;

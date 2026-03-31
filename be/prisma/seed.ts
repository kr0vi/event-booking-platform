import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.event.deleteMany();

  const events: Prisma.EventCreateManyInput[] = [
    {
      title: "Cosmic Night Festival",
      description:
        "A high-energy music night with cosmic visuals and live DJs.",
      location: "Delhi",
      date: "2026-04-10",
      time: "19:00",
      posterImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      galleryImages: [
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
        "https://images.unsplash.com/photo-1506157786151-b8491531f063",
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
      ],
      highlights: [
        { title: "Live DJs", description: "Top DJs performing EDM & techno" },
        { title: "Laser Show", description: "Immersive cosmic visuals" },
      ],
      thingsToKnow: ["Carry ID", "No outside food", "Gates close at 9 PM"],
      price: 499,
      totalTickets: 150,
      organizerId: 5,
    },

    {
      title: "Galaxy Tech Meetup",
      description: "Meet developers and explore AI, SaaS and future tech.",
      location: "Gurgaon",
      date: "2026-04-15",
      time: "11:00",
      posterImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
      galleryImages: [
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
        "https://images.unsplash.com/photo-1515169067865-5387ec356754",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998",
      ],
      highlights: [
        { title: "Networking", description: "Meet founders and engineers" },
      ],
      thingsToKnow: ["Bring laptop", "Registration required"],
      price: 199,
      totalTickets: 80,
      organizerId: 5,
    },

    {
      title: "Stellar College Fest",
      description: "Annual college fest with music, dance and competitions.",
      location: "Noida",
      date: "2026-04-20",
      time: "10:00",
      posterImage:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      galleryImages: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865",
        "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      ],
      highlights: [
        { title: "Dance Battles", description: "Inter-college competitions" },
        { title: "Live Band", description: "Rock band performance" },
      ],
      thingsToKnow: ["College ID required"],
      price: 0,
      totalTickets: 300,
      organizerId: 5,
    },

    {
      title: "Startup Pitch Night",
      description: "Pitch your startup idea to investors and win funding.",
      location: "Delhi",
      date: "2026-04-25",
      time: "17:00",
      posterImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      galleryImages: [
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
        "https://images.unsplash.com/photo-1560264280-88b68371db39",
        "https://images.unsplash.com/photo-1551434678-e076c223a692",
      ],
      highlights: [
        { title: "Investor Panel", description: "Get feedback from VCs" },
      ],
      thingsToKnow: ["Pre-registration needed"],
      price: 299,
      totalTickets: 60,
      organizerId: 5,
    },

    {
      title: "Nebula Art Workshop",
      description: "Learn space-themed digital art and illustration.",
      location: "Delhi",
      date: "2026-05-02",
      time: "14:00",
      posterImage:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
      galleryImages: [
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
        "https://images.unsplash.com/photo-1500534623283-312aade485b7",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      ],
      highlights: [
        { title: "Hands-on Learning", description: "Create your own artwork" },
      ],
      thingsToKnow: ["Basic laptop required"],
      price: 149,
      totalTickets: 40,
      organizerId: 5,
    },

    {
      title: "Lunar Yoga Retreat",
      description: "Relax with yoga and meditation under moonlight vibes.",
      location: "Gurgaon",
      date: "2026-05-05",
      time: "06:00",
      posterImage:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
      galleryImages: [
        "https://images.unsplash.com/photo-1552058544-f2b08422138a",
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
        "https://images.unsplash.com/photo-1506126279646-a697353d3166",
      ],
      highlights: [
        { title: "Guided Meditation", description: "Calm your mind" },
      ],
      thingsToKnow: ["Bring yoga mat"],
      price: 99,
      totalTickets: 50,
      organizerId: 5,
    },

    {
      title: "Interstellar Gaming Night",
      description: "Compete in gaming tournaments and win prizes.",
      location: "Noida",
      date: "2026-05-10",
      time: "18:00",
      posterImage:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420",
      galleryImages: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1",
        "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
      ],
      highlights: [
        { title: "Tournament Mode", description: "Compete in popular games" },
      ],
      thingsToKnow: ["Bring your ID"],
      price: 199,
      totalTickets: 120,
      organizerId: 5,
    },

    {
      title: "Astronomy Night Camp",
      description: "Stargazing experience with telescopes and experts.",
      location: "Manesar",
      date: "2026-05-15",
      time: "21:00",
      posterImage:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
      galleryImages: [
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      ],
      highlights: [
        {
          title: "Telescope Viewing",
          description: "Observe planets and stars",
        },
      ],
      thingsToKnow: ["Carry warm clothes"],
      price: 599,
      totalTickets: 70,
      organizerId: 5,
    },
  ];

  await prisma.event.createMany({
    data: events,
  });

  console.log("Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

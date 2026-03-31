import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.event.deleteMany();

  const events = [
    {
      title: "Cosmic Night Festival",
      description: "A high-energy music night with cosmic visuals and live DJs.",
      location: "Delhi",
      date: "2026-04-10",
      time: "19:00",
      posterImage:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      galleryImages: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
      ],
      highlights: [
        {
          title: "Live DJs",
          description: "Top DJs performing EDM & techno",
        },
        {
          title: "Laser Show",
          description: "Immersive cosmic visuals",
        },
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
      galleryImages: [],
      highlights: [
        {
          title: "Networking",
          description: "Meet founders and engineers",
        },
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
        "https://images.unsplash.com/photo-1506157786151-b8491531f063",
      ],
      highlights: [
        {
          title: "Dance Battles",
          description: "Inter-college competitions",
        },
        {
          title: "Live Band",
          description: "Rock band performance",
        },
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
      posterImage:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      galleryImages: [],
      highlights: [
        {
          title: "Investor Panel",
          description: "Get feedback from VCs",
        },
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
      galleryImages: [],
      highlights: [
        {
          title: "Hands-on Learning",
          description: "Create your own artwork",
        },
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
      galleryImages: [],
      highlights: [
        {
          title: "Guided Meditation",
          description: "Calm your mind",
        },
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
      galleryImages: [],
      highlights: [
        {
          title: "Tournament Mode",
          description: "Compete in popular games",
        },
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
      galleryImages: [],
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
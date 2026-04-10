type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-[#1a56ff] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="h-95 w-full rounded-2xl border border-blue-300/40"></div>

            <div className="mt-8 space-y-5 text-sm">
              <div>
                <p className="mb-2 text-blue-200">Hosted By</p>
                <p className="font-semibold">Young Designers India UID</p>
              </div>

              <div>
                <p className="mb-2 text-blue-200">33 Going</p>
                <div className="flex -space-x-2">
                  {["A", "N", "R", "S", "+3"].map((name) => (
                    <div
                      key={name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-100/70 bg-white text-xs font-semibold text-blue-900"
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-blue-200">
                  Srishti, Namrta Banka and 31 others
                </p>
              </div>

              <p className="w-fit rounded-full border border-blue-300/40 px-3 py-1 text-xs text-blue-100">
                # Arts &amp; Culture
              </p>
            </div>
          </div>

          <div className=" h-screen overflow-y-auto">
            <h1 className="text-4xl font-bold leading-tight ">
              Behind The Designer w/
              <br />
              Gully Labs
            </h1>

            <div className="mt-3 space-y-1 text-sm text-white/60 font-medium">
              <p>Saturday, April 11</p>
              <p>Location Block B</p>
            </div>

            <div className="mt-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <div className="border-b border-blue-200/40 px-4 py-2 text-xs bg-white/20 text-white">
                Registration
              </div>
              <div className="space-y-3 px-4 py-4">
                <p className="text-sm font-medium">
                  Welcome! To join the event, please register below.
                </p>
                <button className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#1a56ff] transition hover:bg-blue-50">
                  Get Your Tickets
                </button>
              </div>
            </div>

            <div className="mt-8 ">
              <h2 className="border-b border-blue-200/40 pb-2 text-2xl font-semibold">
                About Event
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-blue-50">
                <p>
                  THE 9-5 ALGO: Cracking the FAANG Code. A roadmap to big tech
                  for developers and aspiring engineers.
                </p>
                <p>
                  Join us for an insightful session designed to help you
                  navigate your journey to top tech companies. This session
                  covers practical strategy, roadmap planning, and FAANG-level
                  preparation.
                </p>
                <ul className="list-inside list-disc space-y-1 text-blue-100">
                  <li>Speaker: Mr. Jatin Kumar</li>
                  <li>4+ years of full-stack experience</li>
                  <li>Built systems impacting $200M+</li>
                  <li>Mentor and hackathon judge</li>
                  <li>Time: 11:00 AM onwards</li>
                  <li>Venue: PLH 102, Bennett University</li>
                </ul>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia incidunt nobis eum consectetur nam modi exercitationem
                  quasi libero quaerat fuga! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Neque earum ullam ex officiis
                  libero. Molestias corporis obcaecati vel praesentium suscipit
                  fugit atque aliquid eveniet saepe quibusdam consequatur
                  inventore fuga, voluptas blanditiis cumque dignissimos in,
                  aspernatur itaque. Hic placeat ad quod incidunt nam optio!
                  Alias, a sit. Voluptate esse libero unde dolor enim,
                  dignissimos, id atque voluptates excepturi iste, eveniet quo
                  laudantium. Quasi tenetur est id illum molestiae iste mollitia
                  earum eveniet asperiores fugit eius dignissimos quos
                  recusandae deserunt inventore nihil laborum, eligendi error
                  enim maxime commodi beatae hic? Nulla id asperiores
                  perspiciatis fugit enim tempore magni cumque repellat
                  perferendis earum optio dignissimos quaerat, ut unde mollitia
                  quia dolorum, voluptatum vero error totam architecto vitae
                  blanditiis veritatis aperiam! Quibusdam laborum officia
                  consectetur facilis itaque recusandae molestiae temporibus
                  earum saepe est laboriosam ullam harum fuga minima illo
                  commodi, aspernatur ratione. Officiis, natus beatae fugit
                  voluptatem quis itaque nesciunt similique doloremque earum
                  impedit? Maiores hic repudiandae, minima nam, repellat
                  similit eligendi tempore laboriosam
                  neque architecto. Id voluptas, magnam tenetur quibusdam
                  exercitationem, ad sint nostrum numquam quo asperiores
                  laudantium? Velit veritatis deleniti cum ipsam eum molestias.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

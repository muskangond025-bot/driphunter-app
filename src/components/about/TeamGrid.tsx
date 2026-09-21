import React from "react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Aarav Kapse",
    role: "Founder & Creative Director",
    bio: "Obsessed with oversized fits and vintage sneakers. aarav started DripHunter to connect local design houses with premium streetwear lovers.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Madhav Sharma",
    role: "Head of Operations & Logistics",
    bio: "Operations vet ensuring every sneaker drop and shipment is authenticated and delivered securely across India within record times.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Priya Iyer",
    role: "Head of Community & Partners",
    bio: "Bridges the gap between influencers, local brands, and community creators. Managing the #OOTD feeds and events program.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

export default function TeamGrid() {
  return (
    <section className="relative w-full py-16 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">The Crew</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Behind DripHunter</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">
            The curators, operators, and developers working to build India&apos;s biggest streetwear community.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-brand-purple/20 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Profile Image container */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-border mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Title & Role */}
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-purple mt-1">
                {member.role}
              </p>

              {/* Short Bio */}
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed max-w-xs">
                {member.bio}
              </p>

              {/* Social links */}
              <div className="flex gap-4 mt-6 justify-center">
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-brand-purple transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <TwitterIcon className="h-4 w-4" />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-brand-purple transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-brand-purple transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

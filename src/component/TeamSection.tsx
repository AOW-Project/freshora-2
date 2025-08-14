"use client"

import React from 'react';
import Image from 'next/image';

// Define the type for a team member
type TeamMember = {
  name: string;
  title: string;
  image: string;
};

// Team member data
const teamMembers: TeamMember[] = [
  {
    name: 'Justin Stein',
    title: 'Service Manager',
    image: '/images/pesonal-info-img01.jpg',
  },
  {
    name: "Sarah Johnson",
    title: "Quality Control",
    image: "/images/pesonal-info-img01.jpg",
  },
  {
    name: "Mike Davis",
    title: "Dry Cleaning Specialist",
    image: "/images/pesonal-info-img02.jpg",
  },
  {
    name: "Lisa Chen",
    title: "Customer Service Lead",
    image: "/images/pesonal-info-img03.jpg",
  },
  {
    name: "Robert Wilson",
    title: "Maintenance Supervisor",
    image: "/images/pesonal-info-img03.jpg",
  },
  {
    name: "Emma Thompson",
    title: "Pickup & Delivery",
    image: "/images/pesonal-info-img01.jpg",
  },
  {
    name: "David Martinez",
    title: "Stain Removal Expert",
    image: "/images/pesonal-info-img02.jpg",
  },
];

const TeamSection: React.FC = () => {
  // To create a seamless loop, we duplicate the team members array.
  const extendedTeam = [...teamMembers, ...teamMembers];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-green-600 font-semibold mb-2">[ Our Team ]</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Laundry Specialists</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Our team’s goal each day is to earn your business with each visit and to make your experience with us the absolute best.
        </p>

        {/* Carousel container with a subtle fade-out effect on the edges */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          {/* The scrolling track that contains the duplicated team members */}
          <div className="flex animate-scroll group-hover:pause">
            {extendedTeam.map((member, index) => (
              <div key={index} className="flex-shrink-0 mx-4" style={{ width: '250px' }}>
                <div className="flex flex-col items-center text-center p-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover shadow-lg mb-4"
                  />
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* We need to define the animation in a style tag or globals.css */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Move the track by the width of the original set of members */
            transform: translateX(calc(-250px * ${teamMembers.length}));
          }
        }
        .animate-scroll {
          /* Adjust the duration to control the speed. 40s is a good starting point. */
          animation: scroll 40s linear infinite;
        }
        /* Optional: Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TeamSection;

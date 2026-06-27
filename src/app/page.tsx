"use client";

import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import OurStory from "@/components/OurStory";
import Events from "@/components/Events";
import Location from "@/components/Location";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Guestbook from "@/components/Guestbook";
import Album from "@/components/Album";
import Closing from "@/components/Closing";
import FloatingNav from "@/components/FloatingNav";
import MusicToggle from "@/components/MusicToggle";

export default function Home() {
  return (
    <main className="relative">
      <FloatingNav />
      <MusicToggle />
      <Hero />
      <Countdown />
      <OurStory />
      <Events />
      <Location />
      <Gallery />
      <RSVP />
      <Guestbook />
      <Album />
      <Closing />
    </main>
  );
}

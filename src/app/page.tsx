"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Location from "@/components/Location";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Guestbook from "@/components/Guestbook";
import Album from "@/components/Album";
import Closing from "@/components/Closing";
import FloatingNav from "@/components/FloatingNav";
import MusicToggle from "@/components/MusicToggle";
import LoadingScreen from "@/components/LoadingScreen";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import FallingPetals from "@/components/FallingPetals";

type Phase = "loading" | "envelope" | "site";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("envelope-opened");
      if (seen) setPhase("site");
    }
  }, []);

  return (
    <>
      {phase === "loading" && (
        <LoadingScreen onComplete={() => setPhase("envelope")} />
      )}

      {phase === "envelope" && (
        <EnvelopeOpening onComplete={() => setPhase("site")} />
      )}

      {phase === "site" && (
        <main className="relative">
          <FallingPetals />
          <FloatingNav />
          <MusicToggle />
          <Hero />
          <Countdown />
          <Events />
          <Location />
          <Gallery />
          <RSVP />
          <Guestbook />
          <Album />
          <Closing />
        </main>
      )}
    </>
  );
}

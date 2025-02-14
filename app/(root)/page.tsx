"use client";
import SinglePodcastCard from "@/components/SinglePodcastCard";
import { podcastData } from "@/constants";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function Home() {
  const podcasts = useQuery(api.podcasts.get);
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold capitalize text-white-1">Trending podcasts</h1>
        <div className="podcast_grid">
          {podcastData.map(({ id, title, description, imgURL }) => (

            <SinglePodcastCard
              key={id}
              imgURL={imgURL}
              title={title}
              description={description}
              podcastId={id} />

          ))}
        </div>
      </section>
    </div>
  );
}

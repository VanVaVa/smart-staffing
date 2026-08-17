import type { HomeBlock } from "@/entities/landing/model/home-blocks";

import { HomeBlockRenderer } from "./HomeBlockRenderer";

type HomePageProps = {
  blocks: HomeBlock[];
};

export function HomePage({ blocks }: HomePageProps) {
  return (
    <>
      {blocks.map((block) => (
        <div key={block.id}>
          <HomeBlockRenderer block={block} interactive />
        </div>
      ))}
    </>
  );
}

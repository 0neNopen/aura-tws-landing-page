import React, { useRef } from 'react';
import { useScroll } from 'motion/react';
import Container from '../components/common/Container';
import ProductStage from '../components/storytelling/ProductStage';
import StoryBlock from '../components/storytelling/StoryBlock';
import ChapterProgress from '../components/storytelling/ChapterProgress';
import { STORY_CHAPTERS, PRODUCT_IMAGES } from '../content/story';
import useFrameSync from '../hooks/useFrameSync';
import { useImagePreloader } from '../hooks/useImagePreloader';

export default function StorytellingSection() {
  const sectionRef = useRef(null);
  const activeIndex = useFrameSync(sectionRef, STORY_CHAPTERS.length);
  const { isReady, error: preloadError } = useImagePreloader(PRODUCT_IMAGES);

  // Continuous 0–1 progress across the whole chapter run, consumed by the
  // stage as scroll-linked transforms. Discrete chapter state above stays
  // with useFrameSync; STORY_CHAPTERS ranges remain the pacing source.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="storytelling" ref={sectionRef} className="relative w-full">
      {/* Background Layer: Sticky Full-Screen Stage */}
      <ProductStage
        activeIndex={activeIndex}
        scrollProgress={scrollYProgress}
        ready={isReady}
        preloadError={preloadError}
      />

      {/* Chapter rail: jump links, visible only while the story is on screen */}
      <ChapterProgress
        sectionRef={sectionRef}
        activeIndex={activeIndex}
        total={STORY_CHAPTERS.length}
      />

      {/* Foreground Content Layer: Normal Scroll Overlay */}
      {/* -mt-[100vh] overlays the content rail onto the h-screen sticky stage;
          keep this in sync if the stage height ever changes. */}
      <div className="relative z-10 -mt-[100vh]">
        <Container>
          <div className="flex flex-col space-y-20 py-[15vh]">
            {STORY_CHAPTERS.map((chapter, idx) => (
              <StoryBlock
                key={chapter.id}
                step={String(idx + 1).padStart(2, '0')}
                totalSteps={String(STORY_CHAPTERS.length).padStart(2, '0')}
                title={chapter.title}
                subtitle={chapter.subtitle}
                description={chapter.description}
                metrics={chapter.metrics}
                isActive={idx === activeIndex}
                chapterIndex={idx}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

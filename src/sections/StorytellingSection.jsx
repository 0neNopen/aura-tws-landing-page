import React, { useRef } from 'react';
import Container from '../components/common/Container';
import ProductStage from '../components/storytelling/ProductStage';
import StoryBlock from '../components/storytelling/StoryBlock';
import { STORY_CHAPTERS } from '../utils/constants';
import useFrameSync from '../hooks/useFrameSync';

export default function StorytellingSection() {
  const sectionRef = useRef(null);
  const activeIndex = useFrameSync(sectionRef, STORY_CHAPTERS.length);

  return (
    <section id="storytelling" ref={sectionRef} className="relative w-full">
      {/* Background Layer: Sticky Full-Screen Stage — receives only activeIndex */}
      <ProductStage activeIndex={activeIndex} />

      {/* Foreground Content Layer: Normal Scroll Overlay */}
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

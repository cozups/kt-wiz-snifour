import { Video } from '@/features/home/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router';

interface WizVideoAnimationProps {
  vid: Video;
  index: number;
  navigate: ReturnType<typeof useNavigate>;
}

const WizVideoAnimation: React.FC<WizVideoAnimationProps> = ({
  vid,
  index,
  navigate,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% 화면에 들어오면 트리거
    triggerOnce: true, // 한 번만 실행
  });

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 bg-white bg-opacity-10 rounded-xl overflow-hidden cursor-pointer text-white transition-all duration-500 ease-in-out transform hover:scale-105',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{
        transitionDelay: `${index * 200}ms`, // 각 항목의 지연 시간
      }}
      role="button"
      tabIndex={0}
      onClick={() => {
        if (vid.artcSeq) {
          navigate(`/media/highlight/${vid.artcSeq}`);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (vid.artcSeq) {
            navigate(`/media/highlight/${vid.artcSeq}`);
          }
        }
      }}
    >
      <div className="bg-gray-500">
        <img
          src={vid.imgFilePath}
          alt={vid.artcTitle}
          className="w-full aspect-video object-cover"
        />
      </div>
      <div className="h-full flex flex-col justify-between px-2 py-1 gap-4 md:gap-8">
        <p
          className={cn('font-semibold text-xs', 'md:text-sm', 'lg:text-base')}
        >
          {vid.artcTitle}
        </p>
        <p
          className={cn(
            'text-neutral-400 self-end text-[0.6rem]',
            'lg:text-xs'
          )}
        >
          {vid.contentsDate}
        </p>
      </div>
    </div>
  );
};

export { WizVideoAnimation };

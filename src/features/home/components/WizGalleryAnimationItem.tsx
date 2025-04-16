import {
  CarouselItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { GridArticle } from '@/features/media';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Photo } from '../types';

const WizGalleryAnimationItem = ({
  photo,
  index,
}: {
  photo: Photo;
  index: number;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2, // 20% 화면에 들어오면 트리거
    triggerOnce: true, // 한 번만 애니메이션 실행
  });

  return (
    <>
      <CarouselItem
        ref={ref}
        className={cn(
          'md:basis-1/2 lg:basis-1/3 transition-transform duration-500 ease-in-out cursor-pointer',
          inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        )}
        style={{
          transitionDelay: `${index * 200}ms`, // 각 아이템의 지연 시간
        }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <div className="h-[36rem] rounded-xl overflow-hidden relative">
              <img
                src={photo.imgFilePath}
                alt={photo.artcTitle}
                className="w-auto h-full object-cover object-center"
                loading="lazy"
              />
              <div className="h-full w-full absolute top-0 left-0 flex flex-col items-center justify-end">
                <h3 className="w-full text-center text-white font-bold text-2xl z-10 pb-12 bg-gradient-to-t from-black to-transparent break-keep">
                  {photo.artcTitle}
                </h3>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="w-screen h-screen max-w-none p-0 bg-black/95">
            <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 hover:opacity-100">
              <X className="h-8 w-8 text-white" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <div className="h-full flex items-center justify-center relative">
              <div className="relative max-w-5xl w-full mx-8">
                <GridArticle.Media className="mb-0">
                  <GridArticle.Thumbnail
                    imgFilePath={photo.imgFilePath}
                    title={photo.artcTitle}
                    className="!object-contain"
                  />
                </GridArticle.Media>

                <div className="bg-gradient-to-t from-black/90 to-transparent">
                  <DialogHeader className="gap-2">
                    <DialogTitle className="text-2xl font-bold text-white">
                      <p>{photo.artcTitle}</p>
                      <p className="text-xl text-gray-400">
                        {photo.artcSubTitle}
                      </p>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-4 text-[#6b7280]">
                      {photo.contentsDate}
                    </DialogDescription>
                  </DialogHeader>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CarouselItem>
    </>
  );
};

export { WizGalleryAnimationItem };

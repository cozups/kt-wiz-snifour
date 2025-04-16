import { Card, Carousel, CarouselContent, CarouselItem } from '@/components/ui';
import Autoplay from 'embla-carousel-autoplay';

function MainImageSlider() {
  return (
    <Carousel
      className="w-screen relative"
      opts={{
        loop: true,
      }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
    >
      <CarouselContent className="h-80 lg:h-[28rem]">
        <CarouselItem>
          <Card className="w-full h-full border-none relative">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/assets/main/2024_post_bg_mobile.webp"
              />
              <source
                media="(max-width: 1024px)"
                srcSet="/assets/main/2024_post_bg_tablet.webp"
              />
              <img
                src="/assets/main/2024_post_bg_web.webp"
                alt="2024 가을의 마법사"
                fetchPriority="high"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </picture>
            <div className="w-full text-wiz-white absolute bottom-0 left-0 px-6 py-4 lg:px-12 lg:py-8 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl lg:text-4xl font-bold">
                가을의 마법사 KT Wiz
              </h3>
              <p className="font-semibold mt-1 text-sm lg:mt-4 lg:text-lg">
                2024 POST SEASON
              </p>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="w-full h-full border-none relative  ">
            <img
              src="/assets/main/player@2x.png"
              alt="이 달의 선수"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="w-full text-wiz-white absolute bottom-0 left-0 px-6 py-4 lg:px-12 lg:py-8 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl lg:text-4xl font-bold">이 달의 선수</h3>
              <p className="font-semibold mt-1 text-sm lg:mt-4 lg:text-lg">
                <span className="text-wiz-red font-extrabold">14</span> 천성호
              </p>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="w-full h-full border-none relative  ">
            <img
              src="/assets/main/img-banner-store@2x.png"
              alt="온라인 스토어"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="w-full text-wiz-white absolute bottom-0 left-0 px-6 py-4 lg:px-12 lg:py-8 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl lg:text-4xl font-bold">
                KT Wiz 공식 온라인 스토어
              </h3>
              <p className="font-semibold mt-1 text-sm lg:mt-4 lg:text-lg">
                바로가기
              </p>
            </div>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export { MainImageSlider };

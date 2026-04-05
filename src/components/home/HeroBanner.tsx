import { useState, useEffect } from 'react';

interface BannerItem {
  title: string;
  subtitle: string;
  desc: string;
  btnText: string;
  btnHref: string;
  bg: string;
  accent: string;
  image: string;
}

interface HeroBannerProps {
  banners: BannerItem[];
  inquireText?: string;
  learnText?: string;
}

export default function HeroBanner({ banners, inquireText = '立即询价', learnText = '了解更多' }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx: number) => {
    if (isTransitioning || idx === current) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsTransitioning(false);
    }, 300);
  };

  const goNext = () => goTo((current + 1) % banners.length);
  const goPrev = () => goTo((current - 1 + banners.length) % banners.length);

  const banner = banners[current];

  return (
    <section className={`relative overflow-hidden ${banner.bg} transition-all duration-700`} style={{ minHeight: '520px' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className={`relative max-w-7xl mx-auto px-4 py-20 flex items-center transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex-1 text-white max-w-2xl">
          {/* Tag */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${banner.accent}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {banner.subtitle}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {banner.title}
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
            {banner.desc}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('open-inquiry', { detail: { product: banner.title } }))}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {inquireText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href={banner.btnHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-700 transition-colors"
            >
              {learnText}
            </a>
          </div>
        </div>

        {/* Right illustration */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="w-64 h-64 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-2xl">
            <div className="text-8xl">{banner.image}</div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7 7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all duration-300 rounded-full ${idx === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
}

import HeroAnimation from '../assets/hero.svg';

export default function Blog() {
  return (
    <div className="flex flex-col items-center">
      {/* hero section */}
      <div className="py-7">
        <img src={HeroAnimation} alt="hero" className="h-[50vh]" />
        <h1 className="text-4xl mt-5 font-semibold text-center leading-relaxed">
          <span className="md:inline block">SYNC with&nbsp;</span>
          <span className="text-indigo-600 md:inline block">Profile Book</span>
        </h1>
        <p className="text-center p-5">Don't Forget To Store Your Profile</p>
      </div>
    </div>
  );
}

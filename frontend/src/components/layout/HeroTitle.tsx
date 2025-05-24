const HeroTitle = ({ className = "" }: { className?: string }) => (
  <h1
    className={`font-thin uppercase tracking-tight leading-[0.82] text-[clamp(3rem,8.5vw,9.5rem)] whitespace-nowrap ${className}`}
  >
    LA<span className="font-extrabold">LUNETTERIE</span>
    <span className="block sm:inline">
      DU<span className="font-extrabold">COIN</span>
    </span>
  </h1>
);

export default HeroTitle;
import SectionFade from "../components/common/SectionFade";
import PunchlineContent from "../components/layout/PunchlineContent";

export default function Punchlines() {
	return (
		<section className="relative z-10 flex flex-col items-stretch justify-center overflow-visible">
			<SectionFade direction="top" absolute />
			<PunchlineContent />
			<SectionFade direction="bottom" />
		</section>
	);
}

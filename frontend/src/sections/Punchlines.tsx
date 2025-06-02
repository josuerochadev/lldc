import SectionFade from "../components/common/SectionFade";
import PunchlineContent from "../components/layout/PunchlineContent";

export default function Punchlines() {
	return (
		<section
			id="punchlines"
			className="relative isolate flex flex-col justify-center items-center"
		>
			{/* Fade superior */}
			<SectionFade direction="top" />

			{/* Conteúdo principal com fundo laranja sólido */}
			<div className="relative z-10 w-full bg-orange">
				<PunchlineContent />
			</div>

			{/* Fade inferior */}
			<SectionFade direction="bottom" />
		</section>
	);
}

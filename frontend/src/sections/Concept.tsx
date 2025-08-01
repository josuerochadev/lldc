import SectionContainer from '@/components/common/SectionContainer';
import SectionTitle from '@/components/common/SectionTitle';
import SplitText from '@/components/motion/SplitText';

export default function Concept() {
  return (
    <SectionContainer id="concept">
      <SectionTitle title="Le Concept" />

      <SplitText
        text="✷ Depuis 2016, on mixe style ☆ et conscience ◇ en plein Strasbourg. Des lunettes neuves, oui — mais aussi des montures recyclées ✷ restaurées avec soin. Ramenez vos anciennes paires. → Jusqu’à 70€ de réduction. ✧ Donnez-leur une seconde vie. On voit clair, ○ sans fermer les yeux sur l’impact écologique. ▲ La mode change. ◆ La planète, non."
        className="font-serif text-title-md font-bold tracking-wider"
      />
    </SectionContainer>
  );
}

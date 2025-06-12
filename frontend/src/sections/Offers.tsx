import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import StaggerGroup from "@/components/motion/StaggerGroup";
import FadeInUp from "@/components/motion/FadeInUp";
import TiltCard from "@/components/motion/TiltCard";

const offers = [
  {
    id: 1,
    title: "Recyclage",
    image: "/photo.png",
    summary: "Jusqu’à 70€ de remise en rapportant vos anciennes montures.",
    details: "Cette démarche vise à encourager le recyclage, donner une seconde vie à vos lunettes tout en réduisant les déchets.",
  },
  {
    id: 2,
    title: "Deuxième paire",
    image: "/photo.png",
    summary: "Obtenez une deuxième paire à partir de 59€ selon vos besoins.",
    details: `• 59€ : monture + verres unifocaux\n
              • 89€ : verres progressifs\n
              • Verres : antireflet durci ou solaires UV cat.3\n
              • Origine France Garantie — Ophtalmic Vision.`,
  },
];

export default function Offers() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section className="w-full py-24 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-6xl font-extrabold">Offres du moment</h2>
      </div>

      <StaggerGroup>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {offers.map((offer, index) => (
            <FadeInUp key={offer.id} delay={index * 0.2}>
              <TiltCard>
                <motion.div
                  className="bg-beige border-4 border-primary overflow-hidden flex flex-col justify-between h-full min-h-[500px] md:min-h-[600px] cursor-pointer"
                  onClick={() => setOpenCard(openCard === offer.id ? null : offer.id)}
                  layout
                >
                  <AnimatePresence mode="wait">
                    {openCard === offer.id ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-10 flex flex-col justify-between h-full"
                      >
                        <h3 className="text-3xl font-serif font-bold mb-4">{offer.title}</h3>
                        <p className="text-lg whitespace-pre-line">{offer.details}</p>
                        <button type="button" className="underline font-bold self-start mt-6">Réduire</button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="summary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full"
                      >
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-72 md:h-96 object-cover border-b-4 border-primary"
                        />
                        <div className="p-10 flex flex-col justify-between h-full">
                          <h3 className="text-3xl font-serif font-bold mb-4">{offer.title}</h3>
                          <p className="text-lg mb-6">{offer.summary}</p>
                          <button type="button" className="underline font-bold self-start">En savoir plus</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </TiltCard>
            </FadeInUp>
          ))}
        </div>
      </StaggerGroup>
    </section>
  );
}
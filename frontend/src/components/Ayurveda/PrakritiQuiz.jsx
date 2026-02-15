import React, { useState } from 'react';
import { BsCheckCircleFill, BsArrowRight, BsArrowLeft, BsX } from 'react-icons/bs';

const PrakritiQuiz = ({ onClose, langHindi }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
    const [showResult, setShowResult] = useState(false);
    const [dominantDosha, setDominantDosha] = useState(null);

    const questions = [
        {
            id: 1,
            text: langHindi ? "आपका शरीर का ढांचा कैसा है?" : "What is your body frame?",
            options: [
                { text: langHindi ? "दुबला-पतला, हल्की हड्डियाँ" : "Thin, bony, light build", type: "vata" },
                { text: langHindi ? "मध्यम, गठीला शरीर" : "Medium, muscular build", type: "pitta" },
                { text: langHindi ? "मजबूत, भारी शरीर" : "Large, solid, heavy build", type: "kapha" }
            ]
        },
        {
            id: 2,
            text: langHindi ? "आपकी त्वचा कैसी है?" : "How is your skin texture?",
            options: [
                { text: langHindi ? "सूखी, खुरदरी, ठंडी" : "Dry, rough, cold", type: "vata" },
                { text: langHindi ? "संवेदनशील, तैलीय, गर्म" : "Sensitive, oily, warm", type: "pitta" },
                { text: langHindi ? "चिकनी, मुलायम, ठंडी" : "Smooth, soft, cool", type: "kapha" }
            ]
        },
        {
            id: 3,
            text: langHindi ? "आपकी भूख कैसी है?" : "How is your appetite?",
            options: [
                { text: langHindi ? "अनियमित (कभी कम, कभी ज्यादा)" : "Irregular, variable", type: "vata" },
                { text: langHindi ? "तेज, असहनीय भूख" : "Strong, sharp, unbearable", type: "pitta" },
                { text: langHindi ? "स्थिर, कम लेकिन निरंतर" : "Steady, low but constant", type: "kapha" }
            ]
        },
        {
            id: 4,
            text: langHindi ? "आपकी नींद कैसी है?" : "How is your sleep pattern?",
            options: [
                { text: langHindi ? "हल्की, अक्सर टूटती है" : "Light, interrupted", type: "vata" },
                { text: langHindi ? "मध्यम, अच्छी नींद" : "Sound, medium duration", type: "pitta" },
                { text: langHindi ? "गहरी, भारी, ज्यादा" : "Deep, heavy, excessive", type: "kapha" }
            ]
        },
        {
            id: 5,
            text: langHindi ? "आपका स्वभाव कैसा है?" : "What is your temperament?",
            options: [
                { text: langHindi ? "उत्साही, चिंताग्रस्त, चंचल" : "Enthusiastic, anxious, changing", type: "vata" },
                { text: langHindi ? "तेज, महत्वाकांक्षी, क्रोधी" : "Sharp, ambitious, irritable", type: "pitta" },
                { text: langHindi ? "शांत, धीमा, स्नेही" : "Calm, slow, affectionate", type: "kapha" }
            ]
        }
    ];

    const handleAnswer = (type) => {
        const newScores = { ...scores, [type]: scores[type] + 1 };
        setScores(newScores);

        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateResult(newScores);
        }
    };

    const calculateResult = (finalScores) => {
        const { vata, pitta, kapha } = finalScores;
        let result = "vata";
        // Simple logic: whichever is max. 
        if (pitta >= vata && pitta >= kapha) result = "pitta";
        if (kapha >= vata && kapha >= pitta) result = "kapha";
        if (vata >= pitta && vata >= kapha) result = "vata"; // re-check vata priority if tie

        setDominantDosha(result);
        setShowResult(true);
    };

    const resultsData = {
        vata: {
            title: langHindi ? "वात प्रकृति (वायु + आकाश)" : "Vata Dosha (Air + Space)",
            desc: langHindi ? "आपका शरीर हल्का और ऊर्जावान है, लेकिन आप जल्दी थक सकते हैं। आपको नियमितता और गर्माहट की जरूरत है।" : "You have a light, energetic build but tire easily. You benefit from routine, warmth, and grounding foods.",
            diet: langHindi ? "गर्म, तैलीय भोजन, सूप, खिचड़ी, घी, नट्स।" : "Warm, oily, cooked foods. Soups, khichdi, ghee, nuts, warm milk.",
            avoid: langHindi ? "ठंडा, सूखा भोजन, सलाद, बहुत ज्यादा बीन्स।" : "Cold, dry, raw foods. Salads, carbonated drinks, excess beans.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        pitta: {
            title: langHindi ? "पित्त प्रकृति (अग्नि + जल)" : "Pitta Dosha (Fire + Water)",
            desc: langHindi ? "आपकी पाचन शक्ति तेज है और शरीर मध्यम है। आपको शीतलता, शांति और मध्यम व्यायाम की आवश्यकता है।" : "You have a medium build and strong digestion. You benefit from cooling foods, moderation, and relaxation.",
            diet: langHindi ? "मीठा, कड़वा, कसैला भोजन। ठंडा दूध, चावल, घी।" : "Sweet, bitter, astringent tastes. Cool milk, rice, ghee, sweet fruits.",
            avoid: langHindi ? "तीखा, खट्टा, नमकीन, तला हुआ, मसालेदार।" : "Spicy, sour, salty, deep-fried foods. Chili, alcohol, fermented food.",
            color: "text-orange-400",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        kapha: {
            title: langHindi ? "कफ प्रकृति (पृथ्वी + जल)" : "Kapha Dosha (Earth + Water)",
            desc: langHindi ? "आपका शरीर मजबूत और स्थिर है। आपको सक्रियता, उत्तेजना और हल्के, सूखे भोजन की जरूरत है।" : "You have a solid, sturdy build and calm nature. You benefit from stimulation, exercise, and light, dry foods.",
            diet: langHindi ? "तीखा, कड़वा, कसैला। गर्म पानी, शहद, अदरक।" : "Pungent, bitter, astringent foods. Warm water, honey, ginger, veggies.",
            avoid: langHindi ? "मीठा, खट्टा, नमकीन, डेयरी, ठंडा भोजन।" : "Sweet, sour, salty, dairy, heavy oily foods, cold drinks.",
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div onClick={onClose} className="absolute inset-0 bg-[#1a0f00]/90 backdrop-blur-xl"></div>
            <div className="w-full max-w-2xl bg-[#2a1a0a] border border-amber-500/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col p-8">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10">
                    <BsX className="text-3xl" />
                </button>

                {!showResult ? (
                    <>
                        <div className="mb-8 relative z-10">
                            <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px]">
                                {langHindi ? `प्रश्न ${currentStep + 1}/${questions.length}` : `Question ${currentStep + 1}/${questions.length}`}
                            </span>
                            <div className="w-full h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center relative z-10">
                            {questions[currentStep].text}
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {questions[currentStep].options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt.type)}
                                    className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-amber-500/20 hover:border-amber-500/50 hover:scale-[1.02] transition-all text-left group flex items-center justify-between"
                                >
                                    <span className="text-white/80 font-medium group-hover:text-white">{opt.text}</span>
                                    <BsArrowRight className="text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-fade-in relative z-10">
                        <span className="text-amber-500 font-black uppercase tracking-[0.2em] text-xs mb-4 block">
                            {langHindi ? 'आपका परिणाम' : 'Your Result'}
                        </span>
                        <h2 className={`text-4xl md:text-5xl font-black mb-6 ${resultsData[dominantDosha].color}`}>
                            {resultsData[dominantDosha].title}
                        </h2>
                        <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
                            {resultsData[dominantDosha].desc}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            <div className={`p-6 rounded-2xl ${resultsData[dominantDosha].bg} ${resultsData[dominantDosha].border} border`}>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                                    {langHindi ? 'क्या खाएं' : 'Diet to Favor'}
                                </h4>
                                <p className="text-white font-medium text-sm">{resultsData[dominantDosha].diet}</p>
                            </div>
                            <div className={`p-6 rounded-2xl bg-red-500/5 border border-red-500/10`}>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400/50 mb-2">
                                    {langHindi ? 'सावधानी (परहेज)' : 'Diet to Avoid'}
                                </h4>
                                <p className="text-white font-medium text-sm">{resultsData[dominantDosha].avoid}</p>
                            </div>
                        </div>

                        <button onClick={onClose} className="mt-8 px-8 py-3 bg-amber-600 hover:bg-amber-500 rounded-full text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg">
                            {langHindi ? 'समाप्त' : 'Finish Analysis'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrakritiQuiz;

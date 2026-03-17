const glossaryTerms = [
  {
    term: 'अर्जुन',
    term_transliterated: 'Arjuna',
    definition: {
      hi: 'पांडवों में तीसरे भाई, महाभारत के मुख्य योद्धा। श्रीकृष्ण के प्रिय शिष्य जिन्हें गीता का उपदेश दिया गया।',
      en: 'The third Pandava brother, the main warrior of the Mahabharata. The beloved disciple of Sri Krishna to whom the Gita was taught.',
    },
    related_paaths: [1, 2, 3],
    related_terms: ['श्रीकृष्ण', 'महाभारत', 'विषाद'],
  },
  {
    term: 'श्रीकृष्ण',
    term_transliterated: 'Sri Krishna',
    definition: {
      hi: 'भगवान विष्णु के आठवें अवतार। महाभारत में अर्जुन के सारथी और गीता के उपदेशक।',
      en: 'The eighth avatar of Lord Vishnu. The charioteer of Arjuna in the Mahabharata and the teacher of the Gita.',
    },
    related_paaths: [1, 2, 3, 4],
    related_terms: ['अर्जुन', 'भगवद्गीता', 'योग'],
  },
  {
    term: 'योग',
    term_transliterated: 'Yoga',
    definition: {
      hi: 'जोड़ना या मिलाना। आत्मा और परमात्मा के मिलन का मार्ग। गीता में चार प्रमुख योग बताए गए हैं — ज्ञान, कर्म, भक्ति और राजयोग।',
      en: 'To unite or join. The path to union of the individual soul with the Supreme. The Gita describes four main yogas — Jnana, Karma, Bhakti, and Raja.',
    },
    related_paaths: [5, 6, 7, 8],
    related_terms: ['कर्मयोग', 'ज्ञानयोग', 'भक्तियोग', 'ध्यान'],
  },
  {
    term: 'कर्म',
    term_transliterated: 'Karma',
    definition: {
      hi: 'कर्म अर्थात् क्रिया या कार्य। हर कर्म का फल होता है। गीता में निष्काम कर्म — फल की आसक्ति बिना काम करना — सिखाया गया है।',
      en: 'Action or deed. Every action has a consequence. The Gita teaches Nishkama Karma — acting without attachment to the fruits of action.',
    },
    related_paaths: [5, 6, 9, 10],
    related_terms: ['कर्मयोग', 'निष्काम कर्म', 'फल'],
  },
  {
    term: 'धर्म',
    term_transliterated: 'Dharma',
    definition: {
      hi: 'कर्तव्य, नैतिकता और सही आचरण। प्रत्येक व्यक्ति का अपना स्वधर्म होता है जो उसकी प्रकृति और स्थिति के अनुसार होता है।',
      en: 'Duty, righteousness, and right conduct. Each person has their own Svadharma (personal duty) according to their nature and position.',
    },
    related_paaths: [1, 2, 15],
    related_terms: ['स्वधर्म', 'कर्म', 'अर्जुन'],
  },
  {
    term: 'आत्मा',
    term_transliterated: 'Atma',
    definition: {
      hi: 'जीवात्मा — व्यक्तिगत आत्मा जो शरीर में निवास करती है। यह अजर, अमर और अविनाशी है।',
      en: 'The individual soul that dwells in the body. It is eternal, undying, and indestructible.',
    },
    related_paaths: [3, 4, 11, 12],
    related_terms: ['परमात्मा', 'शरीर', 'मोक्ष', 'पुनर्जन्म'],
  },
  {
    term: 'परमात्मा',
    term_transliterated: 'Paramatma',
    definition: {
      hi: 'सर्वोच्च आत्मा — ईश्वर। जीवात्मा का मूल स्रोत और परम लक्ष्य।',
      en: 'The Supreme Soul — God. The original source and ultimate goal of the individual soul.',
    },
    related_paaths: [11, 12, 13],
    related_terms: ['आत्मा', 'ब्रह्म', 'ईश्वर'],
  },
  {
    term: 'मोक्ष',
    term_transliterated: 'Moksha',
    definition: {
      hi: 'मुक्ति — जन्म-मृत्यु के चक्र से स्वतंत्रता। परमात्मा में आत्मा का विलय।',
      en: 'Liberation — freedom from the cycle of birth and death. The merging of the individual soul with the Supreme.',
    },
    related_paaths: [27, 28, 29, 30],
    related_terms: ['आत्मा', 'पुनर्जन्म', 'ज्ञान'],
  },
  {
    term: 'विषाद',
    term_transliterated: 'Vishada',
    definition: {
      hi: 'गहरी उदासी, दुःख या मानसिक पराजय। गीता का प्रथम अध्याय "अर्जुनविषादयोग" अर्जुन की इसी दशा का वर्णन करता है।',
      en: 'Deep sorrow, grief, or mental despair. The first chapter of the Gita, "Arjuna Vishada Yoga," describes this state of Arjuna.',
    },
    related_paaths: [1, 2],
    related_terms: ['अर्जुन', 'युद्ध', 'मोह'],
  },
  {
    term: 'मोह',
    term_transliterated: 'Moha',
    definition: {
      hi: 'भ्रम, आसक्ति या मोहजाल। यह ज्ञान को ढक देता है और सही निर्णय लेने में बाधा डालता है।',
      en: 'Delusion, attachment, or infatuation. It covers wisdom and obstructs right decision-making.',
    },
    related_paaths: [1, 2, 16],
    related_terms: ['अज्ञान', 'माया', 'विवेक'],
  },
  {
    term: 'अहंकार',
    term_transliterated: 'Ahankara',
    definition: {
      hi: '"मैं" की भावना — अहंकार। स्वयं को शरीर और मन मानना। यह सबसे बड़ी बाधा है आत्म-साक्षात्कार में।',
      en: 'The sense of "I" — ego. Identifying the self with the body and mind. This is the greatest obstacle to self-realization.',
    },
    related_paaths: [14, 15, 16],
    related_terms: ['मैं', 'ज्ञान', 'विनम्रता'],
  },
  {
    term: 'गुण',
    term_transliterated: 'Guna',
    definition: {
      hi: 'प्रकृति के तीन मूल गुण — सत्त्व (शुद्धता, ज्ञान), रजस (क्रियाशीलता, इच्छा), तमस (जड़ता, अज्ञान)। ये सभी प्राणियों के स्वभाव को नियंत्रित करते हैं।',
      en: 'The three fundamental qualities of nature — Sattva (purity, knowledge), Rajas (activity, desire), Tamas (inertia, ignorance). These govern the nature of all beings.',
    },
    related_paaths: [17, 18, 19],
    related_terms: ['सत्त्व', 'रजस', 'तमस', 'प्रकृति'],
  },
  {
    term: 'सत्त्व',
    term_transliterated: 'Sattva',
    definition: {
      hi: 'प्रकृति का पहला गुण — शुद्धता, प्रकाश, और ज्ञान। सात्त्विक व्यक्ति शांत, विवेकशील और निःस्वार्थ होता है।',
      en: 'The first quality of nature — purity, light, and knowledge. A sattvic person is calm, discerning, and selfless.',
    },
    related_paaths: [17, 18],
    related_terms: ['गुण', 'रजस', 'तमस'],
  },
  {
    term: 'रजस',
    term_transliterated: 'Rajas',
    definition: {
      hi: 'प्रकृति का दूसरा गुण — क्रियाशीलता, इच्छा और महत्त्वाकांक्षा। राजसिक व्यक्ति फल की कामना से कर्म करता है।',
      en: 'The second quality of nature — activity, desire, and ambition. A rajasic person acts with desire for results.',
    },
    related_paaths: [17, 18],
    related_terms: ['गुण', 'सत्त्व', 'तमस'],
  },
  {
    term: 'तमस',
    term_transliterated: 'Tamas',
    definition: {
      hi: 'प्रकृति का तीसरा गुण — जड़ता, आलस्य, और अज्ञान। तामसिक व्यक्ति निष्क्रिय, भ्रमित और अज्ञानी होता है।',
      en: 'The third quality of nature — inertia, laziness, and ignorance. A tamasic person is inactive, confused, and ignorant.',
    },
    related_paaths: [17, 18],
    related_terms: ['गुण', 'सत्त्व', 'रजस'],
  },
  {
    term: 'निष्काम कर्म',
    term_transliterated: 'Nishkama Karma',
    definition: {
      hi: 'फल की आसक्ति बिना कर्म करना। गीता का मुख्य उपदेश — "कर्म करो, फल की चिंता मत करो।"',
      en: 'Acting without attachment to the fruits of action. The core teaching of the Gita — "Do your duty, do not worry about the results."',
    },
    related_paaths: [5, 6, 9],
    related_terms: ['कर्म', 'कर्मयोग', 'आसक्ति'],
  },
  {
    term: 'ध्यान',
    term_transliterated: 'Dhyana',
    definition: {
      hi: 'मन की एकाग्रता और चिंतन। गीता में ध्यान को आत्म-साक्षात्कार का महत्वपूर्ण साधन बताया गया है।',
      en: 'Concentration and meditation of the mind. The Gita describes dhyana as an important means of self-realization.',
    },
    related_paaths: [20, 21, 22],
    related_terms: ['योग', 'समाधि', 'एकाग्रता'],
  },
  {
    term: 'भक्ति',
    term_transliterated: 'Bhakti',
    definition: {
      hi: 'ईश्वर के प्रति श्रद्धा, प्रेम और समर्पण। गीता का बारहवाँ अध्याय भक्तियोग को सर्वश्रेष्ठ मार्ग बताता है।',
      en: 'Faith, love, and devotion toward God. The twelfth chapter of the Gita describes Bhakti Yoga as the highest path.',
    },
    related_paaths: [23, 24, 25],
    related_terms: ['भक्तियोग', 'श्रद्धा', 'समर्पण'],
  },
  {
    term: 'ज्ञान',
    term_transliterated: 'Jnana',
    definition: {
      hi: 'सच्चा ज्ञान — आत्मा, परमात्मा और प्रकृति की समझ। ज्ञान से अज्ञान का अंधकार दूर होता है।',
      en: 'True knowledge — understanding of the soul, the Supreme, and nature. Knowledge dispels the darkness of ignorance.',
    },
    related_paaths: [11, 12, 13],
    related_terms: ['ज्ञानयोग', 'विवेक', 'अज्ञान'],
  },
  {
    term: 'प्रकृति',
    term_transliterated: 'Prakriti',
    definition: {
      hi: 'प्रकृति — भौतिक जगत, शरीर और मन। यह तीन गुणों (सत्त्व, रजस, तमस) से बनी है। आत्मा प्रकृति से अलग है।',
      en: 'Nature — the material world, body, and mind. It is composed of the three gunas (Sattva, Rajas, Tamas). The soul is distinct from Prakriti.',
    },
    related_paaths: [17, 18, 19],
    related_terms: ['पुरुष', 'गुण', 'माया'],
  },
  {
    term: 'माया',
    term_transliterated: 'Maya',
    definition: {
      hi: 'ईश्वर की शक्ति जो इस भौतिक संसार को वास्तविक प्रतीत कराती है। माया से मुक्ति ही मोक्ष है।',
      en: 'The divine power of God that makes this material world appear real. Liberation from Maya is Moksha.',
    },
    related_paaths: [16, 17],
    related_terms: ['मोह', 'अज्ञान', 'मोक्ष'],
  },
  {
    term: 'समत्व',
    term_transliterated: 'Samatva',
    definition: {
      hi: 'समानता — सुख-दुख, लाभ-हानि, जय-पराजय में एक समान मनोदशा बनाए रखना।',
      en: 'Equanimity — maintaining an even state of mind in pleasure and pain, gain and loss, victory and defeat.',
    },
    related_paaths: [8, 9, 10],
    related_terms: ['योग', 'स्थितप्रज्ञ', 'वैराग्य'],
  },
  {
    term: 'स्थितप्रज्ञ',
    term_transliterated: 'Sthitaprajna',
    definition: {
      hi: 'स्थिर बुद्धि वाला व्यक्ति। जो सुख में प्रसन्न नहीं होता, दुःख में दुखी नहीं होता, और आसक्ति, भय, क्रोध से मुक्त है।',
      en: 'A person of steady wisdom. One who is not elated in happiness, not distressed in sorrow, and is free from attachment, fear, and anger.',
    },
    related_paaths: [8, 9],
    related_terms: ['समत्व', 'ज्ञान', 'वैराग्य'],
  },
  {
    term: 'वैराग्य',
    term_transliterated: 'Vairagya',
    definition: {
      hi: 'विषयों से वैराग्य — सांसारिक सुखों से उदासीनता। यह आत्म-साक्षात्कार के मार्ग पर आवश्यक गुण है।',
      en: 'Dispassion — detachment from worldly pleasures. This is an essential quality on the path to self-realization.',
    },
    related_paaths: [26, 27],
    related_terms: ['त्याग', 'विवेक', 'मोक्ष'],
  },
  {
    term: 'श्रद्धा',
    term_transliterated: 'Shraddha',
    definition: {
      hi: 'आस्था और विश्वास। गीता में श्रद्धा को भक्ति और ज्ञान का आधार बताया गया है। "श्रद्धावान् लभते ज्ञानम्।"',
      en: 'Faith and trust. The Gita describes Shraddha as the foundation of devotion and knowledge. "The faithful one attains knowledge."',
    },
    related_paaths: [23, 24],
    related_terms: ['भक्ति', 'विश्वास', 'ज्ञान'],
  },
  {
    term: 'त्याग',
    term_transliterated: 'Tyaga',
    definition: {
      hi: 'त्याग — फल की आसक्ति और अहंकार का छोड़ना। सच्चा त्याग बाहरी क्रियाओं का नहीं, भीतरी आसक्ति का है।',
      en: 'Renunciation — giving up attachment to results and ego. True Tyaga is not the abandonment of external actions but of inner attachment.',
    },
    related_paaths: [28, 29, 30],
    related_terms: ['वैराग्य', 'सन्यास', 'निष्काम कर्म'],
  },
  {
    term: 'सन्यास',
    term_transliterated: 'Sanyasa',
    definition: {
      hi: 'सभी कामनाओं का त्याग और कर्मफल का ईश्वर को समर्पण। गीता में सन्यास और त्याग में अंतर स्पष्ट किया गया है।',
      en: 'The renunciation of all desires and the dedication of the fruits of action to God. The Gita clarifies the difference between Sanyasa and Tyaga.',
    },
    related_paaths: [28, 29],
    related_terms: ['त्याग', 'वैराग्य', 'मोक्ष'],
  },
  {
    term: 'पुनर्जन्म',
    term_transliterated: 'Punarjanma',
    definition: {
      hi: 'पुनः जन्म लेना। जब तक आत्मा मोक्ष नहीं प्राप्त करती, वह शरीर बदलती रहती है जैसे मनुष्य पुराने वस्त्र बदलता है।',
      en: 'Rebirth. Until the soul attains liberation, it keeps changing bodies just as a person changes old clothes.',
    },
    related_paaths: [3, 4],
    related_terms: ['आत्मा', 'मोक्ष', 'कर्म'],
  },
  {
    term: 'कुरुक्षेत्र',
    term_transliterated: 'Kurukshetra',
    definition: {
      hi: 'वह युद्धभूमि जहाँ महाभारत का युद्ध हुआ और जहाँ श्रीकृष्ण ने अर्जुन को गीता का उपदेश दिया। यह भीतरी संघर्ष का भी प्रतीक है।',
      en: 'The battlefield where the Mahabharata war took place and where Sri Krishna taught the Gita to Arjuna. It also symbolizes the inner conflict within us.',
    },
    related_paaths: [1, 2],
    related_terms: ['अर्जुन', 'श्रीकृष्ण', 'महाभारत'],
  },
  {
    term: 'विवेक',
    term_transliterated: 'Viveka',
    definition: {
      hi: 'भेद करने की शक्ति — सत्य-असत्य, नित्य-अनित्य, आत्मा-शरीर में अंतर जानना। विवेक ज्ञान का द्वार है।',
      en: 'Discriminative wisdom — knowing the difference between truth and untruth, eternal and transient, soul and body. Viveka is the gateway to knowledge.',
    },
    related_paaths: [13, 14],
    related_terms: ['ज्ञान', 'वैराग्य', 'बुद्धि'],
  },
  {
    term: 'बुद्धि',
    term_transliterated: 'Buddhi',
    definition: {
      hi: 'बुद्धि — निर्णय लेने और विवेक करने की शक्ति। गीता में बुद्धियोग — बुद्धि को ईश्वर के प्रति समर्पित करने — की बात की गई है।',
      en: 'Intellect — the power of judgment and discrimination. The Gita speaks of Buddhi Yoga — dedicating the intellect to God.',
    },
    related_paaths: [7, 8],
    related_terms: ['मन', 'विवेक', 'ज्ञान'],
  },
];

module.exports = glossaryTerms;

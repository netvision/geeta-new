/**
 * restore-chapters.js
 * Restores exact chapters + contentblocks from local DB snapshot to remote.
 * Usage: node data/seed/restore-chapters.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose  = require('mongoose');
const connectDB = require('../../src/config/db');

const Chapter      = require('../../src/models/Chapter.model');
const ContentBlock = require('../../src/models/ContentBlock.model');

const { ObjectId } = mongoose.Types;

const chapters = [
  {
    _id: new ObjectId('69b814453347b7690679df13'),
    number: 1,
    title: { hi: 'मोह', en: 'Attachment / Delusion' },
    summary: {
      hi: 'अर्जुन की मोह-ग्रस्त अवस्था का विवरण और उसके मूल कारण की पहचान।',
      en: "Description of Arjuna's state of delusion and identification of its root cause.",
    },
    order: 1, is_published: true, published_at: new Date('2026-03-16T14:31:33.478Z'),
  },
  {
    _id: new ObjectId('69b814453347b7690679df2b'),
    number: 2,
    title: { hi: 'परिस्थिति का स्वरूप एवं प्रभाव', en: 'Nature and Effect of Circumstances' },
    summary: {
      hi: 'परिस्थिति अनित्य है; सुख-दुःख परिस्थिति में नहीं, हमारी इच्छाओं में है।',
      en: 'Circumstances are transient; happiness and sorrow lie not in circumstances but in our desires.',
    },
    order: 2, is_published: true, published_at: new Date('2026-03-16T14:31:33.478Z'),
  },
  {
    _id: new ObjectId('69b814453347b7690679df3d'),
    number: 3,
    title: { hi: 'नित्य/अनित्य का भेद', en: 'Distinction between Eternal and Temporal' },
    summary: {
      hi: 'जो "है" वह बदलता नहीं और जो बदलता है वह "है" नहीं — तत्त्वज्ञान का मूल।',
      en: 'That which IS does not change; that which changes, IS not — the core of Self-knowledge.',
    },
    order: 3, is_published: true, published_at: new Date('2026-03-16T14:31:33.478Z'),
  },
  {
    _id: new ObjectId('69b814453347b7690679df47'),
    number: 4,
    title: { hi: 'उद्देश्य परिवर्तन', en: 'Change of Purpose' },
    summary: {
      hi: 'समता प्राप्त करने के लिए उद्देश्य को इच्छापूर्ति से हटाकर समता की ओर परिवर्तित करना।',
      en: 'Shifting the purpose from fulfilling desires to attaining equanimity.',
    },
    order: 4, is_published: true, published_at: new Date('2026-03-16T14:31:33.478Z'),
  },
  {
    _id: new ObjectId('69b814453347b7690679df51'),
    number: 5,
    title: { hi: 'करने योग्य', en: 'What is Worth Doing' },
    summary: {
      hi: 'कर्मयोग — केवल कर्म में अधिकार है, फल में नहीं। अपने संकल्प का त्याग और दूसरे के संकल्प की पूर्ति।',
      en: 'Karma Yoga — rights lie only in action, not in results. Renounce self-will; serve others.',
    },
    order: 5, is_published: true, published_at: new Date('2026-03-16T14:31:33.478Z'),
  },
];

const contentBlocks = [
  // ── Chapter 1 ────────────────────────────────────────────────────────────────
  {
    _id: new ObjectId('69b814453347b7690679df15'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'shloka_group', order: 1,
    section_title: { hi: 'संबंध और सिद्धान्त का विश्लेषण (श्लोक ३–८)', en: 'Analysis of Relation and Principle (Verses 3–8)' },
    title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['1.3','1.4','1.5','1.6','1.7','1.8'],
      sanskrit_verses: [
        { verse: 'पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्।\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥', ref: '1.3', order: 1 },
        { verse: 'अत्र शूरा महेष्वासा भीमार्जुनसमा युधि।\nयुयुधानो विराट द्रुपदश्च महारथः॥', ref: '1.4', order: 2 },
        { verse: 'धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान्।\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुंगवः॥', ref: '1.5', order: 3 },
        { verse: 'युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान्।\nसौभद्रो द्रौपदेयाश्च सर्व एव महारथाः॥', ref: '1.6', order: 4 },
        { verse: 'अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम।\nनायका मम सैन्यस्य संज्ञार्थं तान्ब्रवीमि ते॥', ref: '1.7', order: 5 },
        { verse: 'भवान्भीष्मश्च कर्णश्च कृपश्च समितिंजयः।\nअश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च॥', ref: '1.8', order: 6 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df17'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'prasang', order: 2,
    section_title: { hi: '', en: '' }, title: { hi: 'प्रसंग', en: 'Context' },
    content: { hi: 'दुर्योधन गुरु द्रोणाचार्य के पास जाकर युद्धभूमि में दोनों पक्षों के योद्धाओं का विवरण देते हैं। क्या द्रोणाचार्य को विपक्ष में खड़े योद्धा नहीं दिख रहे थे? क्‍या वह उनके बल से परिचित नहीं थे? वह यह दिखाता है कि वह जानता है, उसके विपक्ष में कितने बलशाली और आत्मीय लोग हैं और वह यह भी जानता है कि अर्जुन गुरू द्रोणाचार्य का सबसे प्रिय शिष्य है और द्रोणाचार्य ने पहले ही कह दिया था कि वह पाण्डवों को नहीं मारेंगे।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df19'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'tatparya', order: 3,
    section_title: { hi: '', en: '' }, title: { hi: 'तात्पर्य', en: 'Key Insight' },
    content: { hi: 'जीवन में हर परिस्थिति में दो पक्ष होंगे — एक अनुकूल, दूसरा प्रतिकूल। कभी-कभी विपक्ष में आपके अपने प्रिय से प्रिय लोग भी हो सकते हैं और आपको यह निर्णय लेना पड़ेगा कि आप सिद्धान्त को महत्व देकर उनके विरुद्ध खड़े होंगे अथवा सम्बन्ध को महत्व देकर उसके विरुद्ध कोई कदम नहीं उठाएंगे।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df1b'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'discussion', order: 4,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'आप अगर इस परिस्थिति में होंगे, तो आपका क्या निर्णय होगा?', en: 'If you were in this situation, what would your decision be?', order: 1 },
        { hi: 'अपने जीवन की किसी घटना का वर्णन करिएगा, जब आप इस द्वन्द्व में फंसे हों?', en: 'Describe an incident from your life when you were caught in this dilemma.', order: 2 },
      ],
      source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df1d'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'shloka_group', order: 5,
    section_title: { hi: 'मनुष्य की चिन्ता और शोक का कारण (श्लोक २२–२५)', en: 'Cause of Human Worry and Grief (Verses 22–25)' },
    title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['1.22','1.23','1.24','1.25'],
      sanskrit_verses: [
        { verse: 'यावदेतान्निरीक्षेऽहं योद्धुकामानवस्थितान्।\nकैर्मया सह योद्धव्यमस्मिन् रणसमुद्यमे॥', ref: '1.22', order: 1 },
        { verse: 'योत्स्यमानानवेक्षेऽहं ये एतेऽत्र समागताः।\nधार्तराष्ट्रस्य दुर्बुद्धेर्युद्धे प्रियचिकीर्षवः॥', ref: '1.23', order: 2 },
        { verse: 'एवमुक्तो हृषीकेशो गुडाकेशेन भारत।\nसेनयोरुभयोर्मध्ये स्थापयित्वा रथोत्तमम्॥', ref: '1.24', order: 3 },
        { verse: 'भीष्मद्रोणप्रमुखतः सर्वेषां च महीक्षिताम्।\nउवाच पार्थ पश्यैतान्समवेतान्कुरूनिति॥', ref: '1.25', order: 4 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df1f'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'prasang', order: 6,
    section_title: { hi: '', en: '' }, title: { hi: 'प्रसंग', en: 'Context' },
    content: { hi: 'अर्जुन ने श्रीकृष्ण से कहा — "मेरा रथ ऐसे स्थान पर ले चलो जहां से मैं युद्ध में उपस्थित विपक्ष को देख सकूं।" श्रीकृष्ण ने जानबूझ कर रथ ऐसे स्थान पर खड़ा किया जहां से अर्जुन को सब — विपक्ष और अपने पक्ष के भी — दिखें। युद्ध में कोई सामान्य प्रतियोगिता नहीं होती, विजय या वीरगति, यही परिणाम होता है। सभी के मृत्यु की संभावना जानकर अर्जुन का मन शोक से भर गया।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df21'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'explanation', order: 7,
    section_title: { hi: '', en: '' }, title: { hi: 'मनुष्य के जीवन में चिन्ता और शोक का मुख्य कारण', en: 'The Primary Cause of Anxiety and Grief' },
    content: { hi: '"जो नहीं है वह मिल जाए और जो है उसका नाश न हो" — अथवा पाने की इच्छा और छूटने का भय — दोनों में ही मूल कारण "चाह" ही है। अर्जुन की भी यही स्थिति थी — वह राज्य चाहता था लेकिन कुटुम्ब का नाश भी नहीं चाहता था।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df23'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'discussion', order: 8,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'क्‍या आपके जीवन में चिन्ता अथवा शोक है? आपके दृष्टिकोण में इसका मूल कारण क्या है?', en: 'Do you have anxiety or grief in your life? In your view, what is its root cause?', order: 1 },
        { hi: 'क्‍या आप शोक या चिन्ता से मुक्त होकर अभय अथवा शान्त होना चाहेंगे?', en: 'Would you like to be free from grief or anxiety and become fearless and peaceful?', order: 2 },
      ],
      source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df25'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'shloka_group', order: 9,
    section_title: { hi: 'निर्णय और संदेह (श्लोक ३८–४४)', en: 'Decision and Doubt (Verses 38–44)' },
    title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['1.38','1.39','1.40','1.41','1.42','1.43','1.44'],
      sanskrit_verses: [
        { verse: 'यद्यप्येते न पश्यन्ति लोभोपहतचेतसः।\nकुलक्षयकृतं दोषं मित्रद्रोहे च पातकम्॥', ref: '1.38', order: 1 },
        { verse: 'कथं न ज्ञेयमस्माभिः पापादस्मान्निवर्तितुम्।\nकुलक्षयकृतं दोषं प्रपश्यद्भिर्जनार्दन॥', ref: '1.39', order: 2 },
        { verse: 'कुलक्षये प्रणश्यन्ति कुलधर्माः सनातनाः।\nधर्मे नष्टे कुलं कृत्स्नमधर्मोऽभिभवत्युत॥', ref: '1.40', order: 3 },
        { verse: 'अधर्माभिभवात्कृष्ण प्रदुष्यन्ति कुलस्त्रियः।\nस्त्रीषु दुष्टासु वार्ष्णेय जायते वर्णसङ्करः॥', ref: '1.41', order: 4 },
        { verse: 'सङ्करो नरकायैव कुलघ्नानां कुलस्य च।\nपतन्ति पितरो ह्येषां लुप्तपिण्डोदकक्रियाः॥', ref: '1.42', order: 5 },
        { verse: 'दोषैरेतैः कुलघ्नानां वर्णसङ्करकारकैः।\nउत्साद्यन्ते जातिधर्माः कुलधर्माश्च शाश्वताः॥', ref: '1.43', order: 6 },
        { verse: 'उत्सन्नकुलधर्माणां मनुष्याणां जनार्दन।\nनरकेऽनियतं वासो भवतीत्यनुशुश्रुम॥', ref: '1.44', order: 7 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df27'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'prasang', order: 10,
    section_title: { hi: '', en: '' }, title: { hi: 'प्रसंग', en: 'Context' },
    content: { hi: 'अर्जुन युद्ध न करने के निर्णय को लेकर तर्क करने लगा। जब कोई व्यक्ति अपने निर्णय को लेकर संदेह में होता है, तो वह बार-बार तर्क देकर उसे सही साबित करने की कोशिश करता है। वह दूसरे से अपने निर्णय का पुष्टीकरण चाहता है इसलिए जो भी निर्णय लें हमेशा सोच समझ कर लें और उस पर अमल करें। जब निर्णय दृढ़ होता है, तो उसे बार-बार सही साबित करने की आवश्यकता नहीं होती।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df29'),
    chapter_id: new ObjectId('69b814453347b7690679df13'),
    type: 'discussion', order: 11,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'क्या आपके जीवन में कभी ऐसी परिस्थिति आई जब आप अपने निर्णय पर संदेह कर रहे थे और उसके पुष्टीकरण के लिए बार-बार उसका औचित्य साबित कर रहे थे?', en: 'Has there ever been a situation in your life when you doubted your decision and kept justifying it to seek confirmation?', order: 1 },
      ],
      source: '', is_parable: false,
    },
  },

  // ── Chapter 2 ────────────────────────────────────────────────────────────────
  {
    _id: new ObjectId('69b814453347b7690679df2d'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'shloka_group', order: 1,
    section_title: { hi: '', en: '' }, title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['2.14','2.15'],
      sanskrit_verses: [
        { verse: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥', ref: '2.14', order: 1 },
        { verse: 'यं हि न व्यथयन्त्येते पुरुषं पुरुषर्षभ।\nसमदुःखसुखं धीरं सोऽमृतत्वाय कल्पते॥', ref: '2.15', order: 2 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df2f'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'explanation', order: 2,
    section_title: { hi: '', en: '' }, title: { hi: 'तीन मुख्य बातें', en: 'Three Key Points' },
    content: { hi: '१. परिस्थिति अथवा अनुकूलता और प्रतिकूलता और उनके प्रभाव से होने वाले सुख-दुःख, दोनों अलग-अलग हैं। परिस्थिति में सुख अथवा दुःख दोनों नहीं हैं।\n२. अनुकूलता का स्वरूप — जो चाहते हैं वह हो जाए और जो न चाहते हैं वह न हो।\n३. प्रतिकूलता का स्वरूप — जो चाहते हैं वह न हो और जो न चाहते हों वह हो जाए।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df31'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'story', order: 3,
    section_title: { hi: '', en: '' }, title: { hi: 'उदाहरण: किसान और कुम्हार', en: 'Example: The Farmer and the Potter' },
    content: { hi: 'एक गांव में दो पड़ोसी थे — एक किसान और दूसरा कुम्हार। किसान ने खेत जोतकर बीज बो दिए थे और वर्षा की प्रार्थना कर रहा था। कुम्हार ने मिट्टी के बर्तन तैयार कर दिए थे और तेज धूप की प्रार्थना कर रहा था। समयानुसार जोर से वर्षा हो गई। किसान तो अत्यन्त खुश हुआ लेकिन कुम्हार अत्यन्त दुखित हो गया। परिस्थिति — वर्षा में — न सुख था न दुःख था। सुखी-दुःखी होने का कारण केवल अपनी व्यक्तिगत इच्छाऐं थीं।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], is_parable: true, source: '' },
  },
  {
    _id: new ObjectId('69b814453347b7690679df33'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'discussion', order: 4,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'आप अगर कुम्हार हैं तो आपके पास दो विकल्प हैं — पहला कि आप अपने दुःख को भूलकर किसान के सुख में शामिल हो जाएं अथवा अपने दुःख को बार-बार याद करके किसान की खुशी से ईर्ष्या करें — आप क्या करेंगे?', en: "If you are the potter, you have two choices — forget your grief and join the farmer's happiness, or keep recalling your grief and envy him. What will you do?", order: 1 },
        { hi: 'परिस्थिति से प्रभावित न होकर उन्हें सहन करो क्योंकि वह नित्य नहीं हैं — आने-जाने वाली हैं। यह आपको अनुभव है कि कोई भी परिस्थिति आने से पहले नहीं थीं और जाने के बाद रहती नहीं हैं।', en: 'Bear circumstances without being affected by them, because they are not permanent. Have you experienced that no circumstance existed before it came and remains after it passes?', order: 2 },
        { hi: 'आपको कोई भी ऐसी चीज (व्यक्ति/पदार्थ/परिस्थिति) प्राप्त है जो हमेशा आपके साथ रहेगी?', en: 'Is there anything (person/object/circumstance) in your life that will always remain with you?', order: 3 },
      ],
      source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df35'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'story', order: 5,
    section_title: { hi: '', en: '' }, title: { hi: 'उदाहरण: "यह भी चला जाएगा"', en: 'Example: "This Too Shall Pass"' },
    content: { hi: 'बहुत समय पहले की बात है। एक राज्य में एक ज्ञानी और न्यायप्रिय राजा राज करता था। वह अपने राजदरबार में आए दिन बड़े-बड़े विद्वानों और संतों से जीवन के रहस्यों पर चर्चा करता रहता था। एक दिन राजा ने अपने मंत्रियों और दरबारियों से कहा, "मैं ऐसा एक वाक्य चाहता हूं, जो मुझे दुःख में सांत्वना दे और सुख में संयम सिखाए।" कुछ समय बाद एक वृद्ध संत राज्य में आए। राजा ने उनसे भी यही प्रश्न पूछा। संत मुस्कुराए और बोले, "राजन्‌! एक ही वाक्य है जो हर परिस्थिति में सही बैठता है — \'यह भी चला जाएगा।\'" राजा ने उस वाक्य को एक अंगूठी पर खुदवाया। जब राज्य में अकाल पड़ा, उसने अंगूठी देखी — शान्ति मिली। जब खूब सुख-शांति आई — अंगूठी ने याद दिलाया — "यह भी चला जाएगा।" — अहंकार न हुआ।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], is_parable: true, source: '' },
  },
  {
    _id: new ObjectId('69b814453347b7690679df37'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'explanation', order: 6,
    section_title: { hi: '', en: '' }, title: { hi: 'समता ही अमृत है', en: 'Equanimity is Immortality' },
    content: { hi: 'जो इनको सहन करने में सक्षम होता है वह मोक्ष — अमृततत्व — के योग्य होता है। समता ही अमृततत्व है। समता वह स्थिति है जहां पर न कूछ पाने की इच्छा रहती है और न कुछ खोने का भय। प्रश्न ये उठता है क्या ये संभव है? बिल्कुल संभव है — एक शर्त — "अचाह" होना पड़ेगा।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df39'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'story', order: 7,
    section_title: { hi: '', en: '' }, title: { hi: 'उदाहरण: अमृत तत्व की खोज', en: 'Example: The Search for Immortality' },
    content: { hi: 'एक समय की बात है। एक युवक साधक मोक्ष की खोज में अनेक गुरूओं के पास गया। हर किसी से एक ही प्रश्न पूछता — "गुरुदेव, अमृत तत्व कहां है?" आखिरकार वह एक शांत पर्वत पर रहने वाले मौन साधु के पास पहुंचा। साधु ने उसे दो चिट्ठियां दीं — एक पर राजा का सम्मान, दूसरी पर गांव से अपमान। पहले दिन राजसभा में स्वागत हुआ; अगले दिन अपमान कर बाहर निकाला गया। युवक रोते हुए साधु के पास लौटा। साधु ने कहा — "बेटा, अमृत तत्व कोई बाहर की चीज नहीं है। वह तो तेरे भीतर तब प्रकट होती है जब तू इन सब में एक सा रहना सीख जाए — न मान में फूल, न अपमान में टूट। जब तू सुख-दुःख, हार-जीत, लाभ-हानि में समान रह सकेगा — वही समता है और वही अमृत है।"', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], is_parable: true, source: '' },
  },
  {
    _id: new ObjectId('69b814453347b7690679df3b'),
    chapter_id: new ObjectId('69b814453347b7690679df2b'),
    type: 'discussion', order: 8,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'आपके साथ इसी प्रकार की घटना घटे तो आप पर क्या असर पड़ेगा?', en: 'If a similar incident happened to you, what effect would it have on you?', order: 1 },
      ],
      source: '', is_parable: false,
    },
  },

  // ── Chapter 3 ────────────────────────────────────────────────────────────────
  {
    _id: new ObjectId('69b814453347b7690679df3f'),
    chapter_id: new ObjectId('69b814453347b7690679df3d'),
    type: 'shloka_group', order: 1,
    section_title: { hi: '', en: '' }, title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['2.16','2.17'],
      sanskrit_verses: [
        { verse: 'नासतो विद्यते भावो नाभावो विद्यते सतः।\nउभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः॥', ref: '2.16', order: 1 },
        { verse: 'अविनाशि तु तद्विद्धि येन सर्वमिदं ततम्।\nविनाशमव्ययस्यास्य न कश्चित्कर्तुमर्हति॥', ref: '2.17', order: 2 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df41'),
    chapter_id: new ObjectId('69b814453347b7690679df3d'),
    type: 'explanation', order: 2,
    section_title: { hi: '', en: '' }, title: { hi: 'नित्य और अनित्य का विवेक', en: 'Discernment of Eternal and Temporal' },
    content: { hi: 'असत्‌वस्तु की तो सत्ता नहीं है और सत्‌का अभाव नहीं है — अर्थात — जो "है" वह बदलता नहीं और जो बदलता है वह "है" नहीं।\n\nजो "है" तत्व है, जो "होनापन" है वह कभी नष्ट नहीं होता। जो वस्तु बदल रही है, नष्ट हो रही है, उसमें "होनापन" कभी नहीं होता।\n\nसम्पूर्ण दृश्यवर्ग बदलता है — निरंतर बदलता है। लेकिन हम वही हैं जो उस समय थे और इस समय भी हैं — हम नहीं बदले। बदलने वाले को न बदलने वाले से अलग करके देखना ही "ज्ञान" है।\n\nमनुष्य का किसी भी चीज में आकर्षण नहीं हो सकता जब तक उसको वह "है" रूप से स्वीकार न करें।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df43'),
    chapter_id: new ObjectId('69b814453347b7690679df3d'),
    type: 'explanation', order: 3,
    section_title: { hi: '', en: '' }, title: { hi: 'उदाहरण', en: 'Examples' },
    content: { hi: '१. गंगाजी में जल निरन्तर बहता है — कभी स्वच्छ, कभी मैला — उसका स्वरूप एक सा नहीं होता। लेकिन जो नीचे आधारशिला है वह वैसी की वैसी रहती है — उसमें कोई परिवर्तन नहीं होता।\n\n२. बचपन में जवानी और बुढ़ापा नहीं होता; जवानी में बचपन और बुढ़ापा नहीं होता; बुढ़ापे में बचपन और जवानी नहीं होती। लेकिन ऐसा कोई नहीं कहता कि हम तीनों अवस्था में नहीं हैं। तीनों अवस्थाऐं बदल रही हैं और हम तीनों में ही निरन्तर हैं — अर्थात अवस्था के बदलने से हमारे में कोई बदलाव नहीं हुआ।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df45'),
    chapter_id: new ObjectId('69b814453347b7690679df3d'),
    type: 'discussion', order: 4,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'दादी ने कुसुम को एक सूत और कुछ पुष्प दिए, एक माला पिरोने के लिए। क्या सूत और पुष्प एक हैं? क्या पुष्प को सूत से अलग कर सकते हैं? क्या बिना सूत के माला बन सकती है? आप किस निष्कर्ष पर पहुंचे?', en: 'Grandma gave Kusum a thread and flowers to make a garland. Are thread and flowers the same? Can flowers be separated from thread? Can a garland be made without thread? What conclusion did you reach?', order: 1 },
        { hi: 'आज से प्रयास करिए कि "है के प्रकाश में वृक्ष प्रतीत हो रहा है" — अर्थात अब आप महत्व "है" को दे रहे हैं न कि वृक्ष को। हर 30 मिनट में 2 मिनट के लिए यह करने का प्रयास कीजिए।', en: 'From today, practice: "The tree appears in the light of IS." Give importance to IS, not the tree. Try this for 2 minutes every 30 minutes.', order: 2 },
      ],
      source: '', is_parable: false,
    },
  },

  // ── Chapter 4 ────────────────────────────────────────────────────────────────
  {
    _id: new ObjectId('69b814453347b7690679df49'),
    chapter_id: new ObjectId('69b814453347b7690679df47'),
    type: 'shloka_group', order: 1,
    section_title: { hi: '', en: '' }, title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['2.39','2.40','2.41','2.42','2.43','2.44'],
      sanskrit_verses: [
        { verse: 'एषा तेऽभिहिता साङ्ख्ये बुद्धिर्योगे त्विमां शृणु।\nबुद्ध्या युक्तो यया पार्थ कर्मबन्धं प्रहास्यसि॥', ref: '2.39', order: 1 },
        { verse: 'नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते।\nस्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्॥', ref: '2.40', order: 2 },
        { verse: 'व्यवसायात्मिका बुद्धिरेकेह कुरुनन्दन।\nबहुशाखा ह्यनन्ताश्च बुद्धयोऽव्यवसायिनाम्॥', ref: '2.41', order: 3 },
        { verse: 'यामिमां पुष्पितां वाचं प्रवदन्त्यविपश्चितः।\nवेदवादरताः पार्थ नान्यदस्तीति वादिनः॥', ref: '2.42', order: 4 },
        { verse: 'कामात्मानः स्वर्गपरा जन्मकर्मफलप्रदाम्।\nक्रियाविशेषबहुलां भोगैश्वर्यगतिं प्रति॥', ref: '2.43', order: 5 },
        { verse: 'भोगैश्वर्यप्रसक्तानां तयापहृतचेतसाम्।\nव्यवसायात्मिका बुद्धिः समाधौ न विधीयते॥', ref: '2.44', order: 6 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df4b'),
    chapter_id: new ObjectId('69b814453347b7690679df47'),
    type: 'explanation', order: 2,
    section_title: { hi: '', en: '' }, title: { hi: 'उद्देश्य और इच्छा का भेद', en: 'Distinction Between Purpose and Desire' },
    content: { hi: 'वर्तमान में हमारा उद्देश्य केवल इच्छा की पूर्ति है — अर्थात अनुकूलता मिल जाए या प्रतिकूलता न मिले। इच्छाऐं अनेक होती हैं लेकिन उद्देश्य केवल एक ही होता है।\n\nनिश्चयात्मिका बुद्धि से समझाई गई है कि इस मार्ग पर चलने के लिए दृढ़ निश्चय की ज़रूरत है जिसमें उद्देश्य केवल समता प्राप्त करने का हो जाए। इसके लिए आवश्यक है कि मनुष्य अपने आपको साधक स्वीकार करे।\n\nसाधक वह है जिसके जीवन में तनिक भी असाधन न हो।\n\nअसाधन क्या है:\nक) "जाने हुए असत्य का त्याग न करना"\nख) "न करने योग्य कर्म को करना"\nग) "न आश्रय लेने योग्य का आश्रय लेना"', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df4d'),
    chapter_id: new ObjectId('69b814453347b7690679df47'),
    type: 'explanation', order: 3,
    section_title: { hi: '', en: '' }, title: { hi: 'समता का महत्व', en: 'The Importance of Equanimity' },
    content: { hi: 'थोड़ा सा भी त्याग (समता की स्थिति) बड़ी से बड़ी भौतिक उन्नत्ति से ज्यादा महत्त्वपूर्ण है, क्योंकि वह नित्य है — जितनी समता आ गई वह नष्ट नहीं होगी। और बड़ी से बड़ी उपलब्धि भी अगर मनुष्य प्राप्त कर ले तो भी वह रहेगी नहीं — अनित्य है। समता थोड़ी भी पूरी है और बड़ी से बड़ी उपलब्धि पूरी भी अधूरी है।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df4f'),
    chapter_id: new ObjectId('69b814453347b7690679df47'),
    type: 'discussion', order: 4,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'वर्तमान में आपका उद्देश्य क्या है — इच्छा और उद्देश्य में क्या भेद है?', en: 'What is your current purpose — what is the difference between desire and purpose?', order: 1 },
        { hi: 'क्या आप अपने उद्देश्य का परिवर्तन करने को तैयार हैं — क्या इच्छापूर्ति सम्भव है?', en: 'Are you willing to change your purpose — is fulfillment of desires truly possible?', order: 2 },
      ],
      source: '', is_parable: false,
    },
  },

  // ── Chapter 5 ────────────────────────────────────────────────────────────────
  {
    _id: new ObjectId('69b814453347b7690679df53'),
    chapter_id: new ObjectId('69b814453347b7690679df51'),
    type: 'shloka_group', order: 1,
    section_title: { hi: '', en: '' }, title: { hi: '', en: '' }, content: { hi: '', en: '' },
    metadata: {
      shloka_refs: ['2.47','2.48'],
      sanskrit_verses: [
        { verse: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥', ref: '2.47', order: 1 },
        { verse: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥', ref: '2.48', order: 2 },
      ],
      questions: [], source: '', is_parable: false,
    },
  },
  {
    _id: new ObjectId('69b814453347b7690679df55'),
    chapter_id: new ObjectId('69b814453347b7690679df51'),
    type: 'explanation', order: 2,
    section_title: { hi: '', en: '' }, title: { hi: 'कर्मयोग के चार सिद्धान्त', en: 'Four Principles of Karma Yoga' },
    content: { hi: '१. तेरा केवल कर्म करने में ही अधिकार है — अर्थात्‌ करने योग्य कर्म को करना और न करने योग्य कर्म को न करना। इसमें ज्यादा महत्वपूर्ण है "न करने योग्य कर्म को न करना।"\n\n२. तेरा फल पर कोई अधिकार नहीं — अर्थात्‌ फल परिस्थिति (अनुकूलता-प्रतिकूलता) के रूप में ही आता है। परिस्थिति के ऊपर मनुष्य का कोई नियंत्रण नहीं है।\n\n३. तेरे कर्म करने की प्रवृत्ति में हेतु फल न हो — अर्थात परिस्थिति बदलने अथवा बनाए रखने के उद्देश्य से कर्म न करें।\n\n४. तेरी कर्म न करने में भी अनासक्ति न हो — अर्थात्‌ यह भाव न हो कि जब मुझे कुछ मिलना ही नहीं है तो मैं कर्म क्यों करूं।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df57'),
    chapter_id: new ObjectId('69b814453347b7690679df51'),
    type: 'explanation', order: 3,
    section_title: { hi: '', en: '' }, title: { hi: 'मूल मंत्र: अपने अधिकार का त्याग और दूसरे के अधिकार की रक्षा', en: "Core Principle: Renounce Self-Will; Protect Others' Rights" },
    content: { hi: 'जब उद्देश्य परिस्थिति से हटकर समता की ओर परिवर्तित होता है तब मनुष्य साधनशील हो जाता है और इस बात को स्वीकार करता है कि अपनी "चाह" अथवा अपना "संकल्प" ही मूल बाधा है।\n\nइसका एक ही उपाय है कि अपने संकल्प का त्याग करके दूसरे के संकल्प की पूर्ति के लिए ही कर्म में प्रवृत होना चाहिए।\n\nमूल मंत्र — "अपने अधिकार का त्याग और दूसरे के अधिकार की रक्षा।"\n\n"दूसरा" कौन? जो भी आपके परिवार के न्यूक्लियर सदस्य हैं — माता-पिता, भाई-बहन इत्यादि — उनके संकल्प की पूर्ति। दो बातों का ध्यान — पहला कोई विवेक विरुद्ध मांग न हो और दूसरा अपने सामर्थ्य के बाहर बात न हो।\n\nकर्म करने के दो स्तर हैं — शारीरिक और मानसिक। दोनों ही स्तरों से किसी का कोई अहित नहीं होना चाहिए।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df59'),
    chapter_id: new ObjectId('69b814453347b7690679df51'),
    type: 'explanation', order: 4,
    section_title: { hi: '', en: '' }, title: { hi: 'करने योग्य और न करने योग्य', en: 'What to Do and What Not to Do' },
    content: { hi: 'प्रायः मनुष्य वही कर्म करता है अथवा नहीं करता है जो उसे अच्छा लगता है या बुरा लगता है। अर्थात्‌ उसको जो कर्म करने में मजा आता है उसको वह सही मानता है।\n\nअब दृष्टि सुख से हटकर सिद्धान्त (करने योग्य अथवा न करने योग्य) पर रखनी चाहिए।\n\nकरने योग्य क्‍या है और न करने योग्य क्या है — इसका बड़ा सरल उत्तर है कि जो (हमें बुरा लगता है वह हम दूसरे के साथ न करें) — और करने अथवा न करने में तथा इसके परिणाम में जो भी परिस्थिति आए उसमें सम रहें।', en: '' },
    metadata: { shloka_refs: [], sanskrit_verses: [], questions: [], source: '', is_parable: false },
  },
  {
    _id: new ObjectId('69b814453347b7690679df5b'),
    chapter_id: new ObjectId('69b814453347b7690679df51'),
    type: 'discussion', order: 5,
    section_title: { hi: '', en: '' }, title: { hi: 'चर्चा का विषय', en: 'Discussion' },
    content: { hi: '', en: '' },
    metadata: {
      shloka_refs: [], sanskrit_verses: [],
      questions: [
        { hi: 'अपने अधिकार का त्याग और दूसरों के अधिकार की रक्षा — इस सिद्धान्त को अपने जीवन में कहाँ लागू कर सकते हैं?', en: "Where can you apply the principle \"Renounce self-will; protect others' rights\" in your life?", order: 1 },
        { hi: 'कर्म करने अथवा न करने में दृष्टिकोण अच्छा अथवा बुरा लगने पर नहीं होना चाहिए बल्कि करने योग्य अथवा न करने योग्य पर होनी चाहिए।', en: 'The criterion for action should not be what feels good or bad, but what is right or wrong to do.', order: 2 },
        { hi: 'कर्म करते समय अथवा परिणाम में जो भी परिस्थिति आए उसमें समता का अभाव बना रहे — अर्थात्‌ अपने ऊपर दोनों का ही कोई असर न पड़े।', en: 'Maintain equanimity in both action and its results — let neither affect you.', order: 3 },
      ],
      source: '', is_parable: false,
    },
  },
];

const restore = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.\n');

    await ContentBlock.deleteMany({});
    await Chapter.deleteMany({});
    console.log('✓ Cleared existing chapters and content blocks.');

    await Chapter.insertMany(chapters);
    console.log(`✓ ${chapters.length} chapters restored.`);

    await ContentBlock.insertMany(contentBlocks);
    console.log(`✓ ${contentBlocks.length} content blocks restored.`);

    console.log('\nRestore complete!');
    process.exit(0);
  } catch (err) {
    console.error('Restore failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

restore();

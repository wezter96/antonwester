import type { GuideContent, L10n } from '../types';

export const rag: L10n<GuideContent> = {
  sv: {
    id: 'rag',
    seo: {
      title: 'AI som svarar ur era dokument | Anton Wester',
      description:
        'Så bygger du AI som svarar ur manualer, avtal och rutiner med källor. Chunkning, behörigheter, citat och tester. Praktisk guide av Anton Wester.',
    },
    h1: 'AI som svarar ur era dokument',
    promise: 'Ett bra svar börjar med rätt utdrag, inte med en bättre prompt.',
    intro:
      'RAG handlar mindre om modellen än om vilka dokument som hittas, vem som får se dem och hur svaret visar var det kom ifrån.',
    published: '2026-10-14',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Frågan avgör om RAG behövs',
        paragraphs: [
          'RAG, retrieval-augmented generation, innebär att systemet först söker upp relevanta stycken och sedan låter modellen svara utifrån dem. Det passar frågor där svaret står i dokument som ändras: manualer, avtal, rutiner och supportsvar.',
          'Om svaret i stället är en beräkning eller en status i ett system ska du hämta det direkt. Om modellen behöver lära sig ett språk eller ett format är träning rätt väg, inte RAG. RAG löser inte heller dåliga dokument.',
        ],
      },
      {
        heading: 'Bygg kedjan från dokument till svar',
        paragraphs: [
          'En vanlig kedja är: läs in dokumentet, dela upp det i begripliga stycken, skapa embeddings, sök upp kandidater, rangordna om dem och låt modellen svara med källor. Varje steg kan försämra resultatet, så mät dem var för sig.',
          'Jag börjar oftast med en enkel sökning och lägger till omrangordning först när jag ser att rätt stycke finns bland kandidaterna men hamnar för långt ner.',
        ],
        steps: [
          'Parsa dokumentet och behåll rubriker, datum och källa.',
          'Dela i stycken som går att förstå utan resten av sidan.',
          'Skapa embeddings och spara dem med metadata.',
          'Sök bredare än du tror behövs, och rangordna om resultatet.',
          'Låt modellen svara, citera och säga nej när underlaget saknas.',
        ],
      },
      {
        heading: 'Chunkning och metadata',
        paragraphs: [
          'Ett vanligt misstag är att dela var 500:e tecken. då hamnar halva svaret i ett stycke och halva i nästa. Dela hellre vid rubriker och stycken, och behåll en kort kontext om var stycket kommer ifrån.',
          'Metadata är ofta viktigare än själva sökningen. Version, datum, avdelning och behörighet avgör om ett stycke ens får användas. Ett gammalt avtal ska inte vinna över det nya bara för att orden liknar varandra.',
        ],
      },
      {
        heading: 'Behörigheter får inte lösas i prompten',
        paragraphs: [
          'Om olika användare får se olika dokument måste filtret ligga i sökningen, inte i instruktionen till modellen. Hämta bara de stycken användaren har rätt att läsa. Då kan ett läckt dokument inte dyka upp i ett svar.',
          'Samma sak gäller känsliga fält. Maskera dem innan de skickas till modellen om de inte behövs för svaret. Logga vilka dokument som användes, inte hela innehållet.',
        ],
      },
      {
        heading: 'Citat och ett ärligt nej',
        paragraphs: [
          'Ett svar utan källa är svårt att granska. Låt modellen returnera korta citat och en länk till dokumentet. Om underlaget inte räcker ska den säga det och föreslå vem som kan svara, i stället för att fylla ut.',
          'Sätt en tröskel för hur relevant ett stycke måste vara. Det är bättre att svara “det står inte i underlaget” än att blanda ihop två dokument som handlar om ungefär samma sak.',
        ],
      },
      {
        heading: 'Testa med frågor ni faktiskt får',
        paragraphs: [
          'Samla 30–50 frågor från support, sälj och drift. Skriv ner vilket dokument svaret finns i och vad ett korrekt svar måste innehålla. Kör samma uppsättning varje gång du byter chunkning, modell eller sökning.',
          'Mät om rätt dokument hittades, om svaret stämde och om källan pekade rätt. De tre sakerna fångar olika fel. En modell kan ge ett korrekt svar av en slump, men då ska det inte räknas som en träff.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kan vi använda våra egna dokument utan att skicka dem till en extern AI?',
        a: 'Ja. Antingen kör ni modellen lokalt eller så skickar ni bara de stycken som behövs för frågan. Vilket som passar beror på datans känslighet och vilken kvalitet ni behöver.',
      },
      {
        q: 'Hur stora ska styckena vara?',
        a: 'Det finns inget universalvärde. Utgå från dokumentets struktur och testa. Ett stycke ska helst gå att förstå utan resten av sidan, men inte innehålla flera olika svar.',
      },
      {
        q: 'Räcker det att lägga in dokumenten i ChatGPT?',
        a: 'För en snabb test kan det räcka. För ett system som ska användas av flera personer behöver du behörigheter, uppdateringar, källor och ett sätt att mäta kvaliteten.',
      },
    ],
    relatedServices: ['development', 'agents'],
    relatedGuides: ['local-ai', 'ai-evaluation'],
  },
  en: {
    id: 'rag',
    seo: {
      title: 'AI that answers from your documents | Anton Wester',
      description:
        'How to build AI that answers from manuals, contracts and procedures with sources. Chunking, permissions, citations and tests. A practical guide by Anton Wester.',
    },
    h1: 'AI that answers from your documents',
    promise: 'A good answer starts with the right passage, not a better prompt.',
    intro:
      'RAG is less about the model than about which documents are found, who may see them and how the answer shows where it came from.',
    published: '2026-10-14',
    readingMinutes: 8,
    sections: [
      {
        heading: 'The question decides whether RAG is needed',
        paragraphs: [
          'RAG, retrieval-augmented generation, means the system first retrieves relevant passages and then lets the model answer from them. It suits questions where the answer is in documents that change: manuals, contracts, procedures and support replies.',
          'If the answer is a calculation or a status in a system, fetch it directly. If the model needs to learn a language or a format, training is the right path, not RAG. RAG does not fix bad documents either.',
        ],
      },
      {
        heading: 'Build the chain from document to answer',
        paragraphs: [
          'A common chain is: ingest the document, split it into understandable passages, create embeddings, retrieve candidates, rerank them and let the model answer with sources. Every step can degrade the result, so measure them separately.',
          'I usually start with simple search and add reranking only when I see that the right passage is among the candidates but ends up too far down.',
        ],
        steps: [
          'Parse the document and keep headings, dates and source.',
          'Split into passages that make sense without the rest of the page.',
          'Create embeddings and store them with metadata.',
          'Retrieve more candidates than you think you need, then rerank.',
          'Let the model answer, cite and say no when the evidence is missing.',
        ],
      },
      {
        heading: 'Chunking and metadata',
        paragraphs: [
          'A common mistake is splitting every 500 characters. Then half the answer lands in one passage and half in the next. Split at headings and paragraphs instead, and keep a little context about where the passage came from.',
          'Metadata is often more important than the search itself. Version, date, department and permission decide whether a passage may be used at all. An old contract should not beat the new one just because the words are similar.',
        ],
      },
      {
        heading: 'Permissions cannot live in the prompt',
        paragraphs: [
          'If different users may see different documents, the filter must sit in the search, not in the instruction to the model. Retrieve only passages the user is allowed to read. Then a leaked document cannot show up in an answer.',
          'The same applies to sensitive fields. Mask them before sending to the model if they are not needed for the answer. Log which documents were used, not the full content.',
        ],
      },
      {
        heading: 'Citations and an honest no',
        paragraphs: [
          'An answer without a source is hard to review. Have the model return short quotes and a link to the document. If the evidence is insufficient, it should say so and suggest who can answer, instead of filling the gap.',
          'Set a threshold for how relevant a passage must be. It is better to say “that is not in the source material” than to mix two documents about roughly the same thing.',
        ],
      },
      {
        heading: 'Test with questions you actually receive',
        paragraphs: [
          'Collect 30–50 questions from support, sales and operations. Write down which document holds the answer and what a correct answer must contain. Run the same set whenever you change chunking, model or search.',
          'Measure whether the right document was found, whether the answer was correct and whether the source pointed to the right place. Those three catch different failures. A model can produce a correct answer by luck, and that should not count as a hit.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can we use our own documents without sending them to an external AI?',
        a: 'Yes. Either run the model locally or send only the passages needed for the question. Which fits depends on how sensitive the data is and what quality you need.',
      },
      {
        q: 'How large should the passages be?',
        a: 'There is no universal number. Start from the document structure and test. A passage should make sense without the rest of the page, but not contain several different answers.',
      },
      {
        q: 'Is it enough to upload the documents to ChatGPT?',
        a: 'For a quick test, it can be enough. For a system several people will use, you need permissions, updates, sources and a way to measure quality.',
      },
    ],
    relatedServices: ['development', 'agents'],
    relatedGuides: ['local-ai', 'ai-evaluation'],
  },
};

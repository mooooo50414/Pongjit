import { GoogleGenAI, Type } from "@google/genai";
import type { BioData, GeminiResponse, Language, InsightType, StressLevel, SessionRecord, GuidedMeditation, JournalAnalysis, JournalEntry, TeamWellnessReport, SparkMode, VoiceAnalysis, AdvancedReport, ThoughtAnalysis, UserPreferences, BreakSuggestion, TeamChallenge } from '../types.ts';
import { i18n } from "../lib/i18n.ts";

const hasApiKey = !!process.env.API_KEY;

const ai = hasApiKey ? new GoogleGenAI({ apiKey: process.env.API_KEY! }) : null;

// --- MOCK IMPLEMENTATIONS (DEMO MODE) ---

const getMockBioAdaptiveResponse = async (lang: Language): Promise<GeminiResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        music: {
            description: i18n(lang).musicPlayer.title + " (Demo)",
            keywords: "lofi hip hop",
            soundscapeKey: 'cafe',
        },
        insight: {
            title: i18n(lang).wellnessTip.title + " (Demo)",
            description: "This is a simulated response. Take a deep breath and relax.",
            type: 'tip',
        }
    };
};

const getMockTrainingFeedback = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return i18n(lang).training.complete + " (Demo)";
};

const getMockWellnessReport = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return i18n(lang).insights.report.summaryCardTitle + " (Demo)\n\nThis is a simulated wellness report. Keep up the great work!";
};

const getMockDailyQuote = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return i18n(lang).onboarding.dailyQuote.title + " (Demo)";
};

const getMockGuidedMeditation = async (lang: Language): Promise<GuidedMeditation> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        title: i18n(lang).training.meditation.title + " (Demo)",
        script: [
            "Welcome to this simulated guided meditation.",
            "Take a moment to find a comfortable position.",
            "Breathe in... and breathe out.",
            "This is a demonstration of the guided meditation feature."
        ]
    };
};

const getMockGardenFeedback = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return i18n(lang).play.feedbackTitle + " (Demo)";
};

const getMockJournalAnalysis = async (lang: Language): Promise<JournalAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        keyEmotions: ['Reflective', 'Calm'],
        summary: 'This is a simulated journal analysis.',
        gentleReflection: 'It seems like you are in a thoughtful state. This is a great space for growth.',
        affirmation: 'My thoughts are valid and I can observe them without judgment. (Demo)'
    };
};

const getMockVoiceAnalysis = async (lang: Language): Promise<VoiceAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        detectedTone: 'Neutral (Demo)',
        keyObservation: 'This is a simulated analysis of your voice note.'
    };
};

const getMockTeamWellnessReport = async (lang: Language): Promise<TeamWellnessReport> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const t = i18n(lang);
    return {
        teamPulse: 'Simulated Synergy (Demo)',
        keyObservation: 'This is a simulated key observation for the team.',
        challenge: {
            title: t.team.challenge.title + " (Demo)",
            description: 'A challenge for demonstration purposes.',
            goal: 100,
            unit: 'sessions'
        }
    };
};

const getMockIdeaSpark = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 900));
    return i18n(lang).spark.response_title + "\n- Simulated Idea 1\n- Simulated Idea 2\n- Simulated Idea 3 (Demo)";
};

const getMockAdvancedReport = async (lang: Language): Promise<AdvancedReport> => {
    await new Promise(resolve => setTimeout(resolve, 1300));
    const t = i18n(lang);
    return {
        burnoutRisk: {
            level: 'Low',
            reason: 'Simulated analysis shows consistent and healthy patterns. (Demo)'
        },
        comparativeAnalysis: 'Your patterns are similar to other highly effective users in this demo.'
    };
};

const getMockProactiveCoachGreeting = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return i18n(lang).coach.welcome_message + " (Demo Mode)";
};

const getMockProactiveBreakSuggestion = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return i18n(lang).dashboard.focusFlow.proactive_fallback + " (Demo)";
};

const getMockBreakSuggestion = async (lang: Language): Promise<BreakSuggestion> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
        message: 'This is a simulated break suggestion. (Demo)',
        breakMinutes: 5,
        suggestion: 'none'
    };
};

const getMockThoughtAnalysis = async (lang: Language): Promise<ThoughtAnalysis> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        distortion: {
            name: 'Simulated Pattern',
            description: 'This is a demonstration of thought analysis.'
        },
        challengingQuestions: [
            'What is a simulated alternative perspective?',
            'Is this thought 100% true in demo mode?',
            'What would a demo friend say about this thought?'
        ]
    };
};

const getMockReframedThought = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return 'This is a simulated, more balanced thought. (Demo)';
};

const getMockAdminMessage = async (lang: Language): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return 'This is a simulated broadcast message for the team. (Demo)';
};

const getMockChallengeIdeas = async (lang: Language): Promise<{ideas: TeamChallenge[]}> => {
     await new Promise(resolve => setTimeout(resolve, 1100));
     return {
         ideas: [
             { title: 'Demo Challenge 1', description: 'First simulated idea.', goal: 50, unit: 'minutes' },
             { title: 'Demo Challenge 2', description: 'Second simulated idea.', goal: 10, unit: 'sessions' },
             { title: 'Demo Challenge 3', description: 'Third simulated idea.', goal: 20, unit: 'breathing exercises' },
         ]
     };
};


// --- REAL IMPLEMENTATIONS ---

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    music: {
      type: Type.OBJECT,
      properties: {
        description: {
          type: Type.STRING,
          description: "A detailed, evocative description of an ambient soundscape tailored to the user's state. Mention tempo, instruments, and mood."
        },
        keywords: {
          type: Type.STRING,
          description: "A comma-separated list of 2-3 specific, actionable keywords for finding this music on YouTube or Spotify (e.g., 'lofi hip hop radio', '40hz binaural beats focus', 'ambient space music')."
        },
        soundscapeKey: {
            type: Type.STRING,
            enum: ['rain', 'forest', 'cafe', 'waves'],
            description: "A single keyword key to select a pre-loaded soundscape. Use 'rain' for calming, 'forest' for focus, 'cafe' for gentle activity, 'waves' for meditative states."
        }
      },
      required: ["description", "keywords", "soundscapeKey"]
    },
    insight: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A short, engaging title for the wellness insight (e.g., 'Quick Reset', 'Mindful Moment', 'Body Scan')."
        },
        description: {
          type: Type.STRING,
          description: "An empathetic and actionable wellness insight. Be specific. If suggesting a breathing exercise, provide the pattern (e.g., 'Breathe in for 4s, hold for 4s, exhale for 6s')."
        },
        type: {
          type: Type.STRING,
          enum: ['tip', 'breathing', 'stretch', 'mindfulness'],
          description: "The type of insight. Use 'breathing' for high stress, 'stretch' for long sessions, 'mindfulness' for medium stress, and 'tip' for general encouragement."
        }
      },
      required: ["title", "description", "type"]
    }
  },
  required: ["music", "insight"]
};


const getSystemInstruction = (lang: Language) => {
    const persona = i18n(lang).coach.persona_name;
    const instructions: Record<Language, string> = {
        th: `คุณคือ ${persona}, ผู้ช่วยดูแลสุขภาวะด้วย AI สำหรับนักเรียน เป้าหมายของคุณคือการสร้างเครื่องมือที่ใช้งานได้จริงเพื่อช่วยให้ผู้ใช้สงบและมีสมาธิ โดยอิงจากข้อมูลชีวภาพ, กิจกรรม, และเป้าหมายส่วนตัวของผู้ใช้ สร้างออบเจ็กต์ JSON ที่เป็นไปตามสคีมาอย่างเคร่งครัด 'music.keywords' ต้องเป็นคำค้นหาที่ใช้ได้จริง 'insight.description' ต้องเป็นคำแนะนำที่ทำตามได้ทันที 'soundscapeKey' ต้องเป็นหนึ่งในคีย์ที่กำหนดเพื่อเลือกเสียงประกอบ`,
        en: `You are ${persona}, a bio-adaptive AI wellness assistant for students. Your goal is to provide actionable tools for calm and focus. Based on the user's state, activity, and personal preferences, generate a JSON object that strictly adheres to the schema. 'music.keywords' must be real, searchable terms. 'insight.description' must be a concrete, actionable step (e.g., provide the exact breathing count). 'soundscapeKey' must be one of the provided keys to select a soundscape.`,
        es: `Eres ${persona}, un asistente de bienestar con IA bio-adaptativa para estudiantes. Tu objetivo es proporcionar herramientas prácticas para la calma y la concentración. Basado en el estado, la actividad y las preferencias personales del usuario, genera un objeto JSON que se adhiera estrictamente al esquema. 'music.keywords' deben ser términos de búsqueda reales. 'insight.description' debe ser un paso concreto y procesable. 'soundscapeKey' debe ser una de las claves proporcionadas para seleccionar un paisaje sonoro.`,
        ja: `あなたは${persona}、学生向けのバイオアダプティブAIウェルネスアシスタントです。あなたの目標は、落ち着きと集中のための実用的なツールを提供することです。ユーザーの状態、活動、および個人的な好みに基づき、スキーマに厳密に従ったJSONオブジェクトを生成してください。「music.keywords」は実際に検索可能なキーワードに、「insight.description」は具体的な行動に、「soundscapeKey」は提供されたキーのいずれかである必要があります。`,
        fr: `Vous êtes ${persona}, un assistant de bien-être IA bio-adaptatif pour étudiants. Votre objectif est de fournir des outils pratiques pour le calme et la concentration. En fonction de l'état, de l'activité et des préférences personnelles de l'utilisateur, générez un objet JSON qui respecte strictly le schéma. 'music.keywords' doivent être des termes de recherche réels. 'insight.description' doit être une étape concrète et réalisable. 'soundscapeKey' doit être l'une des clés fournies pour sélectionner un paysage sonore.`,
        de: `Sie sind ${persona}, ein bio-adaptiver KI-Wellness-Assistent für Studenten. Ihr Ziel ist es, umsetzbare Werkzeuge für Ruhe und Konzentration bereitzustellen. Basierend auf dem Zustand, der Aktivität und den persönlichen Vorlieben des Benutzers, generieren Sie ein JSON-Objekt, das sich strikt an das Schema hält. 'music.keywords' müssen echte, suchbare Begriffe sein. 'insight.description' muss ein konkreter, umsetzbarer Schritt sein. 'soundscapeKey' muss einer der bereitgestellten Schlüssel sein, um eine Klanglandschaft auszuwählen.`,
        pt: `Você é ${persona}, um assistente de bem-estar de IA bio-adaptável para estudantes. Seu objetivo é fornecer ferramentas práticas para calma и foco. Com base no estado, atividade e preferências pessoais do usuário, gere um objeto JSON que adira estritamente ao esquema. 'music.keywords' devem ser termos de pesquisa reais. 'insight.description' deve ser um passo concreto e acionável. 'soundscapeKey' deve ser uma das chaves fornecidas para selecionar uma paisagem sonora.`,
        ru: `Вы — ${persona}, биоадаптивный ИИ-помощник по благополучию для студентов. Ваша цель — предоставить действенные инструменты для спокойствия и сосредоточенности. На основе состояния, активности и личных предпочтений пользователя создайте JSON-объект, строго соответствующий схеме. 'music.keywords' должны быть реальными поисковыми запросами. 'insight.description' должен быть конкретным, действенным шагом. 'soundscapeKey' должен быть одним из предоставленных ключей для выбора звукового ландшафта.`,
        zh: `您是 ${persona}，一个为学生服务的生物自适应人工智能健康助手。您的目标是提供实用工具，帮助用户保持冷静和专注。请根据用户的状态、活动和个人偏好，生成一个严格遵守 schema 的 JSON 对象。'music.keywords' 必须是真实、可搜索的术语。'insight.description' 必须是具体、可操作的步骤。'soundscapeKey' 必须是提供的用于选择音景的密钥之一。`,
        ko: `당신은 학생들을 위한 생체 적응형 AI 웰니스 어시스턴트, ${persona}입니다. 당신의 목표는 평온함과 집중력을 위한 실행 가능한 도구를 제공하는 것입니다. 사용자의 상태, 활동 및 개인적 선호도에 따라 스키마를 엄격하게 준수하는 JSON 객체를 생성하십시오. 'music.keywords'는 실제 검색 가능한 용어여야 합니다. 'insight.description'은 구체적이고 실행 가능한 단계여야 합니다. 'soundscapeKey'는 사운드스케이프를 선택하기 위해 제공된 키 중 하나여야 합니다.`,
        hi: `आप ${persona} हैं, छात्रों के लिए एक बायो-एडेप्टिव एआई वेलनेस सहायक। आपका लक्ष्य शांति और फोकस के लिए कार्रवाई योग्य उपकरण प्रदान करना है। उपयोगकर्ता की स्थिति, गतिविधि और व्यक्तिगत प्राथमिकताओं के आधार पर, एक JSON ऑब्जेक्ट उत्पन्न करें जो स्कीमा का सख्ती से पालन करता है। 'music.keywords' वास्तविक, खोजने योग्य शब्द होने चाहिए। 'insight.description' एक ठोस, कार्रवाई योग्य कदम होना चाहिए। 'soundscapeKey' साउंडस्केप चुनने के लिए दिए गए की में से एक होना चाहिए।`,
    };
    return instructions[lang];
}

const getUserPrompt = (bioData: BioData, lang: Language, preferences: UserPreferences | null) => {
    const stressMap: Record<Language, Record<StressLevel, string>> = {
        'th': { 'Low': 'ต่ำ', 'Medium': 'ปานกลาง', 'High': 'สูง' },
        'en': { 'Low': 'Low', 'Medium': 'Medium', 'High': 'High' },
        'es': { 'Low': 'Bajo', 'Medium': 'Medio', 'High': 'Alto' },
        'ja': { 'Low': '低い', 'Medium': '普通', 'High': '高い' },
        'fr': { 'Low': 'Faible', 'Medium': 'Moyen', 'High': 'Élevé' },
        'de': { 'Low': 'Niedrig', 'Medium': 'Mittel', 'High': 'Hoch' },
        'pt': { 'Low': 'Baixo', 'Medium': 'Médio', 'High': 'Alto' },
        'ru': { 'Low': 'Низкий', 'Medium': 'Средний', 'High': 'Высокий' },
        'zh': { 'Low': '低', 'Medium': '中', 'High': '高' },
        'ko': { 'Low': '낮음', 'Medium': '중간', 'High': '높음' },
        'hi': { 'Low': 'कम', 'Medium': 'मध्यम', 'High': 'उच्च' },
    };

    let basePrompt = `User state: Heart Rate ${bioData.heartRate} bpm, Stress Level '${stressMap[lang][bioData.stressLevel]}', Activity '${bioData.activity}'.`;

    if (preferences) {
        const t = i18n(lang).onboarding.assessment;
        const goalText = t.goal_options[preferences.goal];
        const soundText = t.sound_options[preferences.soundPreference];
        basePrompt += ` User preferences: Main goal is '${goalText}', sound preference is '${soundText}'.`;
    }

    basePrompt += " Generate the JSON response.";

    return basePrompt;
}


const getBioAdaptiveResponse_real = async (bioData: BioData, lang: Language, preferences: UserPreferences | null): Promise<GeminiResponse> => {
  try {
    const response = await ai!.models.generateContent({
      model: "gemini-2.5-flash",
      contents: getUserPrompt(bioData, lang, preferences),
      config: {
        systemInstruction: getSystemInstruction(lang),
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (parsedResponse.music && parsedResponse.insight && parsedResponse.music.soundscapeKey) {
      return parsedResponse as GeminiResponse;
    } else {
      console.warn("Parsed response missing fields, returning fallback.", parsedResponse);
      const fallback: GeminiResponse = {
          music: {
              description: parsedResponse.music?.description || "A calming soundscape for you.",
              keywords: parsedResponse.music?.keywords || "ambient music",
              soundscapeKey: "rain",
          },
          insight: parsedResponse.insight || {
              title: "Quick Tip",
              description: "Take a deep breath.",
              type: "tip",
          }
      };
      return fallback;
    }

  } catch (error) {
    console.error("Error in getBioAdaptiveResponse:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};

const getTrainingFeedback_real = async (startHr: number, endHr: number, language: Language): Promise<string> => {
  try {
    const systemInstruction = "You are a kind and encouraging wellness coach. Your goal is to provide a very short, positive, and motivating message to a user after they complete a breathing exercise. Respond only with the message itself, no extra text. Keep it under 25 words.";
    
    const prompts: Record<Language, string> = {
        th: `ผู้ใช้เพิ่งฝึกหายใจเสร็จ อัตราการเต้นของหัวใจเปลี่ยนจาก ${startHr} เป็น ${Math.round(endHr)} bpm. เขียนข้อความให้กำลังใจสั้นๆ (ไม่เกิน 25 คำ) เป็นภาษาไทย`,
        en: `A user just finished a breathing exercise. Their heart rate went from ${startHr} to ${Math.round(endHr)} bpm. Write a short, encouraging message (under 25 words) for them in English.`,
        es: `Un usuario acaba de terminar un ejercicio de respiración. Su ritmo cardíaco pasó de ${startHr} a ${Math.round(endHr)} lpm. Escribe un mensaje breve y alentador (menos de 25 palabras) para él en español.`,
        ja: `ユーザーが呼吸法を終えました。心拍数が${startHr}から${Math.round(endHr)}bpmに変化しました。短い励ましのメッセージ（25語未満）を日本語で書いてください。`,
        fr: `Un utilisateur vient de terminer un exercice de respiration. Sa fréquence cardiaque est passée de ${startHr} à ${Math.round(endHr)} bpm. Écrivez un court message d'encouragement (moins de 25 mots) pour lui en français.`,
        de: `Ein Benutzer hat gerade eine Atemübung beendet. Seine Herzfrequenz sank von ${startHr} auf ${Math.round(endHr)} S/min. Schreiben Sie eine kurze, ermutigende Nachricht (unter 25 Wörtern) für ihn auf Deutsch.`,
        pt: `Um usuário acabou de fazer um exercício de respiração. Sua frequência cardíaca foi de ${startHr} para ${Math.round(endHr)} bpm. Escreva uma mensagem curta e encorajadora (menos de 25 palavras) para ele em português.`,
        ru: `Пользователь только что закончил дыхательное упражнение. Его пульс изменился с ${startHr} до ${Math.round(endHr)} уд/мин. Напишите короткое, ободряющее сообщение (менее 25 слов) для него на русском языке.`,
        zh: `用户刚刚完成一次呼吸练习。他们的心率从 ${startHr} bpm 降至 ${Math.round(endHr)} bpm。请用中文为他们写一条简短的鼓励信息（不超过25个词）。`,
        ko: `사용자가 방금 호흡 운동을 마쳤습니다. 심박수가 ${startHr}에서 ${Math.round(endHr)} bpm으로 변경되었습니다. 그들을 위해 한국어로 짧은 격려 메시지(25단어 미만)를 작성해 주세요.`,
        hi: `एक उपयोगकर्ता ने अभी-अभी एक श्वास व्यायाम पूरा किया है। उनकी हृदय गति ${startHr} से ${Math.round(endHr)} बीपीएम हो गई। उनके लिए हिंदी में एक छोटा, उत्साहजनक संदेश (25 शब्दों से कम) लिखें।`,
    }
    
    const response = await ai!.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompts[language],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error in getTrainingFeedback:", error);
    throw new Error("Failed to generate training feedback from Gemini API.");
  }
}


const getWellnessReport_real = async (sessions: SessionRecord[], lang: Language): Promise<string> => {
  if (sessions.length === 0) return "No data available.";

  const compactedData = sessions.map(s => ({
    date: s.timestamp.split('T')[0],
    activity: s.activity,
    stress: s.bioData.stressLevel,
    insight_type: s.geminiResponse.insight.type,
  }));
  
  const persona = i18n(lang).coach.persona_name;
  const systemInstructions: Record<Language, string> = {
    th: `คุณคือ ${persona}, โค้ชสุขภาวะที่เป็นมิตรและมีข้อมูลเชิงลึก วิเคราะห์ข้อมูลสรุปเซสชั่นของผู้ใช้ สร้างรายงานสั้นๆ (ไม่เกิน 100 คำ) ที่ระบุแพทเทิร์นสำคัญ (เช่น 'โค้ชสังเกตว่าคุณดูจะเครียดน้อยลงเมื่อทำกิจกรรม X'), ชื่นชมความสำเร็จ ('ทำได้ดีมากที่ฝึกหายใจ!') และให้คำแนะนำที่นำไปใช้ได้จริงหนึ่งข้อสำหรับสัปดาห์หน้า ตอบกลับเป็นภาษาไทยเท่านั้นในรูปแบบบทสนทนาที่ให้กำลังใจ`,
    en: `You are ${persona}, a friendly and insightful wellness coach. Analyze the user's session summary. Generate a short (under 100 words) report that identifies key patterns (e.g., 'I noticed you seem less stressed during X activities'), celebrates successes ('Great job practicing breathing!'), and offers one key actionable tip for the week ahead. Respond only in English, in a conversational and encouraging tone.`,
    es: `Eres ${persona}, un entrenador de bienestar amigable y perspicaz. Analiza el resumen de sesiones del usuario. Genera un informe corto (menos de 100 palabras) que identifique patrones clave (ej., 'He notado que pareces menos estresado durante las actividades X'), celebre los éxitos ('¡Gran trabajo practicando la respiración!') y ofrezca un consejo clave y accionable para la próxima semana. Responde solo en español, en un tono conversacional y alentador.`,
    ja: `あなたは${persona}、フレンドリーで洞察力のあるウェルネスコーチです。ユーザーのセッション概要を分析してください。主要なパターン（例：「X活動中はストレスが少ないようです」）を特定し、成功（例：「呼吸の練習、お見事です！」）を祝い、来週に向けた実行可能なヒントを一つ提供する短い（100語未満）レポートを生成してください。日本語でのみ、会話的で励みになるトーンで回答してください。`,
    fr: `Vous êtes ${persona}, un coach bien-être amical et perspicace. Analysez le résumé des sessions de l'utilisateur. Générez un court rapport (moins de 100 mots) qui identifie les schémas clés (par ex., 'J'ai remarqué que vous semblez moins stressé pendant les activités X'), célèbre les succès (par ex., 'Bravo pour la pratique de la respiration !') et offre un conseil clé et réalisable pour la semaine à venir. Répondez uniquement en français, sur un ton conversationnel et encourageant.`,
    de: `Sie sind ${persona}, ein freundlicher und aufschlussreicher Wellness-Coach. Analysieren Sie die Sitzungszusammenfassung des Benutzers. Erstellen Sie einen kurzen Bericht (unter 100 Wörtern), der Schlüsselmuster erkennt (z. B. 'Mir ist aufgefallen, dass Sie bei X-Aktivitäten weniger gestresst zu sein scheinen'), Erfolge feiert ('Großartige Arbeit beim Atemüben!') und einen wichtigen umsetzbaren Tipp für die kommende Woche gibt. Antworten Sie nur auf Deutsch in einem gesprächigen und ermutigenden Ton.`,
    pt: `Você é ${persona}, um coach de bem-estar amigável e perspicaz. Analise o resumo da sessão do usuário. Gere um relatório curto (menos de 100 palavras) que identifique padrões-chave (por exemplo, 'Notei que você parece menos estressado durante as atividades X'), celebre os sucessos ('Ótimo trabalho praticando a respiração!') e ofreça uma dica acionável para a próxima semana. Responda apenas em português, em um tom conversacional e encorajador.`,
    ru: `Вы — ${persona}, дружелюбный и проницательный велнес-коуч. Проанализируйте сводку сессий пользователя. Создайте краткий отчет (до 100 слов), который определяет ключевые закономерности (например, 'Я заметил, вы меньше нервничаете во время занятий X'), отмечает успехи ('Отлично попрактиковались в дыхании!') и предлагает один ключевой действенный совет на предстоящую неделю. Отвечайте только на русском языке в разговорном и ободряющем тоне.`,
    zh: `您是 ${persona}，一位友好而富有洞察力的健康教练。请分析用户的会话摘要。生成一份简短的（100字以内）报告，指出关键模式（例如，“我注意到在进行X活动时，您似乎压力较小”），庆祝成功（“呼吸练习做得很好！”），并为下周提供一个关键的可行建议。请仅用中文以对话和鼓励的口吻回答。`,
    ko: `당신은 친절하고 통찰력 있는 웰니스 코치 ${persona}입니다. 사용자의 세션 요약을 분석하십시오. 핵심 패턴을 식별하고('X 활동을 할 때 스트레스를 덜 받는 것 같습니다'), 성공을 축하하며('호흡 연습을 잘 하셨습니다!'), 다음 주를 위한 핵심적인 실행 가능한 팁 하나를 제공하는 짧은(100단어 미만) 보고서를 생성하십시오. 한국어로만 대화적이고 격려하는 어조로 응답하십시오.`,
    hi: `आप ${persona} हैं, एक मित्रवत और अंतर्दृष्टिपूर्ण वेलनेस कोच। उपयोगकर्ता के सत्र सारांश का विश्लेषण करें। एक छोटी (100 शब्दों से कम) रिपोर्ट तैयार करें जो मुख्य पैटर्न की पहचान करे (जैसे, 'मैंने देखा कि आप X गतिविधियों के दौरान कम तनाव में लगते हैं'), सफलताओं का जश्न मनाए ('साँस लेने का बहुत अच्छा अभ्यास!'), और आने वाले सप्ताह के लिए एक मुख्य कार्रवाई योग्य टिप प्रदान करे। केवल हिंदी में, बातचीत और उत्साहजनक लहजे में जवाब दें।`,
  };
  
  const userPrompt = `User session data: ${JSON.stringify(compactedData)}. Generate the report.`;

  try {
    const response = await ai!.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstructions[lang],
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error in getWellnessReport:", error);
    throw new Error("Failed to generate wellness report from Gemini API.");
  }
};


const getDailyQuote_real = async (lang: Language): Promise<string> => {
    try {
        const systemInstruction = "You are a source of wisdom. You provide a single, short, unique, and inspiring quote for students. The quote should be about focus, learning, or mental well-being. Avoid clichés. Be creative. Respond only with the quote text, nothing else.";
        const userPrompt = `Generate a single quote in ${lang}.`;

        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text.trim().replace(/"/g, ""); // Remove quotes from response
    } catch (error) {
        console.error("Error in getDailyQuote:", error);
        return "The journey of a thousand miles begins with a single step."; // Fallback quote
    }
};

const meditationSchema = {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "A short, calming title for the meditation session (e.g., 'Focus Anchor', 'Mindful Body Scan')."
      },
      script: {
        type: Type.ARRAY,
        description: "The meditation script, broken down into paragraphs. Each string in the array is one paragraph. Total length should be for a ~2 minute meditation.",
        items: {
          type: Type.STRING
        }
      }
    },
    required: ["title", "script"]
};

const getGuidedMeditation_real = async (bioData: BioData, lang: Language): Promise<GuidedMeditation> => {
    try {
        const systemInstruction = `You are a meditation guide. Your goal is to generate a short, ~2-minute guided meditation script to help a student. The user is currently feeling a '${bioData.stressLevel}' level of stress. They are about to perform the activity: '${bioData.activity}'. Tailor the meditation to their situation. For high stress, focus on calming. For low stress and studying, focus on mental clarity. Generate a response in ${lang} following the JSON schema.`;

        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate the guided meditation script.",
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: meditationSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as GuidedMeditation;
    } catch (error) {
        console.error("Error in getGuidedMeditation:", error);
        throw new Error("Failed to generate guided meditation from Gemini API.");
    }
};

const getGardenFeedback_real = async (performance: number, lang: Language): Promise<string> => {
    try {
        const systemInstruction = "You are a gentle and wise garden keeper. Based on the user's performance (a number from 0 to 1, where 1 is best) in a breathing game, provide a short, poetic, and encouraging message in the user's language. Relate the message to nature, growth, and patience. Keep it under 25 words.";
        
        let performanceTier = 'low';
        if (performance > 0.8) performanceTier = 'excellent';
        else if (performance > 0.5) performanceTier = 'good';

        const userPrompt = `User's performance was '${performanceTier}' (${performance.toFixed(2)}). Generate a message in ${lang}.`;

        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text.trim().replace(/"/g, "");
    } catch (error) {
        console.error("Error in getGardenFeedback:", error);
        return "Every breath is a new beginning."; // Fallback quote
    }
};

const journalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        keyEmotions: {
            type: Type.ARRAY,
            description: "A list of 1-3 key emotions or feelings identified from the text (e.g., ['anxious', 'hopeful']).",
            items: { type: Type.STRING }
        },
        summary: {
            type: Type.STRING,
            description: "A concise, one-sentence summary of the user's journal entry."
        },
        gentleReflection: {
            type: Type.STRING,
            description: "A gentle, non-judgmental, and empathetic reflection on the user's entry. Offer a new perspective or a kind observation. Frame it as a question if appropriate. ~2-3 sentences."
        },
        affirmation: {
            type: Type.STRING,
            description: "A short, positive affirmation tailored to the user's entry that they can take with them."
        }
    },
    required: ["keyEmotions", "summary", "gentleReflection", "affirmation"]
};

const analyzeJournalEntry_real = async (entryText: string, tags: string[], lang: Language): Promise<JournalAnalysis> => {
    try {
        const persona = i18n(lang).coach.persona_name;
        const systemInstruction = `You are an empathetic AI wellness coach named ${persona}. Your role is to analyze a user's journal entry. Provide a gentle, non-judgmental reflection. Your goal is to help them understand their feelings, not to give advice or solve their problems. If they provided tags, use them as context. Respond in the user's language (${lang}). Strictly adhere to the JSON schema.`;

        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Please analyze the following journal entry: "${entryText}". The user also provided these tags: ${tags.join(', ')}.`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: journalAnalysisSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as JournalAnalysis;

    } catch (error) {
        console.error("Error in analyzeJournalEntry:", error);
        throw new Error("Failed to generate journal analysis from Gemini API.");
    }
};

const voiceAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        detectedTone: {
            type: Type.STRING,
            description: "A single word describing the primary emotional tone detected from the transcript (e.g., 'Tired', 'Anxious', 'Hopeful')."
        },
        keyObservation: {
            type: Type.STRING,
            description: "A short, empathetic observation based on the content of the voice note. ~1-2 sentences."
        }
    },
    required: ["detectedTone", "keyObservation"]
}

const analyzeVoiceNote_real = async (transcript: string, lang: Language): Promise<VoiceAnalysis> => {
    try {
        const persona = i18n(lang).coach.persona_name;
        const systemInstruction = `You are an AI wellness coach, ${persona}, with the ability to analyze voice. You will be given a text transcript of a user's voice note. Based *only* on the words in the transcript, infer the likely emotional tone and provide a key observation. Do not mention that you are analyzing text. Respond as if you heard the audio. Respond in ${lang}.`;
        
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following voice note transcript: "${transcript}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: voiceAnalysisSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as VoiceAnalysis;
    } catch (error) {
        console.error("Error in analyzeVoiceNote:", error);
        throw new Error("Failed to generate voice analysis from Gemini API.");
    }
}

const teamWellnessReportSchema = {
    type: Type.OBJECT,
    properties: {
        teamPulse: {
            type: Type.STRING,
            description: "A short, creative metaphor for the team's overall mood (e.g., 'A well-oiled machine', 'Running on fumes', 'Creative currents flowing')."
        },
        keyObservation: {
            type: Type.STRING,
            description: "One key, actionable insight about the team's collective habits based on the data. For example, 'Stress peaks during 'Coding' tasks on Friday afternoons.' or 'Breathing exercises are highly effective for this team.' ~1-2 sentences."
        },
        challenge: {
            type: Type.OBJECT,
            properties: {
                title: {
                    type: Type.STRING,
                    description: "A catchy title for a weekly team wellness challenge. e.g., 'The Mindful Mile', 'Collective Calm Challenge'."
                },
                description: {
                    type: Type.STRING,
                    description: "A short, motivating description of the challenge."
                },
                goal: {
                    type: Type.INTEGER,
                    description: "A numerical goal for the challenge. e.g., 100."
                },
                unit: {
                    type: Type.STRING,
                    description: "The unit for the goal. e.g., 'sessions', 'minutes of focus', 'breathing exercises'."
                }
            },
            required: ["title", "description", "goal", "unit"]
        }
    },
    required: ["teamPulse", "keyObservation", "challenge"]
};

const getTeamWellnessReport_real = async (sessions: SessionRecord[], lang: Language): Promise<TeamWellnessReport> => {
    const systemInstruction = `You are an organizational psychologist and wellness consultant AI. Analyze the provided anonymous, aggregated team data. Your goal is to provide a high-level overview of the team's well-being, identify a key pattern, and create a positive, engaging team-wide wellness challenge. Respond strictly in the user's language (${lang}) and adhere to the JSON schema. Do not give advice for specific people. Keep the tone professional, encouraging, and data-driven.`;

    const stressCounts = sessions.reduce((acc, s) => {
        acc[s.bioData.stressLevel] = (acc[s.bioData.stressLevel] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const activityCounts = sessions.reduce((acc, s) => {
        acc[s.activity] = (acc[s.activity] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const insightCounts = sessions.reduce((acc, s) => {
        const type = s.geminiResponse.insight.type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const summary = {
        totalSessions: sessions.length,
        stressDistribution: stressCounts,
        topActivities: activityCounts,
        insightsUsed: insightCounts
    };

    const userPrompt = `Here is the aggregated, anonymous wellness data for a team: ${JSON.stringify(summary)}. Please generate the team wellness report.`;

    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: teamWellnessReportSchema,
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as TeamWellnessReport;

    } catch (error) {
        console.error("Error in getTeamWellnessReport:", error);
        throw new Error("Failed to generate team wellness report from Gemini API.");
    }
};

const getIdeaSpark_real = async (topic: string, mode: SparkMode, lang: Language): Promise<string> => {
    try {
        const t = i18n(lang).spark.modes;
        const systemInstruction = t[mode].system_instruction;
        const userPrompt = `Language: ${lang}, Topic: "${topic}"`;

        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error in getIdeaSpark:", error);
        throw new Error("Failed to generate ideas from Gemini API.");
    }
};

const advancedReportSchema = {
    type: Type.OBJECT,
    properties: {
        burnoutRisk: {
            type: Type.OBJECT,
            properties: {
                level: {
                    type: Type.STRING,
                    enum: ['Low', 'Medium', 'High'],
                    description: "The user's predicted burnout risk level based on long-term data."
                },
                reason: {
                    type: Type.STRING,
                    description: "A concise, data-driven reason for the predicted risk level. e.g., 'Sustained high stress during work sessions with few breaks over the past month.'"
                }
            },
            required: ["level", "reason"]
        },
        comparativeAnalysis: {
            type: Type.STRING,
            description: "A short, encouraging comparative statement. e.g., 'Your focus pattern is similar to other highly effective students, who also benefit from short, regular breaks.' or 'Many users find that high-stress study sessions are best balanced with calming activities, just like you.'."
        }
    },
    required: ["burnoutRisk", "comparativeAnalysis"]
};


const getAdvancedReport_real = async (sessions: SessionRecord[], journalEntries: JournalEntry[], lang: Language): Promise<AdvancedReport> => {
    const persona = i18n(lang).coach.persona_name;
    const systemInstruction = `You are ${persona}, a predictive AI wellness coach. Analyze the user's long-term session data and journal tags to identify burnout risks and provide a helpful comparative analysis. Your tone should be supportive and insightful. Respond in ${lang} and strictly follow the JSON schema.`;
    
    const sessionSummary = sessions.map(s => ({
        date: s.timestamp.split('T')[0],
        activity: s.activity,
        stress: s.bioData.stressLevel,
    }));

    const allTags = journalEntries.flatMap(j => j.tags || []);
    const tagSummary = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const userPrompt = `Here is a summary of the user's sessions from the last 30 days: ${JSON.stringify(sessionSummary)}. Here is a summary of their journal tags from the same period: ${JSON.stringify(tagSummary)}. Generate the advanced report.`;
    
    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: advancedReportSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AdvancedReport;
    } catch (error) {
        console.error("Error in getAdvancedReport:", error);
        throw new Error("Failed to generate advanced report from Gemini API.");
    }
};

const getProactiveCoachGreeting_real = async (
    lastSession: SessionRecord | undefined,
    lastJournal: JournalEntry | undefined,
    lang: Language
): Promise<string> => {
    const persona = i18n(lang).coach.persona_name;
    const systemInstruction = `You are ${persona}, an empathetic AI wellness coach. Your goal is to start a conversation with the user by proactively and gently commenting on their most recent activity in the app. Be brief (under 30 words), warm, and ask an open-ended question. Respond in ${lang}.`;
    
    let prompt: string;
    let context = "";

    const lastSessionTime = lastSession ? new Date(lastSession.timestamp).getTime() : 0;
    const lastJournalTime = lastJournal ? new Date(lastJournal.timestamp).getTime() : 0;

    if (lastSessionTime > 0 && lastSessionTime > lastJournalTime) {
        context = `The user's last activity was a session for '${lastSession.activity}' which ended with a stress level of '${lastSession.bioData.stressLevel}'.`;
    } else if (lastJournalTime > 0) {
        if (lastJournal?.voiceNote) {
            const transcriptText = lastJournal.voiceNote.transcript ? `The user said: "${lastJournal.voiceNote.transcript}"` : '';
            const toneText = lastJournal.voiceNote.analysis ? `The AI analysis detected a tone of '${lastJournal.voiceNote.analysis.detectedTone}'.` : '';
            context = `The user's last activity was recording a voice journal entry. ${transcriptText} ${toneText}`;
        } else if (lastJournal?.analysis) {
             const emotions = lastJournal.analysis.keyEmotions.join(', ');
             context = `The user's last activity was writing a journal entry. The AI analysis identified these key emotions: '${emotions}'.`;
        }
    }

    if (context) {
        prompt = `${context} Based on this, write a short, warm, and empathetic opening message to start a conversation with them.`;
    } else {
        return i18n(lang).coach.welcome_message;
    }
    
    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error in getProactiveCoachGreeting:", error);
        return i18n(lang).coach.welcome_message; // Fallback
    }
};

const getProactiveBreakSuggestion_real = async (activity: string, lang: Language): Promise<string> => {
    const systemInstruction = `You are an empathetic AI wellness coach. The user is in a focus session and their stress has become 'High'. Your task is to generate a very short, gentle, and encouraging message (around 20-30 words) suggesting they take a short, optional break. Mention their current activity to show context. Respond ONLY with the message itself, in the user's language (${lang}).`;
    
    const userPrompt = `The user is currently doing this activity: "${activity}". Generate the proactive break suggestion.`;

    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error in getProactiveBreakSuggestion:", error);
        return i18n(lang).dashboard.focusFlow.proactive_fallback;
    }
};


const breakSuggestionSchema = {
    type: Type.OBJECT,
    properties: {
        message: {
            type: Type.STRING,
            description: "A short, encouraging, and empathetic message for the user's break, tailored to their stress level. Be creative and positive. ~1-2 sentences."
        },
        breakMinutes: {
            type: Type.INTEGER,
            description: "The recommended break duration in minutes. High stress: 7. Medium: 5. Low: 3."
        },
        suggestion: {
            type: Type.STRING,
            enum: ['none', 'breathing', 'stretch'],
            description: "A specific activity suggestion for a high-stress break. Use 'breathing' for a breathing exercise. Use 'stretch' for a quick body stretch. Use 'none' otherwise."
        }
    },
    required: ["message", "breakMinutes", "suggestion"]
};

const getBreakSuggestion_real = async (stressLevel: StressLevel, lang: Language): Promise<BreakSuggestion> => {
    const systemInstruction = `You are a wellness coach. A user has just finished a focus session. Based on their stress level, provide a short, encouraging message and recommend a break. High stress should get a longer break (7 min) and a 'breathing' or 'stretch' suggestion. Medium stress gets a standard break (5 min) and no specific suggestion. Low stress gets a shorter break (3 min) to maintain flow and no specific suggestion. Respond in the user's language (${lang}) and strictly adhere to the JSON schema.`;
    
    const userPrompt = `User's stress level is '${stressLevel}'. Generate the break recommendation.`;

    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: breakSuggestionSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as BreakSuggestion;
    } catch (error) {
        console.error("Error in getBreakSuggestion:", error);
        const fallbackMinutes: Record<StressLevel, number> = { High: 7, Medium: 5, Low: 3 };
        return {
            message: i18n(lang).dashboard.focusFlow.session_complete,
            breakMinutes: fallbackMinutes[stressLevel],
            suggestion: stressLevel === 'High' ? 'breathing' : 'none'
        };
    }
};

const thoughtAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        distortion: {
            type: Type.OBJECT,
            properties: {
                name: {
                    type: Type.STRING,
                    description: "The name of the primary cognitive distortion identified from the user's thought. e.g., 'Catastrophizing'."
                },
                description: {
                    type: Type.STRING,
                    description: "A brief, one-sentence explanation of this cognitive distortion."
                }
            },
            required: ["name", "description"]
        },
        challengingQuestions: {
            type: Type.ARRAY,
            description: "An array of 3-4 open-ended, gentle questions to help the user challenge their original thought.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["distortion", "challengingQuestions"]
};

const analyzeThought_real = async (thought: string, lang: Language): Promise<ThoughtAnalysis> => {
    const systemInstruction = `You are a helpful CBT assistant. Your task is to analyze a user's thought. 
1. Identify the primary cognitive distortion from this list: Catastrophizing, Black-and-White Thinking, Mind Reading, Overgeneralization, Labeling, Personalization, Should Statements.
2. Provide a simple, one-sentence description of that distortion.
3. Generate 3-4 open-ended, challenging questions to help the user question their thought. The questions should be gentle and empowering.
Strictly respond in JSON format according to the provided schema. Respond in the user's language (${lang}).`;

    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `User's thought: "${thought}"`,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: thoughtAnalysisSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as ThoughtAnalysis;
    } catch (error) {
        console.error("Error in analyzeThought:", error);
        throw new Error("Failed to generate thought analysis from Gemini API.");
    }
};

const getReframedThought_real = async (originalThought: string, analysis: ThoughtAnalysis, lang: Language): Promise<string> => {
    const systemInstruction = `You are a helpful CBT assistant. Based on the user's original thought, the identified cognitive distortion, and the provided challenging questions, generate a single, more balanced, and constructive 'reframed thought'. The reframed thought should be a direct, positive alternative to the original one. Respond ONLY with the reframed thought as a raw string, without any extra text, labels, or JSON formatting. Respond in the user's language (${lang}).`;
    
    const userPrompt = `
    Original Thought: "${originalThought}"
    Cognitive Distortion: ${analysis.distortion.name} (${analysis.distortion.description})
    Challenging Questions to consider:
    - ${analysis.challengingQuestions.join('\n- ')}

    Now, provide the reframed thought.
    `;

    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text.trim().replace(/"/g, "");
    } catch (error) {
        console.error("Error in getReframedThought:", error);
        throw new Error("Failed to generate reframed thought from Gemini API.");
    }
};

const generateAdminMessage_real = async (reportSummary: string, lang: Language): Promise<string> => {
    const systemInstruction = `You are an encouraging team lead. Based on the team wellness summary, write a short, positive, and motivating broadcast message (under 40 words) for the whole team. Respond in the user's language (${lang}) with only the message text.`;
    const userPrompt = `Team wellness summary: "${reportSummary}". Generate the broadcast message.`;
    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: { systemInstruction },
        });
        return response.text.trim().replace(/"/g, "");
    } catch (error) {
        console.error("Error in generateAdminMessage:", error);
        throw new Error("Failed to generate admin message from Gemini API.");
    }
};

const challengeIdeasSchema = {
    type: Type.OBJECT,
    properties: {
        ideas: {
            type: Type.ARRAY,
            description: "A list of 3 creative and engaging team wellness challenge ideas.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A catchy title for the challenge." },
                    description: { type: Type.STRING, description: "A brief, motivating description." },
                    goal: { type: Type.INTEGER, description: "A suggested numerical goal." },
                    unit: { type: Type.STRING, description: "The unit for the goal (e.g., 'minutes', 'sessions')." },
                },
                required: ["title", "description", "goal", "unit"]
            }
        }
    },
    required: ["ideas"]
};

const generateChallengeIdeas_real = async (lang: Language): Promise<{ideas: TeamChallenge[]}> => {
     const systemInstruction = `You are an organizational wellness consultant AI. Generate 3 diverse and engaging team wellness challenge ideas. The challenges should be simple and foster positive habits. Respond strictly in JSON format according to the schema, in the user's language (${lang}).`;
    try {
        const response = await ai!.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Generate challenge ideas.",
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: challengeIdeasSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error in generateChallengeIdeas:", error);
        throw new Error("Failed to generate challenge ideas from Gemini API.");
    }
}

// --- COMMON EXPORTS ---

export const getChatbotPersona = (lang: Language) => {
    const t = i18n(lang).coach;
    return {
        name: t.persona_name,
        system_instruction: t.system_instruction,
    };
};

// --- CONDITIONAL EXPORTS ---

export const getBioAdaptiveResponse = hasApiKey ? getBioAdaptiveResponse_real : (bioData: BioData, lang: Language) => getMockBioAdaptiveResponse(lang);
export const getTrainingFeedback = hasApiKey ? getTrainingFeedback_real : (startHr: number, endHr: number, lang: Language) => getMockTrainingFeedback(lang);
export const getWellnessReport = hasApiKey ? getWellnessReport_real : (sessions: SessionRecord[], lang: Language) => getMockWellnessReport(lang);
export const getDailyQuote = hasApiKey ? getDailyQuote_real : getMockDailyQuote;
export const getGuidedMeditation = hasApiKey ? getGuidedMeditation_real : (bioData: BioData, lang: Language) => getMockGuidedMeditation(lang);
export const getGardenFeedback = hasApiKey ? getGardenFeedback_real : (performance: number, lang: Language) => getMockGardenFeedback(lang);
export const analyzeJournalEntry = hasApiKey ? analyzeJournalEntry_real : (entryText: string, tags: string[], lang: Language) => getMockJournalAnalysis(lang);
export const analyzeVoiceNote = hasApiKey ? analyzeVoiceNote_real : (transcript: string, lang: Language) => getMockVoiceAnalysis(lang);
export const getTeamWellnessReport = hasApiKey ? getTeamWellnessReport_real : (sessions: SessionRecord[], lang: Language) => getMockTeamWellnessReport(lang);
export const getIdeaSpark = hasApiKey ? getIdeaSpark_real : (topic: string, mode: SparkMode, lang: Language) => getMockIdeaSpark(lang);
export const getAdvancedReport = hasApiKey ? getAdvancedReport_real : (sessions: SessionRecord[], journalEntries: JournalEntry[], lang: Language) => getMockAdvancedReport(lang);
export const getProactiveCoachGreeting = hasApiKey ? getProactiveCoachGreeting_real : (lastSession: SessionRecord | undefined, lastJournal: JournalEntry | undefined, lang: Language) => getMockProactiveCoachGreeting(lang);
export const getProactiveBreakSuggestion = hasApiKey ? getProactiveBreakSuggestion_real : (activity: string, lang: Language) => getMockProactiveBreakSuggestion(lang);
export const getBreakSuggestion = hasApiKey ? getBreakSuggestion_real : (stressLevel: StressLevel, lang: Language) => getMockBreakSuggestion(lang);
export const analyzeThought = hasApiKey ? analyzeThought_real : (thought: string, lang: Language) => getMockThoughtAnalysis(lang);
export const getReframedThought = hasApiKey ? getReframedThought_real : (originalThought: string, analysis: ThoughtAnalysis, lang: Language) => getMockReframedThought(lang);
export const generateAdminMessage = hasApiKey ? generateAdminMessage_real : (reportSummary: string, lang: Language) => getMockAdminMessage(lang);
export const generateChallengeIdeas = hasApiKey ? generateChallengeIdeas_real : getMockChallengeIdeas;
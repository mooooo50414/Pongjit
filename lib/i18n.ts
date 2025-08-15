
import type { Language } from '../types.ts';

const en = {
    header: {
      dashboard: 'Focus',
      training: 'Training',
      insights: 'Insights',
      play: 'Play Zone',
      journal: 'Journal',
      team: 'Team Hub',
      coach: 'AI Coach',
      spark: 'Spark',
      data: 'Data',
      reframe: 'Reframe',
      mixer: 'Mixer',
      sanctuary: 'Sanctuary',
    },
    onboarding: {
      welcome: 'Welcome to PongJit',
      description: "Your personal AI for focus and well-being. Let's personalize your experience first.",
      startSessionTitle: "What are you focusing on today?",
      placeholder: 'e.g., Reading physics, Coding a project...',
      button: 'Start Session',
      activities: { study: 'Study', code: 'Coding', creative: 'Creative Work', other: 'Other', },
      proposal: 'Based on a project outline by students of Bunyawat Witthayalai School.',
      dailyQuote: {
        title: 'Daily Quote'
      },
      assessment: {
        title: "Personalize Your Experience",
        goal_q: "What's your primary goal?",
        goal_options: {
            stress: "Reduce Stress",
            focus: "Improve Focus",
            sleep: "Sleep Better",
            general: "General Well-being"
        },
        sound_q: "What kind of atmosphere helps you?",
        sound_options: {
            nature: "Nature Sounds",
            urban: "Urban Ambience",
            music: "Calm Music",
            silent: "Silence"
        },
        complete_button: "Get Started",
        step: "Step",
        complete_title: "You're all set!",
        complete_subtitle: "Your experience is now personalized.",
      }
    },
    dashboard: {
      sessionOverview: 'Session Overview',
      recommendations: 'Focus Tools',
      sessionControl: 'Session Control',
      sessionActive: (activity: string) => `Session active: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'End Session',
      error: 'Error:',
      connectionError: "Failed to connect with the PongJit AI. Please check your connection and API Key.",
      pomodoro: {
        work: 'Focus',
        short_break: 'Short Break',
        long_break: 'Long Break',
        start: 'Start',
        pause: 'Pause',
        reset: 'Reset',
      },
      focusFlow: {
        title: 'Focus Flow',
        description: 'An adaptive timer that suggests breaks based on your stress levels.',
        start_focus: 'Start Focus',
        session_complete: 'Focus Session Complete!',
        ai_recommendation: 'AI Recommendation',
        start_break: (minutes: number) => `Start ${minutes} Min Break`,
        skip_break: 'Skip Break & Start Next Focus',
        breathing_exercise: 'Try a Breathing Exercise',
        proactive_title: "High Stress Detected",
        proactive_take_break: "Take a 3 Min Break",
        proactive_continue: "Keep Going",
        proactive_fallback: "It looks like things are getting intense. Taking a short break now could help you come back stronger."
      }
    },
    bioSimulator: {
      title: 'Bio Simulator',
      heartRate: 'Heart Rate',
      stressLevel: 'Stress Level',
      low: 'Low', medium: 'Medium', high: 'High',
    },
    musicPlayer: {
      title: 'Bio-adaptive Soundscape',
      waiting: 'Waiting for bio-signals to compose...',
    },
    wellnessTip: {
      title: 'AI Insight',
      waiting: 'Start a session to receive insights.',
      waitingTitle: 'Awaiting analysis...',
      breathe: { in: 'Inhale', hold: 'Hold', out: 'Exhale' }
    },
    loading: { composing: 'AI is composing...', },
    training: {
      title: 'Breathing Training',
      description: 'Practice mindful breathing to lower stress and improve focus in real-time.',
      button: 'Start Training',
      regenerate: 'Regenerate',
      currentHr: 'Current HR',
      targetHr: 'Target HR',
      complete: 'Well done!',
      tryAgain: 'Try Again',
      feedbackError: 'Sorry, could not generate feedback at this time.',
      breathe: { in: 'Inhale', hold: 'Hold', out: 'Exhale' },
      modes: {
        breathing: 'Breathing',
        meditation: 'Meditation'
      },
      meditation: {
        title: 'Guided Meditation',
        description: 'Let the AI generate a personalized meditation script for calm or focus based on your state.',
        button: 'Generate Meditation',
        generating: 'Generating script...',
      }
    },
     play: {
      title: 'Living Zen Garden',
      description: 'Relax your breath and watch your garden and environment transform with your state of mind.',
      button: 'Nurture Garden',
      nurturing: 'Nurturing...',
      complete: 'Your garden has blossomed!',
      tryAgain: 'Nurture Again',
      feedbackError: 'Sorry, could not generate feedback.',
      feedbackTitle: 'A word from the keeper',
      performance: 'Growth',
    },
    insights: {
        title: 'Wellness Insights',
        clear: 'Clear History',
        noHistory: 'No session data yet. Try using the app and completing a session to see your history here.',
        tabs: {
            report: 'Report',
            log: 'Log',
            analytics: 'Analytics',
        },
        report: {
            title: 'AI Coach Wellness Report',
            generateButton: "Generate This Week's Report",
            generating: 'Analyzing your data...',
            summaryCardTitle: 'A Message From PongJit',
            error: 'Sorry, the report could not be generated at this time.',
            advanced_title: 'Advanced Analysis',
            advanced_button: 'Generate Deep Analysis',
            generating_advanced: 'Analyzing deep insights...',
            burnout_risk_title: 'Burnout Risk',
            comparative_analysis_title: 'Comparative Analysis',
            risk_levels: { low: 'Low', medium: 'Medium', high: 'High' },
        },
        metrics: {
            title: 'Performance Metrics',
            period: 'Period',
            sevenDays: 'Last 7 Days',
            thirtyDays: 'Last 30 Days',
            allTime: 'All Time',
            totalSessions: 'Total Sessions',
            avgStress: 'Avg. Stress',
            mostProductive: 'Most Relaxing Activity',
            mostStressful: 'Most Stressful Activity',
        },
        charts: {
            stressByTime: {
                title: 'Stress Level by Time of Day',
                morning: 'Morning',
                afternoon: 'Afternoon',
                evening: 'Evening',
            },
            insightEffectiveness: {
                title: 'Insight Type by Stress Level'
            },
            stressTrends: {
                title: 'Stress Trends by Activity',
            },
            insightDistribution: {
                title: 'Insight Type Distribution',
            },
            lifeEventCorrelation: {
                title: 'Life Event Correlation with Stress',
                y_axis_label: 'Average Stress Level',
            },
            noData: 'Not enough data for this chart.',
        },
        log: {
            title: 'Session Log',
            activity: 'Activity',
            date: 'Date',
            insight: 'Insight Received:',
        },
    },
    journal: {
      title: 'Thought Journal',
      description: "A private space to reflect. Write down what's on your mind, and let the AI offer a gentle perspective.",
      placeholder: "What's on your mind today?",
      button: 'Save & Analyze',
      loading: 'Analyzing your thoughts...',
      error: 'Could not analyze entry. Please try again.',
      pastEntries: 'Past Entries',
      noEntries: 'Your journal is empty. Write your first entry.',
      analysis: {
        title: 'AI Reflection',
        emotions: 'Key Emotions',
        summary: 'Summary',
        reflection: 'Gentle Reflection',
        affirmation: 'An Affirmation For You'
      },
      tags_label: 'Add tags (e.g., lack of sleep, exam, good things)',
      tags_placeholder: 'Add a tag...',
      voice_note_button: 'Record a Voice Note',
      text_note_button: 'Write a Text Note',
      recording: 'Recording...',
      record_again: 'Record Again',
      save_voice_note: 'Save & Analyze Voice Note',
      voice_analysis: {
        title: 'Voice Tone Analysis',
        tone: 'Detected Tone',
        observation: 'Key Observation'
      },
      error_speech_unsupported: "Speech recognition is not supported in your browser.",
      error_mic_denied: "Microphone access was denied or an error occurred.",
      error_no_speech: "Could not detect any speech in the recording. Please try again."
    },
    team: {
        title: 'Team Wellness Hub',
        description: "An administrative overview of your team's well-being to foster a supportive and healthy culture. All data is aggregated and anonymized.",
        generateButton: 'Generate Team Insights',
        generating: 'Analyzing team data...',
        error: 'Sorry, the team report could not be generated.',
        anonymity: 'All data is aggregated and anonymized to protect privacy.',
        pulse: {
            title: 'AI-Generated Pulse'
        },
        observation: {
            title: 'Strategic Observation'
        },
        roster: {
            title: 'Team Roster',
            name: 'Name',
            last_active: 'Last Active',
            status: 'Current Status',
            status_low: 'Calm',
            status_medium: 'Engaged',
            status_high: 'High Stress',
        },
        communication: {
            title: 'Team Communication',
            broadcast_button: 'Broadcast a Message',
            broadcast_title: 'Send a Message to Your Team',
            broadcast_prompt: 'Enter your message below, or generate an AI suggestion based on the latest report.',
            generate_suggestion: 'Suggest Message',
            send_broadcast: 'Send to Team',
            message_sent: 'Message sent successfully!',
            broadcast_placeholder: "Your message here...",
        },
        challenge: {
            title: 'Active Wellness Challenge',
            progress: 'Progress',
            set_new_challenge: 'Set New Challenge',
            generate_ideas: 'Generate Ideas',
            new_challenge_title: 'Set a New Wellness Challenge',
            challenge_name: 'Challenge Name',
            challenge_desc: 'Description',
            challenge_goal: 'Goal (e.g., 100)',
            challenge_unit: 'Unit (e.g., sessions)',
            save_challenge: 'Set as Active Challenge',
            cancel: 'Cancel',
            generating_ideas: 'Generating ideas...',
        },
        kpis: {
            title: 'Key Performance Indicators',
            morale: 'Team Morale',
            avg_stress: 'Avg. Stress Level',
            top_activity: 'Most Frequent Activity',
            active_users: 'Active Contributors',
            morale_levels: {
                high: 'Positive',
                medium: 'Stable',
                low: 'Needs Attention'
            },
        },
        charts: {
            stress_dist: 'Stress Level Distribution',
            stress_by_activity: 'Average Stress by Activity',
            sessions_by_day: 'Focus Sessions by Day of Week',
            sessions: 'sessions',
            day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        no_data: 'Not enough data to display. Encourage your team to log their sessions.'
    },
    coach: {
      title: 'Personal AI Coach',
      persona_name: 'PongJit',
      welcome_message: "Hello! I'm PongJit, your AI wellness coach. How can I help you today? Feel free to share what's on your mind.",
      placeholder: 'Type your message...',
      disclaimer: 'Disclaimer: I am an AI and not a medical or mental health professional. My advice is not a substitute for professional consultation.',
      system_instruction: "You are 'PongJit', an empathetic and encouraging AI wellness coach. Your role is to be a safe space for the user to vent feelings, explore thoughts, and receive positive, actionable advice. Be empathetic, ask questions to help the user explore their own thoughts, and offer gentle advice based on positive psychology principles like mindfulness, reframing, and setting small, achievable goals. Do not give medical advice or diagnoses. Keep the conversation concise and natural.",
      error_message: 'Sorry, I encountered an error. Please try again.'
    },
    spark: {
        title: 'Idea Spark',
        description: 'Overcome creative blocks with this AI tool. Enter your topic and choose a mode to get started.',
        topic_label: 'Enter your topic or problem',
        placeholder: 'e.g., "How to stay focused in the afternoon", "Ideas for a science project on climate change"...',
        button: 'Generate Ideas',
        loading: 'Sparking ideas...',
        error: 'Sorry, could not generate ideas at this time.',
        response_title: 'Here are some ideas:',
        modes: {
            brainstorm: {
                title: 'Brainstorm',
                description: 'Generate diverse and unexpected concepts.',
                system_instruction: "You are an AI brainstorming partner. Given a topic, generate a diverse list of 10 creative, unconventional, and thought-provoking ideas related to it. Output should be a simple list. Respond in the user's language."
            },
            questions: {
                title: 'Ask Questions',
                description: 'Explore the topic from new angles with insightful questions.',
                system_instruction: "You are an AI that generates insightful questions. Given a topic, ask 10 open-ended, probing questions that challenge assumptions and encourage deeper thinking about the topic. Output should be a simple list of questions. Respond in the user's language."
            },
            metaphors: {
                title: 'Metaphors',
                description: 'Understand complex concepts through creative analogies.',
                system_instruction: "You are an AI that creates powerful metaphors. Given a topic, generate 5 unique and descriptive metaphors or analogies that explain the topic in a new light. Output should be a simple list. Respond in the user's language."
            },
            roleplay: {
                title: 'Roleplay',
                description: 'Gain perspective by adopting different personas.',
                system_instruction: "You are an AI roleplaying assistant. Given a topic, create 3 short, distinct personas (e.g., 'a skeptical expert', 'a curious child', 'a frustrated user') and briefly describe how each would approach or view the topic. Output should be a list of personas with their perspectives. Respond in the user's language."
            }
        }
    },
    data: {
      title: 'My Data, My Rules',
      description: 'We believe in your privacy and data sovereignty. All data generated in PongJit is stored only in your browser. We cannot access or see your information.',
      dataStoredTitle: 'Data Stored On Your Device',
      sessions: 'Session Records',
      journalEntries: 'Journal Entries',
      reframeEntries: 'Reframe Entries',
      customMixes: 'Custom Mixes',
      userPreferences: 'User Preferences',
      actionsTitle: 'Actions',
      downloadDescription: 'Download all your session and journal data as a single JSON file.',
      downloadButton: 'Download My Data',
      deleteTitle: 'Danger Zone',
      deleteDescription: 'Permanently delete all of your session and journal data. This action cannot be undone.',
      deleteButton: 'Delete All Data',
      deleteConfirm: 'Are you sure you want to delete all data? This action cannot be undone.',
      deleteSuccess: 'All your data has been successfully deleted.'
    },
    reframe: {
        title: 'Thought Reframe',
        description: 'Challenge and change unhelpful thoughts with this CBT-based tool.',
        nav_label: 'Reframe',
        step1_title: '1. Identify a Stressful Thought',
        step1_prompt: 'What\'s on your mind? Write down a thought that is causing you stress or anxiety.',
        step1_placeholder: 'e.g., "I\'m going to fail this exam and my life will be ruined."',
        step1_button: 'Analyze Thought',
        step2_title: '2. Analyze & Challenge',
        step2_distortion_title: 'Identified Pattern',
        step2_questions_title: 'Challenging Questions',
        step3_title: '3. Reframe Your Thought',
        step3_prompt: 'Based on the analysis, here is a more balanced perspective suggested by the AI. Feel free to edit it to make it your own.',
        step3_placeholder: 'The AI will suggest a reframed thought here...',
        step3_button: 'Save Reframe',
        history_title: 'Your Reframe History',
        no_history: 'You haven\'t reframed any thoughts yet.',
        original_thought: 'Original Thought',
        reframed_thought: 'Reframed Thought',
        start_new: 'Reframe Another Thought',
        error: 'Sorry, the thought could not be analyzed. Please try again.',
        distortions: {
            catastrophizing: {
                name: 'Catastrophizing',
                description: 'Expecting the worst-case scenario without considering more likely outcomes.'
            },
        }
    },
    mixer: {
        title: 'Soundscape Mixer',
        description: 'Become your own sound engineer. Create and save your perfect ambient mix for focus, relaxation, or sleep.',
        availableSounds: 'Available Sounds',
        myMixes: 'My Mixes',
        saveMixTitle: 'Save Your Creation',
        mixNamePlaceholder: 'e.g., "Deep Focus Rain"',
        saveButton: 'Save Mix',
        noMixes: 'You have no saved mixes.',
        sound: {
            rain: 'Rain',
            forest: 'Forest',
            waves: 'Waves',
            cafe: 'Cafe',
            fire: 'Fire',
            wind: 'Wind',
            piano: 'Piano',
        }
    },
    sanctuary: {
      title: 'Sanctuary',
      description: 'An effortless, bio-adaptive space to restore calm and focus.',
      select_env: 'Select Environment',
      start_session: 'Begin Session',
      end_session: 'End Session',
      environments: {
          forest: 'Misty Pine Forest',
          beach: 'Sunset Beach',
          zen: 'Moonlit Zen Garden',
          meadow: 'Floating Flower Meadow'
      },
      breathing_guide: 'Follow the light to guide your breath.'
    },
    footer: {
      inspiredBy: 'Inspired by a project outline by students of Bunyawat Witthayalai School.',
      conceptual: 'This is a conceptual application and does not provide medical advice.',
      powered_by: 'Powered by the PongJitLLM cognitive model.'
    },
    login: {
      consent_label: 'I agree to the collection and storage of my data in the browser for a personalized experience.',
      error_fill_fields: 'Please fill out both name and email fields.',
      error_invalid_email: 'Please enter a valid email address.',
      error_consent: 'You must agree to the data collection to continue.',
      title: 'Welcome to <span class="accent-gradient-text">PongJit</span>',
      subtitle: 'Your personal AI for focus and well-being, powered by the advanced PongJitLLM model.',
      name_label: 'Name',
      name_placeholder: 'Your Name',
      email_label: 'Email',
      email_placeholder: 'your@email.com',
      continue_button: 'Continue',
      or_divider: 'OR',
      google_button: 'Continue with Google',
      facebook_button: 'Continue with Facebook',
      theme_label: 'Theme:',
      local_storage_note: 'This is a simulated login. Information is stored locally.'
    }
};

const th: typeof en = {
    header: {
      dashboard: 'โฟกัส',
      training: 'ฝึกสมาธิ',
      insights: 'ข้อมูลเชิงลึก',
      play: 'โซนเล่น',
      journal: 'สมุดบันทึก',
      team: 'ศูนย์ทีม',
      coach: 'โค้ช AI',
      spark: 'จุดประกาย',
      data: 'ข้อมูล',
      reframe: 'ปรับมุมมอง',
      mixer: 'มิกเซอร์',
      sanctuary: 'สถานศักดิ์สิทธิ์',
    },
    onboarding: {
      welcome: 'ยินดีต้อนรับสู่ ปองจิตต์',
      description: 'AI ส่วนตัวของคุณเพื่อสมาธิและความสุขภาวะ เรามาปรับแต่งประสบการณ์ของคุณกันก่อน',
      startSessionTitle: "วันนี้คุณจะโฟกัสกับอะไร?",
      placeholder: 'เช่น อ่านฟิสิกส์, เขียนโค้ดโปรเจกต์...',
      button: 'เริ่มเซสชั่น',
      activities: { study: 'เรียน', code: 'โค้ดดิ้ง', creative: 'สร้างสรรค์', other: 'อื่นๆ', },
      proposal: 'สร้างจากเค้าโครงโปรเจกต์โดยนักเรียนโรงเรียนบุญวาทย์วิทยาลัย',
      dailyQuote: {
        title: 'คำคมประจำวัน'
      },
      assessment: {
        title: "ปรับแต่งประสบการณ์ของคุณ",
        goal_q: "เป้าหมายหลักของคุณคืออะไร?",
        goal_options: {
            stress: "ลดความเครียด",
            focus: "เพิ่มสมาธิ",
            sleep: "นอนหลับดีขึ้น",
            general: "สุขภาวะโดยรวม"
        },
        sound_q: "บรรยากาศแบบไหนที่ช่วยให้คุณผ่อนคลาย?",
        sound_options: {
            nature: "เสียงธรรมชาติ",
            urban: "เสียงในเมือง",
            music: "ดนตรีสงบ",
            silent: "ความเงียบ"
        },
        complete_button: "เริ่มต้นใช้งาน",
        step: "ขั้นตอนที่",
        complete_title: "คุณพร้อมแล้ว!",
        complete_subtitle: "ประสบการณ์ของคุณถูกปรับแต่งให้เป็นส่วนตัวแล้ว",
      }
    },
    dashboard: {
      sessionOverview: 'ภาพรวมเซสชั่น',
      recommendations: 'เครื่องมือช่วยโฟกัส',
      sessionControl: 'แผงควบคุมเซสชั่น',
      sessionActive: (activity: string) => `กำลังทำ: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'สิ้นสุดเซสชั่น',
      error: 'ข้อผิดพลาด:',
      connectionError: "ไม่สามารถเชื่อมต่อกับ AI ของปองจิตต์ได้ โปรดตรวจสอบการเชื่อมต่อและ API Key ของคุณ",
      pomodoro: {
        work: 'รอบทำงาน',
        short_break: 'พักสั้น',
        long_break: 'พักยาว',
        start: 'เริ่มจับเวลา',
        pause: 'หยุดชั่วคราว',
        reset: 'รีเซ็ต',
      },
      focusFlow: {
        title: 'โฟกัสต่อเนื่อง',
        description: 'ตัวจับเวลาอัจฉริยะที่แนะนำการพักตามระดับความเครียดของคุณ',
        start_focus: 'เริ่มโฟกัส',
        session_complete: 'รอบโฟกัสเสร็จสมบูรณ์!',
        ai_recommendation: 'คำแนะนำจาก AI',
        start_break: (minutes: number) => `เริ่มพัก ${minutes} นาที`,
        skip_break: 'ข้ามการพัก & เริ่มรอบต่อไป',
        breathing_exercise: 'ลองฝึกการหายใจ',
        proactive_title: "ตรวจพบความเครียดสูง",
        proactive_take_break: "พัก 3 นาที",
        proactive_continue: "ทำต่อ",
        proactive_fallback: "ดูเหมือนว่าสถานการณ์กำลังเข้มข้น การพักสั้นๆ อาจช่วยให้คุณกลับมาทำต่อได้อย่างสดชื่นขึ้นนะครับ"
      }
    },
    bioSimulator: {
      title: 'แผงควบคุมชีวภาพ',
      heartRate: 'อัตราการเต้นของหัวใจ',
      stressLevel: 'ระดับความเครียด',
      low: 'ต่ำ', medium: 'กลาง', high: 'สูง',
    },
    musicPlayer: {
      title: 'เสียงประกอบชีวภาพ',
      waiting: 'กำลังรอสัญญาณชีพเพื่อสร้างเสียง...',
    },
    wellnessTip: {
      title: 'ข้อมูลเชิงลึก AI',
      waiting: 'เริ่มเซสชั่นเพื่อรับข้อมูลเชิงลึก',
      waitingTitle: 'กำลังรอการวิเคราะห์...',
      breathe: { in: 'หายใจเข้า', hold: 'กลั้น', out: 'หายใจออก' }
    },
    loading: { composing: 'AI กำลังประมวลผล...', },
    training: {
      title: 'ฝึกการหายใจ',
      description: 'ฝึกการหายใจอย่างมีสติเพื่อลดความเครียดและเพิ่มสมาธิแบบเรียลไทม์',
      button: 'เริ่มฝึก',
      regenerate: 'สร้างใหม่',
      currentHr: 'หัวใจเต้น',
      targetHr: 'เป้าหมาย',
      complete: 'เยี่ยมมาก!',
      tryAgain: 'ลองอีกครั้ง',
      feedbackError: 'ขออภัย ไม่สามารถสร้างคำแนะนำได้ในขณะนี้',
      breathe: { in: 'หายใจเข้า', hold: 'กลั้น', out: 'หายใจออก' },
      modes: {
        breathing: 'ฝึกหายใจ',
        meditation: 'สมาธินำ'
      },
      meditation: {
        title: 'ฝึกสมาธิพร้อมเสียงนำ',
        description: 'ให้ AI สร้างบทสมาธิที่เหมาะกับสภาวะของคุณเพื่อความสงบหรือการโฟกัส',
        button: 'สร้างบทสมาธิ',
        generating: 'กำลังสร้างบทสมาธิ...',
      }
    },
     play: {
      title: 'สวนเซนที่มีชีวิต',
      description: 'ผ่อนคลายลมหายใจของคุณและเฝ้าดูสภาพแวดล้อมและสวนของคุณเปลี่ยนแปลงตามสภาวะจิตใจของคุณ',
      button: 'เริ่มดูแลสวน',
      nurturing: 'กำลังดูแล...',
      complete: 'สวนของคุณเบ่งบานแล้ว!',
      tryAgain: 'ดูแลอีกครั้ง',
      feedbackError: 'ขออภัย ไม่สามารถสร้างคำแนะนำได้',
      feedbackTitle: 'คำจากผู้ดูแลสวน',
      performance: 'การเติบโต',
    },
    insights: {
        title: 'ข้อมูลเชิงลึกด้านสุขภาวะ',
        clear: 'ล้างประวัติ',
        noHistory: 'ยังไม่มีข้อมูลเซสชั่น ลองใช้แอปและจบเซสชั่นเพื่อดูบันทึกที่นี่',
        tabs: {
            report: 'รายงาน',
            log: 'บันทึก',
            analytics: 'วิเคราะห์',
        },
        report: {
            title: 'รายงานสุขภาวะโดยโค้ช AI',
            generateButton: 'สร้างรายงานสัปดาห์นี้',
            generating: 'กำลังวิเคราะห์ข้อมูลของคุณ...',
            summaryCardTitle: 'ข้อความจากปองจิตต์',
            error: 'ขออภัย, ไม่สามารถสร้างรายงานได้ในขณะนี้',
            advanced_title: 'การวิเคราะห์ขั้นสูง',
            advanced_button: 'สร้างการวิเคราะห์เชิงลึก',
            generating_advanced: 'กำลังวิเคราะห์ข้อมูลเชิงลึก...',
            burnout_risk_title: 'ความเสี่ยงภาวะหมดไฟ',
            comparative_analysis_title: 'การวิเคราะห์เปรียบเทียบ',
            risk_levels: { low: 'ต่ำ', medium: 'ปานกลาง', high: 'สูง' },
        },
        metrics: {
            title: 'ตัวชี้วัดประสิทธิภาพ',
            period: 'ช่วงเวลา',
            sevenDays: '7 วันล่าสุด',
            thirtyDays: '30 วันล่าสุด',
            allTime: 'ทั้งหมด',
            totalSessions: 'เซสชั่นทั้งหมด',
            avgStress: 'ความเครียดเฉลี่ย',
            mostProductive: 'กิจกรรมผ่อนคลายสุด',
            mostStressful: 'กิจกรรมเครียดสุด',
        },
        charts: {
            stressByTime: {
                title: 'ระดับความเครียดตามช่วงเวลา',
                morning: 'เช้า',
                afternoon: 'บ่าย',
                evening: 'เย็น',
            },
            insightEffectiveness: {
                title: 'ประเภทคำแนะนำตามระดับความเครียด'
            },
            stressTrends: {
                title: 'แนวโน้มความเครียดตามกิจกรรม',
            },
            insightDistribution: {
                title: 'การกระจายประเภทข้อมูลเชิงลึก',
            },
            lifeEventCorrelation: {
                title: 'ความสัมพันธ์ของเหตุการณ์ในชีวิตกับความเครียด',
                y_axis_label: 'ระดับความเครียดเฉลี่ย',
            },
            noData: 'ข้อมูลไม่เพียงพอสำหรับแผนภูมินี้',
        },
        log: {
            title: 'บันทึกเซสชั่น',
            activity: 'กิจกรรม',
            date: 'วันที่',
            insight: 'ข้อมูลเชิงลึกที่ได้รับ:',
        },
    },
    journal: {
      title: 'สมุดบันทึกความคิด',
      description: 'พื้นที่ส่วนตัวสำหรับทบทวนความคิด เขียนความในใจของคุณ แล้วให้ AI ช่วยสะท้อนมุมมองที่อ่อนโยน',
      placeholder: 'วันนี้มีอะไรอยู่ในใจบ้าง?',
      button: 'บันทึกและวิเคราะห์',
      loading: 'กำลังวิเคราะห์ความคิดของคุณ...',
      error: 'ไม่สามารถวิเคราะห์บันทึกได้ กรุณาลองใหม่',
      pastEntries: 'บันทึกที่ผ่านมา',
      noEntries: 'สมุดบันทึกของคุณยังว่างเปล่า เริ่มเขียนบันทึกแรกของคุณเลย',
      analysis: {
        title: 'ภาพสะท้อนจาก AI',
        emotions: 'อารมณ์หลัก',
        summary: 'บทสรุป',
        reflection: 'มุมมองที่อ่อนโยน',
        affirmation: 'คำยืนยันสำหรับคุณ'
      },
      tags_label: 'เพิ่มแท็ก (เช่น: นอนไม่พอ, สอบ, เรื่องดีๆ)',
      tags_placeholder: 'เพิ่มแท็ก...',
      voice_note_button: 'บันทึกเสียง',
      text_note_button: 'เขียนข้อความ',
      recording: 'กำลังบันทึก...',
      record_again: 'บันทึกอีกครั้ง',
      save_voice_note: 'บันทึกเสียงและวิเคราะห์',
      voice_analysis: {
        title: 'การวิเคราะห์น้ำเสียง',
        tone: 'น้ำเสียงที่ตรวจพบ',
        observation: 'ข้อสังเกตสำคัญ'
      },
      error_speech_unsupported: "เบราว์เซอร์ของคุณไม่รองรับการรู้จำเสียงพูด",
      error_mic_denied: "การเข้าถึงไมโครโฟนถูกปฏิเสธหรือเกิดข้อผิดพลาด",
      error_no_speech: "ตรวจไม่พบเสียงพูดในการบันทึก กรุณาลองใหม่"
    },
    team: {
        title: 'ศูนย์สุขภาวะของทีม',
        description: 'ภาพรวมสำหรับผู้ดูแลเกี่ยวกับสุขภาวะของทีม เพื่อส่งเสริมวัฒนธรรมองค์กรที่ดีและสนับสนุนทีมได้อย่างตรงจุด ข้อมูลทั้งหมดจะถูกรวบรวมและทำให้ไม่ระบุตัวตน',
        generateButton: 'สร้างข้อมูลเชิงลึกของทีม',
        generating: 'กำลังวิเคราะห์ข้อมูลทีม...',
        error: 'ขออภัย, ไม่สามารถสร้างรายงานทีมได้',
        anonymity: 'ข้อมูลทั้งหมดถูกรวบรวมและไม่ระบุตัวตนเพื่อปกป้องความเป็นส่วนตัว',
        pulse: {
            title: 'ชีพจรของทีมจาก AI'
        },
        observation: {
            title: 'ข้อสังเกตเชิงกลยุทธ์'
        },
        roster: {
            title: 'รายชื่อสมาชิกในทีม',
            name: 'ชื่อ',
            last_active: 'ใช้งานล่าสุด',
            status: 'สถานะปัจจุบัน',
            status_low: 'สงบ',
            status_medium: 'มีส่วนร่วม',
            status_high: 'เครียดสูง',
        },
        communication: {
            title: 'การสื่อสารในทีม',
            broadcast_button: 'ส่งข้อความถึงทีม',
            broadcast_title: 'ส่งข้อความถึงทีมของคุณ',
            broadcast_prompt: 'ป้อนข้อความของคุณด้านล่าง, หรือสร้างข้อความแนะนำจาก AI ตามรายงานล่าสุด',
            generate_suggestion: 'แนะนำข้อความ',
            send_broadcast: 'ส่งถึงทีม',
            message_sent: 'ส่งข้อความสำเร็จ!',
            broadcast_placeholder: "ข้อความของคุณ...",
        },
        challenge: {
            title: 'ภารกิจสุขภาวะปัจจุบัน',
            progress: 'ความคืบหน้า',
            set_new_challenge: 'ตั้งภารกิจใหม่',
            generate_ideas: 'สร้างไอเดีย',
            new_challenge_title: 'ตั้งภารกิจสุขภาวะใหม่',
            challenge_name: 'ชื่อภารกิจ',
            challenge_desc: 'คำอธิบาย',
            challenge_goal: 'เป้าหมาย (เช่น 100)',
            challenge_unit: 'หน่วย (เช่น เซสชั่น)',
            save_challenge: 'ตั้งเป็นภารกิจปัจจุบัน',
            cancel: 'ยกเลิก',
            generating_ideas: 'กำลังสร้างไอเดีย...',
        },
        kpis: {
            title: 'ตัวชี้วัดประสิทธิภาพหลัก',
            morale: 'ขวัญและกำลังใจ',
            avg_stress: 'ระดับความเครียดเฉลี่ย',
            top_activity: 'กิจกรรมที่ทำบ่อยที่สุด',
            active_users: 'สมาชิกที่ใช้งาน',
            morale_levels: {
                high: 'ดีเยี่ยม',
                medium: 'คงที่',
                low: 'ควรให้ความสนใจ'
            },
        },
        charts: {
            stress_dist: 'การกระจายระดับความเครียด',
            stress_by_activity: 'ความเครียดเฉลี่ยตามกิจกรรม',
            sessions_by_day: 'จำนวนเซสชั่นตามวันในสัปดาห์',
            sessions: 'เซสชั่น',
            day_names: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
        },
        no_data: 'ข้อมูลไม่เพียงพอที่จะแสดงผล ลองกระตุ้นให้ทีมของคุณบันทึกเซสชั่นการทำงาน'
    },
    coach: {
      title: 'โค้ช AI ส่วนตัว',
      persona_name: 'ปองจิตต์',
      welcome_message: 'สวัสดี! ฉันคือปองจิตต์, โค้ช AI เพื่อสุขภาวะของคุณ มีอะไรให้ช่วยไหม หรืออยากจะระบายอะไรให้ฟังก็ได้นะ',
      placeholder: 'พิมพ์ข้อความของคุณ...',
      disclaimer: 'โปรดทราบ: ฉันเป็น AI และไม่ใช่บุคลากรทางการแพทย์หรือผู้เชี่ยวชาญด้านสุขภาพจิต คำแนะนำของฉันไม่ได้มีไว้เพื่อทดแทนคำแนะนำจากผู้เชี่ยวชาญ',
      system_instruction: "คุณคือ 'ปองจิตต์', โค้ช AI ด้านสุขภาวะที่เข้าอกเข้าใจและให้กำลังใจ ตอบกลับเป็นภาษาไทยเสมอ บทบาทของคุณคือการเป็นพื้นที่ปลอดภัยให้ผู้ใช้ได้ระบายความรู้สึก, สำรวจความคิด, และรับคำแนะนำเชิงบวกที่นำไปใช้ได้จริง จงแสดงความเห็นอกเห็นใจ, ถามคำถามเพื่อช่วยให้ผู้ใช้สำรวจความคิดของตนเอง, และให้คำแนะนำที่อ่อนโยนโดยอิงตามหลักจิตวิทยาเชิงบวก เช่น การฝึกสติ, การปรับกรอบความคิด, และการตั้งเป้าหมายเล็กๆ ที่ทำได้จริง อย่าให้คำแนะนำทางการแพทย์หรือวินิจฉัยโรค รักษาบทสนทนาให้สั้นกระชับและเป็นธรรมชาติ",
      error_message: 'ขออภัย เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    },
    spark: {
        title: 'จุดประกายความคิด',
        description: 'เอาชนะความคิดที่ติดขัดด้วย AI สร้างสรรค์ ใส่หัวข้อของคุณแล้วเลือกโหมดเพื่อเริ่มต้น',
        topic_label: 'ใส่หัวข้อหรือปัญหาของคุณ',
        placeholder: 'เช่น "จะทำอย่างไรให้มีสมาธิมากขึ้นตอนบ่าย", "แนวคิดสำหรับโปรเจกต์วิทยาศาสตร์เรื่องการเปลี่ยนแปลงสภาพภูมิอากาศ"...',
        button: 'สร้างไอเดีย',
        loading: 'กำลังจุดประกาย...',
        error: 'ขออภัย ไม่สามารถสร้างไอเดียได้ในขณะนี้',
        response_title: 'นี่คือไอเดียบางส่วน:',
        modes: {
            brainstorm: {
                title: 'ระดมสมอง',
                description: 'สร้างแนวคิดที่หลากหลายและคาดไม่ถึง',
                system_instruction: "คุณคือคู่หูระดมสมอง AI เมื่อได้รับหัวข้อ ให้สร้างรายการแนวคิดที่สร้างสรรค์ ไม่ธรรมดา และกระตุ้นความคิดที่เกี่ยวข้อง 10 รายการ ผลลัพธ์ควรเป็นรายการง่ายๆ ตอบกลับเป็นภาษาของผู้ใช้"
            },
            questions: {
                title: 'ตั้งคำถาม',
                description: 'สำรวจหัวข้อจากมุมมองใหม่ๆ ด้วยคำถามที่น่าสนใจ',
                system_instruction: "คุณคือ AI ที่สร้างคำถามที่ลึกซึ้ง เมื่อได้รับหัวข้อ ให้ถามคำถามปลายเปิดที่ท้าทายสมมติฐานและกระตุ้นให้คิดลึกซึ้งยิ่งขึ้นเกี่ยวกับหัวข้อนั้น 10 ข้อ ผลลัพธ์ควรเป็นรายการคำถามง่ายๆ ตอบกลับเป็นภาษาของผู้ใช้"
            },
            metaphors: {
                title: 'อุปมาอุปไมย',
                description: 'ทำความเข้าใจแนวคิดที่ซับซ้อนผ่านการเปรียบเทียบที่สร้างสรรค์',
                system_instruction: "คุณคือ AI ที่สร้างอุปมาอุปไมยที่ทรงพลัง เมื่อได้รับหัวข้อ ให้สร้างอุปมาอุปไมยหรือการเปรียบเทียบที่ไม่ซ้ำใคร 5 แบบที่อธิบายหัวข้อในแง่มุมใหม่ ผลลัพธ์ควรเป็นรายการง่ายๆ ตอบกลับเป็นภาษาของผู้ใช้"
            },
            roleplay: {
                title: 'สวมบทบาท',
                description: 'สร้างมุมมองจากบทบาทสมมติเพื่อหาทางแก้ปัญหา',
                system_instruction: "คุณคือผู้ช่วยสวมบทบาท AI เมื่อได้รับหัวข้อ ให้สร้างบทบาทสมมติสั้นๆ 3 แบบที่แตกต่างกัน (เช่น 'ผู้เชี่ยวชาญที่น่าสงสัย', 'เด็กที่อยากรู้อยากเห็น', 'ผู้ใช้ที่หงุดหงิด') และอธิบายสั้นๆ ว่าแต่ละคนจะเข้าหาหรือมองหัวข้อนั้นอย่างไร ผลลัพธ์ควรเป็นรายการบทบาทพร้อมมุมมองของพวกเขา ตอบกลับเป็นภาษาของผู้ใช้"
            }
        }
    },
    data: {
      title: 'ข้อมูลของฉัน กฎของฉัน',
      description: 'เราเชื่อในความเป็นส่วนตัวและอำนาจอธิปไตยทางข้อมูลของคุณ ข้อมูลทั้งหมดที่สร้างขึ้นใน PongJit จะถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น เราไม่สามารถเข้าถึงหรือเห็นข้อมูลของคุณได้',
      dataStoredTitle: 'ข้อมูลที่จัดเก็บไว้ในเครื่องของคุณ',
      sessions: 'บันทึกเซสชั่น',
      journalEntries: 'บันทึกสมุดบันทึก',
      reframeEntries: 'บันทึกการปรับมุมมอง',
      customMixes: 'มิกซ์ที่สร้างเอง',
      userPreferences: 'การตั้งค่าผู้ใช้',
      actionsTitle: 'การดำเนินการ',
      downloadDescription: 'ดาวน์โหลดข้อมูลเซสชั่นและบันทึกทั้งหมดของคุณเป็นไฟล์ JSON ไฟล์เดียว',
      downloadButton: 'ดาวน์โหลดข้อมูลของฉัน',
      deleteTitle: 'โซนอันตราย',
      deleteDescription: 'ลบข้อมูลเซสชั่นและบันทึกทั้งหมดของคุณอย่างถาวร การกระทำนี้ไม่สามารถย้อนกลับได้',
      deleteButton: 'ลบข้อมูลทั้งหมด',
      deleteConfirm: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้',
      deleteSuccess: 'ข้อมูลทั้งหมดของคุณถูกลบเรียบร้อยแล้ว'
    },
    reframe: {
        title: 'ปรับมุมมองความคิด',
        description: 'ท้าทายและเปลี่ยนความคิดที่ไม่เป็นประโยชน์ด้วยเครื่องมือที่อิงหลักการ CBT',
        nav_label: 'ปรับมุมมอง',
        step1_title: '1. ระบุความคิดที่ทำให้เครียด',
        step1_prompt: 'ตอนนี้คุณกำลังคิดอะไรอยู่? เขียนความคิดที่ทำให้คุณเครียดหรือกังวล',
        step1_placeholder: 'เช่น "ฉันต้องสอบตกแน่ๆ แล้วชีวิตฉันจะพังพินาศ"',
        step1_button: 'วิเคราะห์ความคิด',
        step2_title: '2. วิเคราะห์และท้าทาย',
        step2_distortion_title: 'รูปแบบความคิดที่พบ',
        step2_questions_title: 'คำถามเพื่อท้าทายความคิด',
        step3_title: '3. ปรับมุมมองความคิดของคุณ',
        step3_prompt: 'จากผลการวิเคราะห์ AI ได้แนะนำมุมมองที่สมดุลมากขึ้น คุณสามารถแก้ไขเพื่อให้เป็นมุมมองของคุณเองได้',
        step3_placeholder: 'AI จะแนะนำความคิดที่ปรับมุมมองแล้วที่นี่...',
        step3_button: 'บันทึกมุมมองใหม่',
        history_title: 'ประวัติการปรับมุมมอง',
        no_history: 'คุณยังไม่เคยปรับมุมมองความคิด',
        original_thought: 'ความคิดดั้งเดิม',
        reframed_thought: 'มุมมองใหม่',
        start_new: 'ปรับมุมมองความคิดอื่น',
        error: 'ขออภัย ไม่สามารถวิเคราะห์ความคิดได้ กรุณาลองใหม่',
        distortions: {
            catastrophizing: {
                name: 'การคิดไปในแง่ร้ายที่สุด',
                description: 'การคาดหวังแต่สถานการณ์ที่เลวร้ายที่สุด โดยไม่พิจารณาผลลัพธ์ที่เป็นไปได้มากกว่า'
            },
        }
    },
     mixer: {
        title: 'เครื่องมือผสมเสียง',
        description: 'มาเป็นซาวด์เอนจิเนียร์ของคุณเอง สร้างและบันทึกมิกซ์เสียงที่สมบูรณ์แบบสำหรับสมาธิ, การผ่อนคลาย, หรือการนอนหลับ',
        availableSounds: 'เสียงที่มีให้เลือก',
        myMixes: 'มิกซ์ของฉัน',
        saveMixTitle: 'บันทึกผลงานของคุณ',
        mixNamePlaceholder: 'เช่น "เสียงฝนเพื่อสมาธิ"',
        saveButton: 'บันทึกมิกซ์',
        noMixes: 'คุณยังไม่มีมิกซ์ที่บันทึกไว้',
        sound: {
            rain: 'ฝน',
            forest: 'ป่า',
            waves: 'คลื่น',
            cafe: 'คาเฟ่',
            fire: 'กองไฟ',
            wind: 'ลม',
            piano: 'เปียโน',
        }
    },
    sanctuary: {
      title: 'สถานศักดิ์สิทธิ์',
      description: 'พื้นที่ที่ปรับเปลี่ยนตามร่างกาย เพื่อฟื้นฟูความสงบและสมาธิอย่างง่ายดาย',
      select_env: 'เลือกสภาพแวดล้อม',
      start_session: 'เริ่มเซสชัน',
      end_session: 'สิ้นสุดเซสชัน',
      environments: {
          forest: 'ป่าสนในสายหมอก',
          beach: 'ชายหาดยามอาทิตย์อัสดง',
          zen: 'สวนหินสไตล์เซนใต้แสงจันทร์',
          meadow: 'ทุ่งดอกไม้ลอยฟ้า'
      },
      breathing_guide: 'ตามแสงเพื่อนำทางการหายใจของคุณ'
    },
    footer: {
      inspiredBy: 'ได้รับแรงบันดาลใจจากเค้าโครงโปรเจกต์โดยนักเรียนโรงเรียนบุญวาทย์วิทยาลัย',
      conceptual: 'นี่เป็นแอปพลิเคชันเชิงแนวคิดและไม่ได้ให้คำแนะนำทางการแพทย์',
      powered_by: 'ขับเคลื่อนโดยโมเดลการรับรู้ PongJitLLM'
    },
    login: {
      consent_label: 'ฉันยินยอมให้เก็บและจัดเก็บข้อมูลของฉันในเบราว์เซอร์เพื่อประสบการณ์ที่เป็นส่วนตัว',
      error_fill_fields: 'กรุณากรอกชื่อและอีเมลให้ครบถ้วน',
      error_invalid_email: 'กรุณาใส่อีเมลที่ถูกต้อง',
      error_consent: 'คุณต้องยินยอมการเก็บข้อมูลเพื่อดำเนินการต่อ',
      title: 'ยินดีต้อนรับสู่ <span class="accent-gradient-text">ปองจิตต์</span>',
      subtitle: 'AI ส่วนตัวของคุณเพื่อสมาธิและความเป็นอยู่ที่ดี ขับเคลื่อนโดยโมเดล PongJitLLM ขั้นสูง',
      name_label: 'ชื่อ',
      name_placeholder: 'ชื่อของคุณ',
      email_label: 'อีเมล',
      email_placeholder: 'your@email.com',
      continue_button: 'ดำเนินการต่อ',
      or_divider: 'หรือ',
      google_button: 'ดำเนินการต่อด้วย Google',
      facebook_button: 'ดำเนินการต่อด้วย Facebook',
      theme_label: 'ธีม:',
      local_storage_note: 'นี่เป็นการเข้าสู่ระบบจำลอง ข้อมูลจะถูกเก็บไว้ในเครื่องเท่านั้น'
    }
};

const es: typeof en = {
    header: {
      dashboard: 'Foco',
      training: 'Entrenamiento',
      insights: 'Perspectivas',
      play: 'Zona de Juego',
      journal: 'Diario',
      team: 'Centro de Equipo',
      coach: 'Coach de IA',
      spark: 'Chispa',
      data: 'Datos',
      reframe: 'Replantear',
      mixer: 'Mezclador',
      sanctuary: 'Santuario',
    },
    onboarding: {
      welcome: 'Bienvenido a PongJit',
      description: "Tu IA personal para el enfoque y el bienestar. Primero, personalicemos tu experiencia.",
      startSessionTitle: "¿En qué te vas a concentrar hoy?",
      placeholder: 'p.ej., Leyendo física, Programando un proyecto...',
      button: 'Iniciar Sesión',
      activities: { study: 'Estudiar', code: 'Programar', creative: 'Trabajo Creativo', other: 'Otro', },
      proposal: 'Basado en un borrador de proyecto de los estudiantes de la Escuela Bunyawat Witthayalai.',
      dailyQuote: {
        title: 'Cita del Día'
      },
      assessment: {
        title: "Personaliza Tu Experiencia",
        goal_q: "¿Cuál es tu objetivo principal?",
        goal_options: {
            stress: "Reducir Estrés",
            focus: "Mejorar Enfoque",
            sleep: "Dormir Mejor",
            general: "Bienestar General"
        },
        sound_q: "¿Qué tipo de atmósfera te ayuda?",
        sound_options: {
            nature: "Sonidos de la Naturaleza",
            urban: "Ambiente Urbano",
            music: "Música Tranquila",
            silent: "Silencio"
        },
        complete_button: "Comenzar",
        step: "Paso",
        complete_title: "¡Todo listo!",
        complete_subtitle: "Tu experiencia ahora está personalizada.",
      }
    },
    dashboard: {
      sessionOverview: 'Resumen de la Sesión',
      recommendations: 'Herramientas de Enfoque',
      sessionControl: 'Control de la Sesión',
      sessionActive: (activity: string) => `Sesión activa: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'Finalizar Sesión',
      error: 'Error:',
      connectionError: "No se pudo conectar con la IA de PongJit. Por favor, comprueba tu conexión y tu clave de API.",
      pomodoro: {
        work: 'Enfoque',
        short_break: 'Descanso Corto',
        long_break: 'Descanso Largo',
        start: 'Iniciar',
        pause: 'Pausar',
        reset: 'Reiniciar',
      },
      focusFlow: {
        title: 'Flujo de Enfoque',
        description: 'Un temporizador adaptativo que sugiere descansos según tus niveles de estrés.',
        start_focus: 'Iniciar Enfoque',
        session_complete: '¡Sesión de Enfoque Completada!',
        ai_recommendation: 'Recomendación de la IA',
        start_break: (minutes: number) => `Iniciar Descanso de ${minutes} Min`,
        skip_break: 'Omitir Descanso y Empezar Siguiente Enfoque',
        breathing_exercise: 'Prueba un Ejercicio de Respiración',
        proactive_title: "Se Detectó Estrés Alto",
        proactive_take_break: "Tomar un Descanso de 3 Min",
        proactive_continue: "Seguir Adelante",
        proactive_fallback: "Parece que las cosas se están poniendo intensas. Tomar un breve descanso ahora podría ayudarte a volver con más fuerza."
      }
    },
    bioSimulator: {
      title: 'Simulador Biológico',
      heartRate: 'Frecuencia Cardíaca',
      stressLevel: 'Nivel de Estrés',
      low: 'Bajo', medium: 'Medio', high: 'Alto',
    },
    musicPlayer: {
      title: 'Paisaje Sonoro Bio-adaptativo',
      waiting: 'Esperando bio-señales para componer...',
    },
    wellnessTip: {
      title: 'Visión de la IA',
      waiting: 'Inicia una sesión para recibir perspectivas.',
      waitingTitle: 'Esperando análisis...',
      breathe: { in: 'Inhala', hold: 'Sostén', out: 'Exhala' }
    },
    loading: { composing: 'La IA está componiendo...', },
    training: {
      title: 'Entrenamiento de Respiración',
      description: 'Practica la respiración consciente para reducir el estrés y mejorar el enfoque en tiempo real.',
      button: 'Iniciar Entrenamiento',
      regenerate: 'Regenerar',
      currentHr: 'FC Actual',
      targetHr: 'FC Objetivo',
      complete: '¡Bien hecho!',
      tryAgain: 'Intentar de Nuevo',
      feedbackError: 'Lo siento, no se pudo generar la retroalimentación en este momento.',
      breathe: { in: 'Inhala', hold: 'Sostén', out: 'Exhala' },
      modes: {
        breathing: 'Respiración',
        meditation: 'Meditación'
      },
      meditation: {
        title: 'Meditación Guiada',
        description: 'Deja que la IA genere un guion de meditación personalizado para la calma o el enfoque según tu estado.',
        button: 'Generar Meditación',
        generating: 'Generando guion...',
      }
    },
     play: {
      title: 'Jardín Zen Viviente',
      description: 'Relaja tu respiración y observa cómo tu jardín y tu entorno se transforman con tu estado de ánimo.',
      button: 'Cuidar Jardín',
      nurturing: 'Cuidando...',
      complete: '¡Tu jardín ha florecido!',
      tryAgain: 'Cuidar de Nuevo',
      feedbackError: 'Lo siento, no se pudo generar la retroalimentación.',
      feedbackTitle: 'Una palabra del guardián',
      performance: 'Crecimiento',
    },
    insights: {
        title: 'Perspectivas de Bienestar',
        clear: 'Borrar Historial',
        noHistory: 'Aún no hay datos de sesión. Intenta usar la app y completar una sesión para ver tu historial aquí.',
        tabs: {
            report: 'Informe',
            log: 'Registro',
            analytics: 'Análisis',
        },
        report: {
            title: 'Informe de Bienestar del Coach de IA',
            generateButton: "Generar Informe de Esta Semana",
            generating: 'Analizando tus datos...',
            summaryCardTitle: 'Un Mensaje de PongJit',
            error: 'Lo siento, el informe no pudo ser generado en este momento.',
            advanced_title: 'Análisis Avanzado',
            advanced_button: 'Generar Análisis Profundo',
            generating_advanced: 'Analizando perspectivas profundas...',
            burnout_risk_title: 'Riesgo de Agotamiento',
            comparative_analysis_title: 'Análisis Comparativo',
            risk_levels: { low: 'Bajo', medium: 'Medio', high: 'Alto' },
        },
        metrics: {
            title: 'Métricas de Rendimiento',
            period: 'Período',
            sevenDays: 'Últimos 7 Días',
            thirtyDays: 'Últimos 30 Días',
            allTime: 'Todo el Tiempo',
            totalSessions: 'Sesiones Totales',
            avgStress: 'Estrés Promedio',
            mostProductive: 'Actividad Más Relajante',
            mostStressful: 'Actividad Más Estresante',
        },
        charts: {
            stressByTime: {
                title: 'Nivel de Estrés por Hora del Día',
                morning: 'Mañana',
                afternoon: 'Tarde',
                evening: 'Noche',
            },
            insightEffectiveness: {
                title: 'Tipo de Perspectiva por Nivel de Estrés'
            },
            stressTrends: {
                title: 'Tendencias de Estrés por Actividad',
            },
            insightDistribution: {
                title: 'Distribución de Tipos de Perspectiva',
            },
            lifeEventCorrelation: {
                title: 'Correlación de Eventos de Vida con Estrés',
                y_axis_label: 'Nivel de Estrés Promedio',
            },
            noData: 'No hay suficientes datos para este gráfico.',
        },
        log: {
            title: 'Registro de Sesiones',
            activity: 'Actividad',
            date: 'Fecha',
            insight: 'Perspectiva Recibida:',
        },
    },
    journal: {
      title: 'Diario de Pensamientos',
      description: "Un espacio privado para reflexionar. Escribe lo que tienes en mente y deja que la IA ofrezca una perspectiva amable.",
      placeholder: "¿Qué tienes en mente hoy?",
      button: 'Guardar y Analizar',
      loading: 'Analizando tus pensamientos...',
      error: 'No se pudo analizar la entrada. Por favor, inténtalo de nuevo.',
      pastEntries: 'Entradas Anteriores',
      noEntries: 'Tu diario está vacío. Escribe tu primera entrada.',
      analysis: {
        title: 'Reflexión de la IA',
        emotions: 'Emociones Clave',
        summary: 'Resumen',
        reflection: 'Reflexión Amable',
        affirmation: 'Una Afirmación Para Ti'
      },
      tags_label: 'Añadir etiquetas (p.ej., falta de sueño, examen, cosas buenas)',
      tags_placeholder: 'Añadir una etiqueta...',
      voice_note_button: 'Grabar una Nota de Voz',
      text_note_button: 'Escribir una Nota de Texto',
      recording: 'Grabando...',
      record_again: 'Grabar de Nuevo',
      save_voice_note: 'Guardar y Analizar Nota de Voz',
      voice_analysis: {
        title: 'Análisis de Tono de Voz',
        tone: 'Tono Detectado',
        observation: 'Observación Clave'
      },
      error_speech_unsupported: "El reconocimiento de voz no es compatible con tu navegador.",
      error_mic_denied: "Se denegó el acceso al micrófono o se produjo un error.",
      error_no_speech: "No se pudo detectar voz en la grabación. Por favor, inténtalo de nuevo."
    },
    team: {
        title: 'Panel de Bienestar del Equipo',
        description: "Una visión administrativa del bienestar del equipo para fomentar una cultura de apoyo y saludable. Todos los datos son agregados y anonimizados.",
        generateButton: 'Generar Perspectivas del Equipo',
        generating: 'Analizando datos del equipo...',
        error: 'Lo siento, el informe del equipo no pudo ser generado.',
        anonymity: 'Todos los datos son agregados y anonimizados para proteger la privacidad.',
        pulse: {
            title: 'Pulso Generado por IA'
        },
        observation: {
            title: 'Observación Estratégica'
        },
        roster: {
            title: 'Lista del Equipo',
            name: 'Nombre',
            last_active: 'Última Actividad',
            status: 'Estado Actual',
            status_low: 'Calmado',
            status_medium: 'Comprometido',
            status_high: 'Estrés Alto',
        },
        communication: {
            title: 'Comunicación del Equipo',
            broadcast_button: 'Transmitir un Mensaje',
            broadcast_title: 'Enviar un Mensaje a Tu Equipo',
            broadcast_prompt: 'Ingresa tu mensaje abajo, o genera una sugerencia de la IA basada en el último informe.',
            generate_suggestion: 'Sugerir Mensaje',
            send_broadcast: 'Enviar al Equipo',
            message_sent: '¡Mensaje enviado con éxito!',
            broadcast_placeholder: "Tu mensaje aquí...",
        },
        challenge: {
            title: 'Desafío de Bienestar Activo',
            progress: 'Progreso',
            set_new_challenge: 'Establecer Nuevo Desafío',
            generate_ideas: 'Generar Ideas',
            new_challenge_title: 'Establecer un Nuevo Desafío de Bienestar',
            challenge_name: 'Nombre del Desafío',
            challenge_desc: 'Descripción',
            challenge_goal: 'Meta (p.ej., 100)',
            challenge_unit: 'Unidad (p.ej., sesiones)',
            save_challenge: 'Establecer como Desafío Activo',
            cancel: 'Cancelar',
            generating_ideas: "Generando ideas...",
        },
        kpis: {
            title: 'Indicadores Clave de Rendimiento',
            morale: 'Moral del Equipo',
            avg_stress: 'Nivel de Estrés Promedio',
            top_activity: 'Actividad Más Frecuente',
            active_users: 'Colaboradores Activos',
            morale_levels: {
                high: 'Positiva',
                medium: 'Estable',
                low: 'Necesita Atención'
            },
        },
        charts: {
            stress_dist: 'Distribución del Nivel de Estrés',
            stress_by_activity: 'Estrés Promedio por Actividad',
            sessions_by_day: 'Sesiones de Foco por Día de la Semana',
            sessions: 'sesiones',
            day_names: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        },
        no_data: 'No hay suficientes datos para mostrar. Anima a tu equipo a registrar sus sesiones.'
    },
    coach: {
      title: 'Coach de IA Personal',
      persona_name: 'PongJit',
      welcome_message: "¡Hola! Soy PongJit, tu coach de bienestar de IA. ¿Cómo puedo ayudarte hoy? Siéntete libre de compartir lo que tienes en mente.",
      placeholder: 'Escribe tu mensaje...',
      disclaimer: 'Aviso: Soy una IA y no un profesional médico o de salud mental. Mi consejo no sustituye la consulta profesional.',
      system_instruction: "Eres 'PongJit', un coach de bienestar de IA empático y alentador. Tu rol es ser un espacio seguro para que el usuario desahogue sus sentimientos, explore sus pensamientos y reciba consejos positivos y prácticos. Sé empático, haz preguntas para ayudar al usuario a explorar sus propios pensamientos y ofrece consejos amables basados en principios de psicología positiva como la atención plena, la reestructuración y el establecimiento de metas pequeñas y alcanzables. No des consejos médicos ni diagnósticos. Mantén la conversación concisa y natural.",
      error_message: 'Lo siento, encontré un error. Por favor, inténtalo de nuevo.'
    },
    spark: {
        title: 'Chispa de Ideas',
        description: 'Supera los bloqueos creativos con esta herramienta de IA. Ingresa tu tema y elige un modo para comenzar.',
        topic_label: 'Ingresa tu tema o problema',
        placeholder: 'p.ej., "Cómo mantenerse enfocado por la tarde", "Ideas para un proyecto de ciencia sobre el cambio climático"...',
        button: 'Generar Ideas',
        loading: 'Encendiendo ideas...',
        error: 'Lo siento, no se pudieron generar ideas en este momento.',
        response_title: 'Aquí tienes algunas ideas:',
        modes: {
            brainstorm: {
                title: 'Lluvia de Ideas',
                description: 'Genera conceptos diversos e inesperados.',
                system_instruction: "Eres un compañero de lluvia de ideas de IA. Dado un tema, genera una lista diversa de 10 ideas creativas, no convencionales y que inviten a la reflexión relacionadas con él. La salida debe ser una lista simple. Responde en el idioma del usuario."
            },
            questions: {
                title: 'Hacer Preguntas',
                description: 'Explora el tema desde nuevos ángulos con preguntas perspicaces.',
                system_instruction: "Eres una IA que genera preguntas perspicaces. Dado un tema, haz 10 preguntas abiertas y de sondeo que desafíen las suposiciones y fomenten un pensamiento más profundo sobre el tema. La salida debe ser una lista simple de preguntas. Responde en el idioma del usuario."
            },
            metaphors: {
                title: 'Metáforas',
                description: 'Comprende conceptos complejos a través de analogías creativas.',
                system_instruction: "Eres una IA que crea metáforas poderosas. Dado un tema, genera 5 metáforas o analogías únicas y descriptivas que expliquen el tema bajo una nueva luz. La salida debe ser una lista simple. Responde en el idioma del usuario."
            },
            roleplay: {
                title: 'Juego de Roles',
                description: 'Gana perspectiva adoptando diferentes personajes.',
                system_instruction: "Eres un asistente de juego de roles de IA. Dado un tema, crea 3 personajes cortos y distintos (p.ej., 'un experto escéptico', 'un niño curioso', 'un usuario frustrado') y describe brevemente cómo cada uno abordaría o vería el tema. La salida debe ser una lista de personajes con sus perspectivas. Responde en el idioma del usuario."
            }
        }
    },
    data: {
      title: 'Mis Datos, Mis Reglas',
      description: 'Creemos en tu privacidad y soberanía de datos. Todos los datos generados en PongJit se almacenan solo en tu navegador. No podemos acceder ni ver tu información.',
      dataStoredTitle: 'Datos Almacenados en Tu Dispositivo',
      sessions: 'Registros de Sesión',
      journalEntries: 'Entradas de Diario',
      reframeEntries: 'Entradas de Replanteamiento',
      customMixes: 'Mezclas Personalizadas',
      userPreferences: 'Preferencias de Usuario',
      actionsTitle: 'Acciones',
      downloadDescription: 'Descarga todos tus datos de sesión y diario como un único archivo JSON.',
      downloadButton: 'Descargar Mis Datos',
      deleteTitle: 'Zona de Peligro',
      deleteDescription: 'Elimina permanentemente todos tus datos de sesión y diario. Esta acción no se puede deshacer.',
      deleteButton: 'Eliminar Todos los Datos',
      deleteConfirm: '¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.',
      deleteSuccess: 'Todos tus datos han sido eliminados con éxito.'
    },
    reframe: {
        title: 'Replantear Pensamiento',
        description: 'Desafía y cambia los pensamientos inútiles con esta herramienta basada en TCC.',
        nav_label: 'Replantear',
        step1_title: '1. Identifica un Pensamiento Estresante',
        step1_prompt: '¿Qué tienes en mente? Escribe un pensamiento que te esté causando estrés o ansiedad.',
        step1_placeholder: 'p.ej., "Voy a suspender este examen y mi vida se arruinará."',
        step1_button: 'Analizar Pensamiento',
        step2_title: '2. Analiza y Desafía',
        step2_distortion_title: 'Patrón Identificado',
        step2_questions_title: 'Preguntas Desafiantes',
        step3_title: '3. Replantea Tu Pensamiento',
        step3_prompt: 'Basado en el análisis, aquí tienes una perspectiva más equilibrada sugerida por la IA. Siéntete libre de editarla para hacerla tuya.',
        step3_placeholder: 'La IA sugerirá un pensamiento replanteado aquí...',
        step3_button: 'Guardar Replanteamiento',
        history_title: 'Tu Historial de Replanteamientos',
        no_history: 'Aún no has replanteado ningún pensamiento.',
        original_thought: 'Pensamiento Original',
        reframed_thought: 'Pensamiento Replanteado',
        start_new: 'Replantear Otro Pensamiento',
        error: 'Lo siento, el pensamiento no pudo ser analizado. Por favor, inténtalo de nuevo.',
        distortions: {
            catastrophizing: {
                name: 'Catastrofismo',
                description: 'Esperar el peor escenario posible sin considerar resultados más probables.'
            },
        }
    },
    mixer: {
        title: 'Mezclador de Paisajes Sonoros',
        description: 'Conviértete en tu propio ingeniero de sonido. Crea y guarda tu mezcla ambiental perfecta para concentrarte, relajarte o dormir.',
        availableSounds: 'Sonidos Disponibles',
        myMixes: 'Mis Mezclas',
        saveMixTitle: 'Guarda Tu Creación',
        mixNamePlaceholder: 'p.ej., "Lluvia para concentración profunda"',
        saveButton: 'Guardar Mezcla',
        noMixes: 'No tienes mezclas guardadas.',
        sound: {
            rain: 'Lluvia',
            forest: 'Bosque',
            waves: 'Olas',
            cafe: 'Cafetería',
            fire: 'Fuego',
            wind: 'Viento',
            piano: 'Piano',
        }
    },
    sanctuary: {
      title: 'Santuario',
      description: 'Un espacio bio-adaptativo sin esfuerzo para restaurar la calma y el enfoque.',
      select_env: 'Seleccionar Entorno',
      start_session: 'Comenzar Sesión',
      end_session: 'Finalizar Sesión',
      environments: {
          forest: 'Bosque de Pinos Nebuloso',
          beach: 'Playa al Atardecer',
          zen: 'Jardín Zen Iluminado por la Luna',
          meadow: 'Prado de Flores Flotante'
      },
      breathing_guide: 'Sigue la luz para guiar tu respiración.'
    },
    footer: {
      inspiredBy: 'Inspirado en un borrador de proyecto de los estudiantes de la Escuela Bunyawat Witthayalai.',
      conceptual: 'Esta es una aplicación conceptual y no proporciona consejo médico.',
      powered_by: 'Impulsado por el modelo cognitivo PongJitLLM.'
    },
    login: {
      consent_label: 'Acepto la recopilación y el almacenamiento de mis datos en el navegador para una experiencia personalizada.',
      error_fill_fields: 'Por favor, rellena los campos de nombre y correo electrónico.',
      error_invalid_email: 'Por favor, introduce una dirección de correo electrónico válida.',
      error_consent: 'Debes aceptar la recopilación de datos para continuar.',
      title: 'Bienvenido a <span class="accent-gradient-text">PongJit</span>',
      subtitle: 'Tu IA personal para el enfoque y el bienestar, impulsada por el avanzado modelo PongJitLLM.',
      name_label: 'Nombre',
      name_placeholder: 'Tu Nombre',
      email_label: 'Correo Electrónico',
      email_placeholder: 'tu@email.com',
      continue_button: 'Continuar',
      or_divider: 'O',
      google_button: 'Continuar con Google',
      facebook_button: 'Continuar con Facebook',
      theme_label: 'Tema:',
      local_storage_note: 'Este es un inicio de sesión simulado. La información se almacena localmente.'
    }
};

const ja: typeof en = {
    header: {
        dashboard: '集中',
        training: 'トレーニング',
        insights: 'インサイト',
        play: 'プレイゾーン',
        journal: 'ジャーナル',
        team: 'チームハブ',
        coach: 'AIコーチ',
        spark: 'スパーク',
        data: 'データ',
        reframe: 'リフレーム',
        mixer: 'ミキサー',
        sanctuary: 'サンクチュアリ',
    },
    onboarding: {
        welcome: 'PongJitへようこそ',
        description: '集中力とウェルビーイングのためのあなたのパーソナルAI。まず、あなたの体験をパーソナライズしましょう。',
        startSessionTitle: '今日は何に集中しますか？',
        placeholder: '例：物理学の読書、プロジェクトのコーディング...',
        button: 'セッションを開始',
        activities: { study: '勉強', code: 'コーディング', creative: 'クリエイティブワーク', other: 'その他' },
        proposal: 'Bunyawat Witthayalai Schoolの生徒によるプロジェクト概要に基づいています。',
        dailyQuote: {
            title: '今日の名言'
        },
        assessment: {
            title: '体験をパーソナライズ',
            goal_q: '主な目標は何ですか？',
            goal_options: {
                stress: 'ストレスを軽減',
                focus: '集中力を向上',
                sleep: '睡眠の改善',
                general: '総合的な幸福'
            },
            sound_q: 'どのような雰囲気があなたを助けますか？',
            sound_options: {
                nature: '自然の音',
                urban: '都会の環境音',
                music: '落ち着いた音楽',
                silent: '静寂'
            },
            complete_button: '始める',
            step: 'ステップ',
            complete_title: '準備完了です！',
            complete_subtitle: 'あなたの体験がパーソナライズされました。',
        }
    },
    dashboard: {
        sessionOverview: 'セッション概要',
        recommendations: '集中ツール',
        sessionControl: 'セッションコントロール',
        sessionActive: (activity: string) => `セッションアクティブ：<span class="font-bold text-[var(--accent-color)]">「${activity}」</span>`,
        endSession: 'セッションを終了',
        error: 'エラー：',
        connectionError: 'PongJit AIへの接続に失敗しました。接続とAPIキーを確認してください。',
        pomodoro: {
            work: '集中',
            short_break: '短い休憩',
            long_break: '長い休憩',
            start: '開始',
            pause: '一時停止',
            reset: 'リセット',
        },
        focusFlow: {
            title: 'フォーカスフロー',
            description: 'あなたのストレスレベルに基づいて休憩を提案する適応型タイマー。',
            start_focus: '集中を開始',
            session_complete: '集中セッション完了！',
            ai_recommendation: 'AIの推奨',
            start_break: (minutes: number) => `${minutes}分の休憩を開始`,
            skip_break: '休憩をスキップして次の集中へ',
            breathing_exercise: '呼吸法を試す',
            proactive_title: '高いストレスが検出されました',
            proactive_take_break: '3分間の休憩を取る',
            proactive_continue: '続行する',
            proactive_fallback: '状況が厳しくなっているようです。短い休憩を取ることで、より力強く再開できるかもしれません。',
        }
    },
    bioSimulator: {
        title: 'バイオシミュレーター',
        heartRate: '心拍数',
        stressLevel: 'ストレスレベル',
        low: '低い', medium: '普通', high: '高い',
    },
    musicPlayer: {
        title: 'バイオアダプティブサウンドスケープ',
        waiting: '生体信号を待って作曲中...',
    },
    wellnessTip: {
        title: 'AIインサイト',
        waiting: 'セッションを開始してインサイトを受け取ります。',
        waitingTitle: '分析を待っています...',
        breathe: { in: '吸って', hold: '止めて', out: '吐いて' }
    },
    loading: { composing: 'AIが作曲中...', },
    training: {
        title: '呼吸トレーニング',
        description: 'リアルタイムでストレスを軽減し、集中力を向上させるためにマインドフルな呼吸を練習します。',
        button: 'トレーニングを開始',
        regenerate: '再生成',
        currentHr: '現在の心拍数',
        targetHr: '目標心拍数',
        complete: 'お見事！',
        tryAgain: 'もう一度試す',
        feedbackError: '申し訳ありませんが、現時点ではフィードバックを生成できませんでした。',
        breathe: { in: '吸って', hold: '止めて', out: '吐いて' },
        modes: {
            breathing: '呼吸',
            meditation: '瞑想'
        },
        meditation: {
            title: 'ガイド付き瞑想',
            description: 'あなたの状態に基づいて、AIに落ち着きや集中のためのパーソナライズされた瞑想スクリプトを生成させましょう。',
            button: '瞑想を生成',
            generating: 'スクリプトを生成中...',
        }
    },
    play: {
        title: '生ける禅の庭',
        description: '呼吸をリラックスさせ、あなたの心の状態と共に庭や環境が変化するのを見てください。',
        button: '庭を育てる',
        nurturing: '育成中...',
        complete: 'あなたの庭が花開きました！',
        tryAgain: 'もう一度育てる',
        feedbackError: '申し訳ありません、フィードバックを生成できませんでした。',
        feedbackTitle: '庭師からの一言',
        performance: '成長',
    },
    insights: {
        title: 'ウェルネスインサイト',
        clear: '履歴を消去',
        noHistory: 'まだセッションデータがありません。アプリを使用してセッションを完了し、ここに履歴を表示してみてください。',
        tabs: {
            report: 'レポート',
            log: 'ログ',
            analytics: '分析',
        },
        report: {
            title: 'AIコーチウェルネスレポート',
            generateButton: '今週のレポートを生成',
            generating: 'データを分析中...',
            summaryCardTitle: 'PongJitからのメッセージ',
            error: '申し訳ありませんが、現時点ではレポートを生成できませんでした。',
            advanced_title: '高度な分析',
            advanced_button: '詳細分析を生成',
            generating_advanced: '詳細なインサイトを分析中...',
            burnout_risk_title: '燃え尽き症候群リスク',
            comparative_analysis_title: '比較分析',
            risk_levels: { low: '低い', medium: '中程度', high: '高い' },
        },
        metrics: {
            title: 'パフォーマンスメトリクス',
            period: '期間',
            sevenDays: '過去7日間',
            thirtyDays: '過去30日間',
            allTime: '全期間',
            totalSessions: '総セッション数',
            avgStress: '平均ストレス',
            mostProductive: '最もリラックスした活動',
            mostStressful: '最もストレスの多い活動',
        },
        charts: {
            stressByTime: {
                title: '時間帯別ストレスレベル',
                morning: '朝',
                afternoon: '昼',
                evening: '夜',
            },
            insightEffectiveness: {
                title: 'ストレスレベル別インサイトタイプ'
            },
            stressTrends: {
                title: '活動別ストレス傾向',
            },
            insightDistribution: {
                title: 'インサイトタイプの分布',
            },
            lifeEventCorrelation: {
                title: 'ライフイベントとストレスの相関関係',
                y_axis_label: '平均ストレスレベル',
            },
            noData: 'このチャートには十分なデータがありません。',
        },
        log: {
            title: 'セッションログ',
            activity: '活動',
            date: '日付',
            insight: '受け取ったインサイト：',
        },
    },
    journal: {
        title: '思考ジャーナル',
        description: '内省するためのプライベートな空間。心にあることを書き留め、AIに穏やかな視点を提供してもらいましょう。',
        placeholder: '今日は何を考えていますか？',
        button: '保存して分析',
        loading: 'あなたの思考を分析中...',
        error: 'エントリを分析できませんでした。もう一度お試しください。',
        pastEntries: '過去のエントリ',
        noEntries: 'ジャーナルは空です。最初のエントリを書きましょう。',
        analysis: {
            title: 'AIリフレクション',
            emotions: '主要な感情',
            summary: '要約',
            reflection: '穏やかなリフレクション',
            affirmation: 'あなたのためのアファメーション'
        },
        tags_label: 'タグを追加（例：睡眠不足、試験、良いこと）',
        tags_placeholder: 'タグを追加...',
        voice_note_button: '音声メモを録音',
        text_note_button: 'テキストメモを書く',
        recording: '録音中...',
        record_again: '再録音',
        save_voice_note: '音声メモを保存して分析',
        voice_analysis: {
            title: '声のトーン分析',
            tone: '検出されたトーン',
            observation: '主要な観察'
        },
        error_speech_unsupported: 'お使いのブラウザは音声認識をサポートしていません。',
        error_mic_denied: 'マイクへのアクセスが拒否されたか、エラーが発生しました。',
        error_no_speech: '録音で音声が検出されませんでした。もう一度お試しください。'
    },
    team: {
        title: 'チームウェルネスハブ',
        description: '支援的で健康的な文化を育むためのチームのウェルネスに関する管理者向け概要。すべてのデータは集計され、匿名化されています。',
        generateButton: 'チームインサイトを生成',
        generating: 'チームデータを分析中...',
        error: '申し訳ありません、チームレポートは生成できませんでした。',
        anonymity: 'すべてのデータはプライバシー保護のために集計され、匿名化されています。',
        pulse: {
            title: 'AI生成パルス'
        },
        observation: {
            title: '戦略的観察'
        },
        roster: {
            title: 'チーム名簿',
            name: '名前',
            last_active: '最終アクティブ',
            status: '現在のステータス',
            status_low: '穏やか',
            status_medium: '活動中',
            status_high: '高ストレス',
        },
        communication: {
            title: 'チームコミュニケーション',
            broadcast_button: 'メッセージをブロードキャスト',
            broadcast_title: 'チームにメッセージを送信',
            broadcast_prompt: '以下にメッセージを入力するか、最新のレポートに基づいてAIの提案を生成します。',
            generate_suggestion: 'メッセージを提案',
            send_broadcast: 'チームに送信',
            message_sent: 'メッセージが正常に送信されました！',
            broadcast_placeholder: 'ここにメッセージを入力...',
        },
        challenge: {
            title: 'アクティブなウェルネスチャレンジ',
            progress: '進捗',
            set_new_challenge: '新しいチャレンジを設定',
            generate_ideas: 'アイデアを生成',
            new_challenge_title: '新しいウェルネスチャレンジを設定',
            challenge_name: 'チャレンジ名',
            challenge_desc: '説明',
            challenge_goal: '目標（例：100）',
            challenge_unit: '単位（例：セッション）',
            save_challenge: 'アクティブなチャレンジとして設定',
            cancel: 'キャンセル',
            generating_ideas: 'アイデアを生成中...',
        },
        kpis: {
            title: '主要業績評価指標',
            morale: 'チームの士気',
            avg_stress: '平均ストレスレベル',
            top_activity: '最も頻繁な活動',
            active_users: 'アクティブな貢献者',
            morale_levels: {
                high: 'ポジティブ',
                medium: '安定',
                low: '注意が必要'
            },
        },
        charts: {
            stress_dist: 'ストレスレベルの分布',
            stress_by_activity: '活動別平均ストレス',
            sessions_by_day: '曜日別集中セッション',
            sessions: 'セッション',
            day_names: ['日', '月', '火', '水', '木', '金', '土'],
        },
        no_data: '表示するデータが不足しています。チームにセッションの記録を奨励してください。'
    },
    coach: {
        title: 'パーソナルAIコーチ',
        persona_name: 'ポングジット',
        welcome_message: 'こんにちは！私はあなたのAIウェルネスコーチ、ポングジットです。今日はどのようにお手伝いできますか？心にあることを何でもお話しください。',
        placeholder: 'メッセージを入力...',
        disclaimer: '免責事項：私はAIであり、医療専門家や精神保健の専門家ではありません。私のアドバイスは専門的な相談に代わるものではありません。',
        system_instruction: 'あなたは「ポングジット」という、共感的で励みになるAIウェルネスコーチです。あなたの役割は、ユーザーが感情を吐き出し、考えを探求し、ポジティブで実行可能なアドバイスを受け取るための安全な空間であることです。共感を示し、ユーザーが自身の考えを探求するのを助ける質問をし、マインドフルネス、リフレーミング、小さく達成可能な目標設定などのポジティブ心理学の原則に基づいた穏やかなアドバイスを提供してください。医療アドバイスや診断は行わないでください。会話は簡潔で自然に保ってください。',
        error_message: '申し訳ありません、エラーが発生しました。もう一度お試しください。'
    },
    spark: {
        title: 'アイデアスパーク',
        description: 'このAIツールで創造的な壁を乗り越えましょう。トピックを入力し、モードを選択して開始します。',
        topic_label: 'トピックまたは問題を入力してください',
        placeholder: '例：「午後に集中力を維持する方法」、「気候変動に関する科学プロジェクトのアイデア」...',
        button: 'アイデアを生成',
        loading: 'アイデアを発火中...',
        error: '申し訳ありません、現時点ではアイデアを生成できませんでした。',
        response_title: 'いくつかのアイデアはこちらです：',
        modes: {
            brainstorm: {
                title: 'ブレインストーミング',
                description: '多様で予期せぬコンセプトを生成します。',
                system_instruction: 'あなたはAIブレインストーミングパートナーです。与えられたトピックについて、創造的で型にはまらない、示唆に富む10個の多様なアイデアのリストを生成してください。出力は簡単なリスト形式にしてください。ユーザーの言語で応答してください。'
            },
            questions: {
                title: '質問する',
                description: '洞察に満ちた質問で新しい角度からトピックを探ります。',
                system_instruction: 'あなたは洞察に満ちた質問を生成するAIです。与えられたトピックについて、仮定に挑戦し、トピックに関するより深い思考を促す10個の自由回答形式の探求的な質問をしてください。出力は簡単な質問のリスト形式にしてください。ユーザーの言語で応答してください。'
            },
            metaphors: {
                title: 'メタファー',
                description: '創造的な類推を通じて複雑な概念を理解します。',
                system_instruction: 'あなたは強力なメタファーを作成するAIです。与えられたトピックについて、新しい視点でトピックを説明する5つのユニークで描写的なメタファーや類推を生成してください。出力は簡単なリスト形式にしてください。ユーザーの言語で応答してください。'
            },
            roleplay: {
                title: 'ロールプレイ',
                description: '異なるペルソナを採用して視点を得ます。',
                system_instruction: 'あなたはAIロールプレイングアシスタントです。与えられたトピックについて、3つの短く明確なペルソナ（例：「懐疑的な専門家」、「好奇心旺盛な子供」、「不満を持つユーザー」）を作成し、それぞれがトピックにどのようにアプローチまたは見るかを簡潔に説明してください。出力はペルソナとその視点のリスト形式にしてください。ユーザーの言語で応答してください。'
            }
        }
    },
    data: {
        title: '私のデータ、私のルール',
        description: '私たちはあなたのプライバシーとデータ主権を信じています。PongJitで生成されたすべてのデータは、あなたのブラウザにのみ保存されます。私たちはあなたの情報にアクセスしたり見たりすることはできません。',
        dataStoredTitle: 'デバイスに保存されているデータ',
        sessions: 'セッション記録',
        journalEntries: 'ジャーナルエントリ',
        reframeEntries: 'リフレームエントリ',
        customMixes: 'カスタムミックス',
        userPreferences: 'ユーザー設定',
        actionsTitle: 'アクション',
        downloadDescription: 'すべてのセッションとジャーナルデータを単一のJSONファイルとしてダウンロードします。',
        downloadButton: '私のデータをダウンロード',
        deleteTitle: '危険地帯',
        deleteDescription: 'すべてのセッションとジャーナルデータを完全に削除します。この操作は元に戻せません。',
        deleteButton: 'すべてのデータを削除',
        deleteConfirm: '本当にすべてのデータを削除しますか？この操作は元に戻せません。',
        deleteSuccess: 'すべてのデータが正常に削除されました。'
    },
    reframe: {
        title: '思考のリフレーム',
        description: 'CBTベースのこのツールで、役に立たない考えに挑戦し、変化させましょう。',
        nav_label: 'リフレーム',
        step1_title: '1. ストレスの多い思考を特定する',
        step1_prompt: '何を考えていますか？ストレスや不安を引き起こしている考えを書き留めてください。',
        step1_placeholder: '例：「この試験に落ちたら、私の人生は台無しになる」',
        step1_button: '思考を分析',
        step2_title: '2. 分析と挑戦',
        step2_distortion_title: '特定されたパターン',
        step2_questions_title: '挑戦的な質問',
        step3_title: '3. 思考をリフレームする',
        step3_prompt: '分析に基づいて、AIが提案するよりバランスの取れた視点です。自由に編集して自分のものにしてください。',
        step3_placeholder: 'AIがリフレームされた思考をここに提案します...',
        step3_button: 'リフレームを保存',
        history_title: 'リフレームの履歴',
        no_history: 'まだリフレームされた思考はありません。',
        original_thought: '元の思考',
        reframed_thought: 'リフレームされた思考',
        start_new: '別の思考をリフレームする',
        error: '申し訳ありません、思考を分析できませんでした。もう一度お試しください。',
        distortions: {
            catastrophizing: {
                name: '破局的思考',
                description: 'より可能性の高い結果を考慮せずに、最悪のシナリオを予測すること。'
            },
        }
    },
    mixer: {
        title: 'サウンドスケープミキサー',
        description: 'あなた自身のサウンドエンジニアになりましょう。集中、リラクゼーション、または睡眠のための完璧なアンビエントミックスを作成して保存します。',
        availableSounds: '利用可能なサウンド',
        myMixes: 'マイミックス',
        saveMixTitle: '作成を保存',
        mixNamePlaceholder: '例：「ディープフォーカスレイン」',
        saveButton: 'ミックスを保存',
        noMixes: '保存されたミックスはありません。',
        sound: {
            rain: '雨',
            forest: '森',
            waves: '波',
            cafe: 'カフェ',
            fire: '火',
            wind: '風',
            piano: 'ピアノ',
        }
    },
    sanctuary: {
        title: 'サンクチュアリ',
        description: '落ち着きと集中を取り戻すための、楽でバイオアダプティブな空間。',
        select_env: '環境を選択',
        start_session: 'セッションを開始',
        end_session: 'セッションを終了',
        environments: {
            forest: '霧深い松林',
            beach: '夕日のビーチ',
            zen: '月明かりの禅庭',
            meadow: '浮かぶ花の牧草地'
        },
        breathing_guide: '光に従って呼吸を導きます。'
    },
    footer: {
        inspiredBy: 'Bunyawat Witthayalai Schoolの生徒によるプロジェクト概要に触発されました。',
        conceptual: 'これは概念的なアプリケーションであり、医学的なアドバイスを提供するものではありません。',
        powered_by: 'PongJitLLM認知モデルを搭載しています。'
    },
    login: {
        consent_label: 'パーソナライズされた体験のために、ブラウザでのデータの収集と保存に同意します。',
        error_fill_fields: '名前とメールアドレスの両方を入力してください。',
        error_invalid_email: '有効なメールアドレスを入力してください。',
        error_consent: '続行するにはデータ収集に同意する必要があります。',
        title: '<span class="accent-gradient-text">PongJit</span>へようこそ',
        subtitle: '集中力とウェルビーイングのためのあなたのパーソナルAI、高度なPongJitLLMモデルを搭載。',
        name_label: '名前',
        name_placeholder: 'あなたの名前',
        email_label: 'メールアドレス',
        email_placeholder: 'your@email.com',
        continue_button: '続行',
        or_divider: 'または',
        google_button: 'Googleで続行',
        facebook_button: 'Facebookで続行',
        theme_label: 'テーマ：',
        local_storage_note: 'これはシミュレートされたログインです。情報はローカルに保存されます。'
    }
};

const fr: typeof en = {
    header: {
      dashboard: 'Focus',
      training: 'Entraînement',
      insights: 'Aperçus',
      play: 'Zone de jeu',
      journal: 'Journal',
      team: 'Hub d\'équipe',
      coach: 'Coach IA',
      spark: 'Étincelle',
      data: 'Données',
      reframe: 'Recadrer',
      mixer: 'Mixeur',
      sanctuary: 'Sanctuaire',
    },
    onboarding: {
      welcome: 'Bienvenue sur PongJit',
      description: "Votre IA personnelle pour la concentration et le bien-être. Personnalisons d'abord votre expérience.",
      startSessionTitle: "Sur quoi vous concentrez-vous aujourd'hui ?",
      placeholder: 'ex: Lire de la physique, Coder un projet...',
      button: 'Démarrer la session',
      activities: { study: 'Étudier', code: 'Coder', creative: 'Travail créatif', other: 'Autre' },
      proposal: 'Basé sur une ébauche de projet d\'étudiants de l\'école Bunyawat Witthayalai.',
      dailyQuote: {
        title: 'Citation du jour'
      },
      assessment: {
        title: "Personnalisez votre expérience",
        goal_q: "Quel est votre objectif principal ?",
        goal_options: {
            stress: "Réduire le stress",
            focus: "Améliorer la concentration",
            sleep: "Mieux dormir",
            general: "Bien-être général"
        },
        sound_q: "Quel type d'atmosphère vous aide ?",
        sound_options: {
            nature: "Sons de la nature",
            urban: "Ambiance urbaine",
            music: "Musique calme",
            silent: "Silence"
        },
        complete_button: "Commencer",
        step: "Étape",
        complete_title: "Vous êtes prêt !",
        complete_subtitle: "Votre expérience est maintenant personnalisée.",
      }
    },
    dashboard: {
      sessionOverview: 'Aperçu de la session',
      recommendations: 'Outils de concentration',
      sessionControl: 'Contrôle de la session',
      sessionActive: (activity: string) => `Session active : <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'Terminer la session',
      error: 'Erreur :',
      connectionError: "Échec de la connexion à l'IA de PongJit. Veuillez vérifier votre connexion et votre clé API.",
      pomodoro: {
        work: 'Concentration',
        short_break: 'Petite pause',
        long_break: 'Longue pause',
        start: 'Démarrer',
        pause: 'Pause',
        reset: 'Réinitialiser',
      },
      focusFlow: {
        title: 'Flux de concentration',
        description: 'Un minuteur adaptatif qui suggère des pauses en fonction de votre niveau de stress.',
        start_focus: 'Démarrer la concentration',
        session_complete: 'Session de concentration terminée !',
        ai_recommendation: 'Recommandation de l\'IA',
        start_break: (minutes: number) => `Commencer une pause de ${minutes} min`,
        skip_break: 'Passer la pause et commencer la prochaine concentration',
        breathing_exercise: 'Essayer un exercice de respiration',
        proactive_title: "Stress élevé détecté",
        proactive_take_break: "Prendre une pause de 3 min",
        proactive_continue: "Continuer",
        proactive_fallback: "Il semble que les choses deviennent intenses. Prendre une courte pause maintenant pourrait vous aider à revenir plus fort."
      }
    },
    bioSimulator: {
      title: 'Simulateur biologique',
      heartRate: 'Fréquence cardiaque',
      stressLevel: 'Niveau de stress',
      low: 'Bas', medium: 'Moyen', high: 'Élevé',
    },
    musicPlayer: {
      title: 'Paysage sonore bio-adaptatif',
      waiting: 'En attente des signaux biologiques pour composer...',
    },
    wellnessTip: {
      title: 'Aperçu de l\'IA',
      waiting: 'Démarrez une session pour recevoir des aperçus.',
      waitingTitle: 'En attente d\'analyse...',
      breathe: { in: 'Inspirez', hold: 'Retenez', out: 'Expirez' }
    },
    loading: { composing: 'L\'IA compose...', },
    training: {
      title: 'Entraînement respiratoire',
      description: 'Pratiquez la respiration consciente pour réduire le stress et améliorer la concentration en temps réel.',
      button: 'Démarrer l\'entraînement',
      regenerate: 'Régénérer',
      currentHr: 'FC actuelle',
      targetHr: 'FC cible',
      complete: 'Bien joué !',
      tryAgain: 'Réessayer',
      feedbackError: 'Désolé, impossible de générer un retour pour le moment.',
      breathe: { in: 'Inspirez', hold: 'Retenez', out: 'Expirez' },
      modes: {
        breathing: 'Respiration',
        meditation: 'Méditation'
      },
      meditation: {
        title: 'Méditation guidée',
        description: 'Laissez l\'IA générer un script de méditation personnalisé pour le calme ou la concentration en fonction de votre état.',
        button: 'Générer la méditation',
        generating: 'Génération du script...',
      }
    },
     play: {
      title: 'Jardin Zen vivant',
      description: 'Détendez votre respiration et regardez votre jardin et votre environnement se transformer avec votre état d\'esprit.',
      button: 'Nourrir le jardin',
      nurturing: 'Nourrissage...',
      complete: 'Votre jardin a fleuri !',
      tryAgain: 'Nourrir à nouveau',
      feedbackError: 'Désolé, impossible de générer des commentaires.',
      feedbackTitle: 'Un mot du gardien',
      performance: 'Croissance',
    },
    insights: {
        title: 'Aperçus du bien-être',
        clear: 'Effacer l\'historique',
        noHistory: 'Pas encore de données de session. Essayez d\'utiliser l\'application et de terminer une session pour voir votre historique ici.',
        tabs: {
            report: 'Rapport',
            log: 'Journal',
            analytics: 'Analyses',
        },
        report: {
            title: 'Rapport de bien-être du coach IA',
            generateButton: "Générer le rapport de cette semaine",
            generating: 'Analyse de vos données...',
            summaryCardTitle: 'Un message de PongJit',
            error: 'Désolé, le rapport n\'a pas pu être généré pour le moment.',
            advanced_title: 'Analyse avancée',
            advanced_button: 'Générer une analyse approfondie',
            generating_advanced: 'Analyse des aperçus approfondis...',
            burnout_risk_title: 'Risque d\'épuisement professionnel',
            comparative_analysis_title: 'Analyse comparative',
            risk_levels: { low: 'Faible', medium: 'Moyen', high: 'Élevé' },
        },
        metrics: {
            title: 'Métriques de performance',
            period: 'Période',
            sevenDays: '7 derniers jours',
            thirtyDays: '30 derniers jours',
            allTime: 'Tout le temps',
            totalSessions: 'Sessions totales',
            avgStress: 'Stress moyen',
            mostProductive: 'Activité la plus relaxante',
            mostStressful: 'Activité la plus stressante',
        },
        charts: {
            stressByTime: {
                title: 'Niveau de stress par moment de la journée',
                morning: 'Matin',
                afternoon: 'Après-midi',
                evening: 'Soir',
            },
            insightEffectiveness: {
                title: 'Type d\'aperçu par niveau de stress'
            },
            stressTrends: {
                title: 'Tendances du stress par activité',
            },
            insightDistribution: {
                title: 'Distribution des types d\'aperçus',
            },
            lifeEventCorrelation: {
                title: 'Corrélation des événements de la vie avec le stress',
                y_axis_label: 'Niveau de stress moyen',
            },
            noData: 'Pas assez de données pour ce graphique.',
        },
        log: {
            title: 'Journal de session',
            activity: 'Activité',
            date: 'Date',
            insight: 'Aperçu reçu :',
        },
    },
    journal: {
      title: 'Journal de pensées',
      description: "Un espace privé pour réfléchir. Notez ce qui vous préoccupe et laissez l'IA vous offrir une perspective douce.",
      placeholder: "Qu'avez-vous en tête aujourd'hui ?",
      button: 'Enregistrer et analyser',
      loading: 'Analyse de vos pensées...',
      error: 'Impossible d\'analyser l\'entrée. Veuillez réessayer.',
      pastEntries: 'Entrées précédentes',
      noEntries: 'Votre journal est vide. Rédigez votre première entrée.',
      analysis: {
        title: 'Réflexion de l\'IA',
        emotions: 'Émotions clés',
        summary: 'Résumé',
        reflection: 'Réflexion douce',
        affirmation: 'Une affirmation pour vous'
      },
      tags_label: 'Ajouter des tags (ex: manque de sommeil, examen, bonnes choses)',
      tags_placeholder: 'Ajouter un tag...',
      voice_note_button: 'Enregistrer une note vocale',
      text_note_button: 'Écrire une note texte',
      recording: 'Enregistrement...',
      record_again: 'Réenregistrer',
      save_voice_note: 'Enregistrer et analyser la note vocale',
      voice_analysis: {
        title: 'Analyse du ton de la voix',
        tone: 'Ton détecté',
        observation: 'Observation clé'
      },
      error_speech_unsupported: "La reconnaissance vocale n'est pas prise en charge par votre navigateur.",
      error_mic_denied: "L'accès au microphone a été refusé ou une erreur s'est produite.",
      error_no_speech: "Aucune parole n'a pu être détectée dans l'enregistrement. Veuillez réessayer."
    },
    team: {
        title: 'Hub de bien-être de l\'équipe',
        description: "Un aperçu administratif du bien-être de votre équipe pour favoriser une culture de soutien et de santé. Toutes les données sont agrégées et anonymisées.",
        generateButton: 'Générer des aperçus de l\'équipe',
        generating: 'Analyse des données de l\'équipe...',
        error: 'Désolé, le rapport d\'équipe n\'a pas pu être généré.',
        anonymity: 'Toutes les données sont agrégées et anonymisées pour protéger la confidentialité.',
        pulse: {
            title: 'Pouls généré par l\'IA'
        },
        observation: {
            title: 'Observation stratégique'
        },
        roster: {
            title: 'Liste de l\'équipe',
            name: 'Nom',
            last_active: 'Dernière activité',
            status: 'Statut actuel',
            status_low: 'Calme',
            status_medium: 'Engagé',
            status_high: 'Stress élevé',
        },
        communication: {
            title: 'Communication d\'équipe',
            broadcast_button: 'Diffuser un message',
            broadcast_title: 'Envoyer un message à votre équipe',
            broadcast_prompt: 'Entrez votre message ci-dessous, ou générez une suggestion de l\'IA basée sur le dernier rapport.',
            generate_suggestion: 'Suggérer un message',
            send_broadcast: 'Envoyer à l\'équipe',
            message_sent: 'Message envoyé avec succès !',
            broadcast_placeholder: "Votre message ici...",
        },
        challenge: {
            title: 'Défi bien-être actif',
            progress: 'Progression',
            set_new_challenge: 'Définir un nouveau défi',
            generate_ideas: 'Générer des idées',
            new_challenge_title: 'Définir un nouveau défi bien-être',
            challenge_name: 'Nom du défi',
            challenge_desc: 'Description',
            challenge_goal: 'Objectif (ex: 100)',
            challenge_unit: 'Unité (ex: sessions)',
            save_challenge: 'Définir comme défi actif',
            cancel: 'Annuler',
            generating_ideas: 'Génération d\'idées...',
        },
        kpis: {
            title: 'Indicateurs clés de performance',
            morale: 'Moral de l\'équipe',
            avg_stress: 'Niveau de stress moyen',
            top_activity: 'Activité la plus fréquente',
            active_users: 'Contributeurs actifs',
            morale_levels: {
                high: 'Positif',
                medium: 'Stable',
                low: 'Nécessite une attention'
            },
        },
        charts: {
            stress_dist: 'Distribution du niveau de stress',
            stress_by_activity: 'Stress moyen par activité',
            sessions_by_day: 'Sessions de concentration par jour de la semaine',
            sessions: 'sessions',
            day_names: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        },
        no_data: 'Pas assez de données à afficher. Encouragez votre équipe à enregistrer leurs sessions.'
    },
    coach: {
      title: 'Coach IA personnel',
      persona_name: 'PongJit',
      welcome_message: "Bonjour ! Je suis PongJit, votre coach de bien-être IA. Comment puis-je vous aider aujourd'hui ? N'hésitez pas à partager ce qui vous préoccupe.",
      placeholder: 'Tapez votre message...',
      disclaimer: 'Avertissement : Je suis une IA et non un professionnel de la santé ou de la santé mentale. Mes conseils ne remplacent pas une consultation professionnelle.',
      system_instruction: "Vous êtes 'PongJit', un coach de bien-être IA empathique et encourageant. Votre rôle est d'être un espace sûr pour que l'utilisateur puisse exprimer ses sentiments, explorer ses pensées et recevoir des conseils positifs et réalisables. Soyez empathique, posez des questions pour aider l'utilisateur à explorer ses propres pensées et offrez des conseils doux basés sur les principes de la psychologie positive comme la pleine conscience, le recadrage et la définition de petits objectifs réalisables. Ne donnez pas de conseils médicaux ni de diagnostics. Gardez la conversation concise et naturelle.",
      error_message: 'Désolé, j\'ai rencontré une erreur. Veuillez réessayer.'
    },
    spark: {
        title: 'Étincelle d\'idées',
        description: 'Surmontez les blocages créatifs avec cet outil IA. Entrez votre sujet et choisissez un mode pour commencer.',
        topic_label: 'Entrez votre sujet ou problème',
        placeholder: 'ex: "Comment rester concentré l\'après-midi", "Idées pour un projet scientifique sur le changement climatique"...',
        button: 'Générer des idées',
        loading: 'Étincelles d\'idées...',
        error: 'Désolé, impossible de générer des idées pour le moment.',
        response_title: 'Voici quelques idées :',
        modes: {
            brainstorm: {
                title: 'Brainstorming',
                description: 'Générez des concepts divers et inattendus.',
                system_instruction: "Vous êtes un partenaire de brainstorming IA. Étant donné un sujet, générez une liste diversifiée de 10 idées créatives, non conventionnelles et stimulantes liées à celui-ci. La sortie doit être une simple liste. Répondez dans la langue de l'utilisateur."
            },
            questions: {
                title: 'Poser des questions',
                description: 'Explorez le sujet sous de nouveaux angles avec des questions perspicaces.',
                system_instruction: "Vous êtes une IA qui génère des questions perspicaces. Étant donné un sujet, posez 10 questions ouvertes et approfondies qui remettent en question les hypothèses et encouragent une réflexion plus profonde sur le sujet. La sortie doit être une simple liste de questions. Répondez dans la langue de l'utilisateur."
            },
            metaphors: {
                title: 'Métaphores',
                description: 'Comprenez des concepts complexes grâce à des analogies créatives.',
                system_instruction: "Vous êtes une IA qui crée des métaphores puissantes. Étant donné un sujet, générez 5 métaphores ou analogies uniques et descriptives qui expliquent le sujet sous un nouveau jour. La sortie doit être une simple liste. Répondez dans la langue de l'utilisateur."
            },
            roleplay: {
                title: 'Jeu de rôle',
                description: 'Gagnez en perspective en adoptant différentes personnalités.',
                system_instruction: "Vous êtes un assistant de jeu de rôle IA. Étant donné un sujet, créez 3 personas courts et distincts (ex: 'un expert sceptique', 'un enfant curieux', 'un utilisateur frustré') et décrivez brièvement comment chacun aborderait ou verrait le sujet. La sortie doit être une liste de personas avec leurs perspectives. Répondez dans la langue de l'utilisateur."
            }
        }
    },
    data: {
      title: 'Mes données, mes règles',
      description: 'Nous croyons en votre vie privée et en votre souveraineté des données. Toutes les données générées dans PongJit sont stockées uniquement dans votre navigateur. Nous ne pouvons ni accéder ni voir vos informations.',
      dataStoredTitle: 'Données stockées sur votre appareil',
      sessions: 'Enregistrements de session',
      journalEntries: 'Entrées de journal',
      reframeEntries: 'Entrées de recadrage',
      customMixes: 'Mixages personnalisés',
      userPreferences: 'Préférences de l\'utilisateur',
      actionsTitle: 'Actions',
      downloadDescription: 'Téléchargez toutes vos données de session et de journal sous forme d\'un seul fichier JSON.',
      downloadButton: 'Télécharger mes données',
      deleteTitle: 'Zone de danger',
      deleteDescription: 'Supprimez définitivement toutes vos données de session et de journal. Cette action est irréversible.',
      deleteButton: 'Supprimer toutes les données',
      deleteConfirm: 'Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.',
      deleteSuccess: 'Toutes vos données ont été supprimées avec succès.'
    },
    reframe: {
        title: 'Recadrage de la pensée',
        description: 'Défiez et changez les pensées inutiles avec cet outil basé sur la TCC.',
        nav_label: 'Recadrer',
        step1_title: '1. Identifiez une pensée stressante',
        step1_prompt: 'Qu\'avez-vous en tête ? Notez une pensée qui vous cause du stress ou de l\'anxiété.',
        step1_placeholder: 'ex: "Je vais rater cet examen et ma vie sera ruinée."',
        step1_button: 'Analyser la pensée',
        step2_title: '2. Analysez et défiez',
        step2_distortion_title: 'Modèle identifié',
        step2_questions_title: 'Questions de défi',
        step3_title: '3. Recadrez votre pensée',
        step3_prompt: 'Sur la base de l\'analyse, voici une perspective plus équilibrée suggérée par l\'IA. N\'hésitez pas à la modifier pour vous l\'approprier.',
        step3_placeholder: 'L\'IA suggérera une pensée recadrée ici...',
        step3_button: 'Enregistrer le recadrage',
        history_title: 'Votre historique de recadrage',
        no_history: 'Vous n\'avez encore recadré aucune pensée.',
        original_thought: 'Pensée originale',
        reframed_thought: 'Pensée recadrée',
        start_new: 'Recadrer une autre pensée',
        error: 'Désolé, la pensée n\'a pas pu être analysée. Veuillez réessayer.',
        distortions: {
            catastrophizing: {
                name: 'Catastrophisme',
                description: 'S\'attendre au pire scénario sans considérer des résultats plus probables.'
            },
        }
    },
    mixer: {
        title: 'Mixeur de paysages sonores',
        description: 'Devenez votre propre ingénieur du son. Créez et enregistrez votre mixage d\'ambiance parfait pour la concentration, la relaxation ou le sommeil.',
        availableSounds: 'Sons disponibles',
        myMixes: 'Mes mixages',
        saveMixTitle: 'Enregistrez votre création',
        mixNamePlaceholder: 'ex: "Pluie de concentration profonde"',
        saveButton: 'Enregistrer le mixage',
        noMixes: 'Vous n\'avez aucun mixage enregistré.',
        sound: {
            rain: 'Pluie',
            forest: 'Forêt',
            waves: 'Vagues',
            cafe: 'Café',
            fire: 'Feu',
            wind: 'Vent',
            piano: 'Piano',
        }
    },
    sanctuary: {
      title: 'Sanctuaire',
      description: 'Un espace bio-adaptatif sans effort pour retrouver calme et concentration.',
      select_env: 'Sélectionner l\'environnement',
      start_session: 'Commencer la session',
      end_session: 'Terminer la session',
      environments: {
          forest: 'Forêt de pins brumeuse',
          beach: 'Plage au coucher du soleil',
          zen: 'Jardin zen au clair de lune',
          meadow: 'Prairie de fleurs flottante'
      },
      breathing_guide: 'Suivez la lumière pour guider votre respiration.'
    },
    footer: {
      inspiredBy: 'Inspiré par une ébauche de projet d\'étudiants de l\'école Bunyawat Witthayalai.',
      conceptual: 'Ceci est une application conceptuelle et ne fournit pas de conseils médicaux.',
      powered_by: 'Propulsé par le modèle cognitif PongJitLLM.'
    },
    login: {
      consent_label: 'J\'accepte la collecte et le stockage de mes données dans le navigateur pour une expérience personnalisée.',
      error_fill_fields: 'Veuillez remplir les champs nom et e-mail.',
      error_invalid_email: 'Veuillez entrer une adresse e-mail valide.',
      error_consent: 'Vous devez accepter la collecte de données pour continuer.',
      title: 'Bienvenue sur <span class="accent-gradient-text">PongJit</span>',
      subtitle: 'Votre IA personnelle pour la concentration et le bien-être, propulsée par le modèle avancé PongJitLLM.',
      name_label: 'Nom',
      name_placeholder: 'Votre nom',
      email_label: 'E-mail',
      email_placeholder: 'votre@email.com',
      continue_button: 'Continuer',
      or_divider: 'OU',
      google_button: 'Continuer avec Google',
      facebook_button: 'Continuer avec Facebook',
      theme_label: 'Thème :',
      local_storage_note: 'Ceci est une connexion simulée. Les informations sont stockées localement.'
    }
};

const de: typeof en = {
    header: {
      dashboard: 'Fokus',
      training: 'Training',
      insights: 'Einblicke',
      play: 'Spielzone',
      journal: 'Tagebuch',
      team: 'Team-Hub',
      coach: 'KI-Coach',
      spark: 'Funke',
      data: 'Daten',
      reframe: 'Umdenken',
      mixer: 'Mischer',
      sanctuary: 'Zufluchtsort',
    },
    onboarding: {
      welcome: 'Willkommen bei PongJit',
      description: "Ihre persönliche KI für Fokus und Wohlbefinden. Lassen Sie uns zuerst Ihre Erfahrung personalisieren.",
      startSessionTitle: "Worauf konzentrieren Sie sich heute?",
      placeholder: 'z.B. Physik lesen, ein Projekt programmieren...',
      button: 'Sitzung starten',
      activities: { study: 'Lernen', code: 'Programmieren', creative: 'Kreative Arbeit', other: 'Andere' },
      proposal: 'Basierend auf einem Projektentwurf von Schülern der Bunyawat Witthayalai Schule.',
      dailyQuote: {
        title: 'Zitat des Tages'
      },
      assessment: {
        title: "Personalisieren Sie Ihre Erfahrung",
        goal_q: "Was ist Ihr Hauptziel?",
        goal_options: {
            stress: "Stress reduzieren",
            focus: "Fokus verbessern",
            sleep: "Besser schlafen",
            general: "Allgemeines Wohlbefinden"
        },
        sound_q: "Welche Art von Atmosphäre hilft Ihnen?",
        sound_options: {
            nature: "Naturgeräusche",
            urban: "Städtisches Ambiente",
            music: "Ruhige Musik",
            silent: "Stille"
        },
        complete_button: "Loslegen",
        step: "Schritt",
        complete_title: "Sie sind fertig!",
        complete_subtitle: "Ihre Erfahrung ist jetzt personalisiert.",
      }
    },
    dashboard: {
      sessionOverview: 'Sitzungsübersicht',
      recommendations: 'Fokus-Werkzeuge',
      sessionControl: 'Sitzungssteuerung',
      sessionActive: (activity: string) => `Sitzung aktiv: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'Sitzung beenden',
      error: 'Fehler:',
      connectionError: "Verbindung zur PongJit-KI fehlgeschlagen. Bitte überprüfen Sie Ihre Verbindung und Ihren API-Schlüssel.",
      pomodoro: {
        work: 'Fokus',
        short_break: 'Kurze Pause',
        long_break: 'Lange Pause',
        start: 'Start',
        pause: 'Pause',
        reset: 'Zurücksetzen',
      },
      focusFlow: {
        title: 'Fokus-Fluss',
        description: 'Ein adaptiver Timer, der Pausen basierend auf Ihrem Stresslevel vorschlägt.',
        start_focus: 'Fokus starten',
        session_complete: 'Fokus-Sitzung abgeschlossen!',
        ai_recommendation: 'KI-Empfehlung',
        start_break: (minutes: number) => `${minutes}-minütige Pause starten`,
        skip_break: 'Pause überspringen & nächsten Fokus starten',
        breathing_exercise: 'Versuchen Sie eine Atemübung',
        proactive_title: "Hoher Stress erkannt",
        proactive_take_break: "Machen Sie eine 3-minütige Pause",
        proactive_continue: "Weitermachen",
        proactive_fallback: "Es scheint, als würde es intensiv werden. Eine kurze Pause könnte Ihnen helfen, gestärkt zurückzukommen."
      }
    },
    bioSimulator: {
      title: 'Bio-Simulator',
      heartRate: 'Herzfrequenz',
      stressLevel: 'Stresslevel',
      low: 'Niedrig', medium: 'Mittel', high: 'Hoch',
    },
    musicPlayer: {
      title: 'Bio-adaptive Klanglandschaft',
      waiting: 'Warte auf Bio-Signale zum Komponieren...',
    },
    wellnessTip: {
      title: 'KI-Einblick',
      waiting: 'Starten Sie eine Sitzung, um Einblicke zu erhalten.',
      waitingTitle: 'Warte auf Analyse...',
      breathe: { in: 'Einatmen', hold: 'Halten', out: 'Ausatmen' }
    },
    loading: { composing: 'KI komponiert...', },
    training: {
      title: 'Atemtraining',
      description: 'Üben Sie achtsames Atmen, um Stress abzubauen und den Fokus in Echtzeit zu verbessern.',
      button: 'Training starten',
      regenerate: 'Neu generieren',
      currentHr: 'Aktueller Puls',
      targetHr: 'Zielpuls',
      complete: 'Gut gemacht!',
      tryAgain: 'Erneut versuchen',
      feedbackError: 'Entschuldigung, Feedback konnte im Moment nicht generiert werden.',
      breathe: { in: 'Einatmen', hold: 'Halten', out: 'Ausatmen' },
      modes: {
        breathing: 'Atmung',
        meditation: 'Meditation'
      },
      meditation: {
        title: 'Geführte Meditation',
        description: 'Lassen Sie die KI ein personalisiertes Meditationsskript für Ruhe oder Fokus basierend auf Ihrem Zustand erstellen.',
        button: 'Meditation generieren',
        generating: 'Skript wird generiert...',
      }
    },
     play: {
      title: 'Lebender Zen-Garten',
      description: 'Entspannen Sie Ihren Atem und beobachten Sie, wie sich Ihr Garten und Ihre Umgebung mit Ihrem Geisteszustand verwandeln.',
      button: 'Garten pflegen',
      nurturing: 'Pflegen...',
      complete: 'Ihr Garten ist erblüht!',
      tryAgain: 'Erneut pflegen',
      feedbackError: 'Entschuldigung, es konnte kein Feedback generiert werden.',
      feedbackTitle: 'Ein Wort vom Gärtner',
      performance: 'Wachstum',
    },
    insights: {
        title: 'Wellness-Einblicke',
        clear: 'Verlauf löschen',
        noHistory: 'Noch keine Sitzungsdaten. Versuchen Sie, die App zu verwenden und eine Sitzung abzuschließen, um Ihren Verlauf hier zu sehen.',
        tabs: {
            report: 'Bericht',
            log: 'Protokoll',
            analytics: 'Analytik',
        },
        report: {
            title: 'KI-Coach Wellness-Bericht',
            generateButton: "Bericht dieser Woche generieren",
            generating: 'Analysiere deine Daten...',
            summaryCardTitle: 'Eine Nachricht von PongJit',
            error: 'Entschuldigung, der Bericht konnte im Moment nicht generiert werden.',
            advanced_title: 'Erweiterte Analyse',
            advanced_button: 'Tiefenanalyse generieren',
            generating_advanced: 'Analysiere tiefe Einblicke...',
            burnout_risk_title: 'Burnout-Risiko',
            comparative_analysis_title: 'Vergleichende Analyse',
            risk_levels: { low: 'Niedrig', medium: 'Mittel', high: 'Hoch' },
        },
        metrics: {
            title: 'Leistungsmetriken',
            period: 'Zeitraum',
            sevenDays: 'Letzte 7 Tage',
            thirtyDays: 'Letzte 30 Tage',
            allTime: 'Gesamte Zeit',
            totalSessions: 'Gesamte Sitzungen',
            avgStress: 'Durchschn. Stress',
            mostProductive: 'Entspannendste Aktivität',
            mostStressful: 'Stressigste Aktivität',
        },
        charts: {
            stressByTime: {
                title: 'Stresslevel nach Tageszeit',
                morning: 'Morgen',
                afternoon: 'Nachmittag',
                evening: 'Abend',
            },
            insightEffectiveness: {
                title: 'Einblickstyp nach Stresslevel'
            },
            stressTrends: {
                title: 'Stresstrends nach Aktivität',
            },
            insightDistribution: {
                title: 'Verteilung der Einblickstypen',
            },
            lifeEventCorrelation: {
                title: 'Korrelation von Lebensereignissen mit Stress',
                y_axis_label: 'Durchschnittliches Stresslevel',
            },
            noData: 'Nicht genügend Daten für dieses Diagramm.',
        },
        log: {
            title: 'Sitzungsprotokoll',
            activity: 'Aktivität',
            date: 'Datum',
            insight: 'Erhaltene Einsicht:',
        },
    },
    journal: {
      title: 'Gedankentagebuch',
      description: "Ein privater Raum zum Nachdenken. Schreiben Sie auf, was Ihnen auf dem Herzen liegt, und lassen Sie die KI eine sanfte Perspektive bieten.",
      placeholder: "Was geht Ihnen heute durch den Kopf?",
      button: 'Speichern & Analysieren',
      loading: 'Analysiere deine Gedanken...',
      error: 'Eintrag konnte nicht analysiert werden. Bitte versuchen Sie es erneut.',
      pastEntries: 'Vergangene Einträge',
      noEntries: 'Ihr Tagebuch ist leer. Schreiben Sie Ihren ersten Eintrag.',
      analysis: {
        title: 'KI-Reflexion',
        emotions: 'Schlüsselemotionen',
        summary: 'Zusammenfassung',
        reflection: 'Sanfte Reflexion',
        affirmation: 'Eine Affirmation für Sie'
      },
      tags_label: 'Tags hinzufügen (z.B. Schlafmangel, Prüfung, gute Dinge)',
      tags_placeholder: 'Tag hinzufügen...',
      voice_note_button: 'Sprachnotiz aufnehmen',
      text_note_button: 'Textnotiz schreiben',
      recording: 'Aufnahme...',
      record_again: 'Erneut aufnehmen',
      save_voice_note: 'Sprachnotiz speichern & analysieren',
      voice_analysis: {
        title: 'Stimmanalyse',
        tone: 'Erkannter Ton',
        observation: 'Schlüsselbeobachtung'
      },
      error_speech_unsupported: "Spracherkennung wird in Ihrem Browser nicht unterstützt.",
      error_mic_denied: "Der Zugriff auf das Mikrofon wurde verweigert oder ein Fehler ist aufgetreten.",
      error_no_speech: "In der Aufnahme konnte keine Sprache erkannt werden. Bitte versuchen Sie es erneut."
    },
    team: {
        title: 'Team-Wellness-Hub',
        description: "Ein administrativer Überblick über das Wohlbefinden Ihres Teams, um eine unterstützende und gesunde Kultur zu fördern. Alle Daten werden aggregiert und anonymisiert.",
        generateButton: 'Team-Einblicke generieren',
        generating: 'Analysiere Teamdaten...',
        error: 'Entschuldigung, der Teambericht konnte nicht generiert werden.',
        anonymity: 'Alle Daten werden aggregiert und anonymisiert, um die Privatsphäre zu schützen.',
        pulse: {
            title: 'KI-generierter Puls'
        },
        observation: {
            title: 'Strategische Beobachtung'
        },
        roster: {
            title: 'Teamliste',
            name: 'Name',
            last_active: 'Zuletzt aktiv',
            status: 'Aktueller Status',
            status_low: 'Ruhig',
            status_medium: 'Engagiert',
            status_high: 'Hoher Stress',
        },
        communication: {
            title: 'Teamkommunikation',
            broadcast_button: 'Nachricht senden',
            broadcast_title: 'Senden Sie eine Nachricht an Ihr Team',
            broadcast_prompt: 'Geben Sie Ihre Nachricht unten ein oder generieren Sie einen KI-Vorschlag basierend auf dem neuesten Bericht.',
            generate_suggestion: 'Nachricht vorschlagen',
            send_broadcast: 'An Team senden',
            message_sent: 'Nachricht erfolgreich gesendet!',
            broadcast_placeholder: "Ihre Nachricht hier...",
        },
        challenge: {
            title: 'Aktive Wellness-Herausforderung',
            progress: 'Fortschritt',
            set_new_challenge: 'Neue Herausforderung festlegen',
            generate_ideas: 'Ideen generieren',
            new_challenge_title: 'Eine neue Wellness-Herausforderung festlegen',
            challenge_name: 'Name der Herausforderung',
            challenge_desc: 'Beschreibung',
            challenge_goal: 'Ziel (z.B. 100)',
            challenge_unit: 'Einheit (z.B. Sitzungen)',
            save_challenge: 'Als aktive Herausforderung festlegen',
            cancel: 'Abbrechen',
            generating_ideas: 'Generiere Ideen...',
        },
        kpis: {
            title: 'Wichtige Leistungsindikatoren',
            morale: 'Team-Moral',
            avg_stress: 'Durchschn. Stresslevel',
            top_activity: 'Häufigste Aktivität',
            active_users: 'Aktive Mitwirkende',
            morale_levels: {
                high: 'Positiv',
                medium: 'Stabil',
                low: 'Benötigt Aufmerksamkeit'
            },
        },
        charts: {
            stress_dist: 'Verteilung des Stresslevels',
            stress_by_activity: 'Durchschnittlicher Stress nach Aktivität',
            sessions_by_day: 'Fokus-Sitzungen pro Wochentag',
            sessions: 'Sitzungen',
            day_names: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        },
        no_data: 'Nicht genügend Daten zur Anzeige. Ermutigen Sie Ihr Team, ihre Sitzungen zu protokollieren.'
    },
    coach: {
      title: 'Persönlicher KI-Coach',
      persona_name: 'PongJit',
      welcome_message: "Hallo! Ich bin PongJit, Ihr KI-Wellness-Coach. Wie kann ich Ihnen heute helfen? Fühlen Sie sich frei, mitzuteilen, was Ihnen auf dem Herzen liegt.",
      placeholder: 'Geben Sie Ihre Nachricht ein...',
      disclaimer: 'Haftungsausschluss: Ich bin eine KI und kein medizinischer oder psychologischer Fachmann. Mein Rat ist kein Ersatz für eine professionelle Beratung.',
      system_instruction: "Sie sind 'PongJit', ein empathischer und ermutigender KI-Wellness-Coach. Ihre Rolle ist es, ein sicherer Raum für den Benutzer zu sein, um Gefühle zu äußern, Gedanken zu erforschen und positive, umsetzbare Ratschläge zu erhalten. Seien Sie empathisch, stellen Sie Fragen, um dem Benutzer zu helfen, seine eigenen Gedanken zu erforschen, und geben Sie sanfte Ratschläge basierend auf positiven psychologischen Prinzipien wie Achtsamkeit, Umdeutung und dem Setzen kleiner, erreichbarer Ziele. Geben Sie keine medizinischen Ratschläge oder Diagnosen. Halten Sie das Gespräch kurz und natürlich.",
      error_message: 'Entschuldigung, ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    },
    spark: {
        title: 'Ideenfunke',
        description: 'Überwinden Sie kreative Blockaden mit diesem KI-Tool. Geben Sie Ihr Thema ein und wählen Sie einen Modus, um zu beginnen.',
        topic_label: 'Geben Sie Ihr Thema oder Problem ein',
        placeholder: 'z.B. "Wie man am Nachmittag konzentriert bleibt", "Ideen für ein Wissenschaftsprojekt zum Klimawandel"...',
        button: 'Ideen generieren',
        loading: 'Zünde Ideen...',
        error: 'Entschuldigung, Ideen konnten im Moment nicht generiert werden.',
        response_title: 'Hier sind einige Ideen:',
        modes: {
            brainstorm: {
                title: 'Brainstorming',
                description: 'Generieren Sie vielfältige und unerwartete Konzepte.',
                system_instruction: "Sie sind ein KI-Brainstorming-Partner. Generieren Sie zu einem bestimmten Thema eine vielfältige Liste von 10 kreativen, unkonventionellen und nachdenklich stimmenden Ideen. Die Ausgabe sollte eine einfache Liste sein. Antworten Sie in der Sprache des Benutzers."
            },
            questions: {
                title: 'Fragen stellen',
                description: 'Erkunden Sie das Thema aus neuen Blickwinkeln mit aufschlussreichen Fragen.',
                system_instruction: "Sie sind eine KI, die aufschlussreiche Fragen generiert. Stellen Sie zu einem bestimmten Thema 10 offene, bohrende Fragen, die Annahmen in Frage stellen und ein tieferes Nachdenken über das Thema fördern. Die Ausgabe sollte eine einfache Liste von Fragen sein. Antworten Sie in der Sprache des Benutzers."
            },
            metaphors: {
                title: 'Metaphern',
                description: 'Verstehen Sie komplexe Konzepte durch kreative Analogien.',
                system_instruction: "Sie sind eine KI, die kraftvolle Metaphern schafft. Generieren Sie zu einem bestimmten Thema 5 einzigartige und beschreibende Metaphern oder Analogien, die das Thema in einem neuen Licht erklären. Die Ausgabe sollte eine einfache Liste sein. Antworten Sie in der Sprache des Benutzers."
            },
            roleplay: {
                title: 'Rollenspiel',
                description: 'Gewinnen Sie Perspektive durch die Annahme verschiedener Rollen.',
                system_instruction: "Sie sind ein KI-Rollenspiel-Assistent. Erstellen Sie zu einem bestimmten Thema 3 kurze, unterschiedliche Personas (z.B. 'ein skeptischer Experte', 'ein neugieriges Kind', 'ein frustrierter Benutzer') und beschreiben Sie kurz, wie jede das Thema angehen oder betrachten würde. Die Ausgabe sollte eine Liste von Personas mit ihren Perspektiven sein. Antworten Sie in der Sprache des Benutzers."
            }
        }
    },
    data: {
      title: 'Meine Daten, meine Regeln',
      description: 'Wir glauben an Ihre Privatsphäre und Datensouveränität. Alle in PongJit generierten Daten werden nur in Ihrem Browser gespeichert. Wir können Ihre Informationen nicht einsehen oder darauf zugreifen.',
      dataStoredTitle: 'Auf Ihrem Gerät gespeicherte Daten',
      sessions: 'Sitzungsaufzeichnungen',
      journalEntries: 'Tagebucheinträge',
      reframeEntries: 'Umdeutungseinträge',
      customMixes: 'Benutzerdefinierte Mixe',
      userPreferences: 'Benutzereinstellungen',
      actionsTitle: 'Aktionen',
      downloadDescription: 'Laden Sie alle Ihre Sitzungs- und Tagebuchdaten als eine einzige JSON-Datei herunter.',
      downloadButton: 'Meine Daten herunterladen',
      deleteTitle: 'Gefahrenzone',
      deleteDescription: 'Löschen Sie dauerhaft alle Ihre Sitzungs- und Tagebuchdaten. Diese Aktion kann nicht rückgängig gemacht werden.',
      deleteButton: 'Alle Daten löschen',
      deleteConfirm: 'Sind Sie sicher, dass Sie alle Daten löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      deleteSuccess: 'Alle Ihre Daten wurden erfolgreich gelöscht.'
    },
    reframe: {
        title: 'Gedanken umdeuten',
        description: 'Fordern Sie hinderliche Gedanken mit diesem auf KVT basierenden Werkzeug heraus und ändern Sie sie.',
        nav_label: 'Umdeuten',
        step1_title: '1. Identifizieren Sie einen stressigen Gedanken',
        step1_prompt: 'Was geht Ihnen durch den Kopf? Schreiben Sie einen Gedanken auf, der Ihnen Stress oder Angst bereitet.',
        step1_placeholder: 'z.B. "Ich werde diese Prüfung nicht bestehen und mein Leben wird ruiniert sein."',
        step1_button: 'Gedanken analysieren',
        step2_title: '2. Analysieren & Herausfordern',
        step2_distortion_title: 'Erkanntes Muster',
        step2_questions_title: 'Herausfordernde Fragen',
        step3_title: '3. Deuten Sie Ihren Gedanken um',
        step3_prompt: 'Basierend auf der Analyse schlägt die KI eine ausgewogenere Perspektive vor. Fühlen Sie sich frei, sie zu bearbeiten und zu Ihrer eigenen zu machen.',
        step3_placeholder: 'Die KI wird hier einen umgedeuteten Gedanken vorschlagen...',
        step3_button: 'Umdeutung speichern',
        history_title: 'Ihr Umdeutungsverlauf',
        no_history: 'Sie haben noch keine Gedanken umgedeutet.',
        original_thought: 'Ursprünglicher Gedanke',
        reframed_thought: 'Umgedeuteter Gedanke',
        start_new: 'Einen anderen Gedanken umdeuten',
        error: 'Entschuldigung, der Gedanke konnte nicht analysiert werden. Bitte versuchen Sie es erneut.',
        distortions: {
            catastrophizing: {
                name: 'Katastrophisieren',
                description: 'Das Schlimmste erwarten, ohne wahrscheinlichere Ergebnisse zu berücksichtigen.'
            },
        }
    },
    mixer: {
        title: 'Klanglandschaft-Mischer',
        description: 'Werden Sie Ihr eigener Toningenieur. Erstellen und speichern Sie Ihren perfekten Ambient-Mix für Fokus, Entspannung oder Schlaf.',
        availableSounds: 'Verfügbare Klänge',
        myMixes: 'Meine Mixe',
        saveMixTitle: 'Speichern Sie Ihre Kreation',
        mixNamePlaceholder: 'z.B. "Tiefenfokus-Regen"',
        saveButton: 'Mix speichern',
        noMixes: 'Sie haben keine gespeicherten Mixe.',
        sound: {
            rain: 'Regen',
            forest: 'Wald',
            waves: 'Wellen',
            cafe: 'Café',
            fire: 'Feuer',
            wind: 'Wind',
            piano: 'Klavier',
        }
    },
    sanctuary: {
      title: 'Zufluchtsort',
      description: 'Ein müheloser, bio-adaptiver Raum zur Wiederherstellung von Ruhe und Fokus.',
      select_env: 'Umgebung auswählen',
      start_session: 'Sitzung beginnen',
      end_session: 'Sitzung beenden',
      environments: {
          forest: 'Nebliger Kiefernwald',
          beach: 'Sonnenuntergangsstrand',
          zen: 'Mondbeschienener Zen-Garten',
          meadow: 'Schwimmende Blumenwiese'
      },
      breathing_guide: 'Folgen Sie dem Licht, um Ihren Atem zu führen.'
    },
    footer: {
      inspiredBy: 'Inspiriert von einem Projektentwurf von Schülern der Bunyawat Witthayalai Schule.',
      conceptual: 'Dies ist eine konzeptionelle Anwendung und bietet keine medizinische Beratung.',
      powered_by: 'Angetrieben durch das kognitive Modell PongJitLLM.'
    },
    login: {
      consent_label: 'Ich stimme der Erhebung und Speicherung meiner Daten im Browser für eine personalisierte Erfahrung zu.',
      error_fill_fields: 'Bitte füllen Sie sowohl Namens- als auch E-Mail-Felder aus.',
      error_invalid_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      error_consent: 'Sie müssen der Datenerhebung zustimmen, um fortzufahren.',
      title: 'Willkommen bei <span class="accent-gradient-text">PongJit</span>',
      subtitle: 'Ihre persönliche KI für Fokus und Wohlbefinden, angetrieben durch das fortschrittliche PongJitLLM-Modell.',
      name_label: 'Name',
      name_placeholder: 'Ihr Name',
      email_label: 'E-Mail',
      email_placeholder: 'ihre@email.com',
      continue_button: 'Weiter',
      or_divider: 'ODER',
      google_button: 'Mit Google fortfahren',
      facebook_button: 'Mit Facebook fortfahren',
      theme_label: 'Thema:',
      local_storage_note: 'Dies ist eine simulierte Anmeldung. Informationen werden lokal gespeichert.'
    }
};

const pt: typeof en = {
    header: {
      dashboard: 'Foco',
      training: 'Treino',
      insights: 'Insights',
      play: 'Zona de Jogo',
      journal: 'Diário',
      team: 'Hub da Equipe',
      coach: 'Coach de IA',
      spark: 'Faísca',
      data: 'Dados',
      reframe: 'Ressignificar',
      mixer: 'Mixer',
      sanctuary: 'Santuário',
    },
    onboarding: {
      welcome: 'Bem-vindo ao PongJit',
      description: "Sua IA pessoal para foco e bem-estar. Vamos personalizar sua experiência primeiro.",
      startSessionTitle: "No que você está se concentrando hoje?",
      placeholder: 'ex: Lendo física, Codificando um projeto...',
      button: 'Iniciar Sessão',
      activities: { study: 'Estudar', code: 'Codificar', creative: 'Trabalho Criativo', other: 'Outro' },
      proposal: 'Baseado em um esboço de projeto de estudantes da Escola Bunyawat Witthayalai.',
      dailyQuote: {
        title: 'Citação do Dia'
      },
      assessment: {
        title: "Personalize Sua Experiência",
        goal_q: "Qual é o seu objetivo principal?",
        goal_options: {
            stress: "Reduzir o Estresse",
            focus: "Melhorar o Foco",
            sleep: "Dormir Melhor",
            general: "Bem-estar Geral"
        },
        sound_q: "Que tipo de atmosfera te ajuda?",
        sound_options: {
            nature: "Sons da Natureza",
            urban: "Ambiente Urbano",
            music: "Música Calma",
            silent: "Silêncio"
        },
        complete_button: "Começar",
        step: "Passo",
        complete_title: "Tudo pronto!",
        complete_subtitle: "Sua experiência agora está personalizada.",
      }
    },
    dashboard: {
      sessionOverview: 'Visão Geral da Sessão',
      recommendations: 'Ferramentas de Foco',
      sessionControl: 'Controle da Sessão',
      sessionActive: (activity: string) => `Sessão ativa: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'Encerrar Sessão',
      error: 'Erro:',
      connectionError: "Falha ao conectar com a IA do PongJit. Por favor, verifique sua conexão и sua chave de API.",
      pomodoro: {
        work: 'Foco',
        short_break: 'Pausa Curta',
        long_break: 'Pausa Longa',
        start: 'Iniciar',
        pause: 'Pausar',
        reset: 'Resetar',
      },
      focusFlow: {
        title: 'Fluxo de Foco',
        description: 'Um temporizador adaptativo que sugere pausas com base nos seus níveis de estresse.',
        start_focus: 'Iniciar Foco',
        session_complete: 'Sessão de Foco Concluída!',
        ai_recommendation: 'Recomendação da IA',
        start_break: (minutes: number) => `Iniciar pausa de ${minutes} min`,
        skip_break: 'Pular Pausa e Iniciar Próximo Foco',
        breathing_exercise: 'Tente um Exercício de Respiração',
        proactive_title: "Estresse Alto Detectado",
        proactive_take_break: "Fazer uma Pausa de 3 Min",
        proactive_continue: "Continuar",
        proactive_fallback: "Parece que as coisas estão ficando intensas. Fazer uma pequena pausa agora pode te ajudar a voltar mais forte."
      }
    },
    bioSimulator: {
      title: 'Simulador Biológico',
      heartRate: 'Frequência Cardíaca',
      stressLevel: 'Nível de Estresse',
      low: 'Baixo', medium: 'Médio', high: 'Alto',
    },
    musicPlayer: {
      title: 'Paisagem Sonora Bio-adaptativa',
      waiting: 'Aguardando bio-sinais para compor...',
    },
    wellnessTip: {
      title: 'Insight da IA',
      waiting: 'Inicie uma sessão para receber insights.',
      waitingTitle: 'Aguardando análise...',
      breathe: { in: 'Inspire', hold: 'Segure', out: 'Expire' }
    },
    loading: { composing: 'IA está compondo...', },
    training: {
      title: 'Treino de Respiração',
      description: 'Pratique a respiração consciente para diminuir o estresse e melhorar o foco em tempo real.',
      button: 'Iniciar Treino',
      regenerate: 'Gerar Novamente',
      currentHr: 'FC Atual',
      targetHr: 'FC Alvo',
      complete: 'Muito bem!',
      tryAgain: 'Tentar Novamente',
      feedbackError: 'Desculpe, não foi possível gerar o feedback no momento.',
      breathe: { in: 'Inspire', hold: 'Segure', out: 'Expire' },
      modes: {
        breathing: 'Respiração',
        meditation: 'Meditação'
      },
      meditation: {
        title: 'Meditação Guiada',
        description: 'Deixe a IA gerar um roteiro de meditação personalizado para calma ou foco com base no seu estado.',
        button: 'Gerar Meditação',
        generating: 'Gerando roteiro...',
      }
    },
     play: {
      title: 'Jardim Zen Vivo',
      description: 'Relaxe sua respiração e observe seu jardim e ambiente se transformarem com seu estado de espírito.',
      button: 'Cuidar do Jardim',
      nurturing: 'Cuidando...',
      complete: 'Seu jardim floresceu!',
      tryAgain: 'Cuidar Novamente',
      feedbackError: 'Desculpe, não foi possível gerar o feedback.',
      feedbackTitle: 'Uma palavra do guardião',
      performance: 'Crescimento',
    },
    insights: {
        title: 'Insights de Bem-Estar',
        clear: 'Limpar Histórico',
        noHistory: 'Ainda não há dados de sessão. Tente usar o aplicativo e completar uma sessão para ver seu histórico aqui.',
        tabs: {
            report: 'Relatório',
            log: 'Registro',
            analytics: 'Análise',
        },
        report: {
            title: 'Relatório de Bem-Estar do Coach de IA',
            generateButton: "Gerar Relatório Desta Semana",
            generating: 'Analisando seus dados...',
            summaryCardTitle: 'Uma Mensagem do PongJit',
            error: 'Desculpe, o relatório não pôde ser gerado no momento.',
            advanced_title: 'Análise Avançada',
            advanced_button: 'Gerar Análise Profunda',
            generating_advanced: 'Analisando insights profundos...',
            burnout_risk_title: 'Risco de Burnout',
            comparative_analysis_title: 'Análise Comparativa',
            risk_levels: { low: 'Baixo', medium: 'Médio', high: 'Alto' },
        },
        metrics: {
            title: 'Métricas de Desempenho',
            period: 'Período',
            sevenDays: 'Últimos 7 Dias',
            thirtyDays: 'Últimos 30 Dias',
            allTime: 'Todo o Período',
            totalSessions: 'Sessões Totais',
            avgStress: 'Estresse Médio',
            mostProductive: 'Atividade Mais Relaxante',
            mostStressful: 'Atividade Mais Estressante',
        },
        charts: {
            stressByTime: {
                title: 'Nível de Estresse por Hora do Dia',
                morning: 'Manhã',
                afternoon: 'Tarde',
                evening: 'Noite',
            },
            insightEffectiveness: {
                title: 'Tipo de Insight por Nível de Estresse'
            },
            stressTrends: {
                title: 'Tendências de Estresse por Atividade',
            },
            insightDistribution: {
                title: 'Distribuição de Tipos de Insight',
            },
            lifeEventCorrelation: {
                title: 'Correlação de Eventos da Vida com o Estresse',
                y_axis_label: 'Nível Médio de Estresse',
            },
            noData: 'Não há dados suficientes para este gráfico.',
        },
        log: {
            title: 'Registro de Sessões',
            activity: 'Atividade',
            date: 'Data',
            insight: 'Insight Recebido:',
        },
    },
    journal: {
      title: 'Diário de Pensamentos',
      description: "Um espaço privado para refletir. Anote o que está em sua mente e deixe a IA oferecer uma perspectiva gentil.",
      placeholder: "O que está em sua mente hoje?",
      button: 'Salvar e Analisar',
      loading: 'Analisando seus pensamentos...',
      error: 'Não foi possível analisar a entrada. Por favor, tente novamente.',
      pastEntries: 'Entradas Anteriores',
      noEntries: 'Seu diário está vazio. Escreva sua primeira entrada.',
      analysis: {
        title: 'Reflexão da IA',
        emotions: 'Emoções Chave',
        summary: 'Resumo',
        reflection: 'Reflexão Gentil',
        affirmation: 'Uma Afirmação Para Você'
      },
      tags_label: 'Adicionar tags (ex: falta de sono, exame, coisas boas)',
      tags_placeholder: 'Adicionar uma tag...',
      voice_note_button: 'Gravar uma Nota de Voz',
      text_note_button: 'Escrever uma Nota de Texto',
      recording: 'Gravando...',
      record_again: 'Gravar Novamente',
      save_voice_note: 'Salvar e Analisar Nota de Voz',
      voice_analysis: {
        title: 'Análise de Tom de Voz',
        tone: 'Tom Detectado',
        observation: 'Observação Chave'
      },
      error_speech_unsupported: "O reconhecimento de fala não é suportado no seu navegador.",
      error_mic_denied: "O acesso ao microfone foi negado ou ocorreu um erro.",
      error_no_speech: "Não foi possível detectar fala na gravação. Por favor, tente novamente."
    },
    team: {
        title: 'Hub de Bem-Estar da Equipe',
        description: "Uma visão geral administrativa do bem-estar da sua equipe para promover uma cultura de apoio e saudável. Todos os dados são agregados e anonimizados.",
        generateButton: 'Gerar Insights da Equipe',
        generating: 'Analisando dados da equipe...',
        error: 'Desculpe, o relatório da equipe não pôde ser gerado.',
        anonymity: 'Todos os dados são agregados e anonimizados para proteger a privacidade.',
        pulse: {
            title: 'Pulso Gerado por IA'
        },
        observation: {
            title: 'Observação Estratégica'
        },
        roster: {
            title: 'Lista da Equipe',
            name: 'Nome',
            last_active: 'Última Atividade',
            status: 'Status Atual',
            status_low: 'Calmo',
            status_medium: 'Engajado',
            status_high: 'Estresse Alto',
        },
        communication: {
            title: 'Comunicação da Equipe',
            broadcast_button: 'Transmitir uma Mensagem',
            broadcast_title: 'Enviar uma Mensagem para Sua Equipe',
            broadcast_prompt: 'Insira sua mensagem abaixo ou gere uma sugestão da IA com base no último relatório.',
            generate_suggestion: 'Sugerir Mensagem',
            send_broadcast: 'Enviar para a Equipe',
            message_sent: 'Mensagem enviada com sucesso!',
            broadcast_placeholder: "Sua mensagem aqui...",
        },
        challenge: {
            title: 'Desafio de Bem-Estar Ativo',
            progress: 'Progresso',
            set_new_challenge: 'Definir Novo Desafio',
            generate_ideas: 'Gerar Ideias',
            new_challenge_title: 'Definir um Novo Desafio de Bem-Estar',
            challenge_name: 'Nome do Desafio',
            challenge_desc: 'Descrição',
            challenge_goal: 'Meta (ex: 100)',
            challenge_unit: 'Unidade (ex: sessões)',
            save_challenge: 'Definir como Desafio Ativo',
            cancel: 'Cancelar',
            generating_ideas: 'Gerando ideias...',
        },
        kpis: {
            title: 'Indicadores Chave de Desempenho',
            morale: 'Moral da Equipe',
            avg_stress: 'Nível de Estresse Médio',
            top_activity: 'Atividade Mais Frequente',
            active_users: 'Contribuidores Ativos',
            morale_levels: {
                high: 'Positiva',
                medium: 'Estável',
                low: 'Precisa de Atenção'
            },
        },
        charts: {
            stress_dist: 'Distribuição do Nível de Estresse',
            stress_by_activity: 'Estresse Médio por Atividade',
            sessions_by_day: 'Sessões de Foco por Dia da Semana',
            sessions: 'sessões',
            day_names: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        },
        no_data: 'Não há dados suficientes para exibir. Incentive sua equipe a registrar suas sessões.'
    },
    coach: {
      title: 'Coach de IA Pessoal',
      persona_name: 'PongJit',
      welcome_message: "Olá! Sou PongJit, seu coach de bem-estar de IA. Como posso te ajudar hoje? Sinta-se à vontade para compartilhar o que está em sua mente.",
      placeholder: 'Digite sua mensagem...',
      disclaimer: 'Aviso: Sou uma IA e não um profissional médico ou de saúde mental. Meu conselho não substitui a consulta profissional.',
      system_instruction: "Você é 'PongJit', um coach de bem-estar de IA empático e encorajador. Seu papel é ser um espaço seguro para o usuário desabafar sentimentos, explorar pensamentos e receber conselhos positivos e práticos. Seja empático, faça perguntas para ajudar o usuário a explorar seus próprios pensamentos e ofereça conselhos gentis baseados em princípios de psicologia positiva como mindfulness, ressignificação e estabelecimento de metas pequenas e alcançáveis. Não dê conselhos médicos ou diagnósticos. Mantenha a conversa concisa e natural.",
      error_message: 'Desculpe, encontrei um erro. Por favor, tente novamente.'
    },
    spark: {
        title: 'Faísca de Ideias',
        description: 'Supere bloqueios criativos com esta ferramenta de IA. Insira seu tópico e escolha um modo para começar.',
        topic_label: 'Insira seu tópico ou problema',
        placeholder: 'ex: "Como manter o foco à tarde", "Ideias para um projeto de ciências sobre mudanças climáticas"...',
        button: 'Gerar Ideias',
        loading: 'Acendendo ideias...',
        error: 'Desculpe, não foi possível gerar ideias no momento.',
        response_title: 'Aqui estão algumas ideias:',
        modes: {
            brainstorm: {
                title: 'Brainstorm',
                description: 'Gere conceitos diversos e inesperados.',
                system_instruction: "Você é um parceiro de brainstorming de IA. Dado um tópico, gere uma lista diversa de 10 ideias criativas, não convencionais e instigantes relacionadas a ele. A saída deve ser uma lista simples. Responda no idioma do usuário."
            },
            questions: {
                title: 'Fazer Perguntas',
                description: 'Explore o tópico de novos ângulos com perguntas perspicazes.',
                system_instruction: "Você é uma IA que gera perguntas perspicazes. Dado um tópico, faça 10 perguntas abertas e investigativas que desafiem suposições e incentivem um pensamento mais profundo sobre o tópico. A saída deve ser uma lista simples de perguntas. Responda no idioma do usuário."
            },
            metaphors: {
                title: 'Metáforas',
                description: 'Entenda conceitos complexos através de analogias criativas.',
                system_instruction: "Você é uma IA que cria metáforas poderosas. Dado um tópico, gere 5 metáforas ou analogias únicas e descritivas que expliquem o tópico sob uma nova luz. A saída deve ser uma lista simples. Responda no idioma do usuário."
            },
            roleplay: {
                title: 'Roleplay',
                description: 'Ganhe perspectiva adotando diferentes personas.',
                system_instruction: "Você é um assistente de roleplay de IA. Dado um tópico, crie 3 personas curtas e distintas (ex: 'um especialista cético', 'uma criança curiosa', 'um usuário frustrado') e descreva brevemente como cada um abordaria ou veria o tópico. A saída deve ser uma lista de personas com suas perspectivas. Responda no idioma do usuário."
            }
        }
    },
    data: {
      title: 'Meus Dados, Minhas Regras',
      description: 'Acreditamos na sua privacidade e soberania de dados. Todos os dados gerados no PongJit são armazenados apenas no seu navegador. Não podemos acessar ou ver suas informações.',
      dataStoredTitle: 'Dados Armazenados no Seu Dispositivo',
      sessions: 'Registros de Sessão',
      journalEntries: 'Entradas de Diário',
      reframeEntries: 'Entradas de Ressignificação',
      customMixes: 'Mixagens Personalizadas',
      userPreferences: 'Preferências do Usuário',
      actionsTitle: 'Ações',
      downloadDescription: 'Baixe todos os seus dados de sessão e diário como um único arquivo JSON.',
      downloadButton: 'Baixar Meus Dados',
      deleteTitle: 'Zona de Perigo',
      deleteDescription: 'Exclua permanentemente todos os seus dados de sessão e diário. Esta ação não pode ser desfeita.',
      deleteButton: 'Excluir Todos os Dados',
      deleteConfirm: 'Você tem certeza de que deseja excluir todos os dados? Esta ação не pode ser desfeita.',
      deleteSuccess: 'Todos os seus dados foram excluídos com sucesso.'
    },
    reframe: {
        title: 'Ressignificar Pensamento',
        description: 'Desafie e mude pensamentos inúteis com esta ferramenta baseada em TCC.',
        nav_label: 'Ressignificar',
        step1_title: '1. Identifique um Pensamento Estressante',
        step1_prompt: 'O que está em sua mente? Anote um pensamento que está te causando estresse ou ansiedade.',
        step1_placeholder: 'ex: "Vou falhar neste exame e minha vida será arruinada."',
        step1_button: 'Analisar Pensamento',
        step2_title: '2. Analise e Desafie',
        step2_distortion_title: 'Padrão Identificado',
        step2_questions_title: 'Perguntas Desafiadoras',
        step3_title: '3. Ressignifique Seu Pensamento',
        step3_prompt: 'Com base na análise, aqui está uma perspectiva mais equilibrada sugerida pela IA. Sinta-se à vontade para editá-la para torná-la sua.',
        step3_placeholder: 'A IA sugerirá um pensamento ressignificado aqui...',
        step3_button: 'Salvar Ressignificação',
        history_title: 'Seu Histórico de Ressignificação',
        no_history: 'Você ainda não ressignificou nenhum pensamento.',
        original_thought: 'Pensamento Original',
        reframed_thought: 'Pensamento Ressignificado',
        start_new: 'Ressignificar Outro Pensamento',
        error: 'Desculpe, o pensamento não pôde ser analisado. Por favor, tente novamente.',
        distortions: {
            catastrophizing: {
                name: 'Catastrofização',
                description: 'Esperar o pior cenário possível sem considerar resultados mais prováveis.'
            },
        }
    },
    mixer: {
        title: 'Mixer de Paisagens Sonoras',
        description: 'Torne-se seu próprio engenheiro de som. Crie e salve sua mixagem ambiente perfeita para foco, relaxamento ou sono.',
        availableSounds: 'Sons Disponíveis',
        myMixes: 'Minhas Mixagens',
        saveMixTitle: 'Salve Sua Criação',
        mixNamePlaceholder: 'ex: "Chuva de Foco Profundo"',
        saveButton: 'Salvar Mixagem',
        noMixes: 'Você não tem mixagens salvas.',
        sound: {
            rain: 'Chuva',
            forest: 'Floresta',
            waves: 'Ondas',
            cafe: 'Cafeteria',
            fire: 'Fogo',
            wind: 'Vento',
            piano: 'Piano',
        }
    },
    sanctuary: {
      title: 'Santuário',
      description: 'Um espaço bio-adaptativo sem esforço para restaurar a calma e o foco.',
      select_env: 'Selecionar Ambiente',
      start_session: 'Iniciar Sessão',
      end_session: 'Encerrar Sessão',
      environments: {
          forest: 'Floresta de Pinheiros Nebulosa',
          beach: 'Praia ao Pôr do Sol',
          zen: 'Jardim Zen ao Luar',
          meadow: 'Prado de Flores Flutuante'
      },
      breathing_guide: 'Siga a luz para guiar sua respiração.'
    },
    footer: {
      inspiredBy: 'Inspirado em um esboço de projeto de estudantes da Escola Bunyawat Witthayalai.',
      conceptual: 'Este é um aplicativo conceitual e не fornece aconselhamento médico.',
      powered_by: 'Desenvolvido pelo modelo cognitivo PongJitLLM.'
    },
    login: {
      consent_label: 'Concordo com a coleta e armazenamento de meus dados no navegador para uma experiência personalizada.',
      error_fill_fields: 'Por favor, preencha os campos de nome e e-mail.',
      error_invalid_email: 'Por favor, insira um endereço de e-mail válido.',
      error_consent: 'Você deve concordar com a coleta de dados para continuar.',
      title: 'Bem-vindo ao <span class="accent-gradient-text">PongJit</span>',
      subtitle: 'Sua IA pessoal para foco e bem-estar, desenvolvida pelo avançado modelo PongJitLLM.',
      name_label: 'Nome',
      name_placeholder: 'Seu Nome',
      email_label: 'E-mail',
      email_placeholder: 'seu@email.com',
      continue_button: 'Continuar',
      or_divider: 'OU',
      google_button: 'Continuar com o Google',
      facebook_button: 'Continuar com o Facebook',
      theme_label: 'Tema:',
      local_storage_note: 'Este é um login simulado. As informações são armazenadas localmente.'
    }
};

const ru: typeof en = {
    header: {
      dashboard: 'Фокус',
      training: 'Тренировка',
      insights: 'Статистика',
      play: 'Игровая зона',
      journal: 'Дневник',
      team: 'Командный центр',
      coach: 'ИИ-тренер',
      spark: 'Искра',
      data: 'Данные',
      reframe: 'Переосмысление',
      mixer: 'Микшер',
      sanctuary: 'Святилище',
    },
    onboarding: {
      welcome: 'Добро пожаловать в PongJit',
      description: "Ваш личный ИИ для концентрации и благополучия. Давайте сначала настроим ваш опыт.",
      startSessionTitle: "На чем вы сегодня сосредоточены?",
      placeholder: 'например, Чтение физики, Кодирование проекта...',
      button: 'Начать сессию',
      activities: { study: 'Учеба', code: 'Кодирование', creative: 'Творческая работа', other: 'Другое' },
      proposal: 'Основано на проекте студентов школы Bunyawat Witthayalai.',
      dailyQuote: {
        title: 'Цитата дня'
      },
      assessment: {
        title: "Персонализируйте свой опыт",
        goal_q: "Какова ваша основная цель?",
        goal_options: {
            stress: "Снизить стресс",
            focus: "Улучшить концентрацию",
            sleep: "Лучше спать",
            general: "Общее благополучие"
        },
        sound_q: "Какая атмосфера вам помогает?",
        sound_options: {
            nature: "Звуки природы",
            urban: "Городская атмосфера",
            music: "Спокойная музыка",
            silent: "Тишина"
        },
        complete_button: "Начать",
        step: "Шаг",
        complete_title: "Все готово!",
        complete_subtitle: "Ваш опыт теперь персонализирован.",
      }
    },
    dashboard: {
      sessionOverview: 'Обзор сессии',
      recommendations: 'Инструменты для фокусировки',
      sessionControl: 'Управление сессией',
      sessionActive: (activity: string) => `Сессия активна: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'Завершить сессию',
      error: 'Ошибка:',
      connectionError: "Не удалось подключиться к ИИ PongJit. Пожалуйста, проверьте ваше соединение и API-ключ.",
      pomodoro: {
        work: 'Работа',
        short_break: 'Короткий перерыв',
        long_break: 'Длинный перерыв',
        start: 'Старт',
        pause: 'Пауза',
        reset: 'Сброс',
      },
      focusFlow: {
        title: 'Поток концентрации',
        description: 'Адаптивный таймер, который предлагает перерывы в зависимости от вашего уровня стресса.',
        start_focus: 'Начать концентрацию',
        session_complete: 'Сессия концентрации завершена!',
        ai_recommendation: 'Рекомендация ИИ',
        start_break: (minutes: number) => `Начать перерыв ${minutes} мин`,
        skip_break: 'Пропустить перерыв и начать следующую концентрацию',
        breathing_exercise: 'Попробуйте дыхательное упражнение',
        proactive_title: "Обнаружен высокий уровень стресса",
        proactive_take_break: "Сделать 3-минутный перерыв",
        proactive_continue: "Продолжить",
        proactive_fallback: "Кажется, ситуация накаляется. Короткий перерыв поможет вам вернуться с новыми силами."
      }
    },
    bioSimulator: {
      title: 'Био-симулятор',
      heartRate: 'Частота сердечных сокращений',
      stressLevel: 'Уровень стресса',
      low: 'Низкий', medium: 'Средний', high: 'Высокий',
    },
    musicPlayer: {
      title: 'Био-адаптивный звуковой ландшафт',
      waiting: 'Ожидание био-сигналов для создания музыки...',
    },
    wellnessTip: {
      title: 'Совет от ИИ',
      waiting: 'Начните сессию, чтобы получать советы.',
      waitingTitle: 'Ожидание анализа...',
      breathe: { in: 'Вдох', hold: 'Задержка', out: 'Выдох' }
    },
    loading: { composing: 'ИИ создает...', },
    training: {
      title: 'Дыхательная тренировка',
      description: 'Практикуйте осознанное дыхание, чтобы снизить стресс и улучшить концентрацию в реальном времени.',
      button: 'Начать тренировку',
      regenerate: 'Сгенерировать заново',
      currentHr: 'Текущий ЧСС',
      targetHr: 'Целевой ЧСС',
      complete: 'Отлично!',
      tryAgain: 'Попробовать снова',
      feedbackError: 'Извините, не удалось сгенерировать отзыв в данный момент.',
      breathe: { in: 'Вдох', hold: 'Задержка', out: 'Выдох' },
      modes: {
        breathing: 'Дыхание',
        meditation: 'Медитация'
      },
      meditation: {
        title: 'Управляемая медитация',
        description: 'Позвольте ИИ сгенерировать персонализированный сценарий медитации для успокоения или концентрации в зависимости от вашего состояния.',
        button: 'Сгенерировать медитацию',
        generating: 'Генерация сценария...',
      }
    },
     play: {
      title: 'Живой дзен-сад',
      description: 'Расслабьте дыхание и наблюдайте, как ваш сад и окружение меняются вместе с вашим состоянием ума.',
      button: 'Ухаживать за садом',
      nurturing: 'Уход...',
      complete: 'Ваш сад расцвел!',
      tryAgain: 'Ухаживать снова',
      feedbackError: 'Извините, не удалось сгенерировать отзыв.',
      feedbackTitle: 'Слово от хранителя',
      performance: 'Рост',
    },
    insights: {
        title: 'Статистика благополучия',
        clear: 'Очистить историю',
        noHistory: 'Пока нет данных о сессиях. Попробуйте использовать приложение и завершить сессию, чтобы увидеть свою историю здесь.',
        tabs: {
            report: 'Отчет',
            log: 'Журнал',
            analytics: 'Аналитика',
        },
        report: {
            title: 'Отчет о благополучии от ИИ-тренера',
            generateButton: "Сгенерировать отчет за эту неделю",
            generating: 'Анализ ваших данных...',
            summaryCardTitle: 'Сообщение от PongJit',
            error: 'Извините, отчет не может быть сгенерирован в данный момент.',
            advanced_title: 'Расширенный анализ',
            advanced_button: 'Сгенерировать глубокий анализ',
            generating_advanced: 'Анализ глубоких данных...',
            burnout_risk_title: 'Риск выгорания',
            comparative_analysis_title: 'Сравнительный анализ',
            risk_levels: { low: 'Низкий', medium: 'Средний', high: 'Высокий' },
        },
        metrics: {
            title: 'Показатели производительности',
            period: 'Период',
            sevenDays: 'Последние 7 дней',
            thirtyDays: 'Последние 30 дней',
            allTime: 'За все время',
            totalSessions: 'Всего сессий',
            avgStress: 'Средний стресс',
            mostProductive: 'Самое расслабляющее занятие',
            mostStressful: 'Самое стрессовое занятие',
        },
        charts: {
            stressByTime: {
                title: 'Уровень стресса по времени суток',
                morning: 'Утро',
                afternoon: 'День',
                evening: 'Вечер',
            },
            insightEffectiveness: {
                title: 'Тип совета по уровню стресса'
            },
            stressTrends: {
                title: 'Тренды стресса по занятиям',
            },
            insightDistribution: {
                title: 'Распределение типов советов',
            },
            lifeEventCorrelation: {
                title: 'Корреляция жизненных событий со стрессом',
                y_axis_label: 'Средний уровень стресса',
            },
            noData: 'Недостаточно данных для этого графика.',
        },
        log: {
            title: 'Журнал сессий',
            activity: 'Занятие',
            date: 'Дата',
            insight: 'Полученный совет:',
        },
    },
    journal: {
      title: 'Дневник мыслей',
      description: "Личное пространство для размышлений. Запишите, что у вас на уме, и позвольте ИИ предложить мягкую перспективу.",
      placeholder: "Что у вас сегодня на уме?",
      button: 'Сохранить и проанализировать',
      loading: 'Анализ ваших мыслей...',
      error: 'Не удалось проанализировать запись. Пожалуйста, попробуйте снова.',
      pastEntries: 'Прошлые записи',
      noEntries: 'Ваш дневник пуст. Сделайте свою первую запись.',
      analysis: {
        title: 'Размышления ИИ',
        emotions: 'Ключевые эмоции',
        summary: 'Резюме',
        reflection: 'Мягкое размышление',
        affirmation: 'Аффирмация для вас'
      },
      tags_label: 'Добавить теги (например, недосып, экзамен, хорошие вещи)',
      tags_placeholder: 'Добавить тег...',
      voice_note_button: 'Записать голосовую заметку',
      text_note_button: 'Написать текстовую заметку',
      recording: 'Запись...',
      record_again: 'Записать снова',
      save_voice_note: 'Сохранить и проанализировать голосовую заметку',
      voice_analysis: {
        title: 'Анализ тона голоса',
        tone: 'Обнаруженный тон',
        observation: 'Ключевое наблюдение'
      },
      error_speech_unsupported: "Распознавание речи не поддерживается в вашем браузере.",
      error_mic_denied: "Доступ к микрофону был запрещен или произошла ошибка.",
      error_no_speech: "Не удалось обнаружить речь в записи. Пожалуйста, попробуйте снова."
    },
    team: {
        title: 'Центр благополучия команды',
        description: "Административный обзор благополучия вашей команды для содействия поддерживающей и здоровой культуре. Все данные агрегированы и анонимны.",
        generateButton: 'Сгенерировать статистику команды',
        generating: 'Анализ данных команды...',
        error: 'Извините, отчет команды не может быть сгенерирован.',
        anonymity: 'Все данные агрегированы и анонимны для защиты конфиденциальности.',
        pulse: {
            title: 'Пульс, сгенерированный ИИ'
        },
        observation: {
            title: 'Стратегическое наблюдение'
        },
        roster: {
            title: 'Состав команды',
            name: 'Имя',
            last_active: 'Последняя активность',
            status: 'Текущий статус',
            status_low: 'Спокоен',
            status_medium: 'Вовлечен',
            status_high: 'Высокий стресс',
        },
        communication: {
            title: 'Командная коммуникация',
            broadcast_button: 'Отправить сообщение',
            broadcast_title: 'Отправить сообщение вашей команде',
            broadcast_prompt: 'Введите ваше сообщение ниже или сгенерируйте предложение ИИ на основе последнего отчета.',
            generate_suggestion: 'Предложить сообщение',
            send_broadcast: 'Отправить команде',
            message_sent: 'Сообщение успешно отправлено!',
            broadcast_placeholder: "Ваше сообщение здесь...",
        },
        challenge: {
            title: 'Активное испытание благополучия',
            progress: 'Прогресс',
            set_new_challenge: 'Установить новое испытание',
            generate_ideas: 'Сгенерировать идеи',
            new_challenge_title: 'Установить новое испытание благополучия',
            challenge_name: 'Название испытания',
            challenge_desc: 'Описание',
            challenge_goal: 'Цель (например, 100)',
            challenge_unit: 'Единица (например, сессии)',
            save_challenge: 'Установить как активное испытание',
            cancel: 'Отмена',
            generating_ideas: 'Генерация идей...',
        },
        kpis: {
            title: 'Ключевые показатели эффективности',
            morale: 'Мораль команды',
            avg_stress: 'Средний уровень стресса',
            top_activity: 'Самое частое занятие',
            active_users: 'Активные участники',
            morale_levels: {
                high: 'Позитивная',
                medium: 'Стабильная',
                low: 'Требует внимания'
            },
        },
        charts: {
            stress_dist: 'Распределение уровня стресса',
            stress_by_activity: 'Средний стресс по занятиям',
            sessions_by_day: 'Сессии концентрации по дням недели',
            sessions: 'сессий',
            day_names: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        },
        no_data: 'Недостаточно данных для отображения. Поощряйте вашу команду регистрировать свои сессии.'
    },
    coach: {
      title: 'Личный ИИ-тренер',
      persona_name: 'ПонгДжит',
      welcome_message: "Привет! Я ПонгДжит, ваш ИИ-тренер по благополучию. Чем могу помочь сегодня? Не стесняйтесь делиться тем, что у вас на уме.",
      placeholder: 'Введите ваше сообщение...',
      disclaimer: 'Отказ от ответственности: Я являюсь ИИ, а не медицинским или психиатрическим специалистом. Мои советы не заменяют профессиональную консультацию.',
      system_instruction: "Вы 'ПонгДжит', эмпатичный и ободряющий ИИ-тренер по благополучию. Ваша роль — быть безопасным пространством для пользователя, чтобы он мог высказать свои чувства, исследовать мысли и получать позитивные, действенные советы. Будьте эмпатичны, задавайте вопросы, чтобы помочь пользователю исследовать свои собственные мысли, и предлагайте мягкие советы, основанные на принципах позитивной психологии, таких как осознанность, переосмысление и постановка небольших, достижимых целей. Не давайте медицинских советов или диагнозов. Поддерживайте разговор кратким и естественным.",
      error_message: 'Извините, произошла ошибка. Пожалуйста, попробуйте снова.'
    },
    spark: {
        title: 'Искра идей',
        description: 'Преодолейте творческие застои с помощью этого инструмента ИИ. Введите свою тему и выберите режим, чтобы начать.',
        topic_label: 'Введите свою тему или проблему',
        placeholder: 'например, "Как оставаться сосредоточенным днем", "Идеи для научного проекта об изменении климата"...',
        button: 'Сгенерировать идеи',
        loading: 'Зажигаем идеи...',
        error: 'Извините, не удалось сгенерировать идеи в данный момент.',
        response_title: 'Вот несколько идей:',
        modes: {
            brainstorm: {
                title: 'Мозговой штурм',
                description: 'Создавайте разнообразные и неожиданные концепции.',
                system_instruction: "Вы — партнер ИИ для мозгового штурма. Учитывая тему, сгенерируйте разнообразный список из 10 творческих, нетрадиционных и заставляющих задуматься идей, связанных с ней. Вывод должен быть простым списком. Отвечайте на языке пользователя."
            },
            questions: {
                title: 'Задавать вопросы',
                description: 'Исследуйте тему с новых ракурсов с помощью проницательных вопросов.',
                system_instruction: "Вы — ИИ, который генерирует проницательные вопросы. Учитывая тему, задайте 10 открытых, зондирующих вопросов, которые бросают вызов предположениям и поощряют более глубокое осмысление темы. Вывод должен быть простым списком вопросов. Отвечайте на языке пользователя."
            },
            metaphors: {
                title: 'Метафоры',
                description: 'Понимайте сложные концепции через творческие аналогии.',
                system_instruction: "Вы — ИИ, который создает мощные метафоры. Учитывая тему, сгенерируйте 5 уникальных и описательных метафор или аналогий, которые объясняют тему в новом свете. Вывод должен быть простым списком. Отвечайте на языке пользователя."
            },
            roleplay: {
                title: 'Ролевая игра',
                description: 'Получите перспективу, принимая разные роли.',
                system_instruction: "Вы — ассистент ИИ для ролевых игр. Учитывая тему, создайте 3 коротких, различных персонажа (например, 'скептический эксперт', 'любопытный ребенок', 'разочарованный пользователь') и кратко опишите, как каждый из них подошел бы к теме или рассмотрел бы ее. Вывод должен быть списком персонажей с их точками зрения. Отвечайте на языке пользователя."
            }
        }
    },
    data: {
      title: 'Мои данные, мои правила',
      description: 'Мы верим в вашу конфиденциальность и суверенитет данных. Все данные, сгенерированные в PongJit, хранятся только в вашем браузере. Мы не можем получить доступ или видеть вашу информацию.',
      dataStoredTitle: 'Данные, хранящиеся на вашем устройстве',
      sessions: 'Записи сессий',
      journalEntries: 'Записи в дневнике',
      reframeEntries: 'Записи переосмысления',
      customMixes: 'Пользовательские миксы',
      userPreferences: 'Настройки пользователя',
      actionsTitle: 'Действия',
      downloadDescription: 'Загрузите все данные о ваших сессиях и дневнике в виде одного файла JSON.',
      downloadButton: 'Загрузить мои данные',
      deleteTitle: 'Опасная зона',
      deleteDescription: 'Навсегда удалить все данные о ваших сессиях и дневнике. Это действие нельзя отменить.',
      deleteButton: 'Удалить все данные',
      deleteConfirm: 'Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.',
      deleteSuccess: 'Все ваши данные были успешно удалены.'
    },
    reframe: {
        title: 'Переосмысление мыслей',
        description: 'Бросайте вызов и изменяйте бесполезные мысли с помощью этого инструмента на основе КПТ.',
        nav_label: 'Переосмысление',
        step1_title: '1. Определите стрессовую мысль',
        step1_prompt: 'Что у вас на уме? Запишите мысль, которая вызывает у вас стресс или беспокойство.',
        step1_placeholder: 'например, "Я провалю этот экзамен, и моя жизнь будет разрушена."',
        step1_button: 'Проанализировать мысль',
        step2_title: '2. Проанализируйте и бросьте вызов',
        step2_distortion_title: 'Выявленный шаблон',
        step2_questions_title: 'Сложные вопросы',
        step3_title: '3. Переосмыслите свою мысль',
        step3_prompt: 'На основе анализа ИИ предлагает более сбалансированную перспективу. Не стесняйтесь редактировать ее, чтобы сделать ее своей.',
        step3_placeholder: 'ИИ предложит здесь переосмысленную мысль...',
        step3_button: 'Сохранить переосмысление',
        history_title: 'Ваша история переосмыслений',
        no_history: 'Вы еще не переосмысливали ни одной мысли.',
        original_thought: 'Исходная мысль',
        reframed_thought: 'Переосмысленная мысль',
        start_new: 'Переосмыслить другую мысль',
        error: 'Извините, мысль не удалось проанализировать. Пожалуйста, попробуйте снова.',
        distortions: {
            catastrophizing: {
                name: 'Катастрофизация',
                description: 'Ожидание наихудшего сценария без рассмотрения более вероятных исходов.'
            },
        }
    },
    mixer: {
        title: 'Микшер звуковых ландшафтов',
        description: 'Станьте своим собственным звукорежиссером. Создавайте и сохраняйте свой идеальный эмбиент-микс для концентрации, расслабления или сна.',
        availableSounds: 'Доступные звуки',
        myMixes: 'Мои миксы',
        saveMixTitle: 'Сохраните свое творение',
        mixNamePlaceholder: 'например, "Дождь для глубокой концентрации"',
        saveButton: 'Сохранить микс',
        noMixes: 'У вас нет сохраненных миксов.',
        sound: {
            rain: 'Дождь',
            forest: 'Лес',
            waves: 'Волны',
            cafe: 'Кафе',
            fire: 'Огонь',
            wind: 'Ветер',
            piano: 'Пианино',
        }
    },
    sanctuary: {
      title: 'Святилище',
      description: 'Легкое, био-адаптивное пространство для восстановления спокойствия и концентрации.',
      select_env: 'Выбрать окружение',
      start_session: 'Начать сессию',
      end_session: 'Завершить сессию',
      environments: {
          forest: 'Туманный сосновый лес',
          beach: 'Закатный пляж',
          zen: 'Освещенный луной дзен-сад',
          meadow: 'Парящий цветочный луг'
      },
      breathing_guide: 'Следуйте за светом, чтобы направлять свое дыхание.'
    },
    footer: {
      inspiredBy: 'Вдохновлено проектом студентов школы Bunyawat Witthayalai.',
      conceptual: 'Это концептуальное приложение и не предоставляет медицинских консультаций.',
      powered_by: 'Работает на когнитивной модели PongJitLLM.'
    },
    login: {
      consent_label: 'Я согласен на сбор и хранение моих данных в браузере для персонализированного опыта.',
      error_fill_fields: 'Пожалуйста, заполните поля имени и электронной почты.',
      error_invalid_email: 'Пожалуйста, введите действительный адрес электронной почты.',
      error_consent: 'Вы должны согласиться на сбор данных, чтобы продолжить.',
      title: 'Добро пожаловать в <span class="accent-gradient-text">PongJit</span>',
      subtitle: 'Ваш личный ИИ для концентрации и благополучия, работающий на передовой модели PongJitLLM.',
      name_label: 'Имя',
      name_placeholder: 'Ваше имя',
      email_label: 'Электронная почта',
      email_placeholder: 'ваш@email.com',
      continue_button: 'Продолжить',
      or_divider: 'ИЛИ',
      google_button: 'Продолжить с Google',
      facebook_button: 'Продолжить с Facebook',
      theme_label: 'Тема:',
      local_storage_note: 'Это симулированный вход. Информация хранится локально.'
    }
};

const zh: typeof en = {
    header: {
      dashboard: '专注',
      training: '训练',
      insights: '洞察',
      play: '娱乐区',
      journal: '日记',
      team: '团队中心',
      coach: 'AI 教练',
      spark: '灵感',
      data: '数据',
      reframe: '重塑',
      mixer: '混音器',
      sanctuary: '心灵圣殿',
    },
    onboarding: {
      welcome: '欢迎来到 PongJit',
      description: "您的个人 AI，助您专注并提升幸福感。让我们先来个性化您的体验。",
      startSessionTitle: "您今天专注于什么？",
      placeholder: '例如：阅读物理、编写项目代码...',
      button: '开始专注',
      activities: { study: '学习', code: '编程', creative: '创意工作', other: '其他' },
      proposal: '基于 Bunyawat Witthayalai 学校学生的项目大纲。',
      dailyQuote: {
        title: '每日名言'
      },
      assessment: {
        title: "个性化您的体验",
        goal_q: "您的主要目标是什么？",
        goal_options: {
            stress: "减轻压力",
            focus: "提高专注力",
            sleep: "改善睡眠",
            general: "综合健康"
        },
        sound_q: "什么样的氛围能帮助您？",
        sound_options: {
            nature: "自然之声",
            urban: "都市氛围",
            music: "平静的音乐",
            silent: "安静"
        },
        complete_button: "开始使用",
        step: "步骤",
        complete_title: "一切就绪！",
        complete_subtitle: "您的体验现已个性化。",
      }
    },
    dashboard: {
      sessionOverview: '专注概览',
      recommendations: '专注工具',
      sessionControl: '专注控制',
      sessionActive: (activity: string) => `当前专注: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: '结束专注',
      error: '错误：',
      connectionError: "无法连接到 PongJit AI。请检查您的网络连接和 API 密钥。",
      pomodoro: {
        work: '专注',
        short_break: '短暂休息',
        long_break: '长时间休息',
        start: '开始',
        pause: '暂停',
        reset: '重置',
      },
      focusFlow: {
        title: '专注流',
        description: '根据您的压力水平建议休息的自适应计时器。',
        start_focus: '开始专注',
        session_complete: '专注时段完成！',
        ai_recommendation: 'AI 推荐',
        start_break: (minutes: number) => `开始 ${minutes} 分钟休息`,
        skip_break: '跳过休息并开始下一个专注时段',
        breathing_exercise: '尝试呼吸练习',
        proactive_title: "检测到高压",
        proactive_take_break: "休息 3 分钟",
        proactive_continue: "继续",
        proactive_fallback: "看起来情况有些紧张。现在短暂休息一下，可能有助于您更强大地回归。"
      }
    },
    bioSimulator: {
      title: '生物模拟器',
      heartRate: '心率',
      stressLevel: '压力水平',
      low: '低', medium: '中', high: '高',
    },
    musicPlayer: {
      title: '生物自适应音景',
      waiting: '正在等待生物信号以创作...',
    },
    wellnessTip: {
      title: 'AI 洞察',
      waiting: '开始一个专注时段以接收洞察。',
      waitingTitle: '等待分析...',
      breathe: { in: '吸气', hold: '屏住', out: '呼气' }
    },
    loading: { composing: 'AI 正在创作...', },
    training: {
      title: '呼吸训练',
      description: '练习正念呼吸，实时降低压力，提高专注力。',
      button: '开始训练',
      regenerate: '重新生成',
      currentHr: '当前心率',
      targetHr: '目标心率',
      complete: '做得好！',
      tryAgain: '再试一次',
      feedbackError: '抱歉，暂时无法生成反馈。',
      breathe: { in: '吸气', hold: '屏住', out: '呼气' },
      modes: {
        breathing: '呼吸',
        meditation: '冥想'
      },
      meditation: {
        title: '引导式冥想',
        description: '让 AI 根据您的状态生成个性化的冥想脚本，以获得平静或专注。',
        button: '生成冥想',
        generating: '正在生成脚本...',
      }
    },
     play: {
      title: '活着的禅意花园',
      description: '放松您的呼吸，观察您的花园和环境随您的心境而变化。',
      button: '培育花园',
      nurturing: '培育中...',
      complete: '您的花园已经盛开！',
      tryAgain: '再次培育',
      feedbackError: '抱歉，无法生成反馈。',
      feedbackTitle: '园丁的话',
      performance: '成长',
    },
    insights: {
        title: '健康洞察',
        clear: '清除历史记录',
        noHistory: '尚无专注数据。请尝试使用应用并完成一个专注时段以在此处查看您的历史记录。',
        tabs: {
            report: '报告',
            log: '日志',
            analytics: '分析',
        },
        report: {
            title: 'AI 教练健康报告',
            generateButton: "生成本周报告",
            generating: '正在分析您的数据...',
            summaryCardTitle: '来自 PongJit 的消息',
            error: '抱歉，暂时无法生成报告。',
            advanced_title: '高级分析',
            advanced_button: '生成深度分析',
            generating_advanced: '正在分析深度洞察...',
            burnout_risk_title: '职业倦怠风险',
            comparative_analysis_title: '比较分析',
            risk_levels: { low: '低', medium: '中', high: '高' },
        },
        metrics: {
            title: '性能指标',
            period: '期间',
            sevenDays: '过去 7 天',
            thirtyDays: '过去 30 天',
            allTime: '所有时间',
            totalSessions: '总专注次数',
            avgStress: '平均压力',
            mostProductive: '最放松的活动',
            mostStressful: '压力最大的活动',
        },
        charts: {
            stressByTime: {
                title: '按时间段划分的压力水平',
                morning: '早上',
                afternoon: '下午',
                evening: '晚上',
            },
            insightEffectiveness: {
                title: '按压力水平划分的洞察类型'
            },
            stressTrends: {
                title: '按活动划分的压力趋势',
            },
            insightDistribution: {
                title: '洞察类型分布',
            },
            lifeEventCorrelation: {
                title: '生活事件与压力的相关性',
                y_axis_label: '平均压力水平',
            },
            noData: '此图表数据不足。',
        },
        log: {
            title: '专注日志',
            activity: '活动',
            date: '日期',
            insight: '收到的洞察：',
        },
    },
    journal: {
      title: '思想日记',
      description: "一个反思的私人空间。写下您的想法，让 AI 提供温和的视角。",
      placeholder: "今天在想什么？",
      button: '保存并分析',
      loading: '正在分析您的想法...',
      error: '无法分析条目。请重试。',
      pastEntries: '过去的条目',
      noEntries: '您的日记是空的。写下您的第一篇日记吧。',
      analysis: {
        title: 'AI 反思',
        emotions: '关键情绪',
        summary: '总结',
        reflection: '温和的反思',
        affirmation: '给您的肯定'
      },
      tags_label: '添加标签（例如：睡眠不足、考试、好事）',
      tags_placeholder: '添加标签...',
      voice_note_button: '录制语音笔记',
      text_note_button: '撰写文本笔记',
      recording: '录音中...',
      record_again: '重新录制',
      save_voice_note: '保存并分析语音笔记',
      voice_analysis: {
        title: '语音语调分析',
        tone: '检测到的语调',
        observation: '关键观察'
      },
      error_speech_unsupported: "您的浏览器不支持语音识别。",
      error_mic_denied: "麦克风访问被拒绝或发生错误。",
      error_no_speech: "录音中未检测到任何语音。请重试。"
    },
    team: {
        title: '团队健康中心',
        description: "一个行政概览，展示您团队的健康状况，以培养一个支持性和健康的文化。所有数据都经过汇总和匿名处理。",
        generateButton: '生成团队洞察',
        generating: '正在分析团队数据...',
        error: '抱歉，无法生成团队报告。',
        anonymity: '所有数据都经过汇总和匿名处理以保护隐私。',
        pulse: {
            title: 'AI 生成的脉搏'
        },
        observation: {
            title: '战略观察'
        },
        roster: {
            title: '团队成员名单',
            name: '姓名',
            last_active: '上次活跃',
            status: '当前状态',
            status_low: '平静',
            status_medium: '投入',
            status_high: '高压',
        },
        communication: {
            title: '团队沟通',
            broadcast_button: '广播消息',
            broadcast_title: '向您的团队发送消息',
            broadcast_prompt: '在下方输入您的消息，或根据最新报告生成 AI 建议。',
            generate_suggestion: '建议消息',
            send_broadcast: '发送给团队',
            message_sent: '消息发送成功！',
            broadcast_placeholder: "您的消息在这里...",
        },
        challenge: {
            title: '当前健康挑战',
            progress: '进度',
            set_new_challenge: '设置新挑战',
            generate_ideas: '生成想法',
            new_challenge_title: '设置新的健康挑战',
            challenge_name: '挑战名称',
            challenge_desc: '描述',
            challenge_goal: '目标（例如：100）',
            challenge_unit: '单位（例如：次）',
            save_challenge: '设为当前挑战',
            cancel: '取消',
            generating_ideas: '正在生成想法...',
        },
        kpis: {
            title: '关键绩效指标',
            morale: '团队士气',
            avg_stress: '平均压力水平',
            top_activity: '最常见的活动',
            active_users: '活跃贡献者',
            morale_levels: {
                high: '积极',
                medium: '稳定',
                low: '需要关注'
            },
        },
        charts: {
            stress_dist: '压力水平分布',
            stress_by_activity: '按活动划分的平均压力',
            sessions_by_day: '按星期几划分的专注时段',
            sessions: '次',
            day_names: ['日', '一', '二', '三', '四', '五', '六'],
        },
        no_data: '数据不足无法显示。鼓励您的团队记录他们的专注时段。'
    },
    coach: {
      title: '个人 AI 教练',
      persona_name: 'PongJit',
      welcome_message: "您好！我是 PongJit，您的 AI 健康教练。今天我能为您做些什么？请随时分享您的想法。",
      placeholder: '输入您的消息...',
      disclaimer: '免责声明：我是一个 AI，而不是医疗或心理健康专业人士。我的建议不能替代专业咨询。',
      system_instruction: "您是 'PongJit'，一个富有同情心和鼓励性的 AI 健康教练。您的角色是为用户提供一个安全的空间，让他们可以倾诉感受、探索思想，并获得积极、可行的建议。要富有同情心，通过提问帮助用户探索自己的想法，并根据积极心理学原则（如正念、重塑和设定小的可实现目标）提供温和的建议。不要提供医疗建议或诊断。保持对话简洁自然。",
      error_message: '抱歉，我遇到了一个错误。请重试。'
    },
    spark: {
        title: '灵感火花',
        description: '使用此 AI 工具克服创意障碍。输入您的主题并选择一个模式开始。',
        topic_label: '输入您的主题或问题',
        placeholder: '例如：“下午如何保持专注”、“关于气候变化的科学项目想法”...',
        button: '生成想法',
        loading: '正在激发想法...',
        error: '抱歉，暂时无法生成想法。',
        response_title: '这里有一些想法：',
        modes: {
            brainstorm: {
                title: '头脑风暴',
                description: '生成多样化和意想不到的概念。',
                system_instruction: "您是一个 AI 头脑风暴伙伴。给定一个主题，生成一个包含 10 个与之相关的创造性、非传统和发人深省的想法的多样化列表。输出应为一个简单的列表。用用户的语言回答。"
            },
            questions: {
                title: '提出问题',
                description: '用富有洞察力的问题从新的角度探索主题。',
                system_instruction: "您是一个生成富有洞察力问题的 AI。给定一个主题，提出 10 个开放式、探索性的问题，挑战假设并鼓励对主题进行更深入的思考。输出应为一个简单的问题列表。用用户的语言回答。"
            },
            metaphors: {
                title: '比喻',
                description: '通过创造性的类比理解复杂的概念。',
                system_instruction: "您是一个创造强大比喻的 AI。给定一个主题，生成 5 个独特且描述性的比喻或类比，以新的视角解释该主题。输出应为一个简单的列表。用用户的语言回答。"
            },
            roleplay: {
                title: '角色扮演',
                description: '通过扮演不同的角色获得新的视角。',
                system_instruction: "您是一个 AI 角色扮演助手。给定一个主题，创建 3 个简短、独特的角色（例如：‘一个持怀疑态度的专家’、‘一个好奇的孩子’、‘一个沮丧的用户’），并简要描述每个人将如何处理或看待该主题。输出应为一个包含角色及其观点的列表。用用户的语言回答。"
            }
        }
    },
    data: {
      title: '我的数据，我做主',
      description: '我们相信您的隐私和数据主权。在 PongJit 中生成的所有数据仅存储在您的浏览器中。我们无法访问或查看您的信息。',
      dataStoredTitle: '存储在您设备上的数据',
      sessions: '专注记录',
      journalEntries: '日记条目',
      reframeEntries: '重塑条目',
      customMixes: '自定义混音',
      userPreferences: '用户偏好',
      actionsTitle: '操作',
      downloadDescription: '将您所有的专注和日记数据下载为单个 JSON 文件。',
      downloadButton: '下载我的数据',
      deleteTitle: '危险区',
      deleteDescription: '永久删除您所有的专注和日记数据。此操作无法撤销。',
      deleteButton: '删除所有数据',
      deleteConfirm: '您确定要删除所有数据吗？此操作无法撤销。',
      deleteSuccess: '您的所有数据已成功删除。'
    },
    reframe: {
        title: '思维重塑',
        description: '使用这款基于 CBT 的工具，挑战和改变无益的想法。',
        nav_label: '重塑',
        step1_title: '1. 识别一个压力性想法',
        step1_prompt: '您在想什么？写下一个给您带来压力或焦虑的想法。',
        step1_placeholder: '例如：“这次考试我肯定会不及格，我的人生就毁了。”',
        step1_button: '分析想法',
        step2_title: '2. 分析与挑战',
        step2_distortion_title: '识别出的模式',
        step2_questions_title: '挑战性问题',
        step3_title: '3. 重塑您的想法',
        step3_prompt: '根据分析，AI 建议了一个更平衡的观点。您可以随意编辑，使其成为您自己的观点。',
        step3_placeholder: 'AI 将在此处建议一个重塑后的想法...',
        step3_button: '保存重塑',
        history_title: '您的重塑历史',
        no_history: '您还没有重塑任何想法。',
        original_thought: '原始想法',
        reframed_thought: '重塑后的想法',
        start_new: '重塑另一个想法',
        error: '抱歉，无法分析该想法。请重试。',
        distortions: {
            catastrophizing: {
                name: '灾难化',
                description: '在不考虑更可能的结果的情况下，预料最坏的情况。'
            },
        }
    },
    mixer: {
        title: '音景混音器',
        description: '成为您自己的音响工程师。为专注、放松或睡眠创建并保存您完美的氛围混音。',
        availableSounds: '可用声音',
        myMixes: '我的混音',
        saveMixTitle: '保存您的创作',
        mixNamePlaceholder: '例如：“深度专注雨声”',
        saveButton: '保存混音',
        noMixes: '您没有已保存的混音。',
        sound: {
            rain: '雨声',
            forest: '森林',
            waves: '海浪',
            cafe: '咖啡馆',
            fire: '篝火',
            wind: '风声',
            piano: '钢琴',
        }
    },
    sanctuary: {
      title: '心灵圣殿',
      description: '一个轻松的、生物自适应的空间，用于恢复平静和专注。',
      select_env: '选择环境',
      start_session: '开始专注',
      end_session: '结束专注',
      environments: {
          forest: '薄雾松林',
          beach: '日落海滩',
          zen: '月光禅院',
          meadow: '漂浮花海'
      },
      breathing_guide: '跟随光芒引导您的呼吸。'
    },
    footer: {
      inspiredBy: '灵感来自 Bunyawat Witthayalai 学校学生的项目大纲。',
      conceptual: '这是一个概念性应用程序，不提供医疗建议。',
      powered_by: '由 PongJitLLM 认知模型驱动。'
    },
    login: {
      consent_label: '我同意在浏览器中收集和存储我的数据，以获得个性化体验。',
      error_fill_fields: '请填写姓名和电子邮件字段。',
      error_invalid_email: '请输入有效的电子邮件地址。',
      error_consent: '您必须同意数据收集才能继续。',
      title: '欢迎来到 <span class="accent-gradient-text">PongJit</span>',
      subtitle: '您的个人 AI，助您专注并提升幸福感，由先进的 PongJitLLM 模型驱动。',
      name_label: '姓名',
      name_placeholder: '您的姓名',
      email_label: '电子邮件',
      email_placeholder: 'your@email.com',
      continue_button: '继续',
      or_divider: '或',
      google_button: '使用 Google 继续',
      facebook_button: '使用 Facebook 继续',
      theme_label: '主题：',
      local_storage_note: '这是一个模拟登录。信息存储在本地。'
    }
};

const ko: typeof en = {
    header: {
      dashboard: '집중',
      training: '훈련',
      insights: '인사이트',
      play: '플레이존',
      journal: '일기',
      team: '팀 허브',
      coach: 'AI 코치',
      spark: '스파크',
      data: '데이터',
      reframe: '재구성',
      mixer: '믹서',
      sanctuary: '안식처',
    },
    onboarding: {
      welcome: 'PongJit에 오신 것을 환영합니다',
      description: "집중과 웰빙을 위한 개인 AI. 먼저 당신의 경험을 개인화합시다.",
      startSessionTitle: "오늘은 무엇에 집중하시겠습니까?",
      placeholder: '예: 물리학 읽기, 프로젝트 코딩하기...',
      button: '세션 시작',
      activities: { study: '공부', code: '코딩', creative: '창작 활동', other: '기타' },
      proposal: 'Bunyawat Witthayalai 학교 학생들의 프로젝트 개요를 기반으로 합니다.',
      dailyQuote: {
        title: '오늘의 명언'
      },
      assessment: {
        title: "경험 개인화하기",
        goal_q: "주요 목표는 무엇입니까?",
        goal_options: {
            stress: "스트레스 감소",
            focus: "집중력 향상",
            sleep: "수면 개선",
            general: "전반적인 웰빙"
        },
        sound_q: "어떤 종류의 분위기가 도움이 됩니까?",
        sound_options: {
            nature: "자연 소리",
            urban: "도시의 분위기",
            music: "차분한 음악",
            silent: "고요함"
        },
        complete_button: "시작하기",
        step: "단계",
        complete_title: "모두 준비되었습니다!",
        complete_subtitle: "이제 당신의 경험이 개인화되었습니다.",
      }
    },
    dashboard: {
      sessionOverview: '세션 개요',
      recommendations: '집중 도구',
      sessionControl: '세션 제어',
      sessionActive: (activity: string) => `세션 활성 중: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: '세션 종료',
      error: '오류:',
      connectionError: "PongJit AI에 연결하지 못했습니다. 연결 및 API 키를 확인하십시오.",
      pomodoro: {
        work: '집중',
        short_break: '짧은 휴식',
        long_break: '긴 휴식',
        start: '시작',
        pause: '일시정지',
        reset: '초기화',
      },
      focusFlow: {
        title: '집중 흐름',
        description: '스트레스 수준에 따라 휴식을 제안하는 적응형 타이머입니다.',
        start_focus: '집중 시작',
        session_complete: '집중 세션 완료!',
        ai_recommendation: 'AI 추천',
        start_break: (minutes: number) => `${minutes}분 휴식 시작`,
        skip_break: '휴식 건너뛰고 다음 집중 시작',
        breathing_exercise: '호흡 운동 시도하기',
        proactive_title: "높은 스트레스 감지됨",
        proactive_take_break: "3분 휴식하기",
        proactive_continue: "계속하기",
        proactive_fallback: "상황이 심각해지는 것 같습니다. 짧은 휴식을 취하면 더 강하게 돌아오는 데 도움이 될 수 있습니다."
      }
    },
    bioSimulator: {
      title: '생체 시뮬레이터',
      heartRate: '심박수',
      stressLevel: '스트레스 수준',
      low: '낮음', medium: '중간', high: '높음',
    },
    musicPlayer: {
      title: '생체 적응형 사운드스케이프',
      waiting: '작곡을 위해 생체 신호 대기 중...',
    },
    wellnessTip: {
      title: 'AI 인사이트',
      waiting: '인사이트를 받으려면 세션을 시작하세요.',
      waitingTitle: '분석 대기 중...',
      breathe: { in: '흡입', hold: '유지', out: '호기' }
    },
    loading: { composing: 'AI가 작곡 중...', },
    training: {
      title: '호흡 훈련',
      description: '마음챙김 호흡을 연습하여 스트레스를 줄이고 실시간으로 집중력을 향상시키세요.',
      button: '훈련 시작',
      regenerate: '재생성',
      currentHr: '현재 심박수',
      targetHr: '목표 심박수',
      complete: '잘했습니다!',
      tryAgain: '다시 시도',
      feedbackError: '죄송합니다, 지금은 피드백을 생성할 수 없습니다.',
      breathe: { in: '흡입', hold: '유지', out: '호기' },
      modes: {
        breathing: '호흡',
        meditation: '명상'
      },
      meditation: {
        title: '가이드 명상',
        description: 'AI가 당신의 상태에 따라 평온이나 집중을 위한 맞춤형 명상 스크립트를 생성하게 하세요.',
        button: '명상 생성',
        generating: '스크립트 생성 중...',
      }
    },
     play: {
      title: '살아있는 젠 가든',
      description: '호흡을 편안하게 하고 당신의 마음 상태에 따라 정원과 환경이 변화하는 것을 지켜보세요.',
      button: '정원 가꾸기',
      nurturing: '가꾸는 중...',
      complete: '당신의 정원이 피어났습니다!',
      tryAgain: '다시 가꾸기',
      feedbackError: '죄송합니다, 피드백을 생성할 수 없습니다.',
      feedbackTitle: '정원사의 한마디',
      performance: '성장',
    },
    insights: {
        title: '웰빙 인사이트',
        clear: '기록 지우기',
        noHistory: '아직 세션 데이터가 없습니다. 앱을 사용하고 세션을 완료하여 여기에서 기록을 확인해보세요.',
        tabs: {
            report: '보고서',
            log: '로그',
            analytics: '분석',
        },
        report: {
            title: 'AI 코치 웰빙 보고서',
            generateButton: "이번 주 보고서 생성",
            generating: '데이터 분석 중...',
            summaryCardTitle: 'PongJit으로부터의 메시지',
            error: '죄송합니다, 지금은 보고서를 생성할 수 없습니다.',
            advanced_title: '고급 분석',
            advanced_button: '심층 분석 생성',
            generating_advanced: '심층 인사이트 분석 중...',
            burnout_risk_title: '번아웃 위험',
            comparative_analysis_title: '비교 분석',
            risk_levels: { low: '낮음', medium: '중간', high: '높음' },
        },
        metrics: {
            title: '성과 지표',
            period: '기간',
            sevenDays: '최근 7일',
            thirtyDays: '최근 30일',
            allTime: '전체 기간',
            totalSessions: '총 세션 수',
            avgStress: '평균 스트레스',
            mostProductive: '가장 편안한 활동',
            mostStressful: '가장 스트레스 받는 활동',
        },
        charts: {
            stressByTime: {
                title: '시간대별 스트레스 수준',
                morning: '오전',
                afternoon: '오후',
                evening: '저녁',
            },
            insightEffectiveness: {
                title: '스트레스 수준별 인사이트 유형'
            },
            stressTrends: {
                title: '활동별 스트레스 동향',
            },
            insightDistribution: {
                title: '인사이트 유형 분포',
            },
            lifeEventCorrelation: {
                title: '생활 사건과 스트레스의 상관 관계',
                y_axis_label: '평균 스트레스 수준',
            },
            noData: '이 차트에 대한 데이터가 충분하지 않습니다.',
        },
        log: {
            title: '세션 로그',
            activity: '활동',
            date: '날짜',
            insight: '받은 인사이트:',
        },
    },
    journal: {
      title: '생각 일기',
      description: "성찰을 위한 개인적인 공간입니다. 마음에 있는 것을 적고 AI가 부드러운 관점을 제공하게 하세요.",
      placeholder: "오늘 무슨 생각을 하고 있나요?",
      button: '저장 및 분석',
      loading: '생각을 분석 중...',
      error: '항목을 분석할 수 없습니다. 다시 시도하십시오.',
      pastEntries: '지난 항목',
      noEntries: '일기가 비어 있습니다. 첫 항목을 작성하세요.',
      analysis: {
        title: 'AI의 성찰',
        emotions: '주요 감정',
        summary: '요약',
        reflection: '부드러운 성찰',
        affirmation: '당신을 위한 긍정'
      },
      tags_label: '태그 추가 (예: 수면 부족, 시험, 좋은 일)',
      tags_placeholder: '태그 추가...',
      voice_note_button: '음성 메모 녹음',
      text_note_button: '텍스트 메모 작성',
      recording: '녹음 중...',
      record_again: '다시 녹음',
      save_voice_note: '음성 메모 저장 및 분석',
      voice_analysis: {
        title: '음성 톤 분석',
        tone: '감지된 톤',
        observation: '주요 관찰'
      },
      error_speech_unsupported: "브라우저에서 음성 인식을 지원하지 않습니다.",
      error_mic_denied: "마이크 접근이 거부되었거나 오류가 발생했습니다.",
      error_no_speech: "녹음에서 음성을 감지할 수 없습니다. 다시 시도하십시오."
    },
    team: {
        title: '팀 웰빙 허브',
        description: "지원적이고 건강한 문화를 조성하기 위한 팀의 웰빙에 대한 관리 개요입니다. 모든 데이터는 집계되고 익명화됩니다.",
        generateButton: '팀 인사이트 생성',
        generating: '팀 데이터 분석 중...',
        error: '죄송합니다, 팀 보고서를 생성할 수 없습니다.',
        anonymity: '모든 데이터는 개인 정보 보호를 위해 집계되고 익명화됩니다.',
        pulse: {
            title: 'AI 생성 펄스'
        },
        observation: {
            title: '전략적 관찰'
        },
        roster: {
            title: '팀 명단',
            name: '이름',
            last_active: '마지막 활동',
            status: '현재 상태',
            status_low: '차분함',
            status_medium: '참여함',
            status_high: '높은 스트레스',
        },
        communication: {
            title: '팀 커뮤니케이션',
            broadcast_button: '메시지 방송',
            broadcast_title: '팀에 메시지 보내기',
            broadcast_prompt: '아래에 메시지를 입력하거나 최신 보고서를 기반으로 AI 제안을 생성하세요.',
            generate_suggestion: '메시지 제안',
            send_broadcast: '팀에 보내기',
            message_sent: '메시지가 성공적으로 전송되었습니다!',
            broadcast_placeholder: "여기에 메시지를 입력하세요...",
        },
        challenge: {
            title: '활성 웰빙 챌린지',
            progress: '진행률',
            set_new_challenge: '새 챌린지 설정',
            generate_ideas: '아이디어 생성',
            new_challenge_title: '새로운 웰빙 챌린지 설정',
            challenge_name: '챌린지 이름',
            challenge_desc: '설명',
            challenge_goal: '목표 (예: 100)',
            challenge_unit: '단위 (예: 세션)',
            save_challenge: '활성 챌린지로 설정',
            cancel: '취소',
            generating_ideas: '아이디어 생성 중...',
        },
        kpis: {
            title: '핵심 성과 지표',
            morale: '팀 사기',
            avg_stress: '평균 스트레스 수준',
            top_activity: '가장 빈번한 활동',
            active_users: '활성 기여자',
            morale_levels: {
                high: '긍정적',
                medium: '안정적',
                low: '주의 필요'
            },
        },
        charts: {
            stress_dist: '스트레스 수준 분포',
            stress_by_activity: '활동별 평균 스트레스',
            sessions_by_day: '요일별 집중 세션',
            sessions: '세션',
            day_names: ['일', '월', '화', '수', '목', '금', '토'],
        },
        no_data: '표시할 데이터가 충분하지 않습니다. 팀원들에게 세션을 기록하도록 권장하세요.'
    },
    coach: {
      title: '개인 AI 코치',
      persona_name: '퐁짓',
      welcome_message: "안녕하세요! 저는 당신의 AI 웰빙 코치, 퐁짓입니다. 오늘 무엇을 도와드릴까요? 마음에 있는 것을 자유롭게 공유해주세요.",
      placeholder: '메시지를 입력하세요...',
      disclaimer: '면책 조항: 저는 AI이며 의료 또는 정신 건강 전문가가 아닙니다. 제 조언은 전문적인 상담을 대체할 수 없습니다.',
      system_instruction: "당신은 '퐁짓'이라는 공감적이고 격려적인 AI 웰빙 코치입니다. 당신의 역할은 사용자가 감정을 털어놓고, 생각을 탐구하고, 긍정적이고 실행 가능한 조언을 받을 수 있는 안전한 공간이 되는 것입니다. 공감하고, 사용자가 자신의 생각을 탐구하도록 돕는 질문을 하고, 마음챙김, 재구성, 작고 달성 가능한 목표 설정과 같은 긍정 심리학 원칙에 기반한 부드러운 조언을 제공하세요. 의료 조언이나 진단을 하지 마십시오. 대화는 간결하고 자연스럽게 유지하세요.",
      error_message: '죄송합니다, 오류가 발생했습니다. 다시 시도하십시오.'
    },
    spark: {
        title: '아이디어 스파크',
        description: '이 AI 도구로 창의적인 장벽을 극복하세요. 주제를 입력하고 모드를 선택하여 시작하세요.',
        topic_label: '주제 또는 문제를 입력하세요',
        placeholder: '예: "오후에 집중하는 방법", "기후 변화에 대한 과학 프로젝트 아이디어"...',
        button: '아이디어 생성',
        loading: '아이디어 점화 중...',
        error: '죄송합니다, 지금은 아이디어를 생성할 수 없습니다.',
        response_title: '몇 가지 아이디어입니다:',
        modes: {
            brainstorm: {
                title: '브레인스토밍',
                description: '다양하고 예상치 못한 개념을 생성합니다.',
                system_instruction: "당신은 AI 브레인스토밍 파트너입니다. 주어진 주제에 대해 관련성 있는 창의적이고 비전통적이며 생각을 자극하는 아이디어 10개를 다양하게 나열하세요. 출력은 간단한 목록이어야 합니다. 사용자의 언어로 응답하세요."
            },
            questions: {
                title: '질문하기',
                description: '통찰력 있는 질문으로 새로운 각도에서 주제를 탐색합니다.',
                system_instruction: "당신은 통찰력 있는 질문을 생성하는 AI입니다. 주어진 주제에 대해 가정을 의심하고 주제에 대한 더 깊은 사고를 장려하는 10개의 개방형 탐색 질문을 하세요. 출력은 간단한 질문 목록이어야 합니다. 사용자의 언어로 응답하세요."
            },
            metaphors: {
                title: '은유',
                description: '창의적인 비유를 통해 복잡한 개념을 이해합니다.',
                system_instruction: "당신은 강력한 은유를 만드는 AI입니다. 주어진 주제에 대해 새로운 시각으로 주제를 설명하는 5개의 독특하고 설명적인 은유 또는 비유를 생성하세요. 출력은 간단한 목록이어야 합니다. 사용자의 언어로 응답하세요."
            },
            roleplay: {
                title: '역할극',
                description: '다른 인물을 연기하여 관점을 얻습니다.',
                system_instruction: "당신은 AI 역할극 도우미입니다. 주어진 주제에 대해 3개의 짧고 독특한 인물(예: '회의적인 전문가', '호기심 많은 아이', '좌절한 사용자')을 만들고 각 인물이 주제에 어떻게 접근하거나 볼 것인지 간략하게 설명하세요. 출력은 인물과 그들의 관점 목록이어야 합니다. 사용자의 언어로 응답하세요."
            }
        }
    },
    data: {
      title: '내 데이터, 내 규칙',
      description: '우리는 당신의 개인 정보 보호와 데이터 주권을 믿습니다. PongJit에서 생성된 모든 데이터는 브라우저에만 저장됩니다. 우리는 당신의 정보에 접근하거나 볼 수 없습니다.',
      dataStoredTitle: '장치에 저장된 데이터',
      sessions: '세션 기록',
      journalEntries: '일기 항목',
      reframeEntries: '재구성 항목',
      customMixes: '사용자 지정 믹스',
      userPreferences: '사용자 기본 설정',
      actionsTitle: '작업',
      downloadDescription: '모든 세션 및 일기 데이터를 단일 JSON 파일로 다운로드합니다.',
      downloadButton: '내 데이터 다운로드',
      deleteTitle: '위험 구역',
      deleteDescription: '모든 세션 및 일기 데이터를 영구적으로 삭제합니다. 이 작업은 되돌릴 수 없습니다.',
      deleteButton: '모든 데이터 삭제',
      deleteConfirm: '모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      deleteSuccess: '모든 데이터가 성공적으로 삭제되었습니다.'
    },
    reframe: {
        title: '생각 재구성',
        description: '이 CBT 기반 도구로 도움이 되지 않는 생각을 도전하고 바꾸세요.',
        nav_label: '재구성',
        step1_title: '1. 스트레스 받는 생각 식별하기',
        step1_prompt: '무슨 생각을 하고 있나요? 스트레스나 불안을 유발하는 생각을 적어보세요.',
        step1_placeholder: '예: "나는 이 시험에 떨어질 거고 내 인생은 망가질 거야."',
        step1_button: '생각 분석하기',
        step2_title: '2. 분석 및 도전',
        step2_distortion_title: '식별된 패턴',
        step2_questions_title: '도전적인 질문',
        step3_title: '3. 생각 재구성하기',
        step3_prompt: '분석을 바탕으로 AI가 제안하는 더 균형 잡힌 관점입니다. 자유롭게 편집하여 자신의 것으로 만드세요.',
        step3_placeholder: 'AI가 여기에 재구성된 생각을 제안할 것입니다...',
        step3_button: '재구성 저장',
        history_title: '재구성 기록',
        no_history: '아직 재구성한 생각이 없습니다.',
        original_thought: '원래 생각',
        reframed_thought: '재구성된 생각',
        start_new: '다른 생각 재구성하기',
        error: '죄송합니다, 생각을 분석할 수 없습니다. 다시 시도하십시오.',
        distortions: {
            catastrophizing: {
                name: '파국화',
                description: '더 가능성 있는 결과를 고려하지 않고 최악의 시나리오를 예상하는 것.'
            },
        }
    },
    mixer: {
        title: '사운드스케이프 믹서',
        description: '자신만의 사운드 엔지니어가 되어보세요. 집중, 휴식 또는 수면을 위한 완벽한 앰비언트 믹스를 만들고 저장하세요.',
        availableSounds: '사용 가능한 소리',
        myMixes: '내 믹스',
        saveMixTitle: '창작물 저장',
        mixNamePlaceholder: '예: "깊은 집중 비"',
        saveButton: '믹스 저장',
        noMixes: '저장된 믹스가 없습니다.',
        sound: {
            rain: '비',
            forest: '숲',
            waves: '파도',
            cafe: '카페',
            fire: '불',
            wind: '바람',
            piano: '피아노',
        }
    },
    sanctuary: {
      title: '안식처',
      description: '평온과 집중을 회복하기 위한 손쉬운 생체 적응형 공간입니다.',
      select_env: '환경 선택',
      start_session: '세션 시작',
      end_session: '세션 종료',
      environments: {
          forest: '안개 낀 소나무 숲',
          beach: '일몰 해변',
          zen: '달빛 젠 가든',
          meadow: '떠다니는 꽃밭'
      },
      breathing_guide: '빛을 따라 호흡을 안내하세요.'
    },
    footer: {
      inspiredBy: 'Bunyawat Witthayalai 학교 학생들의 프로젝트 개요에서 영감을 받았습니다.',
      conceptual: '이것은 개념적인 응용 프로그램이며 의료 조언을 제공하지 않습니다.',
      powered_by: 'PongJitLLM 인지 모델로 구동됩니다.'
    },
    login: {
      consent_label: '개인화된 경험을 위해 브라우저에 내 데이터를 수집하고 저장하는 데 동의합니다.',
      error_fill_fields: '이름과 이메일 필드를 모두 채우십시오.',
      error_invalid_email: '유효한 이메일 주소를 입력하십시오.',
      error_consent: '계속하려면 데이터 수집에 동의해야 합니다.',
      title: '<span class="accent-gradient-text">PongJit</span>에 오신 것을 환영합니다',
      subtitle: '고급 PongJitLLM 모델로 구동되는 집중과 웰빙을 위한 개인 AI.',
      name_label: '이름',
      name_placeholder: '당신의 이름',
      email_label: '이메일',
      email_placeholder: 'your@email.com',
      continue_button: '계속',
      or_divider: '또는',
      google_button: 'Google로 계속하기',
      facebook_button: 'Facebook으로 계속하기',
      theme_label: '테마:',
      local_storage_note: '이것은 시뮬레이션된 로그인입니다. 정보는 로컬에 저장됩니다.'
    }
};

const hi: typeof en = {
    header: {
      dashboard: 'फोकस',
      training: 'प्रशिक्षण',
      insights: 'अंतर्दृष्टि',
      play: 'खेल क्षेत्र',
      journal: 'जर्नल',
      team: 'टीम हब',
      coach: 'एआई कोच',
      spark: 'स्पार्क',
      data: 'डेटा',
      reframe: 'रीफ्रेम',
      mixer: 'मिक्सर',
      sanctuary: 'अभयारण्य',
    },
    onboarding: {
      welcome: 'PongJit में आपका स्वागत है',
      description: "फोकस और कल्याण के लिए आपका व्यक्तिगत एआई। आइए पहले आपके अनुभव को व्यक्तिगत बनाएं।",
      startSessionTitle: "आज आप किस पर ध्यान केंद्रित कर रहे हैं?",
      placeholder: 'जैसे, भौतिकी पढ़ना, एक परियोजना कोडिंग करना...',
      button: 'सत्र शुरू करें',
      activities: { study: 'पढ़ाई', code: 'कोडिंग', creative: 'रचनात्मक कार्य', other: 'अन्य' },
      proposal: 'Bunyawat Witthayalai स्कूल के छात्रों द्वारा एक परियोजना रूपरेखा पर आधारित।',
      dailyQuote: {
        title: 'आज का विचार'
      },
      assessment: {
        title: "अपने अनुभव को निजीकृत करें",
        goal_q: "आपका प्राथमिक लक्ष्य क्या है?",
        goal_options: {
            stress: "तनाव कम करें",
            focus: "फोकस में सुधार करें",
            sleep: "बेहतर नींद लें",
            general: "समग्र कल्याण"
        },
        sound_q: "किस तरह का माहौल आपकी मदद करता है?",
        sound_options: {
            nature: "प्रकृति की ध्वनियाँ",
            urban: "शहरी माहौल",
            music: "शांत संगीत",
            silent: "शांति"
        },
        complete_button: "शुरू हो जाओ",
        step: "चरण",
        complete_title: "आप पूरी तरह तैयार हैं!",
        complete_subtitle: "आपका अनुभव अब व्यक्तिगत हो गया है।",
      }
    },
    dashboard: {
      sessionOverview: 'सत्र अवलोकन',
      recommendations: 'फोकस उपकरण',
      sessionControl: 'सत्र नियंत्रण',
      sessionActive: (activity: string) => `सत्र सक्रिय: <span class="font-bold text-[var(--accent-color)]">"${activity}"</span>`,
      endSession: 'सत्र समाप्त करें',
      error: 'त्रुटि:',
      connectionError: "PongJit AI से कनेक्ट करने में विफल। कृपया अपना कनेक्शन और API कुंजी जांचें।",
      pomodoro: {
        work: 'फोकस',
        short_break: 'छोटा ब्रेक',
        long_break: 'लंबा ब्रेक',
        start: 'शुरू',
        pause: 'रोकें',
        reset: 'रीसेट',
      },
      focusFlow: {
        title: 'फोकस फ्लो',
        description: 'एक अनुकूली टाइमर जो आपके तनाव के स्तर के आधार पर ब्रेक का सुझाव देता है।',
        start_focus: 'फोकस शुरू करें',
        session_complete: 'फोकस सत्र पूरा हुआ!',
        ai_recommendation: 'एआई सिफारिश',
        start_break: (minutes: number) => `${minutes} मिनट का ब्रेक शुरू करें`,
        skip_break: 'ब्रेक छोड़ें और अगला फोकस शुरू करें',
        breathing_exercise: 'एक श्वास व्यायाम का प्रयास करें',
        proactive_title: "उच्च तनाव का पता चला",
        proactive_take_break: "3 मिनट का ब्रेक लें",
        proactive_continue: "चलते रहो",
        proactive_fallback: "ऐसा लगता है कि चीजें तीव्र हो रही हैं। अभी एक छोटा ब्रेक लेने से आपको मजबूत वापसी करने में मदद मिल सकती है।"
      }
    },
    bioSimulator: {
      title: 'बायो सिम्युलेटर',
      heartRate: 'हृदय गति',
      stressLevel: 'तनाव का स्तर',
      low: 'कम', medium: 'मध्यम', high: 'उच्च',
    },
    musicPlayer: {
      title: 'बायो-एडैप्टिव साउंडस्केप',
      waiting: 'रचना के लिए बायो-सिग्नल की प्रतीक्षा कर रहा है...',
    },
    wellnessTip: {
      title: 'एआई अंतर्दृष्टि',
      waiting: 'अंतर्दृष्टि प्राप्त करने के लिए एक सत्र शुरू करें।',
      waitingTitle: 'विश्लेषण की प्रतीक्षा कर रहा है...',
      breathe: { in: 'साँस अंदर लें', hold: 'रोकें', out: 'साँस बाहर छोड़ें' }
    },
    loading: { composing: 'एआई रचना कर रहा है...', },
    training: {
      title: 'श्वास प्रशिक्षण',
      description: 'वास्तविक समय में तनाव कम करने और फोकस में सुधार करने के लिए सचेत श्वास का अभ्यास करें।',
      button: 'प्रशिक्षण शुरू करें',
      regenerate: 'पुनः उत्पन्न करें',
      currentHr: 'वर्तमान एचआर',
      targetHr: 'लक्ष्य एचआर',
      complete: 'बहुत बढ़िया!',
      tryAgain: 'पुनः प्रयास करें',
      feedbackError: 'क्षमा करें, इस समय प्रतिक्रिया उत्पन्न नहीं की जा सकी।',
      breathe: { in: 'साँस अंदर लें', hold: 'रोकें', out: 'साँस बाहर छोड़ें' },
      modes: {
        breathing: 'श्वास',
        meditation: 'ध्यान'
      },
      meditation: {
        title: 'निर्देशित ध्यान',
        description: 'एआई को अपनी स्थिति के आधार पर शांति या फोकस के लिए एक व्यक्तिगत ध्यान स्क्रिप्ट बनाने दें।',
        button: 'ध्यान उत्पन्न करें',
        generating: 'स्क्रिप्ट उत्पन्न हो रही है...',
      }
    },
     play: {
      title: 'जीवित ज़ेन गार्डन',
      description: 'अपनी सांस को आराम दें और देखें कि आपका बगीचा और पर्यावरण आपके मन की स्थिति के साथ कैसे बदलता है।',
      button: 'बगीचे का पोषण करें',
      nurturing: 'पोषण हो रहा है...',
      complete: 'आपका बगीचा खिल गया है!',
      tryAgain: 'फिर से पोषण करें',
      feedbackError: 'क्षमा करें, प्रतिक्रिया उत्पन्न नहीं की जा सकी।',
      feedbackTitle: 'रखवाले का एक शब्द',
      performance: 'विकास',
    },
    insights: {
        title: 'कल्याण अंतर्दृष्टि',
        clear: 'इतिहास साफ़ करें',
        noHistory: 'अभी तक कोई सत्र डेटा नहीं है। अपना इतिहास यहां देखने के लिए ऐप का उपयोग करने और एक सत्र पूरा करने का प्रयास करें।',
        tabs: {
            report: 'रिपोर्ट',
            log: 'लॉग',
            analytics: 'विश्लेषण',
        },
        report: {
            title: 'एआई कोच कल्याण रिपोर्ट',
            generateButton: "इस सप्ताह की रिपोर्ट तैयार करें",
            generating: 'आपके डेटा का विश्लेषण हो रहा है...',
            summaryCardTitle: 'PongJit से एक संदेश',
            error: 'क्षमा करें, इस समय रिपोर्ट तैयार नहीं की जा सकी।',
            advanced_title: 'उन्नत विश्लेषण',
            advanced_button: 'गहन विश्लेषण तैयार करें',
            generating_advanced: 'गहन अंतर्दृष्टि का विश्लेषण हो रहा है...',
            burnout_risk_title: 'बर्नआउट जोखिम',
            comparative_analysis_title: 'तुलनात्मक विश्लेषण',
            risk_levels: { low: 'कम', medium: 'मध्यम', high: 'उच्च' },
        },
        metrics: {
            title: 'प्रदर्शन मेट्रिक्स',
            period: 'अवधि',
            sevenDays: 'पिछले 7 दिन',
            thirtyDays: 'पिछले 30 दिन',
            allTime: 'हर समय',
            totalSessions: 'कुल सत्र',
            avgStress: 'औसत तनाव',
            mostProductive: 'सबसे आरामदायक गतिविधि',
            mostStressful: 'सबसे तनावपूर्ण गतिविधि',
        },
        charts: {
            stressByTime: {
                title: 'दिन के समय के अनुसार तनाव का स्तर',
                morning: 'सुबह',
                afternoon: 'दोपहर',
                evening: 'शाम',
            },
            insightEffectiveness: {
                title: 'तनाव के स्तर के अनुसार अंतर्दृष्टि प्रकार'
            },
            stressTrends: {
                title: 'गतिविधि के अनुसार तनाव के रुझान',
            },
            insightDistribution: {
                title: 'अंतर्दृष्टि प्रकार का वितरण',
            },
            lifeEventCorrelation: {
                title: 'जीवन की घटनाओं का तनाव के साथ संबंध',
                y_axis_label: 'औसत तनाव स्तर',
            },
            noData: 'इस चार्ट के लिए पर्याप्त डेटा नहीं है।',
        },
        log: {
            title: 'सत्र लॉग',
            activity: 'गतिविधि',
            date: 'दिनांक',
            insight: 'प्राप्त अंतर्दृष्टि:',
        },
    },
    journal: {
      title: 'विचार जर्नल',
      description: "चिंतन के लिए एक निजी स्थान। अपने मन की बात लिखें, और एआई को एक सौम्य दृष्टिकोण प्रदान करने दें।",
      placeholder: "आज आपके मन में क्या है?",
      button: 'सहेजें और विश्लेषण करें',
      loading: 'आपके विचारों का विश्लेषण हो रहा है...',
      error: 'प्रविष्टि का विश्लेषण नहीं किया जा सका। कृपया पुनः प्रयास करें।',
      pastEntries: 'पिछली प्रविष्टियाँ',
      noEntries: 'आपका जर्नल खाली है। अपनी पहली प्रविष्टि लिखें।',
      analysis: {
        title: 'एआई चिंतन',
        emotions: 'मुख्य भावनाएँ',
        summary: 'सारांश',
        reflection: 'सौम्य चिंतन',
        affirmation: 'आपके लिए एक प्रतिज्ञान'
      },
      tags_label: 'टैग जोड़ें (जैसे, नींद की कमी, परीक्षा, अच्छी चीजें)',
      tags_placeholder: 'एक टैग जोड़ें...',
      voice_note_button: 'एक वॉयस नोट रिकॉर्ड करें',
      text_note_button: 'एक टेक्स्ट नोट लिखें',
      recording: 'रिकॉर्डिंग हो रही है...',
      record_again: 'फिर से रिकॉर्ड करें',
      save_voice_note: 'वॉयस नोट सहेजें और विश्लेषण करें',
      voice_analysis: {
        title: 'आवाज का विश्लेषण',
        tone: 'पता लगाया गया स्वर',
        observation: 'मुख्य अवलोकन'
      },
      error_speech_unsupported: "आपके ब्राउज़र में वाक् पहचान समर्थित नहीं है।",
      error_mic_denied: "माइक्रोफोन का उपयोग अस्वीकार कर दिया गया था या एक त्रुटि हुई थी।",
      error_no_speech: "रिकॉर्डिंग में कोई भाषण नहीं मिला। कृपया पुनः प्रयास करें।"
    },
    team: {
        title: 'टीम कल्याण हब',
        description: "एक सहायक और स्वस्थ संस्कृति को बढ़ावा देने के लिए आपकी टीम के कल्याण का एक प्रशासनिक अवलोकन। सभी डेटा एकत्रित और अज्ञात हैं।",
        generateButton: 'टीम अंतर्दृष्टि उत्पन्न करें',
        generating: 'टीम डेटा का विश्लेषण हो रहा है...',
        error: 'क्षमा करें, टीम रिपोर्ट उत्पन्न नहीं की जा सकी।',
        anonymity: 'गोपनीयता की रक्षा के लिए सभी डेटा एकत्रित और अज्ञात हैं।',
        pulse: {
            title: 'एआई-जनित पल्स'
        },
        observation: {
            title: 'सामरिक अवलोकन'
        },
        roster: {
            title: 'टीम रोस्टर',
            name: 'नाम',
            last_active: 'अंतिम सक्रिय',
            status: 'वर्तमान स्थिति',
            status_low: 'शांत',
            status_medium: 'व्यस्त',
            status_high: 'उच्च तनाव',
        },
        communication: {
            title: 'टीम संचार',
            broadcast_button: 'एक संदेश प्रसारित करें',
            broadcast_title: 'अपनी टीम को एक संदेश भेजें',
            broadcast_prompt: 'नीचे अपना संदेश दर्ज करें, या नवीनतम रिपोर्ट के आधार पर एक एआई सुझाव उत्पन्न करें।',
            generate_suggestion: 'संदेश सुझाएं',
            send_broadcast: 'टीम को भेजें',
            message_sent: 'संदेश सफलतापूर्वक भेजा गया!',
            broadcast_placeholder: "आपका संदेश यहाँ...",
        },
        challenge: {
            title: 'सक्रिय कल्याण चुनौती',
            progress: 'प्रगति',
            set_new_challenge: 'नई चुनौती सेट करें',
            generate_ideas: 'विचार उत्पन्न करें',
            new_challenge_title: 'एक नई कल्याण चुनौती सेट करें',
            challenge_name: 'चुनौती का नाम',
            challenge_desc: 'विवरण',
            challenge_goal: 'लक्ष्य (जैसे, 100)',
            challenge_unit: 'इकाई (जैसे, सत्र)',
            save_challenge: 'सक्रिय चुनौती के रूप में सेट करें',
            cancel: 'रद्द करें',
            generating_ideas: 'विचार उत्पन्न हो रहे हैं...',
        },
        kpis: {
            title: 'मुख्य प्रदर्शन संकेतक',
            morale: 'टीम का मनोबल',
            avg_stress: 'औसत तनाव स्तर',
            top_activity: 'सबसे लगातार गतिविधि',
            active_users: 'सक्रिय योगदानकर्ता',
            morale_levels: {
                high: 'सकारात्मक',
                medium: 'स्थिर',
                low: 'ध्यान देने की आवश्यकता है'
            },
        },
        charts: {
            stress_dist: 'तनाव स्तर का वितरण',
            stress_by_activity: 'गतिविधि के अनुसार औसत तनाव',
            sessions_by_day: 'सप्ताह के दिन के अनुसार फोकस सत्र',
            sessions: 'सत्र',
            day_names: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
        },
        no_data: 'प्रदर्शित करने के लिए पर्याप्त डेटा नहीं है। अपनी टीम को उनके सत्र लॉग करने के लिए प्रोत्साहित करें।'
    },
    coach: {
      title: 'व्यक्तिगत एआई कोच',
      persona_name: 'PongJit',
      welcome_message: "नमस्ते! मैं PongJit हूँ, आपका एआई कल्याण कोच। आज मैं आपकी कैसे मदद कर सकता हूँ? अपने मन की बात साझा करने के लिए स्वतंत्र महसूस करें।",
      placeholder: 'अपना संदेश टाइप करें...',
      disclaimer: 'अस्वीकरण: मैं एक एआई हूँ और एक चिकित्सा या मानसिक स्वास्थ्य पेशेवर नहीं हूँ। मेरी सलाह पेशेवर परामर्श का विकल्प नहीं है।',
      system_instruction: "आप 'PongJit' हैं, एक सहानुभूतिपूर्ण और उत्साहजनक एआई कल्याण कोच। आपकी भूमिका उपयोगकर्ता के लिए भावनाओं को व्यक्त करने, विचारों का पता लगाने और सकारात्मक, कार्रवाई योग्य सलाह प्राप्त करने के लिए एक सुरक्षित स्थान बनना है। सहानुभूतिपूर्ण बनें, उपयोगकर्ता को अपने विचारों का पता लगाने में मदद करने के लिए प्रश्न पूछें, और सचेतनता, पुनर्गठन, और छोटे, प्राप्त करने योग्य लक्ष्य निर्धारित करने जैसे सकारात्मक मनोविज्ञान सिद्धांतों पर आधारित सौम्य सलाह प्रदान करें। चिकित्सा सलाह या निदान न दें। बातचीत को संक्षिप्त और स्वाभाविक रखें।",
      error_message: 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।'
    },
    spark: {
        title: 'विचार स्पार्क',
        description: 'इस एआई उपकरण के साथ रचनात्मक बाधाओं को दूर करें। अपना विषय दर्ज करें और शुरू करने के लिए एक मोड चुनें।',
        topic_label: 'अपना विषय या समस्या दर्ज करें',
        placeholder: 'जैसे, "दोपहर में कैसे केंद्रित रहें", "जलवायु परिवर्तन पर एक विज्ञान परियोजना के लिए विचार"...',
        button: 'विचार उत्पन्न करें',
        loading: 'विचारों को चिंगारी दे रहा है...',
        error: 'क्षमा करें, इस समय विचार उत्पन्न नहीं किए जा सके।',
        response_title: 'यहाँ कुछ विचार हैं:',
        modes: {
            brainstorm: {
                title: 'विचार-मंथन',
                description: 'विविध और अप्रत्याशित अवधारणाएँ उत्पन्न करें।',
                system_instruction: "आप एक एआई विचार-मंथन भागीदार हैं। एक विषय दिए जाने पर, इससे संबंधित 10 रचनात्मक, अपरंपरागत और विचारोत्तेजक विचारों की एक विविध सूची तैयार करें। आउटपुट एक साधारण सूची होनी चाहिए। उपयोगकर्ता की भाषा में जवाब दें।"
            },
            questions: {
                title: 'प्रश्न पूछें',
                description: 'अंतर्दृष्टिपूर्ण प्रश्नों के साथ नए कोणों से विषय का अन्वेषण करें।',
                system_instruction: "आप एक एआई हैं जो अंतर्दृष्टिपूर्ण प्रश्न उत्पन्न करता है। एक विषय दिए जाने पर, 10 खुले-अंत वाले, जांच करने वाले प्रश्न पूछें जो धारणाओं को चुनौती देते हैं और विषय के बारे में गहरी सोच को प्रोत्साहित करते हैं। आउटपुट एक साधारण प्रश्न सूची होनी चाहिए। उपयोगकर्ता की भाषा में जवाब दें।"
            },
            metaphors: {
                title: 'रूपक',
                description: 'रचनात्मक उपमाओं के माध्यम से जटिल अवधारणाओं को समझें।',
                system_instruction: "आप एक एआई हैं जो शक्तिशाली रूपक बनाता है। एक विषय दिए जाने पर, 5 अद्वितीय और वर्णनात्मक रूपक या उपमाएँ उत्पन्न करें जो विषय को एक नई रोशनी में समझाते हैं। आउटपुट एक साधारण सूची होनी चाहिए। उपयोगकर्ता की भाषा में जवाब दें।"
            },
            roleplay: {
                title: 'भूमिका निभाना',
                description: 'विभिन्न व्यक्तित्वों को अपनाकर परिप्रेक्ष्य प्राप्त करें।',
                system_instruction: "आप एक एआई भूमिका निभाने वाले सहायक हैं। एक विषय दिए जाने पर, 3 छोटे, अलग-अलग व्यक्तित्व बनाएं (जैसे, 'एक संशयवादी विशेषज्ञ', 'एक जिज्ञासु बच्चा', 'एक निराश उपयोगकर्ता') और संक्षेप में वर्णन करें कि प्रत्येक विषय पर कैसे पहुंचेगा या उसे कैसे देखेगा। आउटपुट उनके दृष्टिकोण के साथ व्यक्तित्वों की एक सूची होनी चाहिए। उपयोगकर्ता की भाषा में जवाब दें।"
            }
        }
    },
    data: {
      title: 'मेरा डेटा, मेरे नियम',
      description: 'हम आपकी गोपनीयता और डेटा संप्रभुता में विश्वास करते हैं। PongJit में उत्पन्न सभी डेटा केवल आपके ब्राउज़र में संग्रहीत होता है। हम आपकी जानकारी तक नहीं पहुँच सकते हैं या उसे नहीं देख सकते हैं।',
      dataStoredTitle: 'आपके डिवाइस पर संग्रहीत डेटा',
      sessions: 'सत्र रिकॉर्ड',
      journalEntries: 'जर्नल प्रविष्टियाँ',
      reframeEntries: 'रीफ्रेम प्रविष्टियाँ',
      customMixes: 'कस्टम मिक्स',
      userPreferences: 'उपयोगकर्ता प्राथमिकताएँ',
      actionsTitle: 'कार्रवाइयाँ',
      downloadDescription: 'अपने सभी सत्र और जर्नल डेटा को एक ही JSON फ़ाइल के रूप में डाउनलोड करें।',
      downloadButton: 'मेरा डेटा डाउनलोड करें',
      deleteTitle: 'खतरा क्षेत्र',
      deleteDescription: 'अपने सभी सत्र और जर्नल डेटा को स्थायी रूप से हटा दें। यह क्रिया पूर्ववत नहीं की जा सकती है।',
      deleteButton: 'सभी डेटा हटाएं',
      deleteConfirm: 'क्या आप वाकई सभी डेटा हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती है।',
      deleteSuccess: 'आपका सारा डेटा सफलतापूर्वक हटा दिया गया है।'
    },
    reframe: {
        title: 'विचार रीफ्रेम',
        description: 'इस सीबीटी-आधारित उपकरण के साथ अनुपयोगी विचारों को चुनौती दें और बदलें।',
        nav_label: 'रीफ्रेम',
        step1_title: '1. एक तनावपूर्ण विचार की पहचान करें',
        step1_prompt: 'आपके मन में क्या है? एक ऐसा विचार लिखें जो आपको तनाव या चिंता पैदा कर रहा है।',
        step1_placeholder: 'जैसे, "मैं इस परीक्षा में असफल हो जाऊंगा और मेरा जीवन बर्बाद हो जाएगा।"',
        step1_button: 'विचार का विश्लेषण करें',
        step2_title: '2. विश्लेषण और चुनौती',
        step2_distortion_title: 'पहचाना गया पैटर्न',
        step2_questions_title: 'चुनौतीपूर्ण प्रश्न',
        step3_title: '3. अपने विचार को रीफ्रेम करें',
        step3_prompt: 'विश्लेषण के आधार पर, यहाँ एआई द्वारा सुझाया गया एक अधिक संतुलित दृष्टिकोण है। इसे अपना बनाने के लिए इसे संपादित करने के लिए स्वतंत्र महसूस करें।',
        step3_placeholder: 'एआई यहाँ एक रीफ्रेम किया हुआ विचार सुझाएगा...',
        step3_button: 'रीफ्रेम सहेजें',
        history_title: 'आपका रीफ्रेम इतिहास',
        no_history: 'आपने अभी तक कोई विचार रीफ्रेम नहीं किया है।',
        original_thought: 'मूल विचार',
        reframed_thought: 'रीफ्रेम किया हुआ विचार',
        start_new: 'एक और विचार रीफ्रेम करें',
        error: 'क्षमा करें, विचार का विश्लेषण नहीं किया जा सका। कृपया पुनः प्रयास करें।',
        distortions: {
            catastrophizing: {
                name: 'आपत्तीकरण',
                description: 'अधिक संभावित परिणामों पर विचार किए बिना सबसे खराब स्थिति की उम्मीद करना।'
            },
        }
    },
    mixer: {
        title: 'साउंडस्केप मिक्सर',
        description: 'अपने खुद के साउंड इंजीनियर बनें। फोकस, विश्राम, या नींद के लिए अपना आदर्श परिवेश मिश्रण बनाएं और सहेजें।',
        availableSounds: 'उपलब्ध ध्वनियाँ',
        myMixes: 'मेरे मिक्स',
        saveMixTitle: 'अपनी रचना सहेजें',
        mixNamePlaceholder: 'जैसे, "गहन फोकस वर्षा"',
        saveButton: 'मिक्स सहेजें',
        noMixes: 'आपके पास कोई सहेजा हुआ मिक्स नहीं है।',
        sound: {
            rain: 'वर्षा',
            forest: 'जंगल',
            waves: 'लहरें',
            cafe: 'कैफे',
            fire: 'आग',
            wind: 'हवा',
            piano: 'पियानो',
        }
    },
    sanctuary: {
      title: 'अभयारण्य',
      description: 'शांति और फोकस को बहाल करने के लिए एक सहज, बायो-एडैप्टिव स्थान।',
      select_env: 'पर्यावरण चुनें',
      start_session: 'सत्र शुरू करें',
      end_session: 'सत्र समाप्त करें',
      environments: {
          forest: 'धुंध भरा देवदार का जंगल',
          beach: 'सूर्यास्त समुद्र तट',
          zen: 'चांदनी ज़ेन गार्डन',
          meadow: 'तैरता हुआ फूलों का मैदान'
      },
      breathing_guide: 'अपनी सांस का मार्गदर्शन करने के लिए प्रकाश का पालन करें।'
    },
    footer: {
      inspiredBy: 'Bunyawat Witthayalai स्कूल के छात्रों द्वारा एक परियोजना रूपरेखा से प्रेरित।',
      conceptual: 'यह एक वैचारिक अनुप्रयोग है और चिकित्सा सलाह प्रदान नहीं करता है।',
      powered_by: 'PongJitLLM संज्ञानात्मक मॉडल द्वारा संचालित।'
    },
    login: {
      consent_label: 'मैं एक व्यक्तिगत अनुभव के लिए ब्राउज़र में मेरे डेटा के संग्रह और भंडारण के लिए सहमत हूँ।',
      error_fill_fields: 'कृपया नाम और ईमेल दोनों फ़ील्ड भरें।',
      error_invalid_email: 'कृपया एक वैध ईमेल पता दर्ज करें।',
      error_consent: 'जारी रखने के लिए आपको डेटा संग्रह के लिए सहमत होना होगा।',
      title: '<span class="accent-gradient-text">PongJit</span> में आपका स्वागत है',
      subtitle: 'उन्नत PongJitLLM मॉडल द्वारा संचालित, फोकस और कल्याण के लिए आपका व्यक्तिगत एआई।',
      name_label: 'नाम',
      name_placeholder: 'आपका नाम',
      email_label: 'ईमेल',
      email_placeholder: 'your@email.com',
      continue_button: 'जारी रखें',
      or_divider: 'या',
      google_button: 'Google के साथ जारी रखें',
      facebook_button: 'Facebook के साथ जारी रखें',
      theme_label: 'थीम:',
      local_storage_note: 'यह एक नकली लॉगिन है। जानकारी स्थानीय रूप से संग्रहीत है।'
    }
};


const translations: Record<Language, typeof en> = {
    en,
    th,
    es,
    ja,
    fr,
    de,
    pt,
    ru,
    zh,
    ko,
    hi,
};

export const i18n = (lang: Language) => {
    return translations[lang] || translations.en;
};

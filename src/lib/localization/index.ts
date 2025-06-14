export type Language = 'en' | 'az' | 'ru';

export interface Translations {  // Header
  header: {
    brandName: string;
    languageSelector: string;
  },
  // Blog Section
  blog: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    readMore: string;
    backToHome: string;
    backToBlogs: string;
    selectLanguage: string;
    viewAllBlogs: string;
  },
  
  // Blog Section for Landing Page
  blogSection: {
    title: string;
    subtitle: string;
    seeAllBlogs: string;
    readMore: string;
    noBlogs: string;
  },
  
  // Medication Reminder Section
  medicationReminder: {
    title: string;
    subtitle: string;
    features: {
      reminders: {
        title: string;
        description: string;
      },
      tracking: {
        title: string;
        description: string;
      },
    },
  },
  
  // Common conditions section
  conditions: {
    sectionTitle: string;
    subtitle: string;
    anxiety: {
      title: string;
      symptoms: string[];
    },
    depression: {
      title: string;
      symptoms: string[];
    },
    bipolarDisorder: {
      title: string;
      symptoms: string[];
    },
    panicAttack: {
      title: string;
      symptoms: string[];
    },
    insomnia: {
      title: string;
      symptoms: string[];
    },
    adhd: {
      title: string;
      symptoms: string[];
    },
    ptsd: {
      title: string;
      symptoms: string[];
    },
    otherConditions: {
      title: string;
      symptoms: string[];
    },
  },
  
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    cta: string;
    privacyNote: string;
    sessionNotification: string;
  };
  
  // Trust Indicators
  trustIndicators: {
    bestTelehealth: string;
    platform2023: string;
    medtechBreakthrough: string;
    appRating: string;
    forbesBest: string;
    clientsHelped: string;
  };
  
  // Why Choose Section
  whyChoose: {
    title: string;
    features: {
      convenient: {
        title: string;
        description: string;
      };
      specialists: {
        title: string;
        description: string;
      };
      support247: {
        title: string;
        description: string;
      };
      affordable: {
        title: string;
        description: string;
      };
    };
    cta: string;
  };
  
  // Quality Care Section
  qualityCare: {
    title1: string;
    title2: string;
    stats: {
      stat1: string;
      stat2: string;
      stat3: string;
    };
    footnote: string;
  };
  
  // Why TeleTebib Section
  whyTeleTebib: {
    title: string;
    benefits: {
      specialists: {
        title: string;
        description: string;
      };
      personalizedPlans: {
        title: string;
        description: string;
      };
      comfortable: {
        title: string;
        description: string;
      };
    };
    cta: string;
  };
    // Medical Specialties Section
  specialties: {
    title: string;
    subtitle: string;
    names: {
      generalPractitioner: string;
      pediatrician: string;
      internalMedicine: string;
      cardiologist: string;
      endocrinologist: string;
      pulmonologist: string;
      gastroenterologist: string;
      neurologist: string;
      neurosurgeon: string;
      orthopedist: string;
      gynecologist: string;
      urologist: string;
      psychiatrist: string;
      psychologist: string;
      logoped: string;
      dermatologist: string;
      ophthalmologist: string;
      ent: string;
      oncologist: string;
      rheumatologist: string;
      nutritionist: string;
      allergist: string;
      nephrologist: string;
      obstetrician: string;
      generalSurgeon: string;
      orthopedicSurgeon: string;
      traumatologist: string;
      hematologist: string;
      infectiousDisease: string;
      sexualHealth: string;
      physiotherapist: string;
    };  };
  
  // Our Services Section
  ourServices: {
    title: string;
    subtitle: string;
    services: {
      medication: {
        title: string;
        description: string;
      };
      individualTherapy: {
        title: string;
        description: string;
      };
      couplesTherapy: {
        title: string;
        description: string;
      };
      therapyMedication: {
        title: string;
        description: string;
      };
    };
    cta: string;
  };
  
  // How It Works Section
  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
    };
    notification: string;
  };
  
  // Waitlist Section
  waitlist: {
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    cta: string;
    privacyNote: string;
    stats: {
      waitingList: string;
      betaInvite: string;
    };
  };
  
  // Doctor Section
  doctorSection: {
    title: string;
    subtitle: string;
    cta: string;
    limitedAccess: string;
    stats: {
      registeredDoctors: string;
      coveredRegions: string;
      satisfaction: string;
    };
  };
  
  // Doctor Registration Dialog
  doctorDialog: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      surname: string;
      mobileNumber: string;
      licenseNumber: string;
    };
    placeholders: {
      name: string;
      surname: string;
      mobileNumber: string;
      licenseNumber: string;
    };
    buttons: {
      cancel: string;
      submit: string;
      submitting: string;
    };
    messages: {
      success: string;
      error: string;
    };
  };
    // CTA Section
  cta: {
    patient: {
      title: string;
      subtitle: string;
      features: {
        security: string;
        accessibility: string;
      };
      buttons: {
        join: string;
        learnMore: string;
      };
    };
    doctor: {
      title: string;
      subtitle: string;
      features: {
        experts: string;
        availability: string;
      };
      buttons: {
        findDoctor: string;
        moreArticles: string;
      };
    };
  };
  
  // Testimonials Section
  testimonials: {
    title: string;
  };
  
  // FAQ Section
  faq: {
    title: string;
    questions: {
      whatIsTeleTebib: {
        question: string;
        answer: string;
      };
      isOnlineReliable: {
        question: string;
        answer: string;
      };
      anySpecialist: {
        question: string;
        answer: string;  
      };
      whenAvailable: {
        question: string;
        answer: string;
      };
      prescriptions: {
        question: string;
        answer: string;
      };
      isPaid: {
        question: string;
        answer: string;
      };
      whereOperates: {
        question: string;
        answer: string;
      };
      psychologyAppointment: {
        question: string;
        answer: string;
      };
      videoConsultation: {
        question: string;
        answer: string;
      };
      dataSecurity: {
        question: string;
        answer: string;
      };
      changeAppointment: {
        question: string;
        answer: string;
      };
      abroad: {
        question: string;
        answer: string;
      };
      doctorEducation: {
        question: string;
        answer: string;
      };
      labTests: {
        question: string;
        answer: string;
      };
      joinAsDoctor: {
        question: string;
        answer: string;
      };
      doctorSchedule: {
        question: string;
        answer: string;
      };
      doctorBenefits: {
        question: string;
        answer: string;
      };
    };
  };
  
  // Footer
  footer: {
    brandName: string;
    copyright: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
    emergencyNotice: string;
  };
  
  // General Messages
  messages: {
    alreadyInWaitlist: string;
    generalError: string;
    thanks: string;
    emailRegistered: string;
  };
}

// English translations
export const en: Translations = {  header: {
    brandName: "TeleTebib",
    languageSelector: "Select language (coming soon)",
  },
  blog: {
    title: "Our Blogs",
    subtitle: "Latest articles and tips on health, medicine and wellness topics",
    searchPlaceholder: "Search in blogs...",
    readMore: "Read",
    backToHome: "Back to Home",
    backToBlogs: "Back to Blogs",
    selectLanguage: "Select language",
    viewAllBlogs: "View All Blogs",
  },
  
  blogSection: {
    title: "Latest Health Articles",
    subtitle: "Stay informed with our latest insights on health, medicine, and wellness",
    seeAllBlogs: "See All Articles",
    readMore: "Read More",
    noBlogs: "No articles available yet",
  },
  
  medicationReminder: {
    title: "Take your medications on time",
    subtitle: "Keep your treatment consistent with the reminder system in the app. Set up individual reminders and stick to your treatment plan.",
    features: {
      reminders: {
        title: "Personalized reminders",
        description: "Customized notifications based on your prescription schedule",
      },
      tracking: {
        title: "Intake tracking",
        description: "Track your intake history and share it with your doctor",
      },
    },
  },  conditions: {
    sectionTitle: "Mental Health Conditions We Effectively Treat",
    subtitle: "Expert care for your emotional wellbeing, with personalized treatment plans for various mental health concerns.",
    anxiety: {
      title: "Anxiety",
      symptoms: [
        "Nervousness",
        "Panic",
        "Racing heart",
        "Hyperventilation",
        "Trembling",
        "Fatigue",
        "Focus problems",
        "Insomnia",
        "Restlessness",
      ],
    },
    depression: {
      title: "Depression",
      symptoms: [
        "Sadness",
        "Hopelessness",
        "Irritability",
        "Guilt",
        "Anhedonia",
        "Fatigue",
        "Brain fog",
        "Insomnia",
        "Appetite changes",
        "Suicidal thoughts",
      ],
    },
    bipolarDisorder: {
      title: "Bipolar Disorder",
      symptoms: [
        "Mood swings",
        "Depression",
        "Elevated energy",
        "Reduced sleep",
        "Talkativeness",
        "Impulsivity",
        "Reality distortion",
      ],
    },
    panicAttack: {
      title: "Panic Attack",
      symptoms: [
        "Terror",
        "Racing heartbeat",
        "Breathlessness",
        "Choking",
        "Chest pain",
        "Nausea",
        "Dizziness",
        "Hot flashes",
        "Numbness",
        "Loss of control",
        "Death fear",
      ],
    },
    insomnia: {
      title: "Insomnia",
      symptoms: [
        "Sleep difficulty",
        "Night waking",
        "Early rising",
        "Morning fatigue",
        "Daytime drowsiness",
        "Irritability",
        "Poor concentration",
        "Frequent mistakes",
        "Headaches",
        "Digestive issues",
      ],
    },
    adhd: {
      title: "ADHD",
      symptoms: [
        "Inattention",
        "Hyperactivity",
        "Impulsivity",
        "Disorganization",
        "Forgetfulness",
        "Fidgeting",
        "Restlessness",
        "Over-talking",
        "Interrupting",
        "Impatience",
      ],
    },
    ptsd: {
      title: "PTSD",
      symptoms: [
        "Flashbacks",
        "Avoidance",
        "Negative thoughts",
        "Hypersensitivity",
        "Insomnia",
        "Irritability",
        "Concentration issues",
        "Detachment",
        "Guilt",
        "Disinterest",
      ],
    },
    otherConditions: {
      title: "Other Conditions",
      symptoms: [
        "Unspecified distress",
        "Physical symptoms",
        "Stress-related",
        "Life adjustments",
      ],
    },
  },
    hero: {
    title: "Take Care of Your Health with Online Medical Services",
    subtitle: "Connect with professional doctors anytime, anywhere without leaving home. TeleTebib provides online consultation and treatment services in various medical fields.",
    emailPlaceholder: "Enter your email address",
    cta: "Get early access",
    privacyNote: "Register to learn about the service and launch date",
    sessionNotification: "Your session has been successfully registered",
  },
  
  trustIndicators: {
    bestTelehealth: "Doctors onboarded",
    platform2023: "Medical specialists",
    medtechBreakthrough: "Growing network",
    appRating: "Beta tester rating",
    forbesBest: "In private beta testing",
    clientsHelped: "Waitlist users",
  },
  
  whyChoose: {
    title: "Why choose online medical services?",
    features: {
      convenient: {
        title: "Convenient & Accessible",
        description: "Connect with doctors from anywhere with an internet connection.",
      },
      specialists: {
        title: "Wide Range of Specialists",
        description: "Specialists in therapy, pediatrics, cardiology, endocrinology and many more areas.",
      },
      support247: {
        title: "24/7 Support",
        description: "Get medical advice at any time of the day.",
      },
      affordable: {
        title: "Affordable Prices",
        description: "Benefit from more cost-effective services compared to traditional clinic services.",
      },
    },
    cta: "Join us",
  },
  
  qualityCare: {
    title1: "Reliable medical service.",
    title2: "Real results.",
    stats: {
      stat1: "Users meet with a doctor within 3 days of registration*",      stat2: "Patients attending follow-up appointments report symptom improvement within 3 months*",
      stat3: "Users report increased sense of health control within 90 days*",
    },
    footnote: "*based on all TeleTebib clients with moderate to severe anxiety and/or depression from 2024-2025.",
  },
  
  whyTeleTebib: {
    title: "Why TeleTebib?",
    benefits: {
      specialists: {
        title: "High-level specialists",
        description: "Our team includes licensed professionals in various specialties — average satisfaction rating 4.8/5.",
      },
      personalizedPlans: {
        title: "Personalized treatment plans",
        description: "Each session is conducted with an individual approach — for condition management, follow-ups, or second opinions.",
      },
      comfortable: {
        title: "Comfortable experience",
        description: "Secure platform, simple scheduling, and participation from anywhere.",
      },
    },
    cta: "Join us",
  },
    specialties: {
    title: "Specialties we offer",
    subtitle: "Connect with doctors and specialists in various fields through one platform.",
    names: {
      generalPractitioner: "General Practitioner",
      pediatrician: "Pediatrician",
      internalMedicine: "Internal Medicine",
      cardiologist: "Cardiologist",
      endocrinologist: "Endocrinologist",
      pulmonologist: "Pulmonologist",
      gastroenterologist: "Gastroenterologist",
      neurologist: "Neurologist",
      neurosurgeon: "Neurosurgeon",
      orthopedist: "Orthopedist",
      gynecologist: "Gynecologist",
      urologist: "Urologist",
      psychiatrist: "Psychiatrist",
      psychologist: "Psychologist",
      logoped: "Speech therapist",
      dermatologist: "Dermatologist",
      ophthalmologist: "Ophthalmologist",
      ent: "ENT",
      oncologist: "Oncologist",
      rheumatologist: "Rheumatologist",
      nutritionist: "Nutritionist",
      allergist: "Allergist",
      nephrologist: "Nephrologist",
      obstetrician: "Obstetrician",
      generalSurgeon: "General Surgeon",
      orthopedicSurgeon: "Orthopedic Surgeon",
      traumatologist: "Traumatologist",
      hematologist: "Hematologist",
      infectiousDisease: "Infectious Disease",
      sexualHealth: "Sexual Health",      physiotherapist: "Physiotherapist",
    },
  },
  
  ourServices: {
    title: "Our Services",
    subtitle: "Comprehensive care options tailored to your needs. Choose the service that fits your health goals.",
    services: {
      medication: {
        title: "Medication Management",
        description: "Ongoing medication management with licensed doctors",
      },
      individualTherapy: {
        title: "Individual Therapy",
        description: "Private sessions tailored to your goals",
      },
      couplesTherapy: {
        title: "Couples Therapy",
        description: "Strengthen your relationship with experienced therapists",
      },
      therapyMedication: {
        title: "Therapy & Medication",
        description: "Comprehensive approach combining therapy with medication",
      },
    },
    cta: "Join us",
  },
  
  howItWorks: {
    title: "How does it work?",
    subtitle: "Schedule an appointment with a doctor and get an online consultation in 3 simple steps.",
    steps: {
      step1: {
        title: "Register and create a profile",
        description: "Enter your information in a simple form and create an account.",
      },
      step2: {
        title: "Choose a doctor and schedule a time",
        description: "Select a doctor with the appropriate specialty and schedule an appointment at a time that suits you.",
      },
      step3: {
        title: "Conduct online consultation",
        description: "Connect with the doctor via video, voice call, or written chat.",
      },
    },
    notification: "Get a comprehensive health assessment",
  },
  
  waitlist: {
    title: "Want to be the first to know and get access?",
    subtitle: "Join the waiting list and receive updates about the app, participate in the testing phase. Let's take a big step together.",
    emailPlaceholder: "Enter your email address",
    cta: "Join waiting list",
    privacyNote: "We don't send spam. You can unsubscribe at any time.",
    stats: {
      waitingList: "On waiting list",
      betaInvite: "Beta group invite",
    },
  },
  
  doctorSection: {
    title: "Are you a doctor?",
    subtitle: "We invite doctors for early registration to provide healthcare services — join our growing team and serve patients across the country.",
    cta: "Apply to join our network",
    limitedAccess: "Limited early access available",
    stats: {
      registeredDoctors: "Registered doctors",
      coveredRegions: "Covered regions",
      satisfaction: "Successful doctor satisfaction",
    },
  },
  
  doctorDialog: {
    title: "Doctor Registration",
    subtitle: "Enter your information and join our team.",
    fields: {
      name: "Name",
      surname: "Surname",
      mobileNumber: "Mobile number",
      licenseNumber: "License number",
    },
    placeholders: {
      name: "Enter your name",
      surname: "Enter your surname",
      mobileNumber: "+994 XX XXX XX XX",
      licenseNumber: "Enter your license number",
    },
    buttons: {
      cancel: "Cancel",
      submit: "Submit",
      submitting: "Submitting...",
    },    messages: {
      success: "Your application has been submitted successfully. We will contact you.",
      error: "An error occurred. Please try again.",
    },
  },
  
  cta: {
    patient: {
      title: "Join the waitlist for healthcare",
      subtitle: "Sign up on the TeleTebib platform and join our waitlist to get access to doctor consultations and health monitoring features.",
      features: {
        security: "Secure platform",
        accessibility: "Easy access",
      },
      buttons: {
        join: "Join us",
        learnMore: "Learn more",
      },
    },
    doctor: {
      title: "Are You a Doctor? Join Our Platform",
      subtitle: "Register for early access as a healthcare provider on TeleTebib. Start earning by providing online consultations and be part of Azerbaijan's leading telemedicine platform.",
      features: {
        experts: "Growing network of 50+ doctors",
        availability: "Flexible working hours",
      },
      buttons: {
        findDoctor: "Register as Doctor",
        moreArticles: "Learn About Our Platform",
      },
    },
  },
  
  testimonials: {
    title: "Reviews",
  },
  
  faq: {
    title: "Frequently asked questions",
    questions: {
      whatIsTeleTebib: {
        question: "What is TeleTebib and how does it work?",
        answer: "TeleTebib is an online medical platform operating in Azerbaijan. Patients can receive medical consultations with certified doctors via video, voice calls, and written chat. Simply register, choose a service, and schedule an appointment with a doctor.",
      },
      isOnlineReliable: {
        question: "Are online doctor consultations reliable?",
        answer: "Yes, online medical advice and psychological support services are provided by licensed and experienced doctors. TeleTebib uses an encrypted platform that protects data security.",
      },
      anySpecialist: {
        question: "Can I have online meetings with any specialist?",
        answer: "Absolutely. Psychiatrists, therapists, cardiologists, gynecologists, dermatologists, pediatricians, and doctors in 20+ other specialties are available on the TeleTebib platform.",
      },
      whenAvailable: {
        question: "When can I get online medical consultations?",
        answer: "On the TeleTebib platform, it's possible to schedule appointments with online doctors 24/7, at any time of the day. Specialist selection is also offered when urgent medical assistance is needed.",
      },
      prescriptions: {
        question: "How are prescriptions and medications provided?",
        answer: "After an online consultation, your doctor can provide you with a digital prescription. The prescription is sent to your email or app and is valid at pharmacies in Azerbaijan.",
      },
      isPaid: {
        question: "Are TeleTebib services paid?",
        answer: "Yes, TeleTebib operates on a subscription-based model. Additionally, it is covered by some insurance companies — you can check the coverage scope.",
      },
      whereOperates: {
        question: "Where does TeleTebib operate in Azerbaijan?",
        answer: "TeleTebib serves patients living in Baku, Ganja, Sumgayit, Sheki, Lankaran, and other cities. Since it's online, it can be used from any region.",
      },
      psychologyAppointment: {
        question: "How can I schedule an appointment with an online psychologist or psychiatrist?",
        answer: "Simply click the 'Choose Service' button, select 'Psychological Support' or 'Psychiatric Assistance' section, find a suitable specialist, and schedule a time. The entire process takes less than 3 minutes.",
      },
      videoConsultation: {
        question: "How are video consultations conducted on TeleTebib?",
        answer: "Video sessions are conducted with encrypted and high-quality video. Your and the doctor's personal information is protected. Service is also available in written chat or voice call format if desired.",
      },
      dataSecurity: {
        question: "How is the security of my data ensured?",
        answer: "TeleTebib protects your data with HIPAA compliance (EU standard) and end-to-end encryption technology. No information is shared with third parties.",
      },
      changeAppointment: {
        question: "Is it possible to change or cancel after scheduling an appointment?",
        answer: "Yes, changing or canceling your appointment at least 1 hour before scheduling is completely free. Just make the change in the app.",
      },
      abroad: {
        question: "I live abroad. Can I use TeleTebib services?",
        answer: "Yes. Online doctor consultation and digital psychological support services are also available for Azerbaijanis living abroad. You just need an internet connection.",
      },
      doctorEducation: {
        question: "Where did TeleTebib doctors get their education?",
        answer: "All our doctors: Are graduates of Medical University or foreign accredited universities, Have licenses and clinical experience, Regularly participate in professional development training",
      },
      labTests: {
        question: "Are there referrals for laboratory analyses and tests?",
        answer: "Yes. If your doctor deems it necessary, they can refer you to contracted laboratories. Results can be uploaded to the platform and evaluated by the doctor.",
      },
      joinAsDoctor: {
        question: "How can I join the TeleTebib platform as a doctor?",
        answer: "If you are a certified and experienced doctor, you can apply to provide online services on the TeleTebib platform. Simply fill out the form in the 'Join as a Doctor' section. Our team will put you through the testing and evaluation phase. After 100% confirmation, you can start operating on the TeleTebib platform.",
      },
      doctorSchedule: {
        question: "Can doctors set their own working hours and prices on TeleTebib?",
        answer: "Yes! Doctors who join the TeleTebib platform can completely independently plan their working hours and set consultation prices. This creates more flexible and independent work opportunities for you.",
      },
      doctorBenefits: {
        question: "What advantages does operating on TeleTebib create for doctors?",
        answer: "TeleTebib provides doctors with: Additional income opportunities through online activity, Comfortable contact with patients without the need for additional clinics, Freedom to work from anywhere and at any time, Time savings with digital prescription and monitoring systems, The opportunity to serve patients through a modern and secure telemedicine platform",
      },
    }
  },
  
  footer: {
    brandName: "TeleTebib",
    copyright: "© 2024 TeleTebib, Inc. All rights reserved.",
    socialMedia: {
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
    emergencyNotice: "TeleTebib does not offer emergency services. In the event of a mental health emergency, call 988 or the National Suicide Prevention Lifeline at 1-800-273-8255.",
  },
  
  messages: {
    alreadyInWaitlist: "You are already on the waiting list",
    generalError: "An error occurred. Please try again.",
    thanks: "Thank you!",
    emailRegistered: "Your email address has been successfully registered.",
  },
};

// Azerbaijani translations (base language)
export const az: Translations = {  header: {
    brandName: "TeleTebib",
    languageSelector: "Dil seçin (tezliklə)",
  },
  blog: {
    title: "Bloqlarımız",
    subtitle: "Sağlamlıq, təbabət və wellness mövzularında ən son məqalələr və məsləhətlər",
    searchPlaceholder: "Bloqlarda axtar...",
    readMore: "Oxu",
    backToHome: "Ana Səhifəyə Qayıt",
    backToBlogs: "Bloqlara qayıt",
    selectLanguage: "Dil seçin",
    viewAllBlogs: "Bütün bloqlara bax",
  },
  
  blogSection: {
    title: "Ən Son Sağlamlıq Məqalələri",
    subtitle: "Sağlamlıq, təbabət və wellness sahələrində ən son fikirlərimizlə məlumat əldə edin",
    seeAllBlogs: "Bütün Məqalələrə Bax",
    readMore: "Daha Çox Oxu",
    noBlogs: "Hələ heç bir məqalə mövcud deyil",
  },
  
  medicationReminder: {
    title: "Dərmanlarınızı vaxtında qəbul edin",
    subtitle: "Tətbiq daxilindəki xatırlatma sistemi ilə müalicənizi davamlı saxlayın. Fərdi xatırlatmalar qurun və müalicə planınıza sadiq qalın.",
    features: {
      reminders: {
        title: "Fərdi xatırlatmalar",
        description: "Resept cədvəlinizə əsasən fərdiləşdirilmiş bildirişlər",
      },
      tracking: {
        title: "Qəbul izləmə",
        description: "Qəbul tarixçənizi izləyin və həkiminizlə paylaşın",
      },
    },
  },    conditions: {
    sectionTitle: "Effektiv Müalicə Etdiyimiz Psixi Sağlamlıq Pozuntuları",
    subtitle: "Müxtəlif psixi sağlamlıq narahatlıqları üçün fərdi müalicə planları ilə emosional rifahınız üçün peşəkar qayğı.",
    anxiety: {
      title: "Narahatlıq",
      symptoms: [
        "Gərginlik",
        "Panika",
        "Tez ürək döyüntüsü",
        "Hiperventilyasiya",
        "Titrəyiş",
        "Yorğunluq",
        "Diqqət problemi",
        "Yuxusuzluq",
        "Narahatlıq",
      ],
    },    depression: {
      title: "Depressiya",
      symptoms: [
        "Kədərlilik",
        "Ümidsizlik",
        "Qıcıqlanma",
        "Günahkarlıq",
        "Maraqsızlıq",
        "Yorğunluq",
        "Beyin dumanı",
        "Yuxusuzluq",
        "İştah dəyişikliyi",
        "İntihar fikirləri",
      ],
    },    bipolarDisorder: {
      title: "Bipolyar Pozuntu",
      symptoms: [
        "Əhval dəyişikliyi",
        "Depressiya",
        "Enerjililik",
        "Yuxusuzluq",
        "Danışqanlıq",
        "İmpulsivlik",
        "Reallıq qavrayışı pozğunluğu",
      ],
    },
    panicAttack: {
      title: "Panika Hücumu",
      symptoms: [
        "Qorxu",
        "Tez ürək döyüntüsü",
        "Nəfəsdarlığı",
        "Boğulma",
        "Sinə ağrısı",
        "Ürəkbulanma",
        "Baş gicəllənməsi",
        "İstilik hissi",
        "Keyləşmə",
        "Nəzarət qorxusu",
        "Ölüm qorxusu",
      ],
    },    insomnia: {
      title: "Yuxusuzluq",
      symptoms: [
        "Yuxuya çətinlik",
        "Tez-tez oyanma",
        "Yenidən yatma problemi",
        "Erkən oyanma",
        "Yorğunluq",
        "Gündüz yuxululuq",
        "Qıcıqlanma",
        "Diqqətsizlik",
        "Səhvlər",
        "Baş ağrısı",
        "Həzm problemi",
      ],
    },
    adhd: {
      title: "Diqqət Əskikliyi və Hiperaktivlik",
      symptoms: [
        "Diqqətsizlik",
        "Hiperaktivlik",
        "İmpulsivlik",
        "Təşkilatsızlıq",
        "Unutqanlıq",
        "Narahatlıq",
        "Otura bilməmə",
        "Danışqanlıq",
        "Kəsmə",
        "Səbirsizlik",
      ],
    },    ptsd: {
      title: "Post-Travmatik Stress",
      symptoms: [
        "Flashbeklər",
        "Qaçınma",
        "Mənfi düşüncələr",
        "Həssaslıq",
        "Yuxusuzluq",
        "Qəzəb",
        "Diqqətsizlik",
        "Ayrılmış hiss",
        "Utanc",
        "Maraq itkisi",
      ],
    },
    otherConditions: {
      title: "Digər Vəziyyətlər",
      symptoms: [
        "Naməlum simptomlar",
        "Fiziki ağrılar",
        "Stress əlaqəli",
        "Həyat dəyişikliyi",
      ],
    },
  },
  
  hero: {
    title: "Onlayn Həkim Xidmətləri ilə Sağlamlığınıza Qayğı Göstərin",
    subtitle: "Evdən çıxmadan, istənilən vaxt və yerdə peşəkar həkimlərlə əlaqə qurun. TeleTebib, müxtəlif tibbi sahələrdə onlayn konsultasiya və müalicə xidmətləri təqdim edir.",
    emailPlaceholder: "E-mail ünvanınızı daxil edin",
    cta: "Erkən giriş əldə edin",
    privacyNote: "Xidmət haqqında məlumat və başlanğıc tarixini öyrənmək üçün qeydiyyatdan keçin",
    sessionNotification: "Seansınız uğurla qeydiyyatdan keçdi",
  },
    trustIndicators: {
    bestTelehealth: "Qoşulmuş həkimlər",
    platform2023: "Tibbi mütəxəssislər",
    medtechBreakthrough: "Böyüyən şəbəkə",
    appRating: "Beta test qiyməti",
    forbesBest: "Qapalı beta testində",
    clientsHelped: "Gözləmə siyahısı istifadəçiləri",
  },
  
  whyChoose: {
    title: "Niyə onlayn tibbi xidmət seçməlisiniz?",
    features: {
      convenient: {
        title: "Rahat və Əlçatan",
        description: "İnternet bağlantısı olan hər yerdən həkimlərlə əlaqə qurun.",
      },
      specialists: {
        title: "Geniş İxtisas Seçimi",
        description: "Terapevt, pediatr, kardioloq, endokrinoloq və daha çox ixtisas sahəsində mütəxəssislər.",
      },
      support247: {
        title: "24/7 Dəstək",
        description: "Günün istənilən saatında tibbi məsləhət almaq imkanı.",
      },
      affordable: {
        title: "Əlverişli Qiymətlər",
        description: "Ənənəvi klinik xidmətlərə nisbətən daha sərfəli qiymətlərlə xidmətlərdən yararlanın.",
      },
    },
    cta: "Bizə qoşulun",
  },
  
  qualityCare: {
    title1: "Etibarlı tibbi xidmət.",
    title2: "Real nəticələr.",
    stats: {
      stat1: "İstifadəçilər qeydiyyatdan sonra 3 gün ərzində həkimlə görüşür*",      stat2: "Təkrar görüşlərdə iştirak edən pasiyentlər 3 ay ərzində simptomlarda yaxşılaşma bildirir*",
      stat3: "İstifadəçilər 90 gün ərzində sağlamlıqlarına nəzarət hissinin artdığını bildirir*",
    },
    footnote: "*orta və ağır narahatlıq və/və ya depressiya olan bütün TeleTebib müştərilərinin 2024-2025-ci illərdən əldə edilən nəticələri əsasında.",
  },
  
  whyTeleTebib: {
    title: "Niyə TeleTebib?",
    benefits: {
      specialists: {
        title: "Yüksək səviyyəli mütəxəssislər",
        description: "Komandamız müxtəlif ixtisaslarda lisenziyalı peşəkarları əhatə edir — orta məmnuniyyət reytinqi 4.8/5.",
      },
      personalizedPlans: {
        title: "Fərdi müalicə planları",
        description: "Hər bir görüş fərdi yanaşma ilə keçirilir — vəziyyətin idarə olunması, təkrar yoxlamalar və ya ikinci rəy üçün.",
      },
      comfortable: {
        title: "Rahat təcrübə",
        description: "Təhlükəsiz platforma, sadə planlaşdırma və istənilən yerdən iştirak imkanı.",
      },
    },
    cta: "Bizə qoşulun",
  },
  
  specialties: {
    title: "Təklif etdiyimiz ixtisaslar",
    subtitle: "Bir platforma vasitəsilə müxtəlif sahələrdəki həkim və mütəxəssislərlə əlaqə qurun.",      names: {
      generalPractitioner: "Ailə həkimi",
      pediatrician: "Pediatr", 
      internalMedicine: "Terapevt",
      cardiologist: "Kardioloq",
      endocrinologist: "Endokrinoloq",
      pulmonologist: "Pulmonoloq",
      gastroenterologist: "Qastroenteroloq",
      neurologist: "Nevroloq",
      neurosurgeon: "Neyroxirurq",
      orthopedist: "Ortoped",
      gynecologist: "Ginekoloq",
      urologist: "Uroloq",
      psychiatrist: "Psixiatr",
      psychologist: "Psixoloq",
      logoped: "Loqoped",
      dermatologist: "Dermatoloq",
      ophthalmologist: "Oftalmoloq",
      ent: "LOR",
      oncologist: "Onkoloq",
      rheumatologist: "Revmatoloq",
      nutritionist: "Diyetoloq",
      allergist: "Allerqoloq",
      nephrologist: "Nefroloq",
      obstetrician: "Mama-ginekoloq",
      generalSurgeon: "Ümumi cərrah",
      orthopedicSurgeon: "Ortopedik cərrah",
      traumatologist: "Travmatoloq",
      hematologist: "Hematoloq",
      infectiousDisease: "İnfeksionist",
      sexualHealth: "Cinsi sağlamlıq",      physiotherapist: "Fizioterapevt",
    },
  },
  
  ourServices: {
    title: "Xidmətlərimiz",
    subtitle: "Ehtiyaclarınıza uyğun hərtərəfli qayğı seçimləri. Sağlamlıq məqsədlərinizə uyğun xidməti seçin.",
    services: {
      medication: {
        title: "Dərman Müalicəsi",
        description: "Lisenziyalı həkimlərlə davamlı dərman nəzarəti",
      },
      individualTherapy: {
        title: "Fərdi Terapiya",
        description: "Məqsədlərinizə uyğun fərdi seanslar",
      },
      couplesTherapy: {
        title: "Cütlük Terapiyası",
        description: "Təcrübəli terapevtlərlə münasibətlərinizi gücləndirin",
      },
      therapyMedication: {
        title: "Terapiya və Dərman Müalicəsi",
        description: "Terapiya və dərman müalicəsinin birləşdirilmiş yanaşması",
      },
    },
    cta: "Bizə qoşulun",
  },
  
  howItWorks: {
    title: "Necə işləyir?",
    subtitle: "3 sadə addımda həkimlə görüş təyin edin və onlayn konsultasiya alın.",
    steps: {
      step1: {
        title: "Qeydiyyatdan keçin və profil yaradın",
        description: "Sadə formada məlumatlarınızı daxil edin və hesab yaradın.",
      },
      step2: {
        title: "Həkim seçin və vaxt təyin edin",
        description: "Müvafiq ixtisaslı həkimi seçin və sizə uyğun vaxtda görüş təyin edin.",
      },
      step3: {
        title: "Onlayn konsultasiya keçirin",
        description: "Video, səsli zəng və ya yazılı çat vasitəsilə həkimlə əlaqə qurun.",
      },
    },
    notification: "Tam sağlamlıq qiymətləndirməsi alın",
  },
  
  waitlist: {
    title: "Hamıdan əvvəl xəbər almaq və giriş əldə etmək istəyirsiniz?",
    subtitle: "Gözləmə siyahısına qoşulun və tətbiq haqqında yenilikləri alın, test mərhələsində iştirak edin. Gəlin birlikdə böyük addım ataq.",
    emailPlaceholder: "E-mail ünvanınızı daxil edin",
    cta: "Gözləmə siyahısına qoşul",
    privacyNote: "Spam göndərmirik. İstənilən vaxt abunəlikdən çıxa bilərsiniz.",
    stats: {
      waitingList: "Gözləmə siyahısında",
      betaInvite: "Test qrupuna dəvət",
    },
  },
  
  doctorSection: {
    title: "Həkimsiniz?",
    subtitle: "Səhiyyə xidmətləri göstərmək üçün həkimləri erkən qeydiyyata dəvət edirik — böyüyən komandamıza qoşulun və ölkə üzrə pasiyentlərə xidmət göstərin.",
    cta: "Şəbəkəmizə qoşulmaq üçün müraciət edin",
    limitedAccess: "Məhdud erkən giriş mövcuddur",
    stats: {
      registeredDoctors: "Qeydiyyatdan keçmiş həkimlər",
      coveredRegions: "Əhatə olunan bölgələr",
      satisfaction: "Uğurlu həkim məmnuniyyəti",
    },
  },
  
  doctorDialog: {
    title: "Həkim Qeydiyyatı",
    subtitle: "Məlumatlarınızı daxil edin və bizim komandaya qoşulun.",
    fields: {
      name: "Ad",
      surname: "Soyad",
      mobileNumber: "Mobil nömrə",
      licenseNumber: "Lisenziya nömrəsi",
    },
    placeholders: {
      name: "Adınızı daxil edin",
      surname: "Soyadınızı daxil edin",
      mobileNumber: "+994 XX XXX XX XX",
      licenseNumber: "Lisenziya nömrənizi daxil edin",
    },
    buttons: {
      cancel: "Ləğv et",
      submit: "Göndər",
      submitting: "Göndərilir...",
    },
    messages: {
      success: "Müraciətiniz uğurla göndərildi. Sizinlə əlaqə saxlayacağıq.",
      error: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
    },
  },
  
  testimonials: {
    title: "Rəylər",
  },
  
  faq: {
    title: "Tez-tez verilən suallar",
    questions: {
      whatIsTeleTebib: {
        question: "TeleTebib nədir və necə işləyir?",
        answer: "TeleTebib — Azərbaycanda fəaliyyət göstərən onlayn tibb platformasıdır. Pasiyentlər sertifikatlı həkimlərlə video, səsli zəng və yazılı çat vasitəsilə tibbi konsultasiya ala bilirlər. Sadəcə qeydiyyatdan keçin, xidmət seçin və həkimlə görüş təyin edin.",
      },
      isOnlineReliable: {
        question: "Onlayn həkim konsultasiyası etibarlıdırmı?",
        answer: "Bəli, onlayn tibbi məsləhətlər və psixoloji dəstək xidmətləri lisensiyalı və təcrübəli həkimlər tərəfindən göstərilir. TeleTebib, məlumatların təhlükəsizliyini qoruyan şifrələnmiş platformadan istifadə edir.",
      },
      anySpecialist: {
        question: "Hər hansı bir mütəxəssislə onlayn görüşə bilərəm?",
        answer: "Əlbəttə. Psixiatr, terapevt, kardioloq, ginekoloq, dermatoloq, uşaq həkimi və daha çox 20+ ixtisas üzrə həkimlər TeleTebib platformasında mövcuddur.",
      },
      whenAvailable: {
        question: "Onlayn tibbi konsultasiyaları nə vaxt almaq mümkündür?",
        answer: "TeleTebib platformasında 24/7, yəni günün istənilən saatında onlayn həkimlərlə görüş təyin etmək mümkündür. Təcili tibbi yardım lazım olduqda da mütəxəssis seçimi təklif olunur.",
      },
      prescriptions: {
        question: "Reseptlər və dərmanlar necə verilir?",
        answer: "Onlayn konsultasiyadan sonra həkiminiz sizə rəqəmsal resept təqdim edə bilər. Resept elektron poçtunuza və ya tətbiqə göndərilir və Azərbaycandakı apteklərdə keçərlidir.",
      },
      isPaid: {
        question: "TeleTebib xidmətləri ödənişlidirmi?",
        answer: "Bəli, TeleTebib abonent əsaslı model ilə işləyir. Əlavə olaraq, bəzi sığorta şirkətləri tərəfindən əhatə olunur — əhatə dairəsini yoxlaya bilərsiniz.",
      },
      whereOperates: {
        question: "TeleTebib Azərbaycanda harada fəaliyyət göstərir?",
        answer: "TeleTebib Bakı, Gəncə, Sumqayıt, Şəki, Lənkəran və digər şəhərlərdə yaşayan pasiyentlərə xidmət göstərir. Onlayn olduğu üçün istənilən bölgədən istifadə mümkündür.",
      },
      psychologyAppointment: {
        question: "Onlayn psixoloq və ya psixiatrla necə görüş təyin edə bilərəm?",
        answer: "Sadəcə olaraq \"Xidmət seçin\" düyməsinə klikləyin, \"Psixoloji Dəstək\" və ya \"Psixiatrik Yardım\" bölməsini seçin, uyğun mütəxəssisi tapın və vaxt təyin edin. Bütün proses 3 dəqiqədən az vaxt aparır.",
      },
      videoConsultation: {
        question: "TeleTebib-də video konsultasiya necə keçir?",
        answer: "Video seans şifrələnmiş və yüksək keyfiyyətli görüntü ilə keçirilir. Sizin və həkimin şəxsi məlumatları qorunur. İstəyə görə yazılı çat və ya səsli zəng formatında da xidmət mümkündür.",
      },
      dataSecurity: {
        question: "Məlumatlarımın təhlükəsizliyi necə təmin olunur?",
        answer: "TeleTebib HIPAA uyğunluğu (AB standartı) və end-to-end şifrələmə texnologiyası ilə məlumatlarınızı qoruyur. Heç bir məlumat üçüncü tərəflə paylaşılmır.",
      },
      changeAppointment: {
        question: "Görüş təyin etdikdən sonra dəyişmək və ya ləğv etmək mümkündürmü?",
        answer: "Bəli, görüşünüzü planlaşdırmadan ən azı 1 saat əvvəl dəyişmək və ya ləğv etmək tamamilə pulsuzdur. Bunun üçün sadəcə tətbiqdə dəyişiklik edin.",
      },
      abroad: {
        question: "Xaricdə yaşayıram. TeleTebib xidmətlərindən istifadə edə bilərəm?",
        answer: "Bəli. Xaricdə yaşayan azərbaycanlılar üçün də onlayn həkim konsultasiyası və rəqəmsal psixoloji dəstək xidmətləri əlçatandır. Sadəcə internet bağlantınız olsun kifayətdir.",
      },
      doctorEducation: {
        question: "TeleTebib həkimləri harada təhsil alıblar?",
        answer: "Bütün həkimlərimiz: Tibb Universiteti və ya xarici akkreditə olunmuş universitetlərdən məzundur, Lisenziyaya malikdir və klinik təcrübə sahibidirlər, Daimi olaraq ixtisasartırma təlimlərində iştirak edirlər",
      },
      labTests: {
        question: "Laborator analiz və testlər üçün yönləndirmə olurmu?",
        answer: "Bəli. Həkiminiz ehtiyac duyarsa sizi müqaviləli laboratoriyalara yönləndirə bilər. Nəticələr platformada yüklənə və həkim tərəfindən qiymətləndirilə bilər.",
      },
      joinAsDoctor: {
        question: "Həkim kimi TeleTebib platformasına necə qoşula bilərəm?",
        answer: "Əgər siz sertifikatlı və təcrübəli həkimsinizsə, TeleTebib platformasında onlayn xidmət göstərmək üçün müraciət edə bilərsiniz. Sadəcə \"Həkim kimi qoşul\" bölməsindən formanı doldurun. Komandamız sizi test və qiymətləndirmə mərhələsindən keçirəcək. 100% təsdiqdən sonra siz TeleTebib platformasında fəaliyyətə başlaya bilərsiniz.",
      },
      doctorSchedule: {
        question: "TeleTebib-də həkimlər öz iş saatlarını və qiymətlərini təyin edə bilirlərmi?",
        answer: "Bəli! TeleTebib platformasına qoşulmuş həkimlər tam müstəqil şəkildə öz iş saatlarını planlaya və konsultasiya qiymətlərini təyin edə bilərlər. Bu sizə daha çevik və sərbəst iş imkanı yaradır.",
      },
      doctorBenefits: {
        question: "TeleTebib-də fəaliyyət göstərmək həkimlər üçün hansı üstünlükləri yaradır?",
        answer: "TeleTebib həkimlərə: Onlayn fəaliyyətlə əlavə qazanc imkanı, Əlavə klinikaya ehtiyac olmadan xəstələrlə rahat əlaqə, İstənilən yerdən və zamanla işləmə azadlığı, Rəqəmsal resept və izləmə sistemləri ilə vaxta qənaət, Müasir və təhlükəsiz telemedisin platforması üzərindən pasiyentlərə xidmət göstərmək imkanı yaradır",      },
    }
  },
  
  cta: {
    patient: {
      title: "Sağlamlıq üçün gözləmə siyahısına qoşulun",
      subtitle: "TeleTebib platformasına qeydiyyatdan keçin və həkim konsultasiyaları və sağlamlıq monitorinqi xüsusiyyətlərinə çıxış əldə etmək üçün gözləmə siyahımıza qoşulun.",
      features: {
        security: "Təhlükəsiz platforma",
        accessibility: "Asan giriş",
      },
      buttons: {
        join: "Bizə qoşulun",
        learnMore: "Daha çox öyrənin",
      },
    },
     doctor: {
      title: "Həkimsiniz? Platformamıza Qoşulun",
      subtitle: "TeleTebib-də səhiyyə xidməti təqdimçisi kimi erkən qeydiyyatdan keçin. Onlayn konsultasiyalar verərək qazanc əldə edin və Azərbaycanın aparıcı telemedisin platformasının bir hissəsi olun.",
      features: {
        experts: "50+ həkimdən ibarət böyüyən şəbəkə",
        availability: "Çevik iş saatları",
      },
      buttons: {
        findDoctor: "Həkim kimi qeydiyyat",
        moreArticles: "Platformamız haqqında öyrənin",
      },
    },
  },

  
  footer: {
    brandName: "TeleTebib",
    copyright: "© 2024 TeleTebib, Inc. All rights reserved.",
    socialMedia: {
      facebook: "Facebook",
      twitter: "Twitter", 
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
    emergencyNotice: "TeleTebib does not offer emergency services. In the event of a mental health emergency, call 988 or the National Suicide Prevention Lifeline at 1-800-273-8255.",
  },
  
  messages: {
    alreadyInWaitlist: "Siz artıq gözləmə siyahısındasınız",
    generalError: "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
    thanks: "Təşəkkürlər!",
    emailRegistered: "Sizin e-mail ünvanınız uğurla qeydiyyatdan keçdi.",
  },
};

// Russian translations
export const ru: Translations = {  header: {
    brandName: "TeleTebib",
    languageSelector: "Выбрать язык (скоро)",
  },
  blog: {
    title: "Наши блоги",
    subtitle: "Последние статьи и советы по вопросам здоровья, медицины и wellness",
    searchPlaceholder: "Поиск в блогах...",
    readMore: "Читать",
    backToHome: "Вернуться на главную",
    backToBlogs: "Вернуться к блогам",
    selectLanguage: "Выбрать язык",
    viewAllBlogs: "Посмотреть все блоги",
  },
  
  blogSection: {
    title: "Последние статьи о здоровье",
    subtitle: "Будьте в курсе наших последних идей о здоровье, медицине и wellness",
    seeAllBlogs: "Посмотреть все статьи",
    readMore: "Читать далее",
    noBlogs: "Статьи пока недоступны",
  },
  
  medicationReminder: {
    title: "Принимайте лекарства вовремя",
    subtitle: "Поддерживайте последовательность лечения с системой напоминаний в приложении. Настройте индивидуальные напоминания и следуйте своему плану лечения.",
    features: {
      reminders: {
        title: "Персонализированные напоминания",
        description: "Индивидуальные уведомления на основе вашего графика приема лекарств",
      },
      tracking: {
        title: "Отслеживание приема",
        description: "Отслеживайте историю приема и делитесь ею с вашим врачом",
      },
    },
  },    conditions: {
    sectionTitle: "Психические расстройства, которые мы эффективно лечим",
    subtitle: "Профессиональная забота о вашем эмоциональном благополучии с индивидуальными планами лечения различных проблем психического здоровья.",
    anxiety: {
      title: "Тревога",
      symptoms: [
        "Нервозность",
        "Паника",
        "Сердцебиение",
        "Гипервентиляция",
        "Дрожь",
        "Усталость",
        "Проблемы внимания",
        "Бессонница",
        "Беспокойство",
      ],
    },    depression: {
      title: "Депрессия",
      symptoms: [
        "Грусть",
        "Безнадежность",
        "Раздражительность",
        "Вина",
        "Ангедония",
        "Усталость",
        "Туман в голове",
        "Бессонница",
        "Изменения аппетита",
        "Суицидальные мысли",
      ],
    },
    bipolarDisorder: {
      title: "Биполярное расстройство",
      symptoms: [
        "Перепады настроения",
        "Депрессия",
        "Гиперактивность",
        "Бессонница",
        "Разговорчивость",
        "Импульсивность",
        "Искажение реальности",
      ],
    },    panicAttack: {
      title: "Паническая атака",
      symptoms: [
        "Ужас",
        "Сердцебиение",
        "Одышка",
        "Удушье",
        "Боль в груди",
        "Тошнота",
        "Головокружение",
        "Озноб",
        "Онемение",
        "Потеря контроля",
        "Страх смерти",
      ],
    },
    insomnia: {
      title: "Бессонница",
      symptoms: [
        "Трудное засыпание",
        "Пробуждения",
        "Ранний подъем",
        "Утренняя усталость",
        "Сонливость",
        "Раздражительность",
        "Рассеянность",
        "Ошибки",
        "Головные боли",
        "Пищеварительные проблемы",
      ],
    },    adhd: {
      title: "СДВГ",
      symptoms: [
        "Невнимательность",
        "Гиперактивность",
        "Импульсивность",
        "Дезорганизация",
        "Забывчивость",
        "Беспокойство",
        "Неусидчивость",
        "Разговорчивость",
        "Перебивание",
        "Нетерпеливость",
      ],
    },
    ptsd: {
      title: "ПТСР",
      symptoms: [
        "Флешбэки",
        "Избегание",
        "Негативные мысли",
        "Повышенная реакция",
        "Бессонница",
        "Агрессия",
        "Рассеянность",
        "Отчуждение",
        "Вина",
        "Апатия",
      ],
    },
    otherConditions: {
      title: "Другие состояния",
      symptoms: [
        "Нетипичные симптомы",
        "Физические боли",
        "Стресс-связанные",
        "Жизненные перемены",
      ],
    },
  },
  
  hero: {
    title: "Заботьтесь о своем здоровье с онлайн медицинскими услугами",
    subtitle: "Связывайтесь с профессиональными врачами в любое время и в любом месте, не выходя из дома. TeleTebib предоставляет онлайн консультации и лечебные услуги в различных медицинских областях.",
    emailPlaceholder: "Введите ваш email адрес",
    cta: "Получить ранний доступ",
    privacyNote: "Зарегистрируйтесь, чтобы узнать о сервисе и дате запуска",
    sessionNotification: "Ваша сессия успешно зарегистрирована",
  },
    trustIndicators: {
    bestTelehealth: "Подключенные врачи",
    platform2023: "Медицинские специалисты",
    medtechBreakthrough: "Растущая сеть",
    appRating: "Рейтинг бета-тестирования",
    forbesBest: "В закрытом бета-тестировании",
    clientsHelped: "Пользователей в листе ожидания",
  },
  
  whyChoose: {
    title: "Почему выбрать онлайн медицинские услуги?",
    features: {
      convenient: {
        title: "Удобно и Доступно",
        description: "Связывайтесь с врачами из любого места с интернет-соединением.",
      },
      specialists: {
        title: "Широкий выбор специалистов",
        description: "Специалисты по терапии, педиатрии, кардиологии, эндокринологии и многим другим областям.",
      },
      support247: {
        title: "Поддержка 24/7",
        description: "Получайте медицинские консультации в любое время дня.",
      },
      affordable: {
        title: "Доступные цены",
        description: "Пользуйтесь более экономичными услугами по сравнению с традиционными клиническими услугами.",
      },
    },
    cta: "Присоединиться к нам",
  },
  
  qualityCare: {
    title1: "Надежная медицинская помощь.",
    title2: "Реальные результаты.",
    stats: {
      stat1: "Пользователи встречаются с врачом в течение 3 дней после регистрации*",      stat2: "Пациенты, посещающие повторные приемы, сообщают об улучшении симптомов в течение 3 месяцев*",
      stat3: "Пользователи сообщают об увеличении чувства контроля над здоровьем в течение 90 дней*",
    },
    footnote: "*основано на данных всех клиентов TeleTebib с умеренной и тяжелой тревожностью и/или депрессией с 2024-2025 гг.",
  },
  
  whyTeleTebib: {
    title: "Почему TeleTebib?",
    benefits: {
      specialists: {
        title: "Высококвалифицированные специалисты",
        description: "Наша команда включает лицензированных профессионалов в различных специальностях — средний рейтинг удовлетворенности 4.8/5.",
      },
      personalizedPlans: {
        title: "Персонализированные планы лечения",
        description: "Каждая сессия проводится с индивидуальным подходом — для управления состоянием, повторных осмотров или второго мнения.",
      },
      comfortable: {
        title: "Комфортный опыт",
        description: "Безопасная платформа, простое планирование и участие из любого места.",
      },
    },
    cta: "Присоединиться к нам",
  },
  
  specialties: {
    title: "Специальности, которые мы предлагаем",
    subtitle: "Связывайтесь с врачами и специалистами в различных областях через одну платформу.",    names: {
      generalPractitioner: "Врач общей практики",
      pediatrician: "Педиатр",
      internalMedicine: "Терапевт",
      cardiologist: "Кардиолог",
      endocrinologist: "Эндокринолог",
      pulmonologist: "Пульмонолог",
      gastroenterologist: "Гастроэнтеролог",
      neurologist: "Невролог",
      neurosurgeon: "Нейрохирург",
      orthopedist: "Ортопед",
      gynecologist: "Гинеколог",
      urologist: "Уролог",
      psychiatrist: "Психиатр",
      psychologist: "Психолог",
      logoped: "Логопед",
      dermatologist: "Дерматолог",
      ophthalmologist: "Офтальмолог",
      ent: "ЛОР",
      oncologist: "Онколог",
      rheumatologist: "Ревматолог",
      nutritionist: "Диетолог",
      allergist: "Аллерголог",
      nephrologist: "Нефролог",
      obstetrician: "Акушер",
      generalSurgeon: "Общий хирург",
      orthopedicSurgeon: "Ортопедический хирург",
      traumatologist: "Травматолог",
      hematologist: "Гематолог",
      infectiousDisease: "Инфекционист",
      sexualHealth: "Специалист по сексуальному здоровью",      physiotherapist: "Физиотерапевт",
    },
  },
  
  ourServices: {
    title: "Наши Услуги",
    subtitle: "Комплексные варианты ухода, адаптированные к вашим потребностям. Выберите услугу, которая соответствует вашим целям здоровья.",
    services: {
      medication: {
        title: "Управление Лекарствами",
        description: "Постоянное управление лекарствами с лицензированными врачами",
      },
      individualTherapy: {
        title: "Индивидуальная Терапия",
        description: "Частные сессии, адаптированные к вашим целям",
      },
      couplesTherapy: {
        title: "Парная Терапия",
        description: "Укрепите отношения с опытными терапевтами",
      },
      therapyMedication: {
        title: "Терапия и Лекарства",
        description: "Комплексный подход, сочетающий терапию с медикаментами",
      },
    },
    cta: "Присоединиться к нам",
  },
  
  howItWorks: {
    title: "Как это работает?",
    subtitle: "Запишитесь на прием к врачу и получите онлайн консультацию в 3 простых шага.",
    steps: {
      step1: {
        title: "Зарегистрируйтесь и создайте профиль",
        description: "Введите свою информацию в простой форме и создайте аккаунт.",
      },
      step2: {
        title: "Выберите врача и назначьте время",
        description: "Выберите врача соответствующей специальности и назначьте встречу в удобное для вас время.",
      },
      step3: {
        title: "Проведите онлайн консультацию",
        description: "Свяжитесь с врачом через видео, голосовой звонок или письменный чат.",
      },
    },
    notification: "Получите комплексную оценку здоровья",
  },
  
  waitlist: {
    title: "Хотите быть первыми, кто узнает и получит доступ?",
    subtitle: "Присоединяйтесь к списку ожидания и получайте обновления о приложении, участвуйте в тестировании. Давайте сделаем большой шаг вместе.",
    emailPlaceholder: "Введите ваш email адрес",
    cta: "Присоединиться к списку ожидания",
    privacyNote: "Мы не отправляем спам. Вы можете отписаться в любое время.",
    stats: {
      waitingList: "В списке ожидания",
      betaInvite: "Приглашение в бета-группу",
    },
  },
  
  doctorSection: {
    title: "Вы врач?",
    subtitle: "Мы приглашаем врачей на раннюю регистрацию для предоставления медицинских услуг — присоединяйтесь к нашей растущей команде и обслуживайте пациентов по всей стране.",
    cta: "Подать заявку на присоединение к нашей сети",
    limitedAccess: "Доступен ограниченный ранний доступ",
    stats: {
      registeredDoctors: "Зарегистрированные врачи",
      coveredRegions: "Охваченные регионы",
      satisfaction: "Успешная удовлетворенность врачей",
    },
  },
  
  doctorDialog: {
    title: "Регистрация врача",
    subtitle: "Введите вашу информацию и присоединяйтесь к нашей команде.",
    fields: {
      name: "Имя",
      surname: "Фамилия",
      mobileNumber: "Мобильный номер",
      licenseNumber: "Номер лицензии",
    },
    placeholders: {
      name: "Введите ваше имя",
      surname: "Введите вашу фамилию",
      mobileNumber: "+994 XX XXX XX XX",
      licenseNumber: "Введите номер лицензии",
    },
    buttons: {
      cancel: "Отмена",
      submit: "Отправить",
      submitting: "Отправка...",
    },
    messages: {
      success: "Ваша заявка успешно отправлена. Мы свяжемся с вами.",
      error: "Произошла ошибка. Пожалуйста, попробуйте снова.",
    },
  },
  
  testimonials: {
    title: "Отзывы",
  },
  
  faq: {
    title: "Часто задаваемые вопросы",
    questions: {
      whatIsTeleTebib: {
        question: "Что такое TeleTebib и как это работает?",
        answer: "TeleTebib — это онлайн медицинская платформа, работающая в Азербайджане. Пациенты могут получать медицинские консультации с сертифицированными врачами через видео, голосовые звонки и письменный чат. Просто зарегистрируйтесь, выберите услугу и запишитесь на прием к врачу.",
      },
      isOnlineReliable: {
        question: "Надежны ли онлайн консультации врачей?",
        answer: "Да, онлайн медицинские консультации и психологическая поддержка предоставляются лицензированными и опытными врачами. TeleTebib использует зашифрованную платформу, которая защищает безопасность данных.",
      },
      anySpecialist: {
        question: "Могу ли я встретиться онлайн с любым специалистом?",
        answer: "Абсолютно. Психиатры, терапевты, кардиологи, гинекологи, дерматологи, педиатры и врачи еще 20+ специальностей доступны на платформе TeleTebib.",
      },
      whenAvailable: {
        question: "Когда можно получить онлайн медицинские консультации?",
        answer: "На платформе TeleTebib можно записаться на прием к онлайн врачам 24/7, в любое время дня. Выбор специалистов также предлагается при необходимости неотложной медицинской помощи.",
      },
      prescriptions: {
        question: "Как предоставляются рецепты и лекарства?",
        answer: "После онлайн консультации ваш врач может предоставить вам цифровой рецепт. Рецепт отправляется на вашу электронную почту или в приложение и действует в аптеках Азербайджана.",
      },
      isPaid: {
        question: "Платные ли услуги TeleTebib?",
        answer: "Да, TeleTebib работает на основе подписочной модели. Дополнительно покрывается некоторыми страховыми компаниями — вы можете проверить область покрытия.",
      },
      whereOperates: {
        question: "Где TeleTebib работает в Азербайджане?",
        answer: "TeleTebib обслуживает пациентов, проживающих в Баку, Гяндже, Сумгаите, Шеки, Лянкяране и других городах. Поскольку это онлайн, можно использовать из любого региона.",
      },
      psychologyAppointment: {
        question: "Как записаться на прием к онлайн психологу или психиатру?",
        answer: "Просто нажмите кнопку 'Выбрать услугу', выберите раздел 'Психологическая поддержка' или 'Психиатрическая помощь', найдите подходящего специалиста и назначьте время. Весь процесс занимает менее 3 минут.",
      },
      videoConsultation: {
        question: "Как проводятся видео консультации на TeleTebib?",
        answer: "Видео сессии проводятся с зашифрованным и высококачественным видео. Ваша и врача личная информация защищена. При желании услуга также доступна в формате письменного чата или голосового звонка.",
      },
      dataSecurity: {
        question: "Как обеспечивается безопасность моих данных?",
        answer: "TeleTebib защищает ваши данные с соблюдением HIPAA (стандарт ЕС) и технологией сквозного шифрования. Никакая информация не передается третьим лицам.",
      },
      changeAppointment: {
        question: "Можно ли изменить или отменить после записи на прием?",
        answer: "Да, изменение или отмена вашего приема как минимум за 1 час до назначенного времени абсолютно бесплатно. Просто внесите изменения в приложении.",
      },
      abroad: {
        question: "Я живу за границей. Могу ли я использовать услуги TeleTebib?",
        answer: "Да. Онлайн консультации врачей и цифровая психологическая поддержка также доступны для азербайджанцев, живущих за границей. Вам нужно только интернет-соединение.",
      },
      doctorEducation: {
        question: "Где получили образование врачи TeleTebib?",
        answer: "Все наши врачи: Выпускники Медицинского университета или зарубежных аккредитованных университетов, Имеют лицензии и клинический опыт, Регулярно участвуют в тренингах повышения квалификации",
      },
      labTests: {
        question: "Есть ли направления на лабораторные анализы и тесты?",
        answer: "Да. Если ваш врач сочтет необходимым, он может направить вас в договорные лаборатории. Результаты могут быть загружены на платформу и оценены врачом.",
      },
      joinAsDoctor: {
        question: "Как присоединиться к платформе TeleTebib в качестве врача?",
        answer: "Если вы сертифицированный и опытный врач, вы можете подать заявку на предоставление онлайн услуг на платформе TeleTebib. Просто заполните форму в разделе 'Присоединиться как врач'. Наша команда проведет вас через этап тестирования и оценки. После 100% подтверждения вы можете начать работать на платформе TeleTebib.",
      },
      doctorSchedule: {
        question: "Могут ли врачи устанавливать свои рабочие часы и цены на TeleTebib?",
        answer: "Да! Врачи, присоединившиеся к платформе TeleTebib, могут полностью самостоятельно планировать свои рабочие часы и устанавливать цены на консультации. Это создает для вас более гибкие и независимые возможности работы.",
      },
      doctorBenefits: {
        question: "Какие преимущества создает работа на TeleTebib для врачей?",
        answer: "TeleTebib предоставляет врачам: Возможности дополнительного дохода через онлайн деятельность, Удобный контакт с пациентами без необходимости в дополнительных клиниках, Свободу работать из любого места и в любое время, Экономию времени с цифровыми системами рецептов и мониторинга, Возможность обслуживать пациентов через современную и безопасную телемедицинскую платформу",      },
    },
  },
  
  cta: {
    patient: {
      title: "Присоединяйтесь к списку ожидания медицинских услуг",
      subtitle: "Зарегистрируйтесь на платформе TeleTebib и присоединитесь к нашему списку ожидания, чтобы получить доступ к консультациям врачей и функциям мониторинга здоровья.",
      features: {
        security: "Безопасная платформа",
        accessibility: "Легкий доступ",
      },
      buttons: {
        join: "Присоединиться к нам",
        learnMore: "Узнать больше",
      },
    },
    doctor: {
      title: "Вы врач? Присоединяйтесь к нашей платформе",
      subtitle: "Зарегистрируйтесь для раннего доступа как поставщик медицинских услуг на TeleTebib. Начните зарабатывать, предоставляя онлайн консультации, и станьте частью ведущей телемедицинской платформы Азербайджана.",
      features: {
        experts: "Растущая сеть из 50+ врачей",
        availability: "Гибкий рабочий график",
      },
      buttons: {
        findDoctor: "Регистрация как врач",
        moreArticles: "Узнать о нашей платформе",
      },
    },
  },
  

  footer: {
    brandName: "TeleTebib",
    copyright: "© 2024 TeleTebib, Inc. Все права защищены.",
    socialMedia: {
      facebook: "Facebook",
      twitter: "Twitter",
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
    emergencyNotice: "TeleTebib не предоставляет экстренные услуги. В случае чрезвычайной ситуации с психическим здоровьем звоните 988 или на национальную линию предотвращения самоубийств 1-800-273-8255.",
  },
  
  messages: {
    alreadyInWaitlist: "Вы уже в списке ожидания",
    generalError: "Произошла ошибка. Пожалуйста, попробуйте снова.",
    thanks: "Спасибо!",
    emailRegistered: "Ваш email адрес успешно зарегистрирован.",
  },
};

// Language persistence utilities
export const saveLanguageToStorage = (language: Language): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedLanguage', language);
  }
};

export const getLanguageFromStorage = (): Language => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && ['en', 'az', 'ru'].includes(savedLanguage)) {
      return savedLanguage;
    }
  }
  return 'az'; // Default language
}

// Translation utility functions
export const getTranslations = (lang: Language): Translations => {
  switch (lang) {
    case 'az':
      return az;
    case 'ru':
      return ru;
    case 'en':
    default:
      return en;
  }
};

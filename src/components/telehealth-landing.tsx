"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  DollarSign, 
  Star,
  Mic, 
  Video, 
  Phone, 
  MoreHorizontal,
  ClipboardList,
  Network,
  Heart,
  BookOpenCheck,
  Heart as HeartIcon,
  CalendarClock,
  Quote,
  Plus,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { addToWaitlist, addDoctorToWaitlist } from "@/lib/firebase-services";
import { Language, getTranslations } from "@/lib/localization";
import { LanguageSelector } from "@/components/ui/language-selector";

// Testimonial type definition
interface Testimonial {
  name: string;
  age: number;
  role: string;
  text: string;
}

export function TelehealthLanding() {
  // Language state and translations
  const [currentLanguage, setCurrentLanguage] = useState<Language>('az');
  const t = getTranslations(currentLanguage);
  
  // Direct color definitions
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const PRIMARY_DARK = "#0F3285"; 
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";
  
  // Icon background colors - Consistent across the site
  const ICON_BG_COLORS = {
    calendar: "#C9EBE6",   // Soft mint
    users: "#DBDCFA",      // Soft lavender
    message: "#FFF2C6",    // Soft yellow
    dollar: "#C9EBE6"      // Soft mint (same as calendar)
  };

  // Standardized button styles
  const primaryButtonClass = "rounded-full py-4 px-6 text-sm font-medium shadow-sm text-white";
  const secondaryButtonClass = "rounded-full py-4 px-10 text-sm font-medium border";
  const outlineButtonClass = "rounded-full py-3 px-2 text-sm font-medium";
  
  // Heading size and spacing classes - Updated to ensure ALL headings are 5xl
  const mainHeadingClass = "text-5xl leading-16 font-bold mb-6"; // Removed the responsive text-4xl
  const sectionHeadingClass = "text-5xl font-bold mb-6"; // Updated to text-5xl to match
  const subHeadingClass = "text-xl font-semibold mb-4";  // State for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  // State for email inputs
  const [email, setEmail] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  // State for loading and feedback
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);
  const [isSubmittingEarlyAccess, setIsSubmittingEarlyAccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  // State for success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // State for doctor registration dialog
  const [showDoctorDialog, setShowDoctorDialog] = useState(false);
  const [doctorFormData, setDoctorFormData] = useState({
    name: "",
    surname: "",
    mobileNumber: "",
    licenseNumber: ""
  });
  const [isDoctorSubmitting, setIsDoctorSubmitting] = useState(false);
  const [doctorSubmitMessage, setDoctorSubmitMessage] = useState("");
  const [doctorSubmitError, setDoctorSubmitError] = useState("");
  
  // State for selected testimonials
  const [selectedTestimonials, setSelectedTestimonials] = useState<Testimonial[]>([]);// Trigger confetti when success popup opens
  useEffect(() => {
    if (showSuccessPopup) {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#1A56DB", "#E6EDFB", "#0F3285", "#FFD700", "#FF6B6B"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    }
  }, [showSuccessPopup]);
  
  // All testimonials data
  const allTestimonials: Testimonial[] = [
    {
      name: "Samir",
      age: 21,
      role: "tələbə",
      text: "Tətbiqi test üçün yüklədim, elə bildim çətin olacaq amma əksinə — hər şey o qədər rahatdı ki, az qala real həkimlə danışmaq istədim 😂. Menü sadədi, heç kimə izah lazım deyil. Məncə, bu app çox işə yarayacaq!"
    },
    {
      name: "Nigar",
      age: 28,
      role: "gənc ana",
      text: "Test üçün yoxladım, uşaqlı biri kimi deyim: bu app çox rahatdır! Hər şeyi bir-iki kliklə tapırsan. Həkimlə əlaqə yaratmaq hissəsi superdi. Ən çox xoşuma gələn sadə və sürətli olması oldu."
    },
    {
      name: "Elvin",
      age: 35,
      role: "ofis işçisi",
      text: "Deyilən kimi test etdim, həkim seçimi, vaxt təyin etmə, hər şey axıcı işləyir. İstifadə çox sadədir, texnologiyadan başı çıxmayan adam da rahatlıqla istifadə edə bilər. Gələcəkdə əməlli-başlı fərq yaradacaq bu app."
    },
    {
      name: "Aysu",
      age: 19,
      role: "blogger",
      text: "O qədər tətbiq test etmişəm, çoxu qarışıq olur. Bu isə çox user-friendly idi. Dizayn səliqəlidir, nəyi hardan tapacağını dərhal anlayırsan. Real istifadəçilər üçün tam hazırdı, məncə."
    },
    {
      name: "Murad",
      age: 40,
      role: "adi istifadəçi",
      text: "Mən testçi deyiləm əslində, amma maraq üçün yoxladım və şoka düşdüm. Həqiqətən sadədir. Həkimlərin seçimi, qiymətləri və saatları var — çox funksiyalı, amma başa düşülən. Böyüklər üçün də rahat olacaq."
    }
  ];

  // Helper function to get random elements from array
  const getRandomElements = (array: any[], count: number) => {
    // Create a copy of the array to avoid modifying the original
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    // Get the first `count` elements
    return shuffled.slice(0, count);
  };
  // Select random testimonials on component mount
  useEffect(() => {
    const randomTestimonials = getRandomElements(allTestimonials, 3);
    setSelectedTestimonials(randomTestimonials);
  }, []);
    // FAQ data using translation system
  const faqItems = [    {
      question: t.faq.questions.whatIsTeleTebib.question,
      answer: (
        <p className="mb-4">
          {t.faq.questions.whatIsTeleTebib.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.isOnlineReliable.question,
      answer: (
        <p>
          {t.faq.questions.isOnlineReliable.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.anySpecialist.question,
      answer: (
        <p>
          {t.faq.questions.anySpecialist.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.whenAvailable.question,
      answer: (
        <p>
          {t.faq.questions.whenAvailable.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.prescriptions.question,
      answer: (
        <p>
          {t.faq.questions.prescriptions.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.isPaid.question,
      answer: (
        <p>
          {t.faq.questions.isPaid.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.whereOperates.question,
      answer: (
        <p>
          {t.faq.questions.whereOperates.answer}
        </p>
      ),
    },      {
      question: t.faq.questions.psychologyAppointment.question,
      answer: (
        <p>
          {t.faq.questions.psychologyAppointment.answer}
        </p>
      ),
    },      {
      question: t.faq.questions.videoConsultation.question,
      answer: (
        <p>
          {t.faq.questions.videoConsultation.answer}
        </p>
      ),
    },      {
      question: t.faq.questions.dataSecurity.question,
      answer: (
        <p>
          {t.faq.questions.dataSecurity.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.changeAppointment.question,
      answer: (
        <p>
          {t.faq.questions.changeAppointment.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.abroad.question,
      answer: (
        <p>
          {t.faq.questions.abroad.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.doctorEducation.question,
      answer: (
        <p>
          {t.faq.questions.doctorEducation.answer}
        </p>
      ),
    },    {
      question: t.faq.questions.labTests.question,
      answer: (
        <p>
          {t.faq.questions.labTests.answer}
        </p>
      ),
    },

    {
      question: t.faq.questions.joinAsDoctor.question,
      answer: (
        <p>
          {t.faq.questions.joinAsDoctor.answer}
        </p>
      ),
    },

    {
      question: t.faq.questions.doctorSchedule.question,
      answer: (
        <p>
          {t.faq.questions.doctorSchedule.answer}
        </p>
      ),
    },

    {
      question: t.faq.questions.doctorBenefits.question,
      answer: (
        <p>
          {t.faq.questions.doctorBenefits.answer}
        </p>
      ),
    },
  ];  // Email submit handler for early access
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEarlyAccess(true);
    setSubmitError("");
    setSubmitMessage("");

    try {      const result = await addToWaitlist(email);
      if (result.success) {
        setEmail('');
        setShowSuccessPopup(true);
      } else {
        if (result.error?.includes('already exists')) {
          setSubmitMessage(t.messages.alreadyInWaitlist);
        } else {
          setSubmitError(t.messages.generalError);
        }
      }
    } catch (error) {
      setSubmitError(t.messages.generalError);
      console.error('Error submitting early access:', error);
    } finally {
      setIsSubmittingEarlyAccess(false);
    }
  };  // Waitlist email submit handler
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingWaitlist(true);
    setSubmitError("");
    setSubmitMessage("");

    try {      const result = await addToWaitlist(waitlistEmail);
      if (result.success) {
        setWaitlistEmail('');
        setShowSuccessPopup(true);
      } else {
        if (result.error?.includes('already exists')) {
          setSubmitMessage(t.messages.alreadyInWaitlist);
        } else {
          setSubmitError(t.messages.generalError);
        }
      }
    } catch (error) {
      setSubmitError(t.messages.generalError);
      console.error('Error submitting to waitlist:', error);
    } finally {
      setIsSubmittingWaitlist(false);
    }
  };

  // Doctor form submit handler
  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDoctorSubmitting(true);
    setDoctorSubmitError("");
    setDoctorSubmitMessage("");

    try {
      const result = await addDoctorToWaitlist(doctorFormData);
      if (result.success) {
        setDoctorFormData({
          name: "",
          surname: "",
          mobileNumber: "",
          licenseNumber: ""
        });        setDoctorSubmitMessage(t.doctorDialog.messages.success);
        setTimeout(() => {
          setShowDoctorDialog(false);
          setDoctorSubmitMessage("");
        }, 2000);
      } else {
        setDoctorSubmitError(t.doctorDialog.messages.error);
      }
    } catch (error) {
      setDoctorSubmitError(t.doctorDialog.messages.error);
      console.error('Error submitting doctor application:', error);
    } finally {
      setIsDoctorSubmitting(false);
    }
  };

  // Handle doctor form input changes
  const handleDoctorInputChange = (field: string, value: string) => {
    setDoctorFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add ref for waitlist section
  const waitlistRef = useRef<HTMLElement>(null);  // Add smooth scroll function
  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background">      {/* Header - Working language selection */}
      <header className="border-b border-border bg-card overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-2">
            {/* Logo added to the left */}
            <img src="/logo.png" alt="TeleTebib Logo" className="h-6 sm:h-8 w-auto" />
            <span className="text-base sm:text-lg font-semibold" style={{ color: PRIMARY }}>{t.header.brandName}</span>
          </div>
          
          {/* Working Language Selector */}
          <div className="flex items-center gap-2">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </header>
        {/* Hero Section - Updated with email input */}
      <section className="bg-background relative overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div 
            className="grid lg:grid-cols-2 gap-8"
            style={{ minHeight: "min(620px, 100vh - 100px)" }}
          >{/* Left Content - Updated with email input instead of button */}
            <div className="flex flex-col justify-center py-10">
              <div className="space-y-6">
                <h1 
                  className={mainHeadingClass}
                  style={{ color: PRIMARY }}
                >
                  {t.hero.title}
                </h1>
                
                <p className="text-lg font-light" style={{ color: FOREGROUND_LIGHT }}>
                  {t.hero.subtitle}
                </p>

                {/* Replace button with email form */}
                <div className="mt-2">
                  <form 
                    onSubmit={handleEmailSubmit}
                    className="flex flex-col sm:flex-row gap-3 "
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.hero.emailPlaceholder}
                      required
                      className="px-5 py-3 flex-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button 
                      type="submit"
                      className={primaryButtonClass}
                      style={{ backgroundColor: PRIMARY }}
                    >
                      {t.hero.cta}                    </button>
                  </form>
                  
                  {/* Message display area for hero form */}
                  {(submitMessage || submitError) && (
                    <div className="mt-3 px-2">
                      {submitMessage && (
                        <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md border border-green-200">
                          {submitMessage}
                        </p>
                      )}
                      {submitError && (
                        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                          {submitError}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2 ml-2">
                    {t.hero.privacyNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - No changes needed */}
            <div className="relative flex items-end h-full">
              {/* White shape */}
              <div className="absolute bottom-0 right-0 w-[85%] h-[85%]">
                <div 
                  className="w-full h-full rounded-b-none"
                  style={{ 
                    backgroundColor: WHITE,
                    borderTopLeftRadius: '50%', 
                    borderTopRightRadius: '50%' 
                  }}
                >
                </div>
              </div>
              
              {/* Doctor image */}
              <div className="relative z-10 w-full flex items-end justify-center h-full">
                <img 
                  src="/hero.png" 
                  alt="Healthcare provider"
                  className="object-contain object-bottom block mt-auto"
                  style={{ 
                    maxHeight: "540px", 
                    marginBottom: "-1px"
                  }}
                />
                
                {/* Session notification */}
                <div className="absolute bottom-8 left-12 z-20">
                  <div className="rounded-full py-3 px-5 shadow-md flex items-center gap-3 whitespace-nowrap"
                    style={{ backgroundColor: WHITE }}>
                    <div className="rounded-full w-6 h-6 flex items-center justify-center"
                      style={{ backgroundColor: PRIMARY_LIGHT }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke={PRIMARY} strokeWidth="2" />
                        <path d="M16 2V6" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" />
                        <path d="M8 2V6" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" />
                        <path d="M3 10H21" stroke={PRIMARY} strokeWidth="2" />
                        <path d="M9 16L11 18L15 14" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>                    <span className="text-sm font-medium" style={{ color: PRIMARY }}>
                      {t.hero.sessionNotification}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless connection to next section */}
        <div className="absolute h-1 w-full bottom-0" style={{ backgroundColor: WHITE }}></div>
      </section>
        {/* Trust Indicators - Standardize text sizes */}
      <section className="py-4 border-y border-border overflow-hidden" style={{ backgroundColor: WHITE, maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-4">            
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: PRIMARY }}>50+</span>
              <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>{t.trustIndicators.bestTelehealth}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium" style={{ color: PRIMARY }}>4.8</span>
              <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>{t.trustIndicators.appRating}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: PRIMARY }}>2025</span>
              <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>{t.trustIndicators.forbesBest}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: PRIMARY }}>1,500+</span>
              <span className="text-xs" style={{ color: FOREGROUND_LIGHT }}>{t.trustIndicators.clientsHelped}</span>
            </div>
          </div>
        </div>
      </section>      {/* Why Choose Section - Updated heading */}
      <section className="py-16 overflow-hidden" style={{ backgroundColor: WHITE, maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center mb-12">
            {/* Updated to consistent 5xl size */}
            <h2 
              className={sectionHeadingClass}
              style={{ color: FOREGROUND }}
            >
              {t.whyChoose.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Feature 1 - Standardized feature card */}
            <div className="text-center">
              {/* Icon in colored circle - Consistent size across site */}
              <div className="mx-auto mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: ICON_BG_COLORS.calendar }}
                >
                  <Calendar className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
              </div>
              
              {/* Standardized feature heading */}
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: FOREGROUND }}
              >
                {t.whyChoose.features.convenient.title}
              </h3>
              
              {/* Standardized description text */}
              <p style={{ color: FOREGROUND_LIGHT }} className="text-sm font-light">
                {t.whyChoose.features.convenient.description}
              </p>
            </div>

            {/* Feature 2 - Apply same standardization */}
            <div className="text-center">
              <div className="mx-auto mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: ICON_BG_COLORS.users }}
                >
                  <Users className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
              </div>
              
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: FOREGROUND }}
              >
                {t.whyChoose.features.specialists.title}
              </h3>
              
              <p style={{ color: FOREGROUND_LIGHT }} className="text-sm font-light">
                {t.whyChoose.features.specialists.description}
              </p>
            </div>

            {/* Feature 3 - Apply same standardization */}
            <div className="text-center">
              <div className="mx-auto mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: ICON_BG_COLORS.message }}
                >
                  <MessageSquare className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
              </div>
              
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: FOREGROUND }}
              >
                {t.whyChoose.features.support247.title}
              </h3>
              
              <p style={{ color: FOREGROUND_LIGHT }} className="text-sm font-light">
                {t.whyChoose.features.support247.description}
              </p>
            </div>

            {/* Feature 4 - Apply same standardization */}
            <div className="text-center">
              <div className="mx-auto mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: ICON_BG_COLORS.dollar }}
                >
                  <DollarSign className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
              </div>
              
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: FOREGROUND }}
              >
                {t.whyChoose.features.affordable.title}
              </h3>
              
              <p style={{ color: FOREGROUND_LIGHT }} className="text-sm font-light">
                {t.whyChoose.features.affordable.description}
              </p>
            </div>
          </div>
          
          {/* CTA with standardized button */}
          <div className="text-center">
            <Button 
              className={primaryButtonClass}
              style={{ backgroundColor: PRIMARY }}
              onClick={scrollToWaitlist}
            >
              {t.whyChoose.cta}
            </Button>
          </div>
        </div>
      </section>      {/* Quality care section - Updated heading */}
      <section className="py-20 bg-background overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-x-16 items-start">
            {/* Left side - Standardized heading */}
            <div className="lg:pl-12">
              {/* SVG Wavy line with gradient */}
              <div className="mb-8 max-w-[400px]">
                <svg width="100%" height="140" viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="wavyLineGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#FFF7B2" />
                      <stop offset="50%" stopColor="#A8E6E2" />
                      <stop offset="100%" stopColor="#6355CC" />
                    </linearGradient>
                  </defs>
                  
                  {/* Wavy path */}
                  <path 
                    d="M0,70 C50,30 100,110 150,70 C200,30 250,110 300,70 C350,30 400,70 400,70" 
                    stroke="url(#wavyLineGradient)" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeLinecap="round"
                  />
                  
                </svg>
              </div>
                {/* Standardized heading to consistent 5xl size */}
              <h2 className={mainHeadingClass} style={{ color: FOREGROUND }}>
                {t.qualityCare.title1}
              </h2>
              <h2 className={mainHeadingClass.replace('mb-6', '')} style={{ color: FOREGROUND }}>
                {t.qualityCare.title2}
              </h2>
            </div>
            
            {/* Right side - Standardize stat text */}
            <div className="space-y-12 lg:pr-12 mt-8 lg:mt-0">              {/* Stat 1 - Standardized stat display */}
              <div>
                <div className="flex items-center">
                  <span className="text-5xl font-medium" style={{ color: PRIMARY, minWidth: '85px' }}>83%</span>
                  <div className="ml-6">
                    <p style={{ color: FOREGROUND_LIGHT, lineHeight: '1.5' }} className="font-light">
                      {t.qualityCare.stats.stat1}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Stats 2 & 3 - Apply same standardization */}
              <div>
                <div className="flex items-center">
                  <span className="text-5xl font-medium" style={{ color: PRIMARY, minWidth: '85px' }}>74%</span>
                  <div className="ml-6">
                    <p style={{ color: FOREGROUND_LIGHT, lineHeight: '1.5' }} className="font-light">
                      {t.qualityCare.stats.stat2}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <span className="text-5xl font-medium" style={{ color: PRIMARY, minWidth: '85px' }}>72%</span>
                  <div className="ml-6">
                    <p style={{ color: FOREGROUND_LIGHT, lineHeight: '1.5' }} className="font-light">
                      {t.qualityCare.stats.stat3}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Footnote - Consistent styling */}
              <div className="pt-4">
                <p className="text-sm text-gray-400 font-light" style={{ lineHeight: '1.5' }}>
                  {t.qualityCare.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Why Choose TeleTebib Section - Updated heading */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: WHITE, maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-x-16 items-center">
            {/* Left side - Video call image - No changes needed */}
            <div className="relative mb-12 lg:mb-0">
              {/* Phone-like container with 6:9 aspect ratio */}
              <div className="rounded-[28px] overflow-hidden shadow-lg bg-white p-0 max-w-[380px] mx-auto relative" 
                   style={{ aspectRatio: '6/9' }}>
                <div className="relative h-full overflow-visible">
                  {/* Main video call image - Now covering the full container */}
                  <img 
                    src="/doctor.png" 
                    alt="Doctor on video call"
                    className="w-full h-full object-cover rounded-[20px]"
                  />
                  
                  {/* Video call controls - Now with PRIMARY color for hangup button */}
                  <div className="absolute bottom-6 left-0 w-full flex items-center justify-center gap-4 z-20">
                    {/* Microphone button */}
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Mic size={20} className="text-gray-600" />
                    </div>
                    
                    {/* Video button */}
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Video size={20} className="text-gray-600" />
                    </div>
                    
                    {/* Hangup button - Changed from #5956E9 to PRIMARY color */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: PRIMARY }}>
                      <Phone size={20} className="text-white" />
                    </div>
                    
                    {/* More options button */}
                    <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <MoreHorizontal size={20} className="text-gray-600" />
                    </div>
                  </div>

                  {/* Semi-transparent gradient overlay at the bottom for better button visibility */}
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent rounded-b-[20px]"></div>
                </div>
              </div>
              
              {/* Small patient video overlay - Positioned over the doctor's video */}
              <div 
                className="absolute overflow-hidden border-3 border-white shadow-lg" 
                style={{ 
                  width: "140px", 
                  borderRadius: "20px",
                  aspectRatio: "6/9",
                  left: "10%",
                  top: "70%",
                  transform: "translateY(-50%)",
                  zIndex: 30,
                  boxShadow: "0 6px 12px rgba(0,0,0,0.15)" 
                }}
              >
                <img 
                  src="/patient.jpg" 
                  alt="Patient on video call"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements - Updated for better matching to reference */}
              <div className="absolute -z-10 w-48 h-48 rounded-full bg-yellow-50 top-0 -left-12 -translate-y-1/4"></div>
              <div className="absolute -z-10 w-40 h-40 rounded-full bg-blue-50 bottom-0 -right-8 translate-y-1/4"></div>
              <div className="absolute -z-10 w-32 h-32 rounded-full bg-indigo-50 top-1/2 -right-16"></div>
            </div>
              {/* Right side - Standardizing text */}            <div className="lg:pl-8">
              <h2 className={sectionHeadingClass} style={{ color: FOREGROUND }}>
                {t.whyTeleTebib.title}
              </h2>
              
              <div className="space-y-8">
                {/* Benefits 1-3 - Standardized layouts and text styling */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_LIGHT }}>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L8 6H4V20H20V6H16L12 2Z" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 14L11 16L15 11.5" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>                    <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                      {t.whyTeleTebib.benefits.specialists.title}
                    </h3>
                    {/* Making description text lighter and thinner */}
                    <p style={{ color: FOREGROUND_LIGHT }} className="font-light">
                      {t.whyTeleTebib.benefits.specialists.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_LIGHT }}>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill={PRIMARY}/>
                    </svg>
                  </div>
                  <div>                    <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                      {t.whyTeleTebib.benefits.personalizedPlans.title}
                    </h3>
                    <p style={{ color: FOREGROUND_LIGHT }} className="font-light">
                      {t.whyTeleTebib.benefits.personalizedPlans.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY_LIGHT }}>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12H19L16 22L8 2L5 12H2" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>                    <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                      {t.whyTeleTebib.benefits.comfortable.title}
                    </h3>
                    <p style={{ color: FOREGROUND_LIGHT }} className="font-light">
                      {t.whyTeleTebib.benefits.comfortable.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button 
                  className={primaryButtonClass}
                  style={{ backgroundColor: PRIMARY }}
                  onClick={scrollToWaitlist}
                >                  {t.whyTeleTebib.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Medical Specialties Section */}
      <section className="py-20 bg-background overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden"><div className="text-center mb-16">
            <h2 className={sectionHeadingClass} style={{ color: FOREGROUND }}>
              {t.specialties.title}
            </h2>            <p className="max-w-3xl mx-auto text-center font-light text-lg" style={{ color: FOREGROUND_LIGHT }}>
              {t.specialties.subtitle}
            </p>
          </div>          {/* All Specialties in a Single Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 md:gap-6 justify-center">
            {/* General & Primary Care */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/General-practitioner.png" 
                    alt="General Practitioner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.generalPractitioner}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Pediatrician.png" 
                    alt="Pediatrician"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.pediatrician}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Internal-medicine.png" 
                    alt="Internal Medicine"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.internalMedicine}
              </h3>
            </div>

            {/* Specialist Doctors */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Cardiologist.png" 
                    alt="Cardiologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.cardiologist}
              </h3>
            </div>            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Endocrinologist.png" 
                    alt="Endocrinologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.endocrinologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Pulmonologist.png" 
                    alt="Pulmonologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.pulmonologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Gastroenterologist.png" 
                    alt="Gastroenterologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.gastroenterologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Neurologist.png" 
                    alt="Neurologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.neurologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Neurosurgeon.png" 
                    alt="Neurosurgeon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.neurosurgeon}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Ophthalmologist.png" 
                    alt="Ophthalmologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.ophthalmologist}
              </h3>
            </div>            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/ENT-specialist.png" 
                    alt="ENT Specialist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.ent}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Dermatologist.png" 
                    alt="Dermatologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.dermatologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Rheumatologist.png" 
                    alt="Rheumatologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.rheumatologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Allergist.png" 
                    alt="Allergist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.allergist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Nephrologist.png" 
                    alt="Nephrologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.nephrologist}
              </h3>
            </div>            {/* Women's & Men's Health */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Gynecologist.png" 
                    alt="Gynecologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.gynecologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Obstetrician.png" 
                    alt="Obstetrician"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.obstetrician}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Urologist.png" 
                    alt="Urologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.urologist}
              </h3>
            </div>

            {/* Mental Health & Therapy */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Psychiatrist.png" 
                    alt="Psychiatrist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.psychiatrist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Psychologist.png" 
                    alt="Psychologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.psychologist}
              </h3>
            </div>

             <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/logoped.png" 
                    alt="Logoped"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.logoped}
              </h3>
            </div>

            {/* Surgical & Emergency Care */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/General-surgeon.png" 
                    alt="General Surgeon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.generalSurgeon}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Orthopedic-surgeon.png" 
                    alt="Orthopedic Surgeon"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.orthopedist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Traumatologist.png" 
                    alt="Traumatologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.traumatologist}
              </h3>
            </div>

            {/* Other Important Specialists */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Oncologist.png" 
                    alt="Oncologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.oncologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Hematologist.png" 
                    alt="Hematologist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.hematologist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Infectious-disease.png" 
                    alt="Infectious Disease Specialist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.infectiousDisease}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Sexual-health.png" 
                    alt="Sexual Health Specialist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.sexualHealth}
              </h3>
            </div>

            {/* Alternative & Supportive Care */}
            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Physiotherapist.png" 
                    alt="Physiotherapist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.physiotherapist}
              </h3>
            </div>

            <div className="specialty-card flex flex-col items-center">
              <div 
                className="rounded-lg bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-105 mb-3 p-6" 
                style={{ 
                  borderWidth: "1px", 
                  borderColor: "transparent",
                  transformOrigin: "center",
                  willChange: "transform, box-shadow"
                }}>
                <div className="w-full h-full relative overflow-hidden rounded-lg">
                  <img 
                    src="/specialties/Nutritionist.png" 
                    alt="Nutritionist"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>              
              <h3 className="text-xs font-medium text-center" style={{ color: FOREGROUND }}>
                {t.specialties.names.nutritionist}
              </h3>
            </div>
          </div>
        </div>
      </section>      {/* Common conditions and symptoms section - Updated headings */}
      <section className="py-20 bg-background overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          {/* Standardized section heading to consistent 5xl size */}          <div className="text-center mb-12">
            <h2 className={sectionHeadingClass.replace('mb-6', 'mb-4')} style={{ color: FOREGROUND }}>
              {t.conditions.sectionTitle}
            </h2>
            <p className="max-w-4xl mx-auto text-center font-light text-lg" style={{ color: FOREGROUND_LIGHT }}>
              {t.conditions.subtitle}
            </p>
          </div>
            {/* Cards grid layout - Standardized card styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12">            {/* All condition cards standardized formatting */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.anxiety.title}</h3>
              <ul className="space-y-2 sm:space-y-3"> {/* Reduced space between items */}
                {t.conditions.anxiety.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`anxiety-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>            {/* Depression card - apply same changes to all cards */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.depression.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.depression.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`depression-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>              {/* Bipolar disorder card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.bipolarDisorder.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.bipolarDisorder.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`bipolar-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>              {/* A 4th card in the first row */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.panicAttack.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.panicAttack.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`panic-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>              {/* Insomnia card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.insomnia.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.insomnia.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`insomnia-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>              {/* ADHD card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.adhd.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.adhd.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`adhd-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>              {/* A 4th card in the second row */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.ptsd.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.ptsd.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`ptsd-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>            {/* Other common conditions card */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm overflow-hidden">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: FOREGROUND }}>{t.conditions.otherConditions.title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {t.conditions.otherConditions.symptoms.slice(0, 4).map((symptom, index) => (
                  <li key={`other-symptom-${index}`} className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0" style={{ color: PRIMARY }}>•</span>
                    <span style={{ color: FOREGROUND_LIGHT, lineHeight: "1.3", fontSize: "0.95rem" }}>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
            {/* CTA Button - Standardized */}
          <div className="mt-12 text-center">
            <Button 
              className={primaryButtonClass}
              style={{ backgroundColor: PRIMARY }}
              onClick={scrollToWaitlist}
            >
              {t.whyTeleTebib.cta}
            </Button>
          </div>
        </div>
      </section>      {/* Our Services section - Corrected heading and translations */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: "#FFFCF4", maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          {/* Standardized section heading to consistent 5xl size */}
          <div className="text-center mb-12">
            <h2 className={mainHeadingClass} style={{ color: FOREGROUND }}>
              {t.ourServices.title}
            </h2>
            <p className="max-w-3xl mx-auto text-center font-light text-lg" style={{ color: FOREGROUND_LIGHT }}>
              {t.ourServices.subtitle}
            </p>
          </div>
          
          {/* Service cards - Standardized styling */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* All service cards with standardized layouts */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="mb-6 p-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <ClipboardList size={42} className="stroke-[1.5]" style={{ color: PRIMARY }} />
                </div>
              </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: FOREGROUND }}>
                {t.ourServices.services.medication.title}
              </h3>
              
              {/* <p className="font-medium mb-3" style={{ color: PRIMARY }}>
                $95/month
              </p> */}
              
              <p className="text-sm font-light mb-6" style={{ color: FOREGROUND_LIGHT }}>
                {t.ourServices.services.medication.description}
              </p>
              
              <Button 
                className={outlineButtonClass}
                variant="outline"
                style={{ color: PRIMARY, borderColor: PRIMARY }}
                onClick={scrollToWaitlist}
              >
                {t.ourServices.cta}
              </Button>
            </div>
            
            {/* Individual Therapy card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="mb-6 p-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Network size={42} className="stroke-[1.5]" style={{ color: PRIMARY }} />
                </div>
              </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: FOREGROUND }}>
                {t.ourServices.services.individualTherapy.title}
              </h3>
              
              {/* <p className="font-medium mb-3" style={{ color: PRIMARY }}>
                Starting at $225/month
              </p> */}
              
              <p className="text-sm font-light mb-6" style={{ color: FOREGROUND_LIGHT }}>
                {t.ourServices.services.individualTherapy.description}
              </p>
              
              <Button 
                className={outlineButtonClass}
                variant="outline"
                style={{ color: PRIMARY, borderColor: PRIMARY }}
                onClick={scrollToWaitlist}
              >
                {t.ourServices.cta}
              </Button>
            </div>
            
            {/* Couples Therapy card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="mb-6 p-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Users size={42} className="stroke-[1.5]" style={{ color: PRIMARY }} />
                </div>
              </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: FOREGROUND }}>
                {t.ourServices.services.couplesTherapy.title}
              </h3>
              
              {/* <p className="font-medium mb-3" style={{ color: PRIMARY }}>
                $325/month
              </p> */}
              
              <p className="text-sm font-light mb-6" style={{ color: FOREGROUND_LIGHT }}>
                {t.ourServices.services.couplesTherapy.description}
              </p>
              
              <Button 
                className={outlineButtonClass}
                variant="outline"
                style={{ color: PRIMARY, borderColor: PRIMARY }}
                onClick={scrollToWaitlist}
              >
                {t.ourServices.cta}
              </Button>
            </div>
            
            
            {/* Therapy & Medication card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col items-center text-center">
              <div className="mb-6 p-2">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Heart size={42} className="stroke-[1.5]" style={{ color: PRIMARY }} />
                </div>
              </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: FOREGROUND }}>
                {t.ourServices.services.therapyMedication.title}
              </h3>
              
              {/* <p className="font-medium mb-3" style={{ color: PRIMARY }}>
                Starting at $305/month
              </p> */}
              
              <p className="text-sm font-light mb-6" style={{ color: FOREGROUND_LIGHT }}>
                {t.ourServices.services.therapyMedication.description}
              </p>
              
              <Button 
                className={outlineButtonClass}
                variant="outline"
                style={{ color: PRIMARY, borderColor: PRIMARY }}
                onClick={scrollToWaitlist}
              >
                {t.ourServices.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>      {/* Medication Reminder Feature Section */}
      <section className="py-20 bg-white overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Feature Description */}            <div>
              <h2 className={mainHeadingClass} style={{ color: FOREGROUND }}>
                {t.medicationReminder.title}
              </h2>
              <p className="text-lg font-light mb-6" style={{ color: FOREGROUND_LIGHT, lineHeight: "1.6" }}>
                {t.medicationReminder.subtitle}
              </p>
              
              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: PRIMARY_LIGHT }}>
                    <CalendarClock className="w-5 h-5" style={{ color: PRIMARY }} />
                  </div>
                  <div>                    <h3 className="text-lg font-semibold mb-1" style={{ color: FOREGROUND }}>
                      {t.medicationReminder.features.reminders.title}
                    </h3>
                    <p className="font-light" style={{ color: FOREGROUND_LIGHT }}>
                      {t.medicationReminder.features.reminders.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: PRIMARY_LIGHT }}>
                    <ClipboardList className="w-5 h-5" style={{ color: PRIMARY }} />
                  </div>
                  <div>                    <h3 className="text-lg font-semibold mb-1" style={{ color: FOREGROUND }}>
                      {t.medicationReminder.features.tracking.title}
                    </h3>
                    <p className="font-light" style={{ color: FOREGROUND_LIGHT }}>
                      {t.medicationReminder.features.tracking.description}
                    </p>
                  </div>
                </div>
              </div>
                <div className="mt-10">
                <Button 
                  className={primaryButtonClass}
                  style={{ backgroundColor: PRIMARY }}
                  onClick={scrollToWaitlist}
                >
                  {t.whyTeleTebib.cta}
                </Button>
              </div>
            </div>
              {/* Right Column - iOS Notification Visualization */}
            <div className="relative flex justify-center items-center min-h-[300px] overflow-hidden w-full">
              {/* Decorative elements */}
              
              {/* iOS-style notification with improved animation */}
              <div className="relative w-full max-w-[310px] sm:max-w-[340px] md:max-w-[380px]">
                {/* Drop shadow effect that animates with the notification */}
                <div 
                  className="absolute inset-0 bg-black/5 rounded-2xl blur-md animate-notificationShadow"
                  style={{ 
                    animationDuration: '8s',
                    animationIterationCount: 'infinite',
                  }}
                ></div>
                
                {/* Main notification */}
                <div 
                  className="animate-notificationPulse relative bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-gray-200"
                  style={{ 
                    animationDuration: '8s',
                    animationIterationCount: 'infinite',
                  }}
                >
                  <div className="flex items-start">
                    {/* App Icon */}
                    <div className="h-12 w-12 rounded-xl mr-3 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: PRIMARY }}>
                      <span className="text-lg font-bold text-white">
                        <img 
                          src="/w_logo.png" 
                          alt="TeleTebib app secondary view"
                          className="p-2"
                        />
                    </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-base font-bold text-gray-800">TeleTebib</h4>
                        <span className="text-xs text-gray-500">now</span>
                      </div>
                      <p className="text-base font-medium text-gray-800 mt-1">
                        Dərman qəbul etmə vaxtıdır📌: <br />💊Sertraline (50mg)
                      </p>
                      <div className="mt-2 flex">
                        <div className="text-xs font-medium text-primary mr-4">Qəbul etdim</div>
                        <div className="text-xs font-medium text-gray-500">Sonra xatırlat</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Getting started section - With mobile optimization */}
      <section className="py-20 bg-background overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Steps */}
            <div>              <h2 className={mainHeadingClass.replace('mb-6', 'mb-10')} style={{ color: FOREGROUND }}>
                {t.howItWorks.title}
              </h2>
              
              {/* Standardize step layouts and styles */}
              <div className="flex items-start gap-6 mb-12">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: PRIMARY_LIGHT }}>
                  <HeartIcon className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
                <div>                  <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                    {t.howItWorks.steps.step1.title}
                  </h3>
                  <p className="font-light" style={{ color: FOREGROUND_LIGHT, lineHeight: '1.6' }}>
                    {t.howItWorks.steps.step1.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: PRIMARY_LIGHT }}>
                  <CalendarClock className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
                <div>                  <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                    {t.howItWorks.steps.step2.title}
                  </h3>
                  <p className="font-light" style={{ color: FOREGROUND_LIGHT, lineHeight: '1.6' }}>
                    {t.howItWorks.steps.step2.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: PRIMARY_LIGHT }}>
                  <BookOpenCheck className="w-6 h-6" style={{ color: PRIMARY }} />
                </div>
                <div>                  <h3 className="text-xl font-semibold mb-2" style={{ color: FOREGROUND }}>
                    {t.howItWorks.steps.step3.title}
                  </h3>
                  <p className="font-light" style={{ color: FOREGROUND_LIGHT, lineHeight: '1.6' }}>
                    {t.howItWorks.steps.step3.description}
                  </p>
                </div>
              </div>
                {/* CTA Button - Standardized */}
              <Button 
                className={primaryButtonClass}
                style={{ backgroundColor: PRIMARY }}
                onClick={scrollToWaitlist}
              >
                {t.whyTeleTebib.cta}
              </Button>
            </div>              {/* Right Column - With improved overflow containment for mobile */}            <div className="relative overflow-hidden max-w-full" style={{ width: "100%" }}>
              <div className="relative z-10 flex justify-center overflow-hidden w-full">
                <div className="relative w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px]" style={{ marginBottom: "60px" }}>
                  {/* Secondary image - fixed to prevent overflow issues */}                  <div className="absolute" style={{
                    top: "30px",
                    right: "-40px",
                    zIndex: 1,
                    width: "min(200px, 60%)",
                    height: "auto",
                    transform: "rotate(4deg)",
                    overflow: "hidden"
                  }}>
                    <img 
                      src="/showcase2.jpg" 
                      alt="TeleTebib app secondary view"
                      className="rounded-3xl shadow-lg w-full h-auto"
                      style={{ 
                        maxWidth: "100%",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.12)"
                      }}
                      loading="lazy"
                    />
                  </div>
                    {/* Main image - maintained as primary focus */}
                  <div className="relative" style={{ zIndex: 10 }}>                    <img 
                      src="/showcase.jpg" 
                      alt="TeleTebib app showing clinician selection interface"
                      className="rounded-3xl shadow-lg w-full"
                      style={{ 
                        maxWidth: "100%",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)" 
                      }}
                    />
                      {/* Repositioned notification to bottom left with responsive positioning */}
                    <div className="hidden sm:block absolute bottom-8 -left-16 z-20">
                      <div className="rounded-full py-3 px-5 shadow-md flex items-center gap-3 whitespace-nowrap"
                        style={{ backgroundColor: WHITE }}>
                        <div className="rounded-full w-6 h-6 flex items-center justify-center"
                          style={{ backgroundColor: PRIMARY_LIGHT }}>
                          <ClipboardList className="w-4 h-4" style={{ color: PRIMARY }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: PRIMARY }}>
                          {t.howItWorks.notification}
                        </span>
                      </div>
                    </div>
                      {/* Mobile version of notification - positioned at bottom with better containment */}
                    <div className="sm:hidden absolute -bottom-12 left-0 right-0 flex justify-center z-20 px-4">
                      <div className="rounded-full py-2 px-3 shadow-md flex items-center gap-2 whitespace-nowrap max-w-[180px] overflow-hidden"
                        style={{ backgroundColor: WHITE }}>
                        <div className="flex-shrink-0 rounded-full w-5 h-5 flex items-center justify-center"
                          style={{ backgroundColor: PRIMARY_LIGHT }}>
                          <ClipboardList className="w-3 h-3" style={{ color: PRIMARY }} />
                        </div>
                        <span className="text-xs font-medium truncate" style={{ color: PRIMARY }}>
                          {t.howItWorks.notification}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Waitlist Section - New section above "Are you a doctor?" */}
      <section ref={waitlistRef} className="py-20 bg-background overflow-hidden" style={{ backgroundColor: "#FFFCF4", maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center"><h2 className={mainHeadingClass} style={{ color: FOREGROUND }}>
              {t.waitlist.title}
            </h2>
            
            <p className="text-lg font-light mb-8" style={{ color: FOREGROUND_LIGHT, lineHeight: "1.6" }}>
              {t.waitlist.subtitle}
            </p>
            
            {/* Waitlist email form */}
            <div className="mt-8">
              <form 
                onSubmit={handleWaitlistSubmit}
                className="flex flex-col sm:flex-row gap-4 mx-auto"
              >
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder={t.waitlist.emailPlaceholder}
                  required
                  className="px-5 py-3 flex-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button 
                  type="submit"
                  className={primaryButtonClass}
                  style={{ backgroundColor: PRIMARY }}
                >
                  {t.waitlist.cta}                </button>
              </form>
              
              {/* Message display area for waitlist form */}
              {(submitMessage || submitError) && (
                <div className="mt-3">
                  {submitMessage && (
                    <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md border border-green-200 mx-auto max-w-md">
                      {submitMessage}
                    </p>
                  )}
                  {submitError && (
                    <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200 mx-auto max-w-md">
                      {submitError}
                    </p>
                  )}
                </div>
              )}
                <p className="text-xs text-gray-500 mt-3">
                {t.waitlist.privacyNote}
              </p>
            </div>
            
            {/* Trust indicators for waitlist */}
            <div className="grid grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
              <div className="text-center">
                <span className="text-3xl font-bold block mb-2" style={{ color: PRIMARY }}>500+</span>                <span className="text-sm" style={{ color: FOREGROUND_LIGHT }}>{t.waitlist.stats.waitingList}</span>
              </div>
                         
              <div className="text-center">
                <span className="text-3xl font-bold block mb-2" style={{ color: PRIMARY }}>Beta</span>
                <span className="text-sm" style={{ color: FOREGROUND_LIGHT }}>{t.waitlist.stats.betaInvite}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Updated "Are you a doctor?" section with white background - Optimized for mobile */}      <section className="py-10 sm:py-14 md:py-20 overflow-hidden" style={{ backgroundColor: WHITE, maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">{/* Left Column - Doctor Image - Now optimized with image on top for mobile */}
            <div className="relative mx-auto order-1 lg:order-1 mb-6 sm:mb-8 lg:mb-0">
              <div className="relative">
                {/* Main doctor image - Responsive version */}
                <img 
                  src="/doctor_showcase.png" 
                  alt="Doctor using a tablet"
                  className="rounded-xl shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                  style={{ 
                    zIndex: 10,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    objectFit: "contain"
                  }}
                  loading="lazy" // Improve performance on mobile
                />
                  {/* Decorative background circles - Contained within viewport */}
                <div className="absolute -z-10 w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-40 rounded-full bg-blue-50/80 top-0 left-0 sm:-left-4 md:-left-8 -translate-y-1/4"></div>
                <div className="absolute -z-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 rounded-full bg-indigo-50/80 bottom-8 -right-2 sm:-right-6 md:-right-10"></div>
              </div>
            </div>
            
            {/* Right Column - Text content - Mobile optimized */}
            <div className="order-2 lg:order-2">              <h2 className={`${mainHeadingClass} text-center lg:text-left mt-2`} style={{ color: FOREGROUND }}>
                {t.doctorSection.title}
              </h2>
              
              <p className="text-base md:text-lg font-light mb-6 md:mb-8 text-center lg:text-left" style={{ color: FOREGROUND_LIGHT, lineHeight: "1.6" }}>
                {t.doctorSection.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-4 md:gap-5 mb-8 md:mb-10">
                <Button 
                  className={`${primaryButtonClass} w-full sm:w-auto`}
                  style={{ backgroundColor: PRIMARY }}
                  onClick={() => setShowDoctorDialog(true)}
                >
                  {t.doctorSection.cta}
                </Button>
                <p className="text-sm font-medium pt-2" style={{ color: FOREGROUND_LIGHT }}>
                  {t.doctorSection.limitedAccess}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-bold block mb-1 md:mb-2" style={{ color: PRIMARY }}>50+</span>
                  <span className="text-xs md:text-sm" style={{ color: FOREGROUND_LIGHT }}>{t.doctorSection.stats.registeredDoctors}</span>
                </div>
                
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-bold block mb-1 md:mb-2" style={{ color: PRIMARY }}>8+</span>
                  <span className="text-xs md:text-sm" style={{ color: FOREGROUND_LIGHT }}>{t.doctorSection.stats.coveredRegions}</span>
                </div>
                
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-bold block mb-1 md:mb-2" style={{ color: PRIMARY }}>96%</span>
                  <span className="text-xs md:text-sm" style={{ color: FOREGROUND_LIGHT }}>{t.doctorSection.stats.satisfaction}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Lives changed - Testimonials section */}
      <section className="py-24 overflow-hidden" style={{ backgroundColor: "#EFF6FF", maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 relative overflow-hidden">
          {/* Standardized section heading to consistent 5xl size */}          <h2 className={mainHeadingClass.replace('mb-6', 'mb-16')} style={{ color: FOREGROUND, textAlign: 'center' }}>
            {t.testimonials.title}
          </h2>
          
          {/* Standardize testimonial card styling */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Map through the selected testimonials */}
            {selectedTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm relative">
                {/* Quote icon */}
                <div className="absolute -top-3 -left-3">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <Quote size={24} className="text-primary" style={{ color: PRIMARY_DARK }} />
                  </div>
                </div>
                
                {/* Testimonial text */}
                <p className="text-lg mb-8 mt-6" style={{ color: FOREGROUND }}>
                  {testimonial.text}
                </p>
                
                {/* Author */}
                <div className="mt-auto">
                  <p className="font-semibold text-lg mb-2" style={{ color: FOREGROUND }}>
                    {testimonial.name}, {testimonial.age} yaş, {testimonial.role}
                  </p>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                      <Star 
                        key={starIndex}
                        size={18} 
                        className="fill-yellow-400 text-yellow-400 mr-0.5" 
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
            {/* Decorative elements - Ensured to be contained within viewport */}
          <div className="absolute -z-10 left-0 top-24 h-28 sm:h-36 w-28 sm:w-36">
            <div className="w-full h-full rounded-full bg-yellow-100 opacity-60"></div>
          </div>
          <div className="absolute -z-10 right-0 bottom-24 h-32 sm:h-48 w-32 sm:w-48">
            <div className="w-full h-full rounded-full bg-blue-100 opacity-60"></div>
          </div>
        </div>
      </section>      {/* FAQ Section - Updated heading */}
      <section className="py-24 bg-white overflow-hidden" style={{ maxWidth: "100vw" }}>
        <div className="container mx-auto px-4 overflow-hidden"><h2 className={mainHeadingClass.replace('mb-6', 'mb-16')} style={{ color: FOREGROUND, textAlign: 'center' }}>
            {t.faq.title}
          </h2>
          
          <div className="max-w-3xl mx-auto">
            {/* Standardize FAQ item styling and animations */}
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  className="w-full text-left py-6 flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
                >
                  <h3 
                    className="text-xl font-semibold" 
                    style={{ color: openFaqIndex === index ? PRIMARY : FOREGROUND }}
                  >
                    {item.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <X 
                      className="flex-shrink-0 transition-transform duration-200"
                      size={24} 
                      style={{ color: PRIMARY }} 
                    />
                  ) : (
                    <Plus 
                      className="flex-shrink-0 transition-transform duration-200" 
                      size={24} 
                      style={{ color: PRIMARY }} 
                    />
                  )}
                </button>
                
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ 
                    maxHeight: openFaqIndex === index ? '1000px' : '0px',
                    opacity: openFaqIndex === index ? 1 : 0,
                    marginBottom: openFaqIndex === index ? '24px' : '0px'
                  }}
                >
                  <div className="font-light" style={{ color: FOREGROUND_LIGHT }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
        {/* Footer - Updated with white logo to the left and removed rectangle shape */}
      <footer style={{ backgroundColor: PRIMARY, maxWidth: "100vw", overflow: "hidden" }}>
        <div className="container mx-auto px-4 py-8 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo and copyright - Updated with white logo */}            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                {/* White logo added to the left */}
                <img src="/w_logo.png" alt="TeleTebib Logo" className="h-6 w-auto" />
                <span className="text-lg font-semibold text-white">{t.footer.brandName}</span>
              </div>
              <p className="text-sm font-light text-white opacity-90">
                {t.footer.copyright}
              </p>
            </div>
            
            {/* Social Media Only */}            <div className="flex space-x-4">
            {
              [
                { Icon: Facebook, label: t.footer.socialMedia.facebook },
                { Icon: Twitter, label: t.footer.socialMedia.twitter },
                { Icon: Instagram, label: t.footer.socialMedia.instagram },
                { Icon: Linkedin, label: t.footer.socialMedia.linkedin }
              ].map(({ Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/10 transition-colors"
                >
                  <Icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>
            {/* Legal notice - Important to keep for mental health services */}          <div className="mt-8 text-center">
            <p className="text-xs font-light text-white/80">
              {t.footer.emergencyNotice}
            </p>
          </div>
        </div>
      </footer>      {/* Success Popup */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.messages.thanks}</DialogTitle>
            <DialogDescription className="text-lg">
              {t.messages.emailRegistered}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Doctor Registration Dialog */}
      <Dialog open={showDoctorDialog} onOpenChange={setShowDoctorDialog}>
        <DialogContent className="bg-white border border-gray-200 shadow-lg max-w-md">
          <DialogHeader>            <DialogTitle className="text-2xl" style={{ color: PRIMARY }}>
              {t.doctorDialog.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {t.doctorDialog.subtitle}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleDoctorSubmit} className="space-y-4">
            <div className="space-y-2">              <Label htmlFor="doctor-name" className="text-sm font-medium">{t.doctorDialog.fields.name}</Label>
              <Input
                id="doctor-name"
                type="text"
                value={doctorFormData.name}
                onChange={(e) => handleDoctorInputChange('name', e.target.value)}
                placeholder={t.doctorDialog.placeholders.name}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">              <Label htmlFor="doctor-surname" className="text-sm font-medium">{t.doctorDialog.fields.surname}</Label>
              <Input
                id="doctor-surname"
                type="text"
                value={doctorFormData.surname}
                onChange={(e) => handleDoctorInputChange('surname', e.target.value)}
                placeholder={t.doctorDialog.placeholders.surname}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">              <Label htmlFor="doctor-mobile" className="text-sm font-medium">{t.doctorDialog.fields.mobileNumber}</Label>
              <Input
                id="doctor-mobile"
                type="tel"
                value={doctorFormData.mobileNumber}
                onChange={(e) => handleDoctorInputChange('mobileNumber', e.target.value)}
                placeholder={t.doctorDialog.placeholders.mobileNumber}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">              <Label htmlFor="doctor-license" className="text-sm font-medium">{t.doctorDialog.fields.licenseNumber}</Label>
              <Input
                id="doctor-license"
                type="text"
                value={doctorFormData.licenseNumber}
                onChange={(e) => handleDoctorInputChange('licenseNumber', e.target.value)}
                placeholder={t.doctorDialog.placeholders.licenseNumber}
                required
                className="w-full"
              />
            </div>

            {/* Message display area */}
            {(doctorSubmitMessage || doctorSubmitError) && (
              <div className="mt-4">
                {doctorSubmitMessage && (
                  <p className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md border border-green-200">
                    {doctorSubmitMessage}
                  </p>
                )}
                {doctorSubmitError && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                    {doctorSubmitError}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDoctorDialog(false)}
                className="flex-1"
                disabled={isDoctorSubmitting}
              >                {t.doctorDialog.buttons.cancel}
              </Button>
              <Button
                type="submit"
                className="flex-1"
                style={{ backgroundColor: PRIMARY, color: WHITE }}
                disabled={isDoctorSubmitting}
              >
                {isDoctorSubmitting ? t.doctorDialog.buttons.submitting : t.doctorDialog.buttons.submit}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

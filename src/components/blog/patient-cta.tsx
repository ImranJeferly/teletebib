"use client";

import { ArrowRight, Heart, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language, getTranslations } from '@/lib/localization';
import { useMemo } from 'react';
import Link from 'next/link';

interface PatientCTAProps {
  language: Language;
}

export function PatientCTA({ language }: PatientCTAProps) {
  const translations = useMemo(() => getTranslations(language), [language]);

  // Direct color definitions (same as landing page)
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";

  return (
    <div className="my-12 rounded-xl overflow-hidden shadow-lg border border-gray-100">
      <div className="md:flex">
        {/* Image Side */}
        <div 
          className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center order-2 md:order-1"
          style={{ backgroundColor: '#F0FDF4' }}
        >
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#10B981' }}
            >
              <Heart className="w-10 h-10 text-white" />
            </div>            <p className="text-sm font-medium" style={{ color: '#10B981' }}>
              {translations.cta.patient.title}
            </p>
          </div>
        </div>

        {/* Content Side */}
        <div className="md:w-2/3 p-8 order-1 md:order-2" style={{ backgroundColor: WHITE }}>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#DCFCE7' }}
            >
              <Heart className="w-6 h-6" style={{ color: '#10B981' }} />
            </div>
            <h3 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: FOREGROUND }}
            >
              {translations.cta.patient.title}
            </h3>
          </div>
          
          <p 
            className="text-base leading-relaxed mb-6"
            style={{ color: FOREGROUND_LIGHT }}
          >
            {translations.cta.patient.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: '#10B981' }} />
              <span className="text-sm" style={{ color: FOREGROUND_LIGHT }}>
                {translations.cta.patient.features.security}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: '#10B981' }} />
              <span className="text-sm" style={{ color: FOREGROUND_LIGHT }}>
                {translations.cta.patient.features.accessibility}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button 
                className="w-full rounded-full py-3 px-6 text-sm font-medium shadow-sm text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#10B981' }}
              >
                {translations.cta.patient.buttons.join}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

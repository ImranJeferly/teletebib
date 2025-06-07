"use client";

import { PatientCTA } from './patient-cta';
import { DoctorCTA } from './doctor-cta';
import { Language } from '@/lib/localization';

interface CTARendererProps {
  type: 'patient' | 'doctor';
  position?: 'before' | 'after';
  language: Language;
}

export function CTARenderer({ type, language }: CTARendererProps) {
  if (type === 'patient') {
    return <PatientCTA language={language} />;
  }
  
  if (type === 'doctor') {
    return <DoctorCTA language={language} />;
  }
  
  return null;
}

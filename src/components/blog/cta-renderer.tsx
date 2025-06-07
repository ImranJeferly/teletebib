"use client";

import { PatientCTA } from './patient-cta';
import { DoctorCTA } from './doctor-cta';

interface CTARendererProps {
  type: 'patient' | 'doctor';
  position?: 'before' | 'after';
}

export function CTARenderer({ type }: CTARendererProps) {
  if (type === 'patient') {
    return <PatientCTA />;
  }
  
  if (type === 'doctor') {
    return <DoctorCTA />;
  }
  
  return null;
}

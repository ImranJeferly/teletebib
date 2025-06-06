"use client";

import { ArrowRight, Stethoscope, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DoctorCTA() {
  // Direct color definitions (same as landing page)
  const PRIMARY = "#1A56DB";
  const PRIMARY_LIGHT = "#E6EDFB";
  const WHITE = "#FFFFFF";
  const FOREGROUND = "#0F2C71";
  const FOREGROUND_LIGHT = "#526591";

  return (
    <div className="my-12 rounded-xl overflow-hidden shadow-lg border border-gray-100">
      <div className="md:flex">
        {/* Content Side */}
        <div className="md:w-2/3 p-8" style={{ backgroundColor: WHITE }}>
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: PRIMARY_LIGHT }}
            >
              <Stethoscope className="w-6 h-6" style={{ color: PRIMARY }} />
            </div>
            <h3 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: FOREGROUND }}
            >
              Həkim məsləhəti alın
            </h3>
          </div>
          
          <p 
            className="text-base leading-relaxed mb-6"
            style={{ color: FOREGROUND_LIGHT }}
          >
            Sağlamlığınız barədə suallarınız var? Təcrübəli həkimlərimizdən onlayn məsləhət alın və sağlam həyat tərzini qoruyun.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: PRIMARY }} />
              <span className="text-sm" style={{ color: FOREGROUND_LIGHT }}>
                50+ ixtisaslı həkim
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: PRIMARY }} />
              <span className="text-sm" style={{ color: FOREGROUND_LIGHT }}>
                24/7 əlçatanlıq
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button 
                className="w-full rounded-full py-3 px-6 text-sm font-medium shadow-sm text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: PRIMARY }}
              >
                Həkim tap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/blogs" className="flex-1">
              <Button 
                variant="outline"
                className="w-full rounded-full py-3 px-6 text-sm font-medium border-2 hover:bg-gray-50 transition-colors"
                style={{ 
                  borderColor: PRIMARY,
                  color: PRIMARY
                }}
              >
                Daha çox məqalə
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Side */}
        <div 
          className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center"
          style={{ backgroundColor: PRIMARY_LIGHT }}
        >
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: PRIMARY }}
            >
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <p className="text-sm font-medium" style={{ color: PRIMARY }}>
              Həkim Məsləhəti
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

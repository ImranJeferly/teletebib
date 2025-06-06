import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'TeleTebib - Onlayn Tibbi Məsləhətlər və Psixoloji Dəstək'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#1A56DB',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 40,
                fontWeight: 'bold',
              }}
            >
              T
            </div>
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#1A56DB',
            }}
          >
            TeleTebib
          </div>
        </div>
          <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: '#0F2C71',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          Onlayn Tibbi Məsləhətlər və Psixoloji Dəstək
        </div>
        
        <div
          style={{
            fontSize: 20,
            color: '#526591',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Sertifikatlı həkimlərlə və psixoloqlarla onlayn əlaqə saxlayın. Azərbaycanda 24/7 əlçatan.
        </div>
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 40,
            gap: 30,
          }}
        >          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: '#10B981',
                borderRadius: '50%',
              }}
            />
            <span style={{ color: '#0F2C71', fontSize: 18 }}>24/7 Əlçatan</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: '#F59E0B',
                borderRadius: '50%',
              }}
            />
            <span style={{ color: '#0F2C71', fontSize: 18 }}>50+ Mütəxəssis</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: '#EF4444',
                borderRadius: '50%',
              }}
            />
            <span style={{ color: '#0F2C71', fontSize: 18 }}>Təhlükəsiz və Gizli</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

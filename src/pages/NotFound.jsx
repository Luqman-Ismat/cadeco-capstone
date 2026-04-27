import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { C, FONTS } from '../theme';
import { Btn } from '../components/UI.jsx';

export default function NotFound() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 32px',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 540 }}>
        <div style={{
          fontFamily: FONTS.mono, fontSize: 11, color: C.red,
          letterSpacing: '0.25em', fontWeight: 700, marginBottom: 16,
        }}>▮ ERROR · 404</div>
        <h1 style={{
          fontFamily: FONTS.display, fontSize: 96, fontWeight: 300,
          color: C.ink, margin: '0 0 16px', letterSpacing: '-0.04em', lineHeight: 1,
        }}>404</h1>
        <p style={{
          fontFamily: FONTS.display, fontSize: 24, color: C.ink,
          margin: '0 0 14px', fontWeight: 400,
        }}>Page not found</p>
        <p style={{ fontSize: 14, color: C.inkDim, lineHeight: 1.6, marginBottom: 32 }}>
          The page you're looking for doesn't exist or has moved.
          Head back to the dashboard or try the home page.
        </p>
        <Btn as={Link} href="/" variant="primary" icon={HomeIcon} size="lg">
          BACK TO HOME
        </Btn>
      </div>
    </div>
  );
}

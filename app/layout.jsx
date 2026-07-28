import './globals.css';
import Link from 'next/link';
import config from '../site.config.json';
import { titleCase, slugify } from '../lib/format';

// Never let a missing/partial copy object crash the build (e.g. lead-capture
// clients whose generated copy has no metaTitle). Fall back to business info.
const copy = config.copy || {};
const metaTitle = copy.metaTitle || config.businessName || 'Get a Free Quote';
const metaDescription =
  copy.metaDescription || [config.businessName, config.serviceArea].filter(Boolean).join(' — ');

export const metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: 'website',
    siteName: config.businessName,
  },
};

function MetaPixel() {
  if (!config.metaPixelId) return null;
  // Two things worth knowing about this snippet:
  //   1. autoConfig is left ON. Setting it to false (as this used to) disables
  //      Meta's automatic advanced matching, which throws away match quality
  //      for no benefit.
  //   2. A first-party `mat_xid` cookie is minted before init and passed as
  //      external_id, so even PageView carries a stable identifier. The server
  //      (lib/capi.js) hashes the same value, so the two halves line up.
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');var _x=(document.cookie.match(/(^| )mat_xid=([^;]+)/)||[])[2];if(!_x){_x=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():String(Date.now())+Math.random().toString(16).slice(2);document.cookie='mat_xid='+_x+'; max-age=31536000; path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');}fbq('init','${config.metaPixelId}',{external_id:_x});fbq('track','PageView');`,
        }}
      />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} alt=""
          src={`https://www.facebook.com/tr?id=${config.metaPixelId}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}

function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.businessName,
    description: metaDescription,
    telephone: config.phone,
    email: config.email,
    areaServed: (config.towns || []).map((t) => ({ '@type': 'City', name: t })),
    ...(config.logoUrl ? { image: config.logoUrl, logo: config.logoUrl } : {}),
    makesOffer: (config.services || []).map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const funnelMode = config.siteMode && config.siteMode !== 'full';

export default function RootLayout({ children }) {
  if (funnelMode) {
    // Ad landing build: no site chrome, just the funnel/booking + required legal links
    return (
      <html lang="en">
        <body className={`theme-${config.theme || 'classic'}`} style={{ '--brand': config.brandPrimary, '--accent': config.brandAccent, ...(config.surveyBorder ? { '--survey-border': config.surveyBorder } : {}) }}>
          {config.customCss && <style dangerouslySetInnerHTML={{ __html: config.customCss }} />}
          <MetaPixel />
          {children}
          <footer className="site" style={{ padding: '20px 0' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
              <p>© {new Date().getFullYear()} {config.businessName} · <a href={`tel:${config.phone}`}>{config.phone}</a> · <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms</Link></p>
            </div>
          </footer>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className={`theme-${config.theme || 'classic'}`} style={{ '--brand': config.brandPrimary, '--accent': config.brandAccent }}>
        {config.customCss && <style dangerouslySetInnerHTML={{ __html: config.customCss }} />}
        <MetaPixel />
        <LocalBusinessSchema />
        <header className="site">
          <div className="wrap">
            <Link href="/">
              {config.logoUrl
                ? <img src={config.logoUrl} alt={config.businessName} className="logo-img" />
                : <span className="logo-text">{config.businessName}</span>}
            </Link>
            <nav>
              <Link href="/services" className="hide-m">Services</Link>
              <Link href="/about" className="hide-m">About</Link>
              {(config.blog || []).length > 0 && <Link href="/blog" className="hide-m">Blog</Link>}
              <Link href="/contact" className="hide-m">Contact</Link>
              {config.hasBooking
                ? <Link href="/book" className="btn sm">Book Now</Link>
                : <a href={`tel:${config.phone}`} className="btn sm">Call {config.phone}</a>}
            </nav>
          </div>
        </header>
        {children}
        <footer className="site">
          <div className="wrap cols">
            <div>
              <strong style={{ color: '#fff' }}>{config.businessName}</strong>
              <p>{config.serviceArea}</p>
              <p><a href={`tel:${config.phone}`}>{config.phone}</a> · <a href={`mailto:${config.email}`}>{config.email}</a></p>
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Services</strong>
              {(config.services || []).slice(0, 8).map((s, i) => (
                <p key={i}><Link href={`/services/${slugify(s)}`}>{titleCase(s)}</Link></p>
              ))}
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Areas We Serve</strong>
              {(config.towns || []).slice(0, 10).map((t, i) => (
                <p key={i}><Link href={`/areas/${slugify(t)}`}>{titleCase(t)}</Link></p>
              ))}
            </div>
            <div>
              <p><Link href="/services">Services</Link> · <Link href="/about">About</Link> · <Link href="/contact">Contact</Link></p>
              <p style={{ marginTop: 8 }}><Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Service</Link></p>
              <p style={{ marginTop: 8 }}>© {new Date().getFullYear()} {config.businessName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

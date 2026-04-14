import { useState, useEffect } from 'react';
import {
  Check, X, Star, ShieldCheck, Smartphone,
  Clock, Download, BookOpen, Zap, ChevronDown, Globe,
  LayoutList, Target, Heart, Calendar, Sparkles, Grid3X3, Award, CheckCircle, FileText,
  FastForward,
  OctagonX,
  Printer,
  Gift
} from 'lucide-react';
import './App.css';

const IMG = {
  heroMain: './img1.png',
  inside1: './14.jpg',
  inside2: './20.jpg',
  inside3: './26.jpg',
  inside4: './130.jpg',
  bonos: './bonos.png',
 payments: './paymethods.webp',
};

const CHECKOUT_URL = 'https://pay.hotmart.com/R105317315D';
const BASE_PRICE_USD = 8.99;
const BASE_PRICE_USD_CURRENCY = `$${BASE_PRICE_USD.toFixed(2)} USD`;

const EXCHANGE_RATES = {
  ARS: { rate: 1050, symbol: '$', locale: 'es-AR' },
  BRL: { rate: 4.97, symbol: 'R$', locale: 'pt-BR' },
  MXN: { rate: 17.15, symbol: '$', locale: 'es-MX' },
  COP: { rate: 3850, symbol: '$', locale: 'es-CO' },
  CLP: { rate: 940, symbol: '$', locale: 'es-CL' },
  PEN: { rate: 3.75, symbol: 'S/', locale: 'es-PE' },
  UYU: { rate: 39.5, symbol: '$', locale: 'es-UY' },
  GTQ: { rate: 8, symbol: 'Q', locale: 'es-GT' },
  CRC: { rate: 515, symbol: '₡', locale: 'es-CR' },
  USD: { rate: 1, symbol: '$', locale: 'en-US' },
  VES: { rate: 36, symbol: 'Bs', locale: 'es-VE' },
  DOP: { rate: 58, symbol: 'RD$', locale: 'es-DO' },
  PAB: { rate: 1, symbol: 'B/.', locale: 'es-PA' },
  HNL: { rate: 24.7, symbol: 'L', locale: 'es-HN' },
  NIO: { rate: 36.7, symbol: 'C$', locale: 'es-NI' },
  SVC: { rate: 8.75, symbol: '$', locale: 'es-SV' },
 PYG: { rate: 7650, symbol: '₲', locale: 'es-PY' },
  ECS: { rate: 1, symbol: '$', locale: 'es-EC' },
  BOB: { rate: 6.91, symbol: 'Bs', locale: 'es-BO' },
};

const COUNTRY_CURRENCY = {
  AR: 'ARS',
  BR: 'BRL',
  MX: 'MXN',
  CO: 'COP',
  CL: 'CLP',
  PE: 'PEN',
  UY: 'UYU',
  GT: 'GTQ',
  CR: 'CRC',
  US: 'USD',
  BO: 'BOB',
  EC: 'ECS',
  PY: 'PYG',
  VE: 'VES',
  HN: 'HNL',
  NI: 'NIO',
  SV: 'SVC',
  PA: 'PAB',
  DO: 'DOP',
  PR: 'USD',
 };

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-btn" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown className="faq-chevron" size={18} />
      </button>
      <div className="faq-answer">{a}</div>
    </div>
  );
};

const getUserCurrency = async () => {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const country = data.country_code;
    return COUNTRY_CURRENCY[country] || 'USD';
  } catch {
    return 'USD';
  }
};

const formatPrice = (currency, amount) => {
  const rateInfo = EXCHANGE_RATES[currency];
  if (!rateInfo) return `${BASE_PRICE_USD.toFixed(2)} USD`;
  
  const converted = amount * rateInfo.rate;
  const formatted = new Intl.NumberFormat(rateInfo.locale, {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);
  
  return `${rateInfo.symbol}${formatted}`;
};

export default function App() {
  const [userCurrency, setUserCurrency] = useState('USD');
  const [priceLoaded, setPriceLoaded] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    getUserCurrency().then((currency) => {
      setUserCurrency(currency);
      setPriceLoaded(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setAtBottom(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const localPrice = formatPrice(userCurrency, BASE_PRICE_USD);

  return (
    <div>

      {/* PROMO BAR */}
      <div className="promo-bar">
        Precio especial activo · <strong>{BASE_PRICE_USD_CURRENCY}</strong> · Pago único · Acceso inmediato
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">Diario de Prioridades</div>
            <h1>
              Deja de terminar el día sintiéndote <em>ocupada/o pero sin avanzar.</em>
            </h1>
            <p className="hero-desc">
              Una guía diaria de 5–10 minutos para bajar el ruido mental, ordenar tus prioridades y volver a sentir que avanzás de verdad.
            </p>

            <div className="hero-proof">
              <div className="proof-dots">
                <div className="proof-dot pd1">👩</div>
                <div className="proof-dot pd2">🧑</div>
                <div className="proof-dot pd3">👩</div>
                <div className="proof-dot pd4">🧑</div>
                <div className="proof-dot pd5">👩</div>
              </div>
              <div className="proof-text">
                <strong>+800 personas</strong> ya ordenaron su vida con esto
              </div>
            </div>

            <ul className="hero-checks">
              <li><Check size={18} /> Plan claro para hoy, sin sobrepensar</li>
              <li><Check size={18} /> Rutina simple de 5–10 min diarios</li>
              <li><Check size={18} /> 162 páginas · PDF digital o imprimible</li>
            </ul>

            <div className="hero-cta-wrap">
              <a href={CHECKOUT_URL} className="btn-main">
                Quiero el Diario — {BASE_PRICE_USD_CURRENCY} <Download size={18} />
              </a>
              <p className="btn-price-note">
                Pago único · <strong>Precio de lanzamiento</strong> · 7 días de garantía
              </p>
              <div className="payment-row">
                <span className="payment-lbl">Pagás con</span>
                <span className="pay-badge">Tarjeta</span>
                <span className="pay-badge">Débito</span>
                <span className="pay-badge">PayPal</span>
                <span className="pay-badge">Tu moneda local</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-img-main">
              <img src={IMG.heroMain} alt="Diario de Prioridades" />
            </div>
            <div className="hero-price-card">
              <p className="hpc-label">Precio especial hoy</p>
              <p className="hpc-old">$45.99 USD</p>
              <p className="hpc-new">
                <sup>$</sup>{BASE_PRICE_USD}<small>USD</small>
              </p>
              <p className="hpc-note">Pago único · Tuyo para siempre</p>
              {priceLoaded ? <p className="hpc-local">Estimado moneda local: {localPrice}</p> : null}
              <a href={CHECKOUT_URL} className="hpc-btn">
                Acceder ahora <Download size={16} />
              </a>
              <div className="hpc-safe">
                <ShieldCheck size={14} />
                Checkout seguro de Hotmart
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="trust-item"><FastForward size={16} /> Acceso inmediato</div>
        <div className="trust-item"><Globe size={16} /> Disponible en toda Latam</div>
        <div className="trust-item"><ShieldCheck size={16} /> 7 días de garantía</div>
        <div className="trust-item"><Download size={16} /> Digital o imprimible</div>
        <div className="trust-item"><BookOpen size={16} /> 162 páginas</div>
        <div className="trust-item"><Gift size={16} /> 5 bonos incluidos</div>
      </div>

      {/* PAIN */}
      <section className="section pain">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Zap size={14} /> Situación</p>
            <h2 className="section-title">¿Te suena familiar?<br /><em>Haces mil cosas.</em> <br />Pero al final del día sigues en el mismo lugar.</h2>
            <p className="section-sub">
              No es falta de ganas. Es que nadie te enseñó a priorizar de verdad.
            </p>
          </div>
          <div className="pain-grid">
            {[
              'tienes mil cosas en la cabeza y no sabés por dónde empezar',
              'Terminás el día agotada pero con sensación de no haber avanzado',
              'Hacés listas pero igual sentís que corrés sin dirección',
              'Sabés lo que querés lograr, pero la semana pasa y no pasa nada',
            ].map((text, i) => (
              <div key={i} className="pain-card">
                <OctagonX size={20}  style={{ color: '#c40031' }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section solution">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Sparkles size={14} /> La solución</p>
            <h2 className="section-title">No necesitás más fuerza de voluntad.<br />Necesitás un <em>sistema simple.</em></h2>
            <p className="section-sub">
              El Diario de Prioridades no es una agenda más. Es una guía diaria con estructura para que tu cerebro sepa exactamente qué hacer, cuándo y por qué.
            </p>
          </div>
          <div className="not-agenda" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {[
              { text: 'No es una agenda vacía', yes: false },
              { text: 'No es un cuaderno de frases motivadoras', yes: false },
              { text: 'No necesitás fuerza de voluntad', yes: true },
              { text: 'Es una guía diaria con estructura real', yes: true },
              { text: 'Para salir del piloto automático', yes: true },
              { text: 'En solo 5–10 minutos por día', yes: true },
            ].map((item, i) => (
              <div key={i} className={`na-item ${item.yes ? 'yes' : 'no'}`}>
                {item.yes ? <Check size={16} /> : <X size={16} />}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE */}
      <section className="section inside">
        <div className="section-inner">
          <div className="section-header">
            <div className="ornament" />
            <p className="eyebrow"><BookOpen size={14} /> Vista previa</p>
            <h2 className="section-title">Mira cómo se ve <em>por dentro</em></h2>
            <p className="section-sub">162 páginas diseñadas para usar, no para guardar.</p>
          </div>
          <div className="inside-imgs">
            <div className="inside-img-wrap">
              <img src={IMG.inside1} alt="Interior del diario" />
              <p className="img-caption">Ejercicios diario de prioridades</p>
            </div>
            <div className="inside-img-wrap">
              <img src={IMG.inside2} alt="Interior del diario" />
              <p className="img-caption">Lista de afirmaciones</p>
            </div>
            <div className="inside-img-wrap">
              <img src={IMG.inside3} alt="Plan de acción" />
              <p className="img-caption">Progreso del mes</p>
            </div>
            <div className="inside-img-wrap inside-img-wide">
              <img src={IMG.inside4} alt="Lista de afirmaciones" />
              <p className="img-caption">Instrucciones paso a paso</p>
            </div>
          </div>
          <div className="inside-pills">
            <span className="ipill"><Download size={14} /> Descargás al instante</span>
            <span className="ipill"><Printer size={14} /> Imprimible en casa</span>
            <span className="ipill"><Smartphone size={14} /> Usable en dispositivo móvil</span>
            <span className="ipill"><ShieldCheck size={14} /> 7 días de garantía</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Target size={14} /> Todo lo que incluye</p>
            <h2 className="section-title">Un sistema completo en un solo PDF</h2>
          </div>
          <div className="features-grid">
            {[
              {
                icon: <Target size={20} />,
                title: 'Ejercicios diarios de enfoque',
                desc: 'Empezá cada día sabiendo exactamente qué es urgente, qué es importante y qué podés soltar.',
              },
              {
                icon: <LayoutList size={20} />,
                title: 'Prioridades claras',
                desc: 'Sin sobrecargarte. El sistema te ayuda a elegir las 3 cosas que realmente mueven la aguja ese día.',
              },
              {
                icon: <Heart size={20} />,
                title: 'Afirmaciones para la autoestima',
                desc: 'No solo productividad — también trabajo interno para sostenerte emocionalmente en el proceso.',
              },
              {
                icon: <Calendar size={20} />,
                title: 'Revisión semanal y mensual',
                desc: 'Para no perderte en el día a día. Cada semana y mes revisás, aprendés y ajustás el rumbo.',
              },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="fc-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="bonus-box">
            <p className="bonus-title">
              <Sparkles size={20} />
              Y además recibes estos bonos gratis
            </p>
            <div className="bonus-grid">
              {['Rutina de la Mañana', 'Mapa de Sueños', 'Plan de Acción de 7 días', 'Hoja de Prioridades', 'Lista de Hábitos'].map((b, i) => (
                <div key={i} className="bonus-item">{b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BONUS IMAGES */}
      <section className="section bonus-imgs">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Gift size={14} /> Bonos incluidos</p>
            <h2 className="section-title">Potencián el proceso y te ayudan a <em>obtener resultados reales</em></h2>
            <p className="section-sub">Para sostener los cambios incluso en las semanas difíciles.</p>
          </div>
        </div>
        <div className="bic">
          <img src={IMG.bonos} alt="Lista de hábitos" />
          <div className="bic-text">
            <h3>Beneficios:</h3>
            <br />
            <div className="bonus-grid">
              {[
                'Identifica, organiza y da seguimiento a los hábitos que te acercan a tus objetivos.',
                'Aclara tu visión, define lo que quieres construir y alinea tus decisiones con esa vida.',
                'Una herramienta diaria para enfocarte en lo importante y dejar de dispersarte.',
                'Convierte la claridad en pasos concretos con un plan simple y ejecutable.',
                'Diseña mañanas con intención para empezar el día con enfoque, calma y dirección.'].map((b, i) => (
                  <div key={i} className="bonus-item">{b}</div>
                ))}
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Clock size={14} /> Rutina</p>
            <h2 className="section-title">Cómo se usa</h2>
            <p className="section-sub">Tres momentos, cero presión.</p>
          </div>
          <div className="how-steps">
            {[
              { num: '1', title: 'Mañana · 5 min', desc: 'Elegís 1–3 prioridades reales. Sabés exactamente a qué le vas a dedicar energía hoy.' },
              { num: '2', title: 'Medio día · 2 min', desc: 'Una pausa consciente. Ajustás sin culpa si el día se torció.' },
              { num: '3', title: 'Noche · 5 min', desc: 'Cerrás el día con intención. Soltás la mente y te vas a dormir sin la lista dando vueltas.' },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANCHOR */}
      <section className="section anchor">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Grid3X3 size={14} /> Comparativa</p>
            <h2 className="section-title">Organizarte bien no<br /><em>tiene por qué costar caro</em></h2>
          </div>
          <div className="anchor-grid">
            {[
              { price: '$80 USD', label: 'Una sesión de coach' },
              { price: '$15 USD', label: 'Cuaderno en librería' },
              { price: '$10/mes', label: 'App de productividad' },
              { price: BASE_PRICE_USD_CURRENCY, label: 'Este sistema · para siempre', featured: true },
            ].map((item, i) => (
              <div key={i} className={`anc-card${item.featured ? ' featured' : ''}`}>
                <span className="anc-price">{item.price}</span>
                <span className="anc-label">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="anchor-note">
            Pago único. Sin suscripciones. Sin letra chica. Una vez que lo tienes, es tuyo para siempre.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="pricing-inner">
          <p className="pricing-eyebrow">Precio de lanzamiento</p>
          <h2>Tu sistema de productividad <em>por una sola vez.</em></h2>
          <p className="pricing-sub">Sin suscripciones. Sin letra chica.</p>

          <div className="price-card">
            <p className="pc-old">$45.99 USD</p>
            <div className="pc-price">
              <span className="pc-cur">$</span>
              <span className="pc-num">{BASE_PRICE_USD}</span>
              <span className="pc-unit">USD</span>
            </div>
            <p className="pc-note">Pago único · Tuyo para siempre</p>
            {priceLoaded ? <p className="hpc-local">Estimado moneda local: {localPrice}</p> : null}

            <div className="pc-country">
              <Check size={16} />
              El precio se muestra en tu moneda local al abrir Hotmart. Podés pagar con el método disponible en tu país.
            </div>

            <ul className="pc-checklist">
              {[
                'Diario de Prioridades completo (162 páginas)',
                'Ejercicios diarios + revisión semanal y mensual',
                '5 bonos incluidos sin costo extra',
                'PDF digital o para imprimir',
                'Acceso inmediato vía Hotmart',
              ].map((item, i) => (
                <li key={i}><Check size={16} /> {item}</li>
              ))}
            </ul>

            <a href={CHECKOUT_URL} className="pc-btn">
              Quiero el Diario ahora — {BASE_PRICE_USD_CURRENCY} <Download size={18} />
            </a>

            <div className="guarantee">
              <ShieldCheck size={22} />
              <p><strong>7 días de garantía.</strong> Si abrís el diario y no es lo que esperabas, pedís el reembolso sin preguntas.</p>
            </div>

            <div className="pc-payments">
              <img src={IMG.payments} alt="Métodos de pago" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><Star size={14} /> Testimonios</p>
            <h2 className="section-title">Lo que dicen quienes <em>ya lo tienen</em></h2>
            <p className="section-sub">Personas reales descargaron el Diario de Prioridad, lo usaron en su rutina diaria y hoy dicen sentirse más tranquilas, enfocadas y conectadas consigo mismas y ya están teniendo <strong>RESULTADOS.</strong></p>
          </div>
          <div className="test-img-grid">
            <div className="test-img-col">
              <img src="./test1.png" alt="Testimonio 1" />
            </div>
            <div className="test-img-col">
              <img src="./test2.png" alt="Testimonio 2" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="section-inner">
          <div className="section-header">
            <p className="eyebrow"><FileText size={14} /> FAQ</p>
            <h2 className="section-title">Preguntas frecuentes</h2>
          </div>
          <div className="faq-list">
            <FAQItem q="¿Es digital o físico?" a="Es 100% digital (PDF). Lo descargás al momento y lo usás desde cualquier dispositivo o lo puedes imprimir en casa." />
            <FAQItem q="¿Cómo recibo el acceso?" a="Una vez confirmado el pago por Hotmart, recibís el acceso automáticamente en tu correo. También revisá spam o promociones por si entra ahí." />
            <FAQItem q="¿Puedo pagar desde mi país?" a="Sí. Hotmart muestra el precio en tu moneda local y los medios de pago disponibles según tu país. Disponible en toda Latam." />
            <FAQItem q="¿Sirve si tengo poco tiempo?" a="Sí. La rutina está pensada para 5–10 minutos por día. Si un día no llegás, retomás sin culpa — el sistema está diseñado para eso." />
            <FAQItem q="¿Qué pasa si no me gusta?" a="tienes 7 días de garantía. Si no es lo que esperabas, simplemente pedís el reembolso y te lo devolvemos." />
            <FAQItem q="¿Acepta tarjeta de débito?" a="Sí. En Hotmart, cuando aparece la opción de tarjeta de crédito, en muchos casos también puedes pagar con tarjeta de débito u otros métodos como PayPal, dependiendo de tu país." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>¿Cuándo es el momento<br />de empezar a <em>avanzar de verdad?</em></h2>
        <p>Hoy podés tener el sistema completo por {BASE_PRICE_USD_CURRENCY}. Un solo pago, para siempre.</p>
        <a href={CHECKOUT_URL} className="btn-final">
          Quiero el Diario ahora <Download size={18} />
        </a>
      </section>

      {/* FOOTER */}
      <footer>
        <p className="footer-brand">Productos Digitales MAPQ</p>
        <p>© · Producto digital · Entrega inmediata por Hotmart · Pago seguro</p>
      </footer>

      {!atBottom && (
        <div className="float-bar">
          <a href={CHECKOUT_URL} className="btn-float">
            Quiero mi Diario — {BASE_PRICE_USD_CURRENCY} <Download size={18} />
          </a>
        </div>
      )}

    </div>
  );
}

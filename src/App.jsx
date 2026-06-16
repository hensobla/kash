import { useState } from 'react';
import {
  ChevronDown,
  Stethoscope,
  Utensils,
  Carrot,
  Footprints,
  Megaphone,
  Sparkles,
  Home,
  Moon,
  PawPrint,
  ExternalLink,
  MapPin,
  Lightbulb,
} from 'lucide-react';

function StairsIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21h4v-4h4v-4h4v-4h4v-4h2" />
    </svg>
  );
}

function Bullet({ children, color = 'persimmon' }) {
  const dotColor = color === 'sage' ? 'bg-sage' : color === 'rust' ? 'bg-rust' : 'bg-persimmon';
  return (
    <li className="flex gap-3">
      <span
        className={`mt-[10px] h-1.5 w-1.5 rounded-full flex-shrink-0 ${dotColor}`}
      />
      <span>{children}</span>
    </li>
  );
}

function Callout({ children, tone = 'warm' }) {
  const tones = {
    warm: 'bg-persimmon/[0.07] border-persimmon',
    sage: 'bg-sage/[0.10] border-sage',
    rust: 'bg-rust/[0.07] border-rust',
  };
  return (
    <div className={`border-l-[3px] pl-4 pr-3.5 py-3 rounded-r-xl ${tones[tone]}`}>
      {children}
    </div>
  );
}

function CrinkleImage({ src, alt, indents = 16, depth = 2.8 }) {
  // Softened crinkle: each "tooth" is a smooth quadratic-Bezier scallop
  // rather than a sharp zigzag triangle.
  const size = 100;
  const step = size / (indents * 2);
  const parts = ['M0 0'];

  // Top edge, left to right
  for (let i = 0; i < indents; i++) {
    const cx = +((2 * i + 1) * step).toFixed(3);
    const ex = +((2 * i + 2) * step).toFixed(3);
    parts.push(`Q${cx} ${depth} ${ex} 0`);
  }
  // Right edge, top to bottom
  for (let i = 0; i < indents; i++) {
    const cy = +((2 * i + 1) * step).toFixed(3);
    const ey = +((2 * i + 2) * step).toFixed(3);
    parts.push(`Q${size - depth} ${cy} ${size} ${ey}`);
  }
  // Bottom edge, right to left
  for (let i = 0; i < indents; i++) {
    const cx = +(size - (2 * i + 1) * step).toFixed(3);
    const ex = +(size - (2 * i + 2) * step).toFixed(3);
    parts.push(`Q${cx} ${size - depth} ${ex} ${size}`);
  }
  // Left edge, bottom to top
  for (let i = 0; i < indents; i++) {
    const cy = +(size - (2 * i + 1) * step).toFixed(3);
    const ey = +(size - (2 * i + 2) * step).toFixed(3);
    parts.push(`Q${depth} ${cy} 0 ${ey}`);
  }
  parts.push('Z');

  const path = parts.join(' ');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}' preserveAspectRatio='none'><path fill='white' d='${path}'/></svg>`;
  const maskUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      className="w-full aspect-square object-cover block"
      style={{
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        filter: 'drop-shadow(0 6px 14px rgba(42, 24, 18, 0.14))',
      }}
    />
  );
}

function Section({
  id,
  title,
  icon: Icon,
  preview,
  accent,
  open: controlledOpen,
  onOpenChange,
  children,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v) => {
    if (isControlled) onOpenChange?.(v);
    else setInternalOpen(v);
  };

  const isRust = accent === 'rust';
  const isCocoa = accent === 'cocoa';

  return (
    <div
      id={id}
      className={`scroll-mt-24 rounded-3xl overflow-hidden ${
        isRust
          ? 'border-2 border-rust/30 bg-gradient-to-b from-rust/[0.09] via-rust/[0.04] to-rust/[0.02]'
          : isCocoa
          ? 'border-2 border-cocoa/30 bg-gradient-to-b from-cocoa/[0.09] via-cocoa/[0.04] to-cocoa/[0.02]'
          : 'bg-white border border-tan/50'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-4 px-5 py-4 transition text-left ${
          isRust ? 'active:bg-rust/10' : isCocoa ? 'active:bg-cocoa/10' : 'active:bg-butter/30'
        }`}
        aria-expanded={open}
      >
        <span
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm ${
            isRust ? 'bg-rust text-white' : isCocoa ? 'bg-cocoa text-white' : 'bg-butter shadow-none'
          }`}
        >
          <Icon
            className={`h-5 w-5 ${isRust || isCocoa ? 'text-white' : 'text-deep'}`}
            strokeWidth={2.25}
          />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-display text-[20px] font-medium leading-tight text-deep">
            {title}
          </span>
          {preview && (
            <span
              className={`block mt-0.5 ${
                isRust
                  ? 'text-[11px] text-rust font-bold uppercase tracking-[0.2em]'
                  : isCocoa
                  ? 'text-[11px] text-cocoa font-bold uppercase tracking-[0.2em]'
                  : 'text-[13px] text-mid'
              }`}
            >
              {preview}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          } ${isRust ? 'text-rust' : isCocoa ? 'text-cocoa' : 'text-mid'}`}
          strokeWidth={2.5}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-2 text-[15px] leading-relaxed text-deep">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-deep font-body">
      {/* Sticky header. Branding on the left, persistent emergency CTA on the right. */}
      <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-tan/40">
        <div className="flex items-center justify-between gap-3 px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-persimmon" strokeWidth={2.25} />
            <span className="font-display text-[18px] font-semibold text-deep tracking-tight">
              Kash
            </span>
          </div>
          <a
            href="#emergency"
            onClick={() => setEmergencyOpen(true)}
            className="flex items-center gap-1.5 bg-rust text-white pl-3 pr-3.5 py-2 rounded-full text-[13px] font-semibold shadow-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            <Stethoscope className="h-4 w-4" strokeWidth={2.5} />
            Emergency Vet
          </a>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pb-16">
        {/* Photo of Kash. Small, tilted, left-aligned with content. */}
        <section className="pt-8 pb-3">
          <div className="w-[37.5%] rotate-[-4deg]">
            <CrinkleImage src={`${import.meta.env.BASE_URL}kash.jpg`} alt="Kash" />
          </div>
        </section>

        {/* Hero */}
        <section className="pt-3 pb-7">
          <p className="text-[11px] uppercase tracking-[0.25em] text-persimmon font-bold">
            A guide for the sitter
          </p>
          <h1 className="font-display text-[46px] leading-[1.02] text-deep mt-3 tracking-tight font-medium">
            Watching{' '}
            <span className="relative inline-block">
              Kash
              <svg
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-2 w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q 14 1.5, 26 6 T 50 6 T 74 6 T 98 6"
                  stroke="#E26240"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 text-[16px] leading-relaxed text-deep">
            Everything you need. The short version: he's sweet, shy, loves a cuddle, and is deeply food-motivated. He'll do almost anything for a treat and almost nothing without one.{' '}
            <strong className="font-semibold">Keep treats on you at all times.</strong>
          </p>
        </section>

        {/* Accordion sections. Vet first, with rust accent + controlled open state. */}
        <div className="space-y-3">
          <Section
            id="emergency"
            title="Vet & Emergencies"
            icon={Stethoscope}
            preview="Read first"
            accent="rust"
            open={emergencyOpen}
            onOpenChange={setEmergencyOpen}
          >
            <div className="space-y-4 text-[15px] leading-relaxed">
              <div>
                <p className="text-mid text-[11px] uppercase tracking-[0.2em] font-bold">
                  Kash's vet
                </p>
                <p className="font-display text-[19px] text-deep mt-1.5 font-medium">
                  Dr. Monica Milstein
                </p>
                <a
                  href="https://www.holladayveterinaryhospital.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-2.5 bg-white border border-tan/80 px-4 py-2.5 rounded-xl text-deep font-semibold text-[14px] active:scale-95 transition-transform shadow-sm"
                >
                  <MapPin className="h-4 w-4 text-rust" strokeWidth={2.25} />
                  Holladay Veterinary Hospital
                  <ExternalLink className="h-3.5 w-3.5 text-mid ml-0.5" strokeWidth={2.25} />
                </a>
              </div>

              <div className="bg-white border-l-[3px] border-rust pl-4 pr-3.5 py-3 rounded-r-xl">
                <p className="text-deep">
                  If Kash needs care, you can take him to{' '}
                  <strong className="font-bold">any licensed vet.</strong> Our insurance (Pets Best) isn't a network plan, so there's no "approved" list to worry about and no wrong choice of clinic.
                </p>
              </div>

              <div>
                <p className="font-semibold text-deep mb-2.5">Here's how it works:</p>
                <ul className="space-y-2.5">
                  <Bullet color="rust">
                    Take him to whatever vet makes sense. His regular clinic if it's open, the nearest emergency vet if it's urgent.
                  </Bullet>
                  <Bullet color="rust">
                    You'll pay the bill up front (the clinic bills the owner directly, not the insurer).
                  </Bullet>
                  <Bullet color="rust">
                    <strong className="font-bold">Get an itemized receipt and the visit records.</strong>{' '}
                    Reimbursement depends on having them. Snap clear photos of everything.
                  </Bullet>
                </ul>
              </div>

              <p>
                If it's serious and his regular clinic is closed,{' '}
                <strong className="font-semibold">don't waste time.</strong> Go to the nearest 24-hour emergency animal hospital.
              </p>
            </div>
          </Section>

          <Section id="feeding" title="Feeding" icon={Utensils} preview="1 scoop, twice a day">
            <ul className="space-y-2.5">
              <Bullet>
                <strong className="font-semibold">1 scoop of kibble, twice a day.</strong>
              </Bullet>
              <Bullet>
                It goes in his feeding toy so it takes him longer to eat.
              </Bullet>
              <Bullet>
                This is intentionally a smaller amount of kibble, so treats throughout the day are expected and encouraged (see Treats below).
              </Bullet>
            </ul>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <figure>
                <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-tan/60">
                  <img
                    src={`${import.meta.env.BASE_URL}food-ball.jpg`}
                    alt="Feeding ball"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-mid text-center">
                  Feeding ball
                </figcaption>
              </figure>
              <figure>
                <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-tan/60">
                  <img
                    src={`${import.meta.env.BASE_URL}food-bottle.jpg`}
                    alt="Feeding bottle"
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-mid text-center">
                  Feeding bottle
                </figcaption>
              </figure>
            </div>
          </Section>

          <Section id="potty" title="Potty" icon={Sparkles} preview="Treat after every go">
            <div className="bg-persimmon text-white rounded-2xl px-4 py-3.5 mb-3.5 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.22em] font-bold opacity-90">
                Non-negotiable
              </p>
              <p className="mt-1 font-semibold leading-snug">
                ALWAYS give him a treat right after he goes outside.
              </p>
            </div>
            <ul className="space-y-2.5">
              <Bullet>
                He's potty trained, so this is mostly straightforward.
              </Bullet>
              <Bullet>
                He may still need the occasional reminder with someone new around.{' '}
                <strong className="font-semibold">Take him out every few hours</strong> to start, and he'll settle into the routine quickly.
              </Bullet>
              <Bullet>
                Heads up: he's a{' '}
                <strong className="font-semibold">poop-eater.</strong>{' '}
                Watch for #2s and pick them up immediately.
              </Bullet>
            </ul>
          </Section>

          <Section id="treats" title="Treats" icon={Carrot} preview="Always carry them">
            <p className="mb-3">
              This is a theme you'll notice everywhere:{' '}
              <strong className="font-semibold">Kash works for food.</strong> Keep treats on hand.
            </p>
            <ul className="space-y-2.5">
              <Bullet>
                I'll leave you a supply of his dog treats.{' '}
                <strong className="font-semibold">Stick to the ones I provide</strong> plus the veggies below.
              </Bullet>
              <Bullet>
                He loves veggies, and they're low-cal so they're a great go-to:{' '}
                <strong className="font-semibold">carrots and blueberries</strong> are favorites.
              </Bullet>
              <Bullet>
                Easy on the volume of veggies, too. Too many and he gets gassy.
              </Bullet>
              <Bullet>
                Please don't give him fatty human food or scraps.{' '}
                <em className="italic text-mid">
                  (Kash has a history of a sensitive stomach, so sticking to his treats and veggies keeps things safe.)
                </em>
              </Bullet>
            </ul>
          </Section>

          <Section
            id="walking"
            title="Walking, Play & Exercise"
            icon={Footprints}
            preview="1–2 miles, watch the heat"
          >
            <ul className="space-y-2.5">
              <Bullet color="sage">
                Usually <strong className="font-semibold">1–2 miles a day</strong>, but you don't have to hit that if you're playing with him and keeping him engaged.
              </Bullet>
              <Bullet color="sage">
                He <strong className="font-semibold">loves wide open spaces</strong> and running around.
              </Bullet>
              <Bullet color="sage">
                His recall is generally good, but{' '}
                <strong className="font-semibold">do a few practice recalls before letting him fully off leash</strong>, so he remembers you're the one with the treats. (Reward every recall.)
              </Bullet>
              <Bullet color="sage">
                <strong className="font-semibold">Watch the heat.</strong> Hot pavement is hard on his paws, so earlier in the day is better. If you're heading out when it's warm,{' '}
                <strong className="font-semibold">stick to grass and shade.</strong>
              </Bullet>
            </ul>
            <div className="mt-4">
              <Callout tone="sage">
                <p>
                  <strong className="font-bold">Quick paw test:</strong> press the back of your hand to the pavement for about 7 seconds. If it's too hot for your hand, it's too hot for his paws.
                </p>
              </Callout>
            </div>
          </Section>

          <Section
            id="commands"
            title="Key Commands"
            icon={Megaphone}
            preview="Heel, touch, sit, wait"
          >
            <p className="mb-4">
              He generally won't do anything unless he knows you've got treats.{' '}
              <strong className="font-semibold">Reward everything.</strong>
            </p>
            <ul className="space-y-2.5">
              <li className="bg-butter/55 rounded-2xl p-4">
                <p className="font-display text-[20px] text-deep font-medium leading-none">
                  "Heel"
                </p>
                <p className="text-[14px] text-deep mt-2 leading-relaxed">
                  The important one. He runs to you, swings around to your right side, and sits. This is the off-leash recall.{' '}
                  <strong className="font-semibold">Treat every time.</strong>
                </p>
              </li>
              <li className="bg-butter/55 rounded-2xl p-4">
                <p className="font-display text-[20px] text-deep font-medium leading-none">
                  "Touch"
                </p>
                <p className="text-[14px] text-deep mt-2 leading-relaxed">
                  Backup recall. He runs over to boop your hand. Flatten your palm and lower it to his height so he knows what to boop.
                </p>
              </li>
              <li className="bg-butter/55 rounded-2xl p-4">
                <p className="font-display text-[20px] text-deep font-medium leading-none">
                  "Sit" & "Wait"
                </p>
                <p className="text-[14px] text-deep mt-2 leading-relaxed">
                  Both self-explanatory.
                </p>
              </li>
            </ul>
          </Section>

          <Section id="alone" title="Leaving Him Alone" icon={Home} preview="Anxious boi">
            <ul className="space-y-2.5">
              <Bullet>
                He gets <strong className="font-semibold">loud</strong> when truly alone. Barking and howling almost right away.
              </Bullet>
              <Bullet>
                The good news: he doesn't need a{' '}
                <em className="italic">specific</em> person, he just needs{' '}
                <em className="italic">someone</em> around. With company, he's quiet.
              </Bullet>
              <Bullet>
                We're actively working on this, so it's a known work in progress, not a you problem.
              </Bullet>
            </ul>

            <div className="mt-5 bg-butter/55 rounded-2xl p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-mid">
                If you're at Kash's home
              </p>
              <p className="mt-1.5 text-deep">
                He's on familiar turf, which makes this easier.
              </p>
              <p className="mt-2 text-deep">
                You can leave him comfortably for{' '}
                <strong className="font-semibold">30 minutes max.</strong>
              </p>
            </div>
          </Section>

          <Section id="sleep" title="Sleep" icon={Moon} preview="Your bed, or his">
            <ul className="space-y-2.5">
              <Bullet>
                He'll probably want to{' '}
                <strong className="font-semibold">sleep in your bed.</strong>
              </Bullet>
              <Bullet>
                Before bed:{' '}
                <strong className="font-semibold">take him out to potty, then wipe off his willy</strong>{' '}
                so you don't get pee drops in the bed.
              </Bullet>
              <Bullet>
                He has{' '}
                <strong className="font-semibold">his own bed</strong> if you'd rather he didn't sleep with you. Keep it right next to yours and he'll be happy.
              </Bullet>
            </ul>
          </Section>

          <Section id="stairs" title="Stairs" icon={StairsIcon} preview="Carry if you can">
            <ul className="space-y-2.5">
              <Bullet>
                I try not to let him do stairs.{' '}
                <strong className="font-semibold">If you can, carry him up and down.</strong>
              </Bullet>
              <Bullet>
                You won't catch it 100% of the time, and that's okay. Just minimize it where you can.
              </Bullet>
            </ul>
          </Section>

          <Section
            id="pro-tips"
            title="Pro tips"
            icon={Lightbulb}
            preview="Winning him over"
            accent="cocoa"
          >
            <div className="space-y-5">
              <div>
                <p className="font-display text-[18px] font-medium leading-tight text-deep">
                  Let him come to you
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed">
                  Kash is shy with new people and gets overwhelmed by direct attention. Sit quietly, keep a treat handy, and let him decide when to come over. He's drawn to the calmest person in the room.
                </p>
              </div>
              <div>
                <p className="font-display text-[18px] font-medium leading-tight text-deep">
                  Reach underhand
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed">
                  Hands coming down toward his head spook him. He'll duck and dodge. Open your palm and come from below his chin instead, and you'll get a much warmer welcome.
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer className="mt-12 mb-4 text-center">
          <div className="inline-flex items-center gap-2 text-mid text-[13px]">
            <PawPrint className="h-4 w-4 text-persimmon" strokeWidth={2.25} />
            <span>Thank you for taking care of him.</span>
            <PawPrint
              className="h-4 w-4 text-persimmon"
              strokeWidth={2.25}
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        </footer>
      </main>
    </div>
  );
}

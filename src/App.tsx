import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Type, 
  LayoutTemplate,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Smartphone,
  MousePointerClick,
  FileText,
  Monitor,
  LayoutDashboard,
  ArrowLeft,
  ArrowRight,
  User,
  Activity,
  type LucideIcon
} from 'lucide-react';
type Scenario = {
  id: string;
  title: string;
  category: string;
  concept: string;
  description: string;
  difficulty: string;
  duration: string;
  icon: LucideIcon;
  colorFrom: string;
  colorTo: string;
};

type ScenarioOption = {
  id: string;
  text: string;
  explanation: string;
  isCorrect: boolean;
};

type ScenarioDetail = {
  clientBrief: string;
  problems: string[];
  options: ScenarioOption[];
  renderVisual: (option: string | null) => React.ReactNode;
  getBefore: () => React.ReactNode;
  getAfter: () => React.ReactNode;
};



// --- SCENARIO METADATA ---
const SCENARIOS: Scenario[] = [
  { 
    id: 's1', 
    title: 'The Unreadable Poster',
    category: 'Colour Theory',
    concept: 'Colour Contrast',
    description: 'Fix a promotional poster with poor colour contrast.',
    difficulty: 'BEGINNER',
    duration: '5–10 MIN',
    icon: Palette,
    colorFrom: 'from-pink-400',
    colorTo: 'to-rose-500'
  },
  { 
    id: 's2', 
    title: 'The Typography Disaster',
    category: 'Typography',
    concept: 'Hierarchy & Readability',
    description: 'Reorganize a cluttered restaurant menu using appropriate typefaces.',
    difficulty: 'INTERMEDIATE',
    duration: '10–15 MIN',
    icon: Type,
    colorFrom: 'from-blue-400',
    colorTo: 'to-indigo-500'
  },
  { 
    id: 's3', 
    title: 'The Confusing Poster',
    category: 'Visual Hierarchy',
    concept: 'Emphasis',
    description: 'Rearrange a student competition poster to establish a stronger visual hierarchy.',
    difficulty: 'ADVANCED',
    duration: '15–20 MIN',
    icon: LayoutTemplate,
    colorFrom: 'from-emerald-400',
    colorTo: 'to-teal-500'
  },
  {
    id: 's4',
    title: 'The Misleading Ad',
    category: 'Visual Communication',
    concept: 'Messaging & Tone',
    description: 'Correct a health food advertisement that looks like a cleaning product.',
    difficulty: 'INTERMEDIATE',
    duration: '10–15 MIN',
    icon: ImageIcon,
    colorFrom: 'from-amber-400',
    colorTo: 'to-orange-500'
  },
  {
    id: 's5',
    title: 'The Cluttered App',
    category: 'Layout & Composition',
    concept: 'White Space & CTA',
    description: 'Redesign a delivery app screen to clarify the primary call to action.',
    difficulty: 'ADVANCED',
    duration: '15–20 MIN',
    icon: Smartphone,
    colorFrom: 'from-violet-400',
    colorTo: 'to-purple-500'
  },
  {
    id: 's6',
    title: 'The Colourless Brand',
    category: 'Colour Theory',
    concept: 'Interactive States',
    description: 'Improve a finance app where interactive elements are impossible to find.',
    difficulty: 'BEGINNER',
    duration: '5–10 MIN',
    icon: MousePointerClick,
    colorFrom: 'from-cyan-400',
    colorTo: 'to-blue-500'
  },
  {
    id: 's7',
    title: 'The Inaccessible Website',
    category: 'Typography',
    concept: 'Accessibility',
    description: 'Fix a government form with text that is too thin and light for elderly users.',
    difficulty: 'INTERMEDIATE',
    duration: '10–15 MIN',
    icon: Monitor,
    colorFrom: 'from-rose-400',
    colorTo: 'to-red-500'
  },
  {
    id: 's8',
    title: 'The Unbalanced Layout',
    category: 'Design Principles',
    concept: 'Balance & Alignment',
    description: 'Correct a lopsided digital magazine spread to improve reading flow.',
    difficulty: 'ADVANCED',
    duration: '15–20 MIN',
    icon: LayoutDashboard,
    colorFrom: 'from-fuchsia-400',
    colorTo: 'to-pink-500'
  }
];

// --- REUSABLE COMPONENTS ---
const GlassCard = ({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg rounded-3xl overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

const GlassButton = ({ children, primary, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) => (
  <button 
    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm
      ${primary 
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 border border-indigo-500/50' 
        : 'bg-white/70 text-indigo-900 hover:bg-white border border-white hover:shadow-md hover:-translate-y-0.5 backdrop-blur-md'
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Canvas = ({ children, bg = "bg-slate-100", className = "" }: { children: React.ReactNode; bg?: string; className?: string }) => (
  <div className={`w-full h-full rounded-2xl flex items-center justify-center overflow-hidden border border-slate-200 relative ${bg} ${className}`}>
    {children}
  </div>
);

// Simulated GIF component that loops between Before and After states
const BeforeAfterGif = ({ beforeNode, afterNode }: { beforeNode: React.ReactNode; afterNode: React.ReactNode }) => {
  const [showAfter, setShowAfter] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setShowAfter(prev => !prev), 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden relative bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center">
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-10 flex items-center gap-2">
        <Activity className="w-3 h-3 text-emerald-400" />
        {showAfter ? 'After (Corrected)' : 'Before (Flawed)'}
      </div>
      <div className={`w-full h-full transition-opacity duration-700 absolute inset-0 flex items-center justify-center ${showAfter ? 'opacity-0' : 'opacity-100'}`}>
        {beforeNode}
      </div>
      <div className={`w-full h-full transition-opacity duration-700 absolute inset-0 flex items-center justify-center ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
        {afterNode}
      </div>
    </div>
  );
};

// --- SCENARIO LOGIC & VISUALS ---
const SCENARIO_DETAILS: Record<string, ScenarioDetail> = {
  's1': {
    clientBrief: "Our event poster looks attractive, but people are struggling to read the event information.",
    problems: ['Low text contrast', 'Poor readability', 'Weak information hierarchy'],
    options: [
      { id: 'A', text: 'Increase the font size', explanation: 'Larger text helps slightly, but yellow on white is still a fundamental contrast failure.', isCorrect: false },
      { id: 'B', text: 'Improve text-background contrast', explanation: 'Correct! High contrast (dark text on a light background) is essential for readability and accessibility.', isCorrect: true },
      { id: 'C', text: 'Add decorative background elements', explanation: 'Extra decorations increase visual clutter, reducing readability even further.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg="bg-white">
        <div className="p-8 text-center flex flex-col justify-center items-center w-3/4 h-3/4 bg-slate-50 shadow-md border relative">
          <h1 className={`font-black mb-4 ${opt === 'A' ? 'text-5xl text-yellow-300' : opt === 'B' ? 'text-4xl text-indigo-900' : 'text-4xl text-yellow-300'}`}>SUMMER FEST</h1>
          <p className={`font-semibold ${opt === 'A' ? 'text-2xl text-yellow-200' : opt === 'B' ? 'text-xl text-slate-700' : 'text-xl text-yellow-200'}`}>Aug 24th | Main Campus</p>
          {opt === 'C' && <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_20%,_#fde047_120%)] opacity-40"></div>}
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="p-6 text-center bg-white border shadow-sm"><h1 className="text-3xl font-black text-yellow-300 mb-2">SUMMER FEST</h1><p className="text-yellow-200 font-bold">Aug 24th</p></div>,
    getAfter: () => <div className="p-6 text-center bg-white border shadow-sm"><h1 className="text-3xl font-black text-indigo-900 mb-2">SUMMER FEST</h1><p className="text-slate-700 font-bold">Aug 24th</p></div>
  },
  's2': {
    clientBrief: "Customers are complaining they can't quickly find prices on our new restaurant menu.",
    problems: ['Too many conflicting typefaces', 'No typographic hierarchy', 'Poor alignment'],
    options: [
      { id: 'A', text: 'Make all text bold', explanation: 'Making everything bold removes hierarchy entirely. Nothing stands out if everything is emphasized.', isCorrect: false },
      { id: 'B', text: 'Establish a clear Sans/Serif hierarchy', explanation: 'Correct! Pairing a distinct header font with a highly readable body font organizes the information.', isCorrect: true },
      { id: 'C', text: 'Use all-uppercase letters', explanation: 'All-caps reduces readability for long descriptions because word shapes are lost.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg="bg-stone-100">
        <div className="p-8 w-3/4 h-5/6 bg-white shadow-md flex flex-col gap-4 text-left">
          <h2 className={`border-b pb-2 ${opt === 'B' ? 'font-serif text-3xl text-stone-800' : 'font-mono text-2xl text-stone-600'}`}>Starters</h2>
          <div className="flex justify-between items-center">
            <span className={`${opt === 'A' ? 'font-black text-lg' : opt === 'B' ? 'font-sans font-bold text-stone-800' : opt === 'C' ? 'uppercase font-serif text-sm' : 'font-cursive italic text-lg'}`}>Bruschetta</span>
            <span className={`${opt === 'B' ? 'font-mono text-stone-500' : 'font-black'}`}>$8</span>
          </div>
          <p className={`${opt === 'A' ? 'font-bold' : opt === 'B' ? 'font-sans text-sm text-stone-500' : opt === 'C' ? 'uppercase text-xs tracking-wider' : 'font-serif text-sm text-stone-400'}`}>Grilled bread with tomatoes.</p>
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="bg-white p-4 w-48 shadow flex flex-col gap-2"><h2 className="font-mono text-lg text-stone-600">Starters</h2><div className="flex justify-between"><span className="font-cursive italic">Bruschetta</span><span className="font-black">$8</span></div><p className="font-serif text-xs text-stone-400">Grilled bread with tomatoes.</p></div>,
    getAfter: () => <div className="bg-white p-4 w-48 shadow flex flex-col gap-2"><h2 className="font-serif text-xl text-stone-800 border-b pb-1">Starters</h2><div className="flex justify-between"><span className="font-sans font-bold text-stone-800">Bruschetta</span><span className="font-mono text-stone-500">$8</span></div><p className="font-sans text-xs text-stone-500">Grilled bread with tomatoes.</p></div>
  },
  's3': {
    clientBrief: "No one is noticing the registration deadline on this competition poster because it blends in.",
    problems: ['Elements have equal visual weight', 'No focal point', 'Disorganized flow'],
    options: [
      { id: 'A', text: 'Change the title colour to red', explanation: 'Changing colour highlights the title, but the rest of the information remains unstructured.', isCorrect: false },
      { id: 'B', text: 'Adjust scale and group related info', explanation: 'Correct! Scaling the title and grouping the date/venue creates a clear reading path.', isCorrect: true },
      { id: 'C', text: 'Center-align all text', explanation: 'Center alignment looks neat but does not solve the lack of emphasis or hierarchy.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg="bg-blue-50">
        <div className={`p-8 w-3/4 h-3/4 bg-white shadow-md flex ${opt === 'B' ? 'flex-col justify-between' : opt === 'C' ? 'flex-col items-center text-center justify-center gap-4' : 'flex-col gap-6'}`}>
          <h1 className={`${opt === 'B' ? 'text-4xl font-black text-blue-900 leading-tight' : opt === 'A' ? 'text-xl text-red-500 font-medium' : 'text-xl text-slate-700 font-medium'}`}>INNOVATION<br/>CHALLENGE</h1>
          <div className={`${opt === 'B' ? 'bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500' : ''}`}>
            <p className={`${opt === 'B' ? 'font-bold text-blue-800 text-lg' : 'text-slate-600 text-lg'}`}>Deadline: Oct 12</p>
            <p className={`${opt === 'B' ? 'text-sm text-slate-500 mt-1' : 'text-slate-600 text-lg'}`}>Room 402, Building A</p>
          </div>
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="bg-white p-4 w-40 shadow flex flex-col gap-3 text-slate-700 font-medium"><p>INNOVATION</p><p>Deadline: Oct 12</p><p>Room 402</p></div>,
    getAfter: () => <div className="bg-white p-4 w-40 shadow flex flex-col justify-between h-48 text-left"><h1 className="text-xl font-black text-blue-900 leading-none">INNOVATION<br/>CHALLENGE</h1><div className="bg-blue-50 p-2 border-l-2 border-blue-500"><p className="font-bold text-blue-800 text-xs">Deadline: Oct 12</p></div></div>
  },
  's4': {
    clientBrief: "Our organic food ad is failing. People say it looks like an ad for a hospital or a cleaning product.",
    problems: ['Sterile, unnatural colour palette', 'Inconsistent visual messaging', 'Cold emotional tone'],
    options: [
      { id: 'A', text: 'Change the text to "Eat This"', explanation: 'Changing copy does not fix the underlying visual messaging failure.', isCorrect: false },
      { id: 'B', text: 'Use a warm, earthy colour palette', explanation: 'Correct! Colours convey meaning. Earthy tones (greens, browns, warm yellows) signal organic food.', isCorrect: true },
      { id: 'C', text: 'Add exclamation marks', explanation: 'Punctuation does not fix the fact that neon blue and stark white feels sterile.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg={opt === 'B' ? 'bg-orange-50' : 'bg-cyan-50'}>
        <div className={`w-3/4 h-3/4 shadow-md flex flex-col items-center justify-center p-6 ${opt === 'B' ? 'bg-emerald-800 text-amber-50' : 'bg-white border-2 border-cyan-300 text-cyan-700'}`}>
          <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center ${opt === 'B' ? 'bg-emerald-600' : 'bg-cyan-100'}`}>
             <span className="text-3xl">🌿</span>
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${opt === 'B' ? 'text-amber-100' : ''}`}>Organic Life {opt === 'C' && '!!!'}</h2>
          <p className={`text-center text-sm ${opt === 'B' ? 'text-emerald-200' : 'text-cyan-500'}`}>
            {opt === 'A' ? 'Eat This.' : '100% Natural Ingredients'}
          </p>
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="bg-white border-2 border-cyan-300 p-4 w-40 text-center shadow"><div className="w-10 h-10 bg-cyan-100 rounded-full mx-auto mb-2 flex items-center justify-center">🌿</div><h2 className="text-cyan-700 font-bold">Organic</h2></div>,
    getAfter: () => <div className="bg-emerald-800 p-4 w-40 text-center shadow"><div className="w-10 h-10 bg-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center text-xl">🌿</div><h2 className="text-amber-100 font-bold">Organic</h2></div>
  },
  's5': {
    clientBrief: "Users are abandoning their cart in our app because they don't know where to click to pay.",
    problems: ['No clear Call to Action (CTA)', 'Cluttered interface', 'Lack of white space'],
    options: [
      { id: 'A', text: 'Hide the navigation bar', explanation: 'Hiding navigation frustrates users. You need to highlight the primary action, not remove basic features.', isCorrect: false },
      { id: 'B', text: 'Add white space and highlight the CTA', explanation: 'Correct! Giving elements room to breathe and using a distinct color for the primary button guides the eye.', isCorrect: true },
      { id: 'C', text: 'Make all buttons smaller', explanation: 'Smaller buttons make the app harder to use, especially on mobile devices.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg="bg-slate-200">
        <div className={`w-52 sm:w-64 h-72 sm:h-80 bg-white rounded-[2rem] shadow-xl border-[6px] border-slate-800 overflow-hidden flex flex-col ${opt === 'B' ? 'p-6 justify-between' : 'p-4 gap-2'}`}>
           <div>
             <h3 className="font-bold text-lg mb-4">Cart summary</h3>
             <div className={`bg-slate-100 rounded flex items-center p-2 mb-2 ${opt === 'C' ? 'h-8 text-xs' : 'h-12'}`}>Item 1 <span className="ml-auto">$12</span></div>
             <div className={`bg-slate-100 rounded flex items-center p-2 mb-2 ${opt === 'C' ? 'h-8 text-xs' : 'h-12'}`}>Item 2 <span className="ml-auto">$8</span></div>
           </div>
           
           <div className={`flex ${opt === 'B' ? 'flex-col gap-3 mt-auto' : opt === 'A' ? 'flex-col gap-2 mt-4' : 'flex-wrap gap-2 mt-4'}`}>
              {!opt || opt === 'C' || opt === 'A' ? (
                <>
                  <div className={`bg-slate-200 text-slate-700 rounded w-full ${opt === 'C' ? 'p-1 text-xs' : 'p-2'}`}>Apply Coupon</div>
                  <div className={`bg-slate-200 text-slate-700 rounded w-full ${opt === 'C' ? 'p-1 text-xs' : 'p-2'}`}>Save for Later</div>
                  <div className={`bg-slate-800 text-white rounded w-full ${opt === 'C' ? 'p-1 text-xs' : 'p-2'}`}>Checkout</div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <div className="bg-slate-100 text-slate-500 font-medium rounded-xl p-3 flex-1 text-sm">Coupon</div>
                    <div className="bg-slate-100 text-slate-500 font-medium rounded-xl p-3 flex-1 text-sm">Save</div>
                  </div>
                  <div className="bg-violet-600 text-white font-bold rounded-2xl p-4 shadow-lg shadow-violet-200">Checkout Now</div>
                </>
              )}
           </div>
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="w-32 h-48 bg-white border-4 border-slate-800 rounded-xl p-2 flex flex-col gap-1"><div className="h-6 bg-slate-100 mb-2"></div><div className="h-6 bg-slate-200 mt-auto"></div><div className="h-6 bg-slate-200"></div><div className="h-6 bg-slate-700 text-[8px] text-white flex items-center justify-center">Checkout</div></div>,
    getAfter: () => <div className="w-32 h-48 bg-white border-4 border-slate-800 rounded-xl p-3 flex flex-col"><div className="h-6 bg-slate-100 mb-2"></div><div className="mt-auto bg-violet-600 rounded-lg p-2 text-white text-[10px] font-bold">Checkout</div></div>
  },
  's6': {
    clientBrief: "We wanted a clean, minimalist finance dashboard, but users don't know which elements they can click on.",
    problems: ['Lack of interactive cues', 'Monotone colour palette', 'Poor usability'],
    options: [
      { id: 'A', text: 'Use a primary brand colour for interactive elements', explanation: 'Correct! A single contrasting colour applied to buttons and links creates a clear visual language for interactivity.', isCorrect: true },
      { id: 'B', text: 'Make the background black', explanation: 'Inverting the background to dark mode does not solve the lack of contrast between static text and buttons.', isCorrect: false },
      { id: 'C', text: 'Underline all text on the screen', explanation: 'Underlining everything removes the distinction between plain text and links.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg={opt === 'B' ? 'bg-slate-900' : 'bg-slate-50'}>
        <div className={`p-8 w-3/4 h-3/4 shadow-md rounded-xl flex flex-col gap-4 ${opt === 'B' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
           <h3 className={`font-semibold ${opt === 'C' ? 'underline' : ''}`}>Transfer Funds</h3>
           <div className={`p-3 rounded border ${opt === 'B' ? 'border-slate-600 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>Amount: $500.00</div>
           <div className={`mt-auto p-3 rounded font-medium transition-colors ${
             opt === 'A' ? 'bg-blue-600 text-white shadow-md' :
             opt === 'B' ? 'bg-slate-600 text-slate-300' :
             'bg-slate-200 text-slate-500'
           }`}>
             <span className={opt === 'C' ? 'underline' : ''}>Confirm Transfer</span>
           </div>
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="p-4 w-40 bg-white border shadow flex flex-col gap-2 rounded-lg text-slate-500"><div className="h-4 w-20 bg-slate-200 rounded"></div><div className="h-8 w-full bg-slate-100 border rounded mt-4"></div><div className="h-8 w-full bg-slate-200 rounded mt-2 flex items-center justify-center text-xs">Confirm</div></div>,
    getAfter: () => <div className="p-4 w-40 bg-white border shadow flex flex-col gap-2 rounded-lg text-slate-500"><div className="h-4 w-20 bg-slate-200 rounded"></div><div className="h-8 w-full bg-slate-100 border rounded mt-4"></div><div className="h-8 w-full bg-blue-600 rounded mt-2 flex items-center justify-center text-xs text-white font-bold shadow-sm">Confirm</div></div>
  },
  's7': {
    clientBrief: "Elderly users are complaining they cannot read our online government tax form.",
    problems: ['Ultra-thin font weight', 'Light grey text on white', 'Fails WCAG accessibility standards'],
    options: [
      { id: 'A', text: 'Add a dark mode toggle', explanation: 'Dark mode is a good feature, but the default light mode must still pass basic accessibility standards.', isCorrect: false },
      { id: 'B', text: 'Increase font weight and contrast ratio', explanation: 'Correct! Thicker, darker text ensures legibility for users with visual impairments.', isCorrect: true },
      { id: 'C', text: 'Use a much larger thin font', explanation: 'Making a thin font larger doesn\'t solve the core issue of low contrast.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg="bg-white">
        <div className="p-8 w-3/4 max-w-sm flex flex-col gap-6 text-left">
           <div>
             <label className={`block mb-2 ${
               opt === 'B' ? 'text-slate-800 font-semibold' :
               opt === 'C' ? 'text-slate-300 font-light text-xl' :
               'text-slate-300 font-light text-sm'
             }`}>Full Legal Name</label>
             <div className={`w-full h-10 border-b-2 ${opt === 'A' ? 'bg-slate-900 border-slate-700' : 'border-slate-200'}`}></div>
           </div>
           <div>
             <label className={`block mb-2 ${
               opt === 'B' ? 'text-slate-800 font-semibold' :
               opt === 'C' ? 'text-slate-300 font-light text-xl' :
               'text-slate-300 font-light text-sm'
             }`}>Date of Birth</label>
             <div className={`w-full h-10 border-b-2 ${opt === 'A' ? 'bg-slate-900 border-slate-700' : 'border-slate-200'}`}></div>
           </div>
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="p-4 w-40 bg-white shadow border"><p className="text-slate-300 font-light text-[10px] mb-1">Full Name</p><div className="border-b border-slate-100 h-4"></div></div>,
    getAfter: () => <div className="p-4 w-40 bg-white shadow border"><p className="text-slate-800 font-semibold text-[10px] mb-1">Full Name</p><div className="border-b-2 border-slate-300 h-4"></div></div>
  },
  's8': {
    clientBrief: "This digital magazine spread feels 'lopsided' and heavy, making readers lose interest.",
    problems: ['Poor visual balance', 'Trapped white space', 'Cramped typography'],
    options: [
      { id: 'A', text: 'Add more text to the empty side', explanation: 'Adding unnecessary filler content just to fill space is bad design practice.', isCorrect: false },
      { id: 'B', text: 'Balance image and text across the columns', explanation: 'Correct! Distributing the visual weight creates harmony and a natural reading flow.', isCorrect: true },
      { id: 'C', text: 'Center the cramped block', explanation: 'Centering a dense block of content leaves awkward margins on both sides and remains hard to read.', isCorrect: false }
    ],
    renderVisual: (opt) => (
      <Canvas bg="bg-stone-200">
        <div className={`w-5/6 h-3/4 bg-white shadow-lg flex ${opt === 'B' ? 'flex-row' : opt === 'C' ? 'flex-col items-center p-8' : 'flex-row'}`}>
           {opt === 'B' ? (
             <>
               <div className="w-1/2 h-full bg-stone-300"></div>
               <div className="w-1/2 p-6 flex flex-col justify-center">
                 <div className="h-4 w-3/4 bg-stone-800 mb-4"></div>
                 <div className="h-2 w-full bg-stone-200 mb-2"></div>
                 <div className="h-2 w-full bg-stone-200 mb-2"></div>
                 <div className="h-2 w-5/6 bg-stone-200"></div>
               </div>
             </>
           ) : (
             <>
               <div className={`flex flex-col gap-2 ${opt === 'C' ? 'w-2/3 items-center text-center' : 'w-1/2 p-4'}`}>
                 <div className={`h-24 bg-stone-300 ${opt === 'C' ? 'w-full' : 'w-full'}`}></div>
                 <div className={`h-4 bg-stone-800 mt-2 ${opt === 'C' ? 'w-3/4' : 'w-full'}`}></div>
                 <div className={`h-2 bg-stone-200 ${opt === 'C' ? 'w-full' : 'w-full'}`}></div>
                 <div className={`h-2 bg-stone-200 ${opt === 'C' ? 'w-5/6' : 'w-full'}`}></div>
                 <div className={`h-2 bg-stone-200 ${opt === 'C' ? 'w-4/5' : 'w-3/4'}`}></div>
               </div>
               {opt === 'A' && (
                 <div className="w-1/2 p-4 flex flex-col gap-2 opacity-50">
                    <div className="h-2 bg-stone-200 w-full"></div><div className="h-2 bg-stone-200 w-full"></div>
                 </div>
               )}
               {(!opt || opt === 'C') && <div className="w-1/2"></div>}
             </>
           )}
        </div>
      </Canvas>
    ),
    getBefore: () => <div className="w-48 h-32 bg-white flex shadow"><div className="w-1/2 p-2 flex flex-col gap-1 border-r"><div className="h-10 bg-stone-300"></div><div className="h-2 bg-stone-800"></div><div className="h-1 bg-stone-200"></div><div className="h-1 bg-stone-200"></div></div><div className="w-1/2"></div></div>,
    getAfter: () => <div className="w-48 h-32 bg-white flex shadow"><div className="w-1/2 bg-stone-300"></div><div className="w-1/2 p-3 flex flex-col justify-center gap-1"><div className="h-2 bg-stone-800 w-3/4"></div><div className="h-1 bg-stone-200"></div><div className="h-1 bg-stone-200"></div><div className="h-1 bg-stone-200 w-5/6"></div></div></div>
  }
};

// --- SCENARIO ENGINE (INTERACTIVE VIEW) ---
const ScenarioEngine = ({ scenario, onExit, onComplete }: { scenario: Scenario; onExit: () => void; onComplete: (scenario: Scenario, selectedOption: string, isCorrect: boolean) => void }) => {
  const [stage, setStage] = useState<'challenge' | 'feedback'>('challenge');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const details = SCENARIO_DETAILS[scenario.id];
  if (!details) return <div className="p-8 text-center text-red-500 font-bold">Scenario configuration missing.</div>;

  return (
    <div className="w-full mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Breadcrumb Header */}
      <div className="mb-6">
        <button onClick={onExit} className="flex items-center text-slate-600 hover:text-indigo-700 font-semibold transition-colors mb-4 bg-white/60 px-4 py-2 rounded-full backdrop-blur-md border border-white shadow-sm w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Scenarios
        </button>
        <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-2">
          {scenario.category} / {scenario.concept}
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight flex flex-wrap items-center gap-2 sm:gap-3 break-words">
          {scenario.title} 
          <span className="text-xs bg-slate-800 text-white px-3 py-1 rounded-md font-bold tracking-widest translate-y-0.5">
            {scenario.difficulty}
          </span>
        </h1>
      </div>

      {stage === 'challenge' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:items-stretch">
          {/* LEFT: Live Interactive Canvas */}
          <GlassCard className="p-3 sm:p-4 h-[340px] sm:h-[440px] lg:h-[650px] relative flex flex-col border-2 border-white/80">
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-white/90 backdrop-blur-md text-indigo-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
                <MousePointerClick className="w-3 h-3 text-indigo-500" />
                Live Design Preview
              </span>
            </div>
            {details.renderVisual(selectedOption)}
          </GlassCard>

          {/* RIGHT: Client Brief & Challenge */}
          <div className="flex flex-col min-w-0 space-y-4">
            
            <GlassCard className="p-4 sm:p-6 border-l-4 border-l-indigo-500 flex items-start gap-3 sm:gap-4">
               <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-indigo-600" />
               </div>
               <div>
                  <h3 className="text-xs font-bold text-indigo-500 mb-1 uppercase tracking-wider">Client Brief</h3>
                  <p className="text-slate-700 font-medium italic leading-relaxed">"{details.clientBrief}"</p>
               </div>
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> Diagnosed Problems
              </h3>
              <ul className="space-y-2 text-slate-700 font-medium text-sm">
                {details.problems.map((prob, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rose-400 rounded-full flex-shrink-0"></div> 
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-4 sm:p-6 flex-1 flex flex-col border-2 border-indigo-50">
              <h3 className="text-xl font-black text-slate-800 mb-2">Your Challenge</h3>
              <p className="text-slate-500 text-sm font-medium mb-4">Select a solution to preview its effect.</p>
              
              <div className="space-y-3 flex-1">
                {details.options.map(opt => (
                  <button 
                    key={opt.id}
                    type="button"
                    aria-pressed={selectedOption === opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      selectedOption === opt.id 
                        ? 'border-indigo-500 bg-indigo-50/80 shadow-md transform scale-[1.02]' 
                        : 'border-white bg-white/50 hover:border-indigo-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedOption === opt.id ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300'
                    }`}>
                      {selectedOption === opt.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="font-semibold text-slate-700">{opt.text}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 mt-2 border-t border-slate-200/50 flex justify-end">
                <GlassButton primary className="w-full sm:w-auto min-h-12" disabled={!selectedOption} onClick={() => setStage('feedback')}>
                  Submit Decision <ArrowRight className="w-5 h-5 ml-1" />
                </GlassButton>
              </div>
            </GlassCard>
          </div>
        </div>
      ) : (
        /* FEEDBACK STAGE */
        <div className="animate-in slide-in-from-bottom-8 duration-500">
          <GlassCard className="p-4 sm:p-8 lg:p-12 border-2 border-white/80">
            <div className="flex flex-col md:flex-row gap-5 sm:gap-8 lg:gap-10 items-center">
              
              {/* Animated Before/After Simulation */}
              <div className="w-full md:w-1/2">
                <BeforeAfterGif beforeNode={details.getBefore()} afterNode={details.getAfter()} />
              </div>

              {/* Text Feedback */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  {details.options.find(o => o.id === selectedOption)?.isCorrect ? (
                    <div className="bg-emerald-100 p-3 rounded-2xl"><CheckCircle className="w-10 h-10 text-emerald-600" /></div>
                  ) : (
                    <div className="bg-rose-100 p-3 rounded-2xl"><XCircle className="w-10 h-10 text-rose-600" /></div>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                    {details.options.find(o => o.id === selectedOption)?.isCorrect ? 'Correct Decision!' : 'Let\'s Review.'}
                  </h2>
                </div>
                
                <div className="p-4 sm:p-6 bg-white/70 rounded-2xl border border-white shadow-sm">
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">
                    {details.options.find(o => o.id === selectedOption)?.explanation}
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <GlassButton onClick={() => { setSelectedOption(null); setStage('challenge'); }} className="w-full min-h-12">
                    Try Again
                  </GlassButton>
                  <GlassButton onClick={() => {
                    if (selectedOption) onComplete(scenario, selectedOption, Boolean(details.options.find(o => o.id === selectedOption)?.isCorrect));
                  }} primary className="w-full min-h-12">
                    Save Result <CheckCircle className="w-5 h-5 ml-2" />
                  </GlassButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP (SCENARIO LAB) ---
type AppView = 'home' | 'explore' | 'cases' | 'scenario';
type CaseResult = {
  scenarioId: string;
  selectedOption: string;
  correct: boolean;
  completedAt: string;
  attempts: number;
};
type CaseHistory = Record<string, CaseResult>;
const STORAGE_KEY = 'scenario-lab:completed-cases:v1';

const loadCases = (): CaseHistory => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved as CaseHistory : {};
  } catch {
    return {};
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [caseHistory, setCaseHistory] = useState<CaseHistory>(loadCases);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(caseHistory));
    } catch {
      // The app still works when browser storage is disabled.
    }
  }, [caseHistory]);

  const navigate = (view: AppView) => {
    setCurrentView(view);
    setActiveScenario(null);
  };
  const startScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setCurrentView('scenario');
  };
  const completeScenario = (scenario: Scenario, selectedOption: string, correct: boolean) => {
    setCaseHistory(previous => ({
      ...previous,
      [scenario.id]: {
        scenarioId: scenario.id,
        selectedOption,
        correct,
        completedAt: new Date().toISOString(),
        attempts: (previous[scenario.id]?.attempts || 0) + 1
      }
    }));
    navigate('cases');
  };

  const categories = ['All', ...new Set(SCENARIOS.map(s => s.category))];
  const filteredScenarios = activeFilter === 'All' ? SCENARIOS : SCENARIOS.filter(s => s.category === activeFilter);
  const completedScenarios = SCENARIOS.filter(s => caseHistory[s.id]);
  const solvedCount = completedScenarios.filter(s => caseHistory[s.id].correct).length;
  const displayScenarios = currentView === 'cases'
    ? completedScenarios
    : currentView === 'home' ? SCENARIOS.slice(0, 4) : filteredScenarios;

  const navItems: { label: string; view: AppView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Explore Scenarios', view: 'explore' },
    { label: 'My Cases', view: 'cases' }
  ];

  return (
    <div className="min-h-[100svh] bg-slate-50 text-slate-800 font-sans relative flex flex-col overflow-x-clip selection:bg-indigo-200">
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-purple-200/40 blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-200/40 blur-3xl mix-blend-multiply" />
      </div>

      <header className="relative z-30 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div className="max-w-7xl mx-auto bg-white/75 backdrop-blur-xl border border-white shadow-sm rounded-2xl lg:rounded-full p-3 sm:px-6 sm:py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-3">
          <div className="flex items-center justify-between gap-3">
            <button type="button" aria-label="Scenario Lab home" onClick={() => navigate('home')}
              className="flex min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
              <span className="w-9 h-9 shrink-0 bg-indigo-600 rounded-lg flex items-center justify-center -rotate-6 shadow-md">
                <Palette className="w-5 h-5 text-white" />
              </span>
              <span className="font-black text-lg sm:text-xl text-slate-800 tracking-tight truncate">SCENARIO LAB</span>
            </button>
            <button type="button" aria-label="Open My Cases" title="My Cases" onClick={() => navigate('cases')}
              className="lg:hidden relative flex shrink-0 w-11 h-11 bg-indigo-50 rounded-full items-center justify-center border border-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
              <CheckCircle className="w-5 h-5 text-indigo-700" />
              {completedScenarios.length > 0 && <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-indigo-600 text-white rounded-full min-w-5 px-1 py-0.5">{completedScenarios.length}</span>}
            </button>
          </div>

          <nav aria-label="Main navigation" className="flex gap-1.5 sm:gap-2 overflow-x-auto w-full lg:w-auto py-0.5">
            {navItems.map(item => (
              <button type="button" key={item.view} onClick={() => navigate(item.view)}
                aria-current={currentView === item.view ? 'page' : undefined}
                className={[
                  'shrink-0 min-h-11 px-3 sm:px-5 py-2 rounded-full text-sm sm:text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600',
                  currentView === item.view ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-900'
                ].join(' ')}>
                {item.label}
              </button>
            ))}
          </nav>

          <button type="button" aria-label="Open My Cases" title="My Cases" onClick={() => navigate('cases')}
            className="hidden lg:flex relative w-10 h-10 bg-indigo-50 rounded-full items-center justify-center border border-indigo-100 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
            <CheckCircle className="w-5 h-5 text-indigo-700" />
            {completedScenarios.length > 0 && <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-indigo-600 text-white rounded-full min-w-5 px-1 py-0.5">{completedScenarios.length}</span>}
          </button>
        </div>
      </header>

      <main id="main-content" className="relative z-10 w-full max-w-7xl mx-auto flex-1 px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16">
        {currentView === 'home' && (
          <section aria-labelledby="welcome-title" className="mb-8 sm:mb-10 rounded-3xl bg-white/70 border border-white/80 shadow-sm p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-bold tracking-widest text-indigo-700 uppercase mb-3">Interactive design learning</p>
            <h1 id="welcome-title" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 max-w-3xl">Learn design by fixing real problems.</h1>
            <p className="mt-3 text-sm sm:text-lg text-slate-600 max-w-2xl">Choose a client brief, compare design solutions and get instant feedback. Save progress as you complete each scenario.</p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
              <GlassButton primary className="w-full sm:w-auto min-h-12" onClick={() => navigate('explore')}>Explore all scenarios <ArrowRight className="w-4 h-4" /></GlassButton>
              <GlassButton className="w-full sm:w-auto min-h-12" onClick={() => navigate('cases')}>View My Cases</GlassButton>
            </div>
            <div aria-label="Learning progress" className="mt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4"><div className="text-xl sm:text-3xl font-black">{SCENARIOS.length}</div><div className="text-xs sm:text-sm text-slate-600">Scenarios</div></div>
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4"><div className="text-xl sm:text-3xl font-black">{completedScenarios.length}</div><div className="text-xs sm:text-sm text-slate-600">Completed</div></div>
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4"><div className="text-xl sm:text-3xl font-black">{solvedCount}</div><div className="text-xs sm:text-sm text-slate-600">Solved</div></div>
            </div>
          </section>
        )}

        {currentView !== 'scenario' && (
          <section aria-labelledby="scenario-heading">
            <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 id="scenario-heading" className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                  {currentView === 'home' ? 'Start a design challenge' : currentView === 'cases' ? 'My Cases' : 'Explore Design Scenarios'}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  {currentView === 'cases'
                    ? completedScenarios.length + ' of ' + SCENARIOS.length + ' completed · ' + solvedCount + ' correct'
                    : 'Real-world multimedia problems. Your decisions. Instant feedback.'}
                </p>
                {currentView === 'cases' && <p className="mt-1 text-xs sm:text-sm text-slate-500">Your progress is saved locally in this browser.</p>}
              </div>
              {currentView === 'explore' && (
                <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button type="button" key={category} onClick={() => setActiveFilter(category)}
                      aria-pressed={activeFilter === category}
                      className={[
                        'min-h-10 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                        activeFilter === category ? 'bg-slate-800 text-white border-slate-800' : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-indigo-50'
                      ].join(' ')}>
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {currentView === 'cases' && completedScenarios.length === 0 ? (
              <GlassCard className="p-6 sm:p-10 text-center">
                <CheckCircle className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-black">No completed cases yet</h3>
                <p className="text-slate-600 mt-2 mb-6">Finish a challenge and save the result to see it here.</p>
                <GlassButton primary className="mx-auto min-h-12" onClick={() => navigate('explore')}>Explore Scenarios <ArrowRight className="w-4 h-4" /></GlassButton>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 min-[540px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayScenarios.map(scenario => {
                  const IconComponent = scenario.icon;
                  const saved = caseHistory[scenario.id];
                  return (
                    <GlassCard key={scenario.id} className="h-full group hover:shadow-xl focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow">
                      <button type="button" aria-label={'Start ' + scenario.title} onClick={() => startScenario(scenario)}
                        className="w-full h-full text-left flex flex-col focus-visible:outline-none">
                        <div className={['h-36 sm:h-40 w-full bg-gradient-to-br relative overflow-hidden flex items-center justify-center p-6', scenario.colorFrom, scenario.colorTo].join(' ')}>
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
                          <IconComponent className="w-14 h-14 sm:w-16 sm:h-16 text-white/90 relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                          <span className="absolute top-3 right-3 bg-black/40 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">{scenario.difficulty}</span>
                        </div>
                        <div className="p-4 sm:p-6 flex flex-col flex-1 w-full">
                          <div className="text-[10px] font-bold text-indigo-700 tracking-widest uppercase mb-1">{scenario.category}</div>
                          <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-2 leading-tight">{scenario.title}</h3>
                          <p className="text-slate-600 text-sm font-medium mb-5 flex-1">{scenario.description}</p>
                          <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                            <span className="text-indigo-700 font-bold text-sm inline-flex items-center gap-1">
                              {saved ? 'Try again' : 'Solve Problem'} <ArrowRight className="w-4 h-4" />
                            </span>
                            {saved && <span className={['rounded-full px-2 py-1 text-[10px] font-bold', saved.correct ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'].join(' ')}>{saved.correct ? 'Solved' : 'Reviewed'}</span>}
                          </div>
                        </div>
                      </button>
                    </GlassCard>
                  );
                })}
              </div>
            )}

            {currentView === 'home' && (
              <div className="mt-7 text-center">
                <GlassButton className="mx-auto min-h-12" onClick={() => navigate('explore')}>See all 8 scenarios <ArrowRight className="w-4 h-4" /></GlassButton>
              </div>
            )}
          </section>
        )}

        {currentView === 'scenario' && activeScenario && (
          <ScenarioEngine key={activeScenario.id} scenario={activeScenario} onExit={() => navigate('explore')} onComplete={completeScenario} />
        )}
      </main>
    </div>
  );
}

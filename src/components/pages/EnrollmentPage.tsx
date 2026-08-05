import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Info,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { SubPageType } from '../GrabenSchoolWebsite';

interface EnrollmentPageProps {
  onNavigate: (page: SubPageType) => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onNavigate }) => {
  const [candidateName, setCandidateName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stream, setStream] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNum = '250788123456';
    const msg = `*GRABEN HIGHLIGHT ACADEMY - ENROLLMENT APPLICATION*\n\n` +
      `👤 *Candidate Name:* ${candidateName}\n` +
      `📱 *Phone:* ${phone}\n` +
      `✉️ *Email:* ${email || 'N/A'}\n` +
      `📚 *Selected Stream:* ${stream}\n` +
      `💬 *Inquiry Message:* ${message || 'N/A'}\n` +
      `📍 *Location:* Rugerero Sector, Rubavu District`;
    const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-900 pb-16">
      
      {/* 1. DARK BLUE HEADER BANNER (Matches Screenshot 14 Header) */}
      <section className="bg-[#0B1528] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 text-left">
        <div className="max-w-7xl mx-auto space-y-3">
          
          <div className="text-xs font-black text-amber-400 tracking-widest uppercase flex items-center gap-2">
            <span>SCHOOL PORTAL</span>
            <span>/</span>
            <span className="text-amber-200">NURSERY ENROLLMENT & CONTACT DESK</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Nursery Enrollment & Contact Desk
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-medium leading-relaxed">
            Inquire about Baby, Middle, or Top Class registration, fees, and campus tours at Graben Highlight Academy in Rubavu District.
          </p>

        </div>
      </section>

      {/* 2. PAGE SUBHEADER TITLE (Matches Screenshot 14) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto space-y-3">
        <div className="text-xs font-black text-amber-600 tracking-wider uppercase">
          ADMISSIONS & CAMPUS ENROLLMENT
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Online Enrollment & Inquiries
        </h2>
        <div className="w-16 h-1 bg-slate-300 mx-auto rounded-full"></div>
        <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
          Enroll today for the academic year. Complete the official form below to send your application package directly to our admissions registrar email.
        </p>
      </section>

      {/* 3. MAIN FORM & REGISTRAR CHANNELS GRID (Matches Screenshot 14, 15, 16) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* LEFT COLUMN: Online Enrollment Form (Matches Screenshot 14 & 15 Left Box) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200 space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  Submit Online Enrollment Form
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Fill in your details below to prepare your formal application letter.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-950 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div className="font-black text-lg">Application Submitted Successfully!</div>
                  <p className="text-xs font-medium text-emerald-900 max-w-md mx-auto">
                    Thank you, <span className="font-bold">{candidateName || 'Parent'}</span>! Your inquiry for <span className="font-bold">{stream || 'Nursery Stream'}</span> has been received by Graben Highlight Academy registrar team in Rubavu District. We will call you at <span className="font-bold">{phone || 'your phone number'}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCandidateName('');
                      setEmail('');
                      setPhone('');
                      setStream('');
                      setMessage('');
                    }}
                    className="mt-2 px-6 py-2.5 bg-emerald-600 text-white font-black rounded-xl text-xs shadow-md hover:bg-emerald-500 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-700">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                        CANDIDATE NAME
                      </label>
                      <input
                        required
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="e.g. Jean Damascene"
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden font-medium bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                        EMAIL ADDRESS
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="damascene@gmail.com"
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden font-medium bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                        PHONE NUMBER
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+250 788..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden font-medium bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                        CURRICULUM STREAM / COMBO
                      </label>
                      <select
                        required
                        value={stream}
                        onChange={(e) => setStream(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden font-medium bg-white"
                      >
                        <option value="">-- Choose Program --</option>
                        <option value="Baby Class (Ages 1.5 - 3 Years)">Baby Class (Ages 1.5 – 3 Years)</option>
                        <option value="Middle Class (Ages 3 - 4 Years)">Middle Class (Ages 3 – 4 Years)</option>
                        <option value="Top Class (Ages 4 - 6 Years)">Top Class (Ages 4 – 6 Years)</option>
                        <option value="Play & Outdoor Sports Stream">Play & Outdoor Sports Stream</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                      INQUIRY MESSAGE / GRADES & BACKGROUND
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter details about previous school grades, academic history, or physical talent projects..."
                      className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-hidden font-medium bg-slate-50/50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Send Application via WhatsApp 💬</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: Fee Structure, Channels, & Location Map (Matches Screenshot 14, 15, 16) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box 1: Orange Nursery Tuition Card */}
            <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-6 text-white shadow-xl space-y-3 border-2 border-amber-300">
              <div className="flex items-center gap-2 text-amber-200 font-black text-xs uppercase tracking-wider">
                <Info className="w-4 h-4" />
                <span>NURSERY TUITION & CARE FEES</span>
              </div>

              <h3 className="text-xl font-black text-white">
                Graben Highlight Academy Fee Structure
              </h3>

              <p className="text-amber-100 text-xs leading-relaxed font-medium">
                To find official tuition rates, meal care options, and enrollment registration for Baby, Middle, or Top Class at Graben Highlight Academy in Rugerero, Rubavu District, contact our administrative team directly or visit our campus office. Exact term rates cover learning materials, certified caregiving, and playground access.
              </p>

              <div className="pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-amber-100 border border-white/30">
                  <span>✓ Certified Early Childhood Care & Safety Standards</span>
                </div>
              </div>
            </div>

            {/* Box 2: Registrar Channels (Matches Screenshot 15) */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest">
                REGISTRAR CHANNELS
              </h4>

              <div className="space-y-3 text-xs font-medium text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">CAMPUS ADDRESS</div>
                    <div className="font-bold text-slate-900">Rugerero Sector, Rubavu District, Western Province, Rwanda</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">DIRECT TELEPHONE</div>
                    <a href="tel:+250788123456" className="font-bold text-slate-900 hover:text-orange-600">
                      +250 788 123 456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">DIRECT REGISTRAR EMAIL</div>
                    <a href="mailto:admissions@grabenhighlight.edu.rw" className="font-bold text-slate-900 hover:text-orange-600">
                      admissions@grabenhighlight.edu.rw
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Location Map (Matches Screenshot 15 & 16) */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="font-black text-xs text-slate-900 uppercase tracking-wider">
                    GRABEN HIGHLIGHT ACADEMY LOCATION
                  </span>
                </div>
                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">
                  Rugerero, Rubavu
                </span>
              </div>

              {/* Interactive Location Map Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-64 bg-slate-100">
                <iframe
                  title="Graben Highlight Academy Location Map"
                  src="https://maps.google.com/maps?hl=en&q=graben%20highlight%20academy&t=k&z=15&ie=UTF8&iwloc=B&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                ></iframe>

                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-md text-left text-xs space-y-0.5">
                  <div className="font-black text-slate-900">Graben Highlight Academy</div>
                  <div className="text-[10px] text-slate-500 font-medium">Rugerero Sector, Rubavu District</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-1">
                <span>📍 Rugerero Sector, Rubavu District</span>
                <a
                  href="https://www.google.com/maps/place/Graben+Highlight+Academy/@-1.6935946,29.3077524,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

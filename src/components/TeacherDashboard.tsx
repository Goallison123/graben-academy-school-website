import React, { useState } from 'react';
import { Award, MessageSquare, Check, Sparkles, Send, Heart, User, Filter } from 'lucide-react';
import { TeacherPing, SchoolConfig } from '../types';

interface TeacherDashboardProps {
  teacherPings: TeacherPing[];
  schoolConfig: SchoolConfig;
  onSendPraise: (pingId: string, praiseComment: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherPings,
  schoolConfig,
  onSendPraise,
}) => {
  const [praiseText, setPraiseText] = useState<{ [id: string]: string }>({});
  const [selectedPing, setSelectedPing] = useState<TeacherPing | null>(null);

  const QUICK_PRAISES = [
    '⭐ Wonderful creative drawing!',
    '🦋 Love your butterfly colors!',
    '🌈 Super connection effort!',
    '🌟 Amazing music composition!',
    '🎨 Can’t wait to see your next charm!',
  ];

  const handlePraiseSubmit = (pingId: string, comment: string) => {
    if (!comment.trim()) return;
    onSendPraise(pingId, comment.trim());
    setPraiseText((prev) => ({ ...prev, [pingId]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Teacher Portal Banner Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-sky-500 rounded-[32px] p-6 sm:p-10 text-white shadow-xl border-4 border-amber-300 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-xs font-black text-amber-100 border border-white/20">
            <Award className="w-4 h-4 text-amber-200" />
            <span>Nursery School Teacher Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {schoolConfig.schoolName} Teacher Feed 🍎
          </h1>

          <p className="text-amber-50 text-sm sm:text-base leading-relaxed font-medium">
            When children finish a session in Peítho, they tap "Show my Teacher!". Review their generative creations and send instant praise badges back to their family's Digital Fridge!
          </p>
        </div>
      </div>

      {/* Classroom Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 border-2 border-orange-200 text-orange-600 flex items-center justify-center text-2xl font-black shrink-0">
            🎨
          </div>
          <div>
            <div className="text-2xl font-black text-orange-950">{teacherPings.length}</div>
            <div className="text-orange-900/80 text-xs font-bold">Student Creations Submitted</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-emerald-200 text-emerald-700 flex items-center justify-center text-2xl font-black shrink-0">
            🍎
          </div>
          <div>
            <div className="text-2xl font-black text-orange-950">
              {teacherPings.filter((p) => p.status === 'praised').length}
            </div>
            <div className="text-orange-900/80 text-xs font-bold">Teacher Praise Badges Sent</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 text-orange-700 flex items-center justify-center text-2xl font-black shrink-0">
            🪲
          </div>
          <div>
            <div className="text-2xl font-black text-orange-950">100%</div>
            <div className="text-orange-900/80 text-xs font-bold">Student Connection Rate</div>
          </div>
        </div>
      </div>

      {/* Student Submissions Stream */}
      <div className="space-y-6">
        <h2 className="text-xl font-black text-orange-950 flex items-center gap-2">
          <span>Student Submissions Feed</span>
          <span className="text-xs font-bold text-orange-700">({teacherPings.length} items)</span>
        </h2>

        {teacherPings.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center border-4 border-dashed border-amber-300 max-w-lg mx-auto space-y-3 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 border-2 border-amber-200 flex items-center justify-center text-3xl">
              🍎
            </div>
            <h3 className="text-lg font-black text-orange-950">No Student Pings Yet</h3>
            <p className="text-orange-900/80 text-xs font-medium">
              When children complete a Peítho canvas and tap "Show my Teacher!", their artwork will appear here live!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherPings.map((ping) => (
              <div
                key={ping.id}
                className="bg-white rounded-3xl overflow-hidden border-4 border-amber-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 bg-amber-50 border-b-2 border-amber-200">
                    <img
                      src={ping.dataUrl}
                      alt={ping.artworkTitle}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-black text-orange-950 flex items-center gap-1.5 shadow-xs border-2 border-amber-200">
                      <User className="w-3.5 h-3.5 text-orange-600" />
                      <span>{ping.childName}</span>
                    </div>

                    <div className="absolute top-3 right-3">
                      {ping.status === 'praised' ? (
                        <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1 border border-emerald-600">
                          <Check className="w-3 h-3" />
                          Praised
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-amber-400 text-orange-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs border border-amber-500">
                          Pending Review
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <div className="text-xs font-bold text-orange-800/70">
                        {new Date(ping.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="font-black text-orange-950 text-base">
                        {ping.creatureName} Creation
                      </div>
                    </div>

                    {/* Teacher Praise Status / Input */}
                    {ping.status === 'praised' ? (
                      <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-3 text-xs text-orange-950 space-y-1 shadow-xs">
                        <span className="font-black block text-orange-900">Praise Sent to Parent:</span>
                        <p className="italic font-medium">"{ping.praiseComment}"</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-2 border-t border-amber-100">
                        <div className="text-xs font-black text-orange-950">Quick Praise Badges:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {QUICK_PRAISES.map((praise, idx) => (
                            <button
                              key={idx}
                              onClick={() => handlePraiseSubmit(ping.id, praise)}
                              className="text-[11px] font-bold px-2.5 py-1.5 bg-amber-100 hover:bg-emerald-100 hover:text-emerald-900 text-orange-950 rounded-xl transition-colors border border-amber-300 shadow-xs"
                              id={`quick-praise-${ping.id}-${idx}`}
                            >
                              {praise}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

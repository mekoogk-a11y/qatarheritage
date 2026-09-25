import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'مرحبًا بك في المساعد المعرفي لتطبيق «اكتشف قطر 🇶🇦». أنا هنا للإجابة عن استفساراتك حول تاريخ قطر، مدنها، تراثها، معالمها ومتاحفها استنادًا إلى المصادر الموثقة فقط.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestionPrompts = [
    'ما قصة مدينة الزبارة ولماذا أدرجت باليونسكو؟',
    'ماذا أزور في مدينة الخور الساحلية؟',
    'ما هي أشهر متاحف قطر وما الذي يميزها؟',
    'كيف كانت رحلات الغوص على اللؤلؤ في قطر؟',
    'ما قصة نشأة مدينة الدوحة وتسميتها؟',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', text: q }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          history: newMessages.slice(1, -1),
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'لا توجد لدي معلومات موثقة كافية عن ذلك حالياً في قاعدة بيانات التوثيق القطري.'
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'عذراً، حدث خطأ أثناء الاتصال. يرجى التحقق من الشبكة أو تصفح أقسام المدن والمعالم مباشرة.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl flex flex-col h-[85vh] max-h-[700px] text-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>اسأل عن قطر</span>
                <span className="text-sm">🇶🇦</span>
              </h3>
              <span className="text-[11px] text-stone-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                مساعد معرفي معتمد على المصادر الموثقة فقط
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-start flex-row-reverse' : 'justify-start'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-[#8A1538] text-white' : 'bg-[#D4AF37] text-stone-950 font-bold'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#8A1538] text-white shadow-md'
                    : 'bg-stone-950 border border-white/10 text-stone-200 font-serif-ar'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-stone-400 text-xs py-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span>جاري التحقق من مصادر المعلومات الموثقة...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 border-t border-white/5 bg-stone-950/60 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestionPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#8A1538]/30 border border-white/10 hover:border-[#8A1538] text-[11px] text-stone-300 hover:text-white shrink-0 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-950 border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك عن مدن، معالم، أو تاريخ قطر..."
              className="flex-1 py-3 px-4 rounded-2xl bg-stone-900 border border-white/10 focus:border-[#8A1538] focus:ring-2 focus:ring-[#8A1538]/40 text-stone-100 placeholder-stone-500 text-xs sm:text-sm outline-none transition"
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-2xl bg-[#8A1538] hover:bg-[#ad1f49] disabled:opacity-40 text-white transition shadow shrink-0"
              title="إرسال السؤال"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

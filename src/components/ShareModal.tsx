import React, { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Send, X, Globe } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://discoverqatar.qa';
  const shareMessage = `${title}\n${text}\n\n${currentUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, '_blank');
  };

  const handleTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title + '\n' + text)}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: currentUrl,
        });
      } catch (err) {
        console.warn('Share aborted', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl p-6 text-stone-100">
        
        <div className="flex justify-between items-center mb-5 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-bold text-white">مشاركة المحتوى 🇶🇦</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-300 font-bold mb-4 line-clamp-2">
          {title}
        </p>

        {/* Share buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={handleWhatsApp}
            className="p-3.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleTelegram}
            className="p-3.5 rounded-2xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>Telegram</span>
          </button>
        </div>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="w-full py-3 px-4 rounded-2xl bg-stone-950 border border-white/10 hover:border-[#8A1538] text-stone-200 text-xs sm:text-sm font-semibold flex items-center justify-between transition mb-3"
        >
          <span className="flex items-center gap-2">
            <Copy className="w-4 h-4 text-[#D4AF37]" />
            <span>{copied ? 'تم نسخ الرابط والمحتوى بنجاح!' : 'نسخ الرابط مع النص'}</span>
          </span>
          {copied && <Check className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Native Web Share API if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-2xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
          >
            <Globe className="w-4 h-4" />
            <span>مشاركة النظام (تطبيقات أخرى)</span>
          </button>
        )}

      </div>
    </div>
  );
};

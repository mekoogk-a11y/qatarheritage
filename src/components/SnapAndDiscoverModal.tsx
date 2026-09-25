import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, X, Eye, ExternalLink } from 'lucide-react';
import { LandmarkIdentificationResult } from '../types';

interface SnapAndDiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMatchedPlace?: (matchedId: string) => void;
}

export const SnapAndDiscoverModal: React.FC<SnapAndDiscoverModalProps> = ({
  isOpen,
  onClose,
  onSelectMatchedPlace,
}) => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<LandmarkIdentificationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Ready-to-test sample photos from Qatar
  const samplePhotos = [
    {
      label: 'متحف الفن الإسلامي',
      url: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'قلعة الزبارة الأثرية',
      url: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'سوق واقف التقليدي',
      url: 'https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'متحف قطر الوطني',
      url: 'https://images.unsplash.com/photo-1580835239846-5bb9ce03c8c3?auto=format&fit=crop&w=600&q=80',
    },
  ];

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result as string;
      setPreviewUrl(base64String);
      // Remove data:image/...;base64, prefix
      const cleanBase64 = base64String.split(',')[1] || base64String;
      setSelectedImageBase64(cleanBase64);
      setResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = async (sampleUrl: string) => {
    try {
      setIsAnalyzing(true);
      setPreviewUrl(sampleUrl);
      setErrorMsg(null);
      setResult(null);

      // Fetch sample and convert to base64
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      setMimeType(blob.type || 'image/jpeg');

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const cleanBase64 = base64String.split(',')[1] || base64String;
        setSelectedImageBase64(cleanBase64);
        analyzeImage(cleanBase64, blob.type || 'image/jpeg');
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      setIsAnalyzing(false);
      setErrorMsg('تعذر تحميل الصورة التجريبية');
    }
  };

  const analyzeImage = async (base64Data?: string, type?: string) => {
    const dataToSend = base64Data || selectedImageBase64;
    if (!dataToSend) return;

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/identify-landmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: dataToSend,
          mimeType: type || mimeType,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setErrorMsg('حدث خطأ أثناء فحص الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>صوّر واكتشف المكان 📸</span>
              </h3>
              <p className="text-xs text-stone-300">
                التعرف البصري الذكي على معالم وآثار قطر المدعوم بالذكاء الاصطناعي
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Image Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative h-56 sm:h-64 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#8A1538] bg-stone-950/70 hover:bg-stone-950 flex flex-col items-center justify-center cursor-pointer transition overflow-hidden group"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="الصورة المراد فحصها"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#8A1538]/30 text-[#D4AF37] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  اضغط لرفع صورة أو التقاطها بكاميرا الهاتف
                </h4>
                <p className="text-xs text-stone-400">
                  صيغ JPEG و PNG و WebP مدعومة
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Quick Sample Selector */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-400 block">
              أو اختر صورة تجريبية من معالم قطر للاختبار الفوري:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {samplePhotos.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample.url)}
                  disabled={isAnalyzing}
                  className="p-2 rounded-xl bg-stone-950 border border-white/10 hover:border-[#D4AF37] text-right transition flex flex-col gap-1.5"
                >
                  <img
                    src={sample.url}
                    alt={sample.label}
                    className="w-full h-16 rounded-lg object-cover"
                  />
                  <span className="text-[11px] font-bold text-stone-200 line-clamp-1">{sample.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          {selectedImageBase64 && !result && (
            <button
              onClick={() => analyzeImage()}
              disabled={isAnalyzing}
              className="w-full py-3 px-4 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>جاري فحص المعلم والتحقق من التفاصيل المعمارية...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>التعرف على المعلم الآن</span>
                </>
              )}
            </button>
          )}

          {/* Analysis Result Box */}
          {result && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#8A1538]/20 via-stone-950 to-stone-950 border border-[#D4AF37]/40 shadow-xl space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>نتيجة التعرف البصري:</span>
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    result.confidenceScore >= 70
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border border-amber-700'
                  }`}
                >
                  نسبة الثقة: {result.confidenceScore}%
                </span>
              </div>

              <div>
                <h4 className="text-xl font-black text-white">
                  {result.landmarkNameAr || 'معلم غير محدد بدقة'}
                </h4>
                {result.cityNameAr && (
                  <span className="text-xs text-stone-400">المدينة / المنطقة: {result.cityNameAr}</span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-ar">
                {result.description}
              </p>

              {result.matchedId && onSelectMatchedPlace && (
                <button
                  onClick={() => {
                    onSelectMatchedPlace(result.matchedId!);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Eye className="w-4 h-4" />
                  <span>اكتشف تفاصيل {result.landmarkNameAr} في المنصة</span>
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

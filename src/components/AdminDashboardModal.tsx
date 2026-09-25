import React, { useState } from 'react';
import { Lock, Plus, Edit3, Trash2, CheckCircle, Eye, EyeOff, Save, X, Shield, Globe } from 'lucide-react';
import { City, Landmark, Museum, Story, DidYouKnowFact, QuizQuestion } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: City[];
  landmarks: Landmark[];
  museums: Museum[];
  stories: Story[];
  facts: DidYouKnowFact[];
  onAddCity: (city: City) => void;
  onUpdateCity: (city: City) => void;
  onDeleteCity: (id: string) => void;
  onUpdateMuseumHours: (id: string, hours: { days: string; hours: string }[]) => void;
  onAddFact: (fact: DidYouKnowFact) => void;
  onAddLandmark: (landmark: Landmark) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  cities,
  landmarks,
  museums,
  stories,
  facts,
  onAddCity,
  onUpdateCity,
  onDeleteCity,
  onUpdateMuseumHours,
  onAddFact,
  onAddLandmark,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'cities' | 'landmarks' | 'museums' | 'facts'>('cities');

  // Form states for adding new city
  const [newCityNameAr, setNewCityNameAr] = useState('');
  const [newCityNameEn, setNewCityNameEn] = useState('');
  const [newCityTag, setNewCityTag] = useState('');
  const [newCityOverview, setNewCityOverview] = useState('');
  const [newCityNaming, setNewCityNaming] = useState('');
  const [newCityImage, setNewCityImage] = useState('');
  const [newCityStatus, setNewCityStatus] = useState<'published' | 'draft'>('published');
  const [newCitySource, setNewCitySource] = useState('');

  // Form state for museum hours update
  const [selectedMuseumId, setSelectedMuseumId] = useState(museums[0]?.id || '');
  const [museumNewDays, setMuseumNewDays] = useState('السبت - الخميس');
  const [museumNewHours, setMuseumNewHours] = useState('9:00 صباحاً - 8:00 مساءً');

  // Form state for adding new fact
  const [newFactText, setNewFactText] = useState('');
  const [newFactDetail, setNewFactDetail] = useState('');
  const [newFactSource, setNewFactSource] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2030' || pin === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleCreateCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityNameAr || !newCityOverview) return;

    const newCity: City = {
      id: `city-${Date.now()}`,
      nameAr: newCityNameAr,
      nameEn: newCityNameEn || newCityNameAr,
      tag: newCityTag || 'مدينة قطرية موثقة',
      overview: newCityOverview,
      history: 'تم توثيق تاريخ هذه المدينة من المصادر الرسمية.',
      namingReason: newCityNaming,
      geoCoords: [25.3, 51.5],
      landmarks: [],
      naturalFeatures: [],
      heritageSites: [],
      heroImage: newCityImage || 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      sources: [
        {
          title: newCitySource || 'المصادر الرسمية لدولة قطر',
          verifiedOrg: 'وزارة البلدية والثقافة',
          accessDate: new Date().toISOString().split('T')[0],
        }
      ],
      isCoastal: true,
      isHistorical: true,
      isNatural: false,
      isHeritage: true,
      status: newCityStatus,
    };

    onAddCity(newCity);
    // Reset form
    setNewCityNameAr('');
    setNewCityNameEn('');
    setNewCityTag('');
    setNewCityOverview('');
    setNewCityNaming('');
    setNewCityImage('');
    alert(`تمت إضافة ${newCity.nameAr} بنجاح بحالة: ${newCity.status === 'published' ? 'منشور' : 'مسودة'}`);
  };

  const handleSaveMuseumHours = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMuseumId) return;

    onUpdateMuseumHours(selectedMuseumId, [
      { days: museumNewDays, hours: museumNewHours },
      { days: 'الجمعة', hours: '1:30 ظهراً - 8:00 مساءً' },
    ]);
    alert('تم تحديث ساعات عمل المتحف في النظام بنجاح!');
  };

  const handleCreateFact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFactText) return;

    const newFact: DidYouKnowFact = {
      id: `fact-${Date.now()}`,
      fact: newFactText,
      detailedStory: newFactDetail || newFactText,
      source: newFactSource || 'متاحف قطر والجهات الرسمية',
    };

    onAddFact(newFact);
    setNewFactText('');
    setNewFactDetail('');
    setNewFactSource('');
    alert('تمت إضافة معلومة «هل تعلم؟» بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>لوحة الإدارة والتحكم بالمحتوى (CMS)</span>
                <span className="text-xs bg-[#D4AF37] text-stone-950 font-bold px-2 py-0.5 rounded-full">آمن</span>
              </h3>
              <p className="text-xs text-stone-300">
                إدارة المدن، المعالم، المتاحف، ساعات العمل، ومراقبة حالة المسودة والنشر
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

        {/* Auth Barrier or Admin Panel */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-[#8A1538]/30 border border-[#8A1538] text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">تسجيل دخول المشرف</h4>
            <p className="text-xs text-stone-400 mb-6">
              أدخل رمز المرور السري للوصول إلى لوحة التحكم (الرمز الافتراضي للتجربة: <strong className="text-[#D4AF37]">2030</strong>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="أدخل رمز المشرف (2030)..."
                className="w-full text-center tracking-widest text-lg py-3 px-4 rounded-xl bg-stone-950 border border-white/10 focus:border-[#8A1538] outline-none text-white font-mono"
              />
              {pinError && (
                <p className="text-xs text-red-400 font-bold">الرمز غير صحيح، حاول مرة أخرى.</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold text-sm transition shadow-lg"
              >
                دخول للوحة الإدارة
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex border-b border-white/10 bg-stone-950 px-6 gap-3">
              {[
                { id: 'cities', label: 'إدارة المدن والبلدات' },
                { id: 'museums', label: 'تحديث ساعات المتاحف' },
                { id: 'facts', label: 'إضافة «هل تعلم؟»' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-[#D4AF37] text-white text-[#D4AF37]'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* TAB 1: CITIES MANAGEMENT */}
              {activeTab === 'cities' && (
                <div className="space-y-8">
                  {/* Add City Form */}
                  <div className="p-5 rounded-2xl bg-stone-950 border border-white/10 space-y-4">
                    <h4 className="text-base font-bold text-[#FCEBA7] flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#D4AF37]" />
                      <span>إضافة مدينة / بلدة جديدة إلى قاعدة البيانات</span>
                    </h4>

                    <form onSubmit={handleCreateCity} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-300 mb-1">اسم المدينة بالعربية *</label>
                        <input
                          type="text"
                          required
                          value={newCityNameAr}
                          onChange={(e) => setNewCityNameAr(e.target.value)}
                          placeholder="مثال: سميسمة"
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">اسم المدينة بالإنجليزية</label>
                        <input
                          type="text"
                          value={newCityNameEn}
                          onChange={(e) => setNewCityNameEn(e.target.value)}
                          placeholder="e.g. Simaisma"
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-stone-300 mb-1">النبذة والوصف العام *</label>
                        <textarea
                          required
                          rows={2}
                          value={newCityOverview}
                          onChange={(e) => setNewCityOverview(e.target.value)}
                          placeholder="نبذة تاريخية وسياحية عن المدينة..."
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">سبب التسمية الموثق</label>
                        <input
                          type="text"
                          value={newCityNaming}
                          onChange={(e) => setNewCityNaming(e.target.value)}
                          placeholder="مثال: نسبة إلى طائر السمامة..."
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">رابط صورة عالية الجودة</label>
                        <input
                          type="url"
                          value={newCityImage}
                          onChange={(e) => setNewCityImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">المصدر الموثق</label>
                        <input
                          type="text"
                          value={newCitySource}
                          onChange={(e) => setNewCitySource(e.target.value)}
                          placeholder="دليل وزارة البلدية / متاحف قطر"
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">حالة النشر</label>
                        <select
                          value={newCityStatus}
                          onChange={(e) => setNewCityStatus(e.target.value as any)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        >
                          <option value="published">منشور مباشرة (Published)</option>
                          <option value="draft">مسودة للمراجعة (Draft)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 pt-2">
                        <button
                          type="submit"
                          className="py-2.5 px-6 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold transition shadow"
                        >
                          حفظ وإضافة المدينة
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Existing Cities List */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3">
                      المدن المسجلة حالياً ({cities.length}):
                    </h4>
                    <div className="space-y-2">
                      {cities.map((city) => (
                        <div
                          key={city.id}
                          className="p-3 rounded-xl bg-stone-950 border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={city.heroImage}
                              alt={city.nameAr}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <span className="font-bold text-white text-sm block">{city.nameAr}</span>
                              <span className="text-stone-400">{city.nameEn} • {city.tag}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              {city.status === 'published' ? 'منشور' : 'مسودة'}
                            </span>
                            <button
                              onClick={() => {
                                if (confirm(`هل أنت متأكد من حذف ${city.nameAr}؟`)) {
                                  onDeleteCity(city.id);
                                }
                              }}
                              className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-white/5 rounded"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MUSEUMS OPENING HOURS */}
              {activeTab === 'museums' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="p-5 rounded-2xl bg-stone-950 border border-white/10 space-y-4">
                    <h4 className="text-base font-bold text-[#FCEBA7]">
                      تحديث ساعات الزيارة الحية للمتاحف
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      هذه الميزة تمكن إدارة التطبيق من تعديل وتحديث مواعيد وساعات العمل المعتمدة دون الحاجة لتعديل الكود المصدري.
                    </p>

                    <form onSubmit={handleSaveMuseumHours} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-stone-300 mb-1">اختر المتحف المراد تحديثه</label>
                        <select
                          value={selectedMuseumId}
                          onChange={(e) => setSelectedMuseumId(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none text-sm font-semibold"
                        >
                          {museums.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.nameAr} ({m.nameEn})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">الأيام</label>
                        <input
                          type="text"
                          value={museumNewDays}
                          onChange={(e) => setMuseumNewDays(e.target.value)}
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">ساعات الزيارة الجديدة</label>
                        <input
                          type="text"
                          value={museumNewHours}
                          onChange={(e) => setMuseumNewHours(e.target.value)}
                          placeholder="مثال: 9:00 صباحاً - 8:00 مساءً"
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold transition shadow"
                      >
                        حفظ ونشر التحديث فوراً
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 3: ADD FACT */}
              {activeTab === 'facts' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="p-5 rounded-2xl bg-stone-950 border border-white/10 space-y-4">
                    <h4 className="text-base font-bold text-[#FCEBA7]">
                      إضافة معلومة جديدة لقسم «هل تعلم؟»
                    </h4>

                    <form onSubmit={handleCreateFact} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-stone-300 mb-1">نص المعلومة المختصر *</label>
                        <textarea
                          required
                          rows={2}
                          value={newFactText}
                          onChange={(e) => setNewFactText(e.target.value)}
                          placeholder="هل تعلم أن..."
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">القصة والشرح التفصيلي</label>
                        <textarea
                          rows={3}
                          value={newFactDetail}
                          onChange={(e) => setNewFactDetail(e.target.value)}
                          placeholder="تفاصيل تاريخية إضافية تظهر عند الضغط على 'اكتشف القصة'..."
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-300 mb-1">المصدر الرسمي المعتمد *</label>
                        <input
                          type="text"
                          required
                          value={newFactSource}
                          onChange={(e) => setNewFactSource(e.target.value)}
                          placeholder="متاحف قطر / اليونسكو"
                          className="w-full p-2.5 rounded-xl bg-stone-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-6 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold transition shadow"
                      >
                        إضافة المعلومة للنظام
                      </button>
                    </form>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

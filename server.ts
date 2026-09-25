import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory CMS overrides for live admin changes
let cmsStore: {
  citiesOverride?: any[];
  landmarksOverride?: any[];
  museumsOverride?: any[];
  storiesOverride?: any[];
  factsOverride?: any[];
  quizOverride?: any[];
} = {};

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: AI Assistant "اسأل عن قطر 🇶🇦"
app.post('/api/gemini/ask', async (req, res) => {
  try {
    const { question, history } = req.body;
    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    const systemInstruction = `أنت المساعد الثقافي والمعرفي الذكي لتطبيق «اكتشف قطر 🇶🇦».
مهمتك: تقديم معلومات دقيقة وموثقة وتاريخية وسياحية عن دولة قطر، مدنها، قراها، معالمها، متاحفها، تراثها (الغوص، الصيد، السدو، المجالس، الأزياء، المأكولات)، وطبيعتها.
القواعد الإلزامية الصارمة:
1. لا تخترع أي معلومة، ولا تفبرك أي اسم لمدينة أو معلم أو تاريخ أو إحصائية غير صحيحة.
2. إذا سُئلت عن أمر غير معروف أو غير موثق في التاريخ والسياحة القطرية، يجب أن تقول صراحة: "لا توجد لدي معلومات موثقة كافية عن ذلك حالياً."
3. استند إلى المصادر الرسمية المعتمدة في قطر مثل: متاحف قطر (QM)، قطر للسياحة (Visit Qatar)، وزارة الثقافة، وزارة البيئة والتغير المناخي، واليونسكو (UNESCO).
4. استخدم لغة عربية راقية وفصيحة، واضحة ومرحبة، مع تنسيق جميل بالنقاط وعلامات الترقيم.
5. لا تتحدث في السياسة الجدلية، وركز حصرًا على الثقافة، التاريخ، التراث، السياحة، الجغرافيا، والعمارة.`;

    let promptContents = `${question}`;
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6).map((h: any) => `${h.role === 'user' ? 'السائل' : 'المساعد'}: ${h.text}`).join('\n');
      promptContents = `سياق المحادثة السابقة:\n${recentHistory}\n\nالسؤال الجديد: ${question}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptContents,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high factual accuracy
      },
    });

    const reply = response.text || 'لا توجد لدي معلومات موثقة كافية عن ذلك حالياً.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error querying Gemini:', error);
    res.status(500).json({
      error: 'عذراً، حدث خطأ أثناء الاتصال بالمساعد الذكي.',
      details: error?.message || 'Server error',
      fallback: 'يمكنك تصفح أقسام المدن والمعالم والمتاحف الموثقة داخل التطبيق مباشرة.'
    });
  }
});

// Endpoint: AI Vision "صوّر واكتشف" - Multimodal Landmark Identification
app.post('/api/gemini/identify-landmark', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body;
    if (!imageBase64) {
      res.status(400).json({ error: 'Image is required' });
      return;
    }

    const prompt = `أنت خبير في معالم وآثار وعمارة دولة قطر.
افحص هذه الصورة وحاول تحديد المعلم أو المكان القطري المصور (مثل: متحف الفن الإسلامي، متحف قطر الوطني، قلعة الزبارة، سوق واقف، أبراج برزان، استاد لوسيل، كورنيش الدوحة، كتارا، جزيرة اللؤلؤة، خور العديد، محمية المانجروف في الذخيرة، راس بروق وزكريت، قلعة الكوت، أو غيرها من معالم قطر).

أجب بصيغة JSON فقط بهذا الشكل الدقيق:
{
  "matched": true,
  "landmarkNameAr": "اسم المعلم بالعربية",
  "landmarkNameEn": "اسم المعلم بالإنجليزية",
  "cityNameAr": "المدينة أو المنطقة التابع لها",
  "confidenceScore": 88,
  "description": "شرح توضيحي دقيق عن المعلم وما نراه في الصورة من عناصر معمارية أو تراثية",
  "matchedId": "معرف المكان إن وجد مثل souq-waqif, al-zubarah-fort, mia, nmoq, barzan-towers, katara-village, lusail-stadium, al-thakira-mangroves, khor-al-adaid, doha-corniche"
}
إذا لم تكن متأكداً أو كانت الصورة غامضة أو ليست لمعلم قطري، اجعل confidenceScore منخفضاً واذكر عدم التأكد بصراحة دون اختلاق.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: imageBase64,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error identifying landmark:', error);
    res.status(500).json({
      error: 'تعذر التعرف على الصورة حالياً',
      confidenceScore: 0,
      matched: false,
    });
  }
});

// Endpoint: CMS Data overrides
app.get('/api/cms', (req, res) => {
  res.json(cmsStore);
});

app.post('/api/cms/update', (req, res) => {
  const { type, items } = req.body;
  if (type && items) {
    (cmsStore as any)[type] = items;
  }
  res.json({ success: true, updated: type });
});

// Setup Vite in Dev or Static files in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Discover Qatar app listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

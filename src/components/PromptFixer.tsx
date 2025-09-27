import React, { useState, useCallback } from 'react';
import { Copy, Download, FileText, History, Settings, Wand2, Video, Image, Type, Volume2, VolumeX, Zap, Sparkles } from 'lucide-react';

interface PromptTemplate {
  target: 'sora' | 'veo3' | 'gpt' | 'image';
  mediaType: 'video' | 'image' | 'text';
  template: string;
}

interface PromptHistory {
  id: string;
  input: string;
  output: string;
  target: string;
  mediaType: string;
  timestamp: Date;
}

const PromptFixer: React.FC = () => {
  const [input, setInput] = useState('');
  const [target, setTarget] = useState<'sora' | 'veo3' | 'gpt' | 'image'>('sora');
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'text'>('video');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState<PromptHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Quick settings
  const [withAudio, setWithAudio] = useState(true);
  const [quality, setQuality] = useState<'fast' | 'quality'>('quality');
  const [style, setStyle] = useState<'realistic' | 'anime' | 'surreal' | 'business'>('realistic');

  // Auto-map target to media type
  React.useEffect(() => {
    if (target === 'gpt') {
      setMediaType('text');
    } else if (target === 'image') {
      setMediaType('image');
    } else {
      setMediaType('video');
    }
  }, [target]);

  const extractKeyElements = (text: string) => {
    // Simple Hebrew text analysis
    const subjects = text.match(/[א-ת\s]{2,}/g) || [];
    const firstSubject = subjects[0] || 'נושא לא מוגדר';
    
    // Extract setting clues
    const settings = {
      time: text.includes('לילה') || text.includes('ערב') ? 'לילה' : 
            text.includes('בוקר') || text.includes('שחר') ? 'בוקר' : 
            text.includes('צהריים') || text.includes('שמש') ? 'יום' : 'יום',
      weather: text.includes('גשם') ? 'גשם קל' :
               text.includes('שמש') ? 'שמש' :
               text.includes('עננים') ? 'עננים' : 'בהיר',
      mood: text.includes('חמימה') || text.includes('נעים') ? 'חם ומזמין' :
            text.includes('עצוב') || text.includes('כאוב') ? 'מלנכולי' :
            text.includes('מרגש') || text.includes('שמח') ? 'חיובי ואנרגטי' : 'נייטרali'
    };
    
    return {
      coreScene: firstSubject.trim(),
      subjects: subjects.slice(0, 3).join(', '),
      setting: `${settings.time}, ${settings.weather}`,
      mood: settings.mood
    };
  };

  const generatePrompt = useCallback(() => {
    if (!input.trim() || input.length < 25) {
      alert('אנא הזן לפחות 25 תווים לתיאור המפורט יותר');
      return;
    }

    const elements = extractKeyElements(input);
    let generatedPrompt = '';

    const templates: Record<string, PromptTemplate> = {
      sora: {
        target: 'sora',
        mediaType: 'video',
        template: `Generate a cinematic video, duration 10 seconds, resolution 1920x1080, aspect 16:9.
Scene: ${elements.coreScene}
Key subjects: ${elements.subjects}, Setting: ${elements.setting}, Mood: ${elements.mood}.
Camera: smooth dolly movement with ${style === 'business' ? 'professional stability' : 'cinematic flow'}.
Lighting: ${style === 'realistic' ? 'soft natural lighting' : style === 'anime' ? 'vibrant saturated lighting' : style === 'surreal' ? 'dramatic artistic lighting' : 'professional studio lighting'}.
Style: ${style === 'realistic' ? 'photorealistic' : style === 'anime' ? 'anime-style animation' : style === 'surreal' ? 'surreal artistic' : 'corporate professional'}, Motion details: gentle, purposeful movement.
Audio: ${withAudio ? 'subtle ambient sounds' : 'silent'}, no music unless specified.
Constraints: no text overlays, no logos, coherent physics.
Output: single shot, clean composition, sharp focus.`
      },
      veo3: {
        target: 'veo3',
        mediaType: 'video', 
        template: `Create a coherent, high-quality video (~10s), 1080p, 16:9.
Story beat: ${elements.coreScene}.
Visuals: ${elements.subjects}, Location: ${elements.setting}, Mood: ${elements.mood}.
Camera: smooth movement; Composition: medium shot with depth.
Lighting: ${style === 'realistic' ? 'natural soft lighting' : style === 'anime' ? 'vibrant colors' : style === 'surreal' ? 'dramatic shadows' : 'clean professional lighting'}; Color: harmonious palette.
Motion cues: organic, realistic movement with smooth transitions.
Audio: ${withAudio ? 'ambient environmental sounds' : 'silent'}, avoid music unless specified.
Safety: no brand marks/text, realistic motion, stable exposure.
Deliver one cohesive clip, ready-to-preview.`
      },
      image: {
        target: 'image',
        mediaType: 'image',
        template: `Ultra-detailed still image.
Subject: ${elements.coreScene}; Setting: ${elements.setting}; Mood: ${elements.mood}.
Perspective: eye-level view, Composition: rule-of-thirds with balanced elements.
Lighting: ${style === 'realistic' ? 'soft natural lighting' : style === 'anime' ? 'vibrant anime-style lighting' : style === 'surreal' ? 'dramatic artistic lighting' : 'professional studio lighting'}; Depth: appropriate depth of field.
Style: ${style === 'realistic' ? 'photorealistic' : style === 'anime' ? 'anime illustration' : style === 'surreal' ? 'surreal art' : 'corporate professional'}.
Materials/Textures: high-quality textures and materials.
Constraints: no text, no watermarks, clean composition.
Output ratio 16:9, high fidelity, crisp focus.`
      },
      gpt: {
        target: 'gpt',
        mediaType: 'text',
        template: `Write a concise ${style === 'business' ? 'business copy' : 'narrative description'} in Hebrew, tone ${style === 'business' ? 'professional' : style === 'realistic' ? 'conversational' : 'creative'}, 
length 150-220 words, based on: ${input}.
Include: key elements from the description, avoid jargon, keep sentences clear.
Output structure: compelling headline (<=8 words), 2 engaging paragraphs, 3 actionable points.
Do not include emojis or hashtags unless specifically requested.`
      }
    };

    generatedPrompt = templates[target].template;
    setOutput(generatedPrompt);

    // Add to history
    const newHistoryItem: PromptHistory = {
      id: Date.now().toString(),
      input,
      output: generatedPrompt,
      target,
      mediaType,
      timestamp: new Date()
    };

    setHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
  }, [input, target, mediaType, style, withAudio]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const saveAsFile = () => {
    if (!output) return;
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const filename = `prompt-${target}-${timestamp}.txt`;
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    if (!output) return;

    const jsonData = {
      target,
      mediaType,
      language: 'hebrew',
      style,
      quality,
      withAudio,
      inputText: input,
      generatedPrompt: output,
      timestamp: new Date().toISOString()
    };

    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    const filename = `prompt-data-${target}-${timestamp}.json`;
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg">
              <Wand2 size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-indigo-800 to-slate-700 bg-clip-text text-transparent" itemProp="name">
              פיקסר פרונטים
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed" itemProp="description">
            מחולל פרונטים מקצועי לבינה מלאכותית • הזן תיאור בעברית וקבל פרונט מושלם לכל פלטפורמה
          </p>
          
          {/* SEO Content */}
          <div className="mt-8 max-w-4xl mx-auto text-sm text-slate-500 leading-relaxed">
            <p className="mb-2">
              <strong>פיקסר פרונטים</strong> הוא הכלי המתקדם ביותר ליצירת פרונטים מקצועיים לבינה מלאכותית בישראל. 
              תומך ב-<strong>Sora</strong>, <strong>GPT</strong>, <strong>Veo3</strong>, <strong>Gemini</strong> ועוד פלטפורמות AI מובילות.
            </p>
            <p>
              הכלי מאפשר יצירת פרונטים לוידאו, תמונות וטקסט עם תמיכה מלאה בעברית, 
              הגדרות מתקדמות ויכולות יצוא מקצועיות. פותח על ידי <strong>EranFixer</strong> - 
              המומחים לפתרונות דיגיטליים ובינה מלאכותית.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2" itemProp="about">
                <Type size={24} className="text-blue-600" />
                תיאור הרעיון שלך
              </h2>
              
              <div className="space-y-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="תאר כאן מה אתה רוצה ליצור... למשל: 'שוק לילה בעיר עתיקה, גשם קל, מוכר צעיר מחייך, מצלמה נכנסת לאט בין הדוכנים, אווירה חמימה'"
                  className="w-full h-32 p-4 border-2 border-slate-200 rounded-xl text-right resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-700 placeholder-slate-400"
                  dir="rtl"
                />
                
                <div className="flex items-center justify-between text-sm">
                  <span className={`${input.length < 25 ? 'text-amber-600' : 'text-green-600'}`}>
                    {input.length} תווים (מינימום 25)
                  </span>
                  {input.length >= 25 && <span className="text-green-600">✓ אורך מתאים</span>}
                </div>
              </div>
            </div>

            {/* Target & Media Type Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2" itemProp="featureList">
                <Settings size={20} className="text-blue-600" />
                הגדרות יצירה
              </h3>
              
              <div className="space-y-6">
                {/* Target Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">פלטפורמה יעד</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'sora', label: 'Sora', icon: Video, desc: 'וידאו איכות גבוהה' },
                      { value: 'veo3', label: 'Veo3/Gemini', icon: Sparkles, desc: 'וידאו מהיר' },
                      { value: 'image', label: 'תמונה', icon: Image, desc: 'תמונה סטטית' },
                      { value: 'gpt', label: 'GPT', icon: Type, desc: 'תוכן טקסטואלי' }
                    ].map(({ value, label, icon: Icon, desc }) => (
                      <button
                        key={value}
                        onClick={() => setTarget(value as any)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-right ${
                          target === value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <Icon size={20} className="mb-2" />
                        <div className="font-medium">{label}</div>
                        <div className="text-xs text-slate-500">{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">קול</label>
                    <button
                      onClick={() => setWithAudio(!withAudio)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        withAudio
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {withAudio ? <Volume2 size={16} /> : <VolumeX size={16} />}
                      {withAudio ? 'עם קול' : 'ללא קול'}
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">איכות</label>
                    <button
                      onClick={() => setQuality(quality === 'fast' ? 'quality' : 'fast')}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                        quality === 'quality'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-amber-500 bg-amber-50 text-amber-700'
                      }`}
                    >
                      <Zap size={16} />
                      {quality === 'quality' ? 'איכותי' : 'מהיר'}
                    </button>
                  </div>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">סגנון</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'realistic', label: 'ריאליסטי' },
                      { value: 'anime', label: 'אנימה' },
                      { value: 'surreal', label: 'סוריאליסטי' },
                      { value: 'business', label: 'עסקי' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setStyle(value as any)}
                        className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                          style === value
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generatePrompt}
                  disabled={input.length < 25}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Wand2 size={20} />
                  צור פרונט מקצועי
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
                  <FileText size={24} className="text-green-600" />
                  הפרונט המוכן
                </h3>
                
                {output && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(output)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="העתק"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={saveAsFile}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="שמור כקובץ"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={exportAsJSON}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="יצוא JSON"
                    >
                      <Settings size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <textarea
                  value={output}
                  readOnly
                  placeholder="הפרונט המוכן יופיע כאן לאחר יצירה..."
                  className="w-full h-64 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl resize-none text-slate-700 font-mono text-sm leading-relaxed"
                />
                
                {output && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => copyToClipboard(output)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Copy size={16} />
                      העתק פרונט
                    </button>
                    <button
                      onClick={saveAsFile}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Download size={16} />
                      שמור .txt
                    </button>
                    <button
                      onClick={exportAsJSON}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <FileText size={16} />
                      יצוא JSON
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                    <History size={20} className="text-amber-600" />
                    היסטוריה אחרונה
                  </h3>
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showHistory ? 'הסתר' : 'הצג'}
                  </button>
                </div>
                
                {showHistory && (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-600">
                            {item.target} • {item.mediaType}
                          </span>
                          <button
                            onClick={() => copyToClipboard(item.output)}
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded transition-colors"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-700 line-clamp-2" dir="rtl">
                          {item.input}
                        </p>
                        <div className="text-xs text-slate-500 mt-1">
                          {item.timestamp.toLocaleString('he-IL')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-indigo-800 text-white rounded-full text-sm font-medium">
            <Wand2 size={16} />
            פיתוח <a href="https://eran-fixer.com" className="underline hover:no-underline" itemProp="creator">eran-fixer.com</a> • כלים חכמים לעידן הדיגיטלי
          </div>
          
          {/* Additional SEO Footer */}
          <div className="mt-6 text-xs text-slate-400 max-w-3xl mx-auto">
            <p className="mb-2">
              פיקסר פרונטים - הכלי המוביל בישראל ליצירת פרונטים מקצועיים לבינה מלאכותית. 
              תמיכה מלאה בעברית עם יכולות מתקדמות ליצירת תוכן AI איכותי.
            </p>
            <p>
              צור קשר: <a href="tel:052-212-6366" className="text-blue-600 hover:underline">052-212-6366</a> | 
              <a href="https://eran-fixer.com" className="text-blue-600 hover:underline ml-1">eran-fixer.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptFixer;
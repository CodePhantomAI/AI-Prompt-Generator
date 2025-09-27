# פיקסר פרונטים - מחולל פרונטים מקצועי לבינה מלאכותית

![פיקסר פרונטים](https://img.shields.io/badge/פיקסר_פרונטים-v1.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 תיאור הפרויקט

**פיקסר פרונטים** הוא כלי חכם ומתקדם ליצירת פרונטים מקצועיים לבינה מלאכותית. הכלי מאפשר להזין תיאור בעברית ולקבל פרונט מושלם ומותאם לפלטפורמות AI מובילות כמו Sora, GPT, Veo3, Gemini ועוד.

### ✨ תכונות מרכזיות

- 🎯 **תמיכה מלאה בעברית** - הזן תיאור בעברית וקבל פרונט באנגלית מקצועית
- 🤖 **תמיכה בפלטפורמות מובילות** - Sora, GPT, Veo3/Gemini, כלי תמונות כלליים
- 🎨 **4 סוגי יצירה** - וידאו, תמונות, טקסט עם תבניות מותאמות
- ⚡ **הגדרות מהירות** - קול/ללא קול, מהיר/איכותי, 4 סגנונות עיצוב
- 💾 **יכולות יצוא** - העתקה, שמירה כ-.txt, יצוא JSON מלא
- 📚 **היסטוריה חכמה** - שמירת 5 פרונטים אחרונים עם גישה מהירה
- ✅ **ולידציה חכמה** - בדיקת אורך טקסט והנחיות בזמן אמת

### 🎨 סגנונות נתמכים

- **ריאליסטי** - פוטוריאליזם מלא עם תאורה טבעית
- **אנימה** - סגנון אנימציה יפנית עם צבעים חיים
- **סוריאליסטי** - אמנות דרמטית עם אפקטים מיוחדים
- **עסקי** - מקצועי ונקי למצגות ותוכן עסקי

## 🚀 התחלה מהירה

### דרישות מערכת

- Node.js 18.0 או גרסה חדשה יותר
- npm או yarn
- דפדפן מודרני עם תמיכה ב-ES2020

### התקנה

```bash
# שכפול הפרויקט
git clone https://github.com/eranfixer/prompt-fixer.git
cd prompt-fixer

# התקנת תלויות
npm install

# הרצת שרת פיתוח
npm run dev

# בניית גרסת ייצור
npm run build
```

### שימוש בסיסי

1. **הזן תיאור** - כתב 3-8 משפטים בעברית המתארים מה אתה רוצה ליצור
2. **בחר פלטפורמה** - Sora לוידאו איכותי, Veo3 למהיר, GPT לטקסט, או תמונה כללית
3. **התאם הגדרות** - בחר סגנון, איכות, והאם לכלול קול
4. **צור פרונט** - לחץ על הכפתור וקבל פרונט מקצועי מוכן לשימוש
5. **יצא ושמור** - העתק, שמור כקובץ או יצא JSON לאוטומציה

### דוגמה מהירה

**קלט בעברית:**
```
שוק לילה בעיר עתיקה, גשם קל, מוכר צעיר מחייך, 
מצלמה נכנסת לאט בין הדוכנים, אווירה חמימה
```

**פלט לSora:**
```
Generate a cinematic video, duration 10 seconds, resolution 1920x1080, aspect 16:9.
Scene: night street market in an old city during light rain
Key subjects: young smiling vendor, stalls, Setting: narrow alleys, wet cobblestones, Mood: warm and inviting.
Camera: smooth dolly movement with cinematic flow.
Lighting: soft natural lighting.
Style: photorealistic, Motion details: gentle, purposeful movement.
Audio: subtle ambient sounds, no music unless specified.
Constraints: no text overlays, no logos, coherent physics.
Output: single shot, clean composition, sharp focus.
```

## 🛠️ מבנה הפרויקט

```
prompt-fixer/
├── src/
│   ├── components/
│   │   └── PromptFixer.tsx    # הקומפוננט הראשי
│   ├── App.tsx                # אפליקציה ראשית
│   ├── main.tsx              # נקודת כניסה
│   └── index.css             # סגנונות גלובליים
├── public/                   # קבצים סטטיים
├── index.html               # HTML ראשי עם SEO
├── package.json             # תלויות ופקודות
├── tailwind.config.js       # הגדרות Tailwind
├── tsconfig.json           # הגדרות TypeScript
└── vite.config.ts          # הגדרות Vite
```

## 🎯 תבניות פרונט

הכלי כולל 4 תבניות מוכנות:

### 1. Sora (וידאו איכותי)
- משך: 8-12 שניות
- רזולוציה: 1920x1080, יחס 16:9
- מצלמה: תנועות עדינות (dolly, pan)
- תאורה: טבעית ומקצועית

### 2. Veo3/Gemini (וידאו מהיר)
- משך: 8-12 שניות
- איכות: 1080p
- מיקוד: קוהרנטיות וחלקות
- אופטימיזציה: עיבוד מהיר

### 3. תמונה כללית
- פרספקטיבה: eye-level, top-down
- תאורה: soft natural, studio
- יחסים: 1:1, 4:5, 16:9
- איכות: ultra-detailed, crisp focus

### 4. GPT (טקסט)
- אורך: 120-220 מילים
- מבנה: כותרת + 2 פסקאות + 3 נקודות
- טון: עניני/שיווקי/נרטיב
- שפה: עברית נקייה

## 🔧 הגדרות מתקדמות

### משתני סביבה

```env
# אופציונלי - הגדרות נוספות
VITE_APP_TITLE="פיקסר פרונטים"
VITE_APP_VERSION="1.0.0"
VITE_ANALYTICS_ID="your-analytics-id"
```

### התאמה אישית

הכלי בנוי באופן מודולרי ומאפשר התאמות:

- **תבניות נוספות** - הוסף תבניות חדשות ב-`PromptFixer.tsx`
- **סגנונות** - ערוך את `tailwind.config.js` לצבעים מותאמים
- **שפות** - הוסף תמיכה בשפות נוספות
- **API** - חבר לשירותי AI חיצוניים

## 📊 יכולות יצוא

### JSON Schema
```json
{
  "target": "sora",
  "mediaType": "video", 
  "language": "hebrew",
  "style": "realistic",
  "quality": "quality",
  "withAudio": true,
  "inputText": "הטקסט המקורי בעברית",
  "generatedPrompt": "הפרונט המוכן באנגלית",
  "timestamp": "2025-01-XX..."
}
```

### פורמטי יצוא
- **TXT** - קובץ טקסט פשוט עם הפרונט
- **JSON** - מידע מלא כולל מטאדטה
- **Copy** - העתקה ישירה ללוח

## 🔍 SEO ונגישות

הכלי כולל:
- **Meta tags** מלאים בעברית ואנגלית
- **Structured data** (Schema.org)
- **Open Graph** לשיתוף ברשתות חברתיות
- **נגישות** עם ARIA attributes
- **רספונסיביות** מלאה לכל המכשירים

## 🤝 תרומה לפרויקט

אנו מזמינים תרומות! אנא:

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

### קווים מנחים לתרומה

- עקוב אחר סגנון הקוד הקיים
- הוסף תיעוד לתכונות חדשות
- בדוק שהכל עובד לפני שליחה
- כתב הודעות commit ברורות

## 📝 רישיון

הפרויקט מופץ תחת רישיון MIT. ראה `LICENSE` לפרטים נוספים.

## 📞 יצירת קשר ותמיכה

**EranFixer** - מומחים לפתרונות דיגיטליים ובינה מלאכותית

- 🌐 **אתר:** [eran-fixer.com](https://eran-fixer.com)
- 📱 **טלפון:** 052-212-6366
- 📧 **אימייל:** info@eran-fixer.com

### תמיכה טכנית

- **באגים:** פתח issue ב-GitHub
- **שאלות:** צור קשר דרך האתר
- **בקשות תכונות:** הצע ב-Discussions

## 🎯 מפת דרכים

### גרסה 1.1 (בפיתוח)
- [ ] תרגום אוטומטי עברית ↔ אנגלית
- [ ] ספריית פרונטים שמורים
- [ ] תגיות וקטגוריות
- [ ] שיתוף פרונטים

### גרסה 1.2 (מתוכנן)
- [ ] חיבור API ישיר לפלטפורמות
- [ ] עבודה צוותית
- [ ] תבניות מותאמות אישית
- [ ] אנליטיקס ודוחות

## 🏆 הישגים

- ✅ **MVP מלא** - כל התכונות הבסיסיות
- ✅ **עיצוב מקצועי** - ברמת EranFixer
- ✅ **SEO מושלם** - אופטימיזציה מלאה
- ✅ **רספונסיביות** - עובד על כל המכשירים
- ✅ **ביצועים** - טעינה מהירה וחלקה

---

**פותח בגאווה על ידי [EranFixer](https://eran-fixer.com) 🚀**

*כלים חכמים לעידן הדיגיטלי - מערכות מודולריות, SEO מתקדם, פתרונות AI*
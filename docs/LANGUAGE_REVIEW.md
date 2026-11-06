# Language review

All hi / mr strings in `src/i18n.ts`, `src/questions.ts` and the `copy` table in `src/App.tsx` were written by an AI assistant and have **not** been reviewed by a native speaker. Please check tone, spelling and terminology.

## Review pass, 6 Nov 2026 (AI, not a native speaker)

Every Hindi and Marathi string in `src/i18n.ts`, `src/i18nStaff.ts` and `src/questions.ts` (874 rows) was checked
mechanically (placeholders, untranslated English, Hindi words inside Marathi) and then read by hand. 35 errors were
fixed, for example:

- Marathi gender and case: "माझ्या तक्राराचा" → "माझ्या तक्रारीचा", "उघडी मॅनहोल" → "उघडे मॅनहोल",
  "तक्रारी लोड होऊ शकले नाहीत" → "शकल्या नाहीत"
- wrong words: "द्विरुक्ती" (word repetition) → "दुहेरी" for a duplicate complaint; "मध्यम दिवस" (medium days) →
  "लागलेले दिवस (मध्यगा)" for the median; "सुझाव" (Hindi) → "सूचना" in Marathi
- a broken word left by an old find-and-replace: "भरोसाार्ह" → "विश्वासार्ह"
- Hindi grammar: "आपका घर का क्षेत्र" → "आपके घर का क्षेत्र", "से पहले" → "सेकंड पहले" for "s ago"
- labels that broke when followed by a name: "श्रेणी बदलकर करें {category}" → "श्रेणी बदलें: {category}"
- incomplete Marathi questions: "हे प्राधान्य का" → "हे प्राधान्य का दिले"

No placeholders are missing and no sentence is left in English (technical names such as PostGIS and Chrome stay as
they are). **A native Hindi speaker and a native Marathi speaker should still read the screens**, because tone and
the most natural word choice are beyond what this pass can judge.

Newest drafts (this change), in `src/i18n.ts`:

- My reports: keys `rpOnlyYours` ... `rpLoading`
- Status and severity names: `st_Reported`, `st_UnderReview`, `st_InProgress`, `st_Resolved`, `sev_Low` ... `sev_Critical`
  (check "दर्ज / नोंदवले", "हल हुआ / निराकरण झाले")
- Community: keys `cmChoose` ... `cmNoLocation`

Not yet translated (English only): Auth page, Profile details, FAQ, reply box, authority and admin screens (officers, by decision).

Check: `node scripts/check-i18n.mjs` (empty strings and key parity only; it cannot judge translation quality).

Also drafted in this round: profile menu (`pf_*`), contribution labels (`resolvedCount`, `confirmsReceived`, `levelContributor`, `levelTrusted`), `pfEyebrow`, `pfIntro`, `photoNotAnalysed`, and the reworded `noImageModel`.

Landing category cards: `catd_pothole` ... `catd_other`, `catReport`, `catEyebrow`.

---


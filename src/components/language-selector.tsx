import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const languages = {
  "ar-SA": "Arabic",
  "bn-IN": "Bengali",
  "cs-CZ": "Czech",
  "da-DK": "Danish",
  "de-DE": "German",
  "el-GR": "Greek",
  "en-US": "English (US)",
  "en-GB": "English (UK)",
  "es-ES": "Spanish",
  "fi-FI": "Finnish",
  "fr-FR": "French",
  "hi-IN": "Hindi",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "ko-KR": "Korean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "pl-PL": "Polish",
  "pt-BR": "Portuguese (Brazil)",
  "pt-PT": "Portuguese (Portugal)",
  "ru-RU": "Russian",
  "sv-SE": "Swedish",
  "th-TH": "Thai",
  "tr-TR": "Turkish",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
} as const

type LanguageCode = keyof typeof languages

interface LanguageSelectorProps {
  value: LanguageCode
  onChange: (value: LanguageCode) => void
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


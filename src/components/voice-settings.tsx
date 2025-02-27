import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VoiceSettingsProps {
  speed: number
  pitch: number
  volume: number
  gender: "MALE" | "FEMALE" | "NEUTRAL"
  onSpeedChange: (value: number) => void
  onPitchChange: (value: number) => void
  onVolumeChange: (value: number) => void
  onGenderChange: (value: "MALE" | "FEMALE" | "NEUTRAL") => void
}

export function VoiceSettings({
  speed,
  pitch,
  volume,
  gender,
  onSpeedChange,
  onPitchChange,
  onVolumeChange,
  onGenderChange,
}: VoiceSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Voice Gender</Label>
        <Select value={gender} onValueChange={onGenderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select voice gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="NEUTRAL">Neutral</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Speaking Speed ({speed}x)</Label>
        <Slider value={[speed]} onValueChange={([value]) => onSpeedChange(value)} min={0.25} max={4} step={0.25} />
      </div>

      <div className="space-y-2">
        <Label>Pitch ({pitch})</Label>
        <Slider value={[pitch]} onValueChange={([value]) => onPitchChange(value)} min={-20} max={20} step={1} />
      </div>

      <div className="space-y-2">
        <Label>Volume ({volume}%)</Label>
        <Slider value={[volume]} onValueChange={([value]) => onVolumeChange(value)} min={0} max={100} step={1} />
      </div>
    </div>
  )
}


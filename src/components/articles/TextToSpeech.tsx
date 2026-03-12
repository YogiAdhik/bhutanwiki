"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, Square, Pause, Play } from "lucide-react"

interface TextToSpeechProps {
  /** HTML content to read aloud (HTML tags will be stripped) */
  content: string
}

/**
 * Text-to-speech button that reads article content aloud using
 * the browser's native SpeechSynthesis API.
 */
export default function TextToSpeech({ content }: TextToSpeechProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window)
  }, [])

  // Cancel speech on unmount or navigation
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const stripHtml = useCallback((html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }, [])

  const handleListen = useCallback(() => {
    if (!isSupported) return

    const plainText = stripHtml(content)
    if (!plainText.trim()) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(plainText)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.lang = "en-US"

    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
    setIsPaused(false)
  }, [content, isSupported, stripHtml])

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }, [])

  const handlePauseResume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } else {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }, [isPaused])

  if (!isSupported) return null

  return (
    <div className="inline-flex gap-1">
      {!isSpeaking ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleListen}
          aria-label="Listen to this article"
        >
          <Volume2 className="mr-1 h-3.5 w-3.5" />
          Listen
        </Button>
      ) : (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePauseResume}
            className="border-[#7B1E3A]/30 bg-[#7B1E3A]/5 text-[#7B1E3A] hover:bg-[#7B1E3A]/10 hover:text-[#5a1530]"
            aria-label={isPaused ? "Resume reading" : "Pause reading"}
          >
            {isPaused ? (
              <>
                <Play className="mr-1 h-3.5 w-3.5" />
                Resume
              </>
            ) : (
              <>
                <Pause className="mr-1 h-3.5 w-3.5" />
                Pause
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleStop}
            className="border-[#7B1E3A]/30 bg-[#7B1E3A]/5 text-[#7B1E3A] hover:bg-[#7B1E3A]/10 hover:text-[#5a1530]"
            aria-label="Stop reading"
          >
            <Square className="mr-1 h-3.5 w-3.5" />
            Stop
          </Button>
        </>
      )}
    </div>
  )
}

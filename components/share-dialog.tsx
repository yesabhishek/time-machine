// components/share-dialog.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ShareDialogProps {
    age: number
    message: string
}

export function ShareDialog({ age, message }: ShareDialogProps) {
    const [copied, setCopied] = useState(false)

    const shareText = `I am ${age} years old. ${message}`
    const shareUrl = "https://age-calculator.com" // Replace with your actual URL

    const handleCopy = () => {
        navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareLinks = [
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "Facebook",
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share your age</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-center gap-4">
                        {shareLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant="outline"
                                size="icon"
                                className="h-12 w-12 rounded-full"
                                onClick={() => window.open(link.url, "_blank")}
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="sr-only">Share on {link.name}</span>
                            </Button>
                        ))}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            value={shareText}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        />
                        <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1 h-6"
                            onClick={handleCopy}
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { voiceDetails } from "@/constants"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnails from "@/components/GenerateThumbnails"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"


const formSchema = z.object({
    podcastTitle: z.string().min(2, {
        message: "Podcast Title must be at least 2 characters.",
    }),
    podcastDescription: z.string().min(2, {
        message: "Podcast Description must be at least 2 characters.",
    }),
})

const CreatePodcast = () => {
    const [isSubmitting, setisSubmitting] = useState(false)
    const [voiceType, setvoiceType] = useState<string | null>(null)
    const [imageUrl, setimageUrl] = useState('')
    const [imagePrompt, setimagePrompt] = useState('')
    const [audioUrl, setaudioUrl] = useState('')
    const [audioStorageId, setaudioStorageId] = useState<Id<"_storage"> | null>(null)
    const [imageStorageId, setimageStorageId] = useState<Id<"_storage"> | null>(null)
    const [audioDuratioin, setaudioDuratioin] = useState(0)
    const [voicePrompt, setvoicePrompt] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            podcastTitle: "",
            podcastDescription: "",

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <section className="mt-10 flex flex-col">
            <h1 className="text-20 font-bold capitalize text-white-1">create podcast</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
                    <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
                        <FormField
                            control={form.control}
                            name="podcastTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                                    <FormControl>
                                        <Input className="input-class focus-visible:ring-offset-orange-1" placeholder="Josiah Podcast" {...field} />
                                    </FormControl>

                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2.5">
                            <Label className="text-16 font-bold text-white-1">Select AI Voice</Label>
                            <Select onValueChange={(value) => setvoiceType(value)}>
                                <SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1')}>
                                    <SelectValue placeholder="Select AI Voice" className="placeholder:text-gray-1" />
                                </SelectTrigger>
                                <SelectContent className="text-16 border-none bg-black-1 font-bold focus:ring-orange-1 text-white-1">
                                    {voiceDetails.map((category) => (
                                        <SelectItem key={category.id} value={category.name} className="capitalize focus:bg-orange-1">
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                {voiceType && (
                                    <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
                                )}
                            </Select>
                        </div>

                        <FormField
                            control={form.control}
                            name="podcastDescription"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-2.5">
                                    <FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write a podcast description" {...field} />
                                    </FormControl>

                                    <FormMessage className="text-white-1" />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex flex-col pt-10">
                        <GeneratePodcast
                            setAudioStorageId={setaudioStorageId}
                            setAudio={setaudioUrl}
                            voiceType={voiceType}
                            audio={audioUrl}
                            voicePrompt={voicePrompt}
                            setAudioDuration={setaudioDuratioin}
                            setVoicePrompt={setvoicePrompt}
                        />
                        <GenerateThumbnails />

                        <div className="mt-10 w-full">
                            <Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold capitalize text-white-1 transition-all duration-500 hover:bg-black-1">
                                {isSubmitting ? (
                                    <>
                                        Submitting
                                        <Loader size={20} className="animate-spin ml-2" />

                                    </>
                                ) : (
                                    'Submit & Publish Podcast'
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>

    )
}

export default CreatePodcast
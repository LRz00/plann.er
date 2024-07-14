import { Calendar, MapPin, Settings2, ArrowRight, X } from "lucide-react"
import { Button } from "../../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";
import {format} from 'date-fns'

interface DestinationAndDateProps {
    isGuestInputOpen: boolean
    closeGuestInput: () => void
    openGuestInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndEnd: (dates: DateRange | undefined) => void
    eventStartAndend: DateRange | undefined
}

export function DestinationAndDateStep(props: DestinationAndDateProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    

    const displayedDate = props.eventStartAndend && props.eventStartAndend.from && props.eventStartAndend.to
    ? format(props.eventStartAndend.from, "d ' de ' LLL ").concat('até ').concat(format(props.eventStartAndend.to, "d ' de ' LLL")) : null;

    function openDatePicker() {
        setIsDatePickerOpen(true)
    }

    function closeDatePicker() {
        setIsDatePickerOpen(false)
    }

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input disabled={props.isGuestInputOpen} 
                type="text" placeholder="Para onde você vai?" 
                onChange={event => props.setDestination(event.target.value)}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none w-full" />
            </div>

            <button onClick={openDatePicker} disabled={props.isGuestInputOpen} className=" flex items-center gap-2 text-left w-[240px]">
                <Calendar className="size-5 text-zinc-400" />
                <span className="text-lg text-zinc-400 w-40 flex-1" >
                    {displayedDate || "Quando"}
                </span>
            </button>
            {isDatePickerOpen && (

                <div className="fixed inset-0 bg-black/68 flex items-center justify-center">
                    <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Selecione a data</h2>
                                <button onClick={closeDatePicker}>
                                    <X className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        </div>

                        <DayPicker mode="range" selected={props.eventStartAndend} onSelect={props.setEventStartAndEnd} />

                    </div>
                </div>
            )}

            <div className="w-px h-6 bg-zinc-800" />

            {props.isGuestInputOpen ? (
                <Button onClick={props.closeGuestInput} variant="secondary" >
                    Alterar data/local
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={props.openGuestInput} variant="primary" >
                    Continuar
                    <ArrowRight className="size-5" />
                </Button>

            )}
        </div>
    )
}
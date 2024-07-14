import { CircleDashed, UserCog, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}//check api response format

export function GuestList() {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<Participant[] | undefined>();

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibild text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants?.map((participant, index) => {
                    return (
                        <div key={participant.id} className="flex items-cente justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                                <span className="block text-sm text-zinc-400 truncate">
                                    {participant.email}
                                </span>
                            </div>
                            {participant.is_confirmed ? (
                                <CheckCircle2 className="text-lime-400 size-5 shrink-0" />
                            ) : (
                                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                            )}
                        </div>
                    )
                })}

            </div>
            <Button type="submit" variant="secondary" size="full">
                <UserCog className="size-5" />
                Gerenciar Convidados
            </Button>
        </div>
    )

}
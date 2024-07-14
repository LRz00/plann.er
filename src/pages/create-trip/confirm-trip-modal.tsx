import { User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
    closeConfirmTripModal: () => void,
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (ownerName: string) => void,
    setOwnerEmail: (ownerEmail: string) => void
}

export function ConfirmTripModal(props: ConfirmTripModalProps) {
    return (
        <div className="fixed inset-0 bg-black/68 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                        <button onClick={props.closeConfirmTripModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>
                    </div>
                    <p className="text-sm text-zinc-400">Para concluir a viagem para <span className="font-semibold text-zinc-100">Florianopolis </span>
                        nas datas de <span className="font-semibold text-zinc-100">16 a 17 de Agosto</span> preencha seus dados abaixo</p>
                </div>

                <form onSubmit={props.createTrip} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            onChange={event => props.setOwnerName(event.target.value)}
                            type="text"
                            name="name" placeholder="Seu nome completo"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none w-full" />
                    </div>

                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <User className="text-zinc-400 size-5" />
                        <input
                            onChange={event => props.setOwnerEmail(event.target.value)}
                            type="email"
                            name="personalEmail" placeholder="Seu e-mail pessoal"
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none w-full" />
                    </div>

                    <Button type="submit" variant="primary" size="full" >
                        Confiar criação da viagem
                    </Button>
                </form>
            </div>
        </div>
    )

}
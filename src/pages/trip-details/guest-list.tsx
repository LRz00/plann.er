import { CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";

export function GuestList() {
    return (
        <div className="space-y-6">
            <h2 className="font-semibild text-xl">Convidados</h2>
            <div className="space-y-5">
                <div className="flex items-cente justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Momo Hirai</span>
                        <span className="block text-sm text-zinc-400 truncate">
                            hiraimomo@jype.com
                        </span>
                    </div>
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-cente justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Alicent Hightower</span>
                        <span className="block text-sm text-zinc-400 truncate">
                            alicenthightower@westeros.com
                        </span>
                    </div>
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>
            <Button type="submit" variant="secondary" size="full">
                <UserCog className="size-5" />
                Gerenciar Convidados
            </Button>
        </div>
    )

}
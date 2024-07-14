import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guest-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date'
import { InviteGuestsStep } from './steps/invite-guests'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [emailsToInvite, setEmailsToInvite] = useState([
        'exlp@email.com'
    ])
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const[eventStartAndend, setEventStartAndEnd] = useState<DateRange |undefined>();

    function openGuestInput() {
        setIsGuestInputOpen(true);
    }

    function closeGuestInput() {
        setIsGuestInputOpen(false);
    }

    function openGuestModal() {
        setIsGuestModalOpen(true);
    }

    function closeGuestModal() {
        setIsGuestModalOpen(false);
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true);
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false);
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email) {
            return;
        }
        if (emailsToInvite.includes(email)) {
            return;
        }

        setEmailsToInvite(prevEmails => [
            ...prevEmails,
            email
        ]);

        event.currentTarget.reset();
    }

    function removeEmailToInvite(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove);
        setEmailsToInvite(newEmailList);
    }

   async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault;
        if(!destination){
            return;
        }
        if(!eventStartAndend?.from || !eventStartAndend.to){
            return;
        }
        if(emailsToInvite.length == 0){
            return;
        }
        if(!ownerEmail || !ownerName){
            return;
        }

//see backend api documentation for proper object form
       const response = await api.post('/trips',{
            destination: destination,
            starts_at: eventStartAndend.from,
            ends_at: eventStartAndend.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            ownerEmail: ownerEmail
        })

        const {tripId} = response.data
        navigate(`/trips/${tripId}`);
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem</p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep 
                        closeGuestInput={closeGuestInput}
                        openGuestInput={openGuestInput}
                        isGuestInputOpen={isGuestInputOpen}
                        setDestination={setDestination}
                        setEventStartAndEnd={setEventStartAndEnd}
                        eventStartAndend={eventStartAndend}
                    />

                    {isGuestInputOpen && (
                       <InviteGuestsStep 
                        openConfirmTripModal={openConfirmTripModal}
                        openGuestModal={openGuestModal}
                        emailsToInvite={emailsToInvite}
                       />
                       )}
                </div>


                <p className="text-sm text-zinc-500">Ao planejas suas viagens pela plann.er você automaticamente concorda <br />
                    com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">politica de privacidade</a></p>
            </div>

            {isGuestModalOpen && (
                <InviteGuestsModal
                    emailsToInvite={emailsToInvite}
                    addNewEmailToInvite={addNewEmailToInvite}
                    closeGuestModal={closeGuestModal}
                    removeEmailToInvite={removeEmailToInvite}
                />
            )}

            {isConfirmTripModalOpen && (
               <ConfirmTripModal 
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip ={createTrip}
                    setOwnerName = {setOwnerName}
                    setOwnerEmail ={setOwnerEmail}
               />
            )}

        </div>
    )
}


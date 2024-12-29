interface TicketModalProps {
    isOpen: boolean
    onClose: () => void
    ticketUrl: string
}

const TicketModal = ({ isOpen, onClose, ticketUrl }: TicketModalProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative w-full h-[80vh] max-w-4xl bg-white rounded-lg">
                <iframe
                    src={ticketUrl}
                    className="w-full h-full rounded-lg"
                    title="Купить билет"
                />
            </div>
        </div>
    )
}

export default TicketModal

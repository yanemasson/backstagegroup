import ScriptRenderer from "./ScriptRenderer.tsx";

interface TicketModalProps {
    isOpen: boolean
    onClose: () => void
    script?: string
}

const TicketModal = ({ isOpen, onClose, script }: TicketModalProps) => {
    if (!isOpen || !script) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="relative w-full h-[80vh] max-w-4xl bg-white rounded-lg">
                <ScriptRenderer scriptContent={script} />
            </div>
        </div>
    )
}

export default TicketModal

import type {Match} from "@/lib/schemas/matchSchema";

interface MatchEventSideProps {
    label: string;
}


export default function MatchEventInfo ({label }: MatchEventSideProps) {
    return (
        <div className="text-center">
            <p>{label}</p>
        </div>
    );
}
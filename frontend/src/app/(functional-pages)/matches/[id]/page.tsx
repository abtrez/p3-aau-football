import TeamLogo from "@/components/match/MatchEventRow";
import MatchEventRow from "@/components/match/MatchEventRow";
import matchEvents from "@/data/matchEvents.json";
import MatchEventsList from "@/components/match/MatchEventsList";
import {useParams} from "next/navigation";
import {fetchMatchById} from "@/lib/fetchMatch";
import type {Match} from "@/lib/schemas/matchSchema";

export default async function Page() {
    const params = useParams();

    const id = params.id;

    const match: Match = await fetchMatchById(id);

    return (


        <MatchEventsList matchEvents={matchEvents}/>
    );
}
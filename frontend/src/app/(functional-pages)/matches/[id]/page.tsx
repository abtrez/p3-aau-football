"use client"
import TeamLogo from "@/components/match/MatchEventRow";
import MatchEventRow from "@/components/match/MatchEventRow";
import matchEvents from "@/data/matchEvents.json";
import MatchEventsList from "@/components/match/MatchEventsList";
import {useParams} from "next/navigation";
import {fetchMatchById} from "@/lib/fetchMatch";
import type {Match} from "@/lib/schemas/matchSchema";

export default async function Page(){

    const {id} = useParams();

    const match: Match = await fetchMatchById(id as string);

    return (
        <div>
            <p>{match.id}</p>

            <MatchEventsList matchEvents={matchEvents}/>

        </div>
    );
}

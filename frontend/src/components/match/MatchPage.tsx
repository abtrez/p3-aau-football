"use client"

import {Match} from "@/lib/schemas/matchSchema";
import {useState} from "react";
import MatchEventsList from "@/components/match/MatchEventsList";
import {CreateMatchEventForm} from "@/components/match/CreateMatchEventForm";
import {createMatchEvents, deleteMatchEvent, updateMatchEvent} from "@/lib/fetchMatchEvent";
import {MatchEventRequest, MatchEventResponse} from "@/lib/schemas/matchEventSchema";

interface MatchPageProps {
    initialMatch: Match
}
//Owns match state, calls server actions, owns interaction
export default function MatchPage( { initialMatch } : MatchPageProps) {
    const [match, setMatch] = useState<Match>(initialMatch)
    const {homeTeam, awayTeam } = match;

    /** Create Handler: new Match Event*/
    async function handleCreateMatchEvent(dto: MatchEventRequest) {
        const updatedMatch = await createMatchEvents({
            matchId: match.id,
            events: [dto]
        });

        //Update local state with updated events list from backend
        setMatch(updatedMatch)

    }

    /** Update Handler: existing Match Event*/
    async function handleUpdateMatchEvent(eventId: string, dto: MatchEventRequest) {

        const updatedMatch = await updateMatchEvent({
            matchId: match.id,
            eventId: eventId,
            event: dto,
        });

        //Update local state with updated events list from backend
        setMatch(updatedMatch)
    }

    /** Delete Handler: existing Match Event */
    async function handleDeleteMatchEvent(eventId: string) {
        //Call server action to send request to backend
        const updatedMatch = await deleteMatchEvent({matchId: match.id, eventId: eventId});

        //Update local state with updated events list from backend
        setMatch(updatedMatch)
    }


    return(
        <div className="text-center">
            {/*TODO: Extract to MatchHeader component */}
            <h1>Match with id: {match.id}</h1>
            <p>
                {match.homeTeam.name} vs {match.awayTeam.name}
            </p>

            <p>
                {match.homeScore} - {match.awayScore}
            </p>

            <MatchEventsList
                events={match.matchEvents as MatchEventResponse[]}
                homeTeamId = {homeTeam.id}
                awayTeamId={awayTeam.id}
                onDeleteEvent={handleDeleteMatchEvent}
                onUpdateEvent={handleUpdateMatchEvent}
            />

            <CreateMatchEventForm
                homeTeamId={homeTeam.id}
                awayTeamId={awayTeam.id}
                onSubmit={handleCreateMatchEvent}
            />
        </div>
    );

}
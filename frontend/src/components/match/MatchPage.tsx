"use client"

import {Match} from "@/lib/schemas/matchSchema";
import {useState} from "react";
import MatchEventsList from "@/components/match/event/MatchEventsList";
import {CreateMatchEventForm} from "@/components/match/event/CreateMatchEventForm";
import {createMatchEvents, deleteMatchEvent, updateMatchEvent} from "@/lib/fetchMatchEvent";
import {MatchEventRequest, MatchEventResponse} from "@/lib/schemas/matchEventSchema";
import {Person} from "@/lib/schemas/personSchema";
import { useMemo } from 'react';
import {Fab, SwipeableDrawer} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface MatchPageProps {
    initialMatch: Match;
    homePlayers: Person[];
    awayPlayers: Person[];
}
//Owns match state, calls server actions, passes data and callbacks to presentational components
export default function MatchPage( {
    initialMatch,
    homePlayers,
    awayPlayers
   } : MatchPageProps) {
    const [match, setMatch] = useState<Match>(initialMatch)
    const {homeTeam, awayTeam } = match;
    const [addEventOpen, setAddEventOpen] = useState(false);

    /** Player data: prepare, memoize('useMemo' cashes computation across renders),
     * updated only if player lists change (dependency array)*/

        //Player selectors: teamId -> players[]
    const playersByTeamId = useMemo<Record<string, Person[]>>(
        ()=> ({
            [homeTeam.id]: homePlayers,
            [awayTeam.id]: awayPlayers,
        })
        ,[homeTeam.id, awayTeam.id, homePlayers, awayPlayers] //Dependency array
    );

    //Event list presentation : playerId -> Person
    const playersById = useMemo(
        ()=> {
            //lookup object, contains all from both teams
            const map: Record<string, Person> = {};

            [...homePlayers, ...awayPlayers].forEach(
                player => map[player.id] = player
            );
            return map;
        }
        , [homePlayers, awayPlayers]
    );

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
                playersById={playersById} //for displaying names
                playersByTeamId={playersByTeamId} //for edit form player selectors
                onDeleteEvent={handleDeleteMatchEvent}
                onUpdateEvent={handleUpdateMatchEvent}
            />

            <Fab
                color="primary"
                aria-label="add"
                onClick={()=>setAddEventOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: 75,
                    right: 16,
                }}
            >
                <AddIcon />
            </Fab>

            <SwipeableDrawer
                anchor="bottom"
                open={addEventOpen}
                onClose={() => setAddEventOpen(false)}
                onOpen={() => setAddEventOpen(true)}
            >
                <div style={{ padding: 24 }}>
                    <h2>Add Event</h2>

                    <CreateMatchEventForm
                        homeTeamId={homeTeam.id}
                        awayTeamId={awayTeam.id}
                        playersByTeamId={playersByTeamId} //for player selectors
                        onSubmit={handleCreateMatchEvent}
                    />
                </div>
            </SwipeableDrawer>
        </div>
    );

}
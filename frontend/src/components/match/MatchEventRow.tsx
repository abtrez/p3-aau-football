import TeamBadge from "@/components/team/TeamBadge";
import {MatchEvent} from "@/lib/schemas/matchEventSchema";
import MatchEventSide from "@/components/match/MatchEventSide";

export interface MatchEventRowProps {
  matchEvent: MatchEvent;
  isHomeTeamEvent: boolean;
}

export default function MatchEventRow({ matchEvent, isHomeTeamEvent}: MatchEventRowProps) {
    const minuteLabel = matchEvent.minute != null ? `${matchEvent.minute}'` : "";
    const text = `${matchEvent.type} ${matchEvent.teamId}`;

    const leftContent = isHomeTeamEvent ? text : minuteLabel;
    const rightContent = isHomeTeamEvent ? minuteLabel : text;


    return (
    <div className=" p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/*left */}
        <MatchEventSide label={leftContent}/>

          {/*icon */}
        <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
          <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
            ICON
          </span>
        </div>

          {/*right make MatchEventInfo component*/}
        <MatchEventSide label={rightContent}/>
      </div>
    </div>
  );
}

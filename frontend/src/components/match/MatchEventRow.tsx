import TeamBadge from "@/components/team/TeamBadge";
import {MatchEvent} from "@/lib/schemas/matchEventSchema";
import MatchEventInfo from "@/components/match/MatchEventInfo";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export interface MatchEventRowProps {
  matchEvent: MatchEvent;
  isHomeTeamEvent: boolean;
  onDelete: (eventId: string) => void;
}

export default function MatchEventRow({
    matchEvent,
    isHomeTeamEvent,
    onDelete
}: MatchEventRowProps) {

    const minuteLabel = matchEvent.minute != null ? `${matchEvent.minute}'` : "";
    const text = `${matchEvent.type} ${matchEvent.teamId}`;

    const leftContent = isHomeTeamEvent ? text : minuteLabel;
    const rightContent = isHomeTeamEvent ? minuteLabel : text;


    return (
    <div className=" p-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/*left */}
        <MatchEventInfo label={leftContent}/>

          {/*icon */}
        <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
          <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
            ICON
          </span>
        </div>

          {/*right make MatchEventInfo component*/}
        <MatchEventInfo label={rightContent}/>

        <IconButton aria-label="delete" onClick={() => onDelete("" + matchEvent.id)}>
              <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

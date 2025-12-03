import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {MatchEventView} from "@/components/match/event/MatchEventsList";

export interface MatchEventRowProps {
  viewModel: MatchEventView;
  onEdit: () => void;
  onDelete: (eventId: string) => void;
}

export default function MatchEventRow({
    viewModel,
    onEdit,
    onDelete
}: MatchEventRowProps) {

    //Destructure
    const {
        id,
        isHomeTeamEvent,
        minuteLabel,
        primaryText,
        secondaryText,
        iconLabel,
    } = viewModel;

    // Prebuild the UI, determine placement in expression based on homEvent
    const eventContent = (
        <div className="text-center">
            <p className="text-sm font-medium">{primaryText}</p>
            {secondaryText && ( <p className="text-xs text-gray-500">{secondaryText}</p>)}
        </div>
    );

    const minuteContent = (
        <div className="text-center">
            <p className="text-xs font-semibold text-gray-500"> {minuteLabel} </p>
        </div>
    );

    return (
    <div className=" p-4">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_auto] items-center gap-2">

        {/*Left event info */}
        {isHomeTeamEvent ? eventContent : minuteContent}

          {/*icon */}
        <div className="flex flex-col items-center justify-center gap-1 text-gray-500">
          <span className="px-4 text-sm font-semibold text-gray-500 justify-self-center">
            {iconLabel}
          </span>
        </div>

        {/*right  event info */}
        {isHomeTeamEvent ? minuteContent : eventContent}

        {/* Edit button */}
        <IconButton aria-label="edit"
            onClick={() => onEdit()}
        >
              <EditIcon />
        </IconButton>

        {/* Delete button */}
        <IconButton aria-label="delete"
                    onClick={() => onDelete(id)}
        >
              <DeleteIcon />
        </IconButton>

      </div>
    </div>
  );
}

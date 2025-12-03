
interface MatchHeaderProps {
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number;
    awayScore: number;
}

export default function MatchHeader ({
    homeTeamName,
    awayTeamName,
    homeScore,
    awayScore
}: MatchHeaderProps ){
    return (
        <div>
            <h1>{homeTeamName} vs {awayTeamName}</h1>

            <h2> {homeScore} - {awayScore} </h2>
        </div>
    );
}
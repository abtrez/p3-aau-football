/*import dummyMatches from "@/data/matches.json";

const matches = dummyMatches as MatchCardInterface[];*/

"use client"

import {fetchMatchOverview} from "@/lib/fetchMatch";
import MatchCard, { MatchCardInterface } from "@/components/match/MatchCard";
import {useState, useEffect} from "react";

//const footballMatches = mathes as MatchCardInterface[];

export default function MatchOverview() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchMatchOverview()
            .then((data) => {
                setData(data)
                setIsLoading(false)
            });
    }, []);
  
    if (isLoading) return <p>Is Loading</p>;
    console.log(data);
    return (
    <div className="grid gap-4">
      {data.map((m: MatchCardInterface) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}

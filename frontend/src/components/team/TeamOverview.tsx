"use client"
//import teams from "@/data/teams.json";
import {fetchTeams} from "@/lib/fetchTeam";
import TeamCard, { TeamCardInterface } from "@/components/team/TeamCard";
import {useState, useEffect} from "react";

//const footballTeams = teams as TeamCardInterface[];

export default function TeamOverview() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchTeams()
            .then((data) => {
                setData(data)
                setIsLoading(false)
            });
        console.log("hello");
    }, []);

    if (isLoading) return <p>Is Loading</p>;
    console.log(data);
    return (
    <div className="grid gap-4">
      {data.map((t: TeamCardInterface) => (
        <TeamCard key={t.id} team={t} />
      ))}
    </div>
  );
}

package p3.group.p3_aau_football.match;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "matches")
public class Match {

    @Id
    private String id;

    private String homeTeam;
    private String awayTeam;

    private String Date;
    private String Venue;
    private Boolean Cancel;
    private Boolean cancel = false;
    private Boolean wasUpdated = false;
    private String lastUpdated;

    public Match(String homeTeam, String awayTeam) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    public String getHomeTeam() {
        return this.homeTeam;
    }

    public String getAwayTeam() {
        return this.awayTeam;
    }

    public String getId() {
        return this.id;
    }

    public void setDate(String date) {
        this.Date = date;
    }

    public void setVenue(String venue) {
        this.Venue = venue;
    }

    public void setCancel(Boolean cancel) {
        this.Cancel = cancel;
    }

    public void setWasUpdated(Boolean wasUpdated) {
        this.wasUpdated = wasUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

}

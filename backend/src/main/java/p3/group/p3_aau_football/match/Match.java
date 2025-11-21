package p3.group.p3_aau_football.match;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "matches")
public class Match {

    @Id
    private String id;

    private String homeTeam;
    private String awayTeam;

    private String date;
    private String venue;
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

    public String getDate() {
        return date;
    }

    public String getVenue() {
        return venue;
    }

    public Boolean getCancel() {
        return cancel;
    }

    public Boolean getWasUpdated() {
        return wasUpdated;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public void setCancel(Boolean cancel) {
        this.cancel = cancel;
    }

    public void setWasUpdated(Boolean wasUpdated) {
        this.wasUpdated = wasUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

}

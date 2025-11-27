package p3.group.p3_aau_football.match;

public class MatchEditRequest {

    private String date;
    private Venue venue;
    private Boolean cancel;

    public MatchEditRequest() {
    }

    public MatchEditRequest(String date, Venue venue, Boolean cancel) {
        this.date = date;
        this.venue = venue;
        this.cancel = cancel;

    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public Boolean getCancel() {
        return cancel;
    }

    public void setCancel(Boolean cancel) {
        this.cancel = cancel;
    }
}

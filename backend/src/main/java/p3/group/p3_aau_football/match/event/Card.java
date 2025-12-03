package p3.group.p3_aau_football.match.event;

public class Card extends MatchEvent {
    private CardType cardType;

    public Card() { super(); }

    public Card(String teamId, String playerId, Integer minute, CardType cardType) {
        super(teamId, playerId, minute);
        this.cardType = cardType;
    }

    public CardType getCardType(){
        return this.cardType;
    }
    public void setCardType(CardType cardType) {
        this.cardType = cardType;
    }
}

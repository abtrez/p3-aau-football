package p3.group.p3_aau_football.match.event;

public class CardEventRequestMapper implements MatchEventRequestMapper<CardEventRequestDTO, Card> {

    @Override
    public Card toModel(CardEventRequestDTO dto) {
        //return new card, instead of the switch
        return new Card();
    }

    @Override
    public Class<Card> targetType() {
        return Card.class;
    }
}

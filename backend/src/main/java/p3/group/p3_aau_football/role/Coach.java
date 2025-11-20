package p3.group.p3_aau_football.role;

import p3.group.p3_aau_football.permission.Permission;

public class Coach extends Role implements Permission {

    private Boolean isAssistant;

    public Coach() {
    }

    public Coach(Boolean isAssistant) {
        this.isAssistant = isAssistant;
    }

    public Boolean getIsAssistant() {
        return this.isAssistant;
    }

    public void setIsAssistant(Boolean isAssistant) {
        this.isAssistant = isAssistant;
    }
}

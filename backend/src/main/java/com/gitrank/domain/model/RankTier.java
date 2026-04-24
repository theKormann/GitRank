public enum RankTier {
    S_PLUS("S+"), S("S"), A_PLUS("A+"), A("A"),
    B_PLUS("B+"), B("B"), C("C"), D("D"), F("F");

    private final String label;

    RankTier(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static RankTier calculateTier(double score) {
        if (score >= 95) return S_PLUS;
        if (score >= 90) return S;
        if (score >= 85) return A_PLUS;
        if (score >= 80) return A;
        if (score >= 75) return B_PLUS;
        if (score >= 70) return B;
        if (score >= 60) return C;
        if (score >= 50) return D;
        return F;
    }
}
package com.gitrank.domain.model;

import java.util.*;

public record GitRankResult(
        int finalScore,
        String level,
        List<String> insights
) {}

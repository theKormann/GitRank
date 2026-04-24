package com.gitrank.domain.model;

import java.util.List;
import java.util.Map;

public record GitRankResult(
    int finalScore,
    String level,
    List<String> insights,
    String summary,
    int totalRepos,
    int totalStars,
    int totalCommits,
    List<Badge> badges, 
    Map<String, Double> languages,
    String memberSince
) {}
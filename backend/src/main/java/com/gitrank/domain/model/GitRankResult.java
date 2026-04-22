package com.gitrank.domain.model;

import java.util.List;

public record GitRankResult(
    int finalScore,
    String level,
    List<String> insights,
    String summary,      
    int totalRepos,      
    int totalStars,      
    int totalCommits     
) {}
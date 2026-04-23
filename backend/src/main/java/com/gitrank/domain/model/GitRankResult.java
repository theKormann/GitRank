package com.gitrank.domain.model;
import java.util.List;
import java.util.Map;

public record GitRankResult(
        int finalScore,
        String level,
        List<String> insights,
        String summary,
        Integer totalRepos,
        Integer totalStars,
        Integer totalCommits,
        List<String> badges,
        Map<String, Double> languages,
        String memberSince
) {}
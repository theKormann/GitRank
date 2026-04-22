package com.gitrank.domain.model;

public record RepositoryData(
        String name,
        boolean isFork,
        boolean hasDescription,
        int topicCount,
        String readmeContent,
        int totalCommits
) {}

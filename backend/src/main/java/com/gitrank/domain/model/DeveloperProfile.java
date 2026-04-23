package com.gitrank.domain.model;

import java.util.List;

public record DeveloperProfile(
        String username,
        String createdAt,
        List<RepositoryData> repositories
) {}

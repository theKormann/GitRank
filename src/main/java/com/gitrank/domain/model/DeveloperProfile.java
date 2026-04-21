package com.gitrank.domain.model;

import java.util.List;

public record DeveloperProfile(
        String username,
        List<RepositoryData> repositories
) {}

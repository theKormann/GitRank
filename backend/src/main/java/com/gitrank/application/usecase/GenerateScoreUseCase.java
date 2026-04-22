package com.gitrank.application.usecase;

import com.gitrank.domain.model.DeveloperProfile;
import com.gitrank.domain.model.GitRankResult;
import com.gitrank.domain.service.GitRankCalculatorService;
import com.gitrank.infrastructure.client.GitHubGraphQLAdapter;
import org.springframework.stereotype.Service;

@Service
public class GenerateScoreUseCase {

    private final GitHubGraphQLAdapter gitHubClient;
    private final GitRankCalculatorService calculatorService;

    public GenerateScoreUseCase(GitHubGraphQLAdapter gitHubClient, GitRankCalculatorService calculatorService) {
        this.gitHubClient = gitHubClient;
        this.calculatorService = calculatorService;
    }

    public GitRankResult execute(String username) {
        DeveloperProfile profile = gitHubClient.fetchDeveloperProfile(username);
        return calculatorService.calculate(profile);
    }
}
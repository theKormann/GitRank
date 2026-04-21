package com.gitrank.domain.service;

import com.gitrank.domain.model.DeveloperProfile;
import com.gitrank.domain.model.GitRankResult;
import com.gitrank.domain.model.RepositoryData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GitRankCalculatorService {

    public GitRankResult calculate(DeveloperProfile profile) {
        List<RepositoryData> originalRepos = profile.repositories().stream()
                .filter(repo -> !repo.isFork())
                .toList();

        if (originalRepos.isEmpty()) {
            return new GitRankResult(0, "Inativo", List.of("Nenhum repositório original público encontrado."));
        }

        double totalScore = 0;
        List<String> insights = new ArrayList<>();

        for (RepositoryData repo : originalRepos) {
            totalScore += calculateDocumentationScore(repo);
            totalScore += calculateOrganizationScore(repo);
            totalScore += calculateActivityScore(repo);
        }

        int finalScore = (int) Math.round(totalScore / originalRepos.size());

        generateInsights(finalScore, insights);

        return new GitRankResult(finalScore, determineLevel(finalScore), insights);
    }

    private double calculateDocumentationScore(RepositoryData repo) {
        double score = 0;
        if (repo.readmeContent() != null && !repo.readmeContent().isBlank()) {
            score += 10;
            if (repo.readmeContent().length() > 300) score += 15;
            if (repo.readmeContent().contains("```")) score += 15;
        }
        return score;
    }

    private double calculateOrganizationScore(RepositoryData repo) {
        double score = 0;
        if (repo.hasDescription()) score += 15;
        if (repo.topicCount() > 0) score += 15;
        return score;
    }

    private double calculateActivityScore(RepositoryData repo) {
        return repo.totalCommits() >= 5 ? 30 : (repo.totalCommits() * 6);
    }

    private String determineLevel(int score) {
        if (score >= 85) return "Excepcional";
        if (score >= 60) return "Sólido";
        return "Em Desenvolvimento";
    }

    private void generateInsights(int finalScore, List<String> insights) {
        if (finalScore >= 85) {
            insights.add("Você demonstra um cuidado excelente com a documentação e organização dos seus projetos.");
        } else if (finalScore < 60) {
            insights.add("Dica: Adicionar tópicos, descrições curtas e um README com instruções de como rodar o projeto aumenta muito sua pontuação.");
        }
    }
}

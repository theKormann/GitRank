package com.gitrank.domain.service;

import com.gitrank.domain.model.DeveloperProfile;
import com.gitrank.domain.model.GitRankResult;
import com.gitrank.domain.model.RepositoryData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GitRankCalculatorService {

    public GitRankResult calculate(DeveloperProfile profile) {
        List<RepositoryData> originalRepos = profile.repositories().stream()
                .filter(repo -> !repo.isFork())
                .toList();

        if (originalRepos.isEmpty()) {
            return new GitRankResult(
                    0, 
                    "Inativo", 
                    List.of("Nenhum repositório original público encontrado."),
                    "Não foi possível gerar um resumo, pois não existem repositórios originais na conta.",
                    0, 0, 0,
                    List.of(),
                    Map.of(),
                    "Desconhecido"
            );
        }

        double totalScore = 0;
        int totalCommits = 0;
        
        List<String> insights = new ArrayList<>();
        Map<String, Long> langByteCount = new HashMap<>();

        for (RepositoryData repo : originalRepos) {
            totalScore += calculateDocumentationScore(repo);
            totalScore += calculateOrganizationScore(repo);
            totalScore += calculateActivityScore(repo);
            
            totalCommits += repo.totalCommits();

            if (repo.languages() != null) {
                repo.languages().forEach((name, size) -> {
                    langByteCount.put(name, langByteCount.getOrDefault(name, 0L) + size);
                });
            }
        }

        int finalScore = (int) Math.round(totalScore / originalRepos.size());
        String level = determineLevel(finalScore);

        generateInsights(finalScore, insights);

        String summary = String.format(
            "Com base na análise algorítmica do perfil, alcançou o nível de engenharia '%s' com uma pontuação de %d/100.\n\n" +
            "• Volume de Código: Ao analisar as suas contribuições mais recentes, foram validados %d commits distribuídos em %d repositórios originais.\n" +
            "• Estrutura: %s\n\n" +
            "Para elevar o seu GitScore, continue focado na legibilidade do código, adicione tópicos aos repositórios e aprofunde os ficheiros README.",
            level, finalScore, totalCommits, originalRepos.size(),
            finalScore >= 60 ? "Demonstra um cuidado excelente com a organização, aplicando descrições claras e boa documentação." : "A análise encontrou espaço para melhorar a documentação técnica (README) dos seus projetos principais."
        );

        List<String> badges = new ArrayList<>();
        if (finalScore >= 85) badges.add("🏆 Desenvolvedor Excepcional");
        if (originalRepos.size() >= 10) badges.add("📦 Criador Prolífico");
        if (totalCommits >= 50) badges.add("🔥 Máquina de Commits");

        long totalBytes = langByteCount.values().stream().mapToLong(Long::longValue).sum();
        
        Map<String, Double> languagePercentages = totalBytes > 0 ? langByteCount.entrySet().stream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                entry -> Math.round((entry.getValue() * 100.0 / totalBytes) * 10.0) / 10.0
            )) : Map.of();

        String memberSince = profile.createdAt() != null && profile.createdAt().length() >= 4 
            ? profile.createdAt().substring(0, 4) 
            : "Desconhecido";

        return new GitRankResult(
                finalScore,
                level,
                insights,
                summary,
                originalRepos.size(),
                0, 
                totalCommits,
                badges,
                languagePercentages,
                memberSince
        );
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
            insights.add("Cuidado excelente com a documentação e organização dos projetos.");
            insights.add("Frequência de commits que demonstra forte consistência.");
        } else if (finalScore >= 60) {
            insights.add("Boa base de repositórios, mas alguns carecem de documentação detalhada.");
            insights.add("Adicione tópicos e labels aos projetos para melhorar o nível.");
        } else {
            insights.add("Adicionar tópicos, descrições e instruções (README) aumentará muito a sua nota.");
        }
    }
}
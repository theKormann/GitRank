package com.gitrank.infrastructure.client;

import com.gitrank.domain.model.DeveloperProfile;
import com.gitrank.domain.model.RepositoryData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.client.HttpGraphQlClient;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GitHubGraphQLAdapter {

    private final HttpGraphQlClient graphQlClient;

    public GitHubGraphQLAdapter(@Value("${github.api.token}") String githubToken) {
        WebClient webClient = WebClient.builder()
                .baseUrl("https://api.github.com/graphql")
                .defaultHeader("Authorization", "Bearer " + githubToken)
                .build();

        this.graphQlClient = HttpGraphQlClient.builder(webClient).build();
    }

    public DeveloperProfile fetchDeveloperProfile(String username) {
        return graphQlClient.documentName("getUserGitRankData")
                .variable("username", username)
                .execute()
                .map(response -> {
                    if (!response.isValid()) {
                        throw new RuntimeException("Erro ao consultar o GitHub: Usuário não encontrado ou limite excedido.");
                    }
                    return mapToDomain(response.field("user").getValue());
                })
                .block();
    }

    @SuppressWarnings("unchecked")
    private DeveloperProfile mapToDomain(Map<String, Object> userData) {
        if (userData == null) return new DeveloperProfile("Desconhecido", "Desconhecido", List.of());

        String login = (String) userData.get("login");
        String createdAt = (String) userData.get("createdAt");
        Map<String, Object> repositories = (Map<String, Object>) userData.get("repositories");
        List<Map<String, Object>> nodes = (List<Map<String, Object>>) repositories.get("nodes");

        List<RepositoryData> repos = nodes.stream().map(node -> {
            String name = (String) node.get("name");
            boolean hasDescription = node.get("description") != null;

            Map<String, Object> topicsMap = (Map<String, Object>) node.get("repositoryTopics");
            int topicCount = topicsMap != null && topicsMap.get("totalCount") != null ? (int) topicsMap.get("totalCount") : 0;

            String readme = "";
            Map<String, Object> objectMap = (Map<String, Object>) node.get("object");
            if (objectMap != null && objectMap.get("text") != null) {
                readme = (String) objectMap.get("text");
            }

            int commits = 0;
            Map<String, Object> branchMap = (Map<String, Object>) node.get("defaultBranchRef");
            if (branchMap != null) {
                Map<String, Object> targetMap = (Map<String, Object>) branchMap.get("target");
                Map<String, Object> historyMap = (Map<String, Object>) targetMap.get("history");
                if (historyMap != null && historyMap.get("totalCount") != null) {
                    commits = (int) historyMap.get("totalCount");
                }
            }

            Map<String, Long> languagesMap = new HashMap<>();
            Map<String, Object> langsData = (Map<String, Object>) node.get("languages");
            if (langsData != null) {
                List<Map<String, Object>> edges = (List<Map<String, Object>>) langsData.get("edges");
                if (edges != null) {
                    for (Map<String, Object> edge : edges) {
                        Number sizeNum = (Number) edge.get("size");
                        long size = sizeNum != null ? sizeNum.longValue() : 0L;
                        
                        Map<String, Object> langNode = (Map<String, Object>) edge.get("node");
                        if (langNode != null) {
                            String langName = (String) langNode.get("name");
                            if (langName != null) {
                                languagesMap.put(langName, size);
                            }
                        }
                    }
                }
            }

            return new RepositoryData(name, false, hasDescription, topicCount, readme, commits, languagesMap);
        }).toList();

        return new DeveloperProfile(login, createdAt, repos);
    }
}
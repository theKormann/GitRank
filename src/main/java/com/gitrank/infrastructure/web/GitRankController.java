package com.gitrank.infrastructure.web;

import com.gitrank.application.usecase.GenerateScoreUseCase;
import com.gitrank.domain.model.GitRankResult;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gitrank")
@CrossOrigin(origins = "*")
public class GitRankController {

    private final GenerateScoreUseCase generateScoreUseCase;

    public GitRankController(GenerateScoreUseCase generateScoreUseCase) {
        this.generateScoreUseCase = generateScoreUseCase;
    }

    @GetMapping("/{username}")
    @Cacheable(value = "gitrank", key = "#username")
    public ResponseEntity<GitRankResult> getGitRank(@PathVariable String username) {
        try {
            GitRankResult result = generateScoreUseCase.execute(username);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
package com.gitrank.domain.model;

public record Badge(
    String name,
    String description,
    boolean unlocked
) {}
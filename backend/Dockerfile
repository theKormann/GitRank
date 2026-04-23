# Estágio 1: Build (Compilação)
FROM maven:3.9.6-eclipse-temurin-21-jammy AS build
WORKDIR /app

# Copiar o pom.xml e baixar as dependências (otimiza o cache do Docker)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar o código-fonte e compilar o .jar ignorando os testes para ser mais rápido
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Run (Execução)
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copiar apenas o .jar gerado no Estágio 1
COPY --from=build /app/target/*.jar app.jar

# Expor a porta 8080 (O Render vai usar esta porta)
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
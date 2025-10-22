# BUILD
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x gradlew
RUN ./gradlew :backend:bootJar --no-daemon --stacktrace

# RUN
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/backend/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
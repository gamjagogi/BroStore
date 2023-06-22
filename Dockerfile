FROM adoptopenjdk/openjdk11

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 9999

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "/app.jar"]

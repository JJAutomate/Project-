pipeline {
    agent {
        node { label "Group1" }
    }
    tools {
        maven 'Maven dator'
//        jdk 'jdk8'
    }
    stages {
        stage ('Build') {
            steps {
                mvn clean install
            }
            post {
                success {
                    junit 'target/surefire-reports/**/*.xml'
                }
            }
        }
    }
}
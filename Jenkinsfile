pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/pranavvengatesh/pastebin-lite.git'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Building the app'
            }
        }

        stage('Test') {
            steps {
                bat 'echo Test running'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Deploying the app'
            }
        }
    }

    post {
        success {
            bat 'echo Build successful'
        }
        failure {
            bat 'echo Build failed'
        }
    }
}

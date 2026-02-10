pipeline {
    agent any
    stages {
        stage('checkout code') {
            steps {
                git 'https://github.com/pranavvengatesh/pastebin-lite.git'
            }
        }
        stage('Build') {
            steps {
                sh 'echo "Building the app"'
            }
        }
        stage('Test'){
            steps{
                sh 'echo "test  running"'
                
            }
        }
        stage('Deploy'){
           steps{
               sh 'echo "Deploying the app"'
               
           }
            
        }
    }
}
post{
    success{
        bat 'echo "build successfull"'
    }
    failure{
        bat 'echo "Build failed"'
    }
}

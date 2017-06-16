pipeline {
    agent any
    tools {
        nodejs 'latest'
    }
    stages {
        stage('Example') {
            steps {
                sh 'npm install'
                sh 'grunt --no-color deploy --user=developer --pwd=Appl1ance
            }
        }
    }
}
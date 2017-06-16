pipeline {
    agent any
    tools {
        nodejs 'latest'
    }
    stages {
        stage('Example') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ABAP_750', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'npm install'
                    sh 'grunt --no-color deploy --user=$USERNAME --pwd=$PASSWORD'
                }
            }
        }
    }
}

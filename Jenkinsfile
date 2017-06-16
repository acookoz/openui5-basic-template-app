pipeline {
    agent { docker 'nodejs-bower-grunt' }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'grunt --no-color lint build'
            }
        }     
        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'ABAP_750', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'grunt --no-color deploy --user=$USERNAME --pwd=$PASSWORD'
                }
            }
        }
    }
}

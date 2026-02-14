pipeline {
    agent { label 'mac' }

    options { timestamps() }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show workspace') {
            steps {
                sh '''
                    echo "Current directory:"
                    pwd
                    echo "Repo files:"
                    ls -la
                '''
            }
        }

        stage('Validate YAML files') {
            steps {
                sh '''
                    echo "YAML files in repo:"
                    ls *.yml *.yaml 2>/dev/null || echo "No YAML files found"
                '''
            }
        }

        stage('Kubectl check') {
            steps {
                sh 'kubectl version --client'
            }
        }
    }
}

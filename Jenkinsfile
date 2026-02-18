pipeline {
    agent { label 'mac' }

    options { timestamps() }

    environment {
        IMAGE = "ayfilla/manual-app"
        TAG = "${env.GIT_COMMIT[0..6]}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE:$TAG .
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $IMAGE:$TAG
                    '''
                }
            }
        }

        stage('Update Helm Repo') {
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]) {
                    sh '''
                    rm -rf helm-repo
                    git clone https://$TOKEN@github.com/Ayfilla/manual-app-helm.git helm-repo
                    cd helm-repo

                    sed -i "s/tag:.*/tag: \\"$TAG\\"/g" values.yaml

                    git config user.email "jenkins@ci"
                    git config user.name "jenkins"

                    git add values.yaml
                    git commit -m "update image $TAG"
                    git push
                    '''
                }
            }
        }
    }
}

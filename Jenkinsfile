pipeline {
  agent any

  environment {
    IMAGE = "ayfilla/manual-k8s-app:v1"
    DOCKERHUB_CREDS = "dockerhub-ayfilla"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        sh '''
          node -v
          npm -v
          npm ci
          npm test || true
        '''
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t $IMAGE .'
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDS, usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh '''
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
            docker push $IMAGE
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          kubectl apply -f k8s/
          kubectl rollout status deployment/manual-app --timeout=120s
          kubectl get pods
          kubectl get svc
        '''
      }
    }
  }
}


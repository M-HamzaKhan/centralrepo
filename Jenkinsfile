pipeline {
  agent any

  environment {
    IMAGE_NAME = "blue-scarf-app"
    CONTAINER_NAME = "blue-scarf-container"
    APP_PORT = "3000"
    HOST_PORT = "3000"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install (Jenkins node)') {
      steps {
        sh 'node --version || true'
        sh 'npm --version || true'
        sh 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          env.IMAGE_TAG = "${IMAGE_NAME}:${commit}"
        }
        sh "docker build -t ${IMAGE_TAG} ."
        sh "docker tag ${IMAGE_TAG} ${IMAGE_NAME}:latest || true"
      }
    }

    stage('Deploy') {
      steps {
        sh """
          # stop and remove old container if exists
          if docker ps -a --format '{{.Names}}' | grep -q '^${CONTAINER_NAME}$'; then
            docker rm -f ${CONTAINER_NAME} || true
          fi
          # run new container
          docker run -d --name ${CONTAINER_NAME} -p ${HOST_PORT}:${APP_PORT} ${IMAGE_NAME}:latest
        """
      }
    }
  }

  post {
    success {
      echo "Deployed: visit http://<server-ip>:${HOST_PORT}/"
    }
    failure {
      echo "Build/Deploy failed."
    }
  }
}

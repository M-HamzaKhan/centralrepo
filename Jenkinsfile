pipeline {
    agent any

    environment {
        APP_NAME = "blue-scarf-app"
        IMAGE_NAME = "bluescarf-node-app"
        CONTAINER_NAME = "bluescarf-container"
        HOST_PORT = "3000"
        CONTAINER_PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub"
                git branch: 'main', url: 'https://github.com/M-HamzaKhan/centralrepo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies"
                sh 'npm install'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo "Stopping old container if it exists"
                sh """
                if docker ps -a --format '{{.Names}}' | grep -q '^${CONTAINER_NAME}\$'; then
                    docker rm -f ${CONTAINER_NAME}
                fi
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image"
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Docker Container') {
            steps {
                echo "Running Docker container"
                sh "docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} --name ${CONTAINER_NAME} ${IMAGE_NAME}"
            }
        }

    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}


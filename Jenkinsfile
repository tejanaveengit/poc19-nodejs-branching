pipeline {
    agent any

    environment {
        EC2_USER = "ubuntu"
        EC2_HOST = "13.200.252.23"
        IMAGE_NAME = "tejanaveen/cicd-nodejs-app"
    }

    stages {

        stage('Pull Docker Image') {
            steps {
                script {
                    def imageTag = sh(script: "echo ${env.GIT_COMMIT}", returnStdout: true).trim()

                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        docker pull ${IMAGE_NAME}:${imageTag}
                    EOF
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF

                    # Stop old container
                    docker stop node-app || true
                    docker rm node-app || true

                    # Run new container
                    docker run -d -p 3000:3000 --name node-app ${IMAGE_NAME}:${GIT_COMMIT}

                EOF
                """
            }
        }
    }
}
``

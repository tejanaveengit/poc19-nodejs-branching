pipeline {
    agent any

    environment {
        EC2_USER = "ubuntu"
        EC2_HOST = "13.200.252.23"
        APP_DIR = "/home/ubuntu/app"
        REPO_URL = "https://github.com/tejanaveengit/poc19-nodejs-branching.git"
    }

    stages {

        stage('Checkout Code') {
            steps {
                script {
                    // Use the branch that triggered the pipeline
                    git branch: "${env.BRANCH_NAME}", url: "${REPO_URL}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo "No build step required"
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                    echo "Deploying to STAGING..."
                    rm -rf ${APP_DIR}
                    git clone -b develop ${REPO_URL} ${APP_DIR}
                    cd ${APP_DIR}
                    npm install
                    pkill node || true
                    nohup npm start > app.log 2>&1 &
                EOF
                """
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                    echo "Deploying to PRODUCTION..."
                    rm -rf ${APP_DIR}
                    git clone -b main ${REPO_URL} ${APP_DIR}
                    cd ${APP_DIR}
                    npm install
                    pkill node || true
                    nohup npm start > app.log 2>&1 &
                EOF
                """
            }
        }
    }
}

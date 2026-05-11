pipeline {
    agent any

    environment {
        EC2_USER = "ubuntu"
        EC2_HOST = "13.206.107.111"
        APP_DIR = "/home/ubuntu/app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tejanaveengit/poc19-nodejs-branching.git'
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

        stage('Deploy to EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST << EOF
                    rm -rf $APP_DIR
                    git clone <YOUR-GIT-REPO-URL> $APP_DIR
                    cd $APP_DIR
                    npm install
                    pkill node || true
                    nohup npm start > app.log 2>&1 &
                EOF
                '''
            }
        }
    }
}

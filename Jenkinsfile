pipeline {

    agent any

    tools {
        nodejs 'Node20'
    }

    stages {

        stage('Verify Environment') {
            steps {
                bat 'where node'
                bat 'node -v'
                bat 'where npm'
                bat 'npm -v'
                bat 'npx playwright --version'
                bat 'npx tsc -v'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Packages') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Publish Report') {
            when {
                expression {
                    fileExists('playwright-report/index.html')
                }
            }
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        always {
<<<<<<< HEAD
            script {
                if (fileExists('playwright-report')) {
                    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                } else {
                    echo 'No Playwright report found to archive.'
                }
=======
        script {
            if (fileExists('playwright-report')) {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
>>>>>>> 8b30bd7ecf551ce16a0aab5caca2b90c930e6029
            }
        }
    }

        success {
            echo 'Execution Successful'
        }

        failure {
            echo 'Execution Failed'
        }
    }
}

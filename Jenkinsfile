pipeline {

    agent any

    tools {
        nodejs 'Node20'
    }

    options {
        skipDefaultCheckout(false)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Workspace') {
            steps {
                bat 'rmdir /s /q node_modules || exit 0'
                bat 'del package-lock.json || exit 0'
                bat 'rmdir /s /q allure-results || exit 0'
                bat 'rmdir /s /q allure-report || exit 0'
            }
        }

        stage('Install Packages') {
            steps {
                bat 'npm cache clean --force'
                bat 'npm install --include=dev'
            }
        }

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

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test --reporter=allure-playwright'
            }
        }

        stage('Publish Playwright HTML Report') {
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

        stage('Publish Allure Report (Jenkins UI)') {
            when {
                expression {
                    fileExists('allure-results')
                }
            }
            steps {
                echo 'Publishing Allure report via Jenkins plugin UI'
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('playwright-report')) {
                    archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                }

                if (fileExists('allure-results')) {
                    archiveArtifacts artifacts: 'allure-results/**', fingerprint: true
                }

                if (fileExists('allure-report')) {
                archiveArtifacts artifacts: 'allure-report/**', fingerprint: true
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
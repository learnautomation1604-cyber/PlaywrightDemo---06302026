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
                bat 'if exist node_modules rmdir /s /q node_modules'
                bat 'if exist package-lock.json del package-lock.json'
                bat 'if exist allure-results rmdir /s /q allure-results'
                bat 'if exist allure-report rmdir /s /q allure-report'
                bat 'if exist playwright-report rmdir /s /q playwright-report'
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

        stage('Generate Allure HTML Report') {
            when {
                expression {
                    fileExists('allure-results')
                }
            }
            steps {
                script {
                    def allureHome = tool 'Allure'
                    bat "\"${allureHome}\\bin\\allure.bat\" generate allure-results --clean -o allure-report"
                }
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

        stage('Publish Allure HTML Report') {
            when {
                expression {
                    fileExists('allure-report/index.html')
                }
            }
            steps {
                publishHTML(target: [
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true
                ])
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
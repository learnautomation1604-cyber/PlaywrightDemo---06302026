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

stage('Clean Workspace') {
    steps {
        bat 'rmdir /s /q node_modules || exit 0'
        bat 'del package-lock.json || exit 0'
    }
}

stage('Install Packages') {
    steps {
        bat 'npm cache clean --force'
        bat 'npm install --include=dev'
        bat 'npm list typescript'
    }
}
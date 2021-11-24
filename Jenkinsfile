pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "rm -rf /var/lib/jenkins/workspace/FullStackApp-TSI-FrontEnd"
                sh "cp -r ${WORKSPACE}/build/ /var/lib/jenkins/workspace/FullStackApp-TSI-FrontEnd"
            }
        }
    }
}

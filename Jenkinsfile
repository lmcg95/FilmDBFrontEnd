pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/lib/jenkins/workspace/FullStackApp-TSI-FrontEnd"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/lib/jenkins/workspace/FullStackApp-TSI-FrontEnd"
            }
        }
    }
}

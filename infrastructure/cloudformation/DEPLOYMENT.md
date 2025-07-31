# AWS Deployment Guide

## Prerequisites

- AWS account
- AWS CLI configured
- Git installed
- Docker installed (for local testing)

## Steps

1. **Create an EC2 Key Pair**

   - Go to AWS EC2 Console
   - Under "Network & Security", select "Key Pairs"
   - Click "Create Key Pair"
   - Name it (e.g., "todo-app-key")
   - Save the .pem file securely

2. **Deploy using CloudFormation**
   ```bash
   aws cloudformation create-stack \
     --stack-name todo-app \
     --template-body file://infrastructure/cloudformation/template.yml \
     --parameters ParameterKey=KeyName,ParameterValue=todo-app-key \
     --capabilities CAPABILITY_IAM
   ```

Access the Application

After deployment completes (5-10 minutes)

Get the public DNS from CloudFormation outputs

Access the app at: http://<public-dns>:3000

Update the Application

bash
git pull origin main
docker-compose up -d --build

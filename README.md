## Overview

Movie recommendation system built using **Next.js** and **Tailwind CSS**.  
It uses the **TMDB API** to fetch movie data, and a Go (Gin) backend to generate recommendations and serve movie details through a set of microservices.

The whole stack is deployed on **AWS** using infrastructure-as-code with **Terraform**:

- **VPC & Networking**: Custom VPC with public/private subnets and security groups.
- **Compute**: An **ECS cluster on EC2** (capacity provider + Auto Scaling Group) running:
  - `movies-service` (Go) for TMDB integration and recommendations.
  - `users-service` (Go) for user-related APIs.
- **Load Balancing**: An **Application Load Balancer (ALB)** routing traffic to the ECS services.
- **Data**: **DynamoDB** (e.g. `UserPreferences` table) for storing user preferences.
- **Observability**: **CloudWatch Logs** for both backend services.

The frontend talks to these AWS-hosted services via REST APIs exposed through the ALB.

## Getting Started (Frontend)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

Make sure the backend services (`movies-service`, `users-service`) are running locally or reachable on your AWS environment for the full experience (search, recommendations, etc.).













 







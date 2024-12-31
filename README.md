# 🍽️ 맛있구미(MatEatGumi) - Frontend

[![Vercel](https://vercel.com/button)](https://mateatgumi.vercel.app)

## Overview
맛있구미는 최신 사용자 리뷰를 기반으로 구미 지역의 음식점을 추천하는 사용자 친화적인 플랫폼입니다. RAG(Retrieval-Augmented Generation)와 LLM(Large Language Model) 기술을 활용하여 대화형(Chat) 형태로 사용자와 소통하며, 맞춤화된 음식 추천 서비스를 제공합니다.

### Live Demo
Check out the live application here: [MatEatGumi-Frontend](https://mateatgumi.vercel.app)

## Features
- **실시간 리뷰 통합**: 지역 맛집의 최신 리뷰를 제공합니다.
- **사용자 친화적인 UI**: 깨끗하고 반응성이 뛰어난 디자인으로 간편하게 탐색할 수 있습니다.
- **검색 및 필터 옵션**: 카테고리, 위치, 평점에 따라 최고의 맛집을 쉽게 찾을 수 있습니다.
- **최적화된 빌드 프로세스**: Parcel.js로 빠른 빌드 및 번들링을 제공합니다.
- **최신 배포 환경**: Vercel에서 호스팅되어 높은 가용성과 성능을 보장합니다.

## Tech Stack
- **Frontend Framework**: JavaScript (ES6+)
- **Bundler**: [Parcel.js](https://parceljs.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mijisuh/mateatgumi-frontend.git
   cd mateatgumi-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Deployment
The project is deployed on Vercel. To deploy your own version:

1. Install the [Vercel CLI](https://vercel.com/cli):
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the on-screen instructions to complete the deployment.

## Folder Structure
```
mateatgumi-frontend/
├── src/
│   ├── components/   # Reusable React components
│   ├── styles/       # CSS and styling files
│   ├── assets/       # Static assets (images, fonts, etc.)
│   └── index.html    # Entry point
├── package.json      # Project metadata and dependencies
├── .parcelrc         # Parcel.js configuration
├── vercel.json       # Vercel deployment configuration
└── README.md         # Project documentation
```

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.


private-capital-dashboard-template/
├── backend/
│   ├── server/
│   │   ├── index.js
│   │   ├── metrics.js
│   │   ├── pii.js
│   │   ├── cache.js
│   │   ├── precomputedStore.js
│   │   ├── onDemand.js
│   │   └── utils/logger.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── client/
│   │   ├── src/
│   │   │   ├── App.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── KPIChart.js
│   │   │   ├── api.js
│   │   │   ├── index.js
│   │   │   └── styles.css
│   │   ├── public/index.html
│   │   ├── package.json
│   │   └── Dockerfile
├── config/
│   ├── data_model.yaml
│   ├── visualization_spec.yaml
│   └── dashboard_config.json
├── docs/
│   ├── architecture.md
│   ├── validation_report.md
│   └── deployment_guide.md
├── scripts/
│   ├── etl_runner.js
│   ├── precompute_metrics.js
│   └── on_demand_metrics.js
├── test/
│   ├── backend_tests/api.test.js
│   ├── backend_tests/metrics.test.js
│   └── frontend_tests/KPIChart.test.js
└── README.md


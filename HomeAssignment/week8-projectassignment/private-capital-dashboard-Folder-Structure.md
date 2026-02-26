private-capital-dashboard/
├── backend/
│   ├── server/
│   │   ├── index.js                # NodeJS Express entrypoint
│   │   ├── metrics.js              # Precomputed + On-demand metrics logic
│   │   ├── pii.js                  # PII masking functions
│   │   ├── cache.js                # NodeCache configuration
│   │   ├── precomputedStore.js     # Precomputed metric store
│   │   ├── onDemand.js             # On-demand metric computation
│   │   └── utils/                  # Optional utility scripts
│   │       └── logger.js           # Central logging utility
│   ├── package.json
│   ├── Dockerfile                  # Docker build for backend
│   └── .env                        # Environment variables (API keys, DB credentials)
│
├── frontend/
│   ├── client/
│   │   ├── src/
│   │   │   ├── App.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── KPIChart.js
│   │   │   ├── api.js
│   │   │   ├── index.js
│   │   │   └── styles.css          # Basic styling for charts & layout
│   │   ├── public/
│   │   │   └── index.html
│   │   ├── package.json
│   │   └── Dockerfile              # Docker build for frontend
│
├── config/
│   ├── data_model.yaml             # Phase 2 – Data model & embedding strategy
│   ├── visualization_spec.yaml     # Phase 3 – Visualization spec
│   └── dashboard_config.json       # Optional combined dashboard configuration
│
├── docs/
│   ├── architecture.md             # Phase 1 – Mermaid architecture diagram + explanation
│   ├── validation_report.md        # Phase 5 – Validation report template
│   └── deployment_guide.md         # Deployment instructions: Docker + Cloud + CI/CD
│
├── scripts/
│   ├── etl_runner.js               # CLI script to run ETL pipelines
│   ├── precompute_metrics.js       # Precompute heavy metrics
│   └── on_demand_metrics.js        # Compute light metrics on-demand
│
├── test/
│   ├── backend_tests/
│   │   ├── api.test.js
│   │   └── metrics.test.js
│   └── frontend_tests/
│       └── KPIChart.test.js
│
└── README.md                       # Overview + setup instructions
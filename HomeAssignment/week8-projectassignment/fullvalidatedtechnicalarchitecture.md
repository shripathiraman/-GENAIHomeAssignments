# Private Capital / Mutual Fund Dashboard – Technical Architecture

## 1. Overview
Dynamic, cloud-hosted dashboard for strategic KPIs in Private Capital and Mutual Funds, designed to enable campaign optimization.  
- **Backend:** NodeJS microservices  
- **Frontend:** React + D3 (interactive, hybrid drill-down)  
- **Hosting:** Cloud (AWS / Azure / GCP)  
- **Data Sources:** Primary Excel, secondary API (on-demand)  
- **Target Users:** Business users (GPs, Operational Managers, Analysts, External Clients)  

---

## 2. Data Sources & Vectorization

| Input Type | Source | Vectorization | Notes |
|------------|--------|---------------|-------|
| User Requirements | BRD / Notes | V | Full embeddings for KPI & filter extraction |
| Data Schema | Excel/CSV/API | V | Full structural context for mapping KPIs & metrics |
| UI/UX Specs | Figma/None | V | Layout & color inference |
| Example Dashboards | PDF/Screenshots | V | Template guidance (AI recommendation engine) |
| Historical Dashboards | Excel/PDF | V | Avoid bias, not replicate |
| Data Pipeline Code | ETL scripts | PV | Metadata only; no sensitive code exposure |
| Technical Docs | Swagger / Wiki | V | API endpoints, dictionaries |
| User Feedback | Manual | V | Only manual input for future iterations |
| Compliance Rules | GDPR / Policies | V | For masking & audit enforcement |

---

## 3. KPIs & Metrics

**Landing Page KPIs (3–6 visuals per page):**  

1. Net New Capital Inflow (on-demand calculation)  
2. Fund Performance (IRR / CAGR) (pre-computed)  
3. NAV Trend (pre-computed)  
4. Marketing ROI (pre-computed)  
5. Cost per Acquisition (CPA) (on-demand calculation)  

**Granularity:** Monthly  
**Historical Depth:** 3 Years  

**Drill-Down Hierarchy:** Fund → Share Class → Geography → Investor Segment  
- Hybrid drill: single-level default; full hierarchy optional  

---

## 4. Compliance & PII Enforcement

- Fields containing PII: Investor Name, Email, Phone, Internal ID, SSN/Tax ID/Passport, Bank Details  
- **RBAC / Multi-Tenancy Scaffolding:** Built for future activation  
- **Masking / Tokenization:** Applied before embedding & dashboard render  
- **Audit Logging:** All critical data accesses & transformations logged  
- **Regulations Enforced:** GDPR, SOC 2, ISO 27001, Financial Regulatory (SEC / ESMA / FCA), Internal Policy  

---

## 5. Data Pipeline & ETL

- **Hybrid Calculation Strategy:**  
  - Heavy metrics pre-computed (IRR/CAGR, Marketing ROI)  
  - Light metrics on-demand (Net Inflow, CPA)  
- **API Integration:** On-demand only for secondary data  
- **ETL:** NodeJS scripts parse Excel / API, pre-compute heavy metrics, enforce PII masking, push to dashboard DB  
- **Error Handling:**  
  - Critical → Stop render, log, alert  
  - Minor → Fallback visuals, log only  
- **Caching:** In-memory NodeJS cache for light metrics & API pulls  

---

## 6. Vector Embedding Architecture

- **Full Embeddings (V):** BRD, data schema, UI/UX, historical dashboards, technical docs, compliance rules  
- **Partial Embeddings (PV):** ETL scripts metadata only  
- **Storage:** Cloud vector DB (Pinecone / Weaviate / OpenSearch vector module)  
- **Purpose:** AI-driven KPI extraction, chart recommendation, context-aware suggestions  

---

## 7. Frontend Architecture

- **Framework:** React + D3  
- **Visuals:** 3–6 per page, Tableau-style storytelling  
- **Interactivity:** Hybrid drill-down, filterable, dynamic charts  
- **Fallbacks:** Default chart types when light metric missing or API timeout  

---

## 8. Backend Architecture

- **NodeJS Microservices:**  
  - ETL & pre-computation  
  - On-demand metric computation  
  - API ingestion  
  - Vector embedding interface  
- **Middleware:** Error handling, PII enforcement, logging  

---

## 9. Deployment & Hosting

- **Environment:** Cloud (AWS/Azure/GCP)  
- **Containerization:** Docker + Nginx reverse proxy  
- **CI/CD:** Hybrid – manual build + automated deployment with rollback  
- **Access:** Cloud URL + downloadable template for audit / offline review  
- **Future Proof:** Multi-tenancy scaffolding, role-based masking hooks, scalable cache upgrade path  

---

## 10. Error Handling & Fallback Rules

| Scenario | Action |
|----------|--------|
| Critical PII exposure | Stop render, log, alert |
| Heavy metric unavailable | Stop render, log, alert |
| Light metric missing | Fallback visual / default, log only |
| API timeout | Fallback cached or placeholder visual, log |

---

## 11. Summary

- **Strategic, long-term trend dashboard** for campaign optimization  
- **Hybrid ETL & calculation architecture** ensures performance + accuracy  
- **Compliance & PII-safe** by design  
- **AI-driven visualization recommendation engine** leveraging vector embeddings  
- **Scalable, cloud-hosted, React + D3 frontend**  
- **Hybrid caching & drill-down** UX ensures responsive experience  
- **Future-ready**: RBAC, multi-tenancy, automated feedback integration  

---

**Next Deliverables (Post Architecture Approval):**

1. Data Model JSON/YAML  
2. Visualization Spec Config (YAML)  
3. NodeJS + React + D3 Dashboard Code  
4. Validation Report (Missing Data / Edge Cases / Compliance Checks)  
5. Deployment Guide (Cloud + Docker + CI/CD)  
6. Mermaid Diagram for architecture & data flow